# Cognexa — Technical SEO & Foundation Action Plan

**Repo:** `C:\Users\ronja\OneDrive\Documents\Github\Cognexa-Website`
**Live:** https://cognexa.co.za · Hostinger / LiteSpeed, static, no build step
**Plan date:** 9 August 2026 · **Author:** Technical SEO lead
**Verification:** every file-level claim below was re-checked against the actual repo files and the live server on 9 Aug 2026. Claims from the research blocks that did **not** survive verification are flagged and corrected inline.

---

## 0. Read this first — the one-paragraph diagnosis

Nothing on this site is broken. The four "not indexed" URLs in Search Console are **protocol/host variants plus `/index.html`** — all benign, all verified against the live server. The real problem is threefold: **(a)** the sitemap has never been submitted, so five of nine real URLs have never been fetched; **(b)** the site has **one commercial URL** (`/`) trying to rank for four service categories, with the founder's three highest-value offerings (quoting, invoicing/bookings, custom CRM) appearing **zero times** in `index.html`; **(c)** the domain has no entity identity — no `sameAs`, no Google Business Profile, no named human — which is why 15 brand impressions produced 0 clicks. Fix (a) this week, (c) this week, and (b) over the next 8 weeks. Do **not** restructure URLs, do **not** chase Core Web Vitals, do **not** mass-generate location pages.

**Verified fact block** (all confirmed 9 Aug 2026):

| Claim | Verified | Evidence |
|---|---|---|
| `https://cognexa.co.za/index.html` returns HTTP 200 | ✅ | `curl -sI` → `200` |
| `http://cognexa.co.za/` → 301 → canonical, **one hop** | ✅ | `redirect_url = https://cognexa.co.za/` |
| `https://www.cognexa.co.za/` → 301 → canonical, **one hop** | ✅ | `redirect_url = https://cognexa.co.za/` |
| `http://www.cognexa.co.za/` → 301 → `https://www.…` → 301 → canonical, **two hops** | ✅ | Hostinger `hcdn` edge upgrades HTTPS before Apache runs |
| Extensionless URLs 404 (MultiViews off) | ✅ | `/blog` → 404, `/ai-receptionist-cost-south-africa` → 404 |
| `/favicon.ico` returns 404 | ✅ | no root favicon exists |
| No custom 404 page, no `ErrorDocument` in `.htaccess` | ✅ | `.htaccess` read in full — 4 blocks only |
| 100 internal links point at `index.html`; exactly 1 at `/` | ✅ | `grep -o 'href="index\.html' *.html \| wc -l` → 100; `href="/"` → `index.html:188` only |
| `body.js-enabled .contact { display: none; }` | ✅ | `css/styles.css:1438` |
| Zero `<table>` elements across all 9 HTML files | ✅ | `grep -c '<table' *.html` → all 0 |
| Zero `rel="preload"` / `preconnect` / `dns-prefetch` | ✅ | 0 matches repo-wide |
| Homepage `<title>` does not contain "Cognexa" | ✅ | `index.html:6` |
| Homepage `<h1>` = "Your business, on autopilot." | ✅ | `index.html:217` |
| `sameAs` absent from Organization schema | ✅ | `index.html:57–99` |
| `"@type":"AdministrativeArea","name":"Worldwide"` (invalid) | ✅ | `index.html:86` |
| `logo` points at a 470-byte favicon SVG | ✅ | `assets/icons/favicon.svg` = 470 bytes |
| `dateModified === datePublished` on all 7 posts | ✅ | all `2026-07-22` / `2026-07-26` |
| Blog `author` is `Organization`, not `Person` | ✅ | all 7 posts |
| `blog.html` has no `BreadcrumbList` | ✅ | `CollectionPage` only |
| Homepage keyword counts | ✅ | `quoting`=0, `booking`=0, `bookings`=0, `email sort`=0, `custom CRM`=0, `invoic`=4, `CRM`=4, `receptionist`=15, `Centurion`=2 |
| Homepage ships 6 parser-blocking scripts, none deferred | ✅ | `index.html:730–735`; `three.js` = 608,087 bytes |
| `assets/videos/` totals 21.6 MB across 4 MP4s | ✅ | 4.0 + 5.1 + 5.5 + 6.9 MB |
| `footer-locality` (NAP) present on 1 of 9 pages | ✅ | `index.html` only |
| Broken sentence "there's you are never locked in" | ✅ | `index.html:458` |

**Corrections to the research blocks:**

- The technical block said the `.htaccess` claim of "one hop" is false. **Partially true.** It is false *only* for `http://www.` — `http://` and `https://www.` are genuinely single-hop. The rule is correctly written; the two-hop case is caused by Hostinger's edge, not by the rule.
- The ranking-mechanics block said homepage body text is ~2,840 words; the technical block said 1,769. **The technical block is right** — the higher figure includes markup and the hidden intake form.
- The AEO block asserted `sitemap.xml` lastmod is uniformly wrong. **Partially true** — 5 URLs say `2026-07-22`, 4 say `2026-07-26`; the server reports `2026-07-26` for all. Only the five `07-22` entries are stale.

---

## 1. The indexing emergency — definitive diagnosis

### 1.1 The arithmetic

| Metric | Value |
|---|---|
| Real URLs in `sitemap.xml` | 9 |
| GSC: indexed | 4 |
| GSC: not indexed | 4 |
| **GSC total URL inventory** | **8** |
| Real URLs Google has never accounted for | **5** |

GSC's Page indexing report is a **complete inventory** of every URL Google knows about. It knows 8. Five real pages are not in the report *at all* — not as "Crawled – currently not indexed", not as "Discovered – currently not indexed". They are **absent**, meaning Googlebot has never fetched them.

The five, in priority order:

1. `https://cognexa.co.za/blog.html`
2. `https://cognexa.co.za/ai-voice-agent-vs-ivr-vs-receptionist.html`
3. `https://cognexa.co.za/whatsapp-ai-chatbot-popia-compliance.html`
4. `https://cognexa.co.za/ai-agent-vs-chatbot-difference.html`
5. `https://cognexa.co.za/how-long-ai-automation-setup-roi.html`

(Indexed: `/`, `ai-receptionist-cost-south-africa.html`, `small-business-ai-workflow-automation-examples.html`, `ai-chatbot-south-african-languages.html` — corroborated by the `site:` search returning exactly those four.)

### 1.2 The 4 "not indexed" URLs — identified, not inferred

Live probe, 9 Aug 2026:

```
https://cognexa.co.za/               → 200
https://cognexa.co.za/index.html     → 200   (byte-identical to /, canonical → /)
http://cognexa.co.za/                → 301 → https://cognexa.co.za/
https://www.cognexa.co.za/           → 301 → https://cognexa.co.za/
http://www.cognexa.co.za/            → 301 → https://www.cognexa.co.za/ → 301 → https://cognexa.co.za/
```

| GSC label | Count | Identified URL(s) | Status |
|---|---|---|---|
| **Page with redirect** | 3 | `http://cognexa.co.za/`, `https://www.cognexa.co.za/`, `http://www.cognexa.co.za/` | ✅ Benign — the canonical 301 working as designed |
| **Alternate page with proper canonical tag** | 1 | `https://cognexa.co.za/index.html` | ✅ Benign — Google's own docs: *"This page correctly points to the canonical page, which is indexed, so there is nothing you need to do."* |

**Verdict: zero real content pages are blocked, deindexed, or canonicalised away.** Stop treating these four rows as a defect. They are the expected shape of a correctly-configured Domain property.

**Ruled out by direct testing:**

| Hypothesis | Test | Result |
|---|---|---|
| `Options +MultiViews` creating `/page` ↔ `/page.html` duplicates | `curl` on `/blog`, `/ai-receptionist-cost-south-africa` | 404 — **ruled out** |
| Trailing-slash variants | flat `.html` files, no directory URLs exist | **ruled out** |
| Legacy renamed URLs generating orphan 301s | `git log --diff-filter=RDA -- '*.html'` shows additions only | **ruled out** |
| Deployment drift (live ≠ repo) | byte-diff after CRLF normalisation | identical — **ruled out** |
| Wrong / cross-page canonicals | all 9 files, line 36 | each self-referential and 200 — **ruled out** |
| `noindex` meta or `X-Robots-Tag` | grep + response headers | absent — **ruled out** |
| `robots.txt` blocking | read live | `Allow: /`, nothing blocked — **ruled out** |

### 1.3 Root cause of the five undiscovered pages — ranked

**#1 — The sitemap has never been submitted in Search Console (confidence: very high).**
The `Sitemap:` directive in `robots.txt` is a *passive* discovery hint. Google's own docs: *"submitting a sitemap is merely a hint: it doesn't guarantee that Google will download the sitemap."* GSC submission forces a fetch event and places URLs into a prioritised discovery queue. The Submitted-sitemaps table is empty.

**#2 — Zero external links (confidence: very high).**
With no inbound links, the site has exactly one discovery path: internal crawl from `/`. A ~2-week-old zero-authority domain gets a crawl allowance of a handful of URLs per visit. Google spent it on `/` and three posts and stopped.

**#3 — 100 of 101 internal links point at a non-canonical URL (confidence: high, verified).**
Every crawl of `index.html#contact` etc. is a fetch Google must discard via canonical. On a tiny crawl allowance this is material waste, and internal link equity accrues to the URL that gets consolidated away rather than to `/`.

| Target | Count |
|---|---|
| `href="index.html#contact"` | 31 |
| `href="index.html#work"` | 16 |
| `href="index.html#services"` | 16 |
| `href="index.html#process"` | 16 |
| `href="index.html"` (nav brand + footer) | 8 |
| `href="index.html#station-workflow"` | 5 |
| `href="index.html#station-voice"` | 4 |
| `href="index.html#station-chat"` | 4 |
| **Total → `/index.html`** | **100** |
| **`href="/"`** | **1** (`index.html:188`) |

**#4 — Homepage crawl depth (confidence: medium).**
All 7 posts *are* linked in homepage body copy (`#local` lines 444–458, `#faq` lines 466–499), so they are discoverable in principle. Discovery starvation, not orphaning, is the constraint.

### 1.4 Exact GSC steps to confirm the diagnosis before acting

Do this first — it takes 10 minutes and removes all remaining ambiguity.

1. **Confirm property type.** GSC → property switcher (top-left). If it reads `cognexa.co.za` with no protocol, it is a **Domain property** and the three "Page with redirect" rows are expected. If it reads `https://cognexa.co.za/`, it is a **URL-prefix property** and www variants should *not* appear — in which case re-run step 2 and record what actually appears.
2. **Enumerate the four.** GSC → Indexing → Pages → scroll to "Why pages aren't indexed" → click **"Page with redirect"** → the table lists the exact URLs. Click **"Alternate page with proper canonical tag"** → same. **Screenshot both tables.** Expected: the three host/protocol variants and `https://cognexa.co.za/index.html`.
3. **Confirm the five are absent.** In the same Pages report, click "View data about indexed pages" and export the full URL list. Cross-reference against `sitemap.xml`. The five listed in §1.1 should not appear anywhere in the report.
4. **Spot-check one undiscovered URL.** URL Inspection → paste `https://cognexa.co.za/blog.html` → expect **"URL is not on Google"** and, under Coverage, **"Discovery: Sitemaps — N/A"** and **"Referring page — N/A or unknown"**. That is the smoking gun for discovery starvation.
5. **If step 2 returns anything other than the four predicted URLs**, stop and re-diagnose. Specifically: if a real content URL appears under "Page with redirect", check that URL with `curl -sIL` before changing anything.

**Ranked alternative hypotheses, if step 2 contradicts the above:**

| If GSC shows… | Hypothesis | Test |
|---|---|---|
| A real `.html` URL under "Page with redirect" | Hostinger edge rule redirecting a content path | `curl -sIL https://cognexa.co.za/<path>` |
| Real URLs under "Crawled – currently not indexed" | Quality rationing on a zero-authority domain — not a technical fault | Nothing to fix; build authority (§4, §6) |
| Real URLs under "Discovered – currently not indexed" | Crawl-budget throttling | Sitemap submission + inbound links will release it |
| "Blocked by robots.txt" | robots.txt changed post-audit | `curl https://cognexa.co.za/robots.txt` |
| "Soft 404" | Thin page detected as empty | Check rendered HTML in URL Inspection |

---

## 2. P0 — this week

Nine items. Total effort ≈ 6 working hours plus one video-verification recording. Do them in this order.

---

### P0-1 · Submit `sitemap.xml` in Google Search Console

**What.** Submit the sitemap and force-index the five undiscovered URLs.

**Why.** This is the single highest-leverage action available and it costs 20 minutes. Five of nine real URLs have never been fetched. A page that is not indexed cannot be retrieved, ranked, or cited in AI Overviews — Google's AI-features documentation is explicit that a page must be *"indexed and eligible to be shown in Google Search with a snippet."*

**How.**
1. GSC → left nav → **Sitemaps**.
2. Under "Add a new sitemap", the field is prefixed with `https://cognexa.co.za/`. Type exactly `sitemap.xml`. Click **Submit**.
3. Wait ~60 seconds, refresh. The "Submitted sitemaps" table must show `sitemap.xml` · Status **Success** · Discovered URLs **9**.
4. GSC → **URL Inspection** (top search bar). Paste each URL below, wait for the fetch, then click **Request Indexing**. Do them in this order:

```
https://cognexa.co.za/blog.html
https://cognexa.co.za/ai-voice-agent-vs-ivr-vs-receptionist.html
https://cognexa.co.za/whatsapp-ai-chatbot-popia-compliance.html
https://cognexa.co.za/ai-agent-vs-chatbot-difference.html
https://cognexa.co.za/how-long-ai-automation-setup-roi.html
https://cognexa.co.za/
```

5. There is an undisclosed daily quota (historically ~10–12). If it rejects, resume the next day.
6. On the homepage, also click **Test Live URL → View Tested Page → HTML** and confirm the `#local`, `#faq` and `#contact` body copy is present in the rendered DOM. (See P0-5 — `#contact` currently is not.)

**Verify it worked.**
- Immediately: Sitemaps table reads "Success / 9 discovered URLs".
- Day 3–7: URL Inspection on `blog.html` flips to "URL is on Google" or "URL is on Google, but has issues".
- Day 7–14: GSC → Pages → total inventory rises from 8 toward 13. Indexed count should reach 8–9. The four "not indexed" variants remain and are fine.
- Day 14: `site:cognexa.co.za` in Google returns ≥8 results (baseline: 4).

---

### P0-2 · Register in Bing Webmaster Tools and submit the sitemap

**What.** Claim the site in Bing WMT, submit the sitemap, enable IndexNow.

**Why.** Bing is 6.95% of South African search (StatCounter, Jul 2026) — disproportionately corporate-desktop, which is exactly Cognexa's B2B audience. More importantly, Bing WMT's **AI Performance report** (public preview Feb 2026, extended Jun 2026) is the only free tool that gives per-URL AI citation counts and "grounding queries" — the actual phrases AI systems used to retrieve your content. Nothing else free provides this.

**How.**
1. Go to https://www.bing.com/webmasters → **Add a site** → choose **Import from Google Search Console** (fastest verification; no DNS change needed).
2. Sitemaps → Submit `https://cognexa.co.za/sitemap.xml`.
3. Generate an IndexNow key: Bing WMT → **IndexNow** → Generate key. Save it as `<key>.txt` in the repo root containing only the key string. Deploy.
4. Open **AI Performance** and record the baseline (it will be zero — that is the point).
5. Separately, attempt a **Bing Places** listing at https://www.bing.com/business. Sources conflict on ZA availability; if unsupported, skip and move on — WMT is the valuable half.

