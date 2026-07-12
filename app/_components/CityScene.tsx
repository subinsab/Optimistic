"use client";

import { useMemo, useRef, useLayoutEffect, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ════════════════════════════════════════════════════════════════
   Live voxel city — monochrome architectural miniature.
   One-point perspective down the central avenue; Empire-style
   landmark dead center, skyline height falls off radially.
   ════════════════════════════════════════════════════════════════ */
const GZ = 14;                       // rows (depth, z)
const GX = Math.round(GZ * 1.3);     // columns (width, x) — ~30% wider
const P = 20;                        // plot pitch
const HALFX = (GX / 2) * P, HALFZ = (GZ / 2) * P;
const ROADSX = Array.from({ length: GX + 1 }, (_, i) => (i - GX / 2) * P); // vertical roads (x lines)
const ROADSZ = Array.from({ length: GZ + 1 }, (_, i) => (i - GZ / 2) * P); // horizontal roads (z lines)
const PLOTSX = Array.from({ length: GX }, (_, i) => (i + 0.5 - GX / 2) * P);
const PLOTSZ = Array.from({ length: GZ }, (_, i) => (i + 0.5 - GZ / 2) * P);
const WRAPX = HALFX + 6, WRAPZ = HALFZ + 6;
const SPANX = GX * P + P, SPANZ = GZ * P + P;

/* monochrome architectural palette — grayscale only; warmth lives in
   the sparse lit windows + street lamps, not in surfaces */
const C = {
  base: "#2b2d31", baseSide: "#1c1d21", road: "#17181c", line: "#8f9298",
  cream: "#47494e", white: "#55575c", paleBlue: "#3a3c41", slate: "#232529", beige: "#3f4146",
  glass: "#131418", glassBlue: "#1f2126", roof: "#4f5157", entrance: "#5a5c62",
  leaf: "#383b40", leaf2: "#2f3237", trunk: "#2b2d31", grass: "#2e3034", path: "#4f5157", skin: "#9a9ca2",
};
// building crowns / people tops — grayscale, one muted warm accent
const TOPS = ["#c47a2e", "#7a7d84", "#8a8d94", "#5c5f65", "#6a6d73", "#9a9da3"];
const LIT = "#ffdcae"; // warm lit-window tint (multiplied by facade color)

const dummy = new THREE.Object3D();
const tmp = new THREE.Color();
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(a: T[]) => a[(Math.random() * a.length) | 0];

function signal(t: number) {
  const p = t % 14;
  if (p < 6) return { x: true, z: false, amber: false };
  if (p < 7) return { x: false, z: false, amber: true };
  if (p < 13) return { x: false, z: true, amber: false };
  return { x: false, z: false, amber: true };
}

function texSettings(t: THREE.CanvasTexture) {
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.generateMipmaps = false;
  return t;
}

/* scattered-window facade tile: small windows at random cells with
   positional jitter — irregular, not a uniform grid. White bg — the
   texture multiplies with the (light grey) facade color. */
function makeGridTex(cols = 6, rows = 9, litP = 0.04, fillP = 0.34) {
  const cs = 12;
  const cv = document.createElement("canvas"); cv.width = cols * cs; cv.height = rows * cs;
  const x = cv.getContext("2d")!;
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, cv.width, cv.height);
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    if (Math.random() > fillP) continue;
    const w = 4 + ((Math.random() * 2) | 0), h = 4 + ((Math.random() * 2) | 0);
    const px = i * cs + 1 + Math.random() * (cs - w - 2);
    const py = j * cs + 1 + Math.random() * (cs - h - 2);
    x.fillStyle = Math.random() < litP ? LIT : "#1b1c1f";
    x.fillRect(px | 0, py | 0, w, h);
  }
  return texSettings(new THREE.CanvasTexture(cv));
}
/* vertical pilaster strip for generic towers */
function makeStripTex() {
  const cv = document.createElement("canvas"); cv.width = 32; cv.height = 8;
  const x = cv.getContext("2d")!;
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, 32, 8);
  x.fillStyle = "#16181c"; x.fillRect(8, 0, 16, 8);
  x.strokeStyle = "#b9bcc4"; x.lineWidth = 2; x.strokeRect(8, 0, 16, 8);
  return texSettings(new THREE.CanvasTexture(cv));
}
/* pre-baked dark-tower facade (own colors, material stays white — lit
   windows survive on dark bodies where a multiply map would crush them) */
function makeDarkTowerTex(cols = 5, rows = 8, litP = 0.03, fillP = 0.34) {
  const cs = 12;
  const cv = document.createElement("canvas"); cv.width = cols * cs; cv.height = rows * cs;
  const x = cv.getContext("2d")!;
  x.fillStyle = "#26282e"; x.fillRect(0, 0, cv.width, cv.height);
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    if (Math.random() > fillP) continue;
    const w = 4 + ((Math.random() * 2) | 0), h = 4 + ((Math.random() * 2) | 0);
    const px = i * cs + 1 + Math.random() * (cs - w - 2);
    const py = j * cs + 1 + Math.random() * (cs - h - 2);
    x.fillStyle = Math.random() < litP ? "#b8713a" : "#15171b";
    x.fillRect(px | 0, py | 0, w, h);
  }
  return texSettings(new THREE.CanvasTexture(cv));
}

function box(args: [number, number, number], pos: [number, number, number], color: string, key?: number) {
  return <mesh key={key} position={pos} castShadow receiveShadow><boxGeometry args={args} /><meshStandardMaterial color={color} roughness={0.9} metalness={0.04} /></mesh>;
}

