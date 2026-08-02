/**
 * Generates the 1200x630 social preview images used by Open Graph / Twitter cards
 * (LinkedIn, WhatsApp, Slack, X). Output goes to public/og/ and is committed, so the
 * regular build does not depend on this script.
 *
 * Run with: npm run generate:og
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { translations } from '../src/i18n/translations.js';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = resolve(projectRoot, 'public/og');

const WIDTH = 1200;
const HEIGHT = 630;
const BG = '#060b17';
const ACCENT = '#64a2ff';
const TEXT = '#e7eeff';
const MUTED = '#95a6c7';
const FONT = "Segoe UI, Helvetica Neue, Arial, sans-serif";

const projectSources = {
  tmicro: 'src/assets/project-tmicro.webp',
  trimed: 'src/assets/project-trimed.webp',
  zenix: 'src/assets/project-zenix.webp',
  anyconnect: 'src/assets/project-anyconnect.png',
};

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** Rough character-budget truncation so long names never overflow the card. */
const clamp = (value, max) => (value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value);

const backdrop = `
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1f6dff" stop-opacity="0.30" />
      <stop offset="60%" stop-color="#060b17" stop-opacity="0" />
    </linearGradient>
    <pattern id="grid" width="54" height="54" patternUnits="userSpaceOnUse">
      <path d="M54 0 L0 0 0 54" fill="none" stroke="${ACCENT}" stroke-opacity="0.16" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />
`;

function homeCardSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${backdrop}
    <text x="80" y="180" font-family="${FONT}" font-size="26" letter-spacing="6" fill="${ACCENT}">CARMODAGAMA.DEV</text>
    <text x="80" y="290" font-family="${FONT}" font-size="86" font-weight="700" fill="${TEXT}">Carmo Da Gama</text>
    <text x="80" y="356" font-family="${FONT}" font-size="40" font-weight="600" fill="${MUTED}">Full-Stack Developer</text>
    <text x="80" y="440" font-family="${FONT}" font-size="28" fill="${MUTED}">React · Node.js / NestJS · Laravel · PostgreSQL</text>
    <text x="80" y="492" font-family="${FONT}" font-size="28" fill="${MUTED}">6+ anos · Fintech, APIs e sistemas críticos · Luanda, AO</text>
    <rect x="80" y="540" width="120" height="4" rx="2" fill="${ACCENT}" />
  </svg>`;
}

function projectCardSvg(project) {
  const tags = clamp(project.tags.join('  ·  '), 60);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${backdrop}
    <text x="72" y="86" font-family="${FONT}" font-size="22" letter-spacing="5" fill="${ACCENT}">CARMODAGAMA.DEV</text>
    <text x="72" y="152" font-family="${FONT}" font-size="58" font-weight="700" fill="${TEXT}">${escapeXml(clamp(project.name, 32))}</text>
    <text x="72" y="200" font-family="${FONT}" font-size="26" fill="${MUTED}">${escapeXml(tags)}</text>
  </svg>`;
}

async function generateHomeCard() {
  // The portrait is a cut-out with a transparent background: crop it to a portrait
  // frame and ground it on the bottom edge of the card.
  const portrait = await sharp(resolve(projectRoot, 'src/assets/pfp.png'))
    .resize(400, 470, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  await sharp(Buffer.from(homeCardSvg()))
    .composite([{ input: portrait, top: HEIGHT - 470, left: 760 }])
    .png()
    .toFile(resolve(outputDir, 'home.png'));

  console.log('› public/og/home.png');
}

async function generateProjectCard(project) {
  const source = projectSources[project.id];
  if (!source) {
    console.warn(`! no preview image mapped for project "${project.id}", skipping`);
    return;
  }

  const shot = await sharp(resolve(projectRoot, source))
    .resize(1056, 360, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  await sharp(Buffer.from(projectCardSvg(project)))
    .composite([{ input: shot, top: 238, left: 72 }])
    .png()
    .toFile(resolve(outputDir, `${project.id}.png`));

  console.log(`› public/og/${project.id}.png`);
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  await generateHomeCard();

  // English names/tags are used for the cards; they are language-neutral labels.
  for (const project of translations.en.projects.items) {
    await generateProjectCard(project);
  }
}

main().catch((error) => {
  console.error('OG image generation failed:', error);
  process.exit(1);
});
