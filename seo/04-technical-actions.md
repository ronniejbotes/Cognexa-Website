# Technical & Foundation Action Plan

*9 August 2026. All file-level claims re-verified against the repo and the live server
on this date. Code patches corrected — see [05-corrections-log.md](05-corrections-log.md).*

---

## 0. The diagnosis in one paragraph

**Nothing on this site is broken.** The four "not indexed" URLs in Search Console are
protocol/host variants plus `/index.html` — all benign, all verified live. The real
problem is threefold: **(a)** the sitemap has never been submitted, so five of nine real
URLs have never been fetched; **(b)** the site has **one commercial URL** trying to rank
for four service categories, with the three highest-value offerings appearing **zero
times** in `index.html`; **(c)** the domain has no entity identity — no `sameAs`, no
Google Business Profile, no named human — which is why 15 brand impressions produced 0
clicks. Fix (a) and (c) this week, (b) over eight weeks. Do **not** restructure URLs, do
**not** chase Core Web Vitals, do **not** mass-generate location pages.

---

## 1. Verified fact block

All confirmed 9 Aug 2026 against the repo and live server.

| Claim | Evidence |
|---|---|
| `https://cognexa.co.za/index.html` returns 200, canonical → `/` | `curl -sI` |
| `http://cognexa.co.za/` and `https://www.cognexa.co.za/` → 301, **one hop** | `curl -w '%{redirect_url}'` |
| `http://www.cognexa.co.za/` → **two hops** (Hostinger edge upgrades HTTPS before Apache runs) | live probe |
| Extensionless URLs 404 (MultiViews off) | `/blog` → 404 |
| Bogus URL returns a correct **404**, not a soft-200 | live probe |
| No custom 404 page, **no `ErrorDocument`** in `.htaccess` | file read in full |
| **100 internal links → `index.html`**, exactly **1 → `/`** | `grep -o 'href="index\.html' *.html \| wc -l` → 100 |
| `body.js-enabled .contact { display: none; }` | `css/styles.css:1438` |
| **Zero `<table>` elements** across all 9 HTML files | `grep -c '<table' *.html` → all 0 |
| Zero `preload` / `preconnect` / `dns-prefetch` | 0 matches repo-wide |
| Homepage `<title>` does **not** contain "Cognexa" | `index.html:6` |
| Homepage `<h1>` = "Your business, on autopilot." | `index.html:217` |
| `#services` H2 is `class="sr-only"` — visually hidden | `index.html:236` |
| **`sameAs` absent** from Organization schema | `index.html:57–99` |
| `"@type":"AdministrativeArea","name":"Worldwide"` — semantically invalid | `index.html:86` |
| `logo` points at a **470-byte favicon SVG** | `assets/icons/favicon.svg` |
| `dateModified === datePublished` on **all 7 posts** | lines 65–66 of each |
| Blog `author` is `Organization`, **not `Person`** | all 7 posts |
| `blog.html` has no `BreadcrumbList` (all 7 children do) | `blog.html:56` |
| Homepage keyword counts | `quoting`=0 · `booking(s)`=0 · `email sort`=0 · `custom CRM`=0 · `invoic`=4 · `CRM`=4 · `receptionist`=15 |
| 6 parser-blocking scripts, none deferred; `three.js` = 608,087 bytes | `index.html:730–735` |
| `assets/videos/` = **21.6 MB** across 4 MP4s | 4.0 + 5.1 + 5.5 + 6.9 MB |
| Broken sentence *"there's you are never locked in"* | `index.html:458` |
| Every canonical self-referential and 200 | all 9 files |
| **No `pushState`/`replaceState` anywhere in `js/`** | ✅ back-button spam policy is **not** a concern |
| Sitemap `lastmod`: 5 entries `2026-07-22`, 4 `2026-07-26`; server reports `07-26` for all | only the five `07-22` entries are stale |
| Every page has exactly **one `<h1>`**; image alt coverage **100%** | verified |

**Ruled out by direct testing:** MultiViews duplicates · trailing-slash variants ·
legacy orphan 301s · deployment drift · cross-page canonicals · `noindex` meta or
`X-Robots-Tag` · `robots.txt` blocking. **None of these are the problem.**

---

## 2. The indexing diagnosis

### The arithmetic

| | |
|---|---|
| Real URLs in `sitemap.xml` | 9 |
| GSC indexed | 4 |
| GSC not indexed | 4 |
| **GSC total URL inventory** | **8** |
| **Real URLs Google has never accounted for** | **5** |

