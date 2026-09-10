/**
 * Writes public/models/zahn.glb from the parametric geometry.
 *
 * Emits a minimal, valid glTF 2.0 binary: one buffer, one bufferView and accessor
 * per attribute, two PBR materials, three nodes in one scene. No external tooling,
 * so the file is reproducible from source at any time.
 *
 *   node scripts/export-glb.mjs
 */
import fs from 'node:fs/promises';
import { buildTooth, buildCrownShell, finish } from './build-tooth-model.mjs';

const COMPONENT = { FLOAT: 5126, UNSIGNED_SHORT: 5123, UNSIGNED_INT: 5125 };
const TARGET = { ARRAY_BUFFER: 34962, ELEMENT_ARRAY_BUFFER: 34963 };

class GlbBuilder {
  constructor() {
    this.chunks = [];
    this.offset = 0;
    this.json = {
      asset: {
        version: '2.0',
        generator: 'marijan-dental-munich parametric tooth generator',
        copyright: 'Original model created for the Dr. Hrvoje Marijan website concept.',
      },
      scene: 0, scenes: [{ nodes: [] }],
      nodes: [], meshes: [], materials: [],
      accessors: [], bufferViews: [], buffers: [],
    };
  }

  _push(buf, target) {
    while (this.offset % 4 !== 0) { this.chunks.push(Buffer.alloc(1)); this.offset += 1; }
    const view = { buffer: 0, byteOffset: this.offset, byteLength: buf.length };
    if (target) view.target = target;
    this.json.bufferViews.push(view);
    this.chunks.push(buf);
    this.offset += buf.length;
    return this.json.bufferViews.length - 1;
  }

  addVec3(arr, target) {
    const buf = Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
    const view = this._push(Buffer.from(buf), target);
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < arr.length; i += 3)
      for (let k = 0; k < 3; k++) {
        if (arr[i + k] < min[k]) min[k] = arr[i + k];
        if (arr[i + k] > max[k]) max[k] = arr[i + k];
      }
    this.json.accessors.push({
      bufferView: view, componentType: COMPONENT.FLOAT, count: arr.length / 3,
      type: 'VEC3', min, max,
    });
    return this.json.accessors.length - 1;
  }

  addIndices(idx, vertexCount) {
    const wide = vertexCount > 65535;
    const arr = wide ? new Uint32Array(idx) : new Uint16Array(idx);
    const buf = Buffer.from(Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength));
    const view = this._push(buf, TARGET.ELEMENT_ARRAY_BUFFER);
    this.json.accessors.push({
      bufferView: view,
      componentType: wide ? COMPONENT.UNSIGNED_INT : COMPONENT.UNSIGNED_SHORT,
      count: idx.length, type: 'SCALAR',
    });
    return this.json.accessors.length - 1;
  }

  addMaterial(mat) {
    this.json.materials.push(mat);
    return this.json.materials.length - 1;
  }

  addMesh(name, geo, material) {
    const position = this.addVec3(geo.pos, TARGET.ARRAY_BUFFER);
    const normal = this.addVec3(geo.nrm, TARGET.ARRAY_BUFFER);
    const indices = this.addIndices(geo.idx, geo.count);
    this.json.meshes.push({ name, primitives: [{ attributes: { POSITION: position, NORMAL: normal }, indices, material, mode: 4 }] });
    const mesh = this.json.meshes.length - 1;
    this.json.nodes.push({ name, mesh });
    const node = this.json.nodes.length - 1;
    this.json.scenes[0].nodes.push(node);
    return node;
  }

  toBuffer() {
    const bin = Buffer.concat(this.chunks);
    const binPadded = Buffer.concat([bin, Buffer.alloc((4 - (bin.length % 4)) % 4)]);
    this.json.buffers.push({ byteLength: binPadded.length });

    let jsonText = JSON.stringify(this.json);
    while (jsonText.length % 4 !== 0) jsonText += ' ';
    const jsonBuf = Buffer.from(jsonText, 'utf8');

    const header = Buffer.alloc(12);
    header.writeUInt32LE(0x46546c67, 0);           // "glTF"
    header.writeUInt32LE(2, 4);
    header.writeUInt32LE(12 + 8 + jsonBuf.length + 8 + binPadded.length, 8);

    const jsonHead = Buffer.alloc(8);
    jsonHead.writeUInt32LE(jsonBuf.length, 0);
    jsonHead.writeUInt32LE(0x4e4f534a, 4);         // "JSON"

    const binHead = Buffer.alloc(8);
    binHead.writeUInt32LE(binPadded.length, 0);
    binHead.writeUInt32LE(0x004e4942, 4);          // "BIN"

    return Buffer.concat([header, jsonHead, jsonBuf, binHead, binPadded]);
  }
}

const glb = new GlbBuilder();

// Dentin and enamel: warm ivory, matte enough to read as a real tooth.
const dentin = glb.addMaterial({
  name: 'Zahnbein',
  pbrMetallicRoughness: { baseColorFactor: [0.925, 0.882, 0.808, 1], metallicFactor: 0, roughnessFactor: 0.42 },
});
// Prepared stump reads a touch deeper, the way cut dentin does.
const stump = glb.addMaterial({
  name: 'Stumpf',
  pbrMetallicRoughness: { baseColorFactor: [0.878, 0.820, 0.735, 1], metallicFactor: 0, roughnessFactor: 0.52 },
});
// Ceramic: brighter and smoother than dentin.
const ceramic = glb.addMaterial({
  name: 'Keramik',
  pbrMetallicRoughness: { baseColorFactor: [0.960, 0.936, 0.885, 1], metallicFactor: 0, roughnessFactor: 0.22 },
});

glb.addMesh('zahn_intakt', finish(buildTooth('intact')), dentin);
glb.addMesh('zahn_praepariert', finish(buildTooth('prepared')), stump);
glb.addMesh('krone', finish(buildCrownShell()), ceramic);

const out = glb.toBuffer();
await fs.mkdir('public/models', { recursive: true });
await fs.writeFile('public/models/zahn.glb', out);

const { gzipSync } = await import('node:zlib');
console.log(`public/models/zahn.glb  ${(out.length / 1024).toFixed(0)} KB raw, ${(gzipSync(out).length / 1024).toFixed(0)} KB gzipped`);
console.log(`meshes: ${glb.json.meshes.map((m) => m.name).join(', ')}`);
