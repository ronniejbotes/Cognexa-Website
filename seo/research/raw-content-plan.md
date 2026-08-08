# Cognexa Content Plan — 90 Days and Beyond
**Prepared:** 9 August 2026 · **Site:** cognexa.co.za · **Market:** South Africa (primary), worldwide (secondary)
**Baseline:** 9 URLs · 4 indexed · 87 impressions / 0 clicks / avg position 14.5 over 90 days

---

## 0. The one-paragraph strategic read

Cognexa does not have a content quality problem. Its seven existing posts are well-structured, answer-first, question-headed and genuinely well-sourced — better than four of the six results currently ranking for `whatsapp chatbot south africa`. The problem is that **a business selling seven distinct services has one page**, that **four of those services (quoting, invoicing, bookings, custom CRM) appear zero times on the site**, and that **every piece of content it has ever published assumes the reader already decided they want AI**. The SERPs it needs are unusually weak — 8 of 12 tested are weak or broken, `ai agency pretoria` returns a Wikipedia article about a defunct intelligence agency — so the constraint is not competition. It is surface area, evidence, and the total absence of the two formats that actually win this niche: **comparison content with a Rand column**, and **tools nobody else in South Africa has built.**

---

## 1. Preconditions — the content plan does not start until these are done

Content compounds on top of indexing. It does not substitute for it. **Do not publish piece #1 until all six are complete.** Estimated total: one working day.

| # | Gate | Why content fails without it |
|---|---|---|
| 1 | Submit `sitemap.xml` in GSC + Request Indexing on all 9 URLs | 5 of 9 real URLs have never been *discovered*. Google's own rule: a page must be indexed and snippet-eligible to appear in AI Overviews or AI Mode. Half the corpus is structurally ineligible. |
| 2 | Register in Bing Webmaster Tools + submit sitemap | Free per-URL AI citation counts and "grounding queries". Bing is 6.95% of SA search and skews corporate-desktop — exactly the B2B buyer. |
| 3 | Create + video-verify Google Business Profile (service-area, Centurion, address hidden) | Local ranking is far less gated by domain age than organic. It is also the anchor NAP and the `sameAs` target that resolves the entity. |
| 4 | Find-and-replace `href="index.html"` → `href="/"` across all 8 subpages | 100 internal links point at a non-canonical URL; exactly 1 points at the canonical. Wasted crawl on a domain with almost none to spare. |
| 5 | Fix the homepage `<title>` (add "Cognexa") and `<h1>` (add keywords) | `cognexa` is the #1 query at 15 impressions / 0 clicks, and the homepage is the only page on the site whose title omits the brand. |
| 6 | Ship `about.html` with a named human + `Person` schema; repoint all 7 `BlogPosting.author` nodes at it | The site fails Google's "Who" test outright. Every piece written after this inherits the fix; every piece written before it has to be retrofitted. |

Also: `.contact` is `display:none` in Google's rendered DOM (`css/styles.css:1438`), and 44 sitewide links point into it. Change the selector to `.contact-form`. This is a content problem disguised as a CSS problem.

---

## 2. Content model

### 2.1 What this site needs, and why

The winning architecture in this niche is not "more blog posts". It is a nine-layer structure that every competitor who ranks uses some subset of. Automation Architects has ~50 pages covering the same services Cognexa covers in 9. BizAI holds **slots 2 and 3** for `ai receptionist south africa` — with blog posts, using a fixed formula: ~2,200 words, a five-provider ZAR comparison table, an 8-question PAA-derived FAQ, an author byline with LinkedIn, and a visible "updated Aug 2026" date.

| Layer | Purpose | Cognexa today | Target at day 90 |
|---|---|---|---|
| **Money pages** (one URL per commercial service) | The only thing Google's retrieval stage can return for a commercial query. Anchors are not documents. | **0** (four `#station-*` anchors) | **7** |
| **Pricing** | Highest-converting modifier in the entire keyword map. Already in GSC data twice. | 0 | 1 |
| **Decision / comparison** | Semrush: comparative content produces **2.4× more brand mentions** than informational. 100% of ChatGPT-cited software pages used list structure, 68% had a comparison table, 78% had a year in the title. | 2 (one mistargeted) | 5 |
| **Problem-aware TOFU** | All 7 existing posts have "AI" in the title. Nobody types "AI receptionist" until *after* deciding AI is the answer. The volume sits upstream. | **0** | 4 |
| **Proof / trust** | Portfolio is four codenames marked "full walkthroughs are private". That converts the only proof asset into a liability. | 0 | 3 (about, 2 case studies) |
| **Tools / calculators** | **Zero in South Africa.** The only asset type journalists, chambers, WhichVoIP and LLMs cite spontaneously. | 0 | 2 |
| **Vertical pages** | DentalConnectAI ranks top-5 for the head term with essentially one page. Trades, legal, real estate, accounting, auto and veterinary are all unclaimed in SA. | 0 | 2 |
| **Geo** | `ai agency pretoria` SERP is broken. Cognexa is physically in the metro. But this is a doorway-abuse minefield — five pages maximum, ever. | 0 | 1 (+ index) |
| **Informational blog** | Seer: blogs and guides are **50% of all AI citations**. Cognexa's 7 posts are the right shape and the wrong subject. | 7 | 7 (rebuilt, not multiplied) |

### 2.2 The ratio

**First 90 days (26 new pieces):**

| Category | Pieces | Share | Justification |
|---|---|---|---|
| Money / service pages | 7 | 27% | The dominant cause of the 87-impression ceiling. Every competitor ranking for Cognexa's terms has the phrase at URL level; Cognexa has none. |
| Decision / comparison | 5 | 19% | 2.4× brand mentions; the format that produced BizAI's #2 and #3 slots. |
| Problem-aware TOFU | 4 | 15% | The entire upstream funnel is currently missing. Also the cheapest rankings on the list. |
| Proof / trust / pricing | 4 | 15% | Fixes the E-E-A-T evidence vacuum and the highest-converting query modifier simultaneously. |
| Tools / calculators | 2 | 8% | The only link-and-citation magnet available. Zero SA competition. |
| Vertical pages | 2 | 8% | Single vertical pages demonstrably outrank generic agency homepages here. |
| Geo | 2 | 8% | Broken SERP, home turf, hard-capped at five ever. |

**Plus, not counted as new pieces:** rebuild of 4 of the 7 existing posts (`ai-receptionist-cost`, the mistargeted IVR post, the POPIA post, the workflow-examples post). This is maintenance work and it is the highest-return-per-hour on the list.

**Steady state after day 90:** 4–6 pieces/month, split **50% new / 50% substantive refresh of existing**. Seer's data on 7,683 cited pages: 75% were updated within the past year, but only 42% were *published* within the past year. Maintenance, not volume, drives citation. *"Publish and forget loses. Publish and maintain wins."*

### 2.3 The 3D websites pillar — demoted, not deleted

Autocomplete for `3d website design` returns *prompt, templates, free, ai, examples, ideas, portfolio, inspiration* — 100% DIY and inspiration intent, 0% buyer intent. It is also embedded far from "AI business automation", which widens `siteRadius` and dilutes topical focus at exactly the moment the domain has no authority to spare.

**Decision: 3D is a portfolio and differentiation asset, not a traffic channel.** Keep it on the homepage and in `#work`. Give it one service page in Q2 at the earliest. Write **zero** blog content about Three.js or WebGL on this domain. Content weighting stays 90/10 toward automation.

### 2.4 Cadence — the brief's 2/week is right, but only for 90 days, and only because of *what* is being published

The observed winning cadence in this market is **1–2 SA-qualified, ZAR-priced posts per month with visible update dates** — not high volume. Google's scaled content abuse policy explicitly names *"using generative AI tools to generate many pages without adding value"*, template-generated location service pages reportedly lost 30–60% of traffic in enforcement waves, and the March 2026 spam update completed in 19h30m — the fastest ever.

So the justification for 2/week has to be specific:

- **55% of the 90-day output is missing architecture, not content.** Service pages, a pricing page, an about page and two calculators are things the business already sells and already does. Documenting a real service you actually deliver is not scaled content abuse under any reading of the policy.
- **Every piece is human-written and carries something that cannot appear on any other page** — a Rand figure, a client number, a tested result, a local regulatory detail. Zero data-merge templates. Zero city-name-swap pages.
- **Nothing is published purely to farm a query variation.** The doc explicitly excludes `ai receptionist Pretoria / Sandton / Midrand` style near-duplicates.
- **The rate drops hard at day 91.** 26 pieces in 13 weeks, then 4–6/month with half the effort on refresh. That shape is publishing a missing site, then maintaining it — not a content farm.

**If capacity is realistically 1 piece/week:** ship the Top 10 in §4 in order, in weeks 1–10, and treat everything else as backlog. Ten pieces done properly beats twenty-six done thinly, and the top 10 alone closes the majority of the gap.

---

## 3. Audit of the 7 existing posts

| # | Post | Target query | Is the query real? | Likely to rank? | Verdict |
|---|---|---|---|---|---|
| 1 | `ai-receptionist-cost-south-africa.html` | ai receptionist cost south africa | **Yes — GSC-confirmed** (8 + 1 + 1 impressions across three cost/pricing variants) | **Yes, with work.** Already indexed, already earning. | **EXPAND — highest-return asset on the site** |
| 2 | `ai-voice-agent-vs-ivr-vs-receptionist.html` | ai voice agent vs ivr vs receptionist | **No. Invented query.** A three-way comparison a marketer constructs, not one a buyer types. | No — not as targeted | **RE-TARGET** |
| 3 | `whatsapp-ai-chatbot-popia-compliance.html` | popia compliant chatbot | Yes, but tiny (est. 10–20/mo) | Yes — low competition, real moat | **EXPAND into a POPIA hub** |
| 4 | `small-business-ai-workflow-automation-examples.html` | ai workflow automation examples small business | Yes (est. 20–50/mo SA) | Yes — indexed already | **PROMOTE TO PILLAR** |
| 5 | `ai-agent-vs-chatbot-difference.html` | ai agent vs chatbot | Yes globally (800–2,000/mo) — but zero SA specificity, zero commercial intent | **No.** Competing with IBM, Salesforce, HubSpot and OpenAI for a definitional term from a zero-authority domain. And if you won, it doesn't buy. | **KEEP — DO NOT INVEST FURTHER** |
| 6 | `how-long-ai-automation-setup-roi.html` | how long ai automation setup roi | **No. Near-zero demand as phrased.** A sales objection-handler dressed up as a blog post. | No | **CONVERT TO A TOOL** |
| 7 | `ai-chatbot-south-african-languages.html` | ai chatbot south african languages | Yes-ish — but it is currently absorbing **12 impressions on a competitor's brand name** (`botlhale ai`), which will never convert | Indexed, but competing with a funded, Google-featured specialist on enterprise multilingual NLP | **RE-POSITION as hub + capture the real PAA phrasing** |