GSC's Page indexing report is a *complete inventory*. It knows 8. Five real pages are
absent from the report entirely — not "Crawled, currently not indexed", not "Discovered,
currently not indexed". **Googlebot has never fetched them:**

```
blog.html
ai-voice-agent-vs-ivr-vs-receptionist.html
whatsapp-ai-chatbot-popia-compliance.html
ai-agent-vs-chatbot-difference.html
how-long-ai-automation-setup-roi.html
```

### The 4 "not indexed" rows — identified, not inferred

| GSC label | Count | URL(s) | Verdict |
|---|---|---|---|
| Page with redirect | 3 | `http://cognexa.co.za/`, `https://www.cognexa.co.za/`, `http://www.cognexa.co.za/` | ✅ The canonical 301 working as designed |
| Alternate page with proper canonical tag | 1 | `https://cognexa.co.za/index.html` | ✅ Google's docs: *"there is nothing you need to do"* |

**Zero real content pages are blocked, deindexed, or canonicalised away.**

### Root cause of the five undiscovered pages, ranked

| # | Cause | Confidence |
|---|---|---|
| 1 | **The sitemap has never been submitted in GSC.** The `Sitemap:` line in `robots.txt` is a *passive* hint — Google's docs: *"submitting a sitemap is merely a hint: it doesn't guarantee that Google will download the sitemap."* GSC submission forces a fetch event and a prioritised discovery queue | Very high |
| 2 | **Zero external links.** With no inbound links the site has exactly one discovery path: internal crawl from `/`. A new zero-authority domain gets a handful of URLs per visit. Google spent it on `/` and three posts and stopped | Very high |
| 3 | **100 of 101 internal links point at a non-canonical URL.** Every crawl of `index.html#contact` is a fetch Google must discard via canonical — material waste on a tiny crawl allowance | High (verified) |
| 4 | Crawl depth. All 7 posts *are* linked from homepage body copy, so it's discovery starvation, not orphaning | Medium |

---

## 3. P0 — this week (~6 hours + one video recording)

> ### 🔴 Do P0-0 FIRST. The window closes when you submit the sitemap.

### P0-0 · Rename the IVR post — **before** the sitemap goes in

`ai-voice-agent-vs-ivr-vs-receptionist.html` is one of the five URLs Google has never
fetched. **A 301 on an undiscovered URL is genuinely free.** Once you submit the sitemap
and Google indexes it, the rename stops being free.

```bash
git mv ai-voice-agent-vs-ivr-vs-receptionist.html ai-receptionist-vs-human-receptionist.html
```

Update its canonical, its entry in `sitemap.xml` and `llms.txt`, every inbound internal
link, and add to `.htaccess` (before the canonical-redirect block):

```apache
RewriteRule ^ai-voice-agent-vs-ivr-vs-receptionist\.html$ /ai-receptionist-vs-human-receptionist.html [R=301,L]
```

**Do not rename `how-long-ai-automation-setup-roi.html`** — rewrite it in situ instead.

---

### P0-1 · Submit `sitemap.xml` in Google Search Console

**The single highest-leverage action available. It costs 20 minutes.**

1. GSC → **Sitemaps** → the field is prefixed `https://cognexa.co.za/` → type exactly
   `sitemap.xml` → **Submit**
2. Refresh after ~60s. Table must read `sitemap.xml` · **Success** · Discovered URLs **9**
3. GSC → **URL Inspection** → paste each URL, wait for the fetch, click **Request
   Indexing**, in this order:

```
https://cognexa.co.za/blog.html
https://cognexa.co.za/ai-receptionist-vs-human-receptionist.html
https://cognexa.co.za/whatsapp-ai-chatbot-popia-compliance.html
https://cognexa.co.za/ai-agent-vs-chatbot-difference.html
https://cognexa.co.za/how-long-ai-automation-setup-roi.html
https://cognexa.co.za/
```

There is an undisclosed daily quota (historically ~10–12). If rejected, resume tomorrow.

**Verify:** Day 3–7 — `blog.html` flips to "URL is on Google". Day 7–14 — GSC → Pages
inventory rises from 8 toward 13, indexed reaches 8–9. Day 14 — `site:cognexa.co.za`
returns ≥8 results (baseline: 4).

---

### P0-2 · Register in Bing Webmaster Tools

