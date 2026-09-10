/**
 * Builds public/models/zahn.glb — the model behind "Ein Zahn. Drei Perspektiven."
 *
 * The mesh is generated parametrically here rather than downloaded, so the licence
 * is unambiguous: it is original work created for this project.
 *
 * Three meshes share one scene, all in the same coordinate space so they line up:
 *   zahn_intakt       a lower molar: two-lobed root trunk, cervical constriction,
 *                     crown with four cusps, a central fossa and developmental grooves
 *   zahn_praepariert  the same roots under a prepared stump: shortened, tapered,
 *                     with a chamfer margin at the cervical line
 *   krone             a ceramic crown shell whose outside restores the intact
 *                     anatomy and whose inside follows the prepared stump
 *
 * Anatomy is simplified on purpose. The page labels it "Vereinfachte Darstellung".
 *
 *   node scripts/build-tooth-model.mjs
 */
import fs from 'node:fs/promises';

/* ------------------------------------------------------------------ helpers */

/** Catmull-Rom through uniformly spaced control values, t in [0,1]. */
function curve(values, t) {
  const n = values.length - 1;
  const x = Math.max(0, Math.min(1, t)) * n;
  const i = Math.min(n - 1, Math.floor(x));
  const f = x - i;
  const p0 = values[Math.max(0, i - 1)];
  const p1 = values[i];
  const p2 = values[i + 1];
  const p3 = values[Math.min(n, i + 2)];
  return 0.5 * ((2 * p1) + (-p0 + p2) * f + (2 * p0 - 5 * p1 + 4 * p2 - p3) * f * f
    + (-p0 + 3 * p1 - 3 * p2 + p3) * f * f * f);
}

/** Superellipse radius: n=2 is a circle, higher n approaches a rounded square. */
function superellipse(theta, n) {
  const c = Math.abs(Math.cos(theta));
  const s = Math.abs(Math.sin(theta));
  return 1 / Math.pow(Math.pow(c, n) + Math.pow(s, n), 1 / n);
}

/** Shortest angular distance. */
function angDist(a, b) {
  let d = Math.abs(a - b) % (Math.PI * 2);
  return d > Math.PI ? Math.PI * 2 - d : d;
}

/* ---------------------------------------------------------------- anatomy */

const ROOT_LEN = 11.0;
const CROWN_H = 7.5;

// Mesiodistal is wider than buccolingual, so the cross-section is not round.
const MD = 1.0;
const BL = 0.80;

const CROWN_R = [3.35, 4.06, 4.44, 4.60, 4.62, 4.54, 4.42, 4.28, 4.14];
const ROOT_R = [0.20, 0.78, 1.42, 1.96, 2.36, 2.66, 2.92, 3.13, 3.35];

/** Cusps sit over the corners of the rounded-square crown. */
const CUSPS = [
  { a: Math.PI * 0.25, h: 1.38 },
  { a: Math.PI * 0.75, h: 1.20 },
  { a: Math.PI * 1.25, h: 1.16 },
  { a: Math.PI * 1.75, h: 1.32 },
];
/** Developmental grooves run between the cusps. */
const GROOVES = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];

/** How separated the two roots are at height u: 1 near the apices, 0 at the cervix. */
function furcation(u) {
  return Math.pow(Math.max(0, Math.min(1, (0.66 - u) / 0.50)), 0.7);
}

/** Cross-section radius of the root trunk, including the furcation split. */
function rootRadius(theta, u) {
  const trunk = curve(ROOT_R, u);
  const lobe = furcation(u);
  const round = superellipse(theta, 2.5);
  const split = 0.06 + 0.94 * Math.pow(Math.abs(Math.cos(theta)), 0.85);
  return trunk * ((1 - lobe) * round + lobe * split);
}

/** Crown cross-section radius at s in [0,1] from the cervical line upward. */
function crownRadius(theta, s) {
  return curve(CROWN_R, s) * superellipse(theta, 3.3);
}