### 3.1 Specific changes, post by post

**1. `ai-receptionist-cost-south-africa.html` — EXPAND. Target 2,800+ words.**
This is the best-performing page on the site and it loses to BizAI on format alone, not on quality. **Do not change the URL.**
- Add a real `<table>` immediately after the "How much does an AI receptionist cost in South Africa?" H2: provider / ZAR per month / once-off setup / SA accent support / WhatsApp / POPIA / works during load shedding / trial. Populate with **BizAI Voice Valet R999**, **SME Advantage R849/mo + R4,950 setup**, **Lekker AI R2,499**, **WhichVoIP R3,500**, **Vapi/Bland R2–R8 per minute**, **human receptionist R8,025–R16,000**, and Cognexa.
- Add the **true cost of employment** section nobody has written: gross salary *plus* UIF, SDL, 13th cheque, leave cover, recruitment cost, workspace — and the coverage math (a human covers ~45 of 168 hours a week; the AI covers 168).
- Add an 8-question FAQ block using the exact PAA phrasings: *What is the best AI receptionist in South Africa? / How much does an AI receptionist cost in South Africa? / Can an AI receptionist understand South African accents? / Is an AI receptionist POPIA compliant? / Will an AI receptionist work during power outages? / Can an AI receptionist handle WhatsApp? / How long does setup take? / What's the difference between an AI receptionist and a virtual receptionist?*
- Embed the ZAR calculator (Week 3).
- Add author byline + LinkedIn, visible `Last updated`, honest `dateModified`.

**2. `ai-voice-agent-vs-ivr-vs-receptionist.html` — RE-TARGET, and rename.**
You wrote the comparison nobody searches and skipped the two everybody does. There are 10+ dedicated commercial pages competing for *"AI receptionist vs answering service"* and a whole cluster on *"AI receptionist vs human receptionist"* — BizAI alone has three posts on the latter.
- New target: **"AI Receptionist vs Human Receptionist vs Answering Service (South Africa, 2026)"**.
- **Rename to `ai-receptionist-vs-human-receptionist.html` with a 301.** This is the *only* URL on the site that should be renamed. Justification: it is unindexed, so there is literally nothing to lose, and the current slug encodes a query nobody types. Every other URL stays exactly as it is.
- Keep IVR as one section, not the frame. Add the cost-of-employment table. Add the "hiring vs AI" decision framing.

**3. `whatsapp-ai-chatbot-popia-compliance.html` — EXPAND into the POPIA hub.**
It stops short of the actual legal hook, which is a credibility gap a lawyer would spot immediately.
- Add **POPIA Section 71 (automated decision-making)**: a data subject must not be subject to a decision based *solely* on automated processing where it has legal or significant effect. Practical read for buyers: *if a chatbot assesses a lead for a financial product or declines a claim, Section 71 applies and a human must be in the loop; if it only provides information, it does not.*
- Add a downloadable **POPIA consent checklist** + template opt-in wording (email-capture asset).
- Add sections contesting `is chatgpt popia compliant` (Aivolution currently holds it) and `popia compliant crm`.
- Link to it from **every** service page as a trust signal. This page will never be a traffic driver; it is a deal-closer.

**4. `small-business-ai-workflow-automation-examples.html` — PROMOTE TO PILLAR. Target 3,000+ words.**
12 examples in 1,863 words is ~150 words each — too thin to rank for any of the 12 sub-topics.
- Name the actual SA stacks: WhatsApp Business API + Make/n8n + **Sage / Pastel / Xero** + **Yoco / PayFast / Ozow** + Google Workspace.
- Add before/after tables in **hours *and* Rands** for each workflow.
- Spawn a dedicated child page per workflow (quoting, invoicing, bookings, email sorting, CRM hygiene) — which conveniently is exactly the missing-offering gap.
- Make it the internal-link hub: every workflow child links up, it links down to all of them.

**5. `ai-agent-vs-chatbot-difference.html` — KEEP, DO NOT INVEST.**
Real global query, rising, and completely unwinnable from this domain. Its being unindexed is not a tragedy.
- One change only: retitle toward *"AI Agent vs Chatbot: Which Does Your Small Business Actually Need?"* and add two internal links up to the chatbot and workflow service pages.
- Use it purely as an internal-link supporting node. Do not refresh it. Do not promote it.

**6. `how-long-ai-automation-setup-roi.html` — CONVERT TO A TOOL.**
This is the single highest-leverage rewrite available on the site.
- The ROI half becomes **"AI Automation ROI Calculator (South Africa)"** — an interactive ZAR tool. Multiple ROI calculators rank globally; **zero exist in Rand**.
- The timeline half ("how long does setup take") becomes a section inside the workflow pillar and inside each service page.
- 301 the old URL to the calculator.

**7. `ai-chatbot-south-african-languages.html` — RE-POSITION as a hub.**
This is the site's best genuinely defensible asset and it is badly under-used. It compressed a whole cluster into one page and used none of the phrasings people actually search.
- **Stop trying to out-rank Botlhale** on enterprise multilingual NLP. They are funded, Google-featured, and sell to MTN and DSTV. There is no buyer overlap; those 12 impressions are pure leakage.
- **Retarget the validated PAA phrasing:** *"Can an AI receptionist understand South African accents?"* Add that as an H2 with a self-contained answer.
- Add **real embedded audio demos** — Afrikaans, isiZulu, code-switched English. That is unfakeable proof and it is the entire moat.
- Cite the ElevenLabs regional Afrikaans accent support (Cape Afrikaans, Orange River, Eastern Cape) and Zulu STT.
- Add a code-switching test script readers can run themselves.
- Link hard into `/ai-voice-agents-south-africa.html` and `/ai-receptionist-south-africa.html` so its existing indexed authority flows to money pages.

### 3.2 What this audit means in one line

> Two of seven posts target queries that do not exist. One targets a query it cannot win. One is burning 14% of the site's total visibility on a competitor's brand. Three are genuinely good and under-built. Nothing needs deleting; four need rebuilding before anything new is written.

---

## 4. The 10 highest-leverage pieces

If Cognexa only ever ships ten things, these are them, in this order.

| # | Piece | Type | Why it ranks this high |
|---|---|---|---|
| **1** | `/ai-receptionist-south-africa.html` | Money page | The only genuinely commercial query already producing GSC impressions (8, at position ~14.5) — and there is **no page for it**, only a homepage anchor. Autocomplete ranks "south africa" as the **#2 global suggestion** for `ai receptionist`, ahead of Australia and the UK. The SERP is one directory, zero enterprise brands, and two blog posts from a company Cognexa's own size. Everything else in this plan is inference; this is measured demand with a vacant landing zone. |
| **2** | Rebuild `ai-receptionist-cost-south-africa.html` | Rebuild | Already indexed, already earning, already the best page on the site. It loses to BizAI purely on format — they have a named-vendor ZAR table and 8 PAA FAQs; you have neither. Strengthening a page that already ranks is dramatically cheaper than creating a new winner, and `cost`/`pricing` is the highest-converting modifier in the entire map. |
| **3** | `/pricing.html` | Proof / money | Every serious SA competitor publishes ZAR figures (BizAI R599–R7,500, SME Advantage R4,950 + R849, Smart AI Solutions R15k–R35k, CompanyConnect R15k–R60k projects). Cognexa publishes nothing. That is simultaneously a ranking loss, a conversion leak, an E-E-A-T "why" failure, and a forfeited AI-citation target — pricing tables are exactly the self-contained, answer-first content that gets extracted. |
| **4** | AI Receptionist / Automation Cost Calculator (ZAR) | Tool | **No South African competitor has any calculator.** It is the one asset journalists, chambers, WhichVoIP and LLM answer engines will all cite spontaneously, and it directly addresses the total absence of backlinks — the actual reason five URLs went undiscovered. It also converts the site's weakest post into its best link magnet, at ~80 lines of vanilla JS. |
| **5** | `/custom-crm-development-south-africa.html` | Money page | Highest ticket, least contested cluster found anywhere in the research. Three of the six top results are **Indian outsourcing firms running templated `/south-africa/` pages** with no local proof, no ZAR pricing, no SA case studies. Autocomplete returns a fully commercially-loaded set including two separate cost variants. The founder names Custom CRMs as core; the site says nothing. |
| **6** | `/whatsapp-ai-chatbot-south-africa.html` | Money page | `whatsapp automation south africa` is the **#2 autocomplete suggestion** — the strongest SA signal in the entire chatbot cluster — and `whatsapp business api pricing south africa` surfaces geo *and* pricing modifiers in a single top-10. WhatsApp is at ~96% penetration among SA internet users. The homepage title already claims this term and earns zero impressions for it. |
| **7** | "Best AI Receptionists in South Africa (2026): Honest Comparison" | Comparison listicle | The format that produces **2.4× more brand mentions** than informational content, the format BizAI used to take slots 2 *and* 3, and the format Swiftsell used to rank for its own category. 100% of ChatGPT-cited software pages used list structure, 68% had a comparison table. Cognexa has zero of these. Being #1 in a listicle an AI cites lifts visibility by 16.5 points. |
| **8** | `/about.html` + founder `Person` entity + bylines on all 7 posts | Proof | The site fails Google's "Who" test outright: no named human, schema author resolves to the Organization, no team page, no testimonials. The competitor beating you leads with a named founder and "83+ businesses deployed since 2023". This single page unlocks E-E-A-T retroactively on all 7 existing posts and prospectively on all 26 new ones, and doubles as the brand-entity disambiguation fix. |
| **9** | "Do AI Voice Agents Understand South African Accents? We Tested Six." | Original data | The only piece on this list that international competitors physically cannot write. TechCentral and iAfrica both report SA voice AI failing on local accents, latency and languages — the demand is documented. It is the validated PAA phrasing, it is inherently citable, and it is the one asset MyBroadband, TechCentral, ITWeb and Stuff would all run. Nobody at OpenAI or Synthflow has this data. |
| **10** | `/quoting-invoicing-automation.html` | Money page | A founder-named core offering with **zero occurrences** on the site ("quoting" appears 0 times in `index.html`). The SERP returns only SaaS directories — **no agency competes at all**. And SARS confirmed a mandatory e-invoicing mandate phased 2026–2029, which gives this page a three-year growing tailwind nobody in the AI-automation space has touched. |