**Verify.** Bing WMT → Sitemaps shows "Success". Site Explorer shows ≥4 URLs discovered within 7 days. IndexNow key validates green.

---

### P0-3 · Create and video-verify a Google Business Profile (service-area business)

**What.** A verified GBP for Cognexa as a service-area business based in Centurion.

**Why.** Local ranking runs on relevance/distance/prominence — a system materially less gated by domain age than organic. It is also the strongest single `sameAs` anchor for entity resolution, which is the direct fix for 15 brand impressions producing 0 clicks. GSC already shows Google groping for a local association (`businesses near me`, `businesses around me`, `local businesses without websites`) with nothing to catch it.

**Honest expectation-setting.** There is no GBP category for "AI automation agency", and live SERPs for `ai automation agency <city>` return **100% organic service×city pages, zero map packs**. Treat GBP as **infrastructure** (entity anchor + review surface + brand panel), not as a lead channel. Budget 4 hours setup, 30 min/month after.

**How.**
1. https://business.google.com → **Add business** → name exactly **`Cognexa`**. Do **not** append keywords — that is a reportable guideline breach and a suspension vector.
2. Primary category: **`Software company`**. Additional (max 4): **`Computer consultant`**, **`Website designer`**, **`Telephone answering service`**, **`Business management consultant`**. All five verified as real 2026 category strings. `Telephone answering service` is deliberate — it is the exact semantic match for an AI receptionist and Gauteng listing density there is thin.
3. Address: enter the **real** operating address in Centurion. Never a PO Box, mailbox rental, or virtual office. Then tick **"I deliver goods and services to my customers"** and **hide the address**. This is mandatory with no signed storefront.
4. Service areas (max 20, all within ~2h drive of Centurion):
   `Centurion · Pretoria · Midrand · Sandton · Johannesburg · Roodepoort · Krugersdorp · Kempton Park · Benoni · Boksburg · Alberton · Vereeniging · Vanderbijlpark · Hartbeespoort · Brits · Bronkhorstspruit · Rustenburg · eMalahleni · Potchefstroom · Bela-Bela`
   **Do not add Cape Town (~14h) or Durban (~6h)** — that is service-area misrepresentation. Those cities are covered by organic geo pages instead (§4).
5. Phone `+27 66 241 2155`. Website `https://cognexa.co.za/`. Hours: Mon–Fri 08:00–17:00 (the *business* is not 24/7 even if the AI is — set honest hours and state 24/7 AI coverage in the description).
6. Description (750 chars) leading with: *"Cognexa is an AI automation agency in Centurion, Gauteng…"* and naming AI receptionists, WhatsApp chatbots, workflow automation, automated quoting and invoicing, booking automation, and custom CRM development.
7. **Video verification** (expect this in 2026 — single unedited live take from the GBP mobile app, ≥30 s, no uploads):
   - Start outside on the street: capture a street sign or a recognisable Centurion landmark.
   - Walk continuously to the building/gate, then inside to the workspace. **No cuts.**
   - Show a laptop with a logged-in business tool — the Cognexa dashboard, Google Workspace on `hello@cognexa.co.za`, or an issued client invoice.
   - Show physical proof: CIPC registration document, a business card, a signed client contract.
   - Close on the phone screen displaying `+27 66 241 2155`.
   - Expect 1–2 rejections. **Re-record rather than appeal** — appeals are far slower.

**Verify.** Profile shows "Verified" badge. Search `Cognexa` in Google Maps from a Centurion IP and confirm the listing appears. Copy the resulting Maps place URL — you need it for `sameAs` in P0-6.

---

### P0-4 · Repoint all 100 internal links from `index.html` to `/`

**What.** One find-and-replace across the 8 sub-pages.

**Why.** 100 of 101 internal links aim at a URL Google discards via canonical, wasting crawl budget on a domain that has almost none and diluting `homepagePageRankNs` — the leaked attribute Google propagates to every document on a site as a proxy for pages with no authority of their own. Zero risk: editing an `href` cannot deindex anything.

**How.** From the repo root:

```bash
sed -i 's|href="index\.html|href="/|g' \
  blog.html \
  ai-receptionist-cost-south-africa.html \
  ai-voice-agent-vs-ivr-vs-receptionist.html \
  whatsapp-ai-chatbot-popia-compliance.html \
  small-business-ai-workflow-automation-examples.html \
  ai-agent-vs-chatbot-difference.html \
  how-long-ai-automation-setup-roi.html \
  ai-chatbot-south-african-languages.html
```

This converts `href="index.html"` → `href="/"` and `href="index.html#contact"` → `href="/#contact"`. `index.html` itself contains **zero** occurrences of `href="index.html` (its nav-brand at line 188 is already `href="/"`), so it needs no edit.

**Verify.**
```bash
grep -c 'href="index.html' *.html   # every file must return 0
grep -c 'href="/"'          *.html   # blog.html + 7 posts return ≥1 each
```
Then open `blog.html` locally and click the brand and each nav item — all must resolve.

---

### P0-5 · Stop hiding the homepage contact section from Googlebot

**What.** Narrow one CSS selector.

**Why.** `css/styles.css:1438` sets `body.js-enabled .contact { display: none; }`, and `index.html:181` adds `js-enabled` during parse before first paint. Googlebot executes JavaScript, so the **entire** `<section id="contact">` — the H2 "Put your business on the line.", the intro copy, the form, the WhatsApp link and the `tel:` link — is `display:none` in Google's rendered DOM. Google explicitly discounts `display:none` content. **44 sitewide links** point into it (`#contact` ×13 + `index.html#contact` ×31). Your primary conversion anchor targets an element Google is told to ignore.

**How.** `css/styles.css` line 1438:

```css
/* BEFORE */
body.js-enabled .contact { display: none; }

/* AFTER */
body.js-enabled .contact-form { display: none; }
```

This hides only the no-JS fallback `<form id="contact-form" class="contact-form">` (`index.html:507`) and leaves the `<h2>`, `.section-sub` and `.contact-alt` (WhatsApp + tel links, `index.html:532`) visible.

Then, in `index.html`, insert a visible primary CTA immediately **after** line 530 (the closing `</form>`) so JS users still get the intake modal:

```html
      <p class="contact-cta">
        <a class="btn btn-primary" href="#contact">Start your build</a>
      </p>
```

Add the matching style to `css/styles.css` (near the other `.contact` rules, ~line 1341):

```css
.contact-cta { margin-top: var(--space-lg, 2rem); }
body:not(.js-enabled) .contact-cta { display: none; }
```

**Regression check.** `js/scroll.js` runs `gsap.from(contactItems, { autoAlpha: 0 })` with `start: 'top 85%'`. That was a no-op while the section was hidden; it will now leave the copy at `opacity: 0` until scrolled into view. Add `immediateRender: false` to that tween, or remove it:

```js
// js/scroll.js — in the contact reveal block
gsap.from(contactItems, { autoAlpha: 0, y: 24, immediateRender: false, /* …existing opts… */ });
```

Bump cache-busters: change `?v=25` → `?v=26` on `css/styles.css` and all three `js/` references, across all 9 HTML files.

```bash
sed -i 's/?v=25/?v=26/g' *.html
```

**Verify.**
1. Deploy, then GSC → URL Inspection → `https://cognexa.co.za/` → **Test Live URL** → **View Tested Page** → **HTML** tab → Ctrl-F for `"Put your business on the line."` and `"wa.me/27662412155"`. Both must be present.
2. **Screenshot** tab must show the contact section rendered, not blank.
3. Load the page with JS disabled — the fallback form must still appear.
4. Load with JS enabled — the form must be hidden and clicking "Start your build" must open the intake modal.

---

### P0-6 · Rewrite the Organization schema: `sameAs`, geo, hours, price range

**What.** Replace the `ProfessionalService` node with a fully-specified entity.

**Why.** `sameAs` is **entirely absent** — verified. It is the mechanism by which Google merges scattered mentions into one resolved entity, and it is the direct fix for the brand-collision problem (`cognexa.com` Slovak AI firm, `cognexa.org` journal with an ISSN, Cognexa Inc., Cognexa Health, a Google Play app, plus near-match interference from NASDAQ-listed Cognex). Google currently has no basis to resolve "cognexa" to the South African entity. Also fixes the semantically invalid `AdministrativeArea: "Worldwide"` at line 86 and the 470-byte favicon masquerading as a logo.

**How.** Full paste-ready block in **§5.4**. Deploy after the GBP is verified (P0-3) so you have the Maps URL, and after the LinkedIn page exists (P0-9).

**Verify.** https://search.google.com/test/rich-results → paste the live URL → the `ProfessionalService` and `WebSite` items must parse with zero errors. Then https://validator.schema.org/ for strict type validation.

---

### P0-7 · Fix the homepage `<title>`, `<h1>` and the two hidden H2s

**What.** Put the brand in the title, keywords in the H1, and make the services heading visible.

**Why.** `cognexa` is the #1 query at 15 impressions and 0 clicks — and the homepage `<title>` does not contain the string "Cognexa", while all 8 other pages end `| Cognexa`. At ~579px the current title also sits exactly on the ~580px SERP truncation threshold. The `<h1>` — "Your business, on autopilot." — contains no query terms at all, and `#services`, the most commercially important block, has only `<h2 class="sr-only">Services</h2>` (line 236).

**How.** Full before/after in **§5.1** and **§5.2**.

**Verify.** After deploy, view-source and confirm. Re-test the hero at 360px width in DevTools — the new H1 loses the single hard-coded `<br>` that currently guarantees a clean wrap, and `h1` is `clamp(2.5rem, 7vw, 4.5rem)` which floors at 40px. Then GSC → URL Inspection → Test Live URL → confirm the new title in the rendered HTML.

---

### P0-8 · Ship a branded 404 page and wire up `ErrorDocument`

**What.** A real 404 page plus the missing Apache directive.

**Why.** Verified: `.htaccess` contains **no `ErrorDocument` directive at all**, and `/this-does-not-exist-xyz` returns Hostinger's generic default — no Cognexa branding, no nav, and no links back into the site. Every crawler and user who hits a bad URL is a dead end.

**How.** Full file in **§5.7**.

**Verify.**
```bash
curl -sI https://cognexa.co.za/nonexistent-xyz | head -1   # must still be: HTTP/2 404
curl -s  https://cognexa.co.za/nonexistent-xyz | grep -c Cognexa   # must be > 0
```
Status code **must remain 404**, not 200. A 200 here is a soft-404 and is worse than the default page.

---

### P0-9 · Create the LinkedIn company page

**What.** Claim `linkedin.com/company/cognexa`.

**Why.** It is the second-most-cited domain across ChatGPT Search, AI Mode and Perplexity (appearing in ~11% of responses), the highest-value non-Google asset for South African B2B, and — most urgently — a `sameAs` target that P0-6 needs. Note that "Cognexa Solutions" already exists on LinkedIn as a *different* entity, which is part of the brand-collision problem; claiming your own page is how you separate from it.

**How.** https://www.linkedin.com/company/setup/new → Name `Cognexa` → Industry: Software Development → Location: Centurion, Gauteng, South Africa → Website `https://cognexa.co.za/` → tagline and About text using the **identical one-line description** you will use on every other profile (§6.0). Upload the same logo file everywhere. Then add the founder's personal profile as an employee.

**Verify.** Page resolves publicly when logged out. URL added to the `sameAs` array in P0-6.

---

## 3. P1 — this month

---

### P1-1 · Build the first three service pages

**What.** `ai-receptionist-south-africa.html`, `whatsapp-ai-chatbot-south-africa.html`, `pricing.html`.

**Why.** This is the dominant cause of the 87-impression ceiling. Google's retrieval stage returns **URLs, not `#anchors`** — a single 1,769-word homepage cannot be retrieved for four distinct service categories. Every competitor ranking for `ai receptionist south africa` has the phrase at URL level (`smeadvantage.co.za/solutions/ai-receptionist`, `aiautomatedsolutions.co.za/ai-receptionist`, `lekkerai.co.za/ai-receptionist-south-africa/`); Cognexa has none. Your own GSC data names the page: `ai receptionist south africa` (8) + `ai receptionist pricing` (1) + `ai receptionist cost` (1) = 10 of roughly 60 non-brand impressions, arriving at position ~14.5 **with no page targeting them**.