/* ── instanced static parts ───────────────────────────────────── */
type Obj = { pos: [number, number, number]; rotY: number; color?: string };
type Part = { size: [number, number, number]; off: [number, number, number]; color: string; emissive?: number; tint?: boolean };
function PartMesh({ objects, part, shadow }: { objects: Obj[]; part: Part; shadow?: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const m = ref.current; if (!m) return;
    objects.forEach((o, i) => {
      const ca = Math.cos(o.rotY), sa = Math.sin(o.rotY);
      dummy.position.set(o.pos[0] + part.off[0] * ca - part.off[2] * sa, o.pos[1] + part.off[1], o.pos[2] + part.off[0] * sa + part.off[2] * ca);
      dummy.rotation.set(0, o.rotY, 0); dummy.scale.set(...part.size); dummy.updateMatrix(); m.setMatrixAt(i, dummy.matrix);
      if (part.tint) { tmp.set(o.color || part.color); m.setColorAt(i, tmp); }
    });
    m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [objects, part]);
  if (!objects.length) return null;
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, objects.length]} castShadow={shadow} receiveShadow={shadow}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={part.tint ? "#fff" : part.color} roughness={0.9} metalness={0.04} emissive={part.emissive ? part.color : "#000"} emissiveIntensity={part.emissive ?? 0} />
    </instancedMesh>
  );
}
const InstGroup = ({ objects, parts, shadow }: { objects: Obj[]; parts: Part[]; shadow?: boolean }) =>
  <>{parts.map((p, i) => <PartMesh key={i} objects={objects} part={p} shadow={shadow} />)}</>;

