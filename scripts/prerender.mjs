/**
 * Post-build step: turns the SPA output into machine-readable HTML.
 *
 *  1. Builds an SSR bundle of the app and injects the rendered markup into dist/index.html,
 *     so crawlers that do not run JavaScript see the whole portfolio (text, projects, contacts).
 *  2. Emits a static case-study page per project, in pt and en, each with its own
 *     <title>, meta description, canonical/hreflang, Open Graph image and JSON-LD.
 *  3. Emits sitemap.xml.
 *
 * Run automatically by `npm run build`.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import { translations } from '../src/i18n/translations.js';
import {
  COPY,
  PERSON,
  PRERENDER_LANGUAGE,
  PRERENDER_THEME,
  SITE_URL,
  projectPath,
} from './site.config.mjs';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, '.ssr-build');

const SECTION_LABELS = [
  { keys: ['Problem:', 'Problema:'], title: { en: 'Problem', pt: 'Problema' } },
  { keys: ['Solution:', 'Solução:'], title: { en: 'Solution', pt: 'Solução' } },
  { keys: ['My Role:', 'Meu papel:'], title: { en: 'My role', pt: 'Meu papel' } },
  { keys: ['Results:', 'Resultados:'], title: { en: 'Results', pt: 'Resultados' } },
  { keys: ['Tech Stack:', 'Stack:'], title: { en: 'Tech stack', pt: 'Stack' } },
];

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const absolute = (pathname) => `${SITE_URL}${pathname}`;

/** Splits the long "Problem: … Solution: … Results: …" blurb into labelled sections. */
function splitDescription(description, language) {
  const markers = [];

  for (const section of SECTION_LABELS) {
    for (const key of section.keys) {
      const index = description.indexOf(key);
      if (index !== -1) {
        markers.push({ index, length: key.length, title: section.title[language] });
        break;
      }
    }
  }

  if (markers.length === 0) return [{ title: null, body: description.trim() }];

  markers.sort((a, b) => a.index - b.index);

  const sections = [];
  const intro = description.slice(0, markers[0].index).trim();
  if (intro) sections.push({ title: null, body: intro });

  markers.forEach((marker, i) => {
    const start = marker.index + marker.length;
    const end = i + 1 < markers.length ? markers[i + 1].index : description.length;
    const body = description.slice(start, end).trim();
    if (body) sections.push({ title: marker.title, body });
  });

  return sections;
}

/** First ~155 characters of real prose, for <meta name="description">. */
function metaDescription(project, language) {
  const sections = splitDescription(project.description, language);
  const source = sections.find((section) => section.body)?.body ?? project.description;
  const prefix = `${project.name} — ${project.tags.join(', ')}. `;
  const budget = 200 - prefix.length;
  const text = source.length > budget ? `${source.slice(0, budget - 1).trimEnd()}…` : source;
  return `${prefix}${text}`;
}

