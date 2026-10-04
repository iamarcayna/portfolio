import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';

/**
 * Page-wide particle field.
 *
 * At the top of the page the particles form a portrait (sampled from a segmented
 * photo, see scripts/build-face-points.py). Scrolling past the hero dissolves the
 * portrait into dust, scrubbed directly by scroll position, and the dust then
 * drifts behind the whole page, streaming with the scroll at different depths.
 * Scrolling back up re-forms the face.
 */

export type Quality = 'high' | 'low';

export interface FieldOptions {
  quality: Quality;
  reducedMotion: boolean;
  dataUrl?: string;
}

export interface ParticleField {
  destroy(): void;
}

const FOV = 32;
const CAMERA_Z = 6;


// Lens around the pointer: dots are pushed outward and lifted. uWarp.xy = pointer (world),
// uWarp.z = strength (hover baseline + movement energy), uWarp.w = radius (world).
const warpGlsl = /* glsl */ `
  uniform vec4 uWarp;
  vec3 warp(vec3 p, out float glow) {
    vec2 d = p.xy - uWarp.xy;
    float r2 = uWarp.w * uWarp.w;
    float fall = exp(-dot(d, d) / r2);
    glow = fall * clamp(uWarp.z, 0.0, 1.5);
    vec2 dir = d / (length(d) + 1e-4);
    p.xy += dir * fall * uWarp.z * uWarp.w * 0.32;
    p.z += fall * uWarp.z * 0.15;
    return p;
  }
`;

const vertexShader = /* glsl */ `
  attribute vec3 aFace;
  attribute vec3 aDust;
  attribute vec3 aData; // luminance, edge, seed

  uniform float uTime;
  uniform float uMix;     // 0 = portrait, 1 = dust (from scroll position)
  uniform vec3 uAnchor;   // world-space centre of the portrait box
  uniform float uFit;     // world-space half height of the portrait box
  uniform vec2 uView;     // world-space half size of the viewport
  uniform float uCell;    // world-space spacing of the dot grid
  uniform vec2 uGrid;     // grid columns, rows
  uniform vec2 uOrigin;   // world position of the first CSS dot (screen 14px, 14px)
  ${warpGlsl}
  uniform float uSize;
  uniform float uPixelRatio;

  varying float vWeight;
  varying float vFade;
  varying float vSeed;

  float ease(float x) { return x * x * (3.0 - 2.0 * x); }

  void main() {
    float lum = aData.x;
    float edge = aData.y;
    float seed = aData.z;

    // Portrait, anchored to the hero so it scrolls away with it.
    vec3 face = uAnchor + vec3(aFace.xy * uFit, aFace.z * uFit);

    // Dot grid: aDust.xy picks a cell, so several particles share each dot.
    vec2 cell = floor(aDust.xy * uGrid);
    float h = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
    vec3 dust = vec3(uOrigin + vec2(cell.x, -cell.y) * uCell, 0.0);
    // Very subtle life: each dot breathes a hair in place and twinkles.
    float t = uTime * 0.5 + h * 6.2831;
    dust.xy += vec2(sin(t), cos(t * 0.8)) * uCell * 0.035;
    float twinkle = 0.65 + 0.35 * sin(uTime * 0.7 + h * 6.2831);
    float ang = atan(dust.y - uAnchor.y, dust.x - uAnchor.x);
    float seam = twinkle;

    // Staggered, scroll-scrubbed dissolve with a soft outward drift.
    float m = ease(clamp((uMix - seed * 0.35) / 0.65, 0.0, 1.0));
    vec3 pos = mix(face, dust, m);
    pos += vec3(cos(ang), sin(ang), 0.0) * sin(m * 3.14159) * uFit * 0.45;

    // Portrait shimmer.
    float orbit = uTime * (0.3 + fract(seed * 3.1) * 0.3) + seed * 40.0;
    pos += vec3(cos(orbit), sin(orbit), 0.0) * 0.004 * (1.0 - m);

    // Pointer: particles part around the cursor and settle back.
    float glow;
    pos = warp(pos, glow);

    vec4 mv = viewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float tone = clamp(max(max(lum, 0.3), edge * 0.9), 0.0, 1.0);
    float dustW = 0.32;
    float weight = mix(tone, dustW, m);
    gl_PointSize = uSize * (0.5 + weight * 1.2) * uPixelRatio * (${CAMERA_Z.toFixed(1)} / -mv.z);

    vWeight = weight;
    vSeed = seed;
    // Dust stays quiet behind text; the portrait is bright.
    vFade = mix(1.0, 0.18 * seam, m);
  }
`;


