/* Work blade as a 3D clay space.
   Each product story sits on a clay device (monitor, laptop or kiosk) showing
   that story's screenshot. The story in focus floats in the foreground and the
   others sit back in the fog. Clay versions of the brand shapes drift through
   the depth.

   This replaces the unlocked Work carousel. main.js still owns the password
   gate and the badge; it calls mount() once the gate opens, and we call its
   workCarouselFallback() if the scene can't run (no WebGL, three.js missing).

   Loaded as a module, so it lands after main.js has already run. main.js
   leaves __workMountPending behind for us when that happens. */

const SECTION = document.getElementById("work");
const THREE_URL = "./vendor/three.module.min.js";

/* The dark blade is a different enough surface that it carries its own
   palette rather than the page's light-background tokens. */
const C = {
  mint: 0xbfebd5,
  vibrant: 0x0f8a5f,
  coral: 0xff7967,
  offwhite: 0xf5f4ef,
  fog: 0x075539
};

let mounted = false;
let scene = null;   // the three.js side, once it loads

function mount(focus) {
  if (mounted || !SECTION || !window.SITE) return false;
  const stories = window.SITE.stories || [];
  if (!stories.length) return false;
  mounted = true;

  const ui = buildUI(stories);
  SECTION.classList.add("work--3d");

  startScene(stories, ui).catch((err) => {
    // Nothing visible has been committed beyond the overlay, so unwind cleanly
    // and let main.js put the flat carousel back.
    console.warn("[workspace] falling back to the carousel:", err);
    ui.teardown();
    SECTION.classList.remove("work--3d");
    mounted = false;
    window.workCarouselFallback?.(focus);
  });

  if (focus) ui.host.focus({ preventScroll: true });
  return true;
}

/* ---- Overlay ---------------------------------------------------------
   Everything on top of the canvas. The wrappers are pointer-events:none so
   drags and clicks reach the scene; only the links and buttons take events
   back. The section head (the "Work" label and the lock badge) is already in
   index.html and just gets recoloured by .work--3d. */
