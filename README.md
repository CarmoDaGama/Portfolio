# Carmo Da Gama – Portfolio

A modern, fully responsive portfolio website for **Carmo Da Gama**, a Full-Stack Developer specializing in React.js + Node.js/Laravel.

## Tech Stack

- **React 19** – UI components
- **Vite** – lightning-fast dev server and build tool
- **Tailwind CSS v3** – utility-first styling

## Features

- Fixed navigation with active-section tracking and mobile hamburger menu
- Full-height hero with animated dot-grid background
- About section with stats and code decoration
- Skill categories displayed as pill badges
- Vertical timeline for work experience
- Education cards with a courses section
- Contact section with info cards and a demo contact form
- Fully responsive (mobile-first)
- Dark theme with blue accents
- Pre-rendered at build time (no blank HTML for crawlers), one static case-study page per project

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (Vite build + pre-render)
npm run build

# Build the plain SPA, without pre-rendering (debugging only)
npm run build:spa

# Regenerate the Open Graph cards in public/og/ (only after changing projects/photo)
npm run generate:og
```

## SEO / machine readability

The site is a client-rendered SPA, so `npm run build` runs `scripts/prerender.mjs` right after
`vite build`:

1. **`/` is pre-rendered.** `src/entry-server.jsx` renders the app with `react-dom/server` and the
   markup is injected into `dist/index.html`. Crawlers that don't run JavaScript (LinkedIn, most
   recruiter/ATS bots, social previews) get the full content; the browser hydrates it.
   The `data-prerender-language` / `data-prerender-theme` attributes on `#root` tell `src/main.jsx`
   whether hydration is safe — if the visitor stored a different language or theme, it renders
   client-side instead, so there is never a hydration mismatch.
2. **One static page per project**, `/projects/<id>/` (pt) and `/en/projects/<id>/` (en), each with
   its own `<title>`, meta description, canonical + hreflang, Open Graph image and
   `SoftwareApplication` + `BreadcrumbList` JSON-LD. These are the URLs to share on LinkedIn or a CV.
3. **`sitemap.xml`** listing every URL, plus `public/robots.txt` pointing at it.
4. **JSON-LD on `/`**: `Person`, `WebSite` and an `ItemList` of the projects.

Text content lives in `src/i18n/translations.js` — adding a project there automatically produces its
case-study pages and sitemap entries (add its OG image mapping in `scripts/generate-og-images.mjs`).

## Deployment

After running `npm run build`, deploy the `dist/` folder to any static hosting provider (GitHub Pages,
Netlify, Vercel, etc.).

> **Important:** do not configure a SPA catch-all rewrite (`/* → /index.html`). The build emits real
> files for `/projects/*` and `/en/projects/*`, and a catch-all would shadow them. Static hosts serve
> these directories correctly out of the box.

## Contact

**Carmo Da Gama** – [carmodagama@gmail.com](mailto:carmodagama@gmail.com) – [LinkedIn](https://linkedin.com/in/carmodagama)