Bing is **6.95%** of South African search (StatCounter, Jul 2026) — disproportionately
corporate-desktop, which is your B2B audience.

1. bing.com/webmasters → **Add a site** → **Import from Google Search Console** (fastest
   verification, no DNS change)
2. Submit `https://cognexa.co.za/sitemap.xml`
3. IndexNow → Generate key → save as `<key>.txt` in the repo root → deploy
4. Open the **AI Performance** report and record the baseline (it will be zero)

*Note: the AI Performance report is real (public preview Feb 2026) and gives per-URL AI
citation counts. The "grounding queries" feature described in some coverage could not be
confirmed — register anyway, but don't budget against that specific feature.*

---

### P0-3 · Google Business Profile (service-area business)

**Why:** local ranking runs on relevance/distance/prominence — materially less gated by
domain age than organic. ~32% of local weight is GBP signals and ~16% is reviews: **half
the local algorithm sits untouched inside a free product.** It is also the strongest
`sameAs` anchor for entity resolution, which is the direct fix for 15 brand impressions
producing 0 clicks.

**Honest expectation:** there is no GBP category for "AI automation agency", and live
SERPs for `ai automation agency <city>` return 100% organic, zero map packs. Treat GBP
as **infrastructure** (entity anchor + review surface + brand panel), not a lead channel.

> ⚠️ **Blocker — decide the legal/trading name first.** Every citation must carry the
> final name byte-identically. Building 12 listings as "Cognexa" then registering
> "Cognexa AI Automation" at CIPC means redoing all 12. **Decide before citation #1.**

1. business.google.com → **Add business** → name exactly **`Cognexa`**. Do **not**
   append keywords — reportable guideline breach and a suspension vector
2. Primary category: **Software company**. Additional: **Computer consultant**,
   **Website designer**, **Telephone answering service**, **Business management
   consultant**. *`Telephone answering service` is deliberate — exact semantic match for
   an AI receptionist, and Gauteng listing density there is thin*
3. Enter the **real** Centurion operating address — never a PO Box, mailbox rental or
   virtual office. Then tick "I deliver goods and services to my customers" and **hide
   the address**
4. Service areas (max 20, all within ~2h drive of Centurion). Google: *"shouldn't extend
   farther than about 2 hours of driving time."* **Do not add Cape Town (~14h) or Durban
   (~6h)** — that is service-area misrepresentation. Cover those with organic pages instead
