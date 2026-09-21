import { test } from "node:test";
import assert from "node:assert";
import { parse } from "./blog-push.mjs";

test("frontmatter + markdown → draft payload", () => {
  const { meta, html } = parse('---\ntitle: "A: B"\nslug: a-b\ntags: x\n---\n## Hi\n\n[x](/pricing)');
  assert.deepEqual(meta, { title: "A: B", slug: "a-b" });
  assert.equal(html, '<h2>Hi</h2>\n<p><a href="/pricing">x</a></p>');
});

test("rejects files without title/slug", () => {
  assert.throws(() => parse("no frontmatter"), /frontmatter/);
  assert.throws(() => parse("---\ntitle: x\n---\nbody"), /slug/);
});
