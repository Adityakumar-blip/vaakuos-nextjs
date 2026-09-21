#!/usr/bin/env node
// Pushes content/blog/<slug>.md to the admin panel as a DRAFT. Publishing stays a
// manual step in the internal admin panel after proofreading.
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve, basename } from "node:path";
import { marked } from "marked";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");

const API = (process.env.BLOG_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.vaakuos.com").replace(/\/$/, "");
const FIELDS = ["title", "slug", "excerpt", "meta_title", "meta_description", "featured_image", "category"];

export function parse(source) {
  const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error("Missing frontmatter block (--- ... ---) at top of file");
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  for (const k of ["title", "slug"]) if (!meta[k]) throw new Error(`Frontmatter is missing "${k}"`);
  const unknown = Object.keys(meta).filter((k) => !FIELDS.includes(k));
  if (unknown.length) console.warn(`Ignoring frontmatter keys: ${unknown.join(", ")}`);
  const known = Object.fromEntries(Object.entries(meta).filter(([k]) => FIELDS.includes(k)));
  return { meta: known, html: marked.parse(m[2]).trim() };
}

async function api(path, { token, ...init } = {}) {
  const res = await fetch(API + path, {
    ...init,
    headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${init.method || "GET"} ${path} → ${res.status}: ${JSON.stringify(body.message ?? body)}`);
  return body;
}

async function login() {
  if (process.env.BLOG_API_TOKEN) return process.env.BLOG_API_TOKEN;
  const { BLOG_ADMIN_EMAIL: email, BLOG_ADMIN_PASSWORD: password } = process.env;
  if (!email || !password) throw new Error("Set BLOG_ADMIN_EMAIL + BLOG_ADMIN_PASSWORD (or BLOG_API_TOKEN) in .env.local");
  const { access_token } = await api("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  return access_token;
}

async function findBySlug(slug, token) {
  // Admin search only matches titles, so page through and match slug exactly.
  for (let page = 1; ; page++) {
    const res = await api(`/blogs/admin?page=${page}&limit=100`, { token });
    const hit = res.data.find((b) => b.slug === slug);
    if (hit || page >= (res.pagination?.totalPages ?? 1)) return hit;
  }
}

async function uploadImage(path, token) {
  const form = new FormData();
  form.append("file", new Blob([readFileSync(path)]), basename(path));
  const res = await fetch(`${API}/media/upload`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Image upload failed → ${res.status}: ${JSON.stringify(body.message ?? body)}`);
  return body.url;
}

async function categoryId(name, token) {
  const res = await api(`/blogs/categories?limit=100`, { token });
  const list = Array.isArray(res) ? res : res.data;
  const hit = list.find((c) => c.name.toLowerCase() === name.toLowerCase() || c.slug === name);
  if (!hit) throw new Error(`Category "${name}" not found. Existing: ${list.map((c) => c.name).join(", ")}`);
  return hit.id;
}

async function push(file) {
  const { meta, html } = parse(readFileSync(file, "utf8"));
  const token = await login();
  const { category, ...fields } = meta;
  const body = { ...fields, content: html, status: "draft" };
  if (category) body.category_id = await categoryId(category, token);
  // Local paths are relative to the post file; URLs pass through untouched.
  if (body.featured_image && !/^https?:\/\//.test(body.featured_image)) {
    body.featured_image = await uploadImage(resolve(dirname(file), body.featured_image), token);
  }

  const existing = await findBySlug(meta.slug, token);
  if (existing?.status === "published") {
    throw new Error(`"${meta.slug}" is already published; refusing to flip it back to draft. Edit it in the admin panel.`);
  }
  const saved = existing
    ? await api(`/blogs/${existing.id}`, { method: "PATCH", token, body: JSON.stringify(body) })
    : await api("/blogs", { method: "POST", token, body: JSON.stringify(body) });
  console.log(`${existing ? "Updated" : "Created"} draft: ${saved.title} (${saved.slug}, id ${saved.id})`);
}

const files = process.argv.slice(2);
if (process.argv[1]?.endsWith("blog-push.mjs")) {
  if (!files.length) {
    console.error("Usage: npm run blog:push -- content/blog/<slug>.md [more.md ...]");
    process.exit(1);
  }
  for (const f of files) {
    try {
      await push(f);
    } catch (e) {
      console.error(`✗ ${f}: ${e.message}`);
      process.exitCode = 1;
    }
  }
}