Ordering rationale: receptionist first (measured demand), WhatsApp second (strongest SA autocomplete signal in the chatbot cluster — `whatsapp automation south africa` is the #2 suggestion), pricing third (highest-converting modifier; every serious SA competitor publishes ZAR figures and Cognexa publishes none).

**How.** Root-level `.html` files per `CLAUDE.md`. Build each from the `blog.html` skeleton (head block lines 1–52, `.site-nav` lines 103–127, `.site-footer`). Per page:

| Element | Spec |
|---|---|
| `<title>` | `AI Receptionist South Africa — Cost, Setup & Languages \| Cognexa` (≤60 chars) |
| `<h1>` | Exact target phrase: `AI receptionist for South African businesses` |
| Opening paragraph | **40–60 words, answer-first**, self-contained, containing the number + currency + year. 80% of passages reused 100+ times in AI Mode answer in the opening sentence; 85% are self-contained. |
| H2s | **Literal user questions**: "What does an AI receptionist cost in South Africa?" not "Pricing". 48% of high-reuse passages open with an explicit question vs 22% of one-offs. |
| Under each H2 | One self-contained 40–75 word answer paragraph (bold the answer sentence), then 150–300 words of detail |
| Structured elements | ≥1 real `<table>` — semantic `<table>/<thead>/<tbody>/<th scope>`, **not** a CSS grid of `<div>`s. Target 25–35% of the page in lists/tables. |
| Pricing | ZAR band, stated with month and year: "R4 500 per month (August 2026)" |
| Length | 1,200–1,800 words |
| FAQ | 5–8 questions, `FAQPage` schema (no rich result since 7 May 2026, but LLM answer engines parse it and it costs nothing) |
| Schema | `Service` + `WebPage` + `BreadcrumbList` `@graph` — full block in **§5.5** |
| Canonical | self-referential |
| OG | own image at 1200×675, `og:locale`, `og:image:alt` |

Then rewire the homepage station CTAs — see **§5.6**.

**Verify.** Rich Results Test passes. Add all three to `sitemap.xml` (§5.8), resubmit, and Request Indexing on each. 14 days later, GSC → Performance → filter by page → each should show ≥1 impression.

---

### P1-2 · Build the four missing-offering service pages

**What.** `automated-quoting-invoicing.html`, `custom-crm-development-south-africa.html`, `booking-automation-south-africa.html`, `workflow-automation-south-africa.html`.

**Why.** Verified by grep on `index.html`: **`quoting` = 0, `booking` = 0, `bookings` = 0, `email sort` = 0, `custom CRM` = 0**. These are the offerings the founder names *first*, and they sit in the least contested SERPs found in the entire research set — `custom crm development south africa` has **3 of 6 top results held by Indian outsourcing firms** running templated `/south-africa/` pages with no local proof, and `email sorting AI south africa` returns **literally zero SA results**. This is the single largest mismatch between what the business sells and what the site says.

**How.** Same template as P1-1. Fold email sorting into `workflow-automation-south-africa.html` as a major section rather than a standalone page — the query has real global volume but the intent is tool-shopping (SaneBox, Shortwave, Copilot), not agency-buying. Name the SA integration stack explicitly on each page: WhatsApp Business Platform, Make/n8n/Zapier, Sage, Pastel, Xero, PayFast, Yoco, Ozow, Google Calendar, HubSpot, Zoho, Pipedrive, 3CX.

**Verify.** As P1-1. Additionally: `grep -c 'quoting\|custom CRM\|booking' *.html` should be non-zero on the new files.

---

### P1-3 · Create `about.html` with a named human and switch blog authorship

**What.** A real About page with `Person` schema; change all 7 posts' `author` from `Organization` to `Person`.

**Why.** The site fails Google's "Who" test outright. Google asks verbatim: *"Is it self-evident to your visitors who authored your content?"* The visible byline on every post is "By the Cognexa team" and the schema `author` resolves to the Organization. The competitor beating Cognexa (`bizai.co.za`) leads with a named founder and "83+ businesses deployed since 2023". Trust is explicitly the dominant E-E-A-T component. This also creates a second Knowledge Graph entity that corroborates the first — doing double duty as the brand-disambiguation fix.

**How.** Create `about.html` with: real name, real photo (≥600px), 150–250 word bio covering background and why you know automation, Centurion location, LinkedIn URL, email, phone. Add the `Person` block from **§5.4b**. Then across all 7 posts:

```bash
# Preview first
grep -n '"author"' *.html
```

Replace in each post's `BlogPosting` node:

```json
// BEFORE
"author": {
  "@type": "Organization",
  "name": "Cognexa",
  "url": "https://cognexa.co.za/"
},

// AFTER
"author": { "@id": "https://cognexa.co.za/about.html#founder" },
```

And the visible byline (line ~133 of each post):

```html
<!-- BEFORE -->
<p class="post-meta">By the Cognexa team &middot; <time datetime="2026-07-22">22 July 2026</time></p>

<!-- AFTER -->
<p class="post-meta">By <a href="/about.html" rel="author">FULL NAME</a> &middot;
  <time datetime="2026-07-22">Published 22 July 2026</time> &middot;
  <time datetime="2026-09-15">Updated 15 September 2026</time></p>
```

Add `about.html` to the footer nav on all pages and to `sitemap.xml`.

**Verify.** Rich Results Test on any post shows `Article` with `author` type `Person`. Search `"FULL NAME" Cognexa` in Google after 14 days.

---

### P1-4 · Add comparison tables and answer-first paragraphs to the 7 existing posts

**What.** Retrofit real `<table>` markup and self-contained answer paragraphs.

**Why.** Verified: **zero `<table>` elements exist across all 9 HTML files.** 68% of pages ChatGPT cited for software recommendations contained a comparison table; 100% used list structure; 78% carried a year in the title. The arXiv structural-features study measured **+17.3% citation rate from structure alone** (p<0.001, Cohen's d=0.64), independent of content quality. These posts are already written, already the right length (1,479–1,755 visible words), and already use question-form H2s — this is the cheapest available upside on the entire site.

**Priority order (highest value first):**

1. `ai-receptionist-cost-south-africa.html` — indexed, earns the cost/pricing impressions, and **has no price table despite being a cost guide**. Add the ZAR comparison table from **§5.9**.
2. `ai-voice-agent-vs-ivr-vs-receptionist.html` — a three-way comparison post with no comparison table.
3. `small-business-ai-workflow-automation-examples.html` — 12 examples in 1,613 words ≈ 134 words each; too thin for any sub-topic. Add a before/after table in hours *and* Rands.
4–7. The remaining four.

**Per-post retrofit checklist:**
- [ ] Under each question H2, one **40–75 word self-contained answer paragraph**, no pronouns referring backwards, naming the entity explicitly ("Cognexa", "South Africa", "WhatsApp Business Platform"), with numbers carrying currency + month + year. Wrap the answer sentence in `<strong>`.
- [ ] ≥1 real `<table>`, wrapped in `<div class="table-scroll">` (CSS in §5.9) so it scrolls inside its own container at 360px.
- [ ] A one-sentence `<strong>` definition block within the first 100 words.
- [ ] Visible "Last updated" line + honest `dateModified` bump.
- [ ] `FAQPage` schema block appended (each post already has a "Quick answers" `<details>` section — mirror it verbatim).

**Verify.** `grep -c '<table' *.html` returns ≥1 for each edited post. Rich Results Test parses the `FAQPage`. Re-run URL Inspection → Request Indexing after each edit.

---

### P1-5 · Add `defer` to the six homepage scripts and load Three.js conditionally

**What.** Stop shipping 723 KB of vendor JavaScript unconditionally.

**Why.** Verified: `index.html:730–735` loads six scripts with **neither `defer` nor `async`**. `three-0.149.0.min.js` alone is **608,087 bytes**. At end-of-body they don't block first paint, but they block `DOMContentLoaded`, delay `load`, and consume main-thread time inside the LCP window on the mid-range Android devices that dominate South African mobile traffic. The irony: `js/main.js` **already implements a complete `body.no-3d` fallback** (lines 10, 125, 130, 146) and `css/styles.css:433–446` supplies the gradient backdrop. The site is already built to work without Three.js — it just downloads it anyway.

**Priority note.** This is P1, not P0. Mueller: Core Web Vitals *"are not giant factors in ranking."* CWV shows "No data" because there is no field traffic — a *consequence* of invisibility, not a cause. Do it because it's cheap, not because it will move rankings this quarter.

**How.**

```html
<!-- BEFORE — index.html:730-735 -->
  <script src="assets/vendor/three-0.149.0.min.js"></script>
  <script src="assets/vendor/gsap-3.12.5.min.js"></script>
  <script src="assets/vendor/scrolltrigger-3.12.5.min.js"></script>
  <script src="js/scene.js?v=25"></script>
  <script src="js/scroll.js?v=25"></script>
  <script src="js/main.js?v=25"></script>

<!-- AFTER -->
  <script defer src="assets/vendor/gsap-3.12.5.min.js"></script>
  <script defer src="assets/vendor/scrolltrigger-3.12.5.min.js"></script>
  <script defer src="js/scene.js?v=26"></script>
  <script defer src="js/scroll.js?v=26"></script>
  <script defer src="js/main.js?v=26"></script>
```

`defer` preserves execution order for classic scripts, so `scene.js → scroll.js → main.js` ordering is safe. Then in `js/main.js`, inside the existing 3D-capability gate (around line 125, where `body.classList.add('no-3d')` already lives), inject Three.js dynamically only when the scene will actually run:

```js
function loadThree() {
  return new Promise(function (resolve, reject) {
    if (window.THREE) return resolve(window.THREE);
    var s = document.createElement('script');
    s.src = 'assets/vendor/three-0.149.0.min.js';
    s.onload = function () { resolve(window.THREE); };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// Replace the existing "scene is allowed" branch with:
if (sceneAllowed) {
  loadThree().then(function () { CognexaScene.init(); CognexaScroll.init(); })
             .catch(function () { document.body.classList.add('no-3d'); });
} else {
  document.body.classList.add('no-3d');
}
```

Gate `sceneAllowed` on the existing checks **plus** `!(navigator.connection && navigator.connection.saveData)`.

**Verify.** DevTools → Network → filter JS. On a fresh load with `prefers-reduced-motion: reduce` forced (DevTools → Rendering → Emulate CSS media feature), `three-0.149.0.min.js` must **not** appear. With motion allowed, it must appear and the scene must render. Run PageSpeed Insights **lab** data before and after; expect Total Blocking Time to drop materially.

---

### P1-6 · Preload the latin font subsets and prioritise post hero images

**What.** Two `<link rel="preload">` tags in every head, one attribute on 7 images.

**Why.** Verified: **zero** `preload`/`preconnect`/`dns-prefetch` anywhere in the repo. The browser cannot discover a font until it has downloaded and parsed all 2,228 lines of `styles.css`. The homepage LCP is the `<h1>` text (there is no hero image), gated on that font swap. The 7 post hero images are the LCP on their pages and carry `loading="eager"` but **no `fetchpriority`**.

**How.** In the `<head>` of all 9 files, immediately **before** `<link rel="stylesheet">`:

```html
  <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
```

Preload only the `-latin` subsets (48 KB + 22 KB). Leave `-latin-ext` (85 KB + 19 KB) to lazy discovery — it is 104 KB of glyphs for English copy.

In each of the 7 posts, on the `.post-hero` `<img>` (line ~135):

```html
<!-- BEFORE -->
<img class="post-hero" src="assets/images/blog-receptionist-cost.jpg" width="1200" height="675" alt="…" loading="eager" decoding="async">

<!-- AFTER -->
<img class="post-hero" src="/assets/images/blog-receptionist-cost.jpg" width="1200" height="675" alt="…" loading="eager" decoding="async" fetchpriority="high">
```

Also extend `.htaccess` caching for fonts and videos, which never change:

```apache
  # Fonts — 1 year, immutable (self-hosted woff2)
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff  "access plus 1 year"

  # Videos — 1 year
  ExpiresByType video/mp4  "access plus 1 year"
  ExpiresByType video/webm "access plus 1 year"
```

**Verify.** DevTools → Network → the two woff2 files must start loading in the first request wave, before `styles.css` finishes. Lighthouse should stop flagging "Ensure text remains visible during webfont load" and "Preload Largest Contentful Paint image".

---

### P1-7 · Collapse `/index.html` and fix the `.htaccess` documentation

**What.** Add two directives; correct one misleading comment.

**Why.** `/index.html` returns 200 as a live duplicate of `/` — that is precisely the "Alternate page with proper canonical tag" row in GSC. Collapsing it removes one of the four not-indexed entries and stops crawl waste. Separately, the `.htaccess` comment block claims "exactly ONE hop" and specifically claims it avoids the chained redirect, but `http://www.` verifiably does **two** hops because Hostinger's `hcdn` edge upgrades HTTP→HTTPS before Apache runs.

**How.** Full `.htaccess` diff in **§5.10**.

**Verify.**
```bash
curl -sIL https://cognexa.co.za/index.html | grep -Ei '^(HTTP|location)'
# expect: 301 → location: https://cognexa.co.za/  → 200
curl -sI https://cognexa.co.za/ | head -1
# expect: 200 (must NOT loop)
```
Then re-check GSC → Pages after 14 days: "Alternate page with proper canonical tag" should drop to 0, "Page with redirect" rises to 4. Both remain benign.

---

### P1-8 · Regenerate `sitemap.xml` with honest `lastmod` and all new URLs

**What.** Rewrite the sitemap.

**Why.** Five entries claim `<lastmod>2026-07-22</lastmod>` but the server reports `Last-Modified: 26 Jul 2026` for every file. Google discounts `lastmod` values it believes are inaccurate, and an inaccurate sitemap teaches Google to ignore the signal permanently.

**How.** Full file in **§5.8**. Rule: `lastmod` must be the date the **content** materially changed, not the deploy date, and not today.

**Verify.** `curl https://cognexa.co.za/sitemap.xml | head -3` returns valid XML with `Content-Type: application/xml`. GSC → Sitemaps → resubmit → "Discovered URLs" matches the new count.

---

### P1-9 · Build the citation and NAP foundation

See **§6** for the ordered, named checklist. Budget: one focused weekend for Tier 0 + Tier 1.

---

### P1-10 · Ship the ZAR ROI / missed-call calculator

**What.** `calculator.html` — a vanilla-JS ZAR calculator.

**Why.** **No South African competitor has any calculator or interactive tool.** It is the single most link-worthy asset available in this market — the one thing WhichVoIP, chambers of commerce, SA tech press and LLM answer engines would all cite spontaneously. It directly addresses the site's total absence of backlinks. And it converts the site's weakest post (`how-long-ai-automation-setup-roi.html`, near-zero search demand as phrased) into an asset with a format that demonstrably ranks and earns links.

**How.** ~80 lines of vanilla JS in `js/`, no framework, per `CLAUDE.md`. Inputs: calls per month, % missed, average job value (R), current receptionist cost (R/month). Outputs: monthly revenue lost, AI-vs-human monthly saving, payback in months. **Must degrade gracefully with JS disabled** — render a static worked example in the HTML that the JS then replaces. Add `WebApplication` schema. Then pitch it (§6, Tier 3).

**Verify.** Works at 360px. Renders a usable static example with JS off. Add to `sitemap.xml`, `llms.txt`, and the footer nav.

---

## 4. P2 — this quarter

---

### P2-1 · Vertical service pages (5 pages)

**What.** `ai-receptionist-for-dentists-medical-south-africa.html`, `…-plumbers-electricians-…`, `…-salons-spas-…`, `ai-automation-for-law-firms-south-africa.html`, `ai-automation-for-estate-agents-south-africa.html`.

**Why.** `dentalconnectai.co.za` ranks **top-5 for `ai receptionist south africa` with essentially one vertical page**, and `lekkerai.co.za/ai-chatbot-medical-south-africa/` does the same. Only dental and medical are taken in SA — trades, legal, real estate, accounting, auto and veterinary are wide open. Dental/medical, trades and salons are all autocomplete-confirmed, and `salon booking system south africa` is the only vertical booking term to surface in SA autocomplete at all.

**How.** ~1,000 words each. Vertical-specific pain, realistic ZAR job values, a worked example, `Service` schema, links up to the parent `/ai-receptionist-south-africa.html`. **Do not template-merge these** — each needs its own genuinely different economics section.

**Verify.** Each page holds ≥1 impression within 60 days. If not, merge rather than leave thin.

---

### P2-2 · Exactly 3 geo pages, in a browseable hierarchy

**What.** `locations.html` (index, linked from main nav) + `ai-automation-centurion.html` + `ai-automation-pretoria.html`.

**Why, and the hard warning.** The `ai agency pretoria` SERP is genuinely broken — it returns Wikipedia's article on the *defunct National Intelligence Agency*, two wrong-intent SEO agencies, and a raw `contact.php`. Cognexa is physically in Centurion, inside the Tshwane metro. This is the softest commercial keyword found.

**But this is also the single most dangerous action on the list.** Google's doorway policy names the pattern verbatim: *"Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page"* and *"creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy."* Template-generated location service pages reportedly lost 30–60% of traffic in the 2025–26 enforcement waves; the March 2026 spam update completed in **19h30m — the fastest documented spam update ever**. The incumbent `smartaisolutions.co.za` runs 8+ templated `/locations/` pages with one national phone number and no local case studies. Do not copy that.

**Hard construction rules — a page that fails any one of these must not ship:**

| Rule | Requirement |
|---|---|
| Length | ≥800 words, **≥60% genuinely unique body copy** |
| Local proof | **A named or described local client on every page.** No client in that city = the page does not exist yet. |
| Local specificity | Centurion: R21/N1 tech corridor, Highveld Techno Park, Route 21 Corporate Park, density of owner-operated professional practices. Pretoria: government/parastatal procurement rhythms, legal and medical practices, UP spin-outs. |
| Local pricing | AI receptionist monthly cost vs a *local* receptionist salary for that metro — genuinely different data per page |
| FAQ | 4–6 questions with **different answers per city**, not one shared block |
| Schema | `Service` + `areaServed`. **Never `LocalBusiness` with a fabricated street address.** |
| GBP | **Never create a second GBP for another city.** No virtual offices, no co-working addresses. |
| Hierarchy | `locations.html` in the main nav; every geo page links up to service pages; service pages link down to `locations.html` |
| Pruning | Track each page individually in GSC. <10 impressions after 90 days → merge or delete. |

Ship **Centurion first, alone.** Wait 6 weeks. Verify it indexes and holds a position before building Pretoria. Johannesburg, Cape Town, Durban, Sandton and Midrand come later or never.

---

### P2-3 · Case studies with real numbers

**What.** `case-studies.html` hub + 3 individual pages.

**Why.** The `#work` section (`index.html:360–412`) lists four projects — **Nexus Core, Nightgrid, Gridworks, Orbital** — with the note *"Full walkthroughs are private — tell us a little about your build and we'll open them up."* Those names read as invented codenames, and the privacy disclaimer converts the site's only proof asset into a trust *liability*. Meanwhile `#work` is an anchor, not a separately indexable URL.

**How.** Get written consent from 2–3 real clients. Each case study: client (or "a Centurion dental practice" where consent is limited), problem, systems wired together, build time, **measured outcome in Rands and hours**. Example shape: *"Replaced R14,200/month of receptionist cost with R2,900/month of AI; 340 calls handled in month one; 11% converted to bookings."* Either replace the four codename projects or **clearly relabel them as self-initiated concept builds** — do not leave them ambiguous.

---

### P2-4 · Integration pages

**What.** `/integrations/` hub + 8–14 pages: n8n, Make.com, Zapier, HubSpot, Zoho, Pipedrive, Xero, Sage, Pastel, WhatsApp Business API, Google Calendar, PayFast, Yoco, Ozow.

**Why.** The highest-ROI, least-contested layer available. `aiautomatedsolutions.co.za` name-drops all of these on-page but has **no dedicated page for any of them**. No SA agency appears in the n8n Expert Partner directory. `payfast automation integration` and `yoco integration automation south africa` are essentially uncontested SA moats.

**How.** 500–800 words each, consistent template but genuinely different bodies: what the integration does, 3–4 concrete SA workflows, setup time, ZAR price band, CTA. **This is the one place a template is acceptable** — because each page describes a genuinely different system, not the same service in a different city.

---

### P2-5 · Compress the work videos and ship responsive images

**Why.** Verified: `assets/videos/` totals **21.6 MB** across four MP4s (4.0 / 5.1 / 5.5 / 6.9 MB), all `preload="none"` with IntersectionObserver-gated playback — the right implementation, but scrolling to `#work` on South African mobile data can still pull 21.6 MB. Seven images exceed 140 KB with no `srcset`, no `sizes`, no WebP.

**How.** Re-encode each MP4 to ~1 MB (H.264 CRF 28 at 800×1000) or add WebM/VP9 `<source>` siblings ahead of the MP4. In `js/main.js`, extend the existing `prefersReducedMotion()` bail-out to also skip playback when `navigator.connection && navigator.connection.saveData` or `!window.matchMedia('(min-width: 900px)').matches`. Generate 640w/1200w WebP variants of `blog-sa-languages.jpg` (199 KB), `work-2.jpg` (182 KB), `blog-workflows.jpg` (161 KB), `work-3.jpg` (159 KB), `work-4.jpg` (157 KB), `process-1.jpg` (144 KB), `blog-receptionist-cost.jpg` (142 KB), and convert to `<picture>` keeping existing `width`/`height` so CLS stays at zero.

---

### P2-6 · Favicon set, breadcrumb UI, privacy policy, OG consistency

Bundled because each is small. Details in §5.11–5.14.

- **Favicons**: only `assets/icons/favicon.svg` (470 bytes) exists; `/favicon.ico` 404s. Google shows a favicon beside every mobile SERP result.
- **Breadcrumb UI**: all 7 posts emit `BreadcrumbList` JSON-LD but render **no visible breadcrumb**. Adding it creates 14 more crawlable links to `/` and `/blog.html` — and `blog.html` currently receives only nav/footer boilerplate links.
- **Privacy policy**: a South African business that publishes a POPIA compliance guide, runs GA4 (`G-5VH5BBTCL7`) and collects form data has no privacy policy. That is an E-E-A-T gap and a compliance oddity a prospect reading your POPIA article will notice.
- **OG consistency**: `og:locale` and `og:image:alt` exist on `index.html` only (verified). `blog.html` has `og:image` but no `og:image:width`/`height`.

---

### P2-7 · Subordinate the 3D websites pillar

**Why.** The leaked `siteFocusScore` / `siteRadius` attributes measure topical concentration — `siteRadius` is *"how far page_embeddings deviate from the site_embedding."* "Immersive 3D websites" embeds far from "AI business automation". Separately, autocomplete for `3d website design` returns *prompt, templates, free, ai, examples, ideas, portfolio, inspiration* — **100% DIY/inspiration intent, 0% buyer intent**.

**How.** Keep selling it. Demote it in the IA: move `#station-web` below the three automation pillars, give it one service page rather than equal navigation billing, write no blog content about Three.js or WebGL on this domain, and weight the content plan ~80/20 toward automation. Frame it in automation language where possible ("conversion-focused sites wired into your CRM and booking flow") so it embeds nearer the core topic.

---

### P2-8 · Content maintenance loop

**Why.** All 7 posts have `dateModified === datePublished`. Seer's study of 7,683 cited pages carrying 47,097 citations found **75% were updated within the past year but only 42% were *published* within the past year** — maintenance, not publishing volume, drives citation. *"Publish and forget loses. Publish and maintain wins."*

**How.** Quarterly review (Nov 2026, Feb 2027, …). Per post: refresh every price to current ZAR with month and year stated, add new vendor/regulatory changes, extend the comparison table, add one new question H2. **Only then** bump `dateModified` and the visible "Last updated" line. A date bump without substantive change is discounted. Update `sitemap.xml` `lastmod` for changed URLs only, and ping IndexNow.

---

### P2-9 · Expand `robots.txt` and repoint `llms.txt`

**robots.txt** currently allows the main retrieval bots but omits `GPTBot`, `ClaudeBot`, `CCBot`, `Perplexity-User`, `Applebot`, `meta-externalagent`, `Amazonbot`, `MistralAI-User`. `CCBot` (Common Crawl) matters more than it looks — it feeds a large share of open training corpora, which is how an unlinked brand mention ends up in model weights rather than only in live retrieval. Full file in **§5.15**.

**llms.txt** is well-written but points all four services at homepage anchors (`#station-chat`, `#station-voice`, `#station-workflow`, `#station-web`). Anchors are not citable URLs. Repoint at the real service pages once they exist and add a `## Key facts` block.

**Honest framing, so nobody over-invests:** Ahrefs checked 137,210 domains — **97% of `llms.txt` files received zero requests in May 2026**, AI retrieval bots were 1.1% of the requests that did occur, and *"zero requests came from AI bots for llms.txt files that don't exist. They never go looking."* Google's May 2026 optimisation guide names it among files you *"don't need to create."* Mueller compared it to the keywords meta tag. **Fix it, then never think about it again.** Do not build `llms-full.txt`. Do not measure anything against it.

---

## 5. Code-level fixes — exact before/after

All line numbers verified against the repo on 9 Aug 2026.

### 5.1 Homepage `<title>` and `<meta description>` — `index.html:6–7`

```html
<!-- BEFORE -->
  <title>AI Chatbots, WhatsApp Automation &amp; AI Voice Agents in South Africa</title>
  <meta name="description" content="AI automation for South African business — AI chatbots, WhatsApp automation, AI voice agents and workflow automation. Built in South Africa, serving worldwide.">
```

```html
<!-- AFTER -->
  <title>Cognexa | AI Automation Agency in Centurion, South Africa</title>
  <meta name="description" content="Cognexa builds AI receptionists, WhatsApp chatbots and workflow automation for quoting, invoicing, bookings and CRM. Centurion, Gauteng. Free scoping, fixed quote in Rand.">
```

- 57 chars / ~500px — comfortably inside the ~580px truncation threshold (was 66 chars / ~579px, on the edge).
- Brand **first**, which is what a brand query needs. Every other page already ends `| Cognexa`; the homepage was the only one without it.
- `Centurion` and `South Africa` both present — geographic keyword relevance is factor #18 in the 2026 local study.
- Description is 158 chars and now names quoting, invoicing, bookings and CRM — all currently at zero occurrences.

Mirror into OG and Twitter (`index.html:38–39, 48–50`):

```html
<!-- AFTER -->
  <meta property="og:title" content="Cognexa — AI Automation Agency in Centurion, South Africa">
  <meta property="og:description" content="AI receptionists, WhatsApp chatbots and workflow automation for quoting, invoicing, bookings and CRM. Built in Centurion, Gauteng.">
  <meta name="twitter:title" content="Cognexa — AI Automation Agency in Centurion, South Africa">
  <meta name="twitter:description" content="AI receptionists, WhatsApp chatbots and workflow automation for quoting, invoicing, bookings and CRM. Built in Centurion, Gauteng.">
```

### 5.2 Homepage `<h1>` and hidden H2s

```html
<!-- BEFORE — index.html:217 -->
        <h1>Your business,<br><span class="hero-accent">on autopilot.</span></h1>
```

```html
<!-- AFTER -->
        <p class="hero-eyebrow">Centurion, Gauteng</p>
        <h1>AI automation for South African business<br><span class="hero-accent">Your business, on autopilot.</span></h1>
```

The tagline survives as the visual hook; the query terms now live in the H1. Add:

```css
/* css/styles.css — near the hero rules */
.hero-eyebrow {
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: var(--space-sm, 0.75rem);
}
```

**Re-test at 360px after this change** — `h1` is `clamp(2.5rem, 7vw, 4.5rem)` and floors at 40px, and the new H1 no longer has the single hard-coded `<br>` guaranteeing a clean break.

```html
<!-- BEFORE — index.html:236 -->
      <h2 class="sr-only">Services</h2>

<!-- AFTER -->
      <h2 class="section-heading">What Cognexa automates for South African businesses</h2>
```

```html
<!-- BEFORE — index.html:415 -->
      <h2 class="sr-only">What the line delivers</h2>

<!-- AFTER -->
      <h2 class="section-heading">What AI automation delivers</h2>
```

Also rewrite the two stylised section H2s so they carry semantic payload for retrieval and AI Mode passage extraction:

```html
<!-- index.html:313  BEFORE -->  <h2>How the line runs</h2>
<!--                AFTER  -->  <h2>How a Cognexa automation build works, step by step</h2>

<!-- index.html:362  BEFORE -->  <h2>Built on the line</h2>
<!--                AFTER  -->  <h2>Recent Cognexa builds</h2>
```

### 5.3 Fix the broken sentence — `index.html:458`

```html
<!-- BEFORE (fragment) -->
… see what drives <a href="ai-receptionist-cost-south-africa.html">AI receptionist cost in South Africa</a> &mdash; there&rsquo;s you are never locked in, and we reply within one business day.

<!-- AFTER -->
… see what drives <a href="/ai-receptionist-cost-south-africa.html">AI receptionist cost in South Africa</a> &mdash; and you are never locked in. We reply within one business day.
```

### 5.4 Complete replacement Organization + WebSite JSON-LD — `index.html:53–110`

Replace the entire first `<script type="application/ld+json">` block. **Fill every `[BRACKETED]` placeholder before deploying — remove any line you cannot fill honestly.**

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://cognexa.co.za/#organization",
        "name": "Cognexa",
        "legalName": "[REGISTERED CIPC NAME] (Pty) Ltd",
        "alternateName": ["Cognexa AI", "Cognexa AI Business Solutions"],
        "url": "https://cognexa.co.za/",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://cognexa.co.za/#logo",
          "url": "https://cognexa.co.za/assets/images/logo-512.png",
          "width": 512,
          "height": 512,
          "caption": "Cognexa"
        },
        "image": { "@id": "https://cognexa.co.za/#logo" },
        "description": "Cognexa is an AI automation agency in Centurion, Gauteng. It builds AI receptionists and voice agents, WhatsApp and website chatbots, and autonomous workflow automation for quoting, invoicing, bookings, email triage and CRM management \u2014 including custom CRMs.",
        "email": "hello\u0040cognexa.co.za",
        "telephone": "+27662412155",
        "foundingDate": "[YYYY]",
        "founder": { "@id": "https://cognexa.co.za/about.html#founder" },
        "priceRange": "RR",
        "currenciesAccepted": "ZAR",
        "paymentAccepted": "EFT, Credit Card",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Centurion",
          "addressRegion": "Gauteng",
          "postalCode": "[0157]",
          "addressCountry": "ZA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -25.8603,
          "longitude": 28.1894
        },
        "hasMap": "[GOOGLE MAPS PLACE URL FROM THE VERIFIED GBP]",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
          }
        ],
        "areaServed": [
          { "@type": "Country", "name": "South Africa" },
          { "@type": "AdministrativeArea", "name": "Gauteng" },
          { "@type": "City", "name": "Centurion" },
          { "@type": "City", "name": "Pretoria" },
          { "@type": "City", "name": "Midrand" },
          { "@type": "City", "name": "Johannesburg" },
          { "@type": "City", "name": "Sandton" }
        ],
        "knowsAbout": [
          "AI receptionist",
          "AI voice agent",
          "AI chatbot",
          "WhatsApp Business API",
          "WhatsApp automation",
          "workflow automation",
          "automated quoting",
          "automated invoicing",
          "appointment booking automation",
          "email triage automation",
          "CRM automation",
          "custom CRM development",
          "POPIA compliance",
          "Afrikaans conversational AI",
          "isiZulu conversational AI",
          "3D web development"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/cognexa/",
          "[GOOGLE MAPS PLACE URL]",
          "https://www.designrush.com/agency/ai-companies/za",
          "https://www.crunchbase.com/organization/cognexa",
          "https://clutch.co/profile/cognexa",
          "https://www.facebook.com/cognexa",
          "https://www.youtube.com/@cognexa"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "sales",
            "telephone": "+27662412155",
            "email": "hello\u0040cognexa.co.za",
            "areaServed": ["ZA"],
            "availableLanguage": ["en", "af", "zu"]
          }
        ],
        "makesOffer": [
          { "@type": "Offer", "itemOffered": { "@id": "https://cognexa.co.za/ai-receptionist-south-africa.html#service" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://cognexa.co.za/whatsapp-ai-chatbot-south-africa.html#service" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://cognexa.co.za/workflow-automation-south-africa.html#service" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://cognexa.co.za/automated-quoting-invoicing.html#service" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://cognexa.co.za/booking-automation-south-africa.html#service" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://cognexa.co.za/custom-crm-development-south-africa.html#service" } }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://cognexa.co.za/#website",
        "url": "https://cognexa.co.za/",
        "name": "Cognexa",
        "alternateName": "Cognexa AI Business Solutions",
        "inLanguage": "en-ZA",
        "publisher": { "@id": "https://cognexa.co.za/#organization" }
      }
    ]
  }
  </script>
