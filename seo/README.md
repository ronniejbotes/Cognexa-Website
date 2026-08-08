# Cognexa SEO — Research, Strategy and Execution Plan

*Compiled 9 August 2026 from a multi-agent research run (11 agents, ~500 tool calls),
followed by a dedicated fact-checking pass. Everything here has been re-verified against
the live site and this repo.*

---

## Start here

| Doc | What it answers |
|---|---|
| **[01-how-search-works.md](01-how-search-works.md)** | *What SEO actually is and how Google ranks businesses.* Plain English. Read this first |
| **[02-keyword-strategy.md](02-keyword-strategy.md)** | *What we should be ranking for.* Positioning, 9 keyword clusters, kill list, top-25 table, the full page architecture |
| **[03-content-plan.md](03-content-plan.md)** | *What content to post and what it should rank for.* Audit of the 7 existing posts, 12 pieces over 13 weeks, AEO writing standards |
| **[04-technical-actions.md](04-technical-actions.md)** | The execution checklist — P0 / P1 / P2, with exact steps |
| **[05-corrections-log.md](05-corrections-log.md)** | ⚠️ **What must never be published.** Failed fact-checks, corrected code patches, resolved conflicts |
| [research/](research/) | Raw unedited agent output, kept for reference. Superseded by the docs above wherever they disagree |

---

## The situation in five lines

1. **Nothing is technically broken.** The 4 "not indexed" pages in Search Console are
   benign redirect/canonical variants working exactly as designed.
2. **Five of your nine real pages have never been fetched by Google** — the sitemap was
   never submitted, and you have no inbound links. Those are the only two discovery
   paths that exist.
3. **0 clicks is arithmetic, not a defect.** At position 14.5, 87 impressions predicts
   0.35 clicks. **The number to fix is 87 impressions.**
4. **You have one commercial URL for four service categories** — and quoting, bookings,
   email sorting and custom CRMs appear **zero times** on the homepage.
5. **Your brand has no entity footprint** — no Google Business Profile, no LinkedIn, no
   `sameAs`, no named human. That's why 15 searches for your own name produced 0 clicks.

---

## Do these eleven things this week (~6 hours)

| # | Action | Time |
|---|---|---|
| 0 | 🔴 **Rename the IVR post first** — the 301 is free only while Google hasn't fetched it | 30m |
| 1 | **Submit `sitemap.xml` in GSC** + Request Indexing on the 5 undiscovered URLs | 20m |
| 2 | Register in Bing Webmaster Tools, submit sitemap, enable IndexNow | 30m |
| 3 | **Create + video-verify the Google Business Profile** (decide the CIPC trading name first) | 4h |
| 4 | Repoint 100 internal links from `index.html` to `/` | 10m |
| 5 | Unhide the contact section from Googlebot (one CSS selector) | 30m |
| 6 | Add `sameAs` + entity fields to the Organization schema | 1h |
| 7 | Fix homepage title, H1, hidden H2s, portfolio codenames, broken sentence | 1h |
| 8 | Branded 404 page + `ErrorDocument` | 30m |
| 9 | LinkedIn company page | 30m |
| 10 | **GA4 conversion events** on WhatsApp / tel / intake | 1h |
| 11 | **Pull real volumes from Google Keyword Planner** (free) | 1h |

Full detail: [04-technical-actions.md](04-technical-actions.md) §3.

---

## The positioning decision

> **Cognexa is the South African agency that automates the back office of an SME: the
> phone, the WhatsApp line, and the quote → booking → invoice → CRM spine behind them.**
>
> - **Wedge:** the AI receptionist — the only measured demand you have
> - **Depth:** quoting, invoicing, bookings, email triage, custom CRMs — the emptiest
>   SERPs in the market, and currently invisible on your site
> - **Demote:** 3D websites (100% DIY search intent, 0% buyer intent) and the
>   multilingual-NLP fight against Botlhale

---

## The first five pages

1. `ai-receptionist-south-africa.html` — the only measured demand, with no page to catch it
2. `pricing.html` — highest-converting modifier; every competitor publishes ZAR, you publish none
3. `whatsapp-ai-chatbot-south-africa.html` — strongest SA signal in the cluster; your title already claims it and earns zero
4. `custom-crm-development-south-africa.html` — highest ticket, least contested cluster found anywhere
5. `about.html` — half a day, unblocks E-E-A-T on all 7 existing posts

---

## What "working" looks like

| Metric | Now | Nov 2026 | Feb 2027 | Aug 2027 |
|---|---|---|---|---|
| Indexed pages | 4 | 15–20 | 25–35 | 40–60 |
| Impressions/mo | ~29 | 250–700 | 1,500–4,000 | 8,000–20,000 |
| Clicks/mo | 0 | 5–25 | 40–120 | 250–700 |
| Google reviews | 0 | 5 | 10 | 20+ |

Average position getting *worse* around month 3 is normal and good — it means you
started ranking for many more terms.

**Grade against these numbers and no others.**

---

## Three things that will kill this

1. **Mass-generating location or vertical pages.** Named verbatim in Google's doorway
   policy. Templated location pages lost an estimated 30–60% of traffic in recent
   enforcement waves. **Geo and vertical pages are blocked until you have a real,
   consenting client in that metro or industry.**
2. **Shipping the `/index.html` 301.** On LiteSpeed it's the classic infinite-loop
   trigger, on the one URL carrying all your brand impressions, to fix a GSC row Google
   says needs no action. See [05-corrections-log.md](05-corrections-log.md).
3. **Publishing a number you haven't personally verified.** E-E-A-T is the one ranking
   input a four-week-old domain can actually build. One publicly checkable error on a
   comparison page costs more than the page earns.