---

## 5. The 90-day editorial calendar

**Assumed cadence: 2 pieces per week, 13 weeks, 26 pieces.** Rebuilds of existing posts are shown inline and count as one slot each.

**Format key:** every piece follows the AEO standards in §8. Word counts are minimums for the visible body, markup stripped.

---

### PHASE 1 · Weeks 1–4 — The money layer and the proven beachhead

#### W1 · P1 — `/ai-receptionist-south-africa.html`
**Title:** AI Receptionist South Africa (2026): What It Costs, What It Handles, How Fast It Goes Live
**Primary:** ai receptionist south africa · **Secondary:** ai receptionist for small business, ai answering service south africa, ai phone answering south africa, 24/7 call answering south africa · **Intent:** commercial · **Words:** 1,600 · **Format:** service page + comparison table + 8-question FAQ

**Thesis:** A South African business loses roughly 30% of its inbound sales calls, and 85% of those callers never call back. An AI receptionist is not a robot that replaces your front desk — it is the thing that answers the calls your front desk was never awake for.

**Must contain to beat what ranks:**
- A ZAR price band in the first 60 words (Capterra ZA holds slot 1 with a directory listing and no local pricing at all)
- Comparison table: Cognexa / BizAI Voice Valet / SME Advantage / Lekker AI / human receptionist — monthly ZAR, setup ZAR, hours covered, SA accents, WhatsApp, POPIA, load-shedding
- A "what it will and won't do" list of 7 items, each a complete clause — honesty is the differentiator against `aireceptionists.io/south-africa`, which is a templated programmatic page with zero SA substance
- An embedded audio sample of the agent handling a South African accent
- Named integrations: Google Calendar, WhatsApp Business API, Sage, Xero, 3CX
- 8-question FAQ using the exact PAA phrasings

**Links in:** homepage `#station-voice` (replace the anchor CTA), `ai-receptionist-cost-south-africa.html`, `ai-chatbot-south-african-languages.html`, nav
**Links out:** `/pricing.html`, `ai-receptionist-cost-south-africa.html`, POPIA hub, `/ai-voice-agents-south-africa.html`
**CTA:** "Get a fixed quote in Rand — reply within one business day" → intake form + WhatsApp click-through

---

#### W1 · P2 — REBUILD `ai-receptionist-cost-south-africa.html`
**Title:** AI Receptionist Cost in South Africa (2026): Real ZAR Prices, Compared
**Primary:** ai receptionist cost south africa · **Secondary:** ai receptionist pricing south africa, how much does an ai receptionist cost in south africa, ai receptionist price per minute, virtual receptionist cost south africa · **Intent:** commercial · **Words:** 2,800 · **Format:** cost guide + vendor table + TCOE math + FAQ

**Thesis:** Every comparison of AI vs human receptionist in South Africa compares the AI's monthly fee to a gross salary. That comparison is wrong and it understates the gap by roughly 35%.

**Must contain:** the full vendor table (§3.1); the true-cost-of-employment breakdown (UIF, SDL, 13th cheque, leave cover, recruitment, workspace, 45-of-168-hours coverage); per-minute pricing (R2–R8) for the DIY comparison; the embedded calculator once built; 8 PAA FAQs; visible `Last updated`; author byline with LinkedIn.
**Links in:** `/ai-receptionist-south-africa.html`, `/pricing.html`, homepage `#local`, blog index
**Links out:** `/ai-receptionist-south-africa.html`, `/pricing.html`, calculator, `ai-receptionist-vs-human-receptionist.html`
**CTA:** calculator → intake

---

#### W2 · P3 — `/pricing.html`
**Title:** What AI Automation Actually Costs in South Africa (2026) — Full ZAR Breakdown
**Primary:** ai automation cost south africa · **Secondary:** how much does it cost to automate my business, ai chatbot cost south africa, custom crm cost south africa, whatsapp chatbot price south africa · **Intent:** commercial · **Words:** 1,800 · **Format:** pricing page + consolidated table + "what moves the price" + FAQ

**Thesis:** Everyone in this market segments their pricing by product. Nobody has published one table covering receptionist + chatbot + workflow + custom CRM. This is that table.

**Must contain:**
- Setup band and monthly band, in Rand, for each of: AI receptionist, WhatsApp/website chatbot, workflow automation, booking automation, quoting/invoicing automation, custom CRM
- A "what moves the price up or down" section (call volume, number of integrations, languages, whether a custom CRM is involved) — this is what makes ranges honest rather than evasive
- A worked example: "a Centurion dental practice taking 400 calls a month pays R___"
- Market context table anchoring against published competitor figures
- `AggregateOffer` schema, `priceCurrency: ZAR`

**Links in:** every service page, nav, footer, `ai-receptionist-cost-south-africa.html`
**Links out:** all service pages, calculator, `/about.html`
**CTA:** "Free scoping call, fixed quote in Rand, no minimum contract"

---

#### W2 · P4 — `/whatsapp-ai-chatbot-south-africa.html`
**Title:** WhatsApp AI Chatbot for South African Business — Setup, Real Costs, POPIA
**Primary:** whatsapp automation south africa · **Secondary:** whatsapp chatbot south africa, whatsapp business api south africa, whatsapp business api pricing south africa, ai chatbot for business south africa · **Intent:** commercial · **Words:** 1,800 · **Format:** service page + pricing table + FAQ

**Thesis:** In South Africa the website chat widget is usually the wrong channel. WhatsApp has ~96% penetration among internet users, ~98% open rates, and the average South African spends 23h42m a month in it. Your customers are already there.

**Must contain:**
- Meta's **per-message** billing (which replaced per-conversation on 1 July 2025) explained in ZAR — most published SA guides still quote the old model, which is a factual-accuracy win you can claim outright
- Marketing template cost ≈ US$0.086 ≈ R1.50/message; service conversations free since Nov 2024
- WhatsApp Business App vs Business API decision table (the classic qualifying question)
- The away-message argument, stated plainly: *WhatsApp Business can decide **when** to send a message, but not **why** — it cannot tell a pricing question from a refund request*
- POPIA consent handling, linking to the hub

**Links in:** homepage `#station-chat`, POPIA post, `/pricing.html`, nav
**Links out:** POPIA hub, `/pricing.html`, `/booking-automation-south-africa.html`, `/workflow-automation-south-africa.html`
**CTA:** "See a live WhatsApp agent — message us on WhatsApp" (dogfooding the product is the demo)

---

#### W3 · P5 — TOOL: `/ai-receptionist-cost-calculator.html`
Full build spec in §7.1. Replaces `how-long-ai-automation-setup-roi.html` (301).
**Primary:** ai automation roi calculator south africa · **Secondary:** ai receptionist vs human receptionist cost, receptionist cost calculator south africa, automation roi calculator, cost of missed calls calculator · **Intent:** commercial/tool · **Words:** 700 of supporting copy + tool · **Format:** interactive calculator + methodology

---

#### W3 · P6 — `/about.html` + `Person` schema + bylines across all 7 posts
**Title:** About Cognexa — Who Builds This, and Why
**Primary:** cognexa · **Secondary:** cognexa ai centurion, ai automation agency centurion, who is cognexa · **Intent:** navigational/trust · **Words:** 800 · **Format:** about/founder page

**Must contain:** real name, real photo, 150–250 word "why I know automation" bio, Centurion location, LinkedIn, email, phone; `Person` schema with `sameAs` and `worksFor`; the full `sameAs` array on the Organization node; a plain-HTML testimonial block (no `Review`/`AggregateRating` markup — see §8.4).
**Also in this slot:** repoint `BlogPosting.author` in all 7 posts to the Person `@id`; add a visible byline + 2-line bio at the foot of every article.

---

#### W4 · P7 — `/ai-voice-agents-south-africa.html`
**Title:** AI Voice Agents in South Africa — Accents, Afrikaans, Latency and What Actually Breaks
**Primary:** ai voice agent south africa · **Secondary:** ai phone agent south africa, ai receptionist afrikaans, ai calling agent south africa, outbound follow-up calls automation · **Intent:** commercial · **Words:** 1,500 · **Format:** service page + differentiation wedge

**Thesis:** Voice AI built for American English fails on South African speech. That is documented, not marketing — and it is the entire reason to hire someone local.

**Must contain:** SA accent/Afrikaans/isiZulu handling with audio; latency reality over local networks; load-shedding continuity (cloud answering keeps working because it never ran on your premises); outbound reframed as *follow-up to existing leads*, not cold calling (POPIA consent risk); comparison against Vapi/Bland/Synthflow on the SA-specific criteria only — do not fight them on features.
**Links in:** `/ai-receptionist-south-africa.html`, `ai-chatbot-south-african-languages.html`, homepage
**Links out:** `/ai-receptionist-south-africa.html`, `/pricing.html`, POPIA hub
**CTA:** "Hear it handle your accent — book a 15-minute live call test"

---

#### W4 · P8 — RE-TARGET → `ai-receptionist-vs-human-receptionist.html` (301 from the IVR slug)
**Title:** AI Receptionist vs Human Receptionist vs Answering Service (South Africa, 2026)
**Primary:** ai receptionist vs human receptionist south africa · **Secondary:** ai receptionist vs answering service, should i hire a receptionist or use ai, virtual receptionist vs ai, ivr vs ai voice agent · **Intent:** commercial/comparison · **Words:** 2,200 · **Format:** three-way comparison + decision table

**Must contain:** decision table across cost, coverage hours, scalability, accent handling, escalation, after-hours, load shedding; the true-cost-of-employment math (your differentiator — BizAI has three posts on this comparison and none of them calculate it); IVR as one section, framed as the thing everybody already hates; an honest "when you should hire a human instead" section.
**Links in:** `ai-receptionist-cost-south-africa.html`, `/ai-receptionist-south-africa.html`, blog index
**Links out:** calculator, `/pricing.html`, `/ai-receptionist-south-africa.html`

---

### PHASE 2 · Weeks 5–8 — The invisible product line and the formats that earn mentions

