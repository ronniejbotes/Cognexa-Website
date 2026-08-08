# Corrections Log — What Was Verified, and What Must Never Be Published

*The research behind this folder ran across 11 agents and ~500 tool calls. A dedicated
fact-checking pass re-verified the load-bearing claims. This file records what survived,
what didn't, and where the remaining risk sits. **Read it before publishing any content
that quotes a number.***

---

## 🚫 Do not publish — claims that failed verification

| # | Claim | Status | Do instead |
|---|---|---|---|
| 1 | **ElevenLabs "named regional Afrikaans accents (Cape, Orange River, Eastern Cape)" and Zulu STT** | ❌ **Unsupported.** Eleven v3 lists "Afrikaans (afr)" among 70+ languages; Multilingual v2 and Flash v2.5 do **not** include Afrikaans. isiZulu appears in no TTS model list. **No named regional Afrikaans variants appear anywhere in the docs** | Demo your *own* output. This claim was scheduled for the page meant to be your moat — publishing an unsupported vendor claim there is a direct E-E-A-T own goal |
| 2 | **"No SA agency in the n8n Expert Partner directory — first-mover advantage"** | ❌ **Misread.** The directory is a **pilot** covering *"UK & Ireland, Northern Europe and North America."* SA absence is a **geographic eligibility restriction, not a gap** | Delete the "first-mover" framing. The affiliate programme is open |
| 3 | **Yoco's "AI Business Agent" product** | ❌ **Unverified.** Yoco's site lists card machines, POS, payment links, savings, capital, loyalty, inventory — no AI agent product. *(The "200,000+ businesses" figure is real)* | Drop the "its merchants are being primed" argument |
| 4 | **Load shedding as a current condition** | ⚠️ **Unconfirmed for Aug 2026.** Eskom's status page returns 403; no current stage data found. It was suspended for extended stretches in 2024–2025 | **Reframe every instance as "power and connectivity outages" / "when your office goes offline."** Durable either way, costs nothing. This underpinned ~6 planned assets |
| 5 | **SA WhatsApp marketing rate US$0.086 ≈ R1.50** | ⚠️ Not on Meta's public pricing page — the per-country rate lives in a separate rate-card | **Pull the actual ZA row and date-stamp it** before publishing. The whole moat of that piece is factual accuracy |
| 6 | **Named competitor prices** (BizAI R999, SME Advantage R849 + R4,950, Lekker AI R2,499, WhichVoIP R3,500) | ⚠️ Unverified in this pass | Screenshot each with a date. Every comparison table carries a visible *"prices as published at [vendor URL], checked [date]"* line. **Naming competitors' prices is an accuracy and reputational exposure if wrong** |
| 7 | **No-show economics: "R750/appointment × 10 slots/day = ~R34,500/month lost"** | ❌ **Doesn't reproduce.** R750 × 10 = R7,500/day of *capacity*, not loss. R34,500/month implies ~46 no-shows/month ≈ a **21% no-show rate**, never stated | Rebuild the arithmetic from a stated no-show rate, or drop it. This was destined for a public page with a "show the maths" block |
| 8 | **"63 hours/month saved ≈ R31,000/month"** | ❌ Implies **R492/hour** of saved admin labour — ~10× the same plan's own fully-loaded receptionist rate | Do not publish |
| 9 | **Receptionist true-cost multiplier** | ⚠️ **Self-contradictory.** One place uses 1.35 (gross = 74% of true cost); another states gross is "roughly 65%" (implies ~1.54) | **Pick one multiplier, state it explicitly, derive everything from it.** This page will invite public arithmetic checking |
| 10 | **Bing "grounding queries"** | ⚠️ The AI Performance report is real (public preview 10 Feb 2026) and gives per-URL citation counts. The specific "grounding queries" feature appears nowhere in the announcement | Register anyway (free, 6.95% of SA search) — just don't budget against that feature |
| 11 | **"Fastest documented spam update ever"** | ⚠️ Unsupported superlative, though the 19h30m figure is exact | Drop the superlative |
| 12 | **A cluster of cited statistics** — the Ahrefs `llms.txt` study, "comparative content produces 2.4× more brand mentions", Seer's citation study, the arXiv "+17.3% citation rate", "YouTube 0.737 correlation", Reddit citation shares, "GBP services jumped 81st→22nd", "30% of SA inbound sales calls unanswered / 85% never call back" | ⚠️ **Could not be verified within the research budget** | Directionally useful for *prioritising your own work*. **None should appear in published copy without a live link you have personally opened.** No single unverified statistic should drive more than a week of work |

---

## ✅ Verified as exactly correct

**File-level claims** — ~30 re-checked against the repo, every one accurate to the byte.
Full list in [04-technical-actions.md](04-technical-actions.md) §1.

**External claims:**