5. Phone `+27 66 241 2155` · Website `https://cognexa.co.za/` · Hours Mon–Fri 08:00–17:00
   (the *business* isn't 24/7 even if the AI is — state 24/7 AI coverage in the description)
6. Description leading with *"Cognexa is an AI automation agency in Centurion,
   Gauteng…"*, naming AI receptionists, WhatsApp chatbots, workflow automation,
   automated quoting and invoicing, booking automation, and custom CRM development
7. **Video verification** — single unedited live take from the GBP mobile app, ≥30s:
   street sign or Centurion landmark → walk continuously to the workspace (**no cuts**) →
   laptop with a logged-in business tool → physical proof (CIPC doc, business card,
   signed contract) → close on the phone showing `+27 66 241 2155`.
   **Expect 1–2 rejections. Re-record rather than appeal** — appeals are far slower

**Verify:** "Verified" badge; the listing appears searching `Cognexa` in Google Maps.
**Copy the Maps place URL — P0-6 needs it.**

---

### P0-4 · Repoint all 100 internal links to `/`

Zero risk — editing an `href` cannot deindex anything.

```bash
sed -i 's|href="index\.html|href="/|g' \
  blog.html \
  ai-receptionist-cost-south-africa.html \
  ai-receptionist-vs-human-receptionist.html \
  whatsapp-ai-chatbot-popia-compliance.html \
  small-business-ai-workflow-automation-examples.html \
  ai-agent-vs-chatbot-difference.html \
  how-long-ai-automation-setup-roi.html \
  ai-chatbot-south-african-languages.html
```

`index.html` itself contains zero occurrences (its nav brand at line 188 is already `/`).

**Verify:**
```bash
grep -c 'href="index.html' *.html    # every file → 0
```
Then open `blog.html` and click the brand and each nav item.

---

### P0-5 · Stop hiding the homepage contact section from Googlebot

`css/styles.css:1438` sets `body.js-enabled .contact { display: none; }`, and
`index.html:181` adds `js-enabled` during parse. Googlebot executes JavaScript, so the
**entire** `<section id="contact">` — the H2, the intro copy, the form, the WhatsApp
link and the `tel:` link — is `display:none` in Google's rendered DOM. Google explicitly
discounts `display:none` content.

**44 sitewide links point into it.** Your primary conversion anchor targets an element
Google is told to ignore.

```css
/* css/styles.css:1438 */
/* BEFORE */  body.js-enabled .contact      { display: none; }
/* AFTER  */  body.js-enabled .contact-form { display: none; }
```

This hides only the no-JS fallback `<form id="contact-form" class="contact-form">`
(`index.html:507`) and leaves the `<h2>`, `.section-sub` and `.contact-alt` — the
WhatsApp and `tel:` links at `index.html:532` — visible. **Verified: both classes exist
and are distinct.**

Then insert a visible primary CTA after the closing `</form>` (line 530) so JS users
still reach the intake modal:

```html
<p class="contact-cta">
  <a class="btn btn-primary" href="#contact">Start your build</a>
</p>
```

```css
.contact-cta { margin-top: var(--space-lg, 2rem); }
body:not(.js-enabled) .contact-cta { display: none; }
```

Bump cache-busters: `sed -i 's/?v=25/?v=26/g' *.html`

> ### ✅ Correction — the GSAP "regression" is not real
> An earlier draft warned that `js/scroll.js` would leave contact copy stranded at
> `opacity: 0` and prescribed `immediateRender: false`. **Verified false.** At
> `js/scroll.js:602–614` the tween is created *inside* `onEnter`, so before the batch
> fires the elements carry no inline opacity and are fully visible. There is no
> stranded-at-zero state. The only artefact is a cosmetic snap-to-invisible-then-fade at
> the instant of entry. **If that bothers you, swap `gsap.from` for `gsap.fromTo`.
> Otherwise leave it alone.**

**Verify:** GSC → URL Inspection → `https://cognexa.co.za/` → **Test Live URL** → **View
Tested Page** → **HTML** → Ctrl-F for `"Put your business on the line."` and
`"wa.me/27662412155"`. Both must be present. **Screenshot** tab must show the section
rendered. Then test with JS off (fallback form appears) and JS on (form hidden, "Start
your build" opens the modal).

---

### P0-6 · Rewrite the Organization schema

`sameAs` is **entirely absent** — verified. It is the mechanism by which Google merges
scattered mentions into one resolved entity, and it is the direct fix for the brand
collision: `cognexa.com` (Slovak AI firm), `cognexa.org` (journal with an ISSN), Cognexa
Inc., Cognexa Health, a Google Play app, "Cognexa Solutions" on LinkedIn, plus
near-match interference from NASDAQ-listed **Cognex**. Google currently has no basis to
resolve "cognexa" to the South African entity.

Also fixes the semantically invalid `AdministrativeArea: "Worldwide"` (`index.html:86`)
and the 470-byte favicon masquerading as a `logo`.

**Add:** `sameAs` (GBP Maps URL, LinkedIn, YouTube, Crunchbase, any directory profile) ·
`foundingDate` · `openingHoursSpecification` · `priceRange` · a real logo `ImageObject`
≥112×112 · `founder` → the `Person` `@id` on `about.html`.

**Change:** `areaServed` → drop the invalid `Worldwide` entry. Keep one honest sentence
about worldwide work in body copy — the `.co.za` ccTLD already carries the geo signal.

> ⚠️ **Do NOT publish `geo` coordinates or `postalCode`** while the GBP address is
> hidden. If those coordinates resolve to a residence that is both a privacy exposure
> and a NAP inconsistency (schema asserts a precise point; GBP says "address hidden").
> **`addressLocality` + `addressRegion` + `addressCountry` only** until there is a real
> commercial premises.

> ⛔ **NEVER add `aggregateRating` or `review` to this node.** Google's exact wording:
> *"If the entity that's being reviewed controls the reviews about itself, their pages
> that use LocalBusiness or any other type of Organization structured data are
> ineligible for star review feature."* Third-party review widgets on your own domain
> count as self-serving too. Use plain HTML testimonials instead. Stars come from Google
> reviews on the Business Profile, not from your markup.

**Verify:** search.google.com/test/rich-results → zero errors. Then validator.schema.org.

---

### P0-7 · Fix the homepage `<title>`, `<h1>` and hidden H2s

`cognexa` is your #1 query — 15 impressions, 0 clicks — and **the homepage `<title>`
does not contain the string "Cognexa"**, while all 8 other pages end `| Cognexa`. At
~579px the current title also sits right on the ~580px SERP truncation threshold.

| | Before | After |
|---|---|---|
| `<title>` | AI Chatbots, WhatsApp Automation & AI Voice Agents in South Africa | **Cognexa \| AI Automation Agency in South Africa** |
| `<h1>` | Your business, on autopilot. | **AI business automation for South African companies** *(demote the old line to a subhead)* |
| `#services` H2 | `<h2 class="sr-only">Services</h2>` | visible, question-phrased |

> ⚠️ **Gate on 360px QA, not a backlog item.** The new H1 loses the hard-coded `<br>`
> that currently guarantees a clean wrap, `h1` is `clamp(2.5rem, 7vw, 4.5rem)` flooring
> at 40px, and `html { overflow-x: clip }` (`css/styles.css:262`) **silently hides**
> overflow breakage rather than showing a scrollbar. Test at 360px before merging.

**Also in this pass:** fix the broken sentence at `index.html:458` (*"there's you are
never locked in"*), and **fix the four portfolio codenames** ("Nexus Core", "Nightgrid",
"Gridworks", "Orbital" + *"full walkthroughs are private"*, `index.html:360–412`). Your
only proof asset currently reads as a trust liability. **10-minute copy edit.**

---

### P0-8 · Ship a branded 404 page

`.htaccess` contains **no `ErrorDocument` directive at all** — verified. Bad URLs get
Hostinger's generic default: no branding, no nav, no links back into the site.

```apache
ErrorDocument 404 /404.html
```

**Verify:**
```bash
curl -sI https://cognexa.co.za/nonexistent-xyz | head -1        # must stay 404
curl -s  https://cognexa.co.za/nonexistent-xyz | grep -c Cognexa # must be > 0
```
Status **must remain 404**. A 200 here is a soft-404 and is worse than the default page.

---

### P0-9 · LinkedIn company page

The second-most-cited domain across ChatGPT Search, AI Mode and Perplexity, the
highest-value non-Google asset for SA B2B, and the `sameAs` target P0-6 needs. Note
"Cognexa Solutions" already exists on LinkedIn as a *different* entity — claiming your
own page is how you separate from it.

linkedin.com/company/setup/new → Name `Cognexa` → Software Development → Centurion,
Gauteng, ZA → `https://cognexa.co.za/` → **the identical one-line description you will
use on every other profile** → same logo file everywhere → add the founder as an employee.

---

### P0-10 · Instrument conversions in GA4 — **the biggest measurement gap in the plan**

The stated goal is *"nine qualified clicks a month is a viable business."* There is
currently **no GA4 event on the WhatsApp click, no event on `tel:` clicks, and no event
on intake-modal completion.** If nine clicks a month is the target, not instrumenting
those nine clicks makes the whole plan ungradeable.

Add events (in `js/`, **no inline handlers** per `CLAUDE.md`):

| Event | Trigger |
|---|---|
| `whatsapp_click` | click on `a[href^="https://wa.me/"]` |
| `phone_click` | click on `a[href^="tel:"]` |
| `email_click` | click on `a[href^="mailto:"]` |
| `intake_open` | intake modal opens |
| `intake_submit` | intake form submits successfully |

Mark `intake_submit`, `whatsapp_click` and `phone_click` as **key events** in GA4. Link
GA4 to Search Console (Admin → Product links).

---

### P0-11 · Get real keyword volumes — **1 hour, replaces ~60 estimates**

Every volume figure in [02-keyword-strategy.md](02-keyword-strategy.md) is an estimate.
**Google Keyword Planner is free with any Google Ads account, even unfunded**, and
returns real South-Africa-geo ranges. Bing WMT's Keyword Research is free and you're
registering anyway (P0-2). Run the top 25 table through both and replace the estimates
before building pages 6–12.

---

## 4. P1 — this month

| # | Action | Notes |
|---|---|---|
| P1-1 | **Build money pages 1–5** | See [03-content-plan.md](03-content-plan.md) §4–5 |
| P1-2 | `about.html` with a named human + `Person` schema | Repoint `BlogPosting.author` on all 7 posts to the `Person` `@id`; add visible bylines |
| P1-3 | **Add real `<table>` elements and answer-first paragraphs to the 7 existing posts** | All 9 pages currently have **zero** tables. This is the highest-yield AEO change available |
| P1-4 | Add `BreadcrumbList` to `blog.html` + visible breadcrumb UI on all posts | `blog.html` is the only page missing it |
| P1-5 | `dateModified` ≠ `datePublished` — only when you actually change something | All 7 are currently identical |
| P1-6 | Preload the latin font subsets; `fetchpriority="high"` on post hero images | Zero `preload`/`preconnect` repo-wide. `inter-latin.woff2` 48KB, `space-grotesk-latin.woff2` 22KB |
| P1-7 | Regenerate `sitemap.xml` with honest `lastmod` + all new URLs, resubmit | 5 entries currently say `2026-07-22`; the server says `07-26` |
| P1-8 | Build the citation foundation — **12 listings, not 44** | §6 |
| P1-9 | `privacy-policy.html` | You publish a POPIA guide, run GA4, and collect form data with no privacy policy |
| P1-10 | Ship `calculator.html` | Spec in [03-content-plan.md](03-content-plan.md) §5 |
| P1-11 | Expand `robots.txt` for AI crawlers; repoint `llms.txt` at real URLs | `llms.txt` currently points all four services at `#station-*` anchors — **anchors are not citable targets** |

### P1-12 · Defer + conditional Three.js loading — ⚠️ corrected patch

The homepage ships **6 parser-blocking scripts**, including **608KB of Three.js**, none
deferred.

> **The patch circulating in the raw research is wrong and will silently disable the 3D
> scene 100% of the time.** It references a `sceneAllowed` variable that **does not
> exist**. The real gate is inside `boot3D()` at `js/main.js:101–103`:
>
> ```js
> var canRun =
>   !prefersReducedMotion() &&
>   !!window.THREE &&          // ← js/main.js:103
>   !!canvas && !!scene && ...
> ```
>
> This is evaluated **synchronously**. Remove the `<script src="three…">` tag and paste
> the naive dynamic-import patch, and `window.THREE` is undefined when `boot3D()` runs →
> `canRun` is false → `body.classList.add('no-3d')` → the site ships in permanent
> fallback. That also changes layout: `css/styles.css:433+` clips the process conveyor
> off `body.no-3d`.

**Correct fix:** drop `!!window.THREE` from `canRun`, make `boot3D()` **await**
`loadThree()` before `scene.init()`, and keep the `catch → no-3d` path.

**Gate:** run `document.body.classList.contains('no-3d')` in the console before and
after deploy. It must return the same value.

---

## 5. P2 — this quarter

| # | Action | Gate |
|---|---|---|
| P2-1 | **One** geo page: `ai-automation-centurion.html` | 🔒 **BLOCKED** until a real Centurion client consents to be described. See §7 |
| P2-2 | **One** vertical page: dental/medical | 🔒 Needs a dental/medical client |
| P2-3 | `case-studies.html` with real numbers | 🔒 Needs client consent |
| P2-4 | Compress the 21.6 MB of work videos; ship responsive images | — |
| P2-5 | Favicon set + OG consistency across all pages | `/favicon.ico` currently 404s |
| P2-6 | Subordinate the 3D websites pillar in the homepage IA | — |
| P2-7 | **Integration pages** | ⏸️ **Deferred entirely.** Revisit at 25 indexed pages |
| P2-8 | First quarterly content refresh | **February 2027**, not November |

---

## 6. Off-site foundation — 12 citations, done perfectly

> **Step zero: fix the canonical NAP string.** Write one exact block — business name,
> address format, phone format, one-line description, logo file — and use it
> **byte-identically** everywhere. Inconsistency is worse than absence. The `Centurion`
> locality currently appears on **1 of 9 pages** (`index.html:546` only) — add the
> footer NAP block to all 9.

**Tier 0 — week 1, all free:** Google Business Profile · Bing Webmaster Tools ·
LinkedIn company page · YouTube channel · Crunchbase · Apple Business Connect

**Tier 1 — weeks 2–3, all free:** Brabys · Yellow Pages SA (Yellosa) · Bizcommunity ·
Kompass · TechBehemoths · claim any existing DesignRush listing

**Skip for now:** Clutch Sponsored ($1,500–1,800/yr — decline), paid press inclusions,
and the long tail of low-value SA directories. Twelve done perfectly beats forty done
sloppily.

### Reviews — target **5 by day 90**, not 15

"15 reviews by day 90" at "1–2 per month sustained" is arithmetically impossible
(1–2 × 3 = 3–6). More to the point: a business whose entire public portfolio is four
codenamed projects may not have 15 completed clients to ask.

**No gating. No incentives.** Both are policy violations. Just ask, by name, after
delivery. Note the Clutch listing needs 3 verified reviews — *that* is the binding
constraint, not 15.

---

## 7. The two hard gates

**Geo pages and vertical pages are BLOCKED, not scheduled.**

Every guardrail proposed for these pages requires a named or described local client, and
Cognexa currently has **zero publishable clients**. Building the Centurion page with a
vague or invented client is exactly the pattern the March 2026 spam update targeted
(started 24 March 2026, ran 19h30m). Templated location service pages lost an estimated
30–60% of traffic in enforcement waves.

> **No signed client testimonial in hand → no geo page. No exceptions.**

---

## 8. Explicit non-goals — do not spend time on these

| Non-goal | Why |
|---|---|
| **The `/index.html` 301 rewrite** | 🔴 **HIGHEST RISK ITEM. Do not ship.** On LiteSpeed a `THE_REQUEST`-based rule interacting with `DirectoryIndex` is the classic source of an infinite redirect loop on `/`. `/` is **1 of only 4 indexed URLs** and carries all 15 brand impressions. The benefit is removing a single GSC row Google's own docs describe as requiring no action. **A 301 loop on `/` takes the site to zero** |
| Restructuring URLs to remove `.html` | Three of four indexed pages are blog posts. Spends your entire asset base for a cosmetic change |
| Core Web Vitals optimisation | "No data" because you have no field traffic — a consequence, not a cause |
| `llms.txt` beyond the one real fix | The overwhelming majority of these files receive zero requests. Repoint it at real URLs and move on |
| Chasing the 4 "not indexed" rows | Benign. Verified |
| A second Google Business Profile for another city | Guideline violation |

---

## 9. Master prioritised list

| Pri | # | Action | Effort | Impact |
|---|---|---|---|---|
| P0 | 0 | Rename IVR post **before** sitemap submission | 30m | Free while the URL is undiscovered |
| P0 | 1 | **Submit sitemap in GSC + Request Indexing ×6** | 20m | 🔥 Unblocks 5 of 9 pages |
| P0 | 2 | Bing WMT + IndexNow | 30m | 6.95% of SA search + AI citation baseline |
| P0 | 3 | **Google Business Profile, verified** | 4h | 🔥 The only surface that moves in weeks |
| P0 | 4 | Repoint 100 internal links to `/` | 10m | Crawl budget + link equity. Zero risk |
| P0 | 5 | Unhide the contact section from Googlebot | 30m | 44 links point at content Google ignores |
| P0 | 6 | Organization schema: `sameAs`, entity fields | 1h | Fixes 15 brand impressions → 0 clicks |
| P0 | 7 | Homepage title / H1 / hidden H2s / codenames / broken sentence | 1h | Brand query + topical clarity + trust |
| P0 | 8 | Branded 404 + `ErrorDocument` | 30m | Stops dead-ending crawlers |
| P0 | 9 | LinkedIn company page | 30m | `sameAs` anchor + SA B2B surface |
| P0 | 10 | **GA4 conversion events** | 1h | 🔥 Otherwise the plan is ungradeable |
| P0 | 11 | **Real volumes from Keyword Planner** | 1h | Replaces ~60 estimates |
| P1 | 12 | Money pages 1–5 | 6 days | The layer that doesn't exist |
| P1 | 13 | `about.html` + `Person` + bylines on 7 posts | 4h | Fixes the "Who" test retroactively |
| P1 | 14 | Real `<table>`s + answer-first paras on 7 posts | 6h | Highest-yield AEO change available |
| P1 | 15 | Breadcrumbs, `dateModified`, sitemap regen | 2h | — |
| P1 | 16 | 12 citations, NAP-identical | 4h | Discovery path #2 |
| P1 | 17 | `calculator.html` | 8h | The only realistic link magnet |
| P1 | 18 | `privacy-policy.html` | 1h | Trust + you publish a POPIA guide |
| P1 | 19 | Font preload, `fetchpriority`, defer scripts (corrected patch) | 3h | — |
| P2 | 20+ | Verticals · geo · case studies · integrations | — | 🔒 All gated on real clients |

---

**Next:** [05-corrections-log.md](05-corrections-log.md) — what was verified, and what
must never be published