function buildUI(stories) {
  const e = window.escapeHTML;

  const host = document.createElement("div");
  host.className = "work3d__stage";
  host.tabIndex = 0;
  host.setAttribute("role", "group");
  host.setAttribute("aria-label", "Product stories, use the arrow keys to move between them");

  const overlay = document.createElement("div");
  overlay.className = "work3d__overlay";
  overlay.innerHTML = `
    <div class="container work3d__bar">
      <a class="work3d__meta" data-w3d-meta href="#" aria-live="polite">
        <div><h3 data-w3d-title></h3><p data-w3d-sub></p></div>
        <span class="work3d__arrow" aria-hidden="true">→</span>
      </a>
      <div class="work3d__controls">
        <div class="work3d__dots" data-w3d-dots>
          ${stories.map((s, i) => `<button type="button" aria-label="Go to ${e(s.title)}"><i></i></button>`).join("")}
        </div>
        <div class="work3d__arrows">
          <button type="button" class="round-btn work3d__motion" data-w3d-motion aria-pressed="false"></button>
          <button type="button" class="round-btn" data-w3d-prev aria-label="Previous story">←</button>
          <button type="button" class="round-btn" data-w3d-next aria-label="Next story">→</button>
        </div>
      </div>
    </div>`;

  // The canvas goes behind the section head, which is already the first child.
  SECTION.prepend(host);
  SECTION.append(overlay);

  const ui = {
    host,
    overlay,
    stories,
    active: 0,
    paused: false,
    meta: overlay.querySelector("[data-w3d-meta]"),
    title: overlay.querySelector("[data-w3d-title]"),
    sub: overlay.querySelector("[data-w3d-sub]"),
    dots: [...overlay.querySelectorAll("[data-w3d-dots] button")],
    prev: overlay.querySelector("[data-w3d-prev]"),
    next: overlay.querySelector("[data-w3d-next]"),
    motion: overlay.querySelector("[data-w3d-motion]"),
    onChange: null,
    teardown() { host.remove(); overlay.remove(); }
  };

  ui.go = (i) => {
    const n = clamp(i, 0, stories.length - 1);
    if (n === ui.active) return;
    ui.active = n;
    ui.sync();
    ui.onChange?.();
  };

  ui.sync = () => {
    const s = stories[ui.active];
    ui.title.textContent = s.title;
    ui.sub.textContent = `${s.role} · ${s.year}`;
    ui.meta.href = `story.html?id=${encodeURIComponent(s.slug)}`;
    ui.dots.forEach((b, i) => b.setAttribute("aria-current", String(i === ui.active)));
    ui.prev.disabled = ui.active === 0;
    ui.next.disabled = ui.active === stories.length - 1;
  };

  ui.setPaused = (v) => {
    ui.paused = v;
    const label = v ? "Play motion" : "Pause motion";
    ui.motion.setAttribute("aria-label", label);
    ui.motion.title = label;
    ui.motion.setAttribute("aria-pressed", String(v));
    ui.motion.innerHTML = v
      ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10-6.5a1 1 0 0 0 0-1.72l-10-6.5A1 1 0 0 0 8 5.5Z"/></svg>`
      : `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>`;
    ui.onChange?.();
  };

  ui.dots.forEach((b, i) => b.addEventListener("click", () => ui.go(i)));
  ui.prev.addEventListener("click", () => ui.go(ui.active - 1));
  ui.next.addEventListener("click", () => ui.go(ui.active + 1));
  ui.motion.addEventListener("click", () => ui.setPaused(!ui.paused));

  // Scoped to the section: a global arrow-key handler would fight the resume
  // timeline and the quotes further down the page.
  SECTION.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowRight") { ev.preventDefault(); ui.go(ui.active + 1); }
    if (ev.key === "ArrowLeft") { ev.preventDefault(); ui.go(ui.active - 1); }
  });

  ui.sync();
  ui.setPaused(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return ui;
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ---- Scene ----------------------------------------------------------- */
async function startScene(stories, ui) {
  const T = await import(THREE_URL);

  const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = T.NoToneMapping;
  renderer.domElement.className = "work3d__canvas";
  ui.host.appendChild(renderer.domElement);

  const sc = new T.Scene();
  sc.fog = new T.FogExp2(C.fog, 0.019);
  const camera = new T.PerspectiveCamera(34, 1, 0.1, 200);

  /* A tiny studio, baked into an environment map: the clay reads as clay only
     once it has something soft to reflect. Tinted forest so it sits in the fog. */
  const env = new T.Scene();
  env.background = new T.Color(0x0a5a3d);
  const panel = (rgb, w, h, p) => {
    const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ side: T.DoubleSide }));
    m.material.color.setRGB(...rgb);
    m.position.set(...p);
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  panel([5, 5, 4.6], 6, 4, [-3, 6, 4]);     // bright key, upper left
  panel([1.6, 2.6, 2.0], 4, 6, [7, 0, 1]);  // mint bounce, right
  panel([2.6, 1.6, 1.3], 3, 3, [-6, -2, -3]); // warm fill, lower left
  const pmrem = new T.PMREMGenerator(renderer);
  sc.environment = pmrem.fromScene(env, 0.05).texture;
  sc.environmentIntensity = 0.75;

  sc.add(new T.HemisphereLight(0xf2fbf6, 0x0a4a33, 1.25));
  const key = new T.DirectionalLight(0xfff1e6, 2.0); key.position.set(-4, 6, 6); sc.add(key);
  const rim = new T.DirectionalLight(C.mint, 0.7); rim.position.set(5, 2, -6); sc.add(rim);

  const clay = (hex) => new T.MeshPhysicalMaterial({
    color: hex, roughness: 0.6, metalness: 0,
    sheen: 0.6, sheenRoughness: 0.75, sheenColor: new T.Color(0xffffff),
    clearcoat: 0.06, clearcoatRoughness: 0.6
  });

  const G = geometry(T);
  const deviceMat = clay(C.mint);
  // Keys, trackpad, card reader and receipt slot, a shade down from the shell.
  const insetMat = clay(C.mint);
  insetMat.color.multiplyScalar(0.84);

  const shadowTex = makeShadowTexture(T);
  const builders = { laptop: G.laptop, kiosk: G.kiosk, monitor: G.monitor };
  const devices = stories.map((s, i) => {
    const screenMat = new T.MeshBasicMaterial({ color: C.vibrant, toneMapped: false });
    const build = builders[s.device] || G.monitor;
    const g = build(deviceMat, insetMat, screenMat);
    g.traverse((o) => { o.userData.idx = i; });

    const shadow = new T.Mesh(
      new T.PlaneGeometry(4.4, 2.4),
      new T.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.55 })
    );
    shadow.rotation.x = -Math.PI / 2;

    const holder = new T.Group();
    holder.add(g);
    sc.add(holder, shadow);
    if (s.screen) loadScreen(T, renderer, s.screen, screenMat, g.userData.aspect, () => invalidate());
    return { holder, g, shadow };
  });

  const shapes = buildShapes(T, G, clay, sc);

  /* ---- Pointer ---- */
  const ray = new T.Raycaster(), ptr = new T.Vector2();
  const meshes = devices.map((d) => d.g);
  const hit = (ev) => {
    const b = renderer.domElement.getBoundingClientRect();
    ptr.set(((ev.clientX - b.left) / b.width) * 2 - 1, -((ev.clientY - b.top) / b.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const h = ray.intersectObjects(meshes, true)[0];
    return h ? h.object.userData.idx : -1;
  };
  let down = null;
  const cv = renderer.domElement;
  cv.addEventListener("pointerdown", (ev) => { down = ev.clientX; });
  cv.addEventListener("pointerup", (ev) => {
    if (down === null) return;
    const dx = ev.clientX - down;
    down = null;
    if (Math.abs(dx) > 50) return ui.go(ui.active + (dx < 0 ? 1 : -1));
    const i = hit(ev);
    if (i >= 0 && i !== ui.active) ui.go(i);
  });
  cv.addEventListener("pointercancel", () => { down = null; });
  cv.addEventListener("pointermove", (ev) => {
    if (ev.pointerType !== "mouse") return;
    const i = hit(ev);
    cv.style.cursor = i >= 0 && i !== ui.active ? "pointer" : "grab";
  });

  /* ---- Loop ----------------------------------------------------------
     The same bargain field.js strikes: the GPU only runs while the section is
     on screen and the tab is in front. On top of that, a paused or
     reduced-motion scene that has finished easing to its target stops
     rendering altogether until something asks for a frame. */
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false, running = false, raf = 0, idle = false;
  const clock = new T.Clock();
  let cur = ui.active;

  const invalidate = () => { idle = false; start(); };
  ui.onChange = invalidate;
  reduced.addEventListener("change", invalidate);

  function resize() {
    const w = ui.host.clientWidth, h = ui.host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    const a = w / h;
    camera.aspect = a;
    // Pull the camera back on narrow screens so the devices still fit.
    const dist = Math.min(20, 9.5 * Math.max(1, 1.5 / a));
    camera.position.set(0, 0.55, dist);
    camera.lookAt(0, -0.45, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }

  function frame() {
    const dt = Math.min(0.05, clock.getDelta());
    const t = clock.elapsedTime;
    const float = ui.paused || reduced.matches ? 0 : 1;

    cur += (ui.active - cur) * (1 - Math.exp(-dt * 3.2));
    if (Math.abs(ui.active - cur) < 0.0005) cur = ui.active;

    devices.forEach((d, i) => {
      const o = i - cur, ao = Math.abs(o), u = d.g.userData;
      const bob = Math.sin(t * 0.9 + i * 1.7) * 0.09 * float;
      d.holder.position.set(o * 5, ao * 0.5 + bob + 0.1, -ao * 6.5);
      d.holder.rotation.set(
        u.rotX + Math.sin(t * 0.6 + i) * 0.015 * float,
        u.rotY - o * 0.32 + Math.sin(t * 0.45 + i) * 0.03 * float,
        Math.sin(t * 0.7 + i * 2) * 0.012 * float
      );
      d.shadow.position.set(o * 5, ao * 0.5 + u.shadowY - 0.35, -ao * 6.5 + 0.2);
      d.shadow.material.opacity = 0.5 - bob * 1.2;
      d.shadow.scale.setScalar(1 - bob * 0.6);
    });

    shapes.forEach((m) => {
      const u = m.userData;
      m.position.y = u.y + Math.sin(t * 0.55 + u.ph) * u.amp * float;
      m.rotation.x += u.spin[0] * dt * float;
      m.rotation.y += u.spin[1] * dt * float;
    });

    renderer.render(sc, camera);
    // Nothing left to animate: hold this frame until something changes.
    if (!float && cur === ui.active) { idle = true; stop(); }
  }

  const tick = () => { raf = requestAnimationFrame(tick); frame(); };
  function start() {
    if (running || !visible || document.hidden || idle) return;
    running = true;
    clock.getDelta();      // drop the gap we spent stopped
    tick();
  }
  function stop() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
  }

  new ResizeObserver(resize).observe(ui.host);
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); }).observe(ui.host);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  resize();
  visible = true;
  start();

  scene = { renderer, sc, camera };
}