function renderProjectPage({ project, language, alternate }) {
  const copy = COPY[language];
  const t = translations[language].projects;
  const url = absolute(projectPath(language, project.id));
  const ogImage = absolute(`/og/${project.id}.png`);
  const description = metaDescription(project, language);
  const sections = splitDescription(project.description, language);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: copy.localeTag,
    description,
    image: ogImage,
    softwareRequirements: project.tags.join(', '),
    keywords: project.tags.join(', '),
    sameAs: [project.url],
    author: {
      '@type': 'Person',
      name: PERSON.name,
      url: `${SITE_URL}/`,
      jobTitle: PERSON.jobTitle,
      sameAs: PERSON.sameAs,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: PERSON.name, item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: t.title, item: `${SITE_URL}/#projects` },
      { '@type': 'ListItem', position: 3, name: project.name, item: url },
    ],
  };

  const sectionsHtml = sections
    .map((section) => {
      const heading = section.title ? `<h2>${escapeHtml(section.title)}</h2>` : '';
      return `${heading}<p>${escapeHtml(section.body)}</p>`;
    })
    .join('\n        ');

  return `<!doctype html>
<html lang="${language}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <title>${escapeHtml(project.name)} – ${escapeHtml(copy.caseStudy)} | ${escapeHtml(PERSON.name)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="author" content="${escapeHtml(PERSON.name)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="${language}" href="${url}" />
    <link rel="alternate" hreflang="${alternate.language}" href="${alternate.url}" />
    <link rel="alternate" hreflang="x-default" href="${absolute(projectPath(PRERENDER_LANGUAGE, project.id))}" />

    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${escapeHtml(PERSON.name)}" />
    <meta property="og:locale" content="${copy.ogLocale}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${escapeHtml(project.name)} – ${escapeHtml(copy.caseStudy)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(`${t.previewAlt} ${project.name}`)}" />
    <meta property="article:author" content="https://linkedin.com/in/carmodagama" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(project.name)} – ${escapeHtml(copy.caseStudy)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${ogImage}" />

    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>

    <style>
      :root {
        color-scheme: dark;
        --bg: #060b17;
        --surface: #0d1423;
        --text: #e7eeff;
        --muted: #95a6c7;
        --accent: #64a2ff;
        --line: rgba(149, 170, 211, 0.3);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 0 1.25rem 5rem;
        background: var(--bg);
        color: var(--text);
        font-family: 'Sora', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
        line-height: 1.65;
      }
      main { max-width: 46rem; margin: 0 auto; }
      nav { max-width: 46rem; margin: 0 auto; padding: 1.75rem 0; display: flex; gap: 1.25rem; flex-wrap: wrap; }
      a { color: var(--accent); }
      .eyebrow {
        font-family: ui-monospace, 'IBM Plex Mono', monospace;
        font-size: 0.75rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--muted);
      }
      h1 { font-size: clamp(2rem, 5vw, 2.75rem); line-height: 1.15; margin: 0.5rem 0 1rem; }
      h2 { font-size: 1.05rem; margin: 2rem 0 0.35rem; color: var(--accent); }
      p { color: var(--muted); margin: 0 0 1rem; }
      img { width: 100%; height: auto; border: 1px solid var(--line); border-radius: 0.75rem; display: block; margin: 1.5rem 0; }
      ul.tags { list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; margin: 0 0 1.5rem; }
      ul.tags li {
        font-family: ui-monospace, 'IBM Plex Mono', monospace;
        font-size: 0.75rem;
        color: var(--accent);
        border: 1px solid var(--line);
        border-radius: 999px;
        padding: 0.25rem 0.7rem;
        background: rgba(100, 162, 255, 0.12);
      }
      .actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 2.5rem; }
      .actions a {
        border: 1px solid var(--line);
        border-radius: 0.5rem;
        padding: 0.6rem 1.1rem;
        text-decoration: none;
        font-size: 0.9rem;
      }
      .actions a.primary { background: var(--accent); border-color: var(--accent); color: #06101f; font-weight: 600; }
      footer { max-width: 46rem; margin: 3rem auto 0; border-top: 1px solid var(--line); padding-top: 1.5rem; font-size: 0.85rem; color: var(--muted); }
    </style>
  </head>
  <body>
    <nav>
      <a href="/">← ${escapeHtml(copy.backHome)}</a>
      <a href="/#projects">${escapeHtml(copy.allProjects)}</a>
      <a href="${alternate.url}" hreflang="${alternate.language}">${escapeHtml(copy.switchLanguage)}</a>
    </nav>

    <main>
      <p class="eyebrow">${escapeHtml(copy.projectsHeading)} · ${escapeHtml(copy.caseStudy)}</p>
      <h1>${escapeHtml(project.name)}</h1>

      <ul class="tags">
        ${project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('\n        ')}
      </ul>

      <img src="/og/${project.id}.png" alt="${escapeHtml(`${t.previewAlt} ${project.name}`)}" width="1200" height="630" />

      ${sectionsHtml}

      <div class="actions">
        <a class="primary" href="${escapeHtml(project.url)}" target="_blank" rel="noopener">${escapeHtml(copy.liveSite)}</a>
        <a href="/#projects">${escapeHtml(copy.allProjects)}</a>
      </div>
    </main>

    <footer>
      <p>
        ${escapeHtml(PERSON.name)} — ${escapeHtml(PERSON.jobTitle)} ·
        <a href="mailto:${PERSON.email}">${PERSON.email}</a> ·
        <a href="https://linkedin.com/in/carmodagama" rel="noopener">LinkedIn</a> ·
        <a href="https://github.com/CarmoDaGama" rel="noopener">GitHub</a>
      </p>
    </footer>
  </body>
</html>
`;
}

