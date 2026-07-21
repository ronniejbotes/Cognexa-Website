/* ==========================================================================
   Cognexa — scene.js
   Three.js particle engine for "The Automation Line".
   Classic script: defines window.CognexaScene only. No GSAP, no modules.
   Requires the global THREE (UMD build r149) to be loaded first.

   Public API (see build contract):
     init(canvasEl, opts) -> bool
     setFormation(f)   float 0..4, continuous
     setProgress(p)    0..1 page progress -> camera drift + hue temperature
     setPointer(x, y)  normalized -1..1, eased parallax
     setDim(d)         0..1 particle opacity fade
     resize()
     destroy()
   ========================================================================== */
(function () {
  'use strict';

  var state = null; // all mutable engine state lives here; null = not inited

  /* ------------------------------------------------------------------ *
   * Small math helpers
   * ------------------------------------------------------------------ */

  // Deterministic-ish gaussian (Box-Muller with spare caching)
  var gaussSpare = null;
  function gauss() {
    if (gaussSpare !== null) {
      var g = gaussSpare;
      gaussSpare = null;
      return g;
    }
    var u = 0;
    var v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    var mag = Math.sqrt(-2.0 * Math.log(u));
    gaussSpare = mag * Math.sin(2.0 * Math.PI * v);
    return mag * Math.cos(2.0 * Math.PI * v);
  }

  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  /* ------------------------------------------------------------------ *
   * Formation generators — each returns Float32Array(count * 3)
   * ------------------------------------------------------------------ */

  // 0 — CORE: fibonacci sphere, radius ~2.2 (breathing handled in shader)
  function buildSphere(count) {
    var arr = new Float32Array(count * 3);
    var golden = Math.PI * (3.0 - Math.sqrt(5.0));
    var radius = 2.2;
    for (var i = 0; i < count; i++) {
      var y = 1 - (i / (count - 1)) * 2; // 1 .. -1
      var r = Math.sqrt(Math.max(0, 1 - y * y));
      var theta = golden * i;
      var jr = radius * (1.0 + (Math.random() - 0.5) * 0.035);
      arr[i * 3] = Math.cos(theta) * r * jr;
      arr[i * 3 + 1] = y * jr;
      arr[i * 3 + 2] = Math.sin(theta) * r * jr;
    }
    return arr;
  }

  // Point on a rounded-rect perimeter at arc-length s (counter-clockwise
  // from the start of the top edge). Returns [x, y].
  function roundedRectPoint(s, w, h, r) {
    var hw = w / 2;
    var hh = h / 2;
    var straightW = w - 2 * r;
    var straightH = h - 2 * r;
    var arc = (Math.PI / 2) * r;
    // segment lengths in walking order
    var lens = [straightW, arc, straightH, arc, straightW, arc, straightH, arc];
    var total = 0;
    for (var i = 0; i < lens.length; i++) total += lens[i];
    s = ((s % total) + total) % total;
    var seg = 0;
    while (s > lens[seg]) {
      s -= lens[seg];
      seg++;
    }
    var t = s / lens[seg];
    var a;
    switch (seg) {
      case 0: // top edge, left -> right
        return [-hw + r + straightW * t, hh];
      case 1: // top-right arc (90deg -> 0deg)
        a = Math.PI / 2 - (Math.PI / 2) * t;
        return [hw - r + Math.cos(a) * r, hh - r + Math.sin(a) * r];
      case 2: // right edge, top -> bottom
        return [hw, hh - r - straightH * t];
      case 3: // bottom-right arc (0 -> -90)
        a = -(Math.PI / 2) * t;
        return [hw - r + Math.cos(a) * r, -hh + r + Math.sin(a) * r];
      case 4: // bottom edge, right -> left
        return [hw - r - straightW * t, -hh];
      case 5: // bottom-left arc (-90 -> -180)
        a = -Math.PI / 2 - (Math.PI / 2) * t;
        return [-hw + r + Math.cos(a) * r, -hh + r + Math.sin(a) * r];
      case 6: // left edge, bottom -> top
        return [-hw, -hh + r + straightH * t];
      default: // top-left arc (180 -> 90)
        a = Math.PI - (Math.PI / 2) * t;
        return [-hw + r + Math.cos(a) * r, hh - r + Math.sin(a) * r];
    }
  }

  // 1 — CHAT: flat rounded speech bubble facing camera.
  // Dense outline (incl. tail) + interior dot grid.
  function buildBubble(count) {
    var arr = new Float32Array(count * 3);
    var w = 4.2;
    var h = 2.8;
    var r = 0.55;
    var perim = 2 * (w - 2 * r) + 2 * (h - 2 * r) + Math.PI * r * 2;

    // Tail: two segments, bottom-left, pointing down-left
    var tailA = [-1.35, -h / 2];
    var tailTip = [-1.8, -h / 2 - 0.72];
    var tailB = [-0.68, -h / 2];
    var tailL1 = Math.hypot(tailTip[0] - tailA[0], tailTip[1] - tailA[1]);
    var tailL2 = Math.hypot(tailB[0] - tailTip[0], tailB[1] - tailTip[1]);
    var tailLen = tailL1 + tailL2;
    var totalLen = perim + tailLen;

    var outlineN = Math.floor(count * 0.5);
    var i, x, y, s, t;

    for (i = 0; i < outlineN; i++) {
      s = (i / outlineN) * totalLen;
      if (s < perim) {
        var p = roundedRectPoint(s, w, h, r);
        x = p[0];
        y = p[1];
      } else {
        var st = s - perim;
        if (st < tailL1) {
          t = st / tailL1;
          x = tailA[0] + (tailTip[0] - tailA[0]) * t;
          y = tailA[1] + (tailTip[1] - tailA[1]) * t;
        } else {
          t = (st - tailL1) / tailL2;
          x = tailTip[0] + (tailB[0] - tailTip[0]) * t;
          y = tailTip[1] + (tailB[1] - tailTip[1]) * t;
        }
      }
      arr[i * 3] = x + (Math.random() - 0.5) * 0.05;
      arr[i * 3 + 1] = y + (Math.random() - 0.5) * 0.05;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    // Interior dot grid (points stacked per cell -> bright additive dots)
    var margin = 0.34;
    var step = 0.24;
    var cells = [];
    for (y = -h / 2 + margin; y <= h / 2 - margin + 1e-6; y += step) {
      for (x = -w / 2 + margin; x <= w / 2 - margin + 1e-6; x += step) {
        // respect rounded corners
        var cx = Math.max(Math.abs(x) - (w / 2 - r), 0);
        var cy = Math.max(Math.abs(y) - (h / 2 - r), 0);
        if (cx * cx + cy * cy <= (r - margin * 0.5) * (r - margin * 0.5) ||
            (Math.abs(x) <= w / 2 - r || Math.abs(y) <= h / 2 - r)) {
          cells.push([x, y]);
        }
      }
    }
    for (i = outlineN; i < count; i++) {
      var cell = cells[(i - outlineN) % cells.length];
      arr[i * 3] = cell[0] + (Math.random() - 0.5) * 0.05;
      arr[i * 3 + 1] = cell[1] + (Math.random() - 0.5) * 0.05;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
    return arr;
  }

  // 2 — VOICE: audio waveform, vertical columns of points across ~7 units.
  // Stored at full height; the shader modulates y with uTime + per-column
  // phase (columns share exact x, so phase derived from x is per-column).
  function buildWaveform(count, isMobile) {
    var arr = new Float32Array(count * 3);
    var width = 7.0;
    var cols = isMobile ? 44 : 72;
    for (var i = 0; i < count; i++) {
      var col = i % cols;
      var fx = cols > 1 ? col / (cols - 1) : 0.5;
      var x = -width / 2 + fx * width;
      // deterministic per-column base height + smooth center envelope
      var env = Math.exp((-x * x) / 16.0);
      var hBase = 0.3 + 1.5 * (0.35 + 0.65 * Math.abs(Math.sin(col * 0.83 + 1.7))) * env;
      var y = (Math.random() * 2 - 1) * hBase;
      arr[i * 3] = x; // no x jitter: keeps per-column phase exact in shader
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.14;
    }
    return arr;
  }

  // 3 — WORKFLOW: ~12 gaussian point-cluster nodes in a loose 3D lattice,
  // plus a share of points along links between neighbouring nodes.
  function buildNetwork(count) {
    var arr = new Float32Array(count * 3);
    var nodes = [];
    var i, j;
    // 3 x 2 x 2 lattice, jittered loose
    for (i = 0; i < 12; i++) {
      var gx = (i % 3) - 1; // -1, 0, 1
      var gy = (Math.floor(i / 3) % 2) - 0.5; // -0.5, 0.5
      var gz = Math.floor(i / 6) - 0.5; // -0.5, 0.5
      nodes.push([
        gx * 1.75 + (Math.random() - 0.5) * 0.9,
        gy * 1.8 + (Math.random() - 0.5) * 0.9,
        gz * 1.7 + (Math.random() - 0.5) * 0.9
      ]);
    }
    // links: each node to its 2 nearest neighbours (deduped)
    var edgeKeys = {};
    var edges = [];
    for (i = 0; i < nodes.length; i++) {
      var dists = [];
      for (j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        var dx = nodes[i][0] - nodes[j][0];
        var dy = nodes[i][1] - nodes[j][1];
        var dz = nodes[i][2] - nodes[j][2];
        dists.push([j, dx * dx + dy * dy + dz * dz]);
      }
      dists.sort(function (a, b) { return a[1] - b[1]; });
      for (j = 0; j < 2; j++) {
        var k = dists[j][0];
        var key = Math.min(i, k) + '-' + Math.max(i, k);
        if (!edgeKeys[key]) {
          edgeKeys[key] = true;
          edges.push([nodes[i], nodes[k]]);
        }
      }
    }
    var clusterN = Math.floor(count * 0.78);
    for (i = 0; i < clusterN; i++) {
      var n = nodes[i % nodes.length];
      arr[i * 3] = n[0] + gauss() * 0.32;
      arr[i * 3 + 1] = n[1] + gauss() * 0.32;
      arr[i * 3 + 2] = n[2] + gauss() * 0.32;
    }
    for (i = clusterN; i < count; i++) {
      var e = edges[(i - clusterN) % edges.length];
      var t = Math.random();
      arr[i * 3] = e[0][0] + (e[1][0] - e[0][0]) * t + gauss() * 0.035;
      arr[i * 3 + 1] = e[0][1] + (e[1][1] - e[0][1]) * t + gauss() * 0.035;
      arr[i * 3 + 2] = e[0][2] + (e[1][2] - e[0][2]) * t + gauss() * 0.035;
    }
    return arr;
  }

  // 4 — WEB3D: points distributed evenly along the edge segments of an
  // IcosahedronGeometry(2.2, 1) wireframe (rotation handled in shader).
  function buildGlobe(count) {
    var arr = new Float32Array(count * 3);
    var ico = new THREE.IcosahedronGeometry(2.2, 1);
    var edgesGeo = new THREE.EdgesGeometry(ico, 1);
    var pos = edgesGeo.attributes.position;
    var segCount = pos.count / 2;
    var i;

    // cumulative segment lengths for even arc-length distribution
    var lens = new Float32Array(segCount);
    var total = 0;
    for (i = 0; i < segCount; i++) {
      var ax = pos.getX(i * 2);
      var ay = pos.getY(i * 2);
      var az = pos.getZ(i * 2);
      var bx = pos.getX(i * 2 + 1);
      var by = pos.getY(i * 2 + 1);
      var bz = pos.getZ(i * 2 + 1);
      total += Math.hypot(bx - ax, by - ay, bz - az);
      lens[i] = total;
    }
    var seg = 0;
    for (i = 0; i < count; i++) {
      var target = (i / count) * total;
      // lens is monotonically increasing; walk forward (i is ordered)
      while (seg < segCount - 1 && lens[seg] < target) seg++;
      var start = seg === 0 ? 0 : lens[seg - 1];
      var segLen = lens[seg] - start;
      var t = segLen > 0 ? (target - start) / segLen : 0;
      var x0 = pos.getX(seg * 2);
      var y0 = pos.getY(seg * 2);
      var z0 = pos.getZ(seg * 2);
      arr[i * 3] = x0 + (pos.getX(seg * 2 + 1) - x0) * t + (Math.random() - 0.5) * 0.04;
      arr[i * 3 + 1] = y0 + (pos.getY(seg * 2 + 1) - y0) * t + (Math.random() - 0.5) * 0.04;
      arr[i * 3 + 2] = z0 + (pos.getZ(seg * 2 + 1) - z0) * t + (Math.random() - 0.5) * 0.04;
    }
    ico.dispose();
    edgesGeo.dispose();
    return arr;
  }

  /* ------------------------------------------------------------------ *
   * Shaders
   * ------------------------------------------------------------------ */

  var VERT = [
    'attribute vec3 aStart;',
    'attribute vec3 aEnd;',
    'attribute vec3 aSeed;',
    'uniform float uMix;',
    'uniform float uTime;',
    'uniform float uFormA;',
    'uniform float uFormB;',
    'uniform float uPointSize;',
    'uniform float uPixelRatio;',
    'varying float vAlpha;',
    '',
    '// per-formation idle animation, applied to raw formation positions',
    'vec3 animatePos(vec3 p, float form) {',
    '  if (form < 0.5) {',
    '    // 0 CORE: breathing sphere',
    '    float b = 1.0 + 0.055 * sin(uTime * 0.9 + aSeed.x * 6.2831);',
    '    return p * b;',
    '  } else if (form < 1.5) {',
    '    // 1 CHAT: gentle float',
    '    p.y += 0.03 * sin(uTime * 0.8 + p.x * 1.2);',
    '    return p;',
    '  } else if (form < 2.5) {',
    '    // 2 VOICE: bar heights sine-modulated, per-column phase from x',
    '    float phase = p.x * 1.45 + sin(p.x * 3.1) * 1.8;',
    '    float m = 0.3 + 0.7 * (0.5 + 0.5 * sin(uTime * 2.3 + phase));',
    '    p.y *= m;',
    '    return p;',
    '  } else if (form < 3.5) {',
    '    // 3 WORKFLOW: slow cluster drift',
    '    p += 0.05 * vec3(',
    '      sin(uTime * 0.7 + aSeed.x * 6.2831),',
    '      cos(uTime * 0.6 + aSeed.y * 6.2831),',
    '      sin(uTime * 0.5 + aSeed.z * 6.2831));',
    '    return p;',
    '  }',
    '  // 4 WEB3D: slow Y rotation',
    '  float a = uTime * 0.18;',
    '  float c = cos(a);',
    '  float s = sin(a);',
    '  return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);',
    '}',
    '',
    'void main() {',
    '  float m = smoothstep(0.0, 1.0, uMix);',
    '  vec3 pos = mix(animatePos(aStart, uFormA), animatePos(aEnd, uFormB), m);',
    '  // subtle per-point noise wobble',
    '  pos += 0.035 * vec3(',
    '    sin(uTime * 1.1 + aSeed.x * 39.47),',
    '    sin(uTime * 1.3 + aSeed.y * 27.13),',
    '    sin(uTime * 0.9 + aSeed.z * 33.31));',
    '  vec4 mv = modelViewMatrix * vec4(pos, 1.0);',
    '  float size = uPointSize * (0.6 + aSeed.y * 0.8);',
    '  gl_PointSize = clamp(size * uPixelRatio * (26.0 / max(0.1, -mv.z)), 1.0, 40.0);',
    '  vAlpha = 0.35 + 0.65 * aSeed.z;',
    '  gl_Position = projectionMatrix * mv;',
    '}'
  ].join('\n');

  var FRAG = [
    'uniform vec3 uColorA;',
    'uniform vec3 uColorB;',
    'uniform float uMix;',
    'uniform float uDim;',
    'uniform float uProg;',
    'varying float vAlpha;',
    '',
    'void main() {',
    '  float d = length(gl_PointCoord - 0.5);',
    '  float disc = smoothstep(0.5, 0.12, d);',
    '  if (disc < 0.004) discard;',
    '  vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 1.0, uMix));',
    '  // slight hue temperature drift with page progress',
    '  col = mix(col, col * vec3(1.08, 0.94, 1.12), uProg * 0.55);',
    '  float alpha = disc * vAlpha * (1.0 - uDim * 0.85);',
    '  gl_FragColor = vec4(col * alpha, alpha);',
    '}'
  ].join('\n');

  var STAR_VERT = [
    'attribute float aSize;',
    'uniform float uPixelRatio;',
    'varying float vTone;',
    'void main() {',
    '  vec4 mv = modelViewMatrix * vec4(position, 1.0);',
    '  gl_PointSize = clamp(aSize * uPixelRatio * (60.0 / max(0.1, -mv.z)), 1.0, 6.0);',
    '  vTone = aSize;',
    '  gl_Position = projectionMatrix * mv;',
    '}'
  ].join('\n');

  var STAR_FRAG = [
    'uniform vec3 uColor;',
    'uniform float uDim;',
    'varying float vTone;',
    'void main() {',
    '  float d = length(gl_PointCoord - 0.5);',
    '  float disc = smoothstep(0.5, 0.1, d);',
    '  if (disc < 0.004) discard;',
    '  float alpha = disc * 0.35 * (0.5 + 0.5 * vTone) * (1.0 - uDim * 0.4);',
    '  gl_FragColor = vec4(uColor * alpha, alpha);',
    '}'
  ].join('\n');

  /* ------------------------------------------------------------------ *
   * Engine
   * ------------------------------------------------------------------ */

  function startLoop() {
    if (!state || state.running || state.contextLost) return;
    state.running = true;
    state.clock.getDelta(); // flush pause gap so time never jumps
    state.raf = requestAnimationFrame(tick);
  }

  function stopLoop() {
    if (!state) return;
    state.running = false;
    if (state.raf) {
      cancelAnimationFrame(state.raf);
      state.raf = 0;
    }
  }

  function tick() {
    if (!state || !state.running) return;
    state.raf = requestAnimationFrame(tick);

    var dt = Math.min(state.clock.getDelta(), 0.05);
    state.time += dt;
    state.uniforms.uTime.value = state.time;

    // eased pointer parallax + slow progress-driven camera drift
    var p = state.pointer;
    p.x += (p.tx - p.x) * 0.06;
    p.y += (p.ty - p.y) * 0.06;
    var prog = state.progress;
    var cam = state.camera;
    cam.position.x = p.x * 0.55;
    cam.position.y = -p.y * 0.4 - prog * 0.35;
    cam.position.z = 7.0 - prog * 0.7;
    cam.lookAt(0, 0, 0);

    state.renderer.render(state.scene, state.camera);
  }

  function uploadPair(idx) {
    // idx = lower formation of the active pair (0..3)
    var g = state.geometry;
    g.attributes.aStart.array.set(state.formations[idx]);
    g.attributes.aEnd.array.set(state.formations[Math.min(idx + 1, 4)]);
    g.attributes.aStart.needsUpdate = true;
    g.attributes.aEnd.needsUpdate = true;
    state.uniforms.uFormA.value = idx;
    state.uniforms.uFormB.value = Math.min(idx + 1, 4);
    state.uniforms.uColorA.value.copy(state.colors[idx]);
    state.uniforms.uColorB.value.copy(state.colors[Math.min(idx + 1, 4)]);
    state.pairIndex = idx;
  }

  /* ------------------------------------------------------------------ *
   * Public API
   * ------------------------------------------------------------------ */

  function init(canvasEl, opts) {
    opts = opts || {};
    if (state) destroy();
    if (typeof window.THREE === 'undefined' || !canvasEl) return false;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasEl,
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance'
      });
      if (!renderer.getContext()) throw new Error('no context');
    } catch (err) {
      return false;
    }

    var isMobile = window.innerWidth < 768;
    var count = opts.particleCount || (isMobile ? 3000 : 6000);
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth;
    var h = window.innerHeight;

    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    renderer.setClearColor(0x000000, 0);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 7);

    // ---- formations -------------------------------------------------
    var formations = [
      buildSphere(count),
      buildBubble(count),
      buildWaveform(count, isMobile),
      buildNetwork(count),
      buildGlobe(count)
    ];

    // ---- formation colors ------------------------------------------
    var blue = new THREE.Color('#4a7cff');
    var green = new THREE.Color('#34d399');
    var purple = new THREE.Color('#a78bfa');
    var bluePurple = blue.clone().lerp(purple, 0.5);
    var colors = [blue.clone(), blue.clone(), green, purple, bluePurple];

    // ---- main particle system --------------------------------------
    var geometry = new THREE.BufferGeometry();
    // 'position' only feeds three's draw count; real positions come
    // from aStart/aEnd in the vertex shader.
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geometry.setAttribute('aStart', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geometry.setAttribute('aEnd', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    var seeds = new Float32Array(count * 3);
    for (var i = 0; i < seeds.length; i++) seeds[i] = Math.random();
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3));
    geometry.attributes.aStart.setUsage(THREE.DynamicDrawUsage);
    geometry.attributes.aEnd.setUsage(THREE.DynamicDrawUsage);

    var sharedDim = { value: 0 };
    var sharedPR = { value: dpr };

    var uniforms = {
      uMix: { value: 0 },
      uTime: { value: 0 },
      uColorA: { value: colors[0].clone() },
      uColorB: { value: colors[1].clone() },
      uDim: sharedDim,
      uPointSize: { value: isMobile ? 1.2 : 1.0 },
      uFormA: { value: 0 },
      uFormB: { value: 1 },
      uProg: { value: 0 },
      uPixelRatio: sharedPR
    };

    var material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending
    });

    var points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    // ---- ambient starfield (static, far behind) --------------------
    var starCount = 800;
    var starPos = new Float32Array(starCount * 3);
    var starSize = new Float32Array(starCount);
    for (i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 52;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 32;
      starPos[i * 3 + 2] = -12 - Math.random() * 26;
      starSize[i] = 0.4 + Math.random() * 0.9;
    }
    var starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('aSize', new THREE.BufferAttribute(starSize, 1));
    var starMat = new THREE.ShaderMaterial({
      vertexShader: STAR_VERT,
      fragmentShader: STAR_FRAG,
      uniforms: {
        uColor: { value: new THREE.Color('#6b78a8') },
        uDim: sharedDim,
        uPixelRatio: sharedPR
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending
    });
    var stars = new THREE.Points(starGeo, starMat);
    stars.frustumCulled = false;
    scene.add(stars);

    // ---- state ------------------------------------------------------
    state = {
      renderer: renderer,
      scene: scene,
      camera: camera,
      canvas: canvasEl,
      geometry: geometry,
      material: material,
      points: points,
      starGeo: starGeo,
      starMat: starMat,
      stars: stars,
      formations: formations,
      colors: colors,
      uniforms: uniforms,
      pairIndex: -1,
      clock: new THREE.Clock(),
      time: 0,
      progress: 0,
      pointer: { x: 0, y: 0, tx: 0, ty: 0 },
      running: false,
      contextLost: false,
      raf: 0,
      onVisibility: null,
      onContextLost: null,
      onContextRestored: null
    };

    uploadPair(0);
    resize();

    // ---- lifecycle listeners ---------------------------------------
    state.onVisibility = function () {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener('visibilitychange', state.onVisibility);

    state.onContextLost = function (event) {
      event.preventDefault();
      if (state) {
        state.contextLost = true;
        stopLoop();
      }
    };
    state.onContextRestored = function () {
      if (state) {
        state.contextLost = false;
        if (!document.hidden) startLoop();
      }
    };
    canvasEl.addEventListener('webglcontextlost', state.onContextLost, false);
    canvasEl.addEventListener('webglcontextrestored', state.onContextRestored, false);

    if (!document.hidden) startLoop();
    return true;
  }

  function setFormation(f) {
    if (!state) return;
    f = clamp(isFinite(f) ? +f : 0, 0, 4);
    var idx = Math.min(Math.floor(f), 3);
    var frac = f - idx;
    if (idx !== state.pairIndex) uploadPair(idx); // only re-upload on pair change
    state.uniforms.uMix.value = frac; // shader applies smoothstep
  }

  function setProgress(p) {
    if (!state) return;
    p = clamp(isFinite(p) ? +p : 0, 0, 1);
    state.progress = p;
    state.uniforms.uProg.value = p;
  }

  function setPointer(x, y) {
    if (!state) return;
    state.pointer.tx = clamp(isFinite(x) ? +x : 0, -1, 1);
    state.pointer.ty = clamp(isFinite(y) ? +y : 0, -1, 1);
  }

  function setDim(d) {
    if (!state) return;
    state.uniforms.uDim.value = clamp(isFinite(d) ? +d : 0, 0, 1);
  }

  function resize() {
    if (!state) return;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.renderer.setPixelRatio(dpr);
    state.renderer.setSize(w, h, false);
    state.uniforms.uPixelRatio.value = dpr;
    state.camera.aspect = w / h;
    state.camera.updateProjectionMatrix();
    // slightly shrink formations on narrow portrait viewports
    var s = clamp(0.72 + 0.28 * (w / h), 0.8, 1);
    state.points.scale.setScalar(s);
  }

  function destroy() {
    if (!state) return;
    stopLoop();
    document.removeEventListener('visibilitychange', state.onVisibility);
    state.canvas.removeEventListener('webglcontextlost', state.onContextLost, false);
    state.canvas.removeEventListener('webglcontextrestored', state.onContextRestored, false);
    state.scene.remove(state.points);
    state.scene.remove(state.stars);
    state.geometry.dispose();
    state.material.dispose();
    state.starGeo.dispose();
    state.starMat.dispose();
    state.renderer.dispose();
    state = null;
  }

  window.CognexaScene = {
    init: init,
    setFormation: setFormation,
    setProgress: setProgress,
    setPointer: setPointer,
    setDim: setDim,
    resize: resize,
    destroy: destroy
  };
})();
