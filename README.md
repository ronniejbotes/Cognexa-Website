# Cognexa Website

Public marketing site for **Cognexa**, the AI sales platform.

## Running locally

No build step — it's plain HTML/CSS/JS. Either open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Structure

- `index.html` — homepage (new pages go in the root as `<name>.html`)
- `css/styles.css` — shared stylesheet and brand design tokens
- `js/main.js` — shared site scripts
- `assets/images/`, `assets/icons/` — static assets

See `CLAUDE.md` for design-system tokens and contribution conventions.
