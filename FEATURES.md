# VaakuOS — Feature Reference

Source of truth for what is **actually built**, what is **in progress**, and what is **aspirational copy** added to the marketing site. Cross-referenced against `instacal-backend` codebase and `PROJECT_STATUS.md` (last checked 2026-06-08).

---

## Status key

| Symbol | Meaning |
|--------|---------|
| ✅ | Implemented and verifiable in backend code |
| 🔧 | API/schema exists but core logic is a stub or TODO |
| 📋 | Planned — on roadmap, no implementation yet |
| 🎯 | Aspirational — on marketing site but not yet designed or scoped |

---

## Core Platform

| Feature | Status | Backend module / notes |
|---------|--------|------------------------|
| Multi-tenant isolation | ✅ | `tenant_id` on all Prisma models |
| JWT authentication (email + Google OAuth) | ✅ | `auth` module |
| Role-Based Access Control (20+ permissions) | ✅ | `roles`, `permissions` modules |
| API token generation & validation | ✅ | `api-tokens` module |
| Subscription & billing (Razorpay) | ✅ | `subscriptions` module with webhook handler |
| Sandbox / staging environment | ✅ | Separate env config support |
| GDPR / CCPA compliance tooling | 📋 | Consent + right-to-delete not yet implemented |
| End-to-end encryption (AES-256) | ✅ | Token encryption in `integration-token.service.ts` |

---

## WhatsApp Business API (WABA)

| Feature | Status | Backend module / notes |
|---------|--------|------------------------|
| Meta embedded signup / OAuth flow | ✅ | `waba` module — full onboarding URL + callback |
| Webhook handling (messages + status events) | ✅ | Signature verification, event emitter |
| Send text, media, and template messages | ✅ | `whatsapp-messaging.service.ts` |
| Phone number sync from Meta | ✅ | `phone-numbers` module |
| HSM template create / submit to Meta | ✅ | `templates` module |
| Template approval status sync | ✅ | Webhook-driven status update |
| One-click checkout links inside messages | 🎯 | Not in backend; would require link generation + tracking service |

---

## Campaigns

| Feature | Status | Backend module / notes |
|---------|--------|------------------------|
| Campaign CRUD (draft / schedule / immediate) | ✅ | `campaigns` module |
| Scheduled execution via queue (BullMQ) | ✅ | `campaign-queue` in BullMQ |
| Message-level delivery tracking (sent → delivered → read) | ✅ | Status updated via WABA webhooks |
| Bulk campaign operations (delete, status, schedule) | ✅ | Bulk endpoints on `campaigns` |
| Template variable personalization (name, product, etc.) | ✅ | Handled at send time via template variables |
| Audience segmentation by tags / custom fields | 🔧 | Contact filtering exists; campaign-level segment filter not wired |
| A/B testing engine (message variants, timing) | 🎯 | Not in backend; mentioned in frontend copy only |

---

## Intent & E-commerce Tracking

| Feature | Status | Backend module / notes |
|---------|--------|------------------------|
| Checkout-started event tracking | ✅ | `POST /ecommerce/custom/checkout-started` |
| Checkout-completed event tracking | ✅ | `POST /ecommerce/custom/checkout-completed` |
| Cart abandonment detection (started but not completed) | 🔧 | Events are stored; no engine to diff them into an "abandoned" signal yet |
| Shopify native plugin / integration logic | 📋 | Controller scaffolded, no business logic |
| WooCommerce native plugin / integration logic | 📋 | Controller scaffolded, no business logic |
| Custom storefront JavaScript SDK | 📋 | Not designed yet |
| Pre-exit detection (cursor patterns, scroll velocity) | 🎯 | **Not in backend at all.** Frontend-only concept added to marketing copy. Requires a JS SDK + ML signal processing layer that does not exist. |
| Millisecond-latency triggers (<100ms) | 🎯 | BullMQ queues are used; actual trigger latency is queue-dependent, not milliseconds. |

---

## Automation

