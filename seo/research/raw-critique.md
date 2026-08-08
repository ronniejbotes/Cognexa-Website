# Critique: Cognexa SEO Strategy Docs A, B, C

**Verdict up front.** Doc C is the most trustworthy of the three — I re-verified ~30 of its file-level claims against the repo and every one I could check was accurate to the byte. Doc A's positioning logic is the best strategic thinking in the set. Doc B is the weakest: it is the most over-scoped, contains the most internally inconsistent arithmetic, and its word-count evidence is measurably wrong. All three share four systemic problems: (1) estimated keyword volumes presented with the visual authority of data, (2) three mutually incompatible filename schemes and three mutually incompatible forecasts, (3) a 90-day plan requiring ~340–400 hours from an unnamed person, and (4) instructions to publish specific vendor and statistical claims that do not survive checking.

---

## Corrections

### A. What I verified as correct (so you know what to trust)

Every file-level claim in Doc C's "Verified fact block" that I could re-check is **accurate**. Verified against `C:\Users\ronja\OneDrive\Documents\Github\Cognexa-Website` on this run:

| Claim | Status | Evidence |
|---|---|---|
| 100 links → `index.html`, exactly 1 → `/` | ✅ | `grep -o 'href="index\.html' *.html \| wc -l` → 100; `href="/"` only at `index.html:188` |
| `body.js-enabled .contact { display: none; }` | ✅ | `css/styles.css:1438` |
| Zero `<table>` in all 9 files | ✅ | all files return 0 |
| Zero `preload` / `preconnect` / `dns-prefetch` | ✅ | 0 matches repo-wide |
| Homepage `<title>` omits "Cognexa" | ✅ | `index.html:6` |
| `<h1>` = "Your business, on autopilot." | ✅ | `index.html:217` |
| `sameAs` absent | ✅ | 0 occurrences in `index.html` |
| `"@type":"AdministrativeArea","name":"Worldwide"` | ✅ | `index.html:86` |
| `logo` → 470-byte favicon SVG | ✅ | `assets/icons/favicon.svg` = 470 bytes |
| `dateModified === datePublished`, all 7 posts | ✅ | lines 65–66 of each |
| `author` = Organization, all 7 posts | ✅ | line 67 of each; byline "By the Cognexa team" at line 133 |
| `blog.html` has `CollectionPage`, no `BreadcrumbList` | ✅ | `blog.html:56` only |
| Keyword counts | ✅ | `quoting`=0, `booking`=0, `bookings`=0, `custom CRM`=0, `email sort`=0, `invoic`=4, `CRM`=4, `receptionist`=15, `Centurion`=2 |
| 6 non-deferred scripts; three.js = 608,087 B | ✅ | `index.html:730–735` |
| `assets/videos/` = 21.6 MB | ✅ | 4,008,700 + 5,128,228 + 5,542,644 + 6,944,080 |
| `footer-locality` on 1 of 9 pages | ✅ | `index.html:546` only |
| Broken sentence "there's you are never locked in" | ✅ | `index.html:458` |
| `.htaccess` has no `ErrorDocument`; gzip omits `text/plain` + `application/xml` | ✅ | file read in full |
| `robots.txt` omits GPTBot, ClaudeBot, CCBot, Perplexity-User, Applebot, meta-externalagent, Amazonbot, MistralAI-User | ✅ | file read in full |
| Sitemap: 5 entries `2026-07-22`, 4 entries `2026-07-26` | ✅ | exact |
| `llms.txt` points all 4 services at `#station-*` | ✅ | file read in full |
| Station CTAs all `href="#contact"` | ✅ | `index.html:251, 269, 287, 305` |
| 44 links into `#contact` | ✅ | 13 × `href="#contact"` + 31 × `href="index.html#contact"` |
| Image and font sizes | ✅ | all seven listed image sizes exact; `inter-latin.woff2` 48,432 B, `space-grotesk-latin.woff2` 22,320 B |
| Posts have 4 `<details>` "Quick answers" but no `FAQPage` schema | ✅ | only `index.html` has `FAQPage` |
| Post hero `loading="eager"` with no `fetchpriority` | ✅ | `ai-receptionist-cost-south-africa.html:135` |

External claims verified as **exactly right**:

- **FAQ rich results.** Stopped appearing **7 May 2026**; deprecation notice 8 May 2026; documentation removed 15 June 2026; restricted to well-known government and health sites since Sept 2023. Doc B §8.4 and Doc C §7.4 are precisely correct.
- **HowTo structured data.** Removed; changelog entry 14 Sept 2023. Correct.
- **Self-serving review policy.** Google's wording is verbatim as quoted: *"If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for star review feature."* The docs also correctly note embedded third-party widgets count as self-serving. **This is the single best risk call in all three documents.**
- **Doorway abuse** and **scaled content abuse** wording quoted verbatim and correctly.
- **GBP service area.** *"The boundaries of your profile's overall service area shouldn't extend farther than about 2 hours of driving time from where your business is based"* — real, though Google adds *"For some businesses, larger service areas may be appropriate."*
- **StatCounter South Africa, July 2026:** Google **92.12%**, Bing **6.95%**. Exact.
- **WhatsApp pricing.** Per-message billing effective **1 July 2025** (replacing per-conversation); service conversations free since **1 November 2024**. Both exact.
- **GSC Generative AI performance reports** — announced June 2026. Real.
- **Bing WMT AI Performance report** — announced **10 February 2026**, public preview. Real.
- **March 2026 spam update** — started 24 March 2026, duration **19 hours 30 minutes**. Exact.
- **Botlhale AI** — MTN, DSTV, H&M and Mukuru all confirmed as named clients (plus Stokfella, Gradesmatch, Chenosis, Wine of the Month); supported by Microsoft for Startups, Google for Startups, AWS Activate, NVIDIA Inception. Their product is contact-centre speech analytics + multilingual speech APIs across 13 African languages. This **strengthens** Doc A's "don't fight them" call.

### B. What is wrong or unverifiable

**1. ElevenLabs regional Afrikaans accents and Zulu STT — do not publish this.**
Doc A §5.4 and Doc B §3.1(7) and §6(12) instruct citing *"ElevenLabs' named regional Afrikaans accents (Cape Afrikaans, Orange River, Eastern Cape) and Zulu STT."* ElevenLabs' own docs: **Eleven v3** lists "Afrikaans (afr)" among 70+ languages; **Multilingual v2 (29 languages)** and **Flash v2.5 (32 languages)** do **not** include Afrikaans. **isiZulu appears in no TTS model list.** Scribe v2 claims "90+ languages" with no published list. **No named regional Afrikaans accent variants appear anywhere in the documentation.** This claim is scheduled to appear on the page that is supposed to be the site's defensible moat — publishing an unsupported vendor claim there is a direct E-E-A-T own goal.

**2. n8n Expert Partners is not an open opportunity.**
Doc A Cluster I(4), Doc B, and Doc C item 43 all say *"No SA agency appears in the n8n Expert Partner directory — first-mover advantage."* n8n's own page states the directory is a **pilot** currently covering *"UK & Ireland, Northern Europe and North America."* The absence of an SA agency is a **geographic eligibility restriction, not a gap**. Downgrade to the affiliate programme (which is open) and delete the "first-mover" framing.

**3. Yoco's "AI Business Agent" is unverified.**
"202,107 businesses trust Yoco" confirms the 200,000+ figure. But Yoco's site lists card machines, POS, payment links, savings, capital, loyalty and inventory — **no AI Business Agent product**. Doc A Cluster I(3) and Doc B §6(10) build an argument ("its merchants are being primed to think about AI right now") on a product I cannot confirm exists.

**4. "Fastest documented spam update ever" is an unsupported superlative** — though the underlying 19h30m figure is exact. More importantly, **the docs cite one 2026 update and miss four**: a March 2026 core update (12d 4h), a May 2026 core update (11d 21h), a June 2026 spam update (2d 1h), and a **new spam policy for "back button hijacking" introduced April 2026**. A 12-month plan with that little update context is thin.

**5. Bing "grounding queries" is not confirmed.** The AI Performance report is real and does give per-URL citation counts across Copilot, Bing AI answers and partner integrations. The specific "grounding queries — the actual phrases AI systems used to retrieve your content" feature appears nowhere in the announcement. Doc B §1 gate #2 and Doc C P0-2 both sell this as the main reason to register. Register anyway (it's free and 6.95% of SA search), but don't budget against a feature that may not exist.

**6. Word counts are inflated in the brief and in Docs A and B.** Measured (scripts, comments and markup stripped, `<body>` only):