/* ---- Geometry -------------------------------------------------------- */
function geometry(T) {
  // A rounded rectangle, as a Shape.
  const rr = (w, h, r) => {
    const s = new T.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  };
  // Extrude with a bevel: the bevel is what makes these read as clay rather
  // than as boxes.
  const ext = (shape, depth, b) => {
    const g = new T.ExtrudeGeometry(shape, {
      depth: Math.max(0.001, depth),
      bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 6, curveSegments: 20
    });
    g.center();
    g.computeVertexNormals();
    return g;
  };
  // The bevel grows the slab, so shrink the shape by it to land on w×h×d.
  const slab = (w, h, d, r, bev) => {
    const b = Math.min(bev, d / 2 - 0.001);
    return ext(rr(w - 2 * b, h - 2 * b, Math.max(0.01, r - b)), d - 2 * b, b);
  };
  const roundPoly = (n, R, rad, rot) => {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = rot + (i * 2 * Math.PI) / n;
      pts.push(new T.Vector2(Math.cos(a) * R, Math.sin(a) * R));
    }
    const s = new T.Shape();
    pts.forEach((p, i) => {
      const a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n];
      const p1 = p.clone().sub(p.clone().sub(a).normalize().multiplyScalar(rad));
      const p2 = p.clone().add(b.clone().sub(p).normalize().multiplyScalar(rad));
      i === 0 ? s.moveTo(p1.x, p1.y) : s.lineTo(p1.x, p1.y);
      s.quadraticCurveTo(p.x, p.y, p2.x, p2.y);
    });
    s.closePath();
    return s;
  };

  function laptop(mat, inset, scr) {
    const g = new T.Group(), inner = new T.Group(), W = 3.2, D = 2.15;
    const base = new T.Mesh(slab(W, D, 0.13, 0.16, 0.055), mat);
    base.rotation.x = -Math.PI / 2;
    inner.add(base);

    const cols = 13, rows = 5;
    const keys = new T.InstancedMesh(slab(0.17, 0.15, 0.04, 0.04, 0.014), inset, cols * rows);
    const o = new T.Object3D();
    let k = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      o.position.set((c - (cols - 1) / 2) * 0.205, 0.07, -0.62 + r * 0.19);
      o.rotation.set(-Math.PI / 2, 0, 0);
      o.updateMatrix();
      keys.setMatrixAt(k++, o.matrix);
    }
    inner.add(keys);

    const pad = new T.Mesh(slab(1.1, 0.5, 0.02, 0.07, 0.008), inset);
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(0, 0.062, 0.68);
    inner.add(pad);

    const pivot = new T.Group();
    pivot.position.set(0, 0.06, -D / 2 + 0.05);
    pivot.rotation.x = -0.24;
    inner.add(pivot);
    const LH = 2.05;
    const lid = new T.Mesh(slab(W, LH, 0.08, 0.16, 0.035), mat);
    lid.position.y = LH / 2;
    pivot.add(lid);
    const sw = W - 0.22, sh = LH - 0.2;
    const screen = new T.Mesh(new T.PlaneGeometry(sw, sh), scr);
    screen.position.set(0, LH / 2 + 0.01, 0.042);
    pivot.add(screen);

    inner.position.set(0, -0.85, 0.3);
    g.add(inner);
    g.userData = { aspect: sw / sh, rotY: -0.36, rotX: 0.26, shadowY: -1.55 };
    return g;
  }

  function monitor(mat, inset, scr) {
    const g = new T.Group(), inner = new T.Group(), W = 3.7, H = 2.45;
    const panel = new T.Mesh(slab(W, H, 0.16, 0.18, 0.065), mat);
    panel.position.y = 1.5;
    inner.add(panel);
    const sw = W - 0.24, sh = H - 0.24;
    const screen = new T.Mesh(new T.PlaneGeometry(sw, sh), scr);
    screen.position.set(0, 1.5, 0.082);
    inner.add(screen);
    const neck = new T.Mesh(slab(0.55, 1.25, 0.14, 0.12, 0.05), mat);
    neck.position.set(0, 0.45, -0.18);
    neck.rotation.x = -0.12;
    inner.add(neck);
    const foot = new T.Mesh(slab(1.7, 1.05, 0.12, 0.45, 0.05), mat);
    foot.rotation.x = -Math.PI / 2;
    foot.position.set(0, -0.12, -0.12);
    inner.add(foot);
    inner.position.set(0, -1.35, 0);
    g.add(inner);
    g.userData = { aspect: sw / sh, rotY: -0.3, rotX: 0.06, shadowY: -1.75 };
    return g;
  }

  function kiosk(mat, inset, scr) {
    const g = new T.Group(), inner = new T.Group(), W = 1.7, H = 2.95;
    const head = new T.Group();
    head.position.set(0, 2.25, 0);
    head.rotation.x = -0.08;
    inner.add(head);
    head.add(new T.Mesh(slab(W, H, 0.24, 0.2, 0.08), mat));
    const sw = 1.48, sh = (sw * 16) / 9;
    const screen = new T.Mesh(new T.PlaneGeometry(sw, sh), scr);
    screen.position.set(0, 0.02, 0.122);
    head.add(screen);

    const body = new T.Mesh(slab(1.3, 1.05, 0.55, 0.16, 0.07), mat);
    body.position.set(0, 0.3, -0.05);
    inner.add(body);
    const reader = new T.Mesh(slab(0.5, 0.36, 0.06, 0.06, 0.02), inset);
    reader.position.set(-0.24, 0.42, 0.24);
    inner.add(reader);
    const slot = new T.Mesh(slab(0.4, 0.07, 0.04, 0.03, 0.012), inset);
    slot.position.set(0.3, 0.5, 0.235);
    inner.add(slot);
    const foot = new T.Mesh(slab(1.65, 0.85, 0.14, 0.3, 0.06), mat);
    foot.rotation.x = -Math.PI / 2;
    foot.position.set(0, -0.26, -0.05);
    inner.add(foot);

    inner.scale.setScalar(0.82);
    inner.position.y = -1.5;
    g.add(inner);
    g.userData = { aspect: sw / sh, rotY: -0.32, rotX: 0.04, shadowY: -1.7 };
    return g;
  }

  return { rr, ext, slab, roundPoly, laptop, monitor, kiosk };
}