```

**What changed and why:**

| Change | Reason |
|---|---|
| `sameAs` added (was absent) | The entity-resolution mechanism. Fixes the brand collision with six other "Cognexa" entities. |
| `AdministrativeArea: "Worldwide"` **removed** | Semantically invalid — "Worldwide" is not an administrative area. It also actively fights the strongest built-in signal a `.co.za` ccTLD has. |
| `logo` → real 512×512 PNG | Was a 470-byte favicon SVG. This is what Google may pull for a Knowledge Panel. |
| `telephone` → E.164 `+27662412155` | Unambiguous machine-readable form. |
| `geo`, `openingHoursSpecification`, `priceRange`, `postalCode` added | Required/recommended `LocalBusiness` fields. |
| `founder` → `Person` `@id` | Second Knowledge Graph entity corroborating the first. |
| `knowsAbout` expanded | Now names quoting, invoicing, booking, email triage and custom CRM — offerings with zero site presence. |
| `hasOfferCatalog` → `makesOffer` with `@id` refs | Offers now point at real, rankable `Service` nodes on real URLs. |
| No `streetAddress` | Deliberate. If there is no premises customers visit, do **not** publish one — locality + region is honest and sufficient, and publishing a residential address you then hide on GBP creates an inconsistency Google notices. |
| No `aggregateRating` / `review` | **Deliberate and non-negotiable — see §5.4c.** |

### 5.4b Person JSON-LD — new file `about.html`

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://cognexa.co.za/about.html#founder",
        "name": "[FULL NAME]",
        "jobTitle": "Founder & AI Automation Engineer",
        "worksFor": { "@id": "https://cognexa.co.za/#organization" },
        "url": "https://cognexa.co.za/about.html",
        "image": "https://cognexa.co.za/assets/images/founder.jpg",
        "email": "hello\u0040cognexa.co.za",
        "knowsAbout": [
          "AI voice agents",
          "WhatsApp Business API",
          "workflow automation",
          "n8n",
          "Make.com",
          "POPIA",
          "custom CRM development"
        ],
        "sameAs": ["https://www.linkedin.com/in/[HANDLE]/"]
      },
      {
        "@type": "AboutPage",
        "@id": "https://cognexa.co.za/about.html#webpage",
        "url": "https://cognexa.co.za/about.html",
        "name": "About Cognexa",
        "isPartOf": { "@id": "https://cognexa.co.za/#website" },
        "about": { "@id": "https://cognexa.co.za/#organization" },
        "inLanguage": "en-ZA"
      }
    ]
  }
  </script>
```