| File | Measured | Docs claim |
|---|---|---|
| `index.html` | **1,792** | brief: ~2,840; Doc C: 1,769 (closest) |
| `ai-receptionist-cost-south-africa.html` | **1,581** | brief: ~1,800 |
| `small-business-ai-workflow-automation-examples.html` | **1,607** | **Doc A §5.4 and Doc B §3.1(4): 1,863**; Doc C P1-4: 1,613 |
| `ai-voice-agent-vs-ivr-vs-receptionist.html` | **1,750** | — |
| `ai-chatbot-south-african-languages.html` | **1,486** | — |
| `how-long-ai-automation-setup-roi.html` | **1,486** | — |
| `blog.html` | **328** | Doc A: 321 |

Docs A and B both build the "12 examples in 1,863 words = ~150 words each, too thin" argument on a number that is 16% too high. The conclusion survives (actual is ~134 words/example — *worse*), but the evidence is wrong. **Use Doc C's figures.**

**7. Doc C's Three.js dynamic-load patch is written against code that does not exist — and as adapted will disable the 3D scene 100% of the time.**
`js/main.js` has **no `sceneAllowed` variable**. The real gate is inside `boot3D()`:

```js
var canRun =
  !prefersReducedMotion() &&
  !!window.THREE &&          // ← js/main.js:103
  !!canvas && !!scene && ...
```

This is evaluated **synchronously**. If you remove the `<script src="three...">` tag as Doc C's P1-5 instructs and paste its `if (sceneAllowed) { loadThree().then(...) }` block, `window.THREE` is undefined when `boot3D()` runs, `canRun` is false, `body.classList.add('no-3d')` fires, and the site silently ships in permanent fallback. That also changes layout — `css/styles.css:433+` clips the process conveyor off `body.no-3d`. **Correct fix:** drop `!!window.THREE` from `canRun`, make `boot3D()` await `loadThree()` before `scene.init()`, keep the `catch → no-3d` path. Verify with `document.body.classList.contains('no-3d')` in console before/after.

**8. Doc C's P0-5 GSAP regression warning is wrong, and its fix is wrong.**
Doc C claims `js/scroll.js` runs `gsap.from(contactItems, { autoAlpha: 0 })` and that unhiding `.contact` "will now leave the copy at `opacity: 0` until scrolled into view", prescribing `immediateRender: false`. The actual code at `js/scroll.js:602–614` is:

```js
ScrollTrigger.batch(contactItems, {
  start: 'top 85%', once: true,
  onEnter: function (batch) {
    gsap.from(batch, { y: 32, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' });
  }
});
```

The tween is created **inside `onEnter`**, so before the batch fires the elements carry no inline opacity and are fully visible. There is no stranded-at-zero state. The real artefact is a cosmetic snap-to-invisible-then-fade at the instant of entry. `immediateRender: false` on a `gsap.from` inside `onEnter` is the wrong lever. **Correct fix if the pop bothers you: swap `gsap.from` for `gsap.fromTo`. Otherwise leave it.** The rest of P0-5 (the CSS selector change to `.contact-form`) is correct and valuable — `index.html:507` is `<form id="contact-form" class="contact-form">` and `.contact-alt` at line 532 carries the WhatsApp and `tel:` links.

**9. The receptionist true-cost maths contradicts itself and would be publicly checkable.**
Doc B §7.1's calculator uses an employment-cost multiplier of **1.35**, making gross salary **74%** of true cost. Doc B §5 W8 P16's thesis states the advertised salary is *"roughly 65% of what a receptionist actually costs"* — that requires a multiplier of **~1.54**. Doc B W1 P2 says the gross-salary comparison *"understates the gap by roughly 35%"*, which matches 1.35 and contradicts the 65%. Pick one multiplier, derive everything from it, and state it. (The coverage maths is fine: 45/168 = 26.8% ≈ "27% of the week".)

**10. The no-show economics don't reproduce.** *"R750/appointment × 10 slots/day = ~R34,500/month lost per practitioner"* (Doc A §7.4, Doc B P13/P20/§6-13). R750 × 10 = R7,500/day of **capacity**, not loss. R34,500/month implies ~46 no-shows/month ≈ a **21% no-show rate** on a 22-day month — never stated. This figure is destined for a public page that Doc B §7.1 says must carry a "show the maths" block. It will not survive one.