/* ── base + roads + zebra/dashes ──────────────────────────────── */
function Ground() {
  const dashes = useMemo<Obj[]>(() => {
    const o: Obj[] = [];
    ROADSZ.forEach((c) => { for (let a = -HALFX; a < HALFX; a += 6) o.push({ pos: [a, 0.06, c], rotY: 0 }); });
    ROADSX.forEach((c) => { for (let a = -HALFZ; a < HALFZ; a += 6) o.push({ pos: [c, 0.06, a], rotY: Math.PI / 2 }); });
    return o;
  }, []);
  const zebra = useMemo<Obj[]>(() => {
    const o: Obj[] = [];
    ROADSX.forEach((cx2) => ROADSZ.forEach((cz) => {
      for (let k = -2.2; k <= 2.2; k += 1.1) { o.push({ pos: [cx2 + 6, 0.06, cz + k], rotY: 0 }); o.push({ pos: [cx2 + k, 0.06, cz + 6], rotY: Math.PI / 2 }); }
    }));
    return o;
  }, []);
  return (
    <group>
      {/* huge ground that fills the whole viewport floor (fog fades it to bg) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]}><planeGeometry args={[5000, 5000]} /><meshStandardMaterial color="#0e0f12" roughness={1} /></mesh>
      <mesh position={[0, -2, 0]} receiveShadow><boxGeometry args={[SPANX, 4, SPANZ]} /><meshStandardMaterial color={C.base} roughness={1} /></mesh>
      <mesh position={[0, -4.2, 0]}><boxGeometry args={[SPANX - 2, 0.6, SPANZ - 2]} /><meshStandardMaterial color={C.baseSide} roughness={1} /></mesh>
      {ROADSZ.map((c, i) => (
        <mesh key={"h" + i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, c]} receiveShadow><planeGeometry args={[SPANX, i % 2 === 0 ? 6 : 4]} /><meshStandardMaterial color={C.road} roughness={1} /></mesh>
      ))}
      {ROADSX.map((c, i) => (
        <mesh key={"v" + i} rotation={[-Math.PI / 2, 0, 0]} position={[c, 0.03, 0]} receiveShadow><planeGeometry args={[i % 2 === 0 ? 6 : 4, SPANZ]} /><meshStandardMaterial color={C.road} roughness={1} /></mesh>
      ))}
      <InstGroup objects={dashes} parts={[{ size: [1.6, 0.04, 0.18], off: [0, 0, 0], color: C.line }]} />
      <InstGroup objects={zebra} parts={[{ size: [0.4, 0.04, 0.7], off: [0, 0, 0], color: C.line }]} />
    </group>
  );
}

/* ── building types ───────────────────────────────────────────── */
/* windows on the 4 side faces only — roof (+y) and underside (-y) stay plain
   (BoxGeometry material order: 0 +x, 1 -x, 2 +y, 3 -y, 4 +z, 5 -z) */
function facade(args: [number, number, number], pos: [number, number, number], color: string, tex: THREE.Texture, key?: number) {
  return (
    <mesh key={key} position={pos} castShadow receiveShadow>
      <boxGeometry args={args} />
      {[0, 1, 4, 5].map((f) => (
        <meshStandardMaterial key={f} attach={`material-${f}`} map={tex} color={color} roughness={0.88} metalness={0.04} />
      ))}
      <meshStandardMaterial attach="material-2" color={color} roughness={0.9} metalness={0.04} />
      <meshStandardMaterial attach="material-3" color={color} roughness={0.9} metalness={0.04} />
    </mesh>
  );
}
const entranceParts = (fw: number, key = 80) => [
  box([2.6, 2.4, 1.2], [0, 1.2, fw / 2 + 0.2], C.entrance, key),
  box([3, 0.5, 1.9], [0, 0.25, fw / 2 + 0.7], C.entrance, key + 1),
];
type Bld = { x: number; z: number; fw: number; h: number; col: string; type: "small" | "office" | "tower" | "shop"; rot: number };
function bSmall(b: Bld, grid: THREE.Texture) {
  const { fw, h, col } = b;
  return [facade([fw, h, fw], [0, h / 2, 0], col, grid, 1), box([fw * 0.34, 1, fw * 0.34], [fw * 0.16, h + 0.5, -fw * 0.16], C.roof, 2), ...entranceParts(fw)];
}
function bOffice(b: Bld, grid: THREE.Texture) {
  const { fw, h, col } = b; const sh = h + 2.5;
  return [facade([fw, h, fw * 0.82], [0, h / 2, 0], col, grid, 1), facade([fw * 0.28, sh, fw * 0.28], [fw * 0.42, sh / 2, 0], C.paleBlue, grid, 2), box([fw * 0.34, 1, fw * 0.5], [0, h + 0.5, -fw * 0.18], C.roof, 3), ...entranceParts(fw * 0.82)];
}
function bTower(b: Bld, strip: THREE.Texture) {
  const { fw, h, col } = b; const w = fw * 0.84;
  return [facade([w, h, w], [0, h / 2, 0], col, strip, 1), facade([w * 0.7, h * 0.16, w * 0.7], [0, h + h * 0.08, 0], col, strip, 2), box([w * 0.34, 1.4, w * 0.34], [0, h + h * 0.16 + 0.7, 0], C.roof, 3), ...entranceParts(w)];
}
function bShop(b: Bld) {
  const n = Math.random() < 0.5 ? 2 : 3;
  const uw = (b.fw + 1.6) / n;
  const dep = Math.min(uw * 0.95, 3.8);
  const h = rand(2.8, 3.6);
  const bodyCols = [C.cream, C.white, C.beige, "#50525a", C.paleBlue];
  const awns = ["#45484e", "#3c3f45", "#4f5258", "#565960"];
  const out: React.ReactNode[] = [];
  for (let u = 0; u < n; u++) {
    const cx = (u - (n - 1) / 2) * uw, col = pick(bodyCols), awn = pick(awns), fz = dep / 2, key = u * 20;
    out.push(box([uw - 0.12, h, dep], [cx, h / 2, 0], col, key));
    out.push(box([uw * 0.86, 0.6, 0.12], [cx, h * 0.78, fz + 0.05], "#2a2c31", key + 1));
    out.push(box([uw * 0.3, 0.55, uw * 0.3], [cx + uw * 0.16, h + 0.28, -dep * 0.16], C.roof, key + 2));
    const sn = 4;
    for (let k = 0; k < sn; k++) { const w = (uw * 0.86) / sn; out.push(box([w, 0.24, 0.9], [cx + (k - (sn - 1) / 2) * w, h * 0.6, fz + 0.45], k % 2 ? "#6f7278" : awn, key + 3 + k)); }
    out.push(box([0.7, 0.5, 0.55], [cx - uw * 0.2, 0.26, fz + 0.35], pick(awns), key + 9));
  }
  return out;
}
function BuildingsVaried({ list }: { list: Bld[] }) {
  // a few grid variants so the sparse lit windows don't repeat building to building
  const grids = useMemo(() => [0, 1, 2].map(() => { const t = makeGridTex(); t.repeat.set(1, 1); return t; }), []);
  const strip = useMemo(() => { const t = makeStripTex(); t.repeat.set(6, 1); return t; }, []);
  const nodes = useMemo(() => list.map((b, i) => {
    const grid = grids[i % grids.length];
    const parts = b.type === "tower" ? bTower(b, strip) : b.type === "office" ? bOffice(b, grid) : b.type === "shop" ? bShop(b) : bSmall(b, grid);
    return <group key={i} position={[b.x, 0, b.z]} rotation={[0, b.rot, 0]}>{parts}</group>;
  }), [list, grids, strip]);
  return <>{nodes}</>;
}

/* ── skyline landmarks ────────────────────────────────────────── */
/* Empire-style centered landmark: setback tiers + crown + lit spire */
function Landmark({ x, z }: { x: number; z: number }) {
  const tex = useMemo(() => { const t = makeGridTex(6, 10, 0.05); t.repeat.set(1, 1); return t; }, []);
  // [width, height] per tier, stacked
  const tiers: [number, number][] = [[17, 16], [14, 13], [11, 14], [8, 12], [5.5, 8]];
  let y = 0;
  const stack = tiers.map(([w, h], i) => {
    const el = facade([w, h, w], [0, y + h / 2, 0], C.white, tex, i);
    y += h;
    return el;
  });
  return (
    <group position={[x, 0, z]}>
      {/* plaza base (tower straddles the central avenue) */}
      {box([21, 1.2, 21], [0, 0.6, 0], C.baseSide, 90)}
      {stack}
      {/* crown + spire with warm beacon */}
      {box([3.6, 4, 3.6], [0, y + 2, 0], C.white, 60)}
      {box([1.8, 2.6, 1.8], [0, y + 5.3, 0], C.roof, 61)}
      {box([0.8, 9, 0.8], [0, y + 11.1, 0], C.roof, 62)}
      <mesh position={[0, y + 15.9, 0]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color="#ffcf8a" emissive="#ffcf8a" emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}
/* dark flanking tower: baked lit-window facade + setback top */
function SlateTower({ x, z, h = 34 }: { x: number; z: number; h?: number }) {
  const tex = useMemo(() => { const t = makeDarkTowerTex(); t.repeat.set(1, Math.max(1, Math.round(h / 16))); return t; }, [h]);
  const w = 8.5, tw = 6, th = h * 0.2;
  return (
    <group position={[x, 0, z]}>
      <mesh castShadow receiveShadow position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, w]} />
        {[0, 1, 4, 5].map((f) => (
          <meshStandardMaterial key={f} attach={`material-${f}`} map={tex} color="#ffffff" roughness={0.88} metalness={0.04} />
        ))}
        <meshStandardMaterial attach="material-2" color="#2c2e34" roughness={0.9} metalness={0.04} />
        <meshStandardMaterial attach="material-3" color="#2c2e34" roughness={0.9} metalness={0.04} />
      </mesh>
      <mesh castShadow position={[0, h + th / 2, 0]}>
        <boxGeometry args={[tw, th, tw]} />
        {[0, 1, 4, 5].map((f) => (
          <meshStandardMaterial key={f} attach={`material-${f}`} map={tex} color="#ffffff" roughness={0.88} metalness={0.04} />
        ))}
        <meshStandardMaterial attach="material-2" color="#2c2e34" roughness={0.9} metalness={0.04} />
        <meshStandardMaterial attach="material-3" color="#2c2e34" roughness={0.9} metalness={0.04} />
      </mesh>
      {box([3.6, 1.6, 3.6], [0, h + th + 0.8, 0], C.roof)}
    </group>
  );
}

/* ── park ─────────────────────────────────────────────────────── */
function Park({ x, z }: { x: number; z: number }) {
  const hedges = useMemo<Obj[]>(() => {
    const o: Obj[] = [];
    for (let a = -8; a <= 8; a += 2) { o.push({ pos: [x + a, 0.4, z - 8], rotY: 0 }); o.push({ pos: [x + a, 0.4, z + 8], rotY: 0 }); o.push({ pos: [x - 8, 0.4, z + a], rotY: 0 }); o.push({ pos: [x + 8, 0.4, z + a], rotY: 0 }); }
    return o;
  }, [x, z]);
  return (
    <group>
      <mesh position={[x, 0.2, z]} receiveShadow><boxGeometry args={[20, 0.4, 20]} /><meshStandardMaterial color={C.grass} roughness={1} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.42, z]}><planeGeometry args={[3, 20]} /><meshStandardMaterial color={C.path} roughness={1} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.42, z]}><planeGeometry args={[20, 3]} /><meshStandardMaterial color={C.path} roughness={1} /></mesh>
      {box([3, 0.6, 3], [x, 0.7, z], C.roof)}
      <mesh position={[x, 4, z]} castShadow><boxGeometry args={[1.6, 7, 1.6]} /><meshStandardMaterial color={C.white} roughness={0.85} /></mesh>
      <mesh position={[x, 7.8, z]} castShadow><boxGeometry args={[0.7, 1.2, 0.7]} /><meshStandardMaterial color={C.white} roughness={0.85} /></mesh>
      <InstGroup objects={hedges} parts={[{ size: [2, 0.8, 1], off: [0, 0, 0], color: C.leaf2 }]} />
    </group>
  );
}

