/**
 * Renders the static poster for "Ein Zahn. Drei Perspektiven."
 *
 * The poster is what a visitor sees before the 3D scene loads, on a phone that
 * never activates it, and whenever WebGL is unavailable. It therefore has to be
 * framed and lit exactly like the live scene's first state, so activating 3D
 * does not visibly jump. Both read their camera from src/data/tooth-views.js.
 *
 * Rendered through headless Chromium, then encoded to AVIF, WebP and PNG with
 * transparency so the poster sits on any background.
 *
 * Requires Playwright and the model:
 *   node scripts/export-glb.mjs && node scripts/render-tooth-poster.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'node:http';
import sharp from 'sharp';
import { chromium } from 'playwright';
import { TOOTH_VIEWS, cameraPosition, SCENE_LIGHT } from '../src/data/tooth-views.js';

const CACHE = '.cache/poster';
const OUT = 'public/images/derived';
const WIDTHS = [640, 900, 1200];
const RENDER_W = 1600, RENDER_H = 1200;   // 4:3, matching the stage

async function stage() {
  await fs.rm(CACHE, { recursive: true, force: true });
  await fs.mkdir(`${CACHE}/vendor`, { recursive: true });
  await fs.mkdir(`${CACHE}/models`, { recursive: true });
  await fs.cp('node_modules/three/build/three.module.js', `${CACHE}/vendor/three.module.js`);
  await fs.cp('node_modules/three/build/three.core.js', `${CACHE}/vendor/three.core.js`);
  await fs.cp('node_modules/three/examples/jsm', `${CACHE}/vendor/jsm`, { recursive: true });
  await fs.cp('public/models/zahn.glb', `${CACHE}/models/zahn.glb`);

  const view = TOOTH_VIEWS.verstehen;
  const [cx, cy, cz] = cameraPosition(view.camera);
  await fs.writeFile(`${CACHE}/index.html`, `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;background:transparent}canvas{display:block}</style>
<script type="importmap">{"imports":{"three":"./vendor/three.module.js","three/addons/":"./vendor/jsm/"}}</script>
<script type="module">
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
const W=${RENDER_W}, H=${RENDER_H};
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setSize(W,H); renderer.setPixelRatio(1);
const L=${JSON.stringify(SCENE_LIGHT)};
renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=L.exposure;
document.body.appendChild(renderer.domElement);
const scene=new THREE.Scene();
const pmrem=new THREE.PMREMGenerator(renderer);
scene.environment=pmrem.fromScene(new RoomEnvironment(),0.04).texture;
scene.environmentIntensity=L.environmentIntensity;
for (const n of ['key','rim','fill']) {
  const d=new THREE.DirectionalLight(L[n].color, L[n].intensity);
  d.position.set(...L[n].position); scene.add(d);
}
const cam=new THREE.PerspectiveCamera(30, W/H, 0.1, 40);
cam.position.set(${cx},${cy},${cz});
cam.lookAt(0, ${view.camera.targetY}, 0);
new GLTFLoader().load('./models/zahn.glb',(g)=>{
  scene.add(g.scene);
  const show=${JSON.stringify(view.show)};
  g.scene.children.forEach(c=>{ c.visible = show.includes(c.name); });
  renderer.render(scene,cam);
  window.__done=true;
},undefined,(e)=>{window.__err=String(e);});
</script>`);
}

function serve(dir, port) {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.glb': 'model/gltf-binary' };
  const server = createServer(async (req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(dir, rel === '/' ? 'index.html' : rel);
    try {
      const body = await fs.readFile(file);
      res.writeHead(200, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404); res.end('not found'); }
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

async function main() {
  await stage();
  const server = await serve(CACHE, 4407);
  const browser = await chromium.launch({ args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage({ viewport: { width: RENDER_W, height: RENDER_H } });
  await page.goto('http://127.0.0.1:4407/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__done || window.__err, null, { timeout: 60000 });
  const err = await page.evaluate(() => window.__err);
  if (err) throw new Error('render failed: ' + err);

  const raw = await page.locator('canvas').screenshot({ omitBackground: true });
  await browser.close();
  server.close();

  await fs.mkdir(OUT, { recursive: true });
  const trimmed = await sharp(raw).trim({ threshold: 1 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  // Put the trimmed subject back on a 4:3 canvas with a little breathing room.
  const boxH = Math.round(meta.height * 1.16);
  const boxW = Math.round((boxH * 4) / 3);
  const framed = await sharp({
    create: { width: boxW, height: boxH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: trimmed, gravity: 'center' }])
    .png()
    .toBuffer();

  const report = [];
  for (const w of WIDTHS) {
    const base = sharp(framed).resize({ width: w });
    for (const [ext, fn] of [
      ['avif', (p) => p.avif({ quality: 58, effort: 6 })],
      ['webp', (p) => p.webp({ quality: 82, alphaQuality: 90 })],
      ['png', (p) => p.png({ compressionLevel: 9, effort: 10 })],
    ]) {
      const file = path.join(OUT, `zahn-poster-${w}.${ext}`);
      await fn(base.clone()).toFile(file);
      report.push([path.basename(file), (await fs.stat(file)).size]);
    }
  }
  const dims = await sharp(framed).metadata();
  console.log(`poster framed at ${dims.width}x${dims.height} (4:3)`);
  for (const [name, size] of report) console.log(`  ${name.padEnd(26)} ${(size / 1024).toFixed(0)} KB`);
}

main().catch((e) => { console.error(e); process.exit(1); });