**11. "63 hours/month saved ≈ R31,000/month" (Doc B P18) implies R492/hour of saved admin labour** — roughly 10× the same document's own fully-loaded R9,000/month receptionist (~R52/hour at the 1.35 multiplier). Either it blends revenue with labour or it's wrong. Do not publish.

**12. The SA WhatsApp marketing rate (US$0.086 ≈ R1.50) is not on Meta's pricing page.** The billing-model claims are verified exactly; the country rate lives in a separate rate-card CSV/PDF. Pull the actual ZA row before publishing, and date-stamp it — Doc B §6(4) sells "factual-accuracy win" as the whole moat of that piece.

**13. Load shedding is the single riskiest premise in the set, and it is unverified.**
It underpins at least six recommended assets: Doc A's geo and comparison copy, Doc B §5 P17 (the flagship TOFU piece), Doc B §6(7) (*"Load Shedding and Your Business Phone"* as a standalone article), the missed-call calculator's cause split, the receptionist comparison table's "works during load shedding" column, and the "R50bn/year national drain, R2,000–R15,000/hour SME downtime" figures. Eskom's status page returns 403 and MyBroadband's energy feed gives no current stage data — **I could not confirm load shedding is active in August 2026**, and it was suspended for extended stretches in 2024–2025. **Recommendation: reframe every instance as "power and connectivity outages" / "when your office goes offline."** That is durable whether or not Eskom is shedding, and it costs nothing. Do not build a whole article on a hook you cannot confirm is current.

**14. These load-bearing statistics could not be verified within this session's search budget and should not be restated as fact in client-facing content:** the Ahrefs `llms.txt` study (137,210 domains / 97% zero requests), Semrush's "comparative content produces 2.4× more brand mentions", Seer's 7,683 pages / 47,097 citations / 75%-vs-42%, the arXiv "+17.3% citation rate, Cohen's d=0.64", "YouTube 0.737 correlation / 21.1% AIO mention share", "Reddit 18.5% / 24% of Perplexity citations / 0.1% Gemini", "GBP services jumped 81st→22nd", the April 2026 review-policy changes (staff quotas, employee-named reviews), "30% of SA inbound sales calls unanswered / 85% never call back", and the named competitor prices (BizAI R999, SME Advantage R849 + R4,950, Lekker AI R2,499, WhichVoIP R3,500). Each of these justifies a workstream. **No single unverified statistic should drive more than a week of work, and none should appear in published copy without a live link you have personally opened.**

---

## Gaps

### Q1 — "What SEO is and how Google ranks businesses": **largely unanswered**

All three documents are written for someone who already knows what a canonical, an anchor, `siteRadius`, NavBoost and passage extraction are. There is no plain-English explainer anywhere in ~25,000 words. Missing entirely:

- **A one-page primer**: crawl → discover → index → retrieve → rank → render, and the crucial distinction that *"not indexed" ≠ "not ranking" ≠ "ranking badly"*. This is the exact confusion that makes the four benign GSC rows look like an emergency.
- **The three separate surfaces** Cognexa will be judged on, and which levers move which: (a) classic organic links, (b) the local/map pack, (c) AI Overviews / AI Mode / chat assistants. The docs conflate these constantly — Doc C's §7 measurement plan has six layers of AI visibility but never explains that map-pack ranking is a *different algorithm* with *different inputs*, which is the actual reason it moves first.
- **Why a 4-week-old domain cannot rank for head terms.** Doc A gestures at "hostAge" and "siteAuthority" once. A one-paragraph plain statement would prevent months of misplaced anxiety.
- **A weekly habit.** Everything is expressed as 52-row tables. There is no "here is what you personally do every Monday for 30 minutes."

### Q2 — "What keywords should we rank for": **answered well, with one honest caveat buried**

Doc A §2 is the strongest work in the set. But:

- **Every volume figure across all three documents is an estimate with no tool behind it.** Doc A admits this once in §0, then prints 60+ numeric ranges that read as data for 40 pages. **And no document mentions the free fix:** Google Keyword Planner is free with any Ads account (even unfunded) and returns real SA-geo ranges; Bing Webmaster Tools' Keyword Research is free and they're being told to register anyway. **One hour of work would replace ~60 guesses with actual numbers.** This omission is the most consequential gap in the entire keyword section.
- **No negative-keyword / junk-query pruning plan.** They *will* start ranking for noise (they already rank for `business`, `businesses near me`). Nothing says how to identify and prune it.
- **No branded-search strategy** beyond fixing the title. `cognexa` earns 15 impressions and 0 clicks against six colliding entities plus Cognex Corporation. Nothing decides whether to fight for the bare-brand SERP or to always optimise for "Cognexa AI Centurion".