/* ── trees ────────────────────────────────────────────────────── */
const Trees = ({ small, big }: { small: Obj[]; big: Obj[] }) => (
  <>
    <InstGroup objects={small} parts={[
      { size: [0.6, 1.4, 0.6], off: [0, 0.7, 0], color: C.trunk },
      { size: [2, 1.6, 2], off: [0, 2, 0], color: C.leaf },
      { size: [1.2, 1.2, 1.2], off: [0, 3, 0], color: C.leaf2 },
    ]} />
    <InstGroup objects={big} parts={[
      { size: [1, 2.4, 1], off: [0, 1.2, 0], color: C.trunk },
      { size: [3.4, 2, 3.4], off: [0, 3.2, 0], color: C.leaf2 },
      { size: [2.4, 1.6, 2.4], off: [0, 4.6, 0], color: C.leaf },
    ]} />
  </>
);

/* ── people (slow, instanced) ─────────────────────────────────── */
function People({ count = 140 }: { count?: number }) {
  const legs = useRef<THREE.InstancedMesh>(null), torso = useRef<THREE.InstancedMesh>(null), head = useRef<THREE.InstancedMesh>(null);
  const peeps = useMemo(() => Array.from({ length: count }, () => {
    const axis: "x" | "z" = Math.random() < 0.5 ? "x" : "z";
    const lane = (axis === "x" ? pick(ROADSZ) : pick(ROADSX)) + (Math.random() < 0.5 ? 4.7 : -4.7);
    return { axis, lane, dir: Math.random() < 0.5 ? 1 : -1, pos: rand(-HALFX, HALFX), spd: rand(0.5, 1.0), bob: rand(0, 6.28), top: pick(TOPS) };
  }), [count]);
  useLayoutEffect(() => {
    if (torso.current) { peeps.forEach((p, i) => { tmp.set(p.top); torso.current!.setColorAt(i, tmp); }); if (torso.current.instanceColor) torso.current.instanceColor.needsUpdate = true; }
  }, [peeps]);
  useFrame(({ clock }, dt) => {
    // integrate every frame with real delta time, so motion is frame-rate
    // independent and stays smooth at any refresh rate (60/120Hz). Clamp the
    // step so a background-tab stall can never teleport anyone.
    const d = Math.min(dt, 0.05);
    peeps.forEach((p, i) => {
      const wrap = p.axis === "x" ? WRAPX : WRAPZ;
      p.pos += p.dir * p.spd * d; if (p.pos > wrap) p.pos = -wrap; if (p.pos < -wrap) p.pos = wrap;
      const by = Math.abs(Math.sin(clock.elapsedTime * 4 + p.bob)) * 0.16;
      const px = p.axis === "x" ? p.pos : p.lane, pz = p.axis === "x" ? p.lane : p.pos;
      const set = (m: THREE.InstancedMesh | null, y: number, s: [number, number, number]) => { if (!m) return; dummy.position.set(px, y + by, pz); dummy.rotation.set(0, 0, 0); dummy.scale.set(...s); dummy.updateMatrix(); m.setMatrixAt(i, dummy.matrix); };
      set(legs.current, 0.7, [0.8, 1.4, 0.8]); set(torso.current, 1.8, [0.9, 1.0, 0.7]); set(head.current, 2.6, [0.7, 0.7, 0.7]);
    });
    [legs, torso, head].forEach((r) => { if (r.current) r.current.instanceMatrix.needsUpdate = true; });
  });
  return (
    <>
      <instancedMesh ref={legs} args={[undefined, undefined, count]}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#39414b" roughness={0.9} /></instancedMesh>
      <instancedMesh ref={torso} args={[undefined, undefined, count]}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#fff" roughness={0.85} /></instancedMesh>
      <instancedMesh ref={head} args={[undefined, undefined, count]}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color={C.skin} roughness={0.8} /></instancedMesh>
    </>
  );
}

