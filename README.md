# EasySplitter — Landing Page

A responsive landing page for **EasySplitter**, an AI-based vocal remover for DJs and music producers. Built as a frontend portfolio project with a modern Gulp-based build pipeline.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| HTML5 (partials via `gulp-file-include`) | Templating |
| SCSS (BEM) | Styling |
| Gulp 5 | Build automation |
| PostCSS + Autoprefixer | CSS cross-browser support |
| CSSNano | CSS minification |
| Terser | JS minification |
| Swiper.js 11 | Testimonials carousel |
| Browser-Sync | Dev server with live reload |

---

## Build Output

Production build (`npm run build`) stats:

| Asset | Size (minified) |
|-------|----------------|
| `style.css` | 15 KB |
| `main.js` | 1.2 KB |
| `index.html` | 34 KB |

---

## Performance Optimisations

- **LCP image** — served in AVIF/WebP with PNG fallback via `<picture>`; marked with `fetchpriority="high"` so the browser prioritises it immediately
- **Lazy loading** — `loading="lazy"` on all below-fold images
- **No render-blocking CSS/JS** — only 1.2 KB of custom JS; Swiper loaded from CDN
- **Minified in production** — HTML (whitespace + comments stripped), CSS (CSSNano), JS (Terser)
- **Source maps** in development for easy debugging

---

## Project Structure

```
src/
├── components/          # Reusable BEM blocks (advantages, preferences, steps)
│   ├── advantagesBlock/
│   ├── preferencesBlock/
│   └── stepsBlock/
├── html/
│   ├── index.html       # Entry point — assembles partials via @@include
│   └── partials/        # One file per section
├── js/
│   └── main.js          # Swiper init + burger menu
└── scss/
    ├── base/            # _reset, _vars, _global
    └── blocks/          # One file per section/block
```

---

## Features

- **Burger navigation** — full-screen mobile overlay with CSS transition; closes on link click, overlay click, or `Escape`
- **Responsive layout** — breakpoints at 768 px and 992 px; no CSS frameworks
- **Testimonials slider** — Swiper.js with custom pagination and prev/next controls
- **BEM naming** — consistent across all HTML and SCSS
- **Working anchors** — all nav links and hero CTAs scroll to real page sections
- **Accessible** — `aria-label` on icon-only controls, `aria-expanded` on burger button, decorative images marked `alt=""`

---

## Getting Started

```bash
npm install

# Development (live reload on localhost:3000)
npm run dev

# Production build → dist/
npm run build
```

> Requires Node.js ≥ 18.

---

## Sections

| Section | Description |
|---------|-------------|
| Hero | Headline, two CTAs, product screenshot |
| Advantages (`#advantages`) | Four feature cards with icons |
| Preferences | Three USPs with app screenshot |
| How It Works (`#how-it-works`) | Four numbered steps |
| Download (`#download`) | App Store / Google Play CTA banner |
| Testimonials (`#testimonials`) | Three-slide Swiper carousel |
| Footer | Logo, social links, contact info |