| Claim | Verification |
|---|---|
| **FAQ rich results** stopped appearing **7 May 2026**; deprecation notice 8 May; docs removed 15 June; restricted to well-known government and health sites since Sept 2023 | ✅ Exact |
| **HowTo** structured data removed; changelog 14 Sept 2023 | ✅ Exact |
| **Self-serving review policy** — Google's wording quoted verbatim; embedded third-party widgets also count as self-serving | ✅ Exact. **The single best risk call in the research** |
| Doorway abuse and scaled content abuse policy wording | ✅ Quoted verbatim and correctly |
| **GBP service area** — *"shouldn't extend farther than about 2 hours of driving time"* | ✅ Real *(Google adds: "For some businesses, larger service areas may be appropriate")* |
| **StatCounter South Africa, July 2026** — Google **92.12%**, Bing **6.95%** | ✅ Exact |
| **WhatsApp billing** — per-message from **1 July 2025**; service conversations free since **1 Nov 2024** | ✅ Both exact |
| **March 2026 spam update** — started 24 March, ran **19h 30m** | ✅ Exact |
| **Botlhale AI** — MTN, DSTV, H&M, Mukuru all confirmed clients; Microsoft/Google/AWS/NVIDIA startup programmes; contact-centre speech analytics + multilingual APIs across 13 African languages | ✅ Confirmed — **this strengthens the "don't fight them" call** |
| GSC Generative AI performance reports (June 2026); Bing WMT AI Performance (Feb 2026) | ✅ Both real |

**Also verified independently in this session:** every canonical is self-referential and
returns 200 · every page has exactly one `<h1>` · image alt coverage is 100% · the
`.htaccess` redirects behave as documented · a bogus URL returns a correct 404 · there is
**no `pushState`/`replaceState` anywhere in `js/`**, so the April 2026 back-button
hijacking spam policy is **not** a concern here.

---

## 📏 Measured, not estimated — word counts

The brief and two of the three strategy drafts inflated these. Use these numbers
(markup and scripts stripped, `<body>` only):

| File | Measured | Previously claimed |
|---|---|---|
| `index.html` | **1,792** | ~2,840 |
| `ai-agent-vs-chatbot-difference.html` | **1,848** | — |
| `ai-voice-agent-vs-ivr-vs-receptionist.html` | **1,750** | — |
| `whatsapp-ai-chatbot-popia-compliance.html` | **~1,700** | — |
| `small-business-ai-workflow-automation-examples.html` | **1,607** | 1,863 |
| `ai-receptionist-cost-south-africa.html` | **1,581** | ~1,800 |
| `ai-chatbot-south-african-languages.html` | **1,486** | — |
| `how-long-ai-automation-setup-roi.html` | **1,486** | — |
| `blog.html` | **328** | — |

*Note the "12 examples in 1,863 words is too thin" argument survives — the real figure
is ~134 words per example, which is **worse**, not better.*

---

## ⚠️ Corrected code patches

Two patches in the raw research would have broken the site. Both are corrected in
[04-technical-actions.md](04-technical-actions.md).

**1. The Three.js dynamic-load patch was written against code that does not exist.**
It references a `sceneAllowed` variable. There is no such variable. The real gate is
`!!window.THREE` inside `canRun` at `js/main.js:101–103`, evaluated **synchronously** —
so the naive patch disables the 3D scene **100% of the time** and silently changes
layout (`css/styles.css:433+` clips the process conveyor off `body.no-3d`).
**Correct fix:** drop `!!window.THREE` from `canRun`, `await loadThree()` before
`scene.init()`, keep the `catch → no-3d` path. Gate on
`document.body.classList.contains('no-3d')` before/after deploy.

**2. The GSAP "regression" is not real.** The claim was that unhiding `.contact` would
strand copy at `opacity: 0`, prescribing `immediateRender: false`. **Verified false** —
at `js/scroll.js:602–614` the tween is created *inside* `onEnter`, so elements carry no
inline opacity before the batch fires. The only artefact is a cosmetic
snap-to-invisible-then-fade at the instant of entry. Swap `gsap.from` → `gsap.fromTo` if
it bothers you; otherwise leave it. *(The rest of that item — narrowing the CSS selector
to `.contact-form` — is correct and valuable.)*

---

## 🔴 The highest-risk recommendation, rejected

**The `/index.html` 301 rewrite. Do not ship it.**

On LiteSpeed, a `THE_REQUEST`-based rule interacting with `DirectoryIndex` is the
classic source of an **infinite redirect loop on `/`**. `/` is **1 of only 4 indexed
URLs** and carries all 15 brand impressions.

The benefit is removing a single GSC row that **Google's own documentation describes as
requiring no action**. The downside is taking the site to zero.

*(The research contradicted itself here — one section called `/index.html` benign, another
listed it as an explicit non-goal, and a third prescribed the 301 anyway. Resolution:
leave it.)*

---

## 🗂️ Conflicts resolved

Three research agents proposed three incompatible schemes for several things. These are
the resolutions, already applied to the docs in this folder.