/* ── vehicles (with tyres) ────────────────────────────────────── */
const TYRE = "#141418";
function tyres4(wx: number, wz: number, wr = 0.5, ww = 0.3) {
  const s: [number, number, number] = [wr, wr, ww];
  return [box(s, [wx, wr / 2, wz], TYRE, 70), box(s, [wx, wr / 2, -wz], TYRE, 71), box(s, [-wx, wr / 2, wz], TYRE, 72), box(s, [-wx, wr / 2, -wz], TYRE, 73)];
}
function Car({ c }: { c: string }) { return (<group>{box([3, 0.9, 2], [0, 0.6, 0], c)}{box([1.8, 0.9, 1.8], [-0.2, 1.4, 0], C.glass)}{box([0.6, 0.18, 0.18], [1.55, 0.55, 0.6], C.line)}{box([0.6, 0.18, 0.18], [1.55, 0.55, -0.6], C.line)}{tyres4(0.95, 0.95, 0.5, 0.28)}</group>); }
function Bus({ c }: { c: string }) { return (<group>{box([6, 2.4, 2], [0, 1.5, 0], c)}{box([6.05, 0.7, 2.06], [0, 2.0, 0], C.glass)}{tyres4(2.0, 0.98, 0.7, 0.34)}</group>); }
function Auto() { return (<group>{box([2.6, 1.2, 1.8], [0, 0.95, 0], C.leaf)}{box([2.6, 0.9, 1.85], [0, 1.55, 0], "#8a8d94")}{box([2.7, 0.5, 1.9], [0, 2.15, 0], "#1a1a1a")}{box([0.5, 0.2, 0.2], [1.35, 0.75, 0.45], C.line)}{box([0.55, 0.55, 0.3], [1.0, 0.27, 0], TYRE, 70)}{box([0.55, 0.55, 0.3], [-0.85, 0.27, 0.85], TYRE, 71)}{box([0.55, 0.55, 0.3], [-0.85, 0.27, -0.85], TYRE, 72)}</group>); }
function Van({ c }: { c: string }) { return (<group>{box([3.4, 1.8, 2], [0, 1.2, 0], c)}{box([3.45, 0.7, 2.05], [0.3, 1.7, 0], C.glass)}{tyres4(1.1, 0.98, 0.56, 0.3)}</group>); }
function Moto({ c }: { c: string }) { return (<group>{box([1.9, 0.5, 0.55], [0, 0.62, 0], c)}{box([0.65, 0.6, 0.5], [-0.35, 1.1, 0], C.glass)}{box([0.35, 0.16, 0.16], [1.0, 0.55, 0], C.line)}{box([0.56, 0.56, 0.24], [0.72, 0.28, 0], TYRE, 70)}{box([0.56, 0.56, 0.24], [-0.72, 0.28, 0], TYRE, 71)}</group>); }

type Veh = { kind: string; len: number; axis: "x" | "z"; lane: number; dir: number; pos: number; spd: number; color: string; laneId: string };
const VLEN: Record<string, number> = { car: 3, bus: 6, van: 3.4, auto: 2.6, moto: 2 };
const ROADDIR = (i: number) => (i % 2 === 0 ? 1 : -1);
const VCOLS = ["#9a9da3", "#6c6f75", "#84878d", "#3a3d45", "#75787e", "#54575d", "#5e6167", "#484b51", "#8a8d93", "#a0a2a8", "#64676d"];
const BUS_COLS = ["#54575d", "#464950"];
const vcolor = (kind: string) => (kind === "bus" ? pick(BUS_COLS) : pick(VCOLS));

