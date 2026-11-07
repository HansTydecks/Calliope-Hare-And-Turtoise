/* =============================================
   GARTEN-SIMULATOR — world.js
   3D-Garten mit three.js: Gärten, Tiere (MotionKit + Calliope),
   Fahrphysik (Differentialantrieb), Ultraschall & Liniensensor.
   Maßstab: 1 Einheit = 1 cm. Vorne = lokale +z-Achse, links = +x.
   ============================================= */

import * as THREE from './vendor/three.module.min.js';
import { OrbitControls } from './vendor/OrbitControls.js';

/* ---------- Konstanten ---------- */
const ROBOT_R = 8;           // Kollisionsradius
const WHEEL_BASE = 11;       // Radabstand
const WHEEL_R = 3.2;
const MAX_SPEED = 35;        // cm/s bei Tempo 255
const DEADZONE = 20;         // darunter drehen die Motoren nicht
const US_MAX = 400;
const LINE_W = 3.2;          // Breite der Linie im Pfad-Garten
const LINE_SENSOR_X = 1.0;   // Abstand der Liniensensoren von der Mitte
const LINE_SENSOR_Z = 5.5;   // wie weit vorne

/* ---------- kleine Zufallsquelle (immer gleiche Gärten) ---------- */
function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

/* ---------- Gärten ---------- */
function stadium(cx, cz, half, r, step) {
  const pts = [];
  const add = (x, z) => pts.push([cx + x, cz + z]);
  for (let x = -half; x < half; x += step) add(x, r);
  for (let a = 0; a < Math.PI; a += step / r) add(half + Math.sin(a) * r, Math.cos(a) * r);
  for (let x = half; x > -half; x -= step) add(x, -r);
  for (let a = 0; a < Math.PI; a += step / r) add(-half - Math.sin(a) * r, -Math.cos(a) * r);
  pts.push(pts[0]);
  return pts;
}

export const GARDENS = {
  wiese: {
    size: [200, 140], floor: 'lawn', obstacles: [], flowers: 26, seed: 3,
    start: { hare: { x: -55, z: 25, yaw: Math.PI / 2 }, tortoise: { x: -55, z: -25, yaw: Math.PI / 2 } }
  },
  hecken: {
    size: [200, 140], floor: 'lawn', flowers: 10, seed: 7,
    obstacles: [
      { t: 'box', kind: 'hedge', x: 10, z: -18, w: 14, d: 62, h: 16 },
      { t: 'box', kind: 'hedge', x: -50, z: 42, w: 56, d: 12, h: 14 },
      { t: 'circle', kind: 'stone', x: 58, z: 38, r: 9 },
      { t: 'circle', kind: 'stone', x: -28, z: -40, r: 7 },
      { t: 'box', kind: 'bed', x: 68, z: -42, w: 36, d: 22, h: 7 }
    ],
    start: { hare: { x: -70, z: 0, yaw: Math.PI / 2 }, tortoise: { x: -70, z: -30, yaw: Math.PI / 2 } }
  },
  pfad: {
    size: [200, 140], floor: 'gravel', obstacles: [], flowers: 0, seed: 11,
    path: stadium(0, 0, 50, 42, 2),
    start: { hare: { x: 0, z: 42, yaw: Math.PI / 2 }, tortoise: { x: 0, z: -42, yaw: -Math.PI / 2 } }
  },
  begegnung: {
    size: [280, 180], floor: 'lawn', flowers: 30, seed: 5,
    obstacles: [
      { t: 'circle', kind: 'bush', x: 0, z: 0, r: 14 },
      { t: 'circle', kind: 'stone', x: 70, z: 55, r: 7 },
      { t: 'circle', kind: 'stone', x: -75, z: -55, r: 8 }
    ],
    start: { hare: { x: -100, z: 30, yaw: Math.PI / 2 }, tortoise: { x: 100, z: -30, yaw: -Math.PI / 2 } }
  }
};

/* ---------- Geometrie-Helfer ---------- */
function rayBox(ox, oz, dx, dz, b) {
  const minX = b.x - b.w / 2, maxX = b.x + b.w / 2, minZ = b.z - b.d / 2, maxZ = b.z + b.d / 2;
  let t0 = -Infinity, t1 = Infinity;
  if (Math.abs(dx) < 1e-9) { if (ox < minX || ox > maxX) return Infinity; }
  else { let a = (minX - ox) / dx, c = (maxX - ox) / dx; if (a > c) [a, c] = [c, a]; t0 = Math.max(t0, a); t1 = Math.min(t1, c); }
  if (Math.abs(dz) < 1e-9) { if (oz < minZ || oz > maxZ) return Infinity; }
  else { let a = (minZ - oz) / dz, c = (maxZ - oz) / dz; if (a > c) [a, c] = [c, a]; t0 = Math.max(t0, a); t1 = Math.min(t1, c); }
  if (t1 < Math.max(t0, 0)) return Infinity;
  return t0 >= 0 ? t0 : 0;
}
function rayCircle(ox, oz, dx, dz, cx, cz, r) {
  const fx = ox - cx, fz = oz - cz;
  const b = fx * dx + fz * dz;
  const c = fx * fx + fz * fz - r * r;
  const disc = b * b - c;
  if (disc < 0) return Infinity;
  const s = Math.sqrt(disc);
  const t = -b - s;
  if (t >= 0) return t;
  if (-b + s >= 0) return 0;
  return Infinity;
}
function distToSegment(px, pz, ax, az, bx, bz) {
  const vx = bx - ax, vz = bz - az;
  const l2 = vx * vx + vz * vz;
  let t = l2 ? ((px - ax) * vx + (pz - az) * vz) / l2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * vx), pz - (az + t * vz));
}

/* ---------- Texturen ---------- */
function canvasTex(w, h, draw, repeat) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  return t;
}
function noise(ctx, w, h, colors, n, size, r) {
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = colors[Math.floor(r() * colors.length)];
    const s = size * (0.5 + r());
    ctx.fillRect(r() * w, r() * h, s, s);
  }
}

