# How Search Actually Works — and Why Cognexa Is Invisible

*Plain-English primer. Written 9 August 2026. Read this before anything else in `seo/`.*

---

## 1. SEO is not one thing. It is five stages, and you fail at stage two.

Google is a pipeline. A page has to survive every stage to earn a visit. Most people
optimise stage 5 while dying at stage 2.

| # | Stage | What happens | Cognexa's status |
|---|---|---|---|
| 1 | **Discovery** | Google learns a URL exists — from a sitemap, a link on another site, or a link on a page it already crawls | ❌ **Failing.** 5 of 9 pages have never been fetched |
| 2 | **Crawling** | Googlebot downloads the page and runs its JavaScript | ⚠️ Works, but budget is tiny (new domain, no links) |
| 3 | **Indexing** | Google stores the page and decides what it is about | ✅ Works for the 4 pages that got crawled |
| 4 | **Retrieval** | For a given search, Google pulls a few hundred candidate URLs | ⚠️ You have **one** commercial URL. Retrieval returns URLs, not page sections |
| 5 | **Ranking** | Those candidates get sorted | ⚠️ Position 14.5 — the symptom everyone stares at |

**The critical distinction almost everyone gets wrong:**

> "Not indexed" ≠ "not ranking" ≠ "ranking badly".
>
> These are three different problems with three different fixes. Cognexa has problem
> one and problem four. Nobody should be touching problem five yet.

---

## 2. Read the Search Console numbers correctly

### The "4 not indexed" rows are not a problem — delete them from the worry list

Verified against the live server on 9 Aug 2026:

| GSC label | Count | What it actually is | Verdict |
|---|---|---|---|
| Page with redirect | 3 | `http://cognexa.co.za/`, `https://www.cognexa.co.za/`, `http://www.cognexa.co.za/` | ✅ Your `.htaccess` 301 working exactly as designed |
| Alternate page with proper canonical tag | 1 | `https://cognexa.co.za/index.html` → canonical `/` | ✅ Google's docs: *"there is nothing you need to do"* |

Zero real content pages are blocked, deindexed, or canonicalised away. This is the
**expected shape** of a correctly configured domain property.

### The real problem is arithmetic

GSC's Page indexing report is a *complete inventory* of every URL Google knows about.
It knows **8**. Your sitemap lists **9 real pages**. So five real pages are not in the
report at all — not even as "Discovered, currently not indexed". They are **absent**.
Googlebot has never fetched them:

```
blog.html
ai-voice-agent-vs-ivr-vs-receptionist.html
whatsapp-ai-chatbot-popia-compliance.html
ai-agent-vs-chatbot-difference.html
how-long-ai-automation-setup-roi.html
```

### 0 clicks is not a symptom. It is the expected outcome.

Organic click-through at positions 11–20 in 2026 runs roughly **0.2–0.6%**.

```
87 impressions × 0.4% = 0.35 expected clicks
```

You would need about **250 impressions at position 14.5 to statistically earn one
click**. There is nothing to diagnose in the 0% CTR — it contains no information.

> **The number to fix is 87 impressions, not 0 clicks.** Impressions grow through
> *page count × query coverage*, not through nudging position 14.5 to 13.

---

## 3. How Google decides what ranks

Google's own testimony and documentation describe three broad topicality inputs:

| Input | What it is | Cognexa's level |
|---|---|---|
| **Body** | The words on the page, its title, its URL, its structure | 🟡 The only lever you own right now |
| **Anchors** | The text of links pointing at the page from other sites | 🔴 Effectively zero — you have no backlinks |
| **Clicks** | How real users behave in the results (the "NavBoost" system, on a rolling ~13-month window) | 🔴 Zero, and the window hasn't started |

Layered on top:

- **Site-level authority.** Google propagates a site-wide quality/authority estimate to
  every page. A four-week-old domain has none, and nothing you write changes that this
  month. It changes with time plus external mentions.
- **Site focus.** Google measures how tightly a site's pages cluster around one topic.
  A site claiming four unrelated pillars (chatbots, voice, workflow, *3D websites*)
  scores worse than one that is obviously about one thing. This is why the positioning
  decision in [02-keyword-strategy.md](02-keyword-strategy.md) matters more than any
  individual page.
- **E-E-A-T** (Experience, Expertise, Authoritativeness, Trust). Not a score Google
  computes — it's the *goal* their quality systems approximate. In practice, for a
  small agency, it means: a named human with a face and a bio, a real verifiable
  address, real prices, real named clients, and citations to primary sources.
  Cognexa currently fails the "Who" test outright — no named person appears anywhere,
  and blog authorship resolves to the company, not a person.

---

## 4. You are competing on three separate surfaces, with three different algorithms

The docs in this folder constantly touch all three. They are not the same thing, and
they do **not** move at the same speed.