function Traffic() {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const { list, groups } = useMemo(() => {
    const list: Veh[] = [];
    const spawnLane = (axis: "x" | "z", ri: number) => {
      const roadsAlong = axis === "x" ? ROADSZ : ROADSX; // lane sits on the perpendicular road set
      const dir = ROADDIR(ri); const lane = roadsAlong[ri]; const laneId = `${axis}-${ri}`;
      const half = axis === "x" ? HALFX : HALFZ;
      let p = -half + rand(0, 12);
      while (p < half) {
        const r = Math.random();
        const kind = r < 0.1 ? "bus" : r < 0.18 ? "van" : r < 0.32 ? "auto" : r < 0.46 ? "moto" : "car";
        const len = VLEN[kind];
        list.push({ kind, len, axis, lane, dir, pos: p, spd: kind === "bus" ? rand(2.6, 3.4) : rand(3.4, 5), color: vcolor(kind), laneId });
        p += len + rand(22, 40);
      }
    };
    for (let ri = 0; ri < ROADSZ.length; ri += 2) spawnLane("x", ri); // x-travel on horizontal roads
    for (let ri = 0; ri < ROADSX.length; ri += 2) spawnLane("z", ri); // z-travel on vertical roads
    const groups: Record<string, number[]> = {};
    list.forEach((v, i) => { (groups[v.laneId] ||= []).push(i); });
    return { list, groups };
  }, []);

  useFrame(({ clock }, dt) => {
    // integrate every frame with real delta time so vehicles move smoothly at
    // any refresh rate. Clamp the step to survive a background-tab stall.
    const d = Math.min(dt, 0.05); const s = signal(clock.elapsedTime);
    list.forEach((v) => {
      const go = v.axis === "x" ? s.x : s.z;
      const cross = v.axis === "x" ? ROADSX : ROADSZ; // perpendicular crossings
      let next = v.pos + v.dir * v.spd * d;
      if (!go) {
        let stop: number | null = null;
        for (const sc of cross) { const ln = sc - v.dir * (3 + v.len / 2); if (v.dir > 0 && ln >= v.pos - 0.02 && (stop === null || ln < stop)) stop = ln; if (v.dir < 0 && ln <= v.pos + 0.02 && (stop === null || ln > stop)) stop = ln; }
        if (stop !== null) next = v.dir > 0 ? Math.min(next, stop) : Math.max(next, stop);
      }
      v.pos = next;
    });
    for (const id in groups) {
      const idxs = groups[id]; if (idxs.length < 2) continue;
      const dir = list[idxs[0]].dir;
      idxs.sort((a, b) => (dir > 0 ? list[b].pos - list[a].pos : list[a].pos - list[b].pos));
      for (let k = 1; k < idxs.length; k++) { const v = list[idxs[k]], ah = list[idxs[k - 1]]; const gap = (v.len + ah.len) / 2 + 1.8; if (dir > 0) v.pos = Math.min(v.pos, ah.pos - gap); else v.pos = Math.max(v.pos, ah.pos + gap); }
    }
    list.forEach((v, i) => {
      const g = refs.current[i]; if (!g) return;
      const wrap = v.axis === "x" ? WRAPX : WRAPZ;
      if (v.pos > wrap) v.pos = -wrap; if (v.pos < -wrap) v.pos = wrap;
      if (v.axis === "x") { g.position.set(v.pos, 0, v.lane); g.rotation.y = v.dir > 0 ? 0 : Math.PI; }
      else { g.position.set(v.lane, 0, v.pos); g.rotation.y = v.dir > 0 ? -Math.PI / 2 : Math.PI / 2; }
    });
  });

  return (
    <group>
      {list.map((v, i) => (
        <group key={i} ref={(el) => { refs.current[i] = el; }}>
          {v.kind === "car" && <Car c={v.color} />}{v.kind === "bus" && <Bus c={v.color} />}{v.kind === "auto" && <Auto />}{v.kind === "van" && <Van c={v.color} />}{v.kind === "moto" && <Moto c={v.color} />}
        </group>
      ))}
    </group>
  );
}

/* ── traffic light (two-sided, cycles — monochrome, reads as blinking dots) ── */
function TrafficLight({ x, z }: { x: number; z: number }) {
  const r = useRef<THREE.MeshStandardMaterial>(null), a = useRef<THREE.MeshStandardMaterial>(null), g = useRef<THREE.MeshStandardMaterial>(null);
  const r2 = useRef<THREE.MeshStandardMaterial>(null), a2 = useRef<THREE.MeshStandardMaterial>(null), g2 = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    const s = signal(clock.elapsedTime); const st = s.x ? 0 : s.amber ? 1 : 2;
    const set = (m: React.RefObject<THREE.MeshStandardMaterial | null>, on: boolean) => { if (m.current) m.current.emissiveIntensity = on ? 1.2 : 0.05; };
    set(g, st === 0); set(g2, st === 0); set(a, st === 1); set(a2, st === 1); set(r, st === 2); set(r2, st === 2);
  });
  return (
    <group position={[x, 0, z]}>
      {box([0.4, 0.3, 0.4], [0, 0.15, 0], "#2a2d35")}
      <mesh position={[0, 2, 0]} castShadow><boxGeometry args={[0.4, 3.6, 0.4]} /><meshStandardMaterial color="#7c7f85" roughness={0.6} /></mesh>
      {box([0.7, 1.5, 0.5], [0, 4.4, 0], "#1a1d26")}
      <mesh position={[0, 4.85, 0.28]}><boxGeometry args={[0.26, 0.26, 0.18]} /><meshStandardMaterial ref={r} color="#4a4c52" emissive="#cfd2d8" emissiveIntensity={0.05} /></mesh>
      <mesh position={[0, 4.4, 0.28]}><boxGeometry args={[0.26, 0.26, 0.18]} /><meshStandardMaterial ref={a} color="#4a4c52" emissive="#cfd2d8" emissiveIntensity={0.05} /></mesh>
      <mesh position={[0, 3.95, 0.28]}><boxGeometry args={[0.26, 0.26, 0.18]} /><meshStandardMaterial ref={g} color="#4a4c52" emissive="#cfd2d8" emissiveIntensity={0.05} /></mesh>
      <mesh position={[0, 4.85, -0.28]}><boxGeometry args={[0.26, 0.26, 0.18]} /><meshStandardMaterial ref={r2} color="#4a4c52" emissive="#cfd2d8" emissiveIntensity={0.05} /></mesh>
      <mesh position={[0, 4.4, -0.28]}><boxGeometry args={[0.26, 0.26, 0.18]} /><meshStandardMaterial ref={a2} color="#4a4c52" emissive="#cfd2d8" emissiveIntensity={0.05} /></mesh>
      <mesh position={[0, 3.95, -0.28]}><boxGeometry args={[0.26, 0.26, 0.18]} /><meshStandardMaterial ref={g2} color="#4a4c52" emissive="#cfd2d8" emissiveIntensity={0.05} /></mesh>
    </group>
  );
}

