/**
 * Generates the card artwork for projects that have no product screenshot to show
 * (personal/backend repos). One cover per language, because the project name and
 * the strapline differ between locales:
 *
 *   src/assets/project-<id>.png     Portuguese (canonical locale)
 *   src/assets/project-<id>.en.png  English
 *
 * Output is committed, so the regular build does not depend on this script.
 * Run with: npm run generate:covers
 */
import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { translations } from '../src/i18n/translations.js';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = resolve(projectRoot, 'src/assets');

// 16:9, matching the aspect ratio the compact project cards render at.
const WIDTH = 1600;
const HEIGHT = 900;
const BG = '#060b17';
const ACCENT = '#64a2ff';
const TEXT = '#e7eeff';
const MUTED = '#95a6c7';
const FONT = 'Segoe UI, Helvetica Neue, Arial, sans-serif';

/** Projects rendered as generated artwork, with the line printed under the name. */
const COVERS = {
  kandonga: { pt: 'Backend fintech · inclusão de crédito', en: 'Fintech backend · credit inclusion' },
  infrawatch: { pt: 'Monitorização em tempo real', en: 'Real-time infrastructure monitoring' },
  myhealth: { pt: 'Serviços de saúde no mapa', en: 'Health services on the map' },
  smcuango: { pt: 'Site institucional · mineração', en: 'Institutional site · mining' },
  smchitotolo: { pt: 'Site institucional · mineração', en: 'Institutional site · mining' },
  projectolola: { pt: 'Site institucional', en: 'Institutional site' },
  bec: { pt: 'Site institucional', en: 'Institutional site' },
};

const OPEN_SOURCE = { pt: 'CÓDIGO ABERTO', en: 'OPEN SOURCE' };
const CLIENT_WORK = { pt: 'TRABALHO DE CLIENTE', en: 'CLIENT WORK' };

/** Projects whose artwork is labelled as client work rather than open source. */
const CLIENT_PROJECTS = new Set(['smcuango', 'smchitotolo', 'projectolola', 'bec']);

const escapeXml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Rough width estimate so a long name drops to a smaller size instead of overflowing. */
const titleSize = (name) => (name.length > 26 ? 72 : name.length > 18 ? 88 : 104);

function coverSvg(project, subtitle, eyebrow) {
  // Two rows of tags so a long stack list never runs past the right edge.
  const firstRow = project.tags.slice(0, 3).join('   ·   ');
  const secondRow = project.tags.slice(3).join('   ·   ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <defs>
      <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1f6dff" stop-opacity="0.34" />
        <stop offset="62%" stop-color="${BG}" stop-opacity="0" />
      </linearGradient>
      <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
        <path d="M64 0 L0 0 0 64" fill="none" stroke="${ACCENT}" stroke-opacity="0.14" stroke-width="1" />
      </pattern>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}" />
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" />
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />

    <rect x="96" y="300" width="140" height="5" rx="2.5" fill="${ACCENT}" />
    <text x="96" y="270" font-family="${FONT}" font-size="30" letter-spacing="7" fill="${ACCENT}">${escapeXml(eyebrow)}</text>
    <text x="96" y="430" font-family="${FONT}" font-size="${titleSize(project.name)}" font-weight="700" fill="${TEXT}">${escapeXml(project.name)}</text>
    <text x="96" y="500" font-family="${FONT}" font-size="40" fill="${MUTED}">${escapeXml(subtitle)}</text>
    <text x="96" y="640" font-family="${FONT}" font-size="30" fill="${MUTED}">${escapeXml(firstRow)}</text>
    ${secondRow ? `<text x="96" y="692" font-family="${FONT}" font-size="30" fill="${MUTED}">${escapeXml(secondRow)}</text>` : ''}
  </svg>`;
}

async function main() {
  for (const language of ['pt', 'en']) {
    for (const project of translations[language].projects.items) {
      const cover = COVERS[project.id];
      if (!cover) continue;

      const name = `project-${project.id}${language === 'pt' ? '' : `.${language}`}.png`;
      const eyebrow = CLIENT_PROJECTS.has(project.id) ? CLIENT_WORK : OPEN_SOURCE;
      const svg = coverSvg(project, cover[language], eyebrow[language]);
      await sharp(Buffer.from(svg)).png().toFile(resolve(assetsDir, name));
      console.log(`› src/assets/${name}`);
    }
  }
}

main().catch((error) => {
  console.error('Cover generation failed:', error);
  process.exit(1);
});