/** Prepared stump: shorter, tapered, with a chamfer just above the margin. */
const PREP_H = CROWN_H * 0.70;
function prepRadius(theta, s) {
  const full = crownRadius(theta, Math.min(1, s * 0.72));
  const reduce = 0.855 * (1 - 0.11 * s);
  // Chamfer: full width at the margin, easing into the reduced stump.
  const blend = Math.min(1, s / 0.13);
  const eased = blend * blend * (3 - 2 * blend);
  return full * (1 - eased) + full * reduce * eased;
}

/**
 * Height added over the occlusal rim.
 *
 * A gently domed plateau carries four broad cusp mounds; shallow developmental
 * grooves run between them. Everything fades to zero at the rim so the occlusal
 * surface meets the crown wall without a crease.
 */
function occlusalHeight(theta, rho) {
  const r = Math.max(0, Math.min(1, rho));
  const edge = 1 - Math.pow(r, 3.2);              // 0 at the rim, 1 over the table
  const plateau = 0.42 * (1 - Math.pow(r, 2.6));
  // Damped to zero at the very centre so the pole stays radially smooth
  // instead of creasing into a star.
  const band = edge * Math.min(1, r / 0.22)
    * Math.exp(-((r - 0.60) * (r - 0.60)) / (2 * 0.34 * 0.34));
  let h = plateau;
  for (const c of CUSPS) {
    const d = angDist(theta, c.a);
    h += c.h * Math.exp(-(d * d) / (2 * 0.50 * 0.50)) * band;
  }
  for (const g of GROOVES) {
    const d = angDist(theta, g);
    h -= 0.34 * Math.exp(-(d * d) / (2 * 0.26 * 0.26)) * edge;
  }
  return h;
}

/** Occlusal table of the prepared stump: a rounded dome, no cusps. */
function prepTableHeight(rho) {
  return 0.85 * (1 - rho * rho) * 0.9;
}

/**
 * Separates the two root lobes and gives the tooth a slight distal curve.
 * The lobes move apart below the furcation and lean back together at the apices,
 * the way a lower molar's mesial and distal roots do.
 */
function rootOffsetX(theta, u) {
  const spread = furcation(u) * 1.85 * (1 - 0.72 * Math.pow(1 - u, 1.35));
  const side = Math.cos(theta) >= 0 ? 1 : -1;
  return side * spread + Math.pow(1 - u, 2.4) * 0.7;
}

/* ------------------------------------------------------- mesh construction */

const N_THETA = 64;

function makeBuilder() {
  return { pos: [], idx: [] };
}

function ring(b, fn) {
  const start = b.pos.length / 3;
  for (let i = 0; i < N_THETA; i++) {
    const theta = (i / N_THETA) * Math.PI * 2;
    const [x, y, z] = fn(theta);
    b.pos.push(x, y, z);
  }
  return start;
}

function point(b, x, y, z) {
  const i = b.pos.length / 3;
  b.pos.push(x, y, z);
  return i;
}

function stitch(b, a, c, flip = false) {
  for (let i = 0; i < N_THETA; i++) {
    const j = (i + 1) % N_THETA;
    const v0 = a + i, v1 = a + j, v2 = c + j, v3 = c + i;
    if (flip) b.idx.push(v0, v3, v2, v0, v2, v1);
    else b.idx.push(v0, v1, v2, v0, v2, v3);
  }
}

/**
 * Closes the apical end of the root ring with two tips rather than one pole, so
 * the mesial and distal roots each end in their own apex the way a molar's do.
 * The two segments where the halves meet are bridged across.
 */
