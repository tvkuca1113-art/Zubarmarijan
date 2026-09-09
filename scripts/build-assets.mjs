/**
 * Responsive image pipeline.
 *
 * Reads every source photograph from vendor/images/ (masters, never served), writes
 * AVIF, WebP and JPEG derivatives to public/images/derived/, and records the size
 * of each one in src/data/asset-manifest.json.
 *
 * The manifest is what the <Figure> component reads. A slot with no entry renders
 * a designed plate at the same aspect ratio instead, so the layout never shifts.
 *
 *   npm run assets
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_DIR = 'vendor/images';
const OUT_DIR = 'public/images/derived';
const MANIFEST = 'src/data/asset-manifest.json';

/** Width ladder. Each entry is skipped when it would upscale the original. */
const LADDER = [420, 640, 900, 1200, 1600];
const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff'];

/** Slot key -> expected source basename. Mirrors src/data/assets.ts. */
const SLOTS = {
  portrait: 'doctor-portrait',
  welcome: 'welcome-conversation',
  stillLife: 'cleaning-still-life',
  crown: 'ceramic-crown',
  entrance: 'practice-entrance',
};

async function findSource(base) {
  for (const ext of EXTS) {
    const p = path.join(SRC_DIR, base + ext);
    try {
      await fs.access(p);
      return p;
    } catch {
      /* keep looking */
    }
  }
  return null;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(SRC_DIR, { recursive: true });

  const manifest = {};
  let made = 0;

  for (const [key, base] of Object.entries(SLOTS)) {
    const src = await findSource(base);
    if (!src) {
      console.log(`· ${key.padEnd(10)} no source file – the layout will render its plate`);
      continue;
    }

    const image = sharp(src, { failOn: 'none' });
    const meta = await image.metadata();
    const intrinsicWidth = meta.width ?? 0;
    const intrinsicHeight = meta.height ?? 0;
    if (!intrinsicWidth || !intrinsicHeight) {
      console.warn(`! ${key}: could not read dimensions from ${src} – skipped`);
      continue;
    }

    const widths = LADDER.filter((w) => w <= intrinsicWidth);
    if (widths.length === 0) widths.push(intrinsicWidth);
    if (!widths.includes(intrinsicWidth) && intrinsicWidth < LADDER[LADDER.length - 1]) {
      widths.push(intrinsicWidth);
    }
    widths.sort((a, b) => a - b);

    for (const w of widths) {
      const pipeline = () => sharp(src, { failOn: 'none' }).rotate().resize({ width: w, withoutEnlargement: true });
      await pipeline().avif({ quality: 58, effort: 6 }).toFile(path.join(OUT_DIR, `${base}-${w}.avif`));
      await pipeline().webp({ quality: 76 }).toFile(path.join(OUT_DIR, `${base}-${w}.webp`));
      await pipeline().jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(path.join(OUT_DIR, `${base}-${w}.jpg`));
      made += 3;
    }

    manifest[key] = {
      base,
      widths,
      intrinsicWidth,
      intrinsicHeight,
      formats: ['avif', 'webp', 'jpg'],
      sourceFile: path.basename(src),
      generated: new Date().toISOString().slice(0, 10),
    };
    console.log(`✓ ${key.padEnd(10)} ${intrinsicWidth}×${intrinsicHeight} → ${widths.join(', ')}`);
  }

  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  const found = Object.keys(manifest).length;
  console.log(`\n${found}/${Object.keys(SLOTS).length} slots have a photograph. ${made} derivative files written.`);
  if (found < Object.keys(SLOTS).length) {
    console.log(`Drop the missing originals into ${SRC_DIR}/ using the basenames above, then re-run.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