#### W5 · P9 — `/workflow-automation-south-africa.html`
**Title:** Workflow Automation for South African Businesses — Quotes, Invoices, Bookings, Inbox, CRM
**Primary:** business automation south africa · **Secondary:** business process automation south africa, workflow automation south africa, ai workflow automation, automation companies in gauteng · **Intent:** commercial · **Words:** 1,800 · **Format:** service hub page

**Thesis:** Not RPA. Not an enterprise transformation programme. Six specific jobs your staff currently do by hand, done by software, for a fixed price in Rand.

**Must contain:** the six jobs named explicitly (quoting, invoicing, bookings, email sorting, CRM hygiene, reporting) each with a before/after in hours *and* Rands; SA tool stack named (Sage, Pastel, Xero, Yoco, PayFast, Ozow, Google Workspace, WhatsApp API, Make/n8n); a clear disambiguation paragraph separating this from **industrial/PLC automation**, which is what "automation" defaults to in SA search; typical build timeline in weeks.
**Note:** do not chase `business process automation south africa` as a head term — BDO, Ricoh and SME South Africa own it. Target the qualified long-tails on the same page.
**Links in:** homepage `#station-workflow`, workflow pillar post, nav
**Links out:** quoting/invoicing page, booking page, custom CRM page, `/pricing.html`

---

#### W5 · P10 — `/quoting-invoicing-automation.html`
**Title:** Automated Quoting and Invoicing for South African Businesses (2026)
**Primary:** automated quoting system · **Secondary:** invoice automation south africa, automated invoicing system, quoting software for small business, automate invoicing sage xero · **Intent:** commercial · **Words:** 1,500 · **Format:** service page

**Thesis:** A quote that takes two days to send loses to one that takes ten minutes. The bottleneck is never the pricing — it is that a human has to sit down and type it.