function closeTwinApex(b, r, ringY) {
  const read = (i) => [b.pos[(r + i) * 3], b.pos[(r + i) * 3 + 1], b.pos[(r + i) * 3 + 2]];
  const centroid = (keep) => {
    let x = 0, z = 0, n = 0;
    for (let i = 0; i < N_THETA; i++) {
      const theta = (i / N_THETA) * Math.PI * 2;
      if (keep(Math.cos(theta))) { const p = read(i); x += p[0]; z += p[2]; n++; }
    }
    return [x / n, z / n];
  };
  const [mx, mz] = centroid((c) => c > 0);
  const [dx, dz] = centroid((c) => c < 0);
  const tipY = ringY - 0.75;
  const apexM = point(b, mx, tipY, mz);
  const apexD = point(b, dx, tipY, dz);

  const apexFor = (i) => {
    const mid = ((i + 0.5) / N_THETA) * Math.PI * 2;
    return Math.cos(mid) >= 0 ? apexM : apexD;
  };
  for (let i = 0; i < N_THETA; i++) {
    const j = (i + 1) % N_THETA;
    b.idx.push(apexFor(i), r + i, r + j);
    const prevApex = apexFor((i - 1 + N_THETA) % N_THETA);
    const here = apexFor(i);
    if (prevApex !== here) b.idx.push(r + i, here, prevApex);
  }
}

function fan(b, apex, r, flip = false) {
  for (let i = 0; i < N_THETA; i++) {
    const j = (i + 1) % N_THETA;
    if (flip) b.idx.push(apex, r + j, r + i);
    else b.idx.push(apex, r + i, r + j);
  }
}

/** Roots plus a crown, closed at both poles. `variant` picks intact or prepared. */
function buildTooth(variant) {
  const b = makeBuilder();
  const prepared = variant === 'prepared';
  const crownH = prepared ? PREP_H : CROWN_H;

  const nRoot = 34, nCrown = 30, nCap = 14;
  let prev = null;

  for (let i = 1; i <= nRoot; i++) {
    const u = i / nRoot;
    const y = u * ROOT_LEN;
    const r = ring(b, (t) => {
      const rad = rootRadius(t, u);
      return [Math.cos(t) * rad * MD + rootOffsetX(t, u), y, Math.sin(t) * rad * BL];
    });
    if (i === 1) closeTwinApex(b, r, y);
    else stitch(b, prev, r);
    prev = r;
  }

  for (let i = 1; i <= nCrown; i++) {
    const s = i / nCrown;
    const y = ROOT_LEN + s * crownH;
    const r = ring(b, (t) => {
      const rad = prepared ? prepRadius(t, s) : crownRadius(t, s);
      return [Math.cos(t) * rad * MD, y, Math.sin(t) * rad * BL];
    });
    stitch(b, prev, r);
    prev = r;
  }

  const rimY = ROOT_LEN + crownH;
  for (let i = 1; i < nCap; i++) {
    const rho = 1 - i / nCap;
    const r = ring(b, (t) => {
      const rad = (prepared ? prepRadius(t, 1) : crownRadius(t, 1)) * rho;
      const h = prepared ? prepTableHeight(rho) : occlusalHeight(t, rho);
      return [Math.cos(t) * rad * MD, rimY + h, Math.sin(t) * rad * BL];
    });
    stitch(b, prev, r);
    prev = r;
  }
  const top = point(b, 0, rimY + (prepared ? prepTableHeight(0) : occlusalHeight(0, 0)), 0);
  fan(b, top, prev);
  return b;
}