function buildHomeJsonLd() {
  const projects = translations[PRERENDER_LANGUAGE].projects.items;

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: PERSON.name,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    jobTitle: PERSON.jobTitle,
    url: `${SITE_URL}/`,
    email: `mailto:${PERSON.email}`,
    telephone: PERSON.telephone,
    image: absolute('/og/home.png'),
    sameAs: PERSON.sameAs,
    knowsAbout: PERSON.knowsAbout,
    alumniOf: { '@type': 'EducationalOrganization', name: PERSON.alumniOf },
    address: {
      '@type': 'PostalAddress',
      addressLocality: PERSON.locality,
      addressCountry: PERSON.country,
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: `${PERSON.name} – ${PERSON.jobTitle}`,
    inLanguage: COPY[PRERENDER_LANGUAGE].localeTag,
    author: { '@id': `${SITE_URL}/#person` },
  };

  const portfolio = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: translations[PRERENDER_LANGUAGE].projects.title,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: project.name,
        url: absolute(projectPath(PRERENDER_LANGUAGE, project.id)),
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: metaDescription(project, PRERENDER_LANGUAGE),
        keywords: project.tags.join(', '),
        author: { '@id': `${SITE_URL}/#person` },
      },
    })),
  };

  return [person, website, portfolio]
    .map((entry) => `<script type="application/ld+json">${JSON.stringify(entry)}</script>`)
    .join('\n    ');
}

function buildSitemap(projects) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [{ loc: `${SITE_URL}/`, priority: '1.0' }];

  for (const project of projects) {
    for (const language of ['pt', 'en']) {
      urls.push({ loc: absolute(projectPath(language, project.id)), priority: '0.8' });
    }
  }

  const body = urls
    .map(
      ({ loc, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

async function main() {
  console.log('› building SSR bundle…');
  await build({
    root,
    logLevel: 'warn',
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: '.ssr-build',
      emptyOutDir: true,
      copyPublicDir: false,
    },
  });

  const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

  console.log('› pre-rendering /');
  const appHtml = render({ language: PRERENDER_LANGUAGE, theme: PRERENDER_THEME });

  const indexPath = path.join(distDir, 'index.html');
  let html = await fs.readFile(indexPath, 'utf8');

  if (!html.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html does not contain an empty <div id="root"></div> to fill.');
  }

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerender-language="${PRERENDER_LANGUAGE}" data-prerender-theme="${PRERENDER_THEME}">${appHtml}</div>`,
  );
  html = html.replace('</head>', `  ${buildHomeJsonLd()}\n  </head>`);
  await fs.writeFile(indexPath, html, 'utf8');

  const projects = translations[PRERENDER_LANGUAGE].projects.items;

  for (const language of ['pt', 'en']) {
    const otherLanguage = language === 'pt' ? 'en' : 'pt';

    for (const project of translations[language].projects.items) {
      const page = renderProjectPage({
        project,
        language,
        alternate: {
          language: otherLanguage,
          url: absolute(projectPath(otherLanguage, project.id)),
        },
      });

      const outDir = path.join(distDir, projectPath(language, project.id));
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, 'index.html'), page, 'utf8');
      console.log(`› pre-rendering ${projectPath(language, project.id)}`);
    }
  }

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(projects), 'utf8');
  await fs.rm(ssrDir, { recursive: true, force: true });

  console.log(`✓ pre-rendered 1 + ${projects.length * 2} pages`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