| Conflict | Resolution |
|---|---|
| Voice-agent page slug | **`ai-voice-agents-south-africa.html`** (plural) |
| Quoting page slug | **`automated-quoting-invoicing.html`** |
| 3D page slug | **`3d-websites.html`** |
| One calculator or two? | **One** — `calculator.html`, combining missed-call revenue and AI-vs-human cost. Two calculators on a zero-backlink domain split the link target and double the maintenance burden |
| Geo page slug | **`ai-automation-centurion.html`**, and **blocked** until a real client consents |
| Year in slugs | **Never.** The year belongs in the `<title>`, where it is the ranking signal. In the slug it forces an annual 301 |
| Integration pages: flat or `/integrations/`? | **Flat**, per `CLAUDE.md` — and **deferred entirely** until 25 indexed pages |
| Email sorting: page or section? | **A section inside `workflow-automation-south-africa.html`.** Its own research says *"near-zero search demand in any phrasing… service copy that closes deals, not a page that earns traffic"* |
| Rename `how-long-ai-automation-setup-roi.html`? | **No.** Rewrite in situ, keep the URL |
| Rename `ai-voice-agent-vs-ivr-vs-receptionist.html`? | **Yes — and BEFORE sitemap submission.** It's one of the 5 URLs Google has never fetched, so the 301 is free *right now*. Every draft prescribed the opposite order, which destroys the opportunity |
| Cadence: 26 / 10 / 5 pieces? | **12 over 13 weeks.** The 26-piece plan costs **340–400 hours** — 26–31 h/week sustained — from a founder who also has to sell and deliver |
| Reviews by day 90: 15? | **5.** "15 by day 90" at "1–2 per month" is arithmetically impossible, and the portfolio may not contain 15 askable clients. Clutch's 3-review threshold is the real binding constraint |
| Citations: 44 touchpoints? | **12, done perfectly** |
| Trajectory forecasts (three sets of numbers) | **The conservative set**, reproduced in [03-content-plan.md](03-content-plan.md) §10. Write them down once and grade against them, or every checkpoint becomes an argument |
| "Worldwide" in schema and copy | Remove from **`areaServed` schema only** (`AdministrativeArea: "Worldwide"` is semantically invalid). **Keep one honest sentence in body copy** — worldwide work is a stated business requirement, and the `.co.za` ccTLD already carries the geo signal |
| First content refresh | **February 2027**, not November — November is the month the last new pages ship |
| CIPC trading-name decision | **Week-1 blocker, not a P2 chore.** Every citation must carry the final name byte-identically |

---

## ✂️ What was cut, and why

| Cut | From → to | Reason |
|---|---|---|
| Voice-accent benchmark | 6 platforms → **3** | 6 needs six paid vendor accounts, real SA phone lines, a defensible WER methodology and audio production — 40–60h. **3 platforms, SA English + Afrikaans, published methodology + audio ≈ 12h for ~80% of the citation value.** Done sloppily it becomes a *liability*, because named vendors will contest the numbers publicly |
| YouTube videos | 10 → **3** | The 10-video figure rested on a correlation statistic that could not be verified. Three, one per money page, after those pages exist |
| Editorial calendar | 26 → **12** | See above. **The over-scoping risk and the penalty risk are the same risk** — Google's scaled content abuse policy names *"using generative AI tools to generate many pages without adding value."* Cutting is a penalty-avoidance measure, not just a capacity one |
| Vertical pages | 5 → **1** | Only dental/medical is confirmed in two independent autocomplete ladders. And it needs a client first |
| Geo pages | 3 → **1, blocked** | Zero publishable clients exist. Guardrails that can't be met aren't guardrails |
| Integration pages | 8–14 → **0 for now** | Pure fantasy for a site with 4 indexed pages |
| Citations | 44 → **12** | — |

---

## 🕳️ Known gaps in this research

Stated plainly so nobody mistakes silence for coverage.

1. **No paid keyword tool was used.** Every volume figure is an estimate.
   **Fix it in one hour** — Google Keyword Planner is free with any Google Ads account
   (even unfunded) and returns real SA-geo ranges; Bing WMT's Keyword Research is free
   too. Do this before building pages 6–12.
2. **No budget was totalled.** Paid inclusions, directory credits, vendor accounts for
   the benchmark, hosting — all discussed across the research, never summed. You need a
   rough number to decide anything.
3. **No negative-keyword / junk-query pruning plan.** You *will* start ranking for noise
   (you already rank for `business`, `businesses near me`). Nothing here says how to
   spot and prune it — watch the GSC Queries tab weekly.
4. **No branded-search decision.** `cognexa` earns 15 impressions and 0 clicks against
   six colliding entities plus NASDAQ-listed Cognex. Nothing decides whether to fight
   for the bare-brand SERP or always optimise for "Cognexa AI Centurion".
5. **No named owner or hours estimate** was attached to the content plan by the research.
   §0 of [03-content-plan.md](03-content-plan.md) now states the constraint explicitly.
6. **The SARS e-invoicing timeline should be re-verified before writing** — it is a
   fast-moving policy and the highest-conviction net-new topic in the plan.

---

## The one rule

> **No number goes into published copy without a live source link you have personally
> opened, and a date.**
>
> Every price gets a *"checked [date]"*. Every competitor figure gets a screenshot.
> Every statistic gets an outbound link. This is not pedantry — E-E-A-T is the one
> ranking input a four-week-old domain can actually build, and a single publicly
> checkable error on a comparison page costs more than the page earns.