### Q3 — "What content to post and what should it rank for": **over-answered in volume, under-answered in operability**

- **Who writes it.** Doc B commits to 26 pieces + 4 rebuilds + 2 calculators + 10 YouTube videos + a 6-platform original benchmark + weekly forum answers + 5 LinkedIn posts/month — with **no named owner and no hours estimate anywhere**. See Over-scoping.
- **One canonical filename list.** Three documents, three schemes, eight pages with conflicting slugs. There is no single file a builder can work from. This alone will cost days.
- **What to do with the four codename portfolio items in week 1.** All three docs correctly flag "Nexus Core / Nightgrid / Gridworks / Orbital + *full walkthroughs are private*" (`index.html:360–412`) as converting the only proof asset into a trust liability. All three schedule the fix for **week 13 / P2**. It is a **10-minute copy edit** on the homepage. Move it to week 1.
- **Conversion measurement.** The stated problem is 0 clicks and the stated thesis is *"nine qualified clicks a month is a viable business"*. Doc C's §7 builds six layers of AI-visibility measurement and **zero layers of conversion measurement**. There is no GA4 event on the WhatsApp click (`index.html:532`), no event on `tel:` clicks, no event on intake-modal completion, no call tracking. If nine clicks a month is the goal, not instrumenting those nine clicks is the biggest measurement gap in the plan.
- **Budget.** WhichVoIP paid inclusion, ITWeb Virtual Press Office (annual), TechCentral (paid), Bizcommunity (R1,500 / R9,000), Snupit credits (R24–R30/lead), Clutch Sponsored ($1,500–1,800/yr, correctly declined), six paid voice-AI accounts for the benchmark, 90-day domain/hosting. **All discussed, none totalled.** A rough number is needed to decide anything.
- **A do-nothing / minimum baseline.** No document says what happens if they only do Phase 0 plus five pages — which is the realistic scenario for a solo founder.
- **CLAUDE.md conformance for the calculators.** Doc B §7.1 respects the "no inline styles / no inline onclick / progressive enhancement" rules; Doc C P1-10 does not restate them. Whoever builds it needs the constraint in front of them.
- **360px QA ownership.** Doc C flags once that the new `<h1>` loses the hard-coded `<br>` and that `h1` is `clamp(2.5rem, 7vw, 4.5rem)` flooring at 40px, then lists the QA pass as item 50 of 52. Since `html { overflow-x: clip }` (`css/styles.css:262`) *silently hides* overflow breakage rather than showing a scrollbar, this needs to be a gate on the H1 change, not a backlog item.

---

## Contradictions Resolved

**1. Filenames — eight pages, two or three slugs each.**