/* ---- Floating shapes -------------------------------------------------
   Clay versions of the brand marks, scattered through the depth. The layout
   comes from a seeded RNG so it is the same on every load, and candidates
   that would sit over a device get re-rolled. */
function buildShapes(T, G, clay, sc) {
  const geos = [
    G.ext(G.roundPoly(6, 0.55, 0.14, Math.PI / 2), 0.26, 0.1),
    G.ext(G.roundPoly(3, 0.6, 0.16, Math.PI / 2), 0.24, 0.1),
    new T.SphereGeometry(0.45, 48, 32),
    G.slab(0.85, 0.85, 0.42, 0.2, 0.12),
    new T.CapsuleGeometry(0.22, 0.6, 12, 32)
  ];
  // Weighted so mint stays rare next to the mint devices.
  const mats = [C.coral, C.coral, C.vibrant, C.vibrant, C.offwhite, C.coral, C.mint, C.vibrant].map(clay);
  const typeW = [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4];

  let seed = 11;
  const rnd = () => {           // mulberry32
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const group = new T.Group(), out = [];
  for (let i = 0; i < 44; i++) {
    let x, y, z, bad, tries = 0;
    do {
      z = 3 - Math.pow(rnd(), 1.5) * 44;
      const dist = 9.5 - z, hh = dist * 0.306, hw = hh * 1.9;
      x = (rnd() * 2 - 1) * hw * 1.05;
      y = (rnd() * 2 - 1) * hh * 1.05;
      const nx = Math.abs(x) / hw, ny = Math.abs(y) / hh;
      bad = (z > -7 && nx < 0.42 && ny < 0.7)     // over the focused device
        || (z > -14 && ny < 0.42 && nx < 0.95)    // across the side devices
        || (z > 0.5 && nx < 0.7);                 // right on the lens
    } while (bad && ++tries < 40);

    const m = new T.Mesh(geos[typeW[Math.floor(rnd() * typeW.length)]], mats[Math.floor(rnd() * mats.length)]);
    m.scale.setScalar((0.55 + rnd() * 0.9) * (z > -4 ? 1.15 : 1));
    m.position.set(x, y, z);
    m.rotation.set(rnd() * 6.28, rnd() * 6.28, rnd() * 6.28);
    m.userData = { y, ph: rnd() * 6.28, amp: 0.08 + rnd() * 0.18, spin: [(rnd() - 0.5) * 0.25, (rnd() - 0.5) * 0.25] };
    group.add(m);
    out.push(m);
  }
  sc.add(group);
  return out;
}

/* ---- Screens and shadows --------------------------------------------- */
function loadScreen(T, renderer, url, mat, panelAspect, done) {
  new T.TextureLoader().load(url, (t) => {
    t.colorSpace = T.SRGBColorSpace;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const ia = t.image.width / t.image.height;
    // Cover the panel, anchored to the top of the image: these are screenshots,
    // and the top is where the product identifies itself.
    if (ia < panelAspect) { t.repeat.set(1, ia / panelAspect); t.offset.set(0, 1 - ia / panelAspect); }
    else { t.repeat.set(panelAspect / ia, 1); t.offset.set((1 - panelAspect / ia) / 2, 0); }
    mat.map = t;
    mat.color.set(0xffffff);
    mat.needsUpdate = true;
    done();
  });
}

function makeShadowTexture(T) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const x = c.getContext("2d");
  const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, "rgba(1,26,17,0.9)");
  gr.addColorStop(0.5, "rgba(1,26,17,0.35)");
  gr.addColorStop(1, "rgba(1,26,17,0)");
  x.fillStyle = gr;
  x.fillRect(0, 0, 256, 256);
  const t = new T.CanvasTexture(c);
  t.colorSpace = T.SRGBColorSpace;
  return t;
}

/* ---- Hand-off with main.js ------------------------------------------- */
window.WorkSpace = { mount };
if (window.__workMountPending !== undefined) {
  const focus = window.__workMountPending;
  if (!mount(focus)) window.workCarouselFallback?.(focus);
}