const gridVertex = /* glsl */ `
  attribute float aIndex;
  uniform vec2 uGrid;
  uniform vec2 uOrigin;
  uniform float uCell;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vGlow;
  varying float vHide;
  ${warpGlsl}
  void main() {
    float col = mod(aIndex, uGrid.x);
    float row = floor(aIndex / uGrid.x);
    vHide = row >= uGrid.y ? 1.0 : 0.0;
    vec3 p = vec3(uOrigin + vec2(col, -row) * uCell, 0.0);
    float h = fract(sin(dot(vec2(col, row), vec2(12.9898, 78.233))) * 43758.5453);
    float t = uTime * 0.5 + h * 6.2831;
    p.xy += vec2(sin(t), cos(t * 0.8)) * uCell * 0.03;
    float glow;
    p = warp(p, glow);
    vGlow = glow;
    vec4 mv = viewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.2 + glow * 1.2) * uPixelRatio * (${CAMERA_Z.toFixed(1)} / -mv.z);
  }
`;

const gridFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uDot;
  uniform vec3 uAccent;
  varying float vGlow;
  varying float vHide;
  void main() {
    if (vHide > 0.5) discard;
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.2, r);
    vec3 color = mix(uDot, uAccent, clamp(vGlow, 0.0, 1.0) * 0.6);
    float alpha = (0.09 + clamp(vGlow, 0.0, 1.0) * 0.3) * soft;
    gl_FragColor = vec4(color, alpha);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uShadow;
  uniform vec3 uLight;
  uniform vec3 uAccent;

  varying float vWeight;
  varying float vFade;
  varying float vSeed;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.15, r);
    vec3 color = mix(uShadow, uLight, vWeight);
    color = mix(color, uAccent, step(0.992, vSeed));
    gl_FragColor = vec4(color, (0.2 + vWeight * 0.8) * soft * vFade);
  }