**Must contain:** the quote→invoice→payment→CRM loop drawn as a numbered 6-step list; Sage / Pastel / Xero / QuickBooks integration named; PayFast, Yoco, Ozow payment-link automation; a SARS e-invoicing forward-reference; ZAR price band; a vertical block for trades and builders (`quoting software for builders` is the #1 vertical modifier globally and pairs with the trades receptionist page).
**Critical copy note:** use "quoting" and "quotation" phrasing. **Never "quote automation"** — that phrase collides with inspirational quotations (`automation quotes bill gates`) and is a dead keyword.
**Links in:** workflow hub, workflow pillar post, SARS post, trades vertical
**Links out:** `/pricing.html`, `/custom-crm-development-south-africa.html`, SARS post

---

#### W6 · P11 — `/custom-crm-development-south-africa.html`
**Title:** Custom CRM Development in South Africa — What It Costs and When It Beats HubSpot
**Primary:** custom crm development south africa · **Secondary:** custom crm cost, custom crm software south africa, crm development company south africa, crm automation south africa, bespoke crm development · **Intent:** commercial · **Words:** 1,800 · **Format:** service page + build-vs-buy analysis

**Thesis:** Off-the-shelf CRM is right until it isn't. The two things that break it in South Africa are per-seat pricing billed in USD against a weakening Rand, and the fact that no international CRM speaks WhatsApp, Sage or Pastel natively.

**Must contain:**
- Build-vs-buy break-even math in ZAR (global benchmark is 20–30 seats against HubSpot; do the Rand version, which does not exist anywhere)
- The FX argument stated explicitly: HubSpot bills in USD, so your cost rises whenever the Rand weakens
- ZAR cost bands (SA custom software runs R20,000 for simple tools to R1M+ enterprise, at R500–R2,500/hour)
- The **3CX + CRM + AI receptionist** combination — 3CX is very widely deployed in SA telephony and this is a genuinely ownable niche
- Integration list built on SA-relevant tools (Sage, Xero, Pastel, PayFast, Yoco), **not** QuickBooks-first
- "When you should NOT build a custom CRM" — pre-qualifies buyers and reads as honest

**Links in:** workflow hub, `/pricing.html`, homepage, quoting page
**Links out:** `/pricing.html`, `/workflow-automation-south-africa.html`, POPIA hub

---

#### W6 · P12 — "Best AI Receptionists in South Africa (2026): An Honest Comparison"
**Slug:** `best-ai-receptionist-south-africa-2026.html`
**Primary:** best ai receptionist south africa · **Secondary:** ai receptionist providers south africa, ai receptionist comparison south africa, top ai receptionist companies sa, ai receptionist reviews south africa · **Intent:** commercial/comparison · **Words:** 2,400 · **Format:** listicle with comparison table

**Thesis:** Five providers, real prices, honest trade-offs — including where Cognexa is the wrong choice.

**Must contain:** a 6-provider table with ZAR/month, setup, SA accents, WhatsApp, POPIA, load-shedding resilience, trial, best-for; a named "best for" verdict per provider (not everything won by Cognexa — the credibility of this format *is* the honesty); an 8-question FAQ; `ItemList` + `FAQPage` schema; year in title; visible update date; author byline.
**Why:** this exact format is how BizAI holds slots 2 and 3, how Swiftsell ranks for its own category, and it is the content type that produces 2.4× more brand mentions in AI answers.
**Links in:** `/ai-receptionist-south-africa.html`, cost post, blog index
**Links out:** `/ai-receptionist-south-africa.html`, `/pricing.html`, calculator

---

#### W7 · P13 — `/booking-automation-south-africa.html`
**Title:** Appointment Booking Automation for South African Businesses
**Primary:** appointment booking system south africa · **Secondary:** online booking system south africa, whatsapp booking system south africa, automated booking system for small business, reduce no shows south africa · **Intent:** commercial · **Words:** 1,400 · **Format:** service page

**Thesis:** A link-based booking flow is a foreign import. In South Africa the booking should happen inside the WhatsApp thread the customer already opened.

**Must contain:** WhatsApp-native booking flow described step by step; Google Calendar / Calendly / practice-management integration; the no-show economics (at R750/appointment and 10 slots/day, a single practitioner loses ~R34,500/month; WhatsApp reminders cut no-shows by up to 35% at ~98% open rates); vertical blocks for salons, dental, guest houses.
**Links in:** workflow hub, WhatsApp service page, verticals
**Links out:** `/pricing.html`, `/ai-receptionist-south-africa.html`, salon/dental verticals

---

#### W7 · P14 — "How to Choose an AI Automation Agency in South Africa"
**Slug:** `how-to-choose-ai-automation-agency-sa.html`
**Primary:** how to choose ai automation agency south africa · **Secondary:** ai automation agency south africa, ai automation companies south africa, questions to ask an ai agency, ai automation agency cost south africa · **Intent:** commercial/decision · **Words:** 2,000 · **Format:** buyer's guide + checklist

**Thesis:** The nine questions that separate an agency that will ship from one that will demo. Includes the ones that make us uncomfortable.

**Must contain:** 9 numbered questions each with what a good answer sounds like; a red-flags list; a "what it should cost" band in ZAR; POPIA and data-residency questions; the "who owns the automations if we part ways" question; a downloadable checklist.
**Why:** Ruppell ranks for `automation agency johannesburg` with *both* its homepage and a "how to choose" article — a cheap second SERP slot on a term where two of the top three results are exact-match domains.
**Links in:** homepage, blog index, `/about.html`
**Links out:** `/pricing.html`, `/about.html`, case studies, all service pages

---

#### W8 · P15 — EXPAND `whatsapp-ai-chatbot-popia-compliance.html` into the POPIA hub
**Title:** POPIA and AI Chatbots in South Africa: Consent, Section 71, and Where Automation Legally Stops
**Primary:** popia compliant chatbot · **Secondary:** popia section 71 automated decision making, ai chatbot data privacy south africa, popia compliant crm south africa, is chatgpt popia compliant · **Intent:** informational/trust · **Words:** 2,600 · **Format:** hub + checklist download

**Must contain:** Section 71 explained with the practical test (information = fine; assessment, qualification or refusal with legal or significant effect = human in the loop required); consent wording templates; a printable POPIA chatbot compliance checklist; a "is ChatGPT POPIA compliant" section contesting Aivolution; a POPIA-compliant CRM section; citations to the Information Regulator and popia.co.za.
**Links in:** every service page, every vertical page, homepage FAQ
**Links out:** all service pages, `/custom-crm-development-south-africa.html`

---

#### W8 · P16 — "What a Receptionist Really Costs in South Africa (2026)"
**Slug:** `receptionist-salary-vs-ai-south-africa.html`
**Primary:** cost to employ a receptionist south africa · **Secondary:** receptionist salary south africa, total cost of employment receptionist, cost of hiring a receptionist, receptionist salary vs ai · **Intent:** informational/problem-aware · **Words:** 1,800 · **Format:** cost analysis + table

**Thesis:** The advertised salary is roughly 65% of what a receptionist actually costs you, and covers 27% of the week.

**Must contain:** salary data with sources (Indeed R8,025, PayScale ~R11,500, ERI ~R16,000; banded entry R6k / mid R9k / senior R13k / top R18k); the full statutory and hidden-cost stack (UIF, SDL, 13th cheque, leave cover, recruitment, workspace, training, turnover); the coverage math (45 of 168 hours); an honest "when a human is worth every cent" section.
**Why:** this is a pure problem-aware entry point at the exact moment a business owner is deciding whether to hire — before they have ever heard of an AI receptionist. Nobody has written the total-cost version.
**Links in:** cost post, comparison post, calculator
**Links out:** calculator, `/ai-receptionist-south-africa.html`, `ai-receptionist-vs-human-receptionist.html`

---

### PHASE 3 · Weeks 9–12 — Upstream demand, verticals, and the moat

#### W9 · P17 — "Why South African Businesses Miss 30% of Their Sales Calls"
**Slug:** `why-sa-businesses-miss-sales-calls.html`
**Primary:** how to stop missing customer calls · **Secondary:** missed calls costing business south africa, after hours call answering south africa, unanswered sales calls, load shedding missed calls business · **Intent:** informational/problem-aware · **Words:** 1,800 · **Format:** problem guide + fix ladder

**Thesis:** 30% of inbound sales calls in South Africa go unanswered and 85% of those callers never call back. The three causes are all structural — on-site staff, after-hours enquiries, and power outages — and all three are fixable without hiring.

**Must contain:** the 30% SA statistic with source; the 85%-never-call-back figure; the load-shedding angle (R50bn/year national drain; SME downtime R2,000–R15,000 per hour) and the argument that cloud answering keeps working because it never ran on your premises; a fix ladder from free (change your voicemail) to paid; a Rand-denominated cost-of-inaction calculation.
**Why:** the flagship problem-aware piece. All seven existing posts have "AI" in the title, so the entire upstream funnel is uncaptured. Six commercial pages compete globally for this query — none is SA-localised.
**Links in:** homepage, blog index, all receptionist pages
**Links out:** missed-call calculator, `/ai-receptionist-south-africa.html`

---

#### W9 · P18 — REBUILD `small-business-ai-workflow-automation-examples.html` into the pillar
**Title:** 12 Workflows South African Small Businesses Automate First (With Real Hours and Rands)
**Primary:** ai workflow automation examples small business · **Secondary:** business automation examples south africa, what can you automate in a small business, reduce admin work small business, automate manual tasks south africa · **Intent:** informational · **Words:** 3,200 · **Format:** pillar + before/after tables

**Must contain:** each of the 12 workflows given 200+ words; a before/after table per cluster showing hours *and* Rands; named SA stacks; the setup-timeline content salvaged from the retired ROI post; child-page links to quoting, invoicing, booking, email sorting and CRM pages; the benchmark that SA agency clients average 63 hours/month saved ≈ R31,000/month.
**Links in:** every service page, homepage, blog index
**Links out:** all six workflow children, `/pricing.html`, calculator

---

#### W10 · P19 — "How to Answer WhatsApp After Hours Without Hiring Anyone"
**Slug:** `whatsapp-after-hours-auto-reply-sa.html`
**Primary:** how to answer whatsapp after hours · **Secondary:** whatsapp business auto reply setup south africa, whatsapp away message limits, whatsapp business app vs api, after hours enquiries south africa · **Intent:** informational/how-to · **Words:** 1,600 · **Format:** how-to + upgrade path

**Thesis:** WhatsApp Business' built-in away message knows *when* to reply but not *why* — it cannot tell a pricing question from a refund request, and it replies identically to both.

**Must contain:** the genuine free setup steps for WhatsApp Business away messages and greeting messages (give the real value away); the exact point at which they break; the Business App vs Business API decision table; the upgrade path with ZAR costs; POPIA consent note.
**Why:** strongest moat query available — 96% WhatsApp penetration, 23h42m per user per month, and the SERP is dominated by generic global support content.
**Links in:** WhatsApp service page, homepage, blog index
**Links out:** `/whatsapp-ai-chatbot-south-africa.html`, POPIA hub, `/booking-automation-south-africa.html`

---

#### W10 · P20 — `/ai-receptionist-dental-medical-sa.html`
**Title:** AI Receptionist for GP, Dental and Specialist Practices in South Africa (POPIA-Safe)
**Primary:** ai receptionist for dentists · **Secondary:** ai receptionist for medical practice south africa, ai receptionist for doctors south africa, dental practice call answering, reduce appointment no shows dental · **Intent:** commercial/vertical · **Words:** 1,200 · **Format:** vertical landing page

**Thesis:** A missed call at a dental practice is a lost R1,500–R3,000 appointment. A no-show is the same loss with the slot already gone.

**Must contain:** practice-specific call economics in ZAR; the no-show math (R34,500/month per practitioner); **health data is special personal information under POPIA** — treat this as the competitive advantage, not the obstacle; practice-management integration; a named or anonymised local practice example; vertical-specific FAQ.
**Why:** DentalConnectAI ranks top-5 for the *head* term with essentially one vertical page. `ai receptionist for dentists` is confirmed in two independent autocomplete ladders — the best-validated vertical in the research.
**Links in:** `/ai-receptionist-south-africa.html`, booking page, POPIA hub
**Links out:** `/pricing.html`, POPIA hub, calculator

---

#### W11 · P21 — "SARS E-Invoicing Is Coming (2026–2029): What SA Small Businesses Must Do Now"
**Slug:** `sars-e-invoicing-2026-small-business.html`
**Primary:** sars e-invoicing 2026 small business · **Secondary:** south africa mandatory e-invoicing, sars real time vat reporting, peppol south africa, e-invoicing compliance small business sa · **Intent:** informational · **Words:** 2,000 · **Format:** regulatory guide + timeline

**Thesis:** In February 2026 SARS and National Treasury confirmed a move to mandatory e-invoicing and near-real-time VAT reporting on a Peppol five-corner model with a Central Tax Hub, phased 2026–2029. If your invoicing is manual today, you have a deadline.

**Must contain:** the confirmed timeline as a table; what "five-corner Peppol" means in plain language; what a 5-person business actually has to change; a readiness checklist; Sage/Xero/Pastel readiness notes; sources (KPMG, VATupdate, Comarch).
**Why:** the highest-conviction net-new topic in the entire research. Only tax and ERP consultancies cover it, **zero AI-automation players have touched it**, it lands exactly on a stated core offering, and it is a forced-deadline topic that grows every quarter for three years.
**Links in:** quoting/invoicing page, workflow pillar, blog index
**Links out:** `/quoting-invoicing-automation.html`, `/workflow-automation-south-africa.html`

---

#### W11 · P22 — `/ai-receptionist-trades-south-africa.html`
**Title:** AI Receptionist and Automated Quoting for South African Plumbers, Electricians and Builders
**Primary:** ai receptionist for plumbers · **Secondary:** after hours call answering for trades south africa, quoting software for builders, emergency call answering plumber, automated quotes trades · **Intent:** commercial/vertical · **Words:** 1,200 · **Format:** vertical landing page

**Thesis:** You cannot answer the phone with your hands inside a wall, and the emergency call you miss at 19:00 is the highest-value job of the week.

**Must contain:** trades-specific missed-call economics in Rand; **the quoting cross-sell** — this audience needs both an AI receptionist and automated quoting, making it the strongest two-service offer in the entire map; emergency vs routine call triage; a worked example with real numbers.
**Links in:** `/ai-receptionist-south-africa.html`, `/quoting-invoicing-automation.html`
**Links out:** `/quoting-invoicing-automation.html`, `/pricing.html`, calculator

---

#### W12 · P23 — "Do AI Voice Agents Understand South African Accents? We Tested Six."
**Slug:** `ai-voice-agent-south-african-accents.html`
**Primary:** can ai understand south african accents · **Secondary:** ai chatbot afrikaans, ai voice agent afrikaans, multilingual chatbot south africa, ai receptionist south african english · **Intent:** informational/original data · **Words:** 2,400 + dataset · **Format:** original research + audio + downloadable data

**Thesis:** We ran six voice-AI platforms against South African English, Afrikaans and code-switched speech on real SA phone lines. Here are the word error rates.

**Must contain:** stated methodology, sample size, test script; a results table with word error rates per platform per language; **embedded audio samples** — this is the unfakeable part; the code-switching test (the thing that actually breaks these systems in SA); a downloadable CSV; a "what this means if you're buying one" section; honest limitations.
**Why:** the single most citable, most pitchable, most defensible asset available. SA press (TechCentral, iAfrica) already covers SA voice AI failing on accents and latency — the story demand is proven and nobody has published the numbers. This is what gets Cognexa into MyBroadband, ITWeb, TechCentral and Stuff, and it is what LLM answer engines will quote.
**Links in:** `/ai-voice-agents-south-africa.html`, languages post, `/about.html`
**Links out:** `/ai-voice-agents-south-africa.html`, `/ai-receptionist-south-africa.html`

---

#### W12 · P24 — TOOL: `/missed-call-revenue-calculator.html`
Full build spec in §7.2.
**Primary:** missed call cost calculator · **Secondary:** how much are missed calls costing my business, cost of unanswered calls, lost revenue calculator south africa · **Intent:** tool · **Words:** 600 supporting copy + tool

---

### PHASE 4 · Week 13 — Local and proof

#### W13 · P25 — `/ai-automation-centurion-gauteng.html` + `/locations.html`
**Title:** AI Automation Agency in Centurion and Gauteng
**Primary:** ai automation centurion · **Secondary:** automation companies in gauteng, ai agency pretoria, automation companies in johannesburg, business automation gauteng · **Intent:** local/commercial · **Words:** 1,000 · **Format:** location page + locations index

**Thesis:** We are ten minutes from Highveld Techno Park. We will come to your office.

**Must contain (this is the doorway-abuse guardrail — every item is mandatory):**
- Specific local substance that could not appear on any other page: the R21/N1 tech corridor, Highveld Techno Park, Route 21 Corporate Park, the density of owner-operated professional practices in Centurion/Pretoria
- A named or described **local** client
- Local price anchoring: Gauteng receptionist salary vs AI receptionist cost
- A Centurion-specific FAQ with different answers from any other page
- `Service` schema with `areaServed` — **never** `LocalBusiness` with a fabricated address
- A Johannesburg *section*, not a Johannesburg page (`ai agency johannesburg` returns zero autocomplete depth)

**Hard rules going forward:** maximum five geo pages ever. `/locations.html` must be a real browseable index linked from the main nav — that directly satisfies Google's "clearly defined, browseable hierarchy" carve-out against doorway abuse. Ship Centurion, wait six weeks, verify it indexes and holds rank before building Pretoria. **No city page exists until there is a real client in that city to write about.** Any geo page under 10 impressions after 90 days gets merged or deleted.

---

#### W13 · P26 — First named case study + `/case-studies.html` hub
**Title:** How a Centurion [industry] Replaced R[x]/month of Reception Cost With AI
**Primary:** ai receptionist case study south africa · **Intent:** proof · **Words:** 900 · **Format:** case study

**Must contain:** client (named with consent, or "a Centurion dental practice" without); the problem with a number; the systems wired together; build time in weeks; measured outcome — *"R14,200/month in receptionist salary replaced by R2,900/month of AI; 340 calls handled in month one; 11% converted to bookings"*; a client quote.
**Also in this slot:** replace or clearly relabel the four codename portfolio projects (Nexus Core, Nightgrid, Gridworks, Orbital). "Full walkthroughs are private" on invented-sounding names converts the site's only proof asset into a trust liability. Either name them or label them explicitly as concept/self-initiated builds.
**Ship earlier if consent lands earlier.** Do not hold a case study to week 13.

---

### 5.1 What we deliberately will NOT write

| Query / topic | Why it is excluded |
|---|---|
| `chatbot south africa` | 6 of 10 autocomplete suggestions are DStv, MTN, Betway, Clearscore and Payflex support lookups. Navigational, not commercial. Targeting it imports junk traffic and further confuses Google about the site's topic. |
| `automate quotes` / `quote automation` | Contaminated by inspirational quotations (`automation quotes bill gates / funny / short`). Use "quoting"/"quotation" phrasing instead. |
| `virtual receptionist south africa` | Severe job-seeker contamination (VA jobs, salary, courses). Mention only, inside the comparison page. |
| `ai consultant south africa`, `zapier consultant`, `workflow automation specialist` | Job-seeker intent. You would compete against job boards. |
| `n8n`, `n8n workflows`, `n8n pricing`, `make.com consultant` | Every autocomplete suggestion is DIY. These people build it themselves. One credibility mention on the workflow page, nothing more. |
| `3d website design` + all variants | 100% DIY/inspiration intent. Portfolio asset, not traffic channel. |
| `ai email management` as a standalone page | Tool-shopping intent (outlook, gmail, free, reviews). Fold into the workflow page as a feature. |
| `best crm south africa` / `crm software south africa` | Capterra, Zoho, Sage, HubSpot and Leadtrekker own it, and the intent is product comparison, not custom build. |
| Separate Cape Town / Durban / Sandton / Midrand / Randburg pages | Doorway abuse risk. Cape Town and Durban are outside GBP's 2-hour service-area rule anyway; they get covered by service pages, not geo pages. |
| Any templated `/ai-receptionist-{city}/` set | The single fastest way to get this site deindexed under scaled content abuse and doorway abuse simultaneously. |
| isiZulu / isiXhosa standalone content pages | B2B software search volume is effectively nil. Keep multilingual as a *capability* claim in the languages hub. |
| More effort on `llms.txt` | 97% of llms.txt files across 137,210 domains received zero requests in a month; AI retrieval bots were 1.1% of the requests that did occur. Fix its broken anchor links once, add a facts block, then never touch it again. |

---

## 6. South African defensible content — the pieces international competitors cannot write

These are ranked by defensibility × commercial value. Every one exploits something an American or Indian agency structurally cannot claim.

| # | Article | The moat |
|---|---|---|
| 1 | **"Do AI Voice Agents Understand South African Accents? We Tested Six."** | Original first-party data on SA English, Afrikaans and code-switched speech over local networks. Nobody at OpenAI, Synthflow or Vapi has this. Unfakeable, and it comes with audio. |
| 2 | **"POPIA and AI Chatbots: Consent, Section 71, and Where Automation Legally Stops"** | Section 71 automated-decision-making is a South African statutory provision. An international vendor cannot write it credibly and their compliance pages do not mention it at all. |
| 3 | **"How to Answer WhatsApp After Hours Without Hiring Anyone"** | 96% WhatsApp penetration, 23h42m/user/month, one in three South Africans naming it their favourite app. A US agency writing "chatbot vs live chat" cannot credibly say *"in South Africa your website widget is the wrong channel entirely."* |
| 4 | **"WhatsApp Business API in South Africa: Real Costs in Rand (2026)"** | Meta's per-message billing (from 1 July 2025), SA marketing template ≈ US$0.086 ≈ R1.50, service conversations free since Nov 2024 — most published SA guides still quote the retired per-conversation model. A factual-accuracy win. |
| 5 | **"SARS E-Invoicing 2026–2029: What SA Small Businesses Must Do Now"** | A South African regulatory mandate with a phased deadline. Zero AI-automation competitors have touched it, and it grows every quarter for three years. |
| 6 | **"What a Receptionist Really Costs in South Africa (2026)"** | UIF, SDL, 13th cheque and SA leave law are specific statutory costs. Every competitor compares AI to gross salary; none does the SA total-cost-of-employment math. |
| 7 | **"Load Shedding and Your Business Phone: Stop Losing Calls When the Power Goes"** | BizAI treats power outages as a *column in their comparison table* — that is how central it is to SA buying decisions. R50bn/year national drain, R2,000–R15,000/hour SME downtime. Cognexa has zero content on it. |
| 8 | **"Custom CRM in South Africa: What It Costs and When It Beats HubSpot"** | The FX argument: HubSpot bills in USD, so your cost rises whenever the Rand weakens. Plus break-even math in ZAR at SA developer rates (R500–R2,500/hour). Neither exists anywhere. |
| 9 | **"Automate Your Invoicing with Sage, Pastel and Xero: A South African Guide"** | Pastel's SA install base is unique to this market. An international integration guide will lead with QuickBooks, which is a minority product here. |
| 10 | **"PayFast, Yoco and Ozow Payment Automation"** | Pure local moat. PayFast supports SnapScan and Instant EFT; Yoco has 200,000+ SA businesses and is shipping its own AI Business Agent, meaning its merchants are being actively primed on this vocabulary right now. |
| 11 | **"n8n vs Zapier vs Make for South African Businesses (Rand Pricing, POPIA, Data Residency)"** | Do not fight the generic comparison. The SA cut — ZAR cost of USD-billed tiers, POPIA data residency, self-hosting to keep data in-country — is unwritten and proves technical credibility to buyers evaluating you. |
| 12 | **"AI Chatbot in Afrikaans: What Works, What Doesn't"** | ElevenLabs supports named regional Afrikaans accents (Cape Afrikaans, Orange River, Eastern Cape) and Zulu STT. Cite it, demo it. The Centurion/Pretoria SME owner base skews Afrikaans far above the 10.6% national figure and competition is functionally zero. |
| 13 | **"Cutting No-Shows with WhatsApp Reminders (SA Numbers)"** | R750/appointment × 10 slots/day = ~R34,500/month lost per practitioner; WhatsApp reminders cut no-shows up to 35% at 98% open rates. Feeds the medical, dental and salon verticals. |
| 14 | **"Connecting WhatsApp to Your CRM (SA Setup Guide)"** and **"CRM + 3CX + AI Receptionist"** | 3CX is very widely deployed in SA telephony. This specific three-way combination is a genuinely ownable niche joining two clusters. |
| 15 | **"Funding Automation Through B-BBEE ESD Budgets"** | Corporates must spend 2% of NPAT on Enterprise & Supplier Development, which can fund automation for their SME suppliers. Genuinely uncontested. **One page only — do not build a cluster here.** |

---

## 7. Content that earns links and citations

Five concrete builds. All vanilla HTML/CSS/JS, no framework, no build step, per `CLAUDE.md`. All must be readable and useful with JavaScript disabled — that is a hard constraint, not a nice-to-have.

### 7.1 AI Receptionist vs Human Receptionist Cost Calculator (ZAR)
**File:** `ai-receptionist-cost-calculator.html` + `js/calc-receptionist.js`
**Replaces:** `how-long-ai-automation-setup-roi.html` (301)

**Inputs** (five `<input type="number">` and one `<select>`, all inside a `<form>` with sensible `value` defaults):
| Field | Default | Notes |
|---|---|---|
| Calls received per month | 400 | |
| % of calls currently missed | 30 | Pre-filled with the SA benchmark |
| Average value of a converted call (R) | 3,500 | |
| Call-to-customer conversion rate (%) | 15 | |
| Current receptionist gross salary (R/month) | 9,000 | Or 0 if none |
| Employment cost multiplier | 1.35 | `<select>`: 1.0 (salary only) / 1.35 (with UIF, SDL, 13th cheque, leave cover) |

**Outputs** (four figures + one comparison table, all rendered into `<output>` elements):
1. Revenue lost to missed calls per month, in Rand
2. True cost of the current human receptionist per month (salary × multiplier)
3. Estimated AI receptionist cost per month (banded from the pricing page)
4. Net monthly position and payback period in months

**Implementation notes:**
- ~90 lines of plain JS. One `calculate()` function bound to `input` events on the form, plus a `submit` handler that `preventDefault()`s.
- `Intl.NumberFormat('en-ZA', {style:'currency', currency:'ZAR', maximumFractionDigits:0})` for all money formatting.
- **No-JS fallback:** the `<form>` posts nowhere; instead, below it, a static `<table>` shows three fully worked examples (small / medium / high call volume) with all the arithmetic shown. That table is the page's primary content for a crawler and for a JS-disabled reader, and it is also the extractable passage an AI engine will quote.
- Add a "show the maths" `<details>` block spelling out every formula. Transparency is what makes it citable rather than a black box.
- Schema: `WebApplication` + `FAQPage`.
- No inline `onclick` handlers, no inline styles — behaviour in `js/`, styles in `css/styles.css`, per `CLAUDE.md`.

**Why it earns links:** multiple ROI calculators rank globally; there are **zero in Rand**. It is the single most pitchable asset to WhichVoIP, the Randburg Chamber, SME South Africa and BusinessTech, and it is exactly the self-contained, number-dense content AI answer engines extract.

---

### 7.2 Missed-Call Revenue Calculator
**File:** `missed-call-revenue-calculator.html` + `js/calc-missed-calls.js`

A deliberately simpler, more shareable sibling. Three inputs: calls per month, % missed, average job value. One headline output: **"You are losing approximately R___ per month."** Plus a secondary breakdown by cause (on-site/busy, after-hours, load shedding) using SA benchmark splits.

**Implementation:** ~50 lines. Single large output figure with a `aria-live="polite"` region so it is announced on change. Static worked examples for the no-JS path. A one-click "copy this result" button that writes a plain-text summary to the clipboard — makes it trivially shareable in a WhatsApp thread, which is the actual SA distribution mechanism.

**Why:** the headline number is the shareable object. It is the number a business owner screenshots and sends to their partner, and the number a journalist quotes.

---

### 7.3 SA Voice AI Accent Benchmark (original dataset)
**File:** `ai-voice-agent-south-african-accents.html` + `assets/audio/*.mp3` + `assets/data/sa-accent-benchmark.csv`

**What to build:**
- A fixed test script of 20 utterances covering South African English, Afrikaans, isiZulu, and three code-switched sentences (the ones that actually break these systems).
- Run it through six platforms. Record word error rate per platform per language.
- A results `<table>`: platform / SA English WER / Afrikaans WER / isiZulu WER / code-switched WER / latency / cost per minute in ZAR.
- **Embedded `<audio controls>` elements** with the actual recordings — this is the part nobody can fabricate or copy.
- A downloadable CSV of the full dataset.
- A stated methodology block: sample size, hardware, network conditions, date, limitations.

**Implementation:** no JS required at all beyond the native `<audio>` element. This is pure HTML and it is the most defensible page on the site.

**Why:** original data is the only thing SA tech media publish from unknown companies. BusinessTech receives 50–100 press releases a day and explicitly refuses PR agencies — but it publishes data. This is the piece that converts into the 3–5 editorial mentions the domain needs.

---

### 7.4 POPIA Chatbot Compliance Checklist
**File:** `popia-chatbot-checklist.html` (printable) + email-capture on the POPIA hub

**What to build:**
- A 22-point checklist as an ordered list of `<label><input type="checkbox">` items, grouped into: lawful basis, consent capture, notice wording, data minimisation, retention, cross-border transfer, **Section 71 human-in-the-loop**, breach response, operator agreements.
- Three template consent/opt-in wordings a business can paste directly into a WhatsApp flow or website widget.
- A `@media print` stylesheet so it prints as a clean one-page checklist.
- ~20 lines of JS: persist checkbox state to `localStorage` and show a progress count. **Fully functional without JS** — it is a printable checklist first, an interactive one second.
- Email capture is optional and secondary; the page must be fully usable without submitting anything. Gating it kills the citations.

**Why:** nobody in South Africa offers a POPIA/AI checklist. It is the asset attorneys, chambers and compliance bloggers link to, and it converts the POPIA hub from a trust page into a lead asset.

---

### 7.5 WhatsApp Business API ZAR Cost Estimator
**File:** `whatsapp-api-cost-calculator.html` + `js/calc-whatsapp.js`

**Inputs:** marketing messages/month, utility messages/month, authentication messages/month, service conversations/month, plus a BSP monthly fee field.
**Outputs:** estimated Meta pass-through cost in ZAR, BSP fee, total monthly, cost per conversation.

**Implementation:** ~70 lines. Hard-code the current per-message rates in a single `RATES` object at the top of the file with a visible "rates last verified: [date]" line in the UI and a comment in the source — so the maintenance obligation is explicit. Static example table for the no-JS path.

**Why:** Meta's pricing model changed from per-conversation to per-message on 1 July 2025 and most published SA guides still describe the old model. Being the only accurate ZAR estimator is both a ranking win on `whatsapp business api pricing south africa` and a citation magnet, because it is the exact question SA buyers ask and nobody answers cleanly.

---

## 8. Writing standards for AEO — the pre-publish checklist

Every piece must pass all of these before it ships. None of them violate Google's "don't write specifically for AI" guidance, because all of them are just good technical writing.

### 8.1 Page level
- [ ] **One `<h1>`**, containing the exact phrase a buyer types — not a slogan.
- [ ] **Year in the title** on every commercial and comparison page. 78% of ChatGPT-cited commercial pages carry one.
- [ ] **The first 40–60 words after the H1 answer the page's primary question**, and include the number, the currency (R), the year, and the entity name. No throat-clearing. No "in today's fast-moving world."
- [ ] **A one-sentence bolded definition inside the first 100 words**, syntactically explicit: `<p><strong>An AI receptionist is</strong> an AI voice agent that answers your business phone line, qualifies the caller, books the appointment and escalates to a human when needed.</p>`
- [ ] **Visible `Last updated: 9 August 2026`** matching `dateModified` in schema. Never bump the date without a substantive change.
- [ ] Author byline with the founder's name and a 2-line bio at the foot, linking to `/about.html`.
- [ ] URL slug **17–40 characters**, lowercase, hyphenated.
- [ ] Meta description under 155 characters, leading with the outcome.
- [ ] `og:locale` = `en_ZA`, `og:image` at 1200×675 with declared dimensions and `og:image:alt`.

### 8.2 Section level
- [ ] **Every `<h2>` is phrased as a literal buyer question**, in their words. *"What does an AI receptionist cost in South Africa?"* — not *"Pricing that fits."* 48% of high-reuse AI passages open with an explicit question, versus 22% of one-off citations.
- [ ] **Directly under each H2: one self-contained answer paragraph of 40–75 words.** It must make complete sense if it is the only thing quoted. **No pronouns referring back to earlier sections.** Name the entity inside the paragraph — "Cognexa", "South Africa", "WhatsApp Business API" — do not rely on the reader remembering.
- [ ] **Bold that answer sentence.** Total emphasis across the page: 5–10%.
- [ ] Then **150–300 words of supporting detail** for the section. Sections roughly balanced in length.
- [ ] 3–5 heading levels, never skipped.

### 8.3 Structured elements — target 25–35% of the page
- [ ] **At least one real `<table>` on every commercial page.** Semantic `<table>/<thead>/<tbody>/<th scope>` markup — **not** a CSS grid of `<div>`s, which is not extractable as tabular data. 4–8 rows, one header row, first column = the thing being compared. Wrap in a container with `overflow-x: auto` to hold the 360px floor.
- [ ] Lists of **5–9 items**, each a complete subject-verb-object clause. No "it", "this" or "they" pointing outside the item.
- [ ] **Every number carries unit + currency + time qualifier.** "R4,500 per month (August 2026)" — never "affordable monthly pricing."
- [ ] **3–6 outbound citations to primary sources** with real links: Stats SA, the Information Regulator, SARS, Meta's WhatsApp pricing docs, competitor pricing pages. "Cite sources" and "statistics addition" are among the highest-yield modifications in the controlled GEO research.
- [ ] **At least one attributed quotation** per long-form page — a named client, a named regulator, a named vendor doc.
- [ ] An **FAQ block of 6–8 questions** on every commercial and comparison page, reverse-engineered from People Also Ask, using the exact phrasing searchers use.

### 8.4 Schema — what to add and what never to add
- [ ] `Service` node on every service page, with stable `@id`, `serviceType`, `provider: {"@id": "https://cognexa.co.za/#organization"}`, `areaServed`, and `offers.priceSpecification` with `"priceCurrency": "ZAR"`.
- [ ] `BlogPosting` on every post, with `author: {"@id": ".../about.html#founder"}` — **a `Person`, never the Organization**.
- [ ] `BreadcrumbList` on every non-homepage page, including `blog.html` (which currently has none while all seven of its children do).
- [ ] `image` as an `ImageObject` with `width` and `height`, not a bare string.
- [ ] `inLanguage: "en-ZA"`, `articleSection`, `isPartOf` referencing the `#website` node.
- [ ] `FAQPage` — **keep it for semantic clarity, expect no rich result.** FAQ rich results stopped appearing 7 May 2026 and are now restricted to government and health sites. Google: unused structured data "does not cause problems for Search, but also has no visible effects." LLM answer engines do parse it.
- [ ] `WebApplication` on the calculators.
- [ ] ❌ **NEVER add `aggregateRating` or `review` to the `ProfessionalService`/`Organization` node.** Google's exact wording: *"If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for star review feature."* It produces zero stars and risks revoking rich-result eligibility site-wide. Third-party review widgets on your own domain count as self-serving too. **Plain HTML testimonials with names, companies and numbers are completely fine and are what you should publish instead.** Stars come from Google reviews on the Business Profile, not from your markup.
- [ ] ❌ Do not add `HowTo` expecting a rich result — the documentation was removed and the result no longer shows.

### 8.5 Linking
- [ ] **15–20% internal linking density.** Every service page links to its supporting posts; every post links up to the service page it supports.
- [ ] Descriptive anchor text, never "click here", never "learn more" as the sole anchor. The existing site already does this well — do not regress it.
- [ ] Every internal link points at `/`-rooted canonical URLs, never `index.html`.
- [ ] Every new URL added to `sitemap.xml` with an **honest** `lastmod`, then resubmitted in GSC and Bing.
- [ ] Every new service URL added to `llms.txt`, replacing the `#station-*` anchors (anchors are not citable targets).

### 8.6 The three things that most often fail this checklist
1. **A comparison table rendered as `<div>`s.** It looks identical and is invisible to extraction. Check the markup, not the render.
2. **An answer paragraph that starts with "It" or "This".** Self-contained means self-contained — the passage will be quoted with nothing around it.
3. **A price without a date.** "R2,900/month" is unquotable in eighteen months. "R2,900 per month (August 2026)" is quotable forever.

---

## 9. Distribution

### 9.1 The default motion for every piece

| Step | Action | Timing |
|---|---|---|
| 1 | Publish; update `sitemap.xml` `lastmod`; resubmit in GSC and Bing; ping IndexNow | Day 0 |
| 2 | LinkedIn: one 600–1,200 word article (articles are 50–66% of LinkedIn AI citations) + one 50–299 word feed post | Day 0–1 |
| 3 | Google Business Profile Update post linking to it | Day 1 |
| 4 | WhatsApp broadcast to the client and prospect list (this is South Africa — WhatsApp outperforms email by a wide margin, and using it demonstrates the product) | Day 2 |
| 5 | One genuinely useful, disclosed answer on Reddit or MyBroadband forums where the topic is already being discussed | Within 2 weeks |
| 6 | Add to the relevant GBP Q&A as a seeded owner question with the answer linked | Within 2 weeks |

### 9.2 Piece-type specific routes

| Piece type | Primary SA distribution |
|---|---|
| **Money / service pages** | Not "distributed" as such. Link from homepage, nav, `/pricing.html` and every relevant post. Add each as a named **GBP Service** item — services jumped from the 81st to the 22nd most impactful local ranking factor in 2026, with shifts observed in 24–72 hours. Add to Clutch, DesignRush and GoodFirms service lists. |
| **Pricing page** | GBP **Products** with ZAR prices (competitors publish; you don't). Link from every service page and from `ai-receptionist-cost-south-africa.html`. Pitch to LocalPros.co.za, whose WhatsApp provider lists currently contain only international BSPs — a genuine editorial gap for a local agency. |
| **Comparison listicles** | LinkedIn article. Pitch inclusion to **WhichVoIP** (`whichvoip.co.za/advertise/`) — SA's independent telecoms comparison publisher since 2009, which holds two slots for `ai voice agent south africa` and publishes "Best AI Voice Agents and AI Receptionists in South Africa". Also pitch to Swiftsell-style roundups and Capterra ZA. |
| **Original data (accent benchmark)** | The full press motion. Publish on-site first, post on LinkedIn and tag the journalists (SA tech reporters actively source from LinkedIn), then pitch direct: **kevin@businesstech.co.za** (BusinessTech — direct company relationships only, they explicitly refuse PR agencies), **TechCentral** (ask specifically about the **TechCentral Show podcast** — an interview beats a banner and produces a permanent link), **MyBroadband**, **ITWeb**, **Stuff SA**, **htxt.africa**, **Ventureburn**, **iAfrica** (already publishing on SA voice-AI accent failures). Free baseline: `mypr.co.za/submit/free/`. |
| **Calculators** | Pitch as a free resource, not a product, to **WhichVoIP**, **RCCI (Randburg Chamber)** — which ranks #1 for `ai voice agent south africa` with a thought-leadership piece and is therefore a guest-article target, not a competitor — **SME South Africa** (ranks #1 for `business process automation south africa`, 100k+ monthly visitors, exact ICP), and the Tshwane/Centurion chambers. Also submit to global calculator roundups where the "in Rand" angle is the differentiator. |
| **POPIA content** | Pitch to SA legal and compliance newsletters, IITPSA, and attorney blogs. This is the piece that earns links from outside the marketing bubble. |
| **Problem-aware TOFU** | **MyBroadband forums** — genuinely where SA tech buyers and IT decision-makers are, and almost no agency participates properly. It is the most underpriced awareness channel in SA tech. Plus Reddit (r/southafrica, r/ZAtech, r/smallbusiness, r/Entrepreneur) with disclosed, specific, numbers-backed answers. Reddit is the #2 most-cited domain in AI Overviews at 18.5% mention share and ~24% of Perplexity's citations — but note Gemini cites it at only 0.1%, so it is a ChatGPT/Perplexity lever specifically. **Never astroturf**; a banned account destroys the citation and Google's guidance explicitly warns against inauthentic mentions. Budget one genuinely good answer per week. |
| **Vertical pages** | Industry associations, practice-management Facebook groups, dental and medical supplier newsletters, trade WhatsApp groups. BNI chapters in Centurion/Pretoria — Gauteng BNI is unusually active and members routinely link each other's sites. |
| **Case studies** | The client's own LinkedIn (ask them to share), GBP post, and as the lead exhibit in every sales conversation. Pitch the best one to SME South Africa as a "how an SA SME is using AI" story. |
| **Geo page** | GBP, Capital City Business Chamber (Centurion), Tshwane Economic Development Agency, The Innovation Hub, local chamber directories. |

### 9.3 The YouTube channel — the highest-leverage untapped surface

This is not optional and it is not a "later" item. YouTube is the **strongest single correlate with AI visibility in the entire 75,000-brand dataset (0.737)** and the **#1 most-cited domain in AI Overviews at 21.1% mention share**. 18.2% of AI Overview citations from pages *not ranking in the top 100* came from YouTube. Critically, an analysis of 100M+ citations found **views, likes and subscribers show no meaningful correlation with citation frequency** — what correlates is long-form reference-style video with clear structure and accurate transcripts (94% of citations).

**Ship ten 8–15 minute screen-recorded walkthroughs over the 90 days** — one per week from week 4. Cognexa already builds the exact thing being demoed, so production cost is close to zero:

1. AI receptionist answering a real call in Afrikaans
2. Quote to invoice, fully automated, with n8n and Xero
3. WhatsApp Business API setup for a South African business, end to end
4. Booking an appointment by voice into Google Calendar
5. Sorting a messy inbox with an AI triage agent
6. Building a custom CRM in a week — the walkthrough
7. What an AI receptionist costs in Rand — the calculator explained
8. POPIA: where your chatbot legally has to stop
9. Connecting WhatsApp to Sage
10. The SA accent test, on camera

**Per video:** descriptive title including "South Africa" where relevant, a 200+ word description containing the entity phrases and a link to the matching service page, chapters and timestamps, and a **corrected transcript** (auto-captions mangle Afrikaans and isiZulu — fix them by hand). Embed each video on its matching service page with `VideoObject` schema. Add the channel URL to the Organization `sameAs`.

### 9.4 Off-site infrastructure to build alongside (once, then maintain)

| Priority | Asset | Why |
|---|---|---|
| P0 | Google Business Profile (verified, SAB, Centurion) | Anchor NAP, Maps CID for `sameAs`, review surface |
| P0 | LinkedIn company page + founder posting cadence (5+ posts / 4 weeks) | Second most-cited domain in AI search; creators under 500 followers are equally likely to be cited; median cited post has 15–25 reactions |
| P0 | YouTube channel | §9.3 |
| P1 | Clutch (free Basic), DesignRush, GoodFirms, **TechBehemoths** (already has a Centurion page listing ~52 IT companies with Cognexa absent) | These are the source pages behind "best AI agency in South Africa" listicles that LLMs cite |
| P1 | ~15 NAP-identical SA citations: Brabys, Yellow Pages SA, Yellosa, SAYellow, Hotfrog, Cylex, Kompass ZA, Bizcommunity free listing, Crunchbase, Apple Business Connect, Bing Places | Entity corroboration, not link equity — most are nofollow. Build 15–18 perfectly, then stop. Do not buy bulk packages. |
| P1 | Bizcommunity free company listing + free news submission; one R1,500 single press release as a paid test | Best free-to-cheap ratio of any SA PR route |
| P2 | n8n Expert Partner application (`experts.n8n.io`) — **no SA agency currently appears in the directory** | First-mover advantage on "n8n agency South Africa" plus a relevant followed link |
| P2 | Snupit Pro free profile + a 10-credit test at R24–R30/lead | A real SA lead channel, not a citation. Verify an IT/software category exists first — their density is home services. |
| P2 | One chamber membership + one speaking slot per quarter | Each engagement produces a speaker bio page with a link plus a room of the right buyers |

---

## 10. Maintenance and measurement

### 10.1 The refresh loop — this is where the compounding happens

Quarterly, on a fixed date (November 2026, February 2027, May 2027), every published piece gets reviewed:

- Refresh every price to current ZAR **with the month and year stated**
- Add any new vendor, regulatory or platform change
- Extend or add the comparison table
- Add one new question H2 answering something buyers have started asking
- Re-check every outbound citation still resolves
- **Only then** bump `dateModified` and the visible `Last updated` line

**Prioritise by citation data, not by age.** Refresh first whatever appears in the Bing Webmaster Tools AI Performance per-URL report and whatever is drawing `ChatGPT-User` / `Claude-User` / `Perplexity-User` hits in the server logs.

Rationale: of 7,683 AI-cited pages carrying 47,097 citations, 75% were updated within the past year but only 42% were *published* within the past year. Over a quarter of "fresh" cited content was published 2+ years ago and maintained. A date bump without substance is discounted.

### 10.2 What to measure, monthly

| Layer | Source | Metric |
|---|---|---|
| Indexation | GSC Page Indexing | Indexed URL count (target: 4 → 25+ by day 90) |
| Query coverage | GSC Performance | Number of distinct queries with ≥1 impression (target: 11 → 150+) |
| Impressions | GSC Performance | Total monthly impressions — **this is the number to fix, not the 0% CTR.** At position 14.5, 87 impressions × ~0.4% = 0.35 expected clicks. Zero clicks contains no information. |
| AI visibility (Google) | GSC Generative AI performance report | Impressions in AI Overviews / AI Mode |
| AI visibility (Bing) | Bing WMT AI Performance | Total citations, per-URL citations, grounding queries |
| AI visibility (live) | Hostinger access logs | Weekly hit counts for `ChatGPT-User`, `Claude-User`, `Perplexity-User` — each hit is an AI reading that page to answer a real person, right now |
| AI mentions | Frozen 30-prompt panel, run monthly, logged out, SA geo, across ChatGPT / Perplexity / Claude / Gemini / AI Mode / Copilot | Two separate columns: **mentioned** (brand named) and **cited** (link to cognexa.co.za). Only ~28% of AI brand mentions carry a link, so these are different metrics with different drivers. |
| Local | GBP Insights | Searches, calls, direction requests, review count and rating |
| Leads | Intake form `#iq-source` field | Self-reported channel including "AI assistant" (already built into `index.html`) — the only ground truth for zero-click discovery |
| Leading indicator | GSC | Branded search volume for "cognexa" (currently 15 impressions). If people start seeing you in AI answers and then Google you, this moves first. |

### 10.3 Realistic trajectory

| Metric | Now (Aug 2026) | Nov 2026 (day 90) | Feb 2027 | Aug 2027 |
|---|---|---|---|---|
| Indexed pages | 4 | 28–35 | 35–45 | 45–60 |
| Distinct ranking queries | 11 | 120–250 | 400–800 | 1,500–3,000 |
| Impressions / month | ~29 | 400–900 | 1,500–4,000 | 8,000–20,000 |
| Clicks / month | 0 | 10–35 | 40–120 | 250–700 |
| Avg position | 14.5 | 12–14 | 9–12 | 6–9 |
| Map pack | none | top 5 for 1–3 Centurion terms | top 3 for 2–5 | top 3 for 10+ Gauteng terms |
| Brand query CTR | 0% | 15–25% | 35%+ | 50%+ |

Note the shape: **impressions must grow roughly 50× before clicks matter.** That growth comes from *page count × query coverage*, not from moving position 14.5 to 13. At a R30,000–R200,000 deal size, nine qualified clicks a month is a viable business — the error would be chasing volume; the correct move is chasing intent density, and SA long-tail commercial terms have the highest intent density available anywhere.

---

## 11. Summary — the plan in twelve lines

1. Fix indexing, GBP, internal links, the title, the H1 and the hidden contact section. One day. Nothing works before this.
2. Build seven service pages, because Google retrieves URLs and Cognexa has anchors.
3. Publish real prices in Rand, because every competitor does and every buyer asks.
4. Rebuild the four existing posts that are worth rebuilding; retarget one; convert one into a calculator; leave one alone.
5. Ship two calculators, because there are zero in South Africa and they are the only thing that earns citations spontaneously.
6. Write the comparison and "how to choose" formats, because they produce 2.4× the brand mentions and they are how the competitor holding slots 2 and 3 got there.
7. Open the upstream funnel with problem-aware content, because nobody types "AI receptionist" until after they have decided AI is the answer.
8. Publish the SA accent benchmark, because it is the one thing no international competitor can write and the one thing SA press will run.
9. Put a named human on the site with a face, a bio and a byline on every post.
10. Ship ten YouTube walkthroughs of work already being done, because it is the strongest correlate with AI visibility and it costs almost nothing.
11. Build exactly one geo page, then wait six weeks before building a second. Never templated. Never forty.
12. At day 91, drop to 4–6 pieces a month and put half the effort into keeping what exists current — because publish-and-forget loses and publish-and-maintain wins.