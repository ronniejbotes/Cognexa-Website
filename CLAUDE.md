# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for **Cognexa**, an AI sales platform. This is the public-facing site; the product itself lives in the sibling repo `../Cognexa Dashboard` (single-file HTML dashboard).

## Stack

Vanilla HTML, CSS, and JavaScript — **no frameworks, no build step, no package manager**. Pages are served as static files; open `index.html` directly in a browser or run a simple static server:

```bash
python3 -m http.server 8000
```

External resources are loaded from CDNs (Google Fonts). Keep third-party dependencies to a minimum.

## Structure

```
├── index.html          # Homepage
├── css/
│   └── styles.css      # Shared stylesheet — all design tokens live here
├── js/
│   └── main.js         # Shared site scripts (nav, interactions)
└── assets/
    ├── images/         # Photos, illustrations, og images
    └── icons/          # SVG icons, favicons
```

New pages go in the repo root as `<name>.html` (e.g. `pricing.html`, `contact.html`) and link the shared `css/styles.css` and `js/main.js`.

## Design System

Brand styling must stay consistent with the Cognexa Dashboard. All colors, radii, and shadows are defined as CSS custom properties in `css/styles.css` under `:root` — always use the variables, never hard-code hex values in page markup.

Key tokens (mirrored from the dashboard):

- Dark theme: `--bg-primary: #0f1117`, cards `#222533`, borders `#2e3347`
- Text: primary `#e8eaf0`, secondary `#8b8fa3`, muted `#5a5e72`
- Accent: blue `#4a7cff` (primary CTA), green `#34d399`, purple `#a78bfa`
- Font: Inter (Google Fonts), system-ui fallback
- Radii: 6px / 10px / 14px (`--radius-sm/md/lg`)

## Conventions

- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`); accessible by default (alt text, labels, focus states).
- Mobile-first responsive CSS; the site must work down to 360px wide.
- No inline styles or inline `onclick` handlers — styles in `css/`, behavior in `js/`.
- Keep JavaScript progressive-enhancement only: every page must be readable with JS disabled.