| Feature | Status | Backend module / notes |
|---------|--------|------------------------|
| Flow CRUD (create / read / update / delete) | ✅ | `automation/flows` module |
| Keyword-triggered flows (incoming message text) | ✅ | Event listener on `whatsapp.message` |
| Auto-response rules | ✅ | `auto-responses` module |
| **Flow execution engine (traverse nodes, send messages, wait, branch)** | 🔧 | `executeFlow()` is a **TODO stub** in `AutomationService`. Nodes exist in DB but nothing runs them. |
| Multi-step delays and branching | 🔧 | Schema supports it; execution not implemented |
| Auto-stop flow on purchase | 🔧 | Depends on flow execution engine (above) |
| AI-powered send-time optimization | 🎯 | **Not in backend.** No ML or analytics-based scheduling exists. Marketing copy only. |

---

## Shared Inbox

| Feature | Status | Backend module / notes |
|---------|--------|------------------------|
| Inbox conversation endpoints (basic CRUD) | 🔧 | `inbox` module has routes; conversation state model is partial |
| Team assignment of conversations | 📋 | `PROJECT_STATUS.md` lists this as to-do |
| Internal notes on conversations | 📋 | Listed as to-do in `PROJECT_STATUS.md` |
| Real-time message push (Socket.io / WebSocket) | 📋 | Gateway planned, not implemented; frontend would need to poll |
| Customer context panel (cart, orders, tags) | 📋 | Data exists in other modules; inbox UI integration not wired |
| Template replies from inbox | 📋 | Depends on inbox being built out |

---

## Contact CRM

| Feature | Status | Backend module / notes |
|---------|--------|------------------------|
| Contact CRUD | ✅ | `contacts` module |
| Tags (create, assign, bulk-assign) | ✅ | `tags` module |
| Custom fields (text, number, date, select) | ✅ | `custom-fields` module |
| Bulk CSV / Excel import | ✅ | `POST /contacts/import` |
| Advanced contact filtering | ✅ | `POST /contacts/filter` |
| Contact search by name / phone | ✅ | `GET /contacts/search` |

---

## Analytics & Dashboard

| Feature | Status | Backend module / notes |
|---------|--------|------------------------|
| Dashboard widget CRUD | ✅ | `dashboard/widgets` module |
| Available metrics list | ✅ | `GET /dashboard/metrics/available` |
| **Actual metric aggregation (compute widget data)** | 📋 | `PROJECT_STATUS.md` explicitly lists this as pending — "Aggregation APIs for Messages Sent, Delivered, Read, Failed" |
| Campaign ROI / revenue attribution | 📋 | No attribution logic in backend yet |
| CSV export / BI API | 📋 | Not implemented |
| Contact growth tracking | 📋 | Not implemented |

---

## Integrations

| Feature | Status | Backend module / notes |
|---------|--------|------------------------|
| Integration connection CRUD + toggle | ✅ | `integrations` module |
| Google Sheets — controller scaffolded | 🔧 | Controller exists; sync logic is not written |
| Shopify — controller scaffolded | 🔧 | Controller exists; order/cart logic is not written |
| WooCommerce | 📋 | Not started |
| Zapier webhook subscriptions | 📋 | Not started |
| Signed webhooks + retry queues | 📋 | Listed in marketing; not in codebase |

---

## Multi-language

| Feature | Status | Backend module / notes |
|---------|--------|------------------------|
| Auto-detect customer locale | 🎯 | **Not in backend.** Mentioned in marketing copy. Would require locale detection + translated template variants in Meta. |
| 50+ language support | 🎯 | Meta WABA supports multi-language templates, but VaakuOS has no tooling for this yet. |

---

## Features added to the marketing site that need a reality check

These were included in the `/features` page build but are not in the codebase. If shipping these, they need to be scoped and built first.

| Marketing claim | What's actually needed |
|-----------------|------------------------|
| Pre-exit detection (cursor/scroll analysis) | Frontend JS SDK with behavior events + backend signal processing |
| AI send-time optimization | Message send-time ML model or third-party service |
| A/B testing engine | Campaign variant model + stat-sig evaluation in backend |
| One-click checkout links | Link generation service + click/purchase attribution tracking |
| Millisecond trigger latency | Current BullMQ queues are seconds-range; sub-100ms needs direct trigger path |
| Auto-detect locale / 50+ languages | Meta template variants per language + locale detection layer |
| Team inbox (assignment, notes, real-time) | Full inbox module build-out (all pending per PROJECT_STATUS.md) |
| Flow execution (multi-step automation) | executeFlow() stub needs full implementation |
| Shopify / WooCommerce abandoned cart recovery | Integration business logic (controllers are empty stubs) |
| Revenue attribution / campaign ROI | Aggregation engine in analytics module |