/* ── compose ──────────────────────────────────────────────────── */
function City() {
  const data = useMemo(() => {
    /* downtown axis: the landmark straddles the central avenue (x=0)
       at the back; skyline falls off radially from there */
    const backZ = 2;
    const dtX = 0, dtI = GX / 2 - 0.5;         // downtown center in plot-index space
    const lmZ = PLOTSZ[backZ];
    const parkX = PLOTSX[Math.floor(GX / 2) - 3], parkZ = PLOTSZ[Math.floor(GZ / 2) + 2];
    const li = Math.floor(GX / 2) - 1, ri = Math.floor(GX / 2); // plots straddled by the landmark
    const bespoke: { t: string; x: number; z: number; h: number }[] = [
      { t: "landmark", x: dtX, z: lmZ, h: 58 },
      // symmetric flanking ring, heights descending outward
      { t: "slate", x: PLOTSX[li - 1], z: lmZ, h: rand(38, 44) },
      { t: "slate", x: PLOTSX[ri + 1], z: lmZ, h: rand(38, 44) },
      { t: "slate", x: PLOTSX[li - 2], z: lmZ, h: rand(28, 34) },
      { t: "slate", x: PLOTSX[ri + 2], z: lmZ, h: rand(28, 34) },
      { t: "slate", x: PLOTSX[li], z: PLOTSZ[backZ + 1], h: rand(32, 38) },
      { t: "slate", x: PLOTSX[ri], z: PLOTSZ[backZ + 1], h: rand(32, 38) },
      { t: "slate", x: PLOTSX[li - 1], z: PLOTSZ[backZ + 1], h: rand(24, 30) },
      { t: "slate", x: PLOTSX[ri + 1], z: PLOTSZ[backZ + 1], h: rand(24, 30) },
    ];
    const taken = new Set<string>([
      `${li},${backZ}`, `${ri},${backZ}`,               // under the landmark
      `${li - 1},${backZ}`, `${ri + 1},${backZ}`, `${li - 2},${backZ}`, `${ri + 2},${backZ}`,
      `${li},${backZ + 1}`, `${ri},${backZ + 1}`, `${li - 1},${backZ + 1}`, `${ri + 1},${backZ + 1}`,
      `${Math.floor(GX / 2) - 3},${Math.floor(GZ / 2) + 2}`, // park
    ]);
    const cols = [C.cream, C.white, C.paleBlue, C.beige, C.white, "#50525a", C.cream];
    const rots = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
    const buildings: Bld[] = [];
    const greens: { x: number; z: number }[] = [];
    for (let i = 0; i < GX; i++) for (let j = 0; j < GZ; j++) {
      if (taken.has(`${i},${j}`)) continue;
      const distC = Math.hypot(i - dtI, j - backZ);
      if (distC > 4 && Math.random() < 0.08) { greens.push({ x: PLOTSX[i], z: PLOTSZ[j] }); continue; }
      /* radial falloff: tall core → mid ring → low edges */
      const tall = distC < 3.2 && Math.random() < 0.6;
      const type: Bld["type"] = tall ? "tower"
        : distC < 4.5 ? (Math.random() < 0.55 ? "office" : "small")
        : Math.random() < 0.5 ? "shop" : Math.random() < 0.34 ? "office" : "small";
      const h = type === "shop" ? rand(3, 4.5)
        : tall ? rand(18, 26)
        : distC < 4.5 ? rand(11, 16)
        : distC < 7 ? rand(7, 13)
        : rand(4.5, 9);
      buildings.push({ x: PLOTSX[i], z: PLOTSZ[j], fw: rand(5.5, 7.5), h, col: pick(cols), type, rot: pick(rots) });
    }
    const foot = (): Obj => { const horiz = Math.random() < 0.5; if (horiz) { const e = pick(ROADSZ) + (Math.random() < 0.5 ? 3.2 : -3.2); return { pos: [rand(-HALFX, HALFX), 0, e], rotY: rand(0, 6.28) }; } const e = pick(ROADSX) + (Math.random() < 0.5 ? 3.2 : -3.2); return { pos: [e, 0, rand(-HALFZ, HALFZ)], rotY: rand(0, 6.28) }; };
    const small: Obj[] = Array.from({ length: 3000 }, foot);
    buildings.forEach((b) => { for (let t = 0; t < 4; t++) small.push({ pos: [b.x + rand(-8, 8), 0, b.z + rand(-8, 8)], rotY: rand(0, 6.28) }); });
    greens.forEach((g) => { for (let t = 0; t < 9; t++) small.push({ pos: [g.x + rand(-8, 8), 0, g.z + rand(-8, 8)], rotY: rand(0, 6.28) }); });
    const big: Obj[] = [];
    for (let k = 0; k < 40; k++) big.push({ pos: [parkX + rand(-9, 9), 0, parkZ + rand(-9, 9)], rotY: rand(0, 6.28) });
    greens.forEach((g) => { for (let t = 0; t < 2; t++) big.push({ pos: [g.x + rand(-6, 6), 0, g.z + rand(-6, 6)], rotY: rand(0, 6.28) }); });
    for (let k = 0; k < 70; k++) big.push(foot());
    /* rooftop clutter: water tanks + AC units on mid/tall roofs */
    const roofProps: Obj[] = [];
    buildings.forEach((b) => {
      if (b.type === "shop" || b.h < 8 || Math.random() > 0.7) return;
      roofProps.push({ pos: [b.x + rand(-1.8, 1.8), b.h, b.z + rand(-1.8, 1.8)], rotY: rand(0, 6.28) });
    });
    const streetLights: Obj[] = Array.from({ length: 50 }, foot);
    const trafficLights: { x: number; z: number }[] = [];
    for (let ix = 0; ix < ROADSX.length; ix += 4) for (let jz = 0; jz < ROADSZ.length; jz += 4) trafficLights.push({ x: ROADSX[ix] + 2.5, z: ROADSZ[jz] + 2.5 });
    return { bespoke, buildings, greens, small, big, roofProps, streetLights, trafficLights, parkX, parkZ };
  }, []);

  return (
    <group>
      <Ground />
      <Park x={data.parkX} z={data.parkZ} />
      {data.greens.map((g, i) => (<mesh key={i} position={[g.x, 0.2, g.z]} receiveShadow><boxGeometry args={[13, 0.4, 13]} /><meshStandardMaterial color={C.grass} roughness={1} /></mesh>))}
      <BuildingsVaried list={data.buildings} />
      {data.bespoke.map((b, i) => (b.t === "landmark" ? <Landmark key={i} x={b.x} z={b.z} /> : <SlateTower key={i} x={b.x} z={b.z} h={b.h} />))}
      <Trees small={data.small} big={data.big} />
      <InstGroup objects={data.roofProps} parts={[
        { size: [1.1, 1.6, 1.1], off: [0.9, 0.8, 0.6], color: "#6a6d73" },   // water tank
        { size: [1.4, 0.6, 1.0], off: [-1.0, 0.3, -0.7], color: "#55585e" }, // AC unit
      ]} />
      <InstGroup objects={data.streetLights} parts={[
        { size: [0.4, 4, 0.4], off: [0, 2, 0], color: "#3a3d45" },
        { size: [1.2, 0.3, 0.4], off: [0.55, 3.9, 0], color: "#3a3d45" },
        { size: [0.5, 0.35, 0.5], off: [1.1, 3.75, 0], color: "#ffcf8a", emissive: 1.2 },
      ]} />
      {data.trafficLights.map((t, i) => <TrafficLight key={i} x={t.x} z={t.z} />)}
      <People count={140} />
      <Traffic />
    </group>
  );
}

