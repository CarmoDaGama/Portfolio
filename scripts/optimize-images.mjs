  import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

const imageJobs = [
  {
    input: resolve(projectRoot, 'src/assets/hero.png'),
    output: resolve(projectRoot, 'src/assets/hero.webp'),
    options: { quality: 82 },
  },
  {
    input: resolve(projectRoot, 'src/assets/project-tmicro.svg'),
    output: resolve(projectRoot, 'src/assets/project-tmicro.webp'),
    options: { quality: 80 },
  },
  {
    input: resolve(projectRoot, 'src/assets/project-trimed.svg'),
    output: resolve(projectRoot, 'src/assets/project-trimed.webp'),
    options: { quality: 80 },
  },
  {
    input: resolve(projectRoot, 'src/assets/project-zenix.svg'),
    output: resolve(projectRoot, 'src/assets/project-zenix.webp'),
    options: { quality: 80 },
  },
];

async function optimizeImages() {
  for (const job of imageJobs) {
    await mkdir(dirname(job.output), { recursive: true });
    await sharp(job.input).webp(job.options).toFile(job.output);
    console.log(`Optimized: ${job.output.replace(projectRoot + '/', '')}`);
  }
}

optimizeImages().catch((error) => {
  console.error('Image optimization failed:', error);
  process.exit(1);
});