### 5.4c ⛔ The schema compliance trap — do not add review markup

Google's exact wording:

> *"If the entity that's being reviewed controls the reviews about itself, their pages that use `LocalBusiness` or any other type of `Organization` structured data are ineligible for star review feature."*

`ProfessionalService` **is** an `Organization` subtype. Therefore:

- ❌ **Never** add `aggregateRating` or `review` to the `#organization` node. Zero stars, and current practitioner reporting is that Google now treats self-serving review markup as a policy violation that can revoke rich-result eligibility **site-wide** — which would kill the existing `FAQPage` and `BlogPosting` results. Pure downside.
- ❌ Do not embed a third-party review widget and mark it up. Widget-sourced reviews on your own domain count as self-serving too.
- ✅ Plain HTML testimonials with named clients, logos and results are **completely fine** and convert well.
- ✅ Stars come from **Google reviews on GBP**, surfaced in the Knowledge Panel and Maps. That is the entire point of the policy.

Add this guard comment above the JSON-LD block so nobody re-introduces it:

```html
  <!-- DO NOT add aggregateRating or review to #organization — self-serving review
       policy makes Organization subtypes ineligible for star results and risks
       site-wide rich-result revocation.
       https://developers.google.com/search/docs/appearance/structured-data/review-snippet -->
```

### 5.5 Service page `@graph` — template for every new service page

Paste into each service page's `<head>`, replacing `SLUG`, the names, and the price band.

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://cognexa.co.za/ai-receptionist-south-africa.html#service",
        "name": "AI receptionist for South African businesses",
        "serviceType": "AI receptionist",
        "alternateName": ["AI voice agent", "AI phone answering service", "virtual AI receptionist"],
        "description": "An AI voice agent that answers every inbound call 24/7, qualifies the caller, books the appointment into your calendar, sends the confirmation, and escalates to a human when the call needs one.",
        "provider": { "@id": "https://cognexa.co.za/#organization" },
        "areaServed": [
          { "@type": "Country", "name": "South Africa" },
          { "@type": "AdministrativeArea", "name": "Gauteng" }
        ],
        "audience": {
          "@type": "BusinessAudience",
          "name": "South African small and medium businesses"
        },
        "availableLanguage": ["en", "af", "zu"],
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://cognexa.co.za/ai-receptionist-south-africa.html",
          "servicePhone": { "@type": "ContactPoint", "telephone": "+27662412155" }
        },
        "offers": {
          "@type": "Offer",
          "url": "https://cognexa.co.za/ai-receptionist-south-africa.html#pricing",
          "priceCurrency": "ZAR",
          "availability": "https://schema.org/InStock",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "ZAR",
            "minPrice": 2500,
            "maxPrice": 7500,
            "valueAddedTaxIncluded": false,
            "description": "Monthly from R2 500 including 500 minutes; once-off build from R12 000."
          }
        },
        "mainEntityOfPage": { "@id": "https://cognexa.co.za/ai-receptionist-south-africa.html#webpage" }
      },
      {
        "@type": "WebPage",
        "@id": "https://cognexa.co.za/ai-receptionist-south-africa.html#webpage",
        "url": "https://cognexa.co.za/ai-receptionist-south-africa.html",
        "name": "AI Receptionist South Africa — Cost, Setup & What It Handles",
        "isPartOf": { "@id": "https://cognexa.co.za/#website" },
        "about": { "@id": "https://cognexa.co.za/ai-receptionist-south-africa.html#service" },
        "datePublished": "2026-08-16",
        "dateModified": "2026-08-16",
        "inLanguage": "en-ZA",
        "breadcrumb": { "@id": "https://cognexa.co.za/ai-receptionist-south-africa.html#breadcrumb" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://cognexa.co.za/ai-receptionist-south-africa.html#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cognexa.co.za/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cognexa.co.za/services.html" },
          { "@type": "ListItem", "position": 3, "name": "AI receptionist" }
        ]
      }
    ]
  }
  </script>
```

### 5.5b Blog post schema upgrades — apply to all 7 posts

```json
// BEFORE (ai-receptionist-cost-south-africa.html, BlogPosting node)
      "image": "https://cognexa.co.za/assets/images/blog-receptionist-cost.jpg",
      "datePublished": "2026-07-22",
      "dateModified": "2026-07-22",
      "author": {
        "@type": "Organization",
        "name": "Cognexa",
        "url": "https://cognexa.co.za/"
      },
      "publisher": { "@type": "Organization", "@id": "https://cognexa.co.za/#organization", "name": "Cognexa", "alternateName": "Cognexa AI Business Solutions", "url": "https://cognexa.co.za/", "telephone": "+27 66 241 2155", "logo": "https://cognexa.co.za/assets/icons/favicon.svg" },
      "mainEntityOfPage": "https://cognexa.co.za/ai-receptionist-cost-south-africa.html"
```

```json
// AFTER
      "image": {
        "@type": "ImageObject",
        "url": "https://cognexa.co.za/assets/images/blog-receptionist-cost.jpg",
        "width": 1200,
        "height": 675
      },
      "datePublished": "2026-07-22",
      "dateModified": "2026-09-15",
      "inLanguage": "en-ZA",
      "articleSection": "AI voice agents",
      "author": { "@id": "https://cognexa.co.za/about.html#founder" },
      "publisher": { "@id": "https://cognexa.co.za/#organization" },
      "isPartOf": { "@id": "https://cognexa.co.za/#website" },
      "mainEntityOfPage": { "@id": "https://cognexa.co.za/ai-receptionist-cost-south-africa.html" }
```

The inline `publisher` re-declaration currently omits `address`, so on a post page the Organization node has **no address at all**. Using the `@id` reference fixes that and keeps one canonical entity definition.

### 5.5c `blog.html` CollectionPage — full replacement

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://cognexa.co.za/blog.html#webpage",
        "name": "Cognexa Insights",
        "url": "https://cognexa.co.za/blog.html",
        "description": "Plain-English answers to the questions South African businesses actually ask about AI chatbots, AI receptionists, voice agents and workflow automation.",
        "isPartOf": { "@id": "https://cognexa.co.za/#website" },
        "publisher": { "@id": "https://cognexa.co.za/#organization" },
        "inLanguage": "en-ZA",
        "breadcrumb": { "@id": "https://cognexa.co.za/blog.html#breadcrumb" },
        "mainEntity": {
          "@type": "ItemList",
          "itemListOrder": "https://schema.org/ItemListOrderDescending",
          "numberOfItems": 7,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "url": "https://cognexa.co.za/ai-receptionist-cost-south-africa.html", "name": "What does an AI receptionist cost in South Africa? (2026 guide)" },
            { "@type": "ListItem", "position": 2, "url": "https://cognexa.co.za/ai-voice-agent-vs-ivr-vs-receptionist.html", "name": "AI voice agent vs IVR vs human receptionist: which should answer your calls?" },
            { "@type": "ListItem", "position": 3, "url": "https://cognexa.co.za/whatsapp-ai-chatbot-popia-compliance.html", "name": "Is a WhatsApp AI chatbot POPIA compliant? What SA businesses need to know" },
            { "@type": "ListItem", "position": 4, "url": "https://cognexa.co.za/small-business-ai-workflow-automation-examples.html", "name": "What can you actually automate in a small business? 12 AI workflows that pay off first" },
            { "@type": "ListItem", "position": 5, "url": "https://cognexa.co.za/ai-agent-vs-chatbot-difference.html", "name": "AI agent vs chatbot: what's the difference, and which does your business need?" },
            { "@type": "ListItem", "position": 6, "url": "https://cognexa.co.za/how-long-ai-automation-setup-roi.html", "name": "How long does AI automation take to set up — and when does it pay for itself?" },
            { "@type": "ListItem", "position": 7, "url": "https://cognexa.co.za/ai-chatbot-south-african-languages.html", "name": "Can an AI chatbot or voice agent speak Afrikaans, isiZulu and other South African languages?" }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://cognexa.co.za/blog.html#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cognexa.co.za/" },
          { "@type": "ListItem", "position": 2, "name": "Insights" }
        ]
      }
    ]
  }
  </script>
```

### 5.6 Internal linking markup — homepage station CTAs

The four station CTAs currently all point at `#contact`, a section that is `display:none` under JS. Repoint them at the new service pages with descriptive anchor text.

```html
<!-- index.html:251  BEFORE -->
          <a class="station-link" href="#contact">Explore conversational AI <span aria-hidden="true">&rarr;</span></a>
<!-- AFTER -->
          <a class="station-link" href="/whatsapp-ai-chatbot-south-africa.html">AI chatbots &amp; WhatsApp automation for South African business <span aria-hidden="true">&rarr;</span></a>

<!-- index.html:269  BEFORE -->
          <a class="station-link" href="#contact">Explore voice agents <span aria-hidden="true">&rarr;</span></a>
<!-- AFTER -->
          <a class="station-link" href="/ai-receptionist-south-africa.html">AI voice agents and AI receptionists <span aria-hidden="true">&rarr;</span></a>

<!-- index.html:287  BEFORE -->
          <a class="station-link" href="#contact">Explore workflow automation <span aria-hidden="true">&rarr;</span></a>
<!-- AFTER -->
          <a class="station-link" href="/workflow-automation-south-africa.html">Workflow automation for quoting, invoicing, bookings and CRM <span aria-hidden="true">&rarr;</span></a>

<!-- index.html:305  BEFORE -->
          <a class="station-link" href="#contact">Explore 3D web experiences <span aria-hidden="true">&rarr;</span></a>
<!-- AFTER -->
          <a class="station-link" href="/3d-websites.html">Immersive 3D website design <span aria-hidden="true">&rarr;</span></a>
```

**Posts → service pages.** Replace the `index.html#station-*` fragment links with real service URLs:

| File | Current target | New target | Anchor text |
|---|---|---|---|
| `ai-receptionist-cost-south-africa.html` | `index.html#station-chat` | `/whatsapp-ai-chatbot-south-africa.html` | "WhatsApp and web chat" |
| `ai-receptionist-cost-south-africa.html` | `index.html#station-workflow` | `/workflow-automation-south-africa.html` | "workflow automation" |
| `ai-receptionist-cost-south-africa.html` | `index.html#station-voice` | `/ai-receptionist-south-africa.html` | "AI receptionist for South African businesses" |
| `ai-voice-agent-vs-ivr-vs-receptionist.html` | all three `#station-*` | the three service pages | "AI voice agent build" / "WhatsApp and website chatbots" / "automated workflows" |
| `whatsapp-ai-chatbot-popia-compliance.html` | `#station-chat`, `#station-workflow` | WhatsApp page, quoting/invoicing page | "POPIA-aware WhatsApp chatbot build" / "automated booking and follow-up workflows" |
| `small-business-ai-workflow-automation-examples.html` | `#station-voice`, `#station-workflow` | receptionist page, workflow page | "AI voice agent that answers every call" / "workflow automation built around your tools" |
| `ai-agent-vs-chatbot-difference.html` | `#station-chat`, `#station-workflow` | WhatsApp page, workflow page | descriptive |
| `ai-chatbot-south-african-languages.html` | `#station-voice` | receptionist page | "AI receptionist that speaks Afrikaans and isiZulu" |
| `how-long-ai-automation-setup-roi.html` | *(none)* | **add** a workflow-page link | "workflow automation for South African business" |

**Boost the two weakest-linked posts** (3 and 4 in-links respectively) by adding one contextual link each from an already-indexed post:

- In `ai-receptionist-cost-south-africa.html`, after the "Setup fees vs monthly fees" section, add: `<a href="/ai-agent-vs-chatbot-difference.html">the difference between an AI chatbot and an AI agent</a>`.
- In `small-business-ai-workflow-automation-examples.html`, in the admin block, add: `<a href="/how-long-ai-automation-setup-roi.html">how long each of these takes to build</a>`.

**Give `blog.html` a real body-copy in-link.** It currently receives 18 links, **all nav/footer boilerplate**, which Google discounts heavily. In `index.html` at the end of `#local` (line 458), add: `<a href="/blog.html">our guides on AI automation for South African business</a>`.

### 5.7 Branded 404 page — new file `404.html`

```html
<!DOCTYPE html>
<html lang="en-ZA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page not found (404) | Cognexa</title>
  <meta name="robots" content="noindex, follow">
  <meta name="theme-color" content="#0f1117">
  <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="stylesheet" href="/css/styles.css?v=26">
</head>
<body class="page-static">
  <script>document.body.classList.add('js-enabled');</script>

  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-nav">
    <a class="nav-brand" href="/">Cognexa</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu">
      <span class="sr-only">Menu</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
        <line x1="4" y1="6" x2="20" y2="6"></line>
        <line x1="4" y1="12" x2="20" y2="12"></line>
        <line x1="4" y1="18" x2="20" y2="18"></line>
      </svg>
    </button>
    <nav id="nav-menu" class="nav-menu" aria-label="Primary">
      <a class="nav-link" href="/#services">Services</a>
      <a class="nav-link" href="/#process">Process</a>
      <a class="nav-link" href="/#work">Work</a>
      <a class="nav-link" href="/blog.html">Insights</a>
      <a class="nav-link" href="/#contact">Contact</a>
      <a class="btn btn-primary" href="/#contact">Start your build</a>
    </nav>
  </header>

  <main id="main" tabindex="-1">
    <section class="blog-index">
      <h1>That page isn&rsquo;t on the line.</h1>
      <p class="section-sub">The link is broken or the page has moved. Here&rsquo;s where to go instead.</p>
      <ul>
        <li><a href="/">Cognexa home &mdash; AI automation for South African business</a></li>
        <li><a href="/ai-receptionist-south-africa.html">AI receptionists and voice agents</a></li>
        <li><a href="/whatsapp-ai-chatbot-south-africa.html">WhatsApp AI chatbots</a></li>
        <li><a href="/workflow-automation-south-africa.html">Workflow automation &mdash; quoting, invoicing, bookings, CRM</a></li>
        <li><a href="/pricing.html">Pricing in Rand</a></li>
        <li><a href="/blog.html">Insights &mdash; guides on AI automation</a></li>
        <li><a href="/#contact">Contact Cognexa</a></li>
      </ul>
      <p>Still stuck? Email <a href="mailto:hello&#64;cognexa&#46;co&#46;za">hello&#64;cognexa&#46;co&#46;za</a>
         or WhatsApp <a href="https://wa.me/27662412155">066 241 2155</a>.</p>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-about">
        <p class="footer-brand">Cognexa</p>
        <p class="footer-tagline">AI business solutions, built in South Africa.</p>
        <p class="footer-contact"><a href="tel:+27662412155">066 241 2155</a> &middot; <a href="mailto:hello&#64;cognexa&#46;co&#46;za">hello&#64;cognexa&#46;co&#46;za</a></p>
        <p class="footer-locality">Centurion, Gauteng, South Africa</p>
      </div>
      <nav class="footer-nav" aria-label="Footer">
        <a href="/#services">Services</a>
        <a href="/#process">Process</a>
        <a href="/#work">Work</a>
        <a href="/blog.html">Insights</a>
        <a href="/about.html">About</a>
        <a href="/#contact">Contact</a>
      </nav>
    </div>
    <p class="footer-copy">&copy; <span class="footer-year">2026</span> Cognexa</p>
  </footer>

  <script defer src="/js/main.js?v=26"></script>
</body>
</html>
```