| Page | Doc A | Doc B | Doc C | **Use** |
|---|---|---|---|---|
| Voice agents | `ai-voice-agent-south-africa` | `ai-voice-agents-south-africa` | `ai-voice-agents-south-africa` | **plural** (2:1) |
| Quoting/invoicing | `automated-quoting-invoicing` | `quoting-invoicing-automation` | `automated-quoting-invoicing` | **`automated-quoting-invoicing`** (2:1) |
| 3D | `immersive-3d-websites` | — | `3d-websites` | **`3d-websites`** (Doc C wires the homepage CTA to it) |
| Calculator | `missed-call-calculator` | `ai-receptionist-cost-calculator` + `missed-call-revenue-calculator` | `calculator` | **`calculator`** — one file |
| Centurion geo | `ai-automation-agency-centurion` | `ai-automation-centurion-gauteng` | `ai-automation-centurion` | **`ai-automation-centurion`** |
| Dental vertical | `ai-receptionist-for-dentists-doctors` | `ai-receptionist-dental-medical-sa` | `ai-receptionist-for-dentists-medical-south-africa` | **Doc C's** |
| Trades vertical | `ai-receptionist-for-trades` | `ai-receptionist-trades-south-africa` | `…-plumbers-electricians-…` | **`ai-receptionist-for-trades`** (shortest, within Doc B's own 17–40 char rule) |
| Best-of listicle | `best-ai-receptionists-south-africa` | `best-ai-receptionist-south-africa-2026` | — | **without the year** — the year in the `<title>` is the ranking signal; a year in the slug forces an annual 301 |

**Resolution: freeze Doc C §5.8's regenerated `sitemap.xml` as the single canonical filename list**, amended per the table above, before any page is built. It is the only place all names appear together and it is the file that must be right.

**2. Integration pages: flat vs directory.** Doc A says `/integrations-<tool>.html`; Doc C P2-4 says `/integrations/` hub + subpages. **CLAUDE.md mandates flat root-level `<name>.html`**, and Doc C's own §1.2 verified that extensionless/directory URLs 404 (MultiViews off). **Resolution: flat, per CLAUDE.md** — and defer entirely (see Over-scoping).

**3. One calculator or two?** Doc A: one. Doc C: one. Doc B §7.1 + §7.2: two, plus a third (§7.5 WhatsApp cost estimator). **Resolution: one.** Two calculators on a zero-backlink domain split the link target and double the maintenance burden (each has a hard-coded rate table that decays). Build `calculator.html` combining missed-call revenue *and* AI-vs-human cost. Split later only if it earns links.

**4. Email sorting: page, section, or nothing?** Doc A Tier 1 #11 and §7.2 say build `/email-inbox-automation.html`; Doc A's own §3 kill list says "downgrade"; Doc C P1-2 says fold into the workflow page; Doc B §5.1 excludes it. **Resolution: a section inside `/workflow-automation-south-africa.html`.** Doc A's own evidence defeats Doc A's own recommendation: *"near-zero search demand in any phrasing… service copy that closes deals, not a page that earns traffic."* A URL with no demand is a `siteRadius` cost with no upside.

**5. Renaming existing posts — and a sequencing trap nobody caught.**
Docs A and B both instruct 301ing `ai-voice-agent-vs-ivr-vs-receptionist.html` → `ai-receptionist-vs-human-receptionist.html` and `how-long-ai-automation-setup-roi.html` → the calculator. Doc C's regenerated sitemap keeps **both original URLs**, and Doc C's non-goals ban URL restructuring.

**Resolution: do the IVR rename, do NOT 301 the ROI post** — *and get the order right, because all three docs prescribe the order that destroys the opportunity.* Both files are among the **five URLs Google has never fetched**. A 301 on an undiscovered URL is genuinely free. But Doc B's own §1 puts sitemap submission at **gate #1** and the rename at **week 4**. If you submit the sitemap first and Google indexes those two URLs in the intervening three weeks, the rename stops being free. **Rename before you submit the sitemap, or keep both slugs forever.** No document notices this dependency.

**6. `/index.html`: benign or fix?** Doc C §1.2 says benign ("Google's own docs: *there is nothing you need to do*"), §7.4 lists it as an explicit **non-goal**, and then **P1-7 adds a 301 rewrite for it.** Straight self-contradiction. **Resolution: leave it.** See Risks #1.

**7. Cadence: 26 pieces vs 10 vs 5.** Doc B: 26 in 13 weeks. Doc B's own §2.4 escape hatch: "if capacity is realistically 1 piece/week, ship the Top 10." Doc A §5.3: five pages, ruthlessly ordered. **Resolution: adopt Doc A §5.3's five-page order as the plan** (receptionist → pricing → WhatsApp → custom CRM → about) and treat Doc B's calendar as a backlog. Doc A's ordering is the better-justified one — it leads with the only measured demand on the site.

**8. Trajectory forecasts — three different numbers for the same date.**

| Metric @ ~day 90 | Doc A | Doc B | Doc C |
|---|---|---|---|
| Indexed pages | 15–20 | 28–35 | 20–30 |
| Impressions/month | 250–700 | 400–900 | **900–2,000** |
| Clicks/month | 5–25 | 10–35 | 15–50 |
| Distinct queries | 25–60 | 120–250 | 100–180 |

Doc C's 900–2,000/month is a **31–69× lift** on the current ~29/month, and its day-30 target of 150–400 is a **5–14× lift from sitemap submission alone**. **Resolution: use Doc A's numbers.** They are the most conservative and the only set that explicitly warns average position may *worsen* as new pages enter deep. **Write the agreed numbers down once, in one place, before starting** — otherwise every checkpoint becomes an argument about which document to grade against.

**9. Geo pages: how many, when?** Doc A: hard cap 3 + hub, gated on a real client. Doc B: 2 in the first 90 days, max 5 ever. Doc C: exactly 3, Centurion first, wait 6 weeks. **Resolution: one page (Centurion), week 12+, and only after a real Centurion client consents to be described.** All three docs make "a named or described local client" a hard gate — and none of them notices that **Cognexa currently has zero publishable clients**. The geo page is therefore **blocked, not scheduled.**

**10. "Worldwide."** Doc A §1.4 says remove from copy *and* schema. But it appears in `llms.txt`, the meta description, og/twitter descriptions, and `index.html:458` body copy — and worldwide is a stated business requirement. **Resolution: remove from `areaServed` schema only**, where `{"@type":"AdministrativeArea","name":"Worldwide"}` is semantically invalid. Keep one honest sentence in body copy. Doc A overreaches against a business requirement to buy a signal the `.co.za` ccTLD already provides for free.

---

## Over-scoping

**Doc B's 90-day plan, costed at its own stated quality bar:**

| Workstream | Hours |
|---|---|
| 7 service pages @ 1,400–1,800 w, with real `<table>`, 8-Q FAQ, `Service`+`WebPage`+`BreadcrumbList` schema | ~56 |
| 4 post rebuilds (2,800w / 3,200w / 2,600w / retarget + 301) | ~24 |
| 2 calculators + methodology + no-JS static fallbacks | ~16 |
| **Accent benchmark**: 6 platforms × 20 utterances × 4 language conditions over real SA phone lines, WER-scored, audio edited, CSV published | **40–60** |
| 5 comparison / TOFU / regulatory posts @ 1,800–2,400w with primary-source citations | ~40 |
| 2 verticals + 1 geo + 1 case study + about + pricing | ~30 |
| **10 YouTube videos** @ 8–15 min with **hand-corrected Afrikaans/isiZulu transcripts** | **50–70** |
| 26 × 6-step distribution motion (LinkedIn article + feed post + GBP post + WhatsApp broadcast + forum answer + GBP Q&A) | ~52 |
| 18 citations + 5 partner directories + GBP setup/verification + review programme | ~20 |
| Weekly Reddit / MyBroadband participation | ~13 |
| **Total** | **~340–400 h** |

That is **26–31 hours per week, sustained for 13 weeks**, from a founder who also has to sell and deliver an automation agency. **Doc B never states this.** It should be the first line of the document.

**Cut list, in priority order:**

1. **The 6-platform accent benchmark.** All three docs correctly identify it as the most citable asset available — and it is also the most expensive, requires six paid vendor accounts, real SA phone-line access, a defensible WER methodology, and audio production. Done sloppily it becomes a *liability*, because named vendors will contest the numbers publicly. **Cut to 3 platforms, SA English + Afrikaans, 10 utterances, published methodology + audio.** ~12 hours for ~80% of the citation value.
2. **10 YouTube videos.** Justified by a **0.737 correlation I could not verify**. **Cut to 3**, one per money page, and only after the money pages exist.
3. **The 26-piece calendar → 10.** Doc B already concedes this in §2.4.
4. **Integration pages (Doc A Tier 5: 8; Doc C P2-4: 8–14).** Pure fantasy for a site with 4 indexed pages. **Defer entirely; revisit at 25 indexed pages.**
5. **Vertical pages (Doc A: 3; Doc C P2-1: 5, including law firms and estate agents with no autocomplete evidence presented).** **Cut to one** — dental/medical, the only vertical confirmed in two independent ladders — and only once a dental/medical client exists.
6. **Citations: 18 SA + 9 B2B + 5 partner programmes + 12 press targets = 44 touchpoints.** Doc C itself says "build 15–18 perfectly, then stop." For a solo operator the honest number is **12**: Doc C's Tier 0 (6) + Brabys, Bizcommunity, Yellow Pages SA, Kompass + TechBehemoths + claiming the existing DesignRush listing.
7. **"15 Google reviews by day 90" at "1–2 per month sustained" is arithmetically impossible** — 1–2/month for 3 months is 3–6. Doc C states both targets in the same section (§6.6). Worse, a business whose entire portfolio is four codenamed projects with private walkthroughs may not have 15 completed clients to ask. **Set the target at 5 by day 90**, and note that the Clutch listing (which needs 3 verified reviews) is the binding constraint, not 15.
8. **First quarterly refresh scheduled for November 2026** — the same month the last new pages ship. **Push to February 2027.**
9. **The CIPC trading-name decision (Doc C item 51) is filed as a P2 chore. It is a week-1 blocker.** Every citation must carry the final name byte-identically. Building 18 listings as "Cognexa" and then registering "Cognexa AI Automation" means redoing all 18. Decide it before citation #1.

---

## Risks

**1. HIGHEST — the `/index.html` 301 rewrite (Doc C P1-7 / §5.10).** On LiteSpeed, a `THE_REQUEST`-based rule interacting with `DirectoryIndex` is the classic source of an infinite redirect loop on `/`. `/` is **1 of only 4 indexed URLs** and carries all 15 brand impressions. The benefit is removing a single GSC row that **Google's own documentation describes as requiring no action** — and which Doc C's own §1.2 and §7.4 both classify as benign. **Recommendation: do not ship this.** If it ships, ship it alone, never bundled, with `curl -sI https://cognexa.co.za/` run within 60 seconds and a pre-staged revert. A 301 on `/` takes the site to zero.

**2. Doc C's `defer` + dynamic Three.js patch silently disables the 3D scene sitewide.** Detailed in Corrections #7. This won't hurt SEO but ships a visually different site — `body.no-3d` also changes the process-section layout. Gate: check `document.body.classList.contains('no-3d')` in the console before and after deploy.

**3. The free-rename window closes when the sitemap is submitted.** Detailed in Contradictions #5. The docs prescribe the exact ordering that destroys it.

**4. Geo pages are gated on a client that does not exist.** Google's doorway wording is quoted correctly and the guardrails in all three docs are the right ones. The residual risk is that the guardrails are currently **unmeetable**: every geo page requires a named or described local client, and the portfolio is four invented-sounding codenames marked private. The failure mode is building the Centurion page with a vague or invented client — which is exactly the pattern the March 2026 spam update targeted. **Hard gate: no signed client testimonial in hand → no geo page.**

**5. Publishing `geo` coordinates and `postalCode` while hiding the GBP address.** Doc C §5.4 correctly declines to publish a `streetAddress` — then publishes `"latitude": -25.8603, "longitude": 28.1894` and a `postalCode` placeholder. If those coordinates resolve to a residence, that is both a privacy exposure and a NAP inconsistency (schema asserts a precise point; GBP says "address hidden"). **Recommendation: publish `addressLocality` + `addressRegion` + `addressCountry` only. Drop `geo` and `postalCode` until there is a real commercial premises.**

**6. Review schema — no change needed.** All three docs correctly and repeatedly forbid `aggregateRating`/`review` on the Organization node, quote Google's wording verbatim (verified), correctly note that embedded third-party widgets count as self-serving, and correctly recommend plain-HTML testimonials instead. Keep Doc C's guard comment. **This is the docs' best risk call and should not be softened.**

**7. Publishing unverifiable vendor and competitor claims.** The plan instructs publishing: ElevenLabs regional Afrikaans accents (unverified), Yoco's AI Business Agent (unverified), a US$0.086 SA WhatsApp rate (not on Meta's public pricing page), and **a named competitor price table** (BizAI R999, SME Advantage R849 + R4,950, Lekker AI R2,499, WhichVoIP R3,500, human R8,025–R16,000). Naming competitors' prices publicly is an accuracy and reputational exposure if wrong. Doc C's warning — *"Replace every figure with numbers you can defend and cite"* — appears **once**, in §5.9. **Make it a hard pre-publish gate on every comparison asset:** every competitor price screenshotted with a date, every table carrying a visible *"prices as published at [vendor URL], checked [date]"* line.

**8. Scaled content abuse — the over-scoping risk and the penalty risk are the same risk.** 26 pieces in 13 weeks on a 4-indexed-page domain trips the policy language quoted verbatim (*"using generative AI tools… to generate many pages without adding value"*) **if the quality bar slips**. Doc B's defence is sound *conditional on holding the bar* — and the 340–400-hour estimate says the bar will not hold. Cutting to 10 pieces is a penalty-avoidance measure, not just a capacity one.

**9. Unchecked: the April 2026 "back button hijacking" spam policy.** Not mentioned in any document. `js/main.js` opens a full-screen intake overlay (`html.intake-open` / `body.intake-open` scroll lock at `css/styles.css:1444`). **Five-minute check: confirm the overlay does not push history states that break the browser back button.** If it does, that is now an explicit spam-policy violation.