`;

function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (Math.imul(s ^ (s >>> 15), 2246822507) + 0x9e3779b9) >>> 0) / 4294967296);
}

export async function createParticleField(canvas: HTMLCanvasElement, options: FieldOptions): Promise<ParticleField> {
  const high = options.quality === 'high';

  // Face data: [w, h, count] then [x, y, lum, edge] quads.
  const raw = new Uint16Array(await (await fetch(options.dataUrl ?? '/face-points.bin')).arrayBuffer());
  const [fw, fh, fcount] = raw;
  const keep = high ? 1 : 0.6;
  const random = rng(7);
  const face: number[] = [];
  const data: number[] = [];
  const dust: number[] = [];
  for (let i = 0; i < fcount; i++) {
    if (random() > keep) continue;
    const x = raw[3 + i * 4] + (random() - 0.5) * 1.1;
    const y = raw[4 + i * 4] + (random() - 0.5) * 1.1;
    const lum = raw[5 + i * 4] / 255;
    const edge = raw[6 + i * 4] / 255;
    const half = fh / 2;
    face.push((x - fw / 2) / half, -(y - fh / 2) / half, (lum - 0.5) * 0.09);
    data.push(lum, edge, random());
    dust.push(random(), random(), 0);
  }
  const n = face.length / 3;

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(n * 3), 3));
  geometry.setAttribute('aFace', new BufferAttribute(new Float32Array(face), 3));
  geometry.setAttribute('aDust', new BufferAttribute(new Float32Array(dust), 3));
  geometry.setAttribute('aData', new BufferAttribute(new Float32Array(data), 3));

  const uniforms = {
    uTime: { value: 0 },
    uMix: { value: 0 },
    uAnchor: { value: [0, 0, 0] as [number, number, number] },
    uFit: { value: 1 },
    uView: { value: [1, 1] as [number, number] },
    uCell: { value: 0.1 },
    uGrid: { value: [10, 10] as [number, number] },
    uOrigin: { value: [0, 0] as [number, number] },
    uWarp: { value: [0, 0, 0, 0.5] as [number, number, number, number] },
    uSize: { value: high ? 2.9 : 2.6 },
    uPixelRatio: { value: 1 },
    uShadow: { value: new Color('#1f6b45') },
    uLight: { value: new Color('#b6ffd1') },
    uAccent: { value: new Color('#c6ff3d') },
  };

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: high ? 'high-performance' : 'low-power' });
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
  camera.position.z = CAMERA_Z;
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const points = new Points(geometry, material);
  points.frustumCulled = false;

  // Grid layer sized for viewports up to ~4K; unused indices are discarded in the shader.
  const MAX_DOTS = 160 * 100;
  const gridIndex = new Float32Array(MAX_DOTS);
  for (let i = 0; i < MAX_DOTS; i++) gridIndex[i] = i;
  const gridGeometry = new BufferGeometry();
  gridGeometry.setAttribute('position', new BufferAttribute(new Float32Array(MAX_DOTS * 3), 3));
  gridGeometry.setAttribute('aIndex', new BufferAttribute(gridIndex, 1));
  const gridMaterial = new ShaderMaterial({
    vertexShader: gridVertex,
    fragmentShader: gridFragment,
    uniforms: {
      uGrid: uniforms.uGrid,
      uOrigin: uniforms.uOrigin,
      uCell: uniforms.uCell,
      uTime: uniforms.uTime,
      uPixelRatio: uniforms.uPixelRatio,
      uWarp: uniforms.uWarp,
      uDot: { value: new Color('#eef1f4') },
      uAccent: uniforms.uAccent,
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const grid = new Points(gridGeometry, gridMaterial);
  grid.frustumCulled = false;
  scene.add(grid);
  scene.add(points);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0, energy: 0, active: false };
  const portrait = document.querySelector<HTMLElement>('[data-particles="face"]');
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  let viewW = 1;
  let viewH = 1;
  let worldPerPx = 1;
  let smoothY = window.scrollY;
  let running = false;
  let raf = 0;
  let last = 0;
  let acc = 0;
  const frameInterval = 1000 / (high ? 60 : 30);

  function layout() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, high ? 2 : 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    uniforms.uPixelRatio.value = dpr;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    viewH = Math.tan((FOV * Math.PI) / 360) * CAMERA_Z;
    viewW = viewH * camera.aspect;
    worldPerPx = (viewH * 2) / height;
    uniforms.uView.value = [viewW, viewH];
    const cell = 28 * worldPerPx;
    uniforms.uCell.value = cell;
    uniforms.uGrid.value = [Math.min(160, Math.ceil(width / 28)), Math.min(100, Math.ceil(height / 28))];
    uniforms.uOrigin.value = [(14 - width / 2) * worldPerPx, -(14 - height / 2) * worldPerPx];
  }

  function update(dt: number) {
    // Scroll position (lightly smoothed on top of Lenis) drives the dissolve and the dust.
    smoothY += (window.scrollY - smoothY) * (options.reducedMotion ? 1 : 1 - Math.exp(-dt * 9));

    if (portrait) {
      const r = portrait.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      // Keep the face in its box until the dissolve has done its work.
      const cy = r.top + r.height / 2 + (window.scrollY - smoothY);
      uniforms.uAnchor.value = [(cx - window.innerWidth / 2) * worldPerPx, -(cy - window.innerHeight / 2) * worldPerPx, 0];
      uniforms.uFit.value = (Math.min(r.height, r.width * 1.3) / 2) * worldPerPx;
    }
    const heroH = hero?.offsetHeight || window.innerHeight;
    const progress = Math.min(1, Math.max(0, smoothY / (heroH * 0.7)));
    uniforms.uMix.value = !portrait ? 1 : options.reducedMotion ? (progress > 0.5 ? 1 : 0) : progress;

    uniforms.uTime.value += dt;

    const k = 1 - Math.exp(-dt * 10);
    pointer.x += (pointer.tx - pointer.x) * k;
    pointer.y += (pointer.ty - pointer.y) * k;
    pointer.energy *= Math.exp(-dt * 2.2);
    // Hovering always bends the grid a little; moving the mouse bends it much more.
    const hover = pointer.active ? 0.3 : 0;
    uniforms.uWarp.value = [pointer.x * viewW, pointer.y * viewH, hover + pointer.energy, 110 * worldPerPx];
  }

  function render() {
    renderer.render(scene, camera);
  }

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    acc += Math.min(now - last, 100);
    last = now;
    if (acc < frameInterval - 1) return;
    update(acc / 1000);
    acc = 0;
    render();
  }

  function start() {
    if (running || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  function onPointerMove(e: PointerEvent) {
    if (options.reducedMotion) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -((e.clientY / window.innerHeight) * 2 - 1);
    pointer.energy = Math.min(1, pointer.energy + Math.hypot(nx - pointer.tx, ny - pointer.ty) * (e.pointerType === 'mouse' ? 3.5 : 4));
    pointer.active = e.pointerType === 'mouse';
    pointer.tx = nx;
    pointer.ty = ny;
  }

  // Reduced motion: no loop and no drift; re-render only when the page scrolls.
  function onScrollStatic() {
    update(0);
    render();
  }

  const onVisibility = () => (document.hidden ? stop() : !options.reducedMotion && start());
  const onLost = (e: Event) => {
    e.preventDefault();
    stop();
  };

  layout();
  window.addEventListener('resize', layout);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  const onLeave = () => (pointer.active = false);
  document.documentElement.addEventListener('pointerleave', onLeave);
  canvas.addEventListener('webglcontextlost', onLost);

  if (options.reducedMotion) {
    window.addEventListener('scroll', onScrollStatic, { passive: true });
    onScrollStatic();
  } else {
    start();
  }

  return {
    destroy() {
      stop();
      window.removeEventListener('resize', layout);
      window.removeEventListener('scroll', onScrollStatic);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('webglcontextlost', onLost);
      geometry.dispose();
      material.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