⚠️ Do **not** add `404.html` to `sitemap.xml`. It carries `noindex, follow` deliberately — `follow` keeps the recovery links crawlable.

Also add the missing `footer-locality` line (currently on `index.html` only) to the footer of all 8 other pages — `HTML NAP matching GBP NAP` is factor #15 in the 2026 local study.

### 5.8 `sitemap.xml` — full regeneration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Core -->
  <url><loc>https://cognexa.co.za/</loc><lastmod>2026-08-12</lastmod></url>
  <url><loc>https://cognexa.co.za/about.html</loc><lastmod>2026-08-12</lastmod></url>
  <url><loc>https://cognexa.co.za/pricing.html</loc><lastmod>2026-08-19</lastmod></url>
  <url><loc>https://cognexa.co.za/services.html</loc><lastmod>2026-08-19</lastmod></url>
  <url><loc>https://cognexa.co.za/calculator.html</loc><lastmod>2026-08-26</lastmod></url>

  <!-- Service pages -->
  <url><loc>https://cognexa.co.za/ai-receptionist-south-africa.html</loc><lastmod>2026-08-16</lastmod></url>
  <url><loc>https://cognexa.co.za/whatsapp-ai-chatbot-south-africa.html</loc><lastmod>2026-08-19</lastmod></url>
  <url><loc>https://cognexa.co.za/ai-voice-agents-south-africa.html</loc><lastmod>2026-08-26</lastmod></url>
  <url><loc>https://cognexa.co.za/workflow-automation-south-africa.html</loc><lastmod>2026-08-30</lastmod></url>
  <url><loc>https://cognexa.co.za/automated-quoting-invoicing.html</loc><lastmod>2026-09-02</lastmod></url>
  <url><loc>https://cognexa.co.za/booking-automation-south-africa.html</loc><lastmod>2026-09-05</lastmod></url>
  <url><loc>https://cognexa.co.za/custom-crm-development-south-africa.html</loc><lastmod>2026-09-09</lastmod></url>
  <url><loc>https://cognexa.co.za/3d-websites.html</loc><lastmod>2026-09-12</lastmod></url>

  <!-- Insights -->
  <url><loc>https://cognexa.co.za/blog.html</loc><lastmod>2026-08-12</lastmod></url>
  <url><loc>https://cognexa.co.za/ai-receptionist-cost-south-africa.html</loc><lastmod>2026-07-26</lastmod></url>
  <url><loc>https://cognexa.co.za/ai-voice-agent-vs-ivr-vs-receptionist.html</loc><lastmod>2026-07-26</lastmod></url>
  <url><loc>https://cognexa.co.za/whatsapp-ai-chatbot-popia-compliance.html</loc><lastmod>2026-07-26</lastmod></url>
  <url><loc>https://cognexa.co.za/small-business-ai-workflow-automation-examples.html</loc><lastmod>2026-07-26</lastmod></url>
  <url><loc>https://cognexa.co.za/ai-agent-vs-chatbot-difference.html</loc><lastmod>2026-07-26</lastmod></url>
  <url><loc>https://cognexa.co.za/how-long-ai-automation-setup-roi.html</loc><lastmod>2026-07-26</lastmod></url>
  <url><loc>https://cognexa.co.za/ai-chatbot-south-african-languages.html</loc><lastmod>2026-07-26</lastmod></url>

</urlset>
```

**Rules.** Only include URLs that already exist and return 200 — a sitemap full of 404s is a trust signal you cannot afford to burn. `lastmod` = the date the **content** materially changed. No `<changefreq>`, no `<priority>` — Google ignores both. Never bulk-set every `lastmod` to today.

### 5.9 The missing comparison table — `ai-receptionist-cost-south-africa.html`

Insert immediately after the `<h2>How much does an AI receptionist cost in South Africa?</h2>` and its answer paragraph.

```html
      <div class="table-scroll">
        <table>
          <caption>AI receptionist vs human receptionist vs answering service vs IVR — monthly cost in South Africa, August 2026</caption>
          <thead>
            <tr>
              <th scope="col">Option</th>
              <th scope="col">Typical monthly cost (ZAR)</th>
              <th scope="col">Once-off setup</th>
              <th scope="col">Hours covered</th>
              <th scope="col">Handles after-hours</th>
              <th scope="col">Afrikaans / isiZulu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Cognexa AI receptionist (custom build)</th>
              <td>R2 500 – R7 500</td><td>From R12 000</td><td>24/7</td><td>Yes</td><td>Yes, tested per language</td>
            </tr>
            <tr>
              <th scope="row">Off-the-shelf AI receptionist platform</th>
              <td>R800 – R5 000</td><td>Usually none</td><td>24/7</td><td>Yes</td><td>Varies by vendor</td>
            </tr>
            <tr>
              <th scope="row">Full-time human receptionist</th>
              <td>R8 000 – R16 000 gross, plus UIF, SDL, leave cover and 13th cheque</td><td>Recruitment cost</td><td>~45 of 168 hours/week</td><td>No</td><td>Yes</td>
            </tr>
            <tr>
              <th scope="row">Human answering service (per-call)</th>
              <td>R4 100 – R28 500</td><td>Usually none</td><td>Varies</td><td>Sometimes</td><td>Varies</td>
            </tr>
            <tr>
              <th scope="row">Traditional IVR / PABX menu</th>
              <td>R300 – R1 500</td><td>R2 000 – R8 000</td><td>24/7</td><td>Menu only</td><td>Recorded prompts only</td>
            </tr>
          </tbody>
        </table>
      </div>
```

⚠️ **Replace every figure with numbers you can defend and cite.** Publishing wrong prices is worse than publishing none. Cite the source for each row in the "Sources & further reading" block.

Add the wrapper CSS (`css/styles.css`, near the `.post` rules ~line 1985):

```css
/* Comparison tables — must scroll inside their own container at 360px,
   never causing page-level horizontal scroll (html { overflow-x: clip }
   would silently truncate rather than allow scrolling). */