/** Ceramic shell: outside restores the anatomy, inside follows the stump. */
function buildCrownShell() {
  const b = makeBuilder();
  const nSide = 30, nCap = 14;
  const marginS = 0.02;
  const GAP = 1.012;

  // Outer wall, from the margin up to the occlusal rim.
  let prev = null;
  const outerBottom = ring(b, (t) => {
    const rad = crownRadius(t, marginS);
    return [Math.cos(t) * rad * MD, ROOT_LEN + marginS * CROWN_H, Math.sin(t) * rad * BL];
  });
  prev = outerBottom;
  for (let i = 1; i <= nSide; i++) {
    const s = marginS + (1 - marginS) * (i / nSide);
    const y = ROOT_LEN + s * CROWN_H;
    const r = ring(b, (t) => {
      const rad = crownRadius(t, s);
      return [Math.cos(t) * rad * MD, y, Math.sin(t) * rad * BL];
    });
    stitch(b, prev, r);
    prev = r;
  }
  const rimY = ROOT_LEN + CROWN_H;
  for (let i = 1; i < nCap; i++) {
    const rho = 1 - i / nCap;
    const r = ring(b, (t) => {
      const rad = crownRadius(t, 1) * rho;
      return [Math.cos(t) * rad * MD, rimY + occlusalHeight(t, rho), Math.sin(t) * rad * BL];
    });
    stitch(b, prev, r);
    prev = r;
  }
  const top = point(b, 0, rimY + occlusalHeight(0, 0), 0);
  fan(b, top, prev);

  // Inner cavity, wound the other way so it faces inward.
  const innerBottom = ring(b, (t) => {
    const rad = prepRadius(t, marginS) * GAP;
    return [Math.cos(t) * rad * MD, ROOT_LEN + marginS * CROWN_H, Math.sin(t) * rad * BL];
  });
  prev = innerBottom;
  for (let i = 1; i <= nSide; i++) {
    const s = marginS + (1 - marginS) * (i / nSide);
    const y = ROOT_LEN + s * PREP_H;
    const r = ring(b, (t) => {
      const rad = prepRadius(t, s) * GAP;
      return [Math.cos(t) * rad * MD, y, Math.sin(t) * rad * BL];
    });
    stitch(b, prev, r, true);
    prev = r;
  }
  const capY = ROOT_LEN + PREP_H;
  for (let i = 1; i < nCap; i++) {
    const rho = 1 - i / nCap;
    const r = ring(b, (t) => {
      const rad = prepRadius(t, 1) * GAP * rho;
      return [Math.cos(t) * rad * MD, capY + prepTableHeight(rho) * GAP, Math.sin(t) * rad * BL];
    });
    stitch(b, prev, r, true);
    prev = r;
  }
  const innerTop = point(b, 0, capY + prepTableHeight(0) * GAP, 0);
  fan(b, innerTop, prev, true);

  // Rim closing outer and inner at the margin.
  stitch(b, outerBottom, innerBottom, true);
  return b;
}

/* ------------------------------------------------------------- finishing */

function smoothNormals(pos, idx) {
  const n = new Float32Array(pos.length);
  for (let i = 0; i < idx.length; i += 3) {
    const [a, b, c] = [idx[i] * 3, idx[i + 1] * 3, idx[i + 2] * 3];
    const ux = pos[b] - pos[a], uy = pos[b + 1] - pos[a + 1], uz = pos[b + 2] - pos[a + 2];
    const vx = pos[c] - pos[a], vy = pos[c + 1] - pos[a + 1], vz = pos[c + 2] - pos[a + 2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    for (const o of [a, b, c]) { n[o] += nx; n[o + 1] += ny; n[o + 2] += nz; }
  }
  for (let i = 0; i < n.length; i += 3) {
    const l = Math.hypot(n[i], n[i + 1], n[i + 2]) || 1;
    n[i] /= l; n[i + 1] /= l; n[i + 2] /= l;
  }
  return n;
}

/** Centre on the origin and scale so the whole tooth is about one unit tall. */
const TOTAL_H = ROOT_LEN + CROWN_H + 1.6;
const SCALE = 1 / TOTAL_H;
const Y_SHIFT = -(ROOT_LEN + CROWN_H * 0.62);

function finish(b) {
  // The ring/stitch parameterisation winds clockwise seen from outside, which
  // leaves every face back-facing. Reverse each triangle once, here, so both the
  // winding and the normals derived from it come out facing outward.
  const idx = new Array(b.idx.length);
  for (let i = 0; i < b.idx.length; i += 3) {
    idx[i] = b.idx[i];
    idx[i + 1] = b.idx[i + 2];
    idx[i + 2] = b.idx[i + 1];
  }
  const pos = new Float32Array(b.pos.length);
  for (let i = 0; i < b.pos.length; i += 3) {
    pos[i] = b.pos[i] * SCALE;
    pos[i + 1] = (b.pos[i + 1] + Y_SHIFT) * SCALE;
    pos[i + 2] = b.pos[i + 2] * SCALE;
  }
  return { pos, nrm: smoothNormals(pos, idx), idx, count: pos.length / 3 };
}

export { buildTooth, buildCrownShell, finish };