/* the shadow casters (buildings, spire, trees, lamps) and the light never
   move, so the shadow map is identical every frame. Render it for the first
   few frames, then freeze it — drops the whole per-frame shadow pass. */
function ShadowFreeze() {
  const gl = useThree((s) => s.gl);
  const n = useRef(0);
  useEffect(() => { gl.shadowMap.autoUpdate = false; gl.shadowMap.needsUpdate = true; }, [gl]);
  useFrame(() => { if (n.current < 4) { n.current++; gl.shadowMap.needsUpdate = true; } });
  return null;
}

export default function CityScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // pause the 3D render loop when the hero scrolls off-screen (seamless FPS)
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0 }}>
    <Canvas
      shadows="percentage"
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 118, 188], fov: 58, near: 1, far: 2400 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ scene, camera, gl }) => {
        gl.shadowMap.type = THREE.PCFShadowMap; // PCFSoftShadowMap is deprecated in this three build
        scene.background = new THREE.Color("#0b0b0b");
        scene.fog = new THREE.Fog("#0b0b0b", 280, 840); // atmospheric depth — far horizon melts into black
        camera.lookAt(0, 34, -76);                      // one-point axis through the spire; horizon sits in the lower half
      }}
    >
      {/* neutral studio light, slightly warm key — miniature-model look */}
      <ambientLight intensity={0.56} color="#b8bcc4" />
      {/* soft light pool over the foreground focus zone — the center of the
         frame reads brighter while the periphery melts into the mask/fog */}
      <pointLight position={[0, 95, 90]} intensity={2.5} distance={250} decay={0} color="#e8e4da" />
      <directionalLight
        position={[240, 340, 180]} intensity={1.4} color="#fff3e2" castShadow
        shadow-mapSize-width={1024} shadow-mapSize-height={1024}
        shadow-camera-near={1} shadow-camera-far={1050}
        shadow-camera-left={-260} shadow-camera-right={260} shadow-camera-top={260} shadow-camera-bottom={-260}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-200, 130, -140]} intensity={0.36} color="#8e929c" />
      <ShadowFreeze />
      <City />
    </Canvas>
    </div>
  );
}