/* ---------- Die Welt ---------- */
export class World {
  constructor(container, callbacks) {
    this.container = container;
    this.cb = callbacks || {};
    this.robots = {};
    this.selected = 'hare';
    this.cameraMode = 'overview';
    this.showTrail = false;
    this.light = 200;
    this.time = 0;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    const scene = new THREE.Scene();
    this.scene = scene;
    scene.fog = new THREE.Fog(0xcfeaf7, 600, 1600);

    const camera = new THREE.PerspectiveCamera(45, 1, 1, 4000);
    this.camera = camera;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI * 0.47;
    controls.minDistance = 30;
    controls.maxDistance = 700;
    this.controls = controls;

    // Licht
    this.hemi = new THREE.HemisphereLight(0xe8f6ff, 0x6a8a4a, 1.2);
    scene.add(this.hemi);
    const sun = new THREE.DirectionalLight(0xfff2d8, 2.2);
    sun.position.set(160, 320, 140);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera;
    sc.left = -230; sc.right = 230; sc.top = 230; sc.bottom = -230; sc.near = 50; sc.far = 900;
    sun.shadow.bias = -0.0006;
    sun.shadow.normalBias = 0.6;
    scene.add(sun);
    this.sun = sun;

    // Himmel
    const skyGeo = new THREE.SphereGeometry(2000, 32, 16);
    this.skyUniforms = { top: { value: new THREE.Color(0x7cc4f0) }, bottom: { value: new THREE.Color(0xe9f6fb) } };
    const sky = new THREE.Mesh(skyGeo, new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: this.skyUniforms,
      vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 top; uniform vec3 bottom; varying vec3 vP; void main(){ float h = clamp(vP.y*1.6+0.1,0.0,1.0); gl_FragColor = vec4(mix(bottom, top, h),1.0); }'
    }));
    scene.add(sky);

    // Wiese außen
    const outerTex = canvasTex(256, 256, (ctx, w, h) => {
      ctx.fillStyle = '#7fb352'; ctx.fillRect(0, 0, w, h);
      noise(ctx, w, h, ['#78ab4b', '#86ba58', '#719f45', '#8cc05e'], 900, 5, rng(1));
    }, [40, 40]);
    const outer = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), new THREE.MeshLambertMaterial({ map: outerTex }));
    outer.rotation.x = -Math.PI / 2;
    outer.position.y = -0.2;
    outer.receiveShadow = true;
    scene.add(outer);

    this.gardenGroup = new THREE.Group();
    scene.add(this.gardenGroup);

    // Spur
    this.trails = {};

    // Ziehen der Tiere
    this.raycaster = new THREE.Raycaster();
    this.drag = null;
    this._bindPointer();

    this.resize();
    window.addEventListener('resize', () => this.resize());
    new ResizeObserver(() => this.resize()).observe(container);

    this.setGarden('wiese');
    this.setLight(this.light);
    this._last = performance.now();
    this.paused = false;
    renderer.setAnimationLoop(() => this._frame());
  }

  /* ---------- Garten ---------- */
  setGarden(key) {
    const g = GARDENS[key] || GARDENS.wiese;
    this.gardenKey = key;
    this.garden = g;
    const grp = this.gardenGroup;
    while (grp.children.length) {
      const c = grp.children.pop();
      c.traverse(o => { if (o.geometry) o.geometry.dispose(); });
    }
    const [W, D] = g.size;
    const r = rng(g.seed);

    // Boden
    const px = 1024, pz = Math.round(1024 * D / W);
    const floorTex = canvasTex(px, pz, (ctx, w, h) => {
      if (g.floor === 'gravel') {
        ctx.fillStyle = '#e9dfc9'; ctx.fillRect(0, 0, w, h);
        noise(ctx, w, h, ['#ddd1b6', '#f1e9d6', '#d4c7a9', '#e3d8bf', '#c9bc9f'], 9000, 3, r);
      } else {
        ctx.fillStyle = '#9ccc65'; ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 8; i++) {
          ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
          ctx.fillRect(i * w / 8, 0, w / 8, h);
        }
        noise(ctx, w, h, ['#93c45c', '#a5d36f', '#8bbb55', '#aed877'], 6000, 3, r);
      }
      if (g.path) {
        ctx.strokeStyle = '#1d1d1f';
        ctx.lineWidth = LINE_W * w / W;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        g.path.forEach(([x, z], i) => {
          const sx = (x + W / 2) * w / W, sz = (z + D / 2) * h / D;
          if (i) ctx.lineTo(sx, sz); else ctx.moveTo(sx, sz);
        });
        ctx.closePath();
        ctx.stroke();
      }
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshLambertMaterial({ map: floorTex }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    grp.add(floor);

    // Beet-Kante
    const edgeMat = new THREE.MeshLambertMaterial({ color: 0xb98a5a });
    [[0, -D / 2 - 1.5, W + 6, 3], [0, D / 2 + 1.5, W + 6, 3], [-W / 2 - 1.5, 0, 3, D], [W / 2 + 1.5, 0, 3, D]].forEach(([x, z, w, d]) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, 1.2, d), edgeMat);
      m.position.set(x, 0.4, z);
      m.receiveShadow = true;
      grp.add(m);
    });

    // Zaun (Kollision über Wände)
    this.walls = [
      { t: 'box', x: 0, z: -D / 2 - 3, w: W + 12, d: 6 },
      { t: 'box', x: 0, z: D / 2 + 3, w: W + 12, d: 6 },
      { t: 'box', x: -W / 2 - 3, z: 0, w: 6, d: D + 12 },
      { t: 'box', x: W / 2 + 3, z: 0, w: 6, d: D + 12 }
    ];
    this._buildFence(W, D);

    // Hindernisse
    this.obstacles = this.walls.concat(g.obstacles);
    g.obstacles.forEach(o => grp.add(this._obstacleMesh(o, r)));

    // Blumen (keine Hindernisse, nur am Rand)
    if (g.flowers) grp.add(this._flowers(W, D, g.flowers, r));

    // Bäume außen
    grp.add(this._trees(W, D, r));

    // Tiere an den Start
    Object.keys(this.robots).forEach(k => this.resetRobot(k));
    this._placeCamera(true);
  }

  _buildFence(W, D) {
    const postGeo = new THREE.BoxGeometry(2.4, 13, 2.4);
    const mat = new THREE.MeshLambertMaterial({ color: 0xf4efe6 });
    const posts = [];
    const add = (x, z) => posts.push([x, z]);
    const sx = W / 2 + 6, sz = D / 2 + 6;
    const step = 20;
    for (let x = -sx; x <= sx + 0.1; x += (2 * sx) / Math.round(2 * sx / step)) { add(x, -sz); add(x, sz); }
    for (let z = -sz + step; z < sz - 0.1; z += (2 * sz) / Math.round(2 * sz / step)) { add(-sx, z); add(sx, z); }
    const inst = new THREE.InstancedMesh(postGeo, mat, posts.length);
    const m = new THREE.Matrix4();
    posts.forEach(([x, z], i) => { m.makeTranslation(x, 6.5, z); inst.setMatrixAt(i, m); });
    inst.castShadow = true;
    this.gardenGroup.add(inst);
    // Latten
    [[0, -sz, 2 * sx, 1.2], [0, sz, 2 * sx, 1.2], [-sx, 0, 1.2, 2 * sz], [sx, 0, 1.2, 2 * sz]].forEach(([x, z, w, d]) => {
      [4.5, 9.5].forEach(y => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(w, 1.6, d), mat);
        rail.position.set(x, y, z);
        rail.castShadow = true;
        this.gardenGroup.add(rail);
      });
    });
  }

  _obstacleMesh(o, r) {
    const g = new THREE.Group();
    if (o.kind === 'hedge') {
      const tex = canvasTex(128, 128, (ctx, w, h) => {
        ctx.fillStyle = '#3f7d34'; ctx.fillRect(0, 0, w, h);
        noise(ctx, w, h, ['#4c9140', '#356c2b', '#5aa34a', '#2f5f27'], 1400, 6, r);
      }, [Math.max(1, o.w / 20), 1]);
      const mat = new THREE.MeshLambertMaterial({ map: tex });
      const box = new THREE.Mesh(new THREE.BoxGeometry(o.w, o.h, o.d, 4, 2, 4), mat);
      box.position.y = o.h / 2;
      box.castShadow = box.receiveShadow = true;
      g.add(box);
      // runde Kuppen oben
      const n = Math.max(2, Math.round(Math.max(o.w, o.d) / 9));
      for (let i = 0; i < n; i++) {
        const tt = (i + 0.5) / n;
        const s = new THREE.Mesh(new THREE.IcosahedronGeometry(Math.min(o.w, o.d) * 0.55, 1), new THREE.MeshLambertMaterial({ color: 0x4b9140, flatShading: true }));
        s.position.set(o.w >= o.d ? -o.w / 2 + tt * o.w : 0, o.h, o.w >= o.d ? 0 : -o.d / 2 + tt * o.d);
        s.scale.y = 0.6;
        s.castShadow = true;
        g.add(s);
      }
    } else if (o.kind === 'stone') {
      const s = new THREE.Mesh(new THREE.DodecahedronGeometry(o.r, 1), new THREE.MeshLambertMaterial({ color: 0x9a9a95, flatShading: true }));
      s.scale.y = 0.6;
      s.position.y = o.r * 0.35;
      s.rotation.y = r() * 3;
      s.castShadow = s.receiveShadow = true;
      g.add(s);
    } else if (o.kind === 'bush') {
      [[0, 0, 1], [0.45, 0.3, 0.7], [-0.4, 0.35, 0.75], [0.1, -0.45, 0.7]].forEach(([dx, dz, sz]) => {
        const s = new THREE.Mesh(new THREE.IcosahedronGeometry(o.r * sz, 1), new THREE.MeshLambertMaterial({ color: 0x4f9a43, flatShading: true }));
        s.position.set(dx * o.r, o.r * 0.55 * sz, dz * o.r);
        s.castShadow = true;
        g.add(s);
      });
      [[0.3, 0.6], [-0.5, -0.2], [0.6, -0.3]].forEach(([dx, dz]) => {
        const b = new THREE.Mesh(new THREE.SphereGeometry(1.4, 8, 6), new THREE.MeshLambertMaterial({ color: 0xd2304b }));
        b.position.set(dx * o.r, o.r * 0.9, dz * o.r);
        g.add(b);
      });
    } else if (o.kind === 'bed') {
      const box = new THREE.Mesh(new THREE.BoxGeometry(o.w, o.h, o.d), new THREE.MeshLambertMaterial({ color: 0xa8774b }));
      box.position.y = o.h / 2;
      box.castShadow = box.receiveShadow = true;
      g.add(box);
      const soil = new THREE.Mesh(new THREE.BoxGeometry(o.w - 3, 0.6, o.d - 3), new THREE.MeshLambertMaterial({ color: 0x5b3b24 }));
      soil.position.y = o.h + 0.1;
      g.add(soil);
      const carrotMat = new THREE.MeshLambertMaterial({ color: 0xf28c28 });
      const leafMat = new THREE.MeshLambertMaterial({ color: 0x3d9a3a });
      for (let ix = 0; ix < 5; ix++) for (let iz = 0; iz < 2; iz++) {
        const x = -o.w / 2 + 5 + ix * (o.w - 10) / 4, z = -o.d / 4 + iz * o.d / 2;
        const c = new THREE.Mesh(new THREE.ConeGeometry(1.2, 3, 8), carrotMat);
        c.position.set(x, o.h + 0.6, z);
        c.rotation.x = Math.PI;
        g.add(c);
        for (let k = 0; k < 3; k++) {
          const l = new THREE.Mesh(new THREE.ConeGeometry(0.5, 4, 5), leafMat);
          l.position.set(x + (k - 1) * 0.6, o.h + 2.6, z);
          l.rotation.z = (k - 1) * 0.35;
          l.castShadow = true;
          g.add(l);
        }
      }
    }
    g.position.set(o.x, 0, o.z);
    return g;
  }

  _flowers(W, D, n, r) {
    const g = new THREE.Group();
    const cols = [0xff6f91, 0xffd166, 0xffffff, 0xc77dff, 0xff9f43];
    const stemMat = new THREE.MeshLambertMaterial({ color: 0x3c8d3a });
    const headGeo = new THREE.SphereGeometry(1.3, 8, 6);
    const stemGeo = new THREE.CylinderGeometry(0.25, 0.25, 4, 5);
    for (let i = 0; i < n; i++) {
      // nur nahe am Zaun, damit sie nicht im Weg wirken
      const side = Math.floor(r() * 4);
      const u = r() - 0.5;
      const inset = 4 + r() * 6;
      let x, z;
      if (side === 0) { x = u * W; z = -D / 2 + inset; }
      else if (side === 1) { x = u * W; z = D / 2 - inset; }
      else if (side === 2) { x = -W / 2 + inset; z = u * D; }
      else { x = W / 2 - inset; z = u * D; }
      const st = new THREE.Mesh(stemGeo, stemMat);
      st.position.set(x, 2, z);
      g.add(st);
      const h = new THREE.Mesh(headGeo, new THREE.MeshLambertMaterial({ color: cols[i % cols.length] }));
      h.position.set(x, 4.3, z);
      h.scale.y = 0.6;
      h.castShadow = true;
      g.add(h);
    }
    return g;
  }

  _trees(W, D, r) {
    const g = new THREE.Group();
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x8a5a35 });
    const leafCols = [0x4f9a43, 0x5aa84b, 0x3f8a3a, 0x6bb35a];
    for (let i = 0; i < 26; i++) {
      const a = r() * Math.PI * 2;
      const rad = Math.max(W, D) * 0.75 + 40 + r() * 260;
      const x = Math.cos(a) * rad * (W / Math.max(W, D)) * 1.1, z = Math.sin(a) * rad * 0.9;
      if (Math.abs(x) < W / 2 + 40 && Math.abs(z) < D / 2 + 40) continue;
      if (z > 0 && Math.abs(x) < W * 1.1) continue; // nicht vor die Kamera
      const s = 0.7 + r() * 0.9;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(3 * s, 4 * s, 30 * s, 7), trunkMat);
      trunk.position.set(x, 15 * s, z);
      trunk.castShadow = true;
      g.add(trunk);
      const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(22 * s, 1), new THREE.MeshLambertMaterial({ color: leafCols[i % 4], flatShading: true }));
      crown.position.set(x, 42 * s, z);
      crown.castShadow = true;
      g.add(crown);
    }
    // ein paar Büsche außen
    for (let i = 0; i < 14; i++) {
      const a = r() * Math.PI * 2;
      const x = Math.cos(a) * (W / 2 + 25 + r() * 60), z = Math.sin(a) * (D / 2 + 25 + r() * 50);
      const b = new THREE.Mesh(new THREE.IcosahedronGeometry(8 + r() * 6, 1), new THREE.MeshLambertMaterial({ color: leafCols[(i + 1) % 4], flatShading: true }));
      b.position.set(x, 5, z);
      b.scale.y = 0.7;
      b.castShadow = true;
      g.add(b);
    }
    return g;
  }

  /* ---------- Tiere ---------- */
  addRobot(kind) {
    if (this.robots[kind]) return this.robots[kind];
    const rb = buildRobot(kind);
    this.scene.add(rb.group);
    this.robots[kind] = rb;
    this.resetRobot(kind);
    return rb;
  }

  removeRobot(kind) {
    const rb = this.robots[kind];
    if (!rb) return;
    this.scene.remove(rb.group);
    if (this.trails[kind]) { this.scene.remove(this.trails[kind].line); delete this.trails[kind]; }
    delete this.robots[kind];
  }

  resetRobot(kind) {
    const rb = this.robots[kind];
    if (!rb) return;
    const s = this.garden.start[kind];
    rb.x = s.x; rb.z = s.z; rb.yaw = s.yaw;
    rb.motors = { left: { dir: 0, speed: 0 }, right: { dir: 0, speed: 0 } };
    rb.vl = rb.vr = 0;
    rb.bump = 0;
    this._clearTrail(kind);
    this._syncRobot(rb, 0);
  }

  rotateRobot(kind, deg) {
    const rb = this.robots[kind];
    if (!rb) return;
    rb.yaw += deg * Math.PI / 180;
    this._syncRobot(rb, 0);
  }

  setMotors(kind, left, right) {
    const rb = this.robots[kind];
    if (rb) rb.motors = { left, right };
  }

  setDisplay(kind, d) {
    const rb = this.robots[kind];
    if (!rb) return;
    const c = new THREE.Color();
    for (let i = 0; i < 25; i++) {
      const v = d.leds[i] / 255;
      c.setRGB(0.16 + 0.84 * v, 0.04 + 0.1 * v, 0.04 + 0.06 * v);
      rb.ledMesh.setColorAt(i, c);
    }
    rb.ledMesh.instanceColor.needsUpdate = true;
    if (d.rgb) {
      rb.rgbMat.color.setHex(d.rgb);
      rb.rgbMat.emissive.setHex(d.rgb);
      rb.rgbMat.emissiveIntensity = 1.4;
    } else {
      rb.rgbMat.color.setHex(0xdddddd);
      rb.rgbMat.emissive.setHex(0x000000);
    }
    d.frontLeds.forEach((on, i) => {
      rb.frontMats[i].emissive.setHex(on ? 0xff2a2a : 0x000000);
      rb.frontMats[i].color.setHex(on ? 0xff6060 : 0x7a2a2a);
    });
  }

  /* ---------- Sensoren ---------- */
  sense(kind) {
    const rb = this.robots[kind];
    if (!rb) return null;
    const fx = Math.sin(rb.yaw), fz = Math.cos(rb.yaw);
    const ox = rb.x + fx * (ROBOT_R - 1), oz = rb.z + fz * (ROBOT_R - 1);
    let best = Infinity;
    [-8, 0, 8].forEach(deg => {
      const a = rb.yaw + deg * Math.PI / 180;
      const dx = Math.sin(a), dz = Math.cos(a);
      this.obstacles.forEach(o => {
        const t = o.t === 'box' ? rayBox(ox, oz, dx, dz, o) : rayCircle(ox, oz, dx, dz, o.x, o.z, o.r);
        if (t < best) best = t;
      });
      Object.keys(this.robots).forEach(k => {
        if (k === kind) return;
        const o = this.robots[k];
        const t = rayCircle(ox, oz, dx, dz, o.x, o.z, ROBOT_R - 1);
        if (t < best) best = t;
      });
    });
    const distance = Math.min(US_MAX, Math.max(1, best));

    // Liniensensoren
    const patrol = [0, 1].map(i => {
      const side = i === 0 ? 1 : -1; // links = +x lokal
      const lx = side * LINE_SENSOR_X, lz = LINE_SENSOR_Z;
      const px = rb.x + Math.cos(rb.yaw) * lx + Math.sin(rb.yaw) * lz;
      const pz = rb.z - Math.sin(rb.yaw) * lx + Math.cos(rb.yaw) * lz;
      return this._onLine(px, pz);
    });

    const heading = ((180 - rb.yaw * 180 / Math.PI) % 360 + 360) % 360;
    return { distance, patrol, heading };
  }

  _onLine(x, z) {
    const p = this.garden.path;
    if (!p) return false;
    for (let i = 1; i < p.length; i++) {
      if (distToSegment(x, z, p[i - 1][0], p[i - 1][1], p[i][0], p[i][1]) <= LINE_W / 2) return true;
    }
    return false;
  }

  distanceBetween(a, b) {
    const ra = this.robots[a], rb = this.robots[b];
    if (!ra || !rb) return Infinity;
    return Math.hypot(ra.x - rb.x, ra.z - rb.z);
  }

  /* ---------- Physik ---------- */
  _wheelSpeed(m) {
    if (!m || m.speed < DEADZONE) return 0;
    return (m.speed / 255) * MAX_SPEED * (m.dir ? -1 : 1);
  }

  _step(dt) {
    Object.keys(this.robots).forEach(kind => {
      const rb = this.robots[kind];
      if (this.drag && this.drag.kind === kind) return;
      const tl = this._wheelSpeed(rb.motors.left), tr = this._wheelSpeed(rb.motors.right);
      // sanftes Anfahren
      const k = Math.min(1, dt * 12);
      rb.vl += (tl - rb.vl) * k;
      rb.vr += (tr - rb.vr) * k;
      const v = (rb.vl + rb.vr) / 2;
      const w = (rb.vr - rb.vl) / WHEEL_BASE;
      rb.yaw += w * dt;
      const px = rb.x, pz = rb.z;
      rb.x += Math.sin(rb.yaw) * v * dt;
      rb.z += Math.cos(rb.yaw) * v * dt;
      const hit = this._collide(rb, kind);
      rb.bump = hit ? 0.25 : Math.max(0, rb.bump - dt);
      rb.wheelL += (Math.hypot(rb.x - px, rb.z - pz) > 1e-6 || !hit ? rb.vl : rb.vl * 0.3) * dt / WHEEL_R;
      rb.wheelR += (Math.hypot(rb.x - px, rb.z - pz) > 1e-6 || !hit ? rb.vr : rb.vr * 0.3) * dt / WHEEL_R;
      rb.speed = Math.abs(v) + Math.abs(w) * 4;
    });
  }

  _collide(rb, kind) {
    let hit = false;
    for (let iter = 0; iter < 3; iter++) {
      this.obstacles.forEach(o => {
        let cx, cz, rr;
        if (o.t === 'box') {
          cx = Math.max(o.x - o.w / 2, Math.min(rb.x, o.x + o.w / 2));
          cz = Math.max(o.z - o.d / 2, Math.min(rb.z, o.z + o.d / 2));
          rr = 0;
        } else { cx = o.x; cz = o.z; rr = o.r; }
        let dx = rb.x - cx, dz = rb.z - cz;
        let d = Math.hypot(dx, dz);
        const min = ROBOT_R + rr;
        if (d < min) {
          if (d < 1e-6) { dx = 0; dz = 1; d = 1e-6; }
          const push = min - d;
          rb.x += dx / d * push;
          rb.z += dz / d * push;
          hit = true;
        }
      });
      Object.keys(this.robots).forEach(k => {
        if (k === kind) return;
        const o = this.robots[k];
        const dx = rb.x - o.x, dz = rb.z - o.z;
        const d = Math.hypot(dx, dz) || 1e-6;
        if (d < ROBOT_R * 2) {
          const push = (ROBOT_R * 2 - d) / 2;
          rb.x += dx / d * push; rb.z += dz / d * push;
          o.x -= dx / d * push; o.z -= dz / d * push;
          hit = true;
        }
      });
    }
    return hit;
  }

  _syncRobot(rb, t) {
    rb.group.position.set(rb.x, 0, rb.z);
    rb.group.rotation.y = rb.yaw;
    rb.wheels[0].rotation.x = rb.wheelL || 0;
    rb.wheels[1].rotation.x = rb.wheelR || 0;
    const sp = Math.min(1, (rb.speed || 0) / 25);
    if (rb.ears) {
      rb.ears.forEach((e, i) => {
        e.rotation.x = -0.25 - sp * 0.35 + Math.sin(t * 9 + i) * 0.06 * (0.3 + sp);
      });
    }
    if (rb.head) rb.head.position.z = rb.headZ + Math.sin(t * 3) * 0.3;
    // kleiner Wackler beim Anstoßen
    rb.body.rotation.z = rb.bump > 0 ? Math.sin(t * 60) * 0.03 : 0;
  }

  /* ---------- Spur ---------- */
  _clearTrail(kind) {
    const tr = this.trails[kind];
    if (tr) { tr.count = 0; tr.line.geometry.setDrawRange(0, 0); }
  }
  _updateTrail(kind, rb) {
    if (!this.showTrail) return;
    let tr = this.trails[kind];
    if (!tr) {
      const max = 4000;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(max * 3), 3));
      geo.setDrawRange(0, 0);
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: kind === 'hare' ? 0xd9480f : 0x2b8a3e }));
      line.frustumCulled = false;
      this.scene.add(line);
      tr = this.trails[kind] = { line, count: 0, max, lx: null, lz: null };
    }
    if (tr.lx !== null && Math.hypot(rb.x - tr.lx, rb.z - tr.lz) < 1.5 && tr.count) return;
    const pos = tr.line.geometry.attributes.position;
    if (tr.count >= tr.max) {
      pos.array.copyWithin(0, 3 * 1000);
      tr.count -= 1000;
    }
    pos.array[tr.count * 3] = rb.x;
    pos.array[tr.count * 3 + 1] = 0.3;
    pos.array[tr.count * 3 + 2] = rb.z;
    tr.count++;
    tr.lx = rb.x; tr.lz = rb.z;
    pos.needsUpdate = true;
    tr.line.geometry.setDrawRange(0, tr.count);
  }
  setTrail(on) {
    this.showTrail = on;
    Object.values(this.trails).forEach(t => { t.line.visible = on; });
    if (!on) Object.keys(this.trails).forEach(k => this._clearTrail(k));
  }

  /* ---------- Licht ---------- */
  setLight(level) {
    this.light = level;
    const f = Math.max(0, Math.min(1, level / 255));
    this.sun.intensity = 0.15 + 2.3 * f;
    this.hemi.intensity = 0.25 + 1.0 * f;
    const night = new THREE.Color(0x0f1a33), day = new THREE.Color(0x7cc4f0);
    const nightB = new THREE.Color(0x2a3558), dayB = new THREE.Color(0xe9f6fb);
    this.skyUniforms.top.value.copy(night).lerp(day, f);
    this.skyUniforms.bottom.value.copy(nightB).lerp(dayB, f);
    this.scene.fog.color.copy(this.skyUniforms.bottom.value);
    this.renderer.toneMappingExposure = 0.75 + 0.35 * f;
  }

  /* ---------- Kamera ---------- */
  setCameraMode(mode) {
    this.cameraMode = mode;
    this.controls.enabled = mode === 'overview';
    this._placeCamera(true);
  }
  _placeCamera(jump) {
    const [W, D] = this.garden.size;
    // Hochformat (Handy): weiter weg, damit der ganze Garten zu sehen ist
    const fit = Math.max(1, 1.25 / Math.max(0.3, this.camera.aspect));
    const big = Math.max(W, D * 1.4) * fit;
    if (this.cameraMode === 'overview' && jump) {
      this.camera.position.set(0, big * 0.72, big * 0.78);
      this.controls.target.set(0, 0, 0);
      this.controls.update();
    } else if (this.cameraMode === 'top') {
      this.camera.position.set(0, big * 1.55, 0.01);
      this.camera.lookAt(0, 0, 0);
      this.controls.target.set(0, 0, 0);
    }
  }
  _followCamera(dt) {
    const rb = this.robots[this.selected] || Object.values(this.robots)[0];
    if (!rb) return;
    const fx = Math.sin(rb.yaw), fz = Math.cos(rb.yaw);
    const want = new THREE.Vector3(rb.x - fx * 48, 30, rb.z - fz * 48);
    const k = Math.min(1, dt * 3);
    this.camera.position.lerp(want, k);
    if (!this._look) this._look = new THREE.Vector3(rb.x, 4, rb.z);
    this._look.lerp(new THREE.Vector3(rb.x + fx * 18, 4, rb.z + fz * 18), k);
    this.camera.lookAt(this._look);
  }

  /* ---------- Maus: Tiere verschieben & auswählen ---------- */
  _bindPointer() {
    const el = this.renderer.domElement;
    const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const ndc = new THREE.Vector2();
    const toNdc = e => {
      const r = el.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };
    const pick = () => {
      this.raycaster.setFromCamera(ndc, this.camera);
      const list = Object.keys(this.robots).map(k => this.robots[k].group);
      const hits = this.raycaster.intersectObjects(list, true);
      if (!hits.length) return null;
      let o = hits[0].object;
      while (o && !o.userData.kind) o = o.parent;
      return o ? o.userData.kind : null;
    };
    el.addEventListener('pointerdown', e => {
      toNdc(e);
      const kind = pick();
      if (!kind) return;
      this.drag = { kind, id: e.pointerId, moved: false };
      this.controls.enabled = false;
      el.setPointerCapture(e.pointerId);
      if (this.cb.onSelect) this.cb.onSelect(kind);
      e.preventDefault();
    });
    el.addEventListener('pointermove', e => {
      if (!this.drag || e.pointerId !== this.drag.id) {
        toNdc(e);
        el.style.cursor = pick() ? 'grab' : '';
        return;
      }
      toNdc(e);
      this.raycaster.setFromCamera(ndc, this.camera);
      const p = new THREE.Vector3();
      if (this.raycaster.ray.intersectPlane(ground, p)) {
        const rb = this.robots[this.drag.kind];
        const [W, D] = this.garden.size;
        rb.x = Math.max(-W / 2 + ROBOT_R, Math.min(W / 2 - ROBOT_R, p.x));
        rb.z = Math.max(-D / 2 + ROBOT_R, Math.min(D / 2 - ROBOT_R, p.z));
        this._collide(rb, this.drag.kind);
        this.drag.moved = true;
        el.style.cursor = 'grabbing';
      }
    });
    const end = e => {
      if (!this.drag || e.pointerId !== this.drag.id) return;
      this._clearTrail(this.drag.kind);
      this.drag = null;
      this.controls.enabled = this.cameraMode === 'overview';
      el.style.cursor = '';
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  /* ---------- Schleife ---------- */
  resize() {
    const w = this.container.clientWidth || 1, h = this.container.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    const portraitBefore = this.camera.aspect < 1;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.garden && portraitBefore !== (this.camera.aspect < 1)) this._placeCamera(true);
  }

  setPaused(p) { this.paused = p; }

  _frame() {
    const t = performance.now();
    const dt = Math.min(0.12, (t - this._last) / 1000);
    this._last = t;
    if (!this.paused) {
      this.time += dt;
      const sub = Math.max(2, Math.ceil(dt / 0.01));
      for (let i = 0; i < sub; i++) this._step(dt / sub);
    }
    Object.keys(this.robots).forEach(k => {
      const rb = this.robots[k];
      this._syncRobot(rb, this.time);
      this._updateTrail(k, rb);
    });
    if (this.cb.onTick) this.cb.onTick(dt);
    if (this.cameraMode === 'follow') this._followCamera(dt);
    else if (this.cameraMode === 'overview') this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

/* =============================================
   Tier-Modelle
   ============================================= */
function buildRobot(kind) {
  const group = new THREE.Group();
  group.userData.kind = kind;
  const body = new THREE.Group();
  group.add(body);
  const std = (color, extra) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.7, metalness: 0.05 }, extra || {}));
  const cast = m => { m.castShadow = true; m.receiveShadow = true; return m; };

  // --- Fahrgestell (MotionKit) ---
  const chassisShape = new THREE.Shape();
  const cw = 5.5, cl = 7;
  chassisShape.moveTo(-cw + 2, -cl);
  chassisShape.lineTo(cw - 2, -cl);
  chassisShape.quadraticCurveTo(cw, -cl, cw, -cl + 2);
  chassisShape.lineTo(cw, cl - 3);
  chassisShape.quadraticCurveTo(cw, cl, cw - 3, cl);
  chassisShape.lineTo(-cw + 3, cl);
  chassisShape.quadraticCurveTo(-cw, cl, -cw, cl - 3);
  chassisShape.lineTo(-cw, -cl + 2);
  chassisShape.quadraticCurveTo(-cw, -cl, -cw + 2, -cl);
  const chassisGeo = new THREE.ExtrudeGeometry(chassisShape, { depth: 1.2, bevelEnabled: true, bevelSize: 0.3, bevelThickness: 0.3, bevelSegments: 2 });
  chassisGeo.rotateX(Math.PI / 2);
  const chassisCol = kind === 'hare' ? 0x2f3e66 : 0x2f3e66;
  const chassis = cast(new THREE.Mesh(chassisGeo, std(chassisCol, { roughness: 0.5 })));
  chassis.position.y = 3.6;
  body.add(chassis);
  // Akku-Kasten unten
  const batt = cast(new THREE.Mesh(new THREE.BoxGeometry(7, 1.8, 5), std(0x222428)));
  batt.position.set(0, 1.9, -1.5);
  body.add(batt);

  // Räder
  const wheels = [];
  [1, -1].forEach(side => {
    const w = new THREE.Group();
    const tire = cast(new THREE.Mesh(new THREE.CylinderGeometry(WHEEL_R, WHEEL_R, 1.8, 24), std(0x1e1e22, { roughness: 0.9 })));
    tire.rotation.z = Math.PI / 2;
    w.add(tire);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(WHEEL_R * 0.62, WHEEL_R * 0.62, 1.9, 16), std(kind === 'hare' ? 0xffb703 : 0x8ac926));
    hub.rotation.z = Math.PI / 2;
    w.add(hub);
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.5, WHEEL_R * 1.1), std(0xffffff));
    w.add(spoke);
    w.position.set(side * 6.6, WHEEL_R, -1.5);
    body.add(w);
    wheels.push(w);
  });
  // Stützrad
  const caster = cast(new THREE.Mesh(new THREE.SphereGeometry(1.1, 12, 8), std(0xc8ccd2, { metalness: 0.6, roughness: 0.3 })));
  caster.position.set(0, 1.1, 5);
  body.add(caster);

  // Ultraschall-„Augen"
  const usBoard = cast(new THREE.Mesh(new THREE.BoxGeometry(8.6, 3.4, 0.5), std(0x1f6fb2)));
  usBoard.position.set(0, 5.6, 6.6);
  body.add(usBoard);
  [1, -1].forEach(side => {
    const eye = cast(new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.45, 1.6, 20), std(0xd9dde2, { metalness: 0.7, roughness: 0.25 })));
    eye.rotation.x = Math.PI / 2;
    eye.position.set(side * 2.4, 5.6, 7.5);
    body.add(eye);
    const mesh = new THREE.Mesh(new THREE.CircleGeometry(1.15, 20), std(0x2a2a2a, { roughness: 1 }));
    mesh.position.set(side * 2.4, 5.6, 8.32);
    body.add(mesh);
    const glint = new THREE.Mesh(new THREE.CircleGeometry(0.35, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    glint.position.set(side * 2.4 + 0.45, 6.1, 8.34);
    body.add(glint);
  });
  // vordere LEDs des MotionKit
  const frontMats = [std(0x7a2a2a), std(0x7a2a2a)];
  [1, -1].forEach((side, i) => {
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 8), frontMats[i]);
    l.position.set(side * 4.6, 4.0, 6.9);
    body.add(l);
  });

  // --- Calliope mini oben drauf ---
  const cal = new THREE.Group();
  const s = 3.6; // halbe Breite
  const calShape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 6 + i * Math.PI / 3;
    const x = Math.cos(a) * s * 1.12, y = Math.sin(a) * s * 1.12;
    if (i === 0) calShape.moveTo(x, y); else calShape.lineTo(x, y);
  }
  calShape.closePath();
  const calGeo = new THREE.ExtrudeGeometry(calShape, { depth: 0.35, bevelEnabled: true, bevelSize: 0.6, bevelThickness: 0.15, bevelSegments: 3 });
  calGeo.rotateX(-Math.PI / 2);
  const board = cast(new THREE.Mesh(calGeo, std(0x3a3f4b, { roughness: 0.45 })));
  cal.add(board);
  // LED-Matrix
  const ledGeo = new THREE.BoxGeometry(0.62, 0.25, 0.62);
  const ledMesh = new THREE.InstancedMesh(ledGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), 25);
  const m4 = new THREE.Matrix4();
  const pitch = 1.05;
  for (let i = 0; i < 25; i++) {
    const x = i % 5, y = Math.floor(i / 5);
    // Zeile 0 ist oben = Richtung vorne (+z), Spalte 0 links (+x)
    m4.makeTranslation((2 - x) * pitch, 0.6, (2 - y) * pitch + 0.2);
    ledMesh.setMatrixAt(i, m4);
    ledMesh.setColorAt(i, new THREE.Color(0.16, 0.04, 0.04));
  }
  cal.add(ledMesh);
  // Knöpfe A und B
  [1, -1].forEach(side => {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.4, 12), std(0x222222));
    b.position.set(side * 3.6, 0.65, 0.2);
    cal.add(b);
  });
  // RGB-LED
  const rgbMat = std(0xdddddd, { emissive: 0x000000 });
  const rgbLed = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 8), rgbMat);
  rgbLed.position.set(0, 0.6, -3.0);
  cal.add(rgbLed);
  // goldene Anschlüsse
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 6 + i * Math.PI / 3;
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.5, 12), std(0xd4a017, { metalness: 0.8, roughness: 0.3 }));
    p.position.set(Math.cos(a) * s * 0.95, 0.4, -Math.sin(a) * s * 0.95);
    cal.add(p);
  }

  const parts = { group, body, wheels, ledMesh, rgbMat, frontMats, x: 0, z: 0, yaw: 0, wheelL: 0, wheelR: 0, vl: 0, vr: 0, speed: 0, bump: 0, kind };

  if (kind === 'hare') {
    cal.position.set(0, 8.0, -1.2);
    body.add(cal);
    // Abstandshalter zwischen MotionKit und Calliope
    [[2.6, 1.6], [-2.6, 1.6], [2.6, -3.6], [-2.6, -3.6]].forEach(([x, z]) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 3.6, 8), std(0xc8ccd2, { metalness: 0.6, roughness: 0.35 }));
      post.position.set(x, 6.1, z);
      body.add(post);
    });
    const fur = std(0xf3ece2, { roughness: 0.95 });
    const pink = std(0xf6a6b8, { roughness: 0.9 });
    const ears = [];
    [1, -1].forEach(side => {
      const ear = new THREE.Group();
      const outer = cast(new THREE.Mesh(new THREE.SphereGeometry(1.5, 16, 12), fur));
      outer.scale.set(1, 4.2, 0.55);
      outer.position.y = 5.6;
      ear.add(outer);
      const inner = new THREE.Mesh(new THREE.SphereGeometry(1.0, 14, 10), pink);
      inner.scale.set(1, 3.6, 0.4);
      inner.position.set(0, 5.6, 0.45);
      ear.add(inner);
      ear.position.set(side * 2.4, 7.4, -5.9);
      ear.rotation.z = -side * 0.18;
      body.add(ear);
      ears.push(ear);
    });
    parts.ears = ears;
    const tail = cast(new THREE.Mesh(new THREE.IcosahedronGeometry(2.1, 2), fur));
    tail.position.set(0, 4.4, -8.3);
    body.add(tail);
    // kleine Pfoten vorne
    [1, -1].forEach(side => {
      const p = cast(new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 8), fur));
      p.scale.set(1, 0.6, 1.4);
      p.position.set(side * 3.6, 0.8, 5.6);
      body.add(p);
    });
    // Nase am Ultraschall-Brett
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 8), pink);
    nose.position.set(0, 4.5, 7.0);
    body.add(nose);
  } else {
    // Panzer
    const shellTex = canvasTex(512, 256, (ctx, w, h) => {
      ctx.fillStyle = '#4f8f3a'; ctx.fillRect(0, 0, w, h);
      const R = 34;
      for (let row = -1; row < h / (R * 1.5) + 1; row++) {
        for (let col = -1; col < w / (R * 1.73) + 1; col++) {
          const cx = col * R * 1.73 + (row % 2 ? R * 0.87 : 0), cy = row * R * 1.5;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = Math.PI / 6 + i * Math.PI / 3;
            const x = cx + Math.cos(a) * (R - 4), y = cy + Math.sin(a) * (R - 4);
            if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
          }
          ctx.closePath();
          ctx.fillStyle = (row + col) % 3 ? '#6aa84f' : '#5c9c45';
          ctx.fill();
          ctx.lineWidth = 6; ctx.strokeStyle = '#3d6e2c'; ctx.stroke();
        }
      }
    });
    const shell = cast(new THREE.Mesh(new THREE.SphereGeometry(8.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), std(0xffffff, { map: shellTex, roughness: 0.75 })));
    shell.scale.set(1, 0.62, 0.9);
    shell.position.set(0, 4.6, -1.8);
    body.add(shell);
    const rim = cast(new THREE.Mesh(new THREE.TorusGeometry(8.5, 0.7, 8, 40), std(0x8a6a3a)));
    rim.rotation.x = Math.PI / 2;
    rim.scale.set(1, 0.9, 1);
    rim.position.set(0, 4.7, -1.8);
    body.add(rim);
    cal.position.set(0, 9.6, -1.6);
    cal.rotation.x = -0.12;
    body.add(cal);
    // Kopf
    const skin = std(0x86b25a, { roughness: 0.85 });
    const head = cast(new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 12), skin));
    head.scale.set(1, 0.85, 1.15);
    head.position.set(0, 2.5, 9.3);
    body.add(head);
    parts.head = head;
    parts.headZ = 9.3;
    // Beinchen
    [[1, 1], [-1, 1], [1, -1], [-1, -1]].forEach(([sx, sz]) => {
      const leg = cast(new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 8), skin));
      leg.scale.set(1, 0.7, 1.2);
      leg.position.set(sx * 7.6, 3.0, sz * 4.2 - 1.6);
      body.add(leg);
    });
    const tail = cast(new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.6, 10), skin));
    tail.rotation.x = -Math.PI / 2 - 0.3;
    tail.position.set(0, 3.6, -10.2);
    body.add(tail);
  }
  return parts;
}