| Surface | What it is | Ranked by | When it moves for you |
|---|---|---|---|
| **Organic** | The blue links | Body + Anchors + Clicks + site authority. Heavily gated by domain age | Months 3–12 |
| **Local / map pack** | The 3-result map box | **Relevance, distance, prominence.** Far less gated by domain age. ~32% of the weight is your Google Business Profile, ~16% is reviews | **Weeks** — this is why GBP is a week-1 job |
| **AI answers** | AI Overviews, AI Mode, ChatGPT, Perplexity | Mostly *downstream of organic rank* — ~76% of heavily-reused AI Mode passages came from #1-ranking pages — plus content formatting and third-party brand mentions | Months 6+ |

**The practical consequence:** the map pack is the only surface where a four-week-old
business can appear quickly, and half its algorithm sits untouched inside a free Google
product you haven't created yet. AI search is **not** a bypass around bad rankings — it
is a formatting layer on top of good ones.

---

## 5. Why a new domain can't just rank

Two of the three topicality inputs (Anchors, Clicks) are structurally zero for a new
site and cannot be manufactured honestly. Site authority accrues over months. So in
months 0–6, **Body is the only lever you own** — which is precisely why the strategy is
corpus expansion (build the pages that don't exist) rather than optimisation (tune the
pages that do).

Expect this shape:

| | Now (Aug 26) | Nov 26 | Feb 27 | Aug 27 |
|---|---|---|---|---|
| Indexed pages | 4 | 15–20 | 25–35 | 40–60 |
| Impressions/mo | ~29 | 250–700 | 1,500–4,000 | 8,000–20,000 |
| Clicks/mo | 0 | 5–25 | 40–120 | 250–700 |
| Avg position | 14.5 | 12–15 *(may worsen briefly)* | 9–12 | 6–9 |
| Referring domains | ~1 | 5–10 | 15–30 | 30–60 |

Average position getting *worse* in month 3 is normal and good — it means you started
ranking for many more terms, most of them deep, which drags the average down while
total impressions climb.

**Write these numbers down and grade against them.** Otherwise every checkpoint becomes
an argument about what "working" meant.

---

## 6. What actively hurts in 2026

Google's spam policies name these explicitly. All of them are tempting for a site in
Cognexa's position:

| Tactic | Why it's fatal here |
|---|---|
| **Mass-generated location pages** (`/ai-receptionist-{40 SA towns}`) | Named verbatim in the doorway-page policy. Templated location service pages lost an estimated 30–60% of traffic in recent enforcement waves |
| **Bulk AI-written content** | The scaled-content-abuse policy names *"using generative AI tools to generate many pages without adding value"*. The over-scoping risk and the penalty risk are the same risk |
| **Thin near-duplicate pages** | `ai agency johannesburg` and `ai agency pretoria` as two 400-word pages with the city swapped is the exact pattern |
| **`aggregateRating` on your own Organization schema** | Google: *"If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for star review feature."* Third-party review widgets on your own domain count as self-serving too |
| **Keyword-stuffed Google Business Profile name** | "Cognexa AI Automation Centurion" is a reportable guideline breach and a suspension vector. The name field takes `Cognexa`, nothing else |

**Five genuinely differentiated pages beat forty templated ones — and forty templated
ones are a deindexing risk.**

---

## 7. What is *not* worth your attention right now

| Thing | Why to ignore it |
|---|---|
| **Core Web Vitals** | Shows "No data" because you have no field traffic. That's a *consequence* of having no visitors, not a cause. Google's own position is that CWV are not large ranking factors |
| **`llms.txt`** | Across 137k domains studied, the overwhelming majority of these files received zero requests. Fix the one real defect (it points at `#station-*` anchors instead of real URLs) and move on |
| **The 4 "not indexed" GSC rows** | Benign, per §2 |
| **Restructuring URLs to remove `.html`** | Three of your four indexed pages are blog posts. 301ing them away on a zero-authority domain spends your entire asset base for a cosmetic change Google has said repeatedly is not a ranking factor |

---

## 8. Your weekly habit

Everything else in this folder is a table. This is the part you actually do.

**Every Monday, 30 minutes:**
1. GSC → Pages → is the indexed count going up?
2. GSC → Performance → 3 months → **Queries** tab. Any *new* query strings? Those are
   the leading indicator; clicks are the lagging one.
3. Prune: any junk queries (`business`, `businesses near me`) growing? That means
   Google still doesn't know what you are.
4. Google Business Profile → post once, answer any Q&A, chase one review.
5. Ship the week's one page. One good page beats two rushed ones.

**Monthly:** re-read the trajectory table in §5 and mark where you actually are.

---

## 9. The one-paragraph version

Nothing on this site is technically broken. Five of your nine real pages have never
been fetched by Google because the sitemap was never submitted in Search Console and
you have no inbound links, which are the only two discovery paths that exist. You have
exactly one commercial URL trying to rank for four service categories, and your three
highest-value offerings — quoting, invoicing/bookings, and custom CRMs — appear **zero
times** on the homepage. Your brand has no entity footprint (no Google Business Profile,
no LinkedIn, no `sameAs` in your schema, no named human), which is why fifteen searches
for your own company name produced zero clicks. Fix discovery and identity this week,
build the missing commercial pages over eight weeks, and leave rankings alone until
those two are done.

---

**Next:** [02-keyword-strategy.md](02-keyword-strategy.md) — what to rank for