.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: var(--space-lg, 2rem) 0;
  border: 1px solid var(--border, #2e3347);
  border-radius: var(--radius-md, 10px);
}
.table-scroll table {
  border-collapse: collapse;
  width: 100%;
  min-width: 34rem;
  font-size: 0.9375rem;
}
.table-scroll caption {
  caption-side: top;
  text-align: left;
  padding: 0.875rem 1rem;
  color: var(--text-secondary, #8b8fa3);
  font-size: 0.875rem;
}
.table-scroll th,
.table-scroll td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border, #2e3347);
  vertical-align: top;
}
.table-scroll thead th {
  background: var(--bg-card, #222533);
  color: var(--text-primary, #e8eaf0);
  font-weight: 600;
  white-space: nowrap;
}
.table-scroll tbody th { font-weight: 600; }
.table-scroll tbody tr:last-child th,
.table-scroll tbody tr:last-child td { border-bottom: 0; }
```

### 5.10 `.htaccess` — exact additions

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On

  # ------------------------------------------------------------------
  # 1a. Collapse /index.html (and any /dir/index.html) to the directory URL,
  #     redirecting straight to the canonical host so protocol/www variants
  #     of index.html resolve in ONE hop rather than two.
  #     THE_REQUEST is used so Apache's internal DirectoryIndex rewrite to
  #     index.html does not re-trigger this rule and loop.
  # ------------------------------------------------------------------
  RewriteCond %{THE_REQUEST} \s/+(([^?\s]*/)?)index\.html[\s?] [NC]
  RewriteRule ^ https://cognexa.co.za/%1 [R=301,L]

  # ------------------------------------------------------------------
  # 1b. Canonical host/protocol redirect.
  #
  # NOTE ON HOP COUNT (verified live 2026-08-09):
  #   http://cognexa.co.za/      -> 301 -> https://cognexa.co.za/     (1 hop) OK
  #   https://www.cognexa.co.za/ -> 301 -> https://cognexa.co.za/     (1 hop) OK
  #   http://www.cognexa.co.za/  -> 301 -> https://www.cognexa.co.za/
  #                              -> 301 -> https://cognexa.co.za/     (2 hops)
  #
  # The 2-hop case is NOT caused by this rule. Hostinger's edge CDN
  # (Server: hcdn) performs the HTTP->HTTPS upgrade before the origin
  # .htaccess executes, preserving the www host, so the [OR] condition
  # never sees the http+www request. To collapse it, set the primary
  # domain to non-www in hPanel, or disable hPanel "Force HTTPS" and let
  # this single rule do the work. Cosmetic only — Google follows chains
  # of <=3 hops without penalty.
  # ------------------------------------------------------------------
  RewriteCond %{HTTPS} !=on [OR]
  RewriteCond %{HTTP_HOST} ^www\. [NC]
  RewriteRule ^(.*)$ https://cognexa.co.za/$1 [R=301,L]
</IfModule>

# ------------------------------------------------------------------
# 1c. Branded error document.
# ------------------------------------------------------------------
ErrorDocument 404 /404.html
```

And extend the compression type list — it currently omits `text/plain` (robots.txt, llms.txt) and `application/xml` (sitemap.xml):

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>
```

⚠️ **Test the `index.html` rule on a staging path first if possible.** After deploying, immediately run `curl -sI https://cognexa.co.za/` — if it returns 301 instead of 200, you have a loop and must revert.

### 5.11 Favicon set

Generate from `assets/icons/favicon.svg`:

| File | Size | Location |
|---|---|---|
| `favicon.ico` | 32×32 | **repo root** (currently 404s) |
| `apple-touch-icon.png` | 180×180 | `assets/icons/` |
| `icon-192.png` | 192×192 | `assets/icons/` |
| `icon-512.png` | 512×512 | `assets/icons/` |
| `logo-512.png` | 512×512 | `assets/images/` — for the Organization `logo` |
| `site.webmanifest` | — | repo root |

In every `<head>`, beside the existing SVG icon link:

```html
  <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
```

```json
{
  "name": "Cognexa",
  "short_name": "Cognexa",
  "icons": [
    { "src": "/assets/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/assets/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#0f1117",
  "background_color": "#0f1117",
  "display": "standalone",
  "start_url": "/"
}
```

### 5.12 Visible breadcrumb UI — all 7 posts

Insert immediately after `<main id="main" tabindex="-1">` (line ~129):

```html
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/blog.html">Insights</a></li>
          <li><span aria-current="page">AI receptionist cost</span></li>
        </ol>
      </nav>
```

```css
/* css/styles.css */
.breadcrumb { margin-bottom: var(--space-md, 1.25rem); font-size: 0.875rem; }
.breadcrumb ol { list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; margin: 0; }
.breadcrumb li + li::before { content: "›"; margin-right: 0.5rem; color: var(--text-muted, #5a5e72); }
.breadcrumb a { color: var(--text-secondary, #8b8fa3); text-decoration: none; }
.breadcrumb a:hover, .breadcrumb a:focus-visible { color: var(--text-primary, #e8eaf0); text-decoration: underline; }
.breadcrumb [aria-current="page"] { color: var(--text-muted, #5a5e72); }
```

This adds 14 crawlable links to `/` and `/blog.html` — and `blog.html` currently has zero non-boilerplate in-links.

### 5.13 OG tag consistency

`og:locale` and `og:image:alt` exist on `index.html` only. Add to `blog.html` and all 7 posts, after the existing `og:image` block:

```html
  <meta property="og:locale" content="en_ZA">
  <meta property="og:image:alt" content="[reuse the descriptive alt text already written for this post's hero image]">
```

`blog.html` additionally needs:

```html
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
```

Also change `<html lang="en">` → `<html lang="en-ZA">` on all 9 files. This is safe and needs no `hreflang` cluster — the site is single-language, single-market. **Do not build `hreflang`.**

### 5.14 `privacy-policy.html`

Must cover: what the `#contact` form and intake modal collect; the Google Apps Script endpoint that receives intake submissions (`js/main.js:396`); GA4 measurement ID `G-5VH5BBTCL7` and its cookies; retention period; the nominated Information Officer and their contact details; and how a data subject requests access, correction or deletion under POPIA. Link from the footer nav on all pages. Add to `sitemap.xml` and `llms.txt`.

### 5.15 `robots.txt` — full replacement

```
# Search engines
User-agent: *
Allow: /

# ── AI retrieval & citation ────────────────────────────────
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: MistralAI-User
Allow: /

# ── Training corpora: brand knowledge inside the weights ───
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://cognexa.co.za/sitemap.xml
```

Additionally, whitelist the published crawler IP ranges at Hostinger's WAF/CDN level (`openai.com/searchbot.json`, `openai.com/chatgpt-user.json`, `claude.com/crawling/bots.json`, `perplexity.com/perplexitybot.json`, `perplexity.com/perplexity-user.json`). `Perplexity-User` in particular **ignores robots.txt by design** and can be silently blocked at the edge even when robots.txt allows it.

---

## 6. Off-site foundation — the ordered checklist

### 6.0 Do this before anything else: fix the canonical NAP string

Write it once. Never vary a character. This is what makes every subsequent listing count.

```
Name:        Cognexa
Address:     Centurion, Gauteng, South Africa
Phone:       +27 66 241 2155
Email:       hello@cognexa.co.za
Website:     https://cognexa.co.za/
Description: Cognexa is an AI automation agency in Centurion, Gauteng. We build
             AI receptionists and voice agents, WhatsApp and website chatbots,
             and workflow automation for quoting, invoicing, bookings, email
             triage and CRM — including custom CRMs.
Logo:        /assets/images/logo-512.png (same file everywhere)
```

**⚠️ Trading-name decision — make it deliberately.** "Keywords in GBP Business Title" is the #3 local ranking factor (score 223). But stuffing the GBP name is a reportable guideline breach. Two clean options, no middle ground: **(a)** leave it as `Cognexa` and forgo the factor; **(b)** register `Cognexa AI Automation` as an actual CIPC trading name and use it consistently on invoices, contracts, email signatures, website footer and *every* citation. Do **not** do the halfway thing — naming the GBP profile "Cognexa | AI Automation Agency Centurion" without the real-world name change is the reportable version. Note the schema currently declares two `alternateName` values; pick one, make it real, use it uniformly.

### 6.1 Tier 0 — non-negotiable, all free, week 1

| # | Source | URL | Note |
|---|---|---|---|
| 1 | **Google Business Profile** | business.google.com | P0-3. Google is 92.12% of SA search. |
| 2 | **LinkedIn Company Page** | linkedin.com/company/setup/new | P0-9. 2nd most-cited domain in AI answers. |
| 3 | **Bing Webmaster Tools** | bing.com/webmasters | P0-2. Free AI Performance citation report. |
| 4 | **Apple Business Connect** | mapsconnect.apple.com | ZA **is** supported; merged into Apple Business Apr 2026. Feeds Apple Maps + Siri. |
| 5 | **Facebook Business Page** | facebook.com/pages/create | 10.7% AIO citation share as a domain; Meta place data underpins WhatsApp Business. |
| 6 | **Bing Places** | bing.com/business | Attempt it. Sources conflict on ZA availability — if unsupported, skip. |

### 6.2 Tier 1 — SA core citations, all free, weeks 2–3

| # | Source | URL | Worth it |
|---|---|---|---|
| 7 | **Brabys** | brabys.com | ✅ Highest-value SA directory (Moz DA ~41, 1M+ monthly uniques) |
| 8 | **Bizcommunity company listing** | bizcommunity.com/ListCompany.aspx | ✅ Free listing on a DA-70s SA business domain — best free-to-value ratio available |
| 9 | **Yellow Pages SA** | yellowpages.co.za | ✅ Incumbent brand |
| 10 | **Yellosa** | yellosa.co.za | ✅ Has city×category pages you can rank *within* (`/category/information-technology/city:centurion`) |
| 11 | **Kompass SA** | za.kompass.com | ✅ The only genuinely B2B directory in the SA set |
| 12 | **Hotfrog SA** | hotfrog.co.za | ✅ Global network |
| 13 | **Cylex SA** | cylex.co.za | ✅ Global network |
| 14 | **SAYellow** | sayellow.com | ✅ |
| 15 | **Snupit** | snupit.co.za/pro.aspx | ✅ **A lead channel, not a citation.** Free profile; R24–R30/lead credit; R1bn+ generated. Verify an IT/software category exists before buying credits — density skews home services. |
| 16 | **Capital City Business Chamber (Centurion)** | ccbc.co.za | ✅ Centurion-specific — maximum local relevance |
| 17 | **Hellopeter** | business.hellopeter.com | ⚠️ **Claim defensively only.** 1.7M consumers but 65% of reviews are negative and the audience is B2C retail/insurance. Claim it before someone else does; don't invest. |
| 18 | **InfoIsInfo SA / Fyple / nichemarket / Ananzi / MySheriff** | infoisinfo.co.za, fyple.co.za, nichemarket.co.za, ananzi.co.za, mysheriff.co.za | ⚪ Marginal. Do them in one sitting or skip. |

**Then stop.** Do not buy 200-citation packages. The long tail of SA directories (nichemarket catalogues 42) are DA 5–20 with no traffic; RainbowNation is dead. Almost all SA directory links are `nofollow` — build them for NAP consistency and **entity corroboration**, not link equity. The leaked `sourceType` attribute ties link value to the source's indexing tier: links from "supplemental" or "blackhole" tier pages carry near-zero weight, so bulk buying is not merely risky, it is arithmetically pointless.

### 6.3 Tier 2 — B2B tech & agency directories, weeks 3–4

| # | Source | URL | Note |
|---|---|---|---|
| 19 | **TechBehemoths** | techbehemoths.com/companies/centurion | ✅ **High priority.** The Centurion page already exists listing ~52 IT companies with Cognexa **absent**. |
| 20 | **DesignRush** | designrush.com/agency/ai-companies/za | ✅ **Already listed** as "Cognexa AI — Centurion, South Africa". Verify, claim, enrich. Free tier only. |
| 21 | **Crunchbase** | crunchbase.com | ✅ Feeds LLM training data and entity graphs — directly helps disambiguation |
| 22 | **GoodFirms** | goodfirms.co/artificial-intelligence/south-africa | ✅ Free tier is genuinely functional |
| 23 | **Clutch (free Basic)** | clutch.co/get-listed | ✅ Free tier. **Requires 3 verified client reviews** (phone or LinkedIn verified) — depends on the review programme. Clutch's `/za/developers/artificial-intelligence/chatbots` page already outranks most agency sites. **Do NOT pay for Sponsored** (~$1,500–1,800/yr, only cost-effective at $50k+ deal sizes). |
| 24 | **The Manifest** | themanifest.com/za/artificial-intelligence/chatbot/companies | ✅ Inherits from Clutch automatically |
| 25 | **Sortlist** | sortlist.com | ⚪ Ranks for "best AI automation agencies south africa" |
| 26 | **Bark.com ZA** | bark.com/en/za/ | ⚪ A Bark profile ranks **#1** for `automation agency cape town`, above the vendor's own homepage |
| 27 | **Semrush Agency Partners** | agencies.semrush.com | ⚪ Ranks #2 for `automation agency cape town` |
| — | G2 / Capterra ZA | — | ⛔ **Skip until productised.** These are software-*product* directories; an agency has nothing to list. |

### 6.4 Tier 2b — platform partner directories, month 2

| Source | URL | Note |
|---|---|---|
| **n8n Expert Partners** | experts.n8n.io · n8n.io/expert-partners/ | **No SA agency appears in the directory.** First-mover advantage on "n8n agency South Africa". Application-based. |
| **n8n Affiliate** | n8n.io/affiliates/ | Open now, immediate |
| **HubSpot Solutions Directory** | ecosystem.hubspot.com/marketplace/solutions/crm-implementation/south-africa | Free Solutions Provider tier; thin SA competition |
| **Make.com Partners** | make.com/en/partners | |
| **Zoho / Pipedrive partners** | zoho.com/partners · pipedrive.com/en/partners | |

### 6.5 Tier 3 — earned mentions, months 2–4

**The core insight:** SA tech media publish **data from named practitioners, not launch announcements**. BusinessTech receives 50–100 press releases per day and states plainly that it *"do[es] not have any relationships with PR agencies. We only establish media relationships with companies."* A four-person Centurion agency announcing itself gets ignored. The same agency publishing numbers nobody else has gets covered.

**Build one original SA dataset first.** Two concepts with genuine pickup potential, both seeded by content that already exists:

1. *"We benchmarked N AI voice agents on South African English, Afrikaans and code-switched speech"* — word error rates, a comparison table, audio samples. **Nobody in SA has published this.** Seeded by `ai-chatbot-south-african-languages.html`, one of only 3 indexed posts.
2. *"We collected N receptionist salary quotes vs AI receptionist costs across Gauteng, WC and KZN"* — a real ZAR cost benchmark. Seeded by `ai-receptionist-cost-south-africa.html`.

Publish on cognexa.co.za with stated methodology, sample size, a chart and a downloadable dataset. Post it on **LinkedIn first and tag the journalists** — SA tech reporters actively source from LinkedIn.

| Target | Route | Cost | Angle |
|---|---|---|---|
| **WhichVoIP** | whichvoip.co.za/advertise/ | Paid, editorially disclosed | **Highest-value single target.** Independent SA telecoms comparison since 2009; holds two slots for `ai voice agent south africa`; publishes "Best AI Voice Agents and AI Receptionists in South Africa (2026)". Inclusion = topical link + qualified referrals. |
| **RCCI (Randburg Chamber)** | rcci.co.za | Free | **Ranks #1 for `ai voice agent south africa`** with a thought-leadership piece. Offer a guest article. |
| **Bizcommunity** | bizcommunity.com/SubmitNews.aspx (free) · R1,500/single release · R9,000/yr press office | Free → cheap | Best free-to-cheap ratio. Do the free listing today; test one R1,500 release. |
| **SME South Africa** | smesouthafrica.co.za/articles/ | Free | **Ranks #1 for `business process automation south africa`.** 100k+ monthly visitors; SME audience = exact ICP. |
| **LocalPros.co.za** | localpros.co.za/whatsapp/south-africa/best-chatbots-providers/ | Free | Their WhatsApp provider lists contain **only international BSPs** — a genuine editorial gap for a local agency. |
| **BusinessTech** | kevin@businesstech.co.za | Free editorial (hard) | Direct company-to-publisher only. Lead with data. |
| **TechCentral** | techcentral.co.za/advertise/ | Paid | **Podcast/round-table beats a banner** — produces an interview plus a permanent link. |
| **MyBroadband** | mybroadband.co.za + **the forums** (free) | Paid articles / free forums | The forums are where SA IT decision-makers actually are, and almost no agency participates properly. Genuinely underpriced. |
| **ITWeb** | itweb.co.za/office (Virtual Press Office) | Paid annual | Most direct paid path to a durable presence on SA's leading B2B tech domain. |
| **Also pitch** | Stuff SA · htxt.africa · Ventureburn · Memeburn · Moneyweb · iAfrica · TechCabal · Connecting Africa · Creamer Media/Engineering News | Free editorial | Creamer is the sleeper — the *industrial* quoting/invoicing/workflow angle is under-served and they publish that beat. |
| **MyPR** | mypr.co.za/submit/free/ | Free | Low-effort distribution baseline |

**Anchor-text warning.** The leaked `phraseAnchorSpamDays` attribute measures *"over how many days 80% of these phrases were discovered."* Anchor-text velocity is detected. A burst of exact-match "ai receptionist south africa" anchors is a fingerprint, not a strategy. Vary anchors naturally.

**Realistic 6-month profile:** ~20–30 directory/NAP citations, 3–5 platform partner listings, 1–3 earned mentions. That is enough — nobody in these SERPs has more.

### 6.6 Reviews — the rules changed in April 2026

| Prohibited | Permitted |
|---|---|
| Review gating (screening happy customers, incl. the 😀/😞 router) | Asking **every** client, evenly, for an honest review |
| **Any** incentive — payment, discount, free service, giveaway entry — regardless of sentiment | The neutral GBP short link (`g.page/r/…`) |
| **Review quotas for staff** *(new, Apr 2026)* | Internal competitions for *volume of asks* |
| **Soliciting reviews that name a specific employee** *(new, Apr 2026)* | Responding publicly to every review |
| Reviews from owners, staff, family, close friends | |
| Shared review kiosks / on-premises pressure | |
| Scripted review content | |

**Playbook.** Trigger at **go-live + 14 days**, when hours saved are measurable and the client can write something specific. Send to **100% of completed clients**, no filtering. Send **over WhatsApp** — ~96% of SA internet users are on it, it will far out-convert email, and it dogfoods the product. Target **1–2 per month sustained**, not 15 in a week: velocity spikes get filtered and *"sustained review influx over time"* is its own ranking factor (#14). Respond within 48 hours, including to negatives. Include an opt-out line — a review request to an existing client falls within the existing-customer relationship under POPIA s69 and is fine.

**Milestones:** 5 reviews by day 30 · 10 by day 60 · 15 by day 90 (which also unlocks the Clutch listing at 3).

---

## 7. Measurement

### 7.1 Setup — do all six in week 1

**Layer 1 — GSC Generative AI performance report.**
GSC → Performance → the report tabs now include dedicated views of impressions within AI Overviews and AI Mode (launched June 2026). Record the baseline. Check monthly.

**Layer 2 — Bing Webmaster Tools AI Performance.**
The only free source of **per-URL AI citation counts** and **grounding queries** (the actual phrases AI systems used to retrieve your content, sampled). Setup in P0-2. Limitations Microsoft states: no placement/ranking data, no clicks or impressions.

**Layer 3 — Server logs.** Hostinger provides raw access logs. Run weekly:

```bash
grep -Ei 'OAI-SearchBot|ChatGPT-User|GPTBot|Claude-SearchBot|Claude-User|ClaudeBot|PerplexityBot|Perplexity-User|Applebot|Bingbot|CCBot|meta-externalagent|Googlebot' access.log \
  | grep -oE '"(GET|HEAD) [^ ]+' | awk '{print $2}' | sort | uniq -c | sort -rn | head -30
```

| Agent | What a hit means |
|---|---|
| `Googlebot` | Crawl activity — **the direct measure of whether P0-1 worked** |
| `OAI-SearchBot` | OpenAI indexing you for ChatGPT search (**the only OpenAI agent that controls ChatGPT search visibility**) |
| `ChatGPT-User` | **A ChatGPT user's question caused a live fetch of this page, right now** |
| `Claude-User` | **A Claude user's question caused a live fetch** |
| `Perplexity-User` | **A Perplexity user's question caused a live fetch** |
| `GPTBot`, `ClaudeBot`, `CCBot` | Training corpora — brand knowledge into model weights |

The three `-User` agents are the closest thing to free ground truth available.

**Layer 4 — GA4 custom channel group.**
GA4 → Admin → Data display → Channel groups → Create. Name: **"AI assistants"**. Condition: `Source` matches regex:

```
chatgpt\.com|chat\.openai\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|meta\.ai|you\.com|phind\.com|bing\.com/chat
```

Review the raw referral list monthly for new hosts. Expect low volume but high intent.

**Layer 5 — Manual prompt panel.** *Mandatory, because referral traffic systematically under-measures AI visibility:* only ~28% of AI brand mentions carry a link (AI Overviews: 10.7%), and 61.7% of citations never name the brand at all.

Freeze 25–40 prompts in a spreadsheet. Run **monthly, same day, logged out, South Africa geo**, across ChatGPT · Perplexity · Claude · Gemini · Google AI Mode · Copilot. Record **two separate columns**: `mentioned` (brand named) and `cited` (link to cognexa.co.za) — different metrics, different drivers.

Starter prompts:
```
Who builds AI receptionists in South Africa?
How much does an AI phone answering service cost in Rand?
Best WhatsApp chatbot company for a small South African business
Is a WhatsApp AI chatbot POPIA compliant?
Can an AI voice agent speak Afrikaans?
Who can automate quoting and invoicing for a small business in Gauteng?
Who builds custom CRMs in South Africa?
AI automation agency Centurion
Best AI automation agencies in South Africa 2026
How do I stop missing calls at my South African business?
```

Track **share of voice**: of the 5–10 vendors named across the panel, what fraction of slots are Cognexa's.

**Layer 6 — self-reported attribution.** `index.html` line 706 already has *"AI assistant (ChatGPT, Perplexity…)"* in the `#iq-source` select. **Add "Claude" and "Google AI / Gemini" as options**, confirm the field is written to the leads sheet, and report on it monthly. This is the only true ground truth for zero-click discovery.

### 7.2 Leading vs lagging indicators

**Do not judge this programme on clicks for 90 days.** The arithmetic: at average position 14.5, 2026 CTR is ~0.2–0.6%. 87 impressions × 0.4% = **0.35 expected clicks**. You need roughly **250 impressions at that position to statistically earn one click**. Zero clicks is noise, not a symptom. The number to fix is 87 impressions.

| Type | Metric | Baseline (Aug 2026) | Why it matters |
|---|---|---|---|
| **Leading** | Indexed pages (GSC) | 4 | Direct measure of eligibility for both organic and AI Overviews |
| **Leading** | Total impressions/quarter | 87 | Must grow ~50× before clicks become meaningful |
| **Leading** | Distinct queries with ≥1 impression | 11 | The single best proxy for retrieval surface area |
| **Leading** | Googlebot fetches/week (logs) | unknown | Tells you whether crawl budget is expanding |
| **Leading** | Branded search volume for "cognexa" | 15 impressions | Correlates 0.35–0.47 with AI visibility; moves *first* when AI answers start naming you |
| **Leading** | Sites with a NAP-consistent Cognexa listing | ~1 (DesignRush) | Entity corroboration |
| **Leading** | Google reviews | 0 | ~16% of local ranking weight |
| **Lagging** | Clicks/month | 0 | Do not read before day 90 |
| **Lagging** | Average position | 14.5 | Will get *worse* before better as new pages enter at page 3–5. **This is expected and correct.** |
| **Lagging** | Map-pack appearances | 0 | Arrives fastest of all channels — least gated by domain age |
| **Lagging** | Leads with source = AI assistant | 0 | The real business metric |

### 7.3 What "working" looks like

**Day 30 checkpoint — this is a pass/fail on execution, not on results.**

| Metric | Target | Fail signal |
|---|---|---|
| Sitemap status in GSC | Success / 9+ URLs | Empty table → P0-1 was never done |
| Indexed pages | **8–12** | Still 4 → re-run URL Inspection, check for "Crawled – currently not indexed" |
| Undiscovered URLs | **0** | Any of the 5 still absent → escalate: get one inbound link to each |
| Impressions (30 days) | **150–400** | <100 → the new pages are not indexed |
| Distinct queries | **20–40** | <15 → service pages are not live or not indexed |
| GBP status | **Verified** | Rejected twice → re-record the video, do not appeal |
| Bing WMT | Site verified, sitemap Success | |
| Clicks | **0–3** | **Zero is a pass.** Do not panic. |
| `sameAs` entries live | **≥4** | |
| Google reviews | **≥3** | |

**Day 60 checkpoint.**

| Metric | Target |
|---|---|
| Indexed pages | **14–20** (7 service pages live) |
| Impressions (30 days) | **400–900** |
| Distinct queries | **50–90** |
| Impressions for `ai receptionist south africa` | **20+** (from 8/quarter) |
| Avg position | **11–14** — may worsen slightly; new pages entering deep is correct |
| Clicks | **3–15** |
| Map-pack appearance for `software company centurion` or `telephone answering service pretoria` | **Yes** |
| Google reviews | **≥8** |
| Citations live with consistent NAP | **≥15** |
| ChatGPT-User / Claude-User / Perplexity-User log hits | **≥1** |

**Day 90 checkpoint.**

| Metric | Target |
|---|---|
| Indexed pages | **20–30** |
| Impressions (30 days) | **900–2,000** |
| Distinct queries | **100–180** |
| Clicks | **15–50** |
| Avg position | **9–13** |
| Pages with ≥10 impressions | **≥8** |
| Brand query CTR for "cognexa" | **>15%** (from 0%) — the clearest signal the entity fix worked |
| Map pack | Top 3 for ≥2 Centurion terms |
| Prompt panel `mentioned` rate | **≥10%** of 30 prompts |
| Google reviews | **≥15** |
| Leads attributed to organic + AI | **≥2** |

**Longer horizon** (for expectation-setting, not for management): ~1,500–4,000 impressions/month and 40–120 clicks/month by Feb 2027; 8,000–20,000 impressions/month and 250–700 clicks/month by Aug 2027. **Impressions must grow ~50× before clicks matter.** That growth comes from page count × query coverage, not from moving position 14.5 to 13.

### 7.4 Explicit non-goals — do not spend time on these

| Non-goal | Why |
|---|---|
| Fixing the 4 "not indexed" URLs | Verified benign. Google's own docs on the canonical one: *"there is nothing you need to do."* |
| Chasing 0% CTR | 87 × 0.4% = 0.35 expected clicks. It contains no information. |
| Core Web Vitals "No data" | CrUX lacks field traffic because there is no traffic. Consequence, not cause. Mueller: CWV *"are not giant factors in ranking."* |
| `llms.txt` beyond a 10-minute fix | 97% of `llms.txt` files got zero requests in May 2026; AI bots never request the file speculatively. |
| URL restructure to extensionless | You'd 301 away 3 of your 4 indexed pages on a zero-authority domain to buy a cosmetic change Google says isn't a ranking factor. |
| FAQPage rich results | Stopped appearing 7 May 2026; gov/health only. Keep the markup for LLM parsing; expect no rich result. |
| `aggregateRating` on your own pages | Explicitly ineligible and a site-wide rich-result risk. See §5.4c. |
| Mass location pages | Doorway + scaled-content-abuse risk. Max 3, each with a real local client. |
| Ranking for `botlhale ai` | A different company's brand. 12 impressions that will never convert. |
| `chatbot south africa` head term | 6 of 10 autocomplete suggestions are DStv/MTN/Betway support-bot lookups. Navigational, not commercial. |
| Afrikaans/isiZulu content before month 5 | Commercial B2B search in SA is typed in English regardless of home language. Keep multilingual as a *sales* claim. |

---

## 8. Master prioritised list

Every action from all seven research blocks, deduplicated, ranked by impact ÷ effort. **Execute top to bottom.**

**Effort key:** S = <1h · M = 1–4h · L = 1–2 days · XL = >2 days
**Impact key:** 5 = unblocks everything · 4 = major · 3 = meaningful · 2 = incremental · 1 = marginal

| # | Action | P | Impact | Effort | Ratio | Owner surface | Verify |
|---|---|---|---|---|---|---|---|
| 1 | Submit `sitemap.xml` in GSC + Request Indexing on the 5 undiscovered URLs | P0 | 5 | S | **★★★★★** | GSC UI | Sitemaps = Success/9; inventory 8→13 in 14d |
| 2 | Repoint 100 internal links `index.html` → `/` (one `sed`) | P0 | 4 | S | **★★★★★** | 8 HTML files | `grep -c 'href="index.html' *.html` = 0 |
| 3 | Fix homepage `<title>` — add "Cognexa" + "Centurion" | P0 | 4 | S | **★★★★★** | `index.html:6` | View-source; GSC live test |
| 4 | Fix homepage `<h1>` — add query terms; unhide the two `sr-only` H2s | P0 | 4 | S | **★★★★★** | `index.html:217,236,415` | Rendered HTML; re-test 360px |
| 5 | Change `body.js-enabled .contact` → `.contact-form` (unhide contact from Google) | P0 | 4 | S | **★★★★★** | `css/styles.css:1438` | GSC rendered HTML contains the H2 + WhatsApp link |
| 6 | Register Bing WMT, submit sitemap, enable IndexNow | P0 | 3 | S | **★★★★★** | Bing WMT | Sitemap Success; AI Performance baseline |
| 7 | Add `sameAs` + geo + hours + `priceRange` to Organization schema; delete `AdministrativeArea: Worldwide` | P0 | 5 | M | **★★★★★** | `index.html:53–110` | Rich Results Test, 0 errors |
| 8 | Create the LinkedIn company page | P0 | 3 | S | **★★★★☆** | LinkedIn | Public URL resolves; added to `sameAs` |
| 9 | Fix the broken sentence at `index.html:458` | P0 | 2 | S | **★★★★☆** | `index.html:458` | Read it aloud |
| 10 | Create + video-verify the Google Business Profile (SAB, address hidden) | P0 | 5 | M | **★★★★☆** | business.google.com | "Verified" badge; Maps URL captured |
| 11 | Ship `404.html` + `ErrorDocument 404` | P0 | 3 | M | **★★★★☆** | new file + `.htaccess` | `curl -sI` = 404 with branded body |
| 12 | Build `/ai-receptionist-south-africa.html` | P1 | 5 | L | **★★★★☆** | new file | Rich Results Test; ≥1 impression in 14d |
| 13 | Add the ZAR comparison table to `ai-receptionist-cost-south-africa.html` | P1 | 4 | M | **★★★★☆** | existing post | `grep -c '<table'` ≥1 |
| 14 | Build `/whatsapp-ai-chatbot-south-africa.html` | P1 | 4 | L | **★★★★☆** | new file | as #12 |
| 15 | Build `/pricing.html` with real ZAR bands + `AggregateOffer` | P1 | 4 | L | **★★★★☆** | new file | Rich Results Test |
| 16 | Create `about.html` + `Person` schema; switch all 7 posts' `author` | P1 | 4 | M | **★★★★☆** | new + 7 posts | Rich Results shows `author: Person` |
| 17 | Regenerate `sitemap.xml` with honest `lastmod` + new URLs; resubmit | P1 | 3 | S | **★★★★☆** | `sitemap.xml` | GSC "Discovered URLs" matches |
| 18 | Tier 0 + Tier 1 citations (18 sources, byte-identical NAP) | P1 | 4 | L | **★★★★☆** | off-site | 15+ live profiles; all in `sameAs` |
| 19 | Start the Google review programme (WhatsApp, 1–2/month) | P1 | 4 | M | **★★★★☆** | GBP + WhatsApp | 5 reviews by day 30 |
| 20 | Add `<table>` + answer-first paragraphs to the other 6 posts | P1 | 3 | L | **★★★☆☆** | 6 posts | `grep -c '<table'` ≥1 each |
| 21 | Build `/custom-crm-development-south-africa.html` | P1 | 4 | L | **★★★☆☆** | new file | as #12 |
| 22 | Build `/automated-quoting-invoicing.html` | P1 | 4 | L | **★★★☆☆** | new file | as #12 |
| 23 | Build `/workflow-automation-south-africa.html` (incl. email sorting) | P1 | 4 | L | **★★★☆☆** | new file | as #12 |
| 24 | Build `/booking-automation-south-africa.html` | P1 | 3 | L | **★★★☆☆** | new file | as #12 |
| 25 | Add `defer` to all scripts; load Three.js dynamically | P1 | 2 | M | **★★★☆☆** | `index.html:730–735`, `js/main.js` | three.js absent from Network under reduced-motion |
| 26 | Preload latin fonts + `fetchpriority="high"` on 7 hero images | P1 | 2 | S | **★★★☆☆** | all 9 files | Network waterfall; Lighthouse |
| 27 | `.htaccess`: collapse `/index.html`, correct the hop comment, extend gzip types | P1 | 2 | S | **★★★☆☆** | `.htaccess` | `curl -sIL /index.html`; `/` still 200 |
| 28 | Build the ZAR ROI / missed-call calculator | P1 | 4 | L | **★★★☆☆** | new file + js | Works at 360px; static fallback with JS off |
| 29 | Tier 2 B2B directories (TechBehemoths, DesignRush, Crunchbase, GoodFirms, Clutch) | P1 | 3 | M | **★★★☆☆** | off-site | Profiles live; added to `sameAs` |
| 30 | Expand `robots.txt` (GPTBot, ClaudeBot, CCBot, +5); whitelist crawler IPs at WAF | P1 | 2 | S | **★★★☆☆** | `robots.txt`, hPanel | `curl` the file; log hits appear |
| 31 | Repoint `llms.txt` at real service URLs + add `## Key facts` | P1 | 1 | S | **★★★☆☆** | `llms.txt` | Links resolve. Then never touch it again. |
| 32 | Add `og:locale` + `og:image:alt` to 8 pages; `lang="en-ZA"` on all 9 | P1 | 1 | S | **★★★☆☆** | all files | View-source |
| 33 | Add visible breadcrumb UI to the 7 posts | P2 | 2 | M | **★★★☆☆** | 7 posts + CSS | 14 new links to `/` and `/blog.html` |
| 34 | Ship the favicon set + real 512px logo PNG | P2 | 2 | M | **★★★☆☆** | new assets + heads | `/favicon.ico` = 200 |
| 35 | Publish 3–5 case studies with real ZAR numbers; relabel the 4 codename projects | P2 | 4 | XL | **★★☆☆☆** | new files | Named clients or consented anonymisation |
| 36 | Build `/ai-automation-centurion.html` + `locations.html` (Centurion ONLY, wait 6 weeks) | P2 | 3 | L | **★★☆☆☆** | new files | ≥800 words, ≥60% unique, real local client |
| 37 | Build 5 vertical pages (dental/medical, trades, salons, law, estate agents) | P2 | 3 | XL | **★★☆☆☆** | new files | ≥1 impression each in 60d |
| 38 | Publish one original SA dataset; pitch WhichVoIP, RCCI, SME SA, BusinessTech | P2 | 4 | XL | **★★☆☆☆** | new file + outreach | 1–3 earned mentions in 6 months |
| 39 | Build 8–14 integration pages (`/integrations/`) | P2 | 3 | XL | **★★☆☆☆** | new files | Each 500–800 words, genuinely different |
| 40 | Add `privacy-policy.html` | P2 | 2 | M | **★★☆☆☆** | new file | Linked from footer sitewide |
| 41 | Launch a YouTube channel with 10 long-form reference demos | P2 | 4 | XL | **★★☆☆☆** | off-site | Videos embedded + `VideoObject` schema |
| 42 | Founder LinkedIn cadence (5+ posts / 4 weeks, 500–2,000 word articles) | P2 | 3 | L | **★★☆☆☆** | off-site | Sustained ≥5 posts/month |
| 43 | Apply to n8n Expert Partners, HubSpot, Make, Zoho, Pipedrive | P2 | 2 | M | **★★☆☆☆** | off-site | Listings live |
| 44 | Compress the 4 MP4s (21.6 MB → ~4 MB); WebP + `srcset` for 7 large images | P2 | 2 | L | **★★☆☆☆** | assets + markup | Network total drops; CLS stays 0 |
| 45 | Subordinate the 3D pillar in the IA (move below the three automation stations) | P2 | 2 | M | **★★☆☆☆** | `index.html` | 3D appears last; no Three.js blog content |
| 46 | Genuine Reddit / Quora participation (r/southafrica, r/ZAtech, r/smallbusiness) | P2 | 3 | L | **★☆☆☆☆** | off-site | 1 genuinely good answer/week; **never astroturf** |
| 47 | Quarterly content maintenance loop (Nov 2026, Feb 2027) | P2 | 3 | M | **★☆☆☆☆** | 7+ posts | `dateModified` bumped only on real change |
| 48 | Join a chamber (NSBC / Tshwane); speak once per quarter | P2 | 2 | L | **★☆☆☆☆** | offline | Speaker bio page with a link |
| 49 | Verify manually which Centurion queries trigger a local pack | P2 | 2 | S | **★☆☆☆☆** | phone, incognito, Centurion | 8 screenshots |
| 50 | 360px QA pass (nav `nowrap` at CSS:334/360, `.station-ghost`, `.metrics`, new H1) | P2 | 2 | M | **★☆☆☆☆** | DevTools | No clipping — `overflow-x: clip` hides breakage silently |
| 51 | Decide the CIPC trading-name question deliberately | P2 | 2 | M | **★☆☆☆☆** | CIPC + all profiles | One name, used byte-identically everywhere |
| 52 | 2–3 human-translated Afrikaans pages | P2 | 1 | L | **☆☆☆☆☆** | new files | **Month 5+ only.** Never machine-translated. |
| — | ⛔ Extensionless URL restructure | — | — | — | **DO NOT** | — | Would 301 away 3 of 4 indexed pages |
| — | ⛔ 8+ templated city pages | — | — | — | **DO NOT** | — | Doorway + scaled content abuse; deindexing risk |
| — | ⛔ `aggregateRating` on the Organization node | — | — | — | **DO NOT** | — | Ineligible; site-wide rich-result risk |
| — | ⛔ Bulk directory-link purchases | — | — | — | **DO NOT** | — | `sourceType` makes most of it arithmetically worthless |
| — | ⛔ Core Web Vitals optimisation as a priority | — | — | — | **DO NOT** | — | "No data" is a traffic consequence, not a cause |
| — | ⛔ Exact-match domain purchase | — | — | — | **DO NOT** | — | Google runs an explicit EMD demotion system |

---

### The sequencing rule, restated

**Week 1 = discovery + identity.** Items 1–11. Nothing else can work until Google can find the pages and resolve the entity.
**Weeks 2–8 = the pages the business actually sells.** Items 12–24. `AgentK` ranks #3 for `ai automation agency south africa` with the *same* anchors-only architecture Cognexa has — which proves architecture is the **multiplier**, not the blocker. Fix discovery first, then build.
**Weeks 4–12 = off-site foundation, in parallel.** Items 18–19, 29–31.
**Month 3+ = proof, verticals, geo, earned coverage.** Items 35–42.

Local SEO is roughly 25% of the answer. The other 75% is that a business selling seven distinct services currently has one page.