"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { sceneScrollProgress } from "@/components/webgl/sceneScroll";

// Фон страницы About — «фон 1» из макета (about-path.html): ночной город-силуэт
// вдоль изогнутой улицы, по которой течёт поток серебряных нитей к порталу
// света в конце пути. Камера едет по кривой от прокрутки страницы.
//
// Порт исходной сцены на three r128 → 0.169. Отличия только в том, что
// сломалось между версиями: outputEncoding → outputColorSpace и физические
// единицы у точечных источников (см. POINT_LIGHT_SCALE).

const CONFIG = {
  silver: "#eef0f2", // цвет потока (нейтральное серебро, без синевы)
  particleColor: "#e9dcc4", // цвет частиц (тёплая пыль в свете)
  roadWidth: 9, // ширина потока света
  streamSpeed: 0.1, // скорость «бега» линий вперёд
  particleCount: 340, // сколько частиц
  cameraHeight: 3.6, // высота камеры над дорогой
  scrollSmooth: 0.055, // плавность камеры (меньше = ленивее)
};

// С r165 точечные источники считаются в канделах: чтобы сохранить яркость
// исходной сцены (r128, «legacy lights»), интенсивность умножается на 4π.
const POINT_LIGHT_SCALE = 4 * Math.PI;

export default function AboutPathScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Без WebGL страница остаётся на картинке неба под виньеткой — сцена молча
    // не запускается, а не роняет рендер.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    // Supersampling => гладкие края потока. В макете потолок был 3, но там сцена
    // жила одна на странице; здесь она фон под контентом, и 3× на retina — это
    // 2.25× пикселей ради разницы, которой не видно. Потолок 2.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * 2, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // прозрачный фон => сквозь просвет видно небо-картинку
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.78;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a1728, 22, 150); // сине-бирюзовая дымка — глубина

    // ---- Карта окружения: ночное небо + свечение горизонта. Даёт поверхностям
    // отражения и мягкий отклик => объём вместо плоской тёмной текстурки.
    (function buildEnvironment() {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 256;
      const g = c.getContext("2d")!;
      const grad = g.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0.0, "#0b1a33"); // зенит
      grad.addColorStop(0.42, "#16294a");
      grad.addColorStop(0.52, "#33456b"); // свечение у горизонта
      grad.addColorStop(0.58, "#141a28");
      grad.addColorStop(1.0, "#05070d"); // земля
      g.fillStyle = grad;
      g.fillRect(0, 0, 512, 256);
      // тёплое зарево города у горизонта — тонкий цветовой акцент в отражениях
      const warm = g.createRadialGradient(150, 140, 0, 150, 140, 190);
      warm.addColorStop(0, "rgba(255,190,120,0.30)");
      warm.addColorStop(1, "rgba(255,190,120,0)");
      g.fillStyle = warm;
      g.fillRect(0, 0, 512, 256);
      const tex = new THREE.CanvasTexture(c);
      tex.mapping = THREE.EquirectangularReflectionMapping;
      const pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      scene.environment = pmrem.fromEquirectangular(tex).texture;
      pmrem.dispose();
      tex.dispose();
    })();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      400,
    );

    // ---- Дорога-кривая с поворотами влево/вправо и лёгкими подъёмами ----
    const raw: THREE.Vector3[] = [];
    const SEG = 16;
    for (let i = 0; i < SEG; i++) {
      const z = -i * 40;
      const x = Math.sin(i * 0.7) * 26 + Math.sin(i * 0.23) * 11;
      const y = Math.sin(i * 0.5) * 0.4; // слабая качель — нити не тонут под полом
      raw.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(raw, false, "catmullrom", 0.5);
    curve.arcLengthDivisions = 3000;

    const clampU = (u: number) => Math.max(0, Math.min(0.999, u));
    const perpXZ = (t: THREE.Vector3) => new THREE.Vector3(t.z, 0, -t.x).normalize();

    // ---- Освещение: очень тёмное, город читается силуэтом ----
    scene.add(new THREE.AmbientLight(0x101b30, 0.1));
    // верх прохладный, низ тёплый => объём, не плоско
    scene.add(new THREE.HemisphereLight(0x2d4468, 0x1c130b, 0.2));
    const keyLight = new THREE.DirectionalLight(0xb0bcd8, 0.16);
    keyLight.position.set(-0.6, 1.0, 0.35);
    scene.add(keyLight);
    const warmLight = new THREE.DirectionalLight(0xffd7a0, 0.09); // тёплый контровой
    warmLight.position.set(0.5, 0.35, -0.8);
    scene.add(warmLight);
    const followLight = new THREE.PointLight(
      new THREE.Color(CONFIG.silver),
      0.85 * POINT_LIGHT_SCALE,
      40,
      2,
    );
    scene.add(followLight);

    // ---- Тёмный «влажный асфальт»: ловит небо и огни ----
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1200, 2000),
      new THREE.MeshStandardMaterial({
        color: 0x080b14,
        roughness: 0.42,
        metalness: 0.45,
        envMapIntensity: 0.6,
      }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.8;
    scene.add(ground);

    // ---- Хелперы ----
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const randInt = (n: number) => Math.floor(Math.random() * n);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // ---- Ночной город: архитектурные объёмы (стилобат, отступы, парапеты) ----
    const GROUND_Y = -0.8;
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);

    // бетон / камень / стекло / тёмный металл — разный отклик на свет
    const cityMats = [
      new THREE.MeshStandardMaterial({ color: 0x0b0f18, roughness: 0.88, metalness: 0.06, envMapIntensity: 0.22 }),
      new THREE.MeshStandardMaterial({ color: 0x0f141e, roughness: 0.58, metalness: 0.14, envMapIntensity: 0.38 }),
      new THREE.MeshStandardMaterial({ color: 0x070c17, roughness: 0.14, metalness: 0.78, envMapIntensity: 0.95 }),
      new THREE.MeshStandardMaterial({ color: 0x070a10, roughness: 0.38, metalness: 0.62, envMapIntensity: 0.55 }),
    ];
    const cityParts = cityMats.map(() => ({ m: [] as THREE.Matrix4[], c: [] as THREE.Color[] }));
    const _dm = new THREE.Object3D();
    const _cc = new THREE.Color();
    function part(
      b: number,
      cx: number,
      cy: number,
      cz: number,
      w: number,
      h: number,
      d: number,
      rotY: number,
      tint: number,
    ) {
      _dm.position.set(cx, cy, cz);
      _dm.rotation.set(0, rotY, 0);
      _dm.scale.set(w, h, d);
      _dm.updateMatrix();
      cityParts[b].m.push(_dm.matrix.clone());
      cityParts[b].c.push(_cc.setScalar(tint).clone());
    }

    // одно здание = составленный объём, а не куб
    function addBuilding(x: number, z: number, w: number, h: number, d: number, rotY: number) {
      const tall = h > 30;
      const ca = Math.cos(rotY);
      const sa = Math.sin(rotY);
      const wx = (ox: number, oz: number) => x + ox * ca + oz * sa; // локальные оси -> мир
      const wz = (ox: number, oz: number) => z - ox * sa + oz * ca;
      const tint = () => 0.74 + Math.random() * 0.3;
      const bMain = Math.random() < 0.2 ? 2 : Math.random() < 0.5 ? 0 : 1; // 20% стеклянных башен
      const bTrim = Math.random() < 0.5 ? 1 : 3;
      const base = GROUND_Y - 0.05;

      // стилобат — здание «стоит», а не воткнуто в землю
      const podH = Math.min(h * 0.2, tall ? 6.5 : 3);
      part(bTrim, x, base + podH / 2, z, w * 1.15, podH, d * 1.15, rotY, tint());

      // ствол с отступами (setbacks) + карниз на каждом уступе
      let y = base + podH;
      let cw = w;
      let cd = d;
      let remain = h - podH;
      const stages = tall ? (Math.random() < 0.5 ? 3 : 2) : 1;
      for (let s = 0; s < stages; s++) {
        const isLast = s === stages - 1;
        const segH = isLast ? remain : remain * rand(0.44, 0.62);
        part(bMain, x, y + segH / 2, z, cw, segH, cd, rotY, tint());

        // вертикальные рёбра-пилястры — читаемая архитектура в силуэте
        if (segH > 6) {
          const nf = 2 + randInt(3);
          for (let f = 0; f < nf; f++) {
            const t = (f / (nf - 1 || 1) - 0.5) * cw * 0.82;
            for (const sgn of [-1, 1]) {
              part(
                bTrim,
                wx(t, (sgn * cd) / 2),
                y + segH / 2,
                wz(t, (sgn * cd) / 2),
                Math.max(0.32, cw * 0.045),
                segH * 0.94,
                0.34,
                rotY,
                tint() * 1.2,
              );
            }
          }
        }
        y += segH;
        remain -= segH;
        part(bTrim, x, y + 0.32, z, cw * 1.07, 0.64, cd * 1.07, rotY, tint() * 1.25); // парапет
        if (isLast) break;
        cw *= rand(0.7, 0.86);
        cd *= rand(0.7, 0.86);
      }

      // кровля: машинное отделение и шпиль
      if (Math.random() < 0.8) {
        const mw = cw * rand(0.3, 0.55);
        const md = cd * rand(0.3, 0.55);
        const mh = rand(1.2, 3.2) * (tall ? 1.5 : 0.7);
        const ox = (Math.random() - 0.5) * cw * 0.3;
        const oz = (Math.random() - 0.5) * cd * 0.3;
        part(bTrim, wx(ox, oz), y + 0.64 + mh / 2, wz(ox, oz), mw, mh, md, rotY, tint());
        if (Math.random() < 0.95) {
          const m2 = cw * rand(0.18, 0.3);
          part(bTrim, wx(-ox * 1.4, -oz), y + 0.64 + mh * 0.4, wz(-ox * 1.4, -oz), m2, mh * 0.8, m2, rotY, tint());
        }
      }
      if (tall && Math.random() < 0.42) {
        const sh = rand(5, 13); // шпиль/мачта
        part(3, x, y + 1 + sh / 2, z, 0.34, sh, 0.34, rotY, 1.3);
      }
    }

    // после расстановки — собрать город в инстансы (4 draw call вместо тысяч)
    const cityMeshes: THREE.InstancedMesh[] = [];
    function buildCity() {
      for (let b = 0; b < cityMats.length; b++) {
        const bucket = cityParts[b];
        if (!bucket.m.length) continue;
        const inst = new THREE.InstancedMesh(boxGeo, cityMats[b], bucket.m.length);
        for (let i = 0; i < bucket.m.length; i++) {
          inst.setMatrixAt(i, bucket.m[i]);
          inst.setColorAt(i, bucket.c[i]);
        }
        inst.instanceMatrix.needsUpdate = true;
        if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
        inst.frustumCulled = false;
        scene.add(inst);
        cityMeshes.push(inst);
      }
    }

    // ---- Коридор пути: дом не ставим, если он влезает в трубу вокруг тропы ----
    const pathPts: number[] = [];
    for (let i = 0; i <= 140; i++) {
      const pp = curve.getPointAt(clampU(i / 140));
      pathPts.push(pp.x, pp.z);
    }
    function clearOfPath(x: number, z: number, r: number) {
      const need = CONFIG.roadWidth / 2 + 3 + r; // полдороги + запас + радиус дома
      for (let i = 0; i < pathPts.length; i += 2) {
        const dx = x - pathPts[i];
        const dz = z - pathPts[i + 1];
        if (dx * dx + dz * dz < need * need) return false;
      }
      return true;
    }

    // ---- Город-силуэт вдоль улицы ----
    const CITY_STEP = 7;
    const nBld = Math.max(1, Math.floor(curve.getLength() / CITY_STEP));
    for (let k = 0; k <= nBld; k++) {
      const u = clampU(k / nBld);
      const p = curve.getPointAt(u);
      const tg = curve.getTangentAt(u);
      const n = perpXZ(tg);
      const face = Math.atan2(tg.x, tg.z);
      for (const side of [-1, 1]) {
        const w = rand(6, 13);
        const d = rand(6, 13);
        const h = rand(9, 26);
        const off = CONFIG.roadWidth / 2 + 4.5 + Math.max(w, d) * 0.66 + rand(0, 2);
        const bx = p.x + n.x * off * side;
        const bz = p.z + n.z * off * side;
        if (clearOfPath(bx, bz, Math.max(w, d) * 0.75)) addBuilding(bx, bz, w, h, d, face + rand(-0.09, 0.09));

        const w2 = rand(8, 16);
        const d2 = rand(8, 16);
        const h2 = rand(22, 52);
        const off2 = off + Math.max(w, d) * 0.5 + rand(2, 6) + Math.max(w2, d2) * 0.5;
        const bx2 = p.x + n.x * off2 * side;
        const bz2 = p.z + n.z * off2 * side;
        if (clearOfPath(bx2, bz2, Math.max(w2, d2) * 0.75)) addBuilding(bx2, bz2, w2, h2, d2, face + rand(-0.16, 0.16));

        if (Math.random() < 0.45) {
          const w3 = rand(10, 20);
          const d3 = rand(10, 20);
          const h3 = rand(40, 78);
          const off3 = off + rand(26, 48) + Math.max(w3, d3) * 0.5;
          const bx3 = p.x + n.x * off3 * side;
          const bz3 = p.z + n.z * off3 * side;
          if (clearOfPath(bx3, bz3, Math.max(w3, d3) * 0.75)) addBuilding(bx3, bz3, w3, h3, d3, face + rand(-0.3, 0.3));
        }
      }
    }

    // ---- Логическое завершение: в конце улицу замыкает стена небоскрёбов ----
    (function endSkyline() {
      const pE = curve.getPointAt(0.999);
      const tE = curve.getTangentAt(0.999);
      const nE = perpXZ(tE);
      const fln = Math.hypot(tE.x, tE.z) || 1;
      const face = Math.atan2(tE.x, tE.z);
      for (let lat = -34; lat <= 34; lat += 9) {
        for (let row = 0; row < 3; row++) {
          const fwd = 27 + row * 15 + rand(0, 7); // за концом пути
          const w = rand(8, 16);
          const h = rand(30, 62) + row * 11;
          const d = rand(8, 16);
          addBuilding(
            pE.x + nE.x * lat + (tE.x / fln) * fwd + rand(-2, 2),
            pE.z + nE.z * lat + (tE.z / fln) * fwd + rand(-2, 2),
            w,
            h,
            d,
            face + rand(-0.12, 0.12),
          );
        }
      }
    })();

    buildCity(); // весь город одним махом => качество без просадки FPS

    // ---- Тропинка = живой поток светящихся нитей + мягкое свечение-русло ----
    const silverCol = new THREE.Color(CONFIG.silver);
    const rw = CONFIG.roadWidth;
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const STRANDS = 35;
    const MPTS = 180;
    const H = 3;
    const STRAND_W = 0.15; // мировая толщина нити — вдали тоньше сама собой
    const lim = rw * 0.62;

    // центральная линия пути — считается один раз
    const CPX = new Float32Array(MPTS);
    const CPY = new Float32Array(MPTS);
    const CPZ = new Float32Array(MPTS);
    const CNX = new Float32Array(MPTS);
    const CNZ = new Float32Array(MPTS);
    for (let i = 0; i < MPTS; i++) {
      const u = clampU(i / (MPTS - 1));
      const p = curve.getPointAt(u);
      const nr = perpXZ(curve.getTangentAt(u));
      CPX[i] = p.x;
      CPY[i] = p.y;
      CPZ[i] = p.z;
      CNX[i] = nr.x;
      CNZ[i] = nr.z;
    }

    // точка схода потока — «портал света» в конце пути
    const portalP = curve.getPointAt(0.999);
    const portalPos = new THREE.Vector3(portalP.x, portalP.y + 0.6, portalP.z);

    // параметры нитей: базовое смещение + 3 бегущие волны (живое течение)
    const sBase = new Float32Array(STRANDS);
    const sBright = new Float32Array(STRANDS);
    const sPhase = new Float32Array(STRANDS);
    const hAmp = new Float32Array(STRANDS * H);
    const hFreq = new Float32Array(STRANDS * H);
    const hSpd = new Float32Array(STRANDS * H);
    const hPh = new Float32Array(STRANDS * H);
    for (let s = 0; s < STRANDS; s++) {
      sBase[s] = gauss() * (rw * 0.4);
      sBright[s] = 0.25 + Math.pow(Math.random(), 1.5) * 1.0;
      sPhase[s] = Math.random() * 6.283;
      for (let k = 0; k < H; k++) {
        hAmp[s * H + k] = (rand(0.3, 1.4) * (rw * 0.12)) / (k + 1);
        hFreq[s * H + k] = rand(1.5, 4.5) * (k + 1);
        hSpd[s * H + k] = rand(0.35, 1.05) * (k % 2 ? -1 : 1);
        hPh[s * H + k] = Math.random() * 6.283;
      }
    }

    // каждая нить — билборд-лента (9 вершин поперёк) => гладкая круглая «трубка»
    const VPP = 9;
    const VPS = MPTS * VPP;
    const V = STRANDS * VPS;
    const profM = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1]; // смещение поперёк
    const profB = [0.0, 0.146, 0.5, 0.854, 1.0, 0.854, 0.5, 0.146, 0.0]; // мягкое сечение
    const strandPosArr = new Float32Array(V * 3);
    const strandColArr = new Float32Array(V * 3);
    const strandGeo = new THREE.BufferGeometry();
    strandGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(strandPosArr, 3).setUsage(THREE.DynamicDrawUsage),
    );
    strandGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(strandColArr, 3).setUsage(THREE.DynamicDrawUsage),
    );
    // индексы (топология постоянна) — строим один раз
    const IdxType = V > 65535 ? Uint32Array : Uint16Array;
    const idxArr = new IdxType(STRANDS * (MPTS - 1) * (VPP - 1) * 6);
    let ip = 0;
    for (let s = 0; s < STRANDS; s++) {
      const b = s * VPS;
      for (let i = 0; i < MPTS - 1; i++) {
        const a0 = b + i * VPP;
        const a1 = b + (i + 1) * VPP;
        for (let c = 0; c < VPP - 1; c++) {
          const v0 = a0 + c;
          const v1 = v0 + 1;
          const v2 = a1 + c;
          const v3 = v2 + 1;
          idxArr[ip++] = v0;
          idxArr[ip++] = v1;
          idxArr[ip++] = v3;
          idxArr[ip++] = v0;
          idxArr[ip++] = v3;
          idxArr[ip++] = v2;
        }
      }
    }
    strandGeo.setIndex(new THREE.BufferAttribute(idxArr, 1));
    const strandMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      toneMapped: false,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      fog: true,
    });
    const strands = new THREE.Mesh(strandGeo, strandMat);
    strands.frustumCulled = false;
    scene.add(strands);

    const cxA = new Float32Array(MPTS);
    const cyA = new Float32Array(MPTS);
    const czA = new Float32Array(MPTS);
    function updateStrands(time: number) {
      const bwSpeed = CONFIG.streamSpeed * 7.0;
      const camx = camera.position.x;
      const camy = camera.position.y;
      const camz = camera.position.z;
      let vp = 0;
      let cp = 0;
      for (let s = 0; s < STRANDS; s++) {
        const base = sBase[s];
        const br = sBright[s];
        const sph = sPhase[s];
        const o = s * H;
        const halfW = STRAND_W * (0.7 + br * 0.4);
        // 1) центральная линия нити
        for (let i = 0; i < MPTS; i++) {
          const uN = i / (MPTS - 1);
          let lat =
            base +
            hAmp[o] * Math.sin(hFreq[o] * uN - time * hSpd[o] + hPh[o]) +
            hAmp[o + 1] * Math.sin(hFreq[o + 1] * uN - time * hSpd[o + 1] + hPh[o + 1]) +
            hAmp[o + 2] * Math.sin(hFreq[o + 2] * uN - time * hSpd[o + 2] + hPh[o + 2]);
          if (lat > lim) lat = lim;
          else if (lat < -lim) lat = -lim;
          let conv = (uN - 0.82) / 0.18;
          conv = conv <= 0 ? 0 : conv >= 1 ? 1 : conv * conv * (3 - 2 * conv);
          // к концу нити стягиваются в портал
          cxA[i] = lerp(CPX[i] + CNX[i] * lat, portalPos.x, conv);
          cyA[i] = lerp(CPY[i] + 0.05, portalPos.y, conv);
          czA[i] = lerp(CPZ[i] + CNZ[i] * lat, portalPos.z, conv);
        }
        // 2) билборд-сечение вокруг линии (смотрит на камеру => круглая трубка)
        for (let i = 0; i < MPTS; i++) {
          const ia = i > 0 ? i - 1 : 0;
          const ib = i < MPTS - 1 ? i + 1 : MPTS - 1;
          const tx = cxA[ib] - cxA[ia];
          const ty = cyA[ib] - cyA[ia];
          const tz = czA[ib] - czA[ia];
          const vx = cxA[i] - camx;
          const vy = cyA[i] - camy;
          const vz = czA[i] - camz;
          let sx = ty * vz - tz * vy;
          let sy = tz * vx - tx * vz;
          let sz = tx * vy - ty * vx;
          let sl = Math.sqrt(sx * sx + sy * sy + sz * sz);
          if (sl < 1e-4) {
            sx = CNX[i];
            sy = 0;
            sz = CNZ[i];
            sl = Math.sqrt(sx * sx + sz * sz) || 1;
          }
          sx /= sl;
          sy /= sl;
          sz /= sl;
          const uN = i / (MPTS - 1);
          const wv = 0.5 + 0.5 * Math.sin(uN * 7.0 - time * bwSpeed + sph);
          let conv = (uN - 0.82) / 0.18;
          conv = conv <= 0 ? 0 : conv >= 1 ? 1 : conv * conv * (3 - 2 * conv);
          const cB = br * (0.28 + 0.72 * wv * wv) * (1 + conv * 0.7); // к порталу разгораются
          const wfac = 1 - 0.5 * conv; // и сужаются к точке схода
          const cx = cxA[i];
          const cy = cyA[i];
          const cz = czA[i];
          for (let m = 0; m < VPP; m++) {
            const off = halfW * wfac * profM[m];
            strandPosArr[vp++] = cx + sx * off;
            strandPosArr[vp++] = cy + sy * off;
            strandPosArr[vp++] = cz + sz * off;
            const bcol = cB * profB[m];
            strandColArr[cp++] = silverCol.r * bcol;
            strandColArr[cp++] = silverCol.g * bcol;
            strandColArr[cp++] = silverCol.b * bcol;
          }
        }
      }
      strandGeo.attributes.position.needsUpdate = true;
      strandGeo.attributes.color.needsUpdate = true;
    }
    updateStrands(0);

    // мягкое свечение-русло под нитями — даёт объём потоку
    const glowTex = (function () {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 256;
      const g = c.getContext("2d")!;
      g.fillStyle = "#000";
      g.fillRect(0, 0, 64, 256);
      const grad = g.createLinearGradient(0, 0, 64, 0);
      grad.addColorStop(0.0, "rgba(0,0,0,0)");
      grad.addColorStop(0.5, "rgba(255,255,255,0.55)");
      grad.addColorStop(1.0, "rgba(0,0,0,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 256); // только гладкий поперечный градиент — без полос
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      return t;
    })();
    const glowGeo = (function () {
      const S = 320;
      const half = rw * 0.55;
      const GR = 16;
      const pos: number[] = [];
      const uv: number[] = [];
      const idx: number[] = [];
      let dist = 0;
      let prev: THREE.Vector3 | null = null;
      for (let i = 0; i <= S; i++) {
        const u = clampU(i / S);
        const p = curve.getPointAt(u);
        const nr = perpXZ(curve.getTangentAt(u));
        const L = p.clone().addScaledVector(nr, half);
        const R = p.clone().addScaledVector(nr, -half);
        if (prev) dist += p.distanceTo(prev);
        prev = p.clone();
        pos.push(L.x, L.y + 0.03, L.z, R.x, R.y + 0.03, R.z);
        uv.push(0, dist / GR, 1, dist / GR);
      }
      for (let i = 0; i < S; i++) {
        const a = i * 2;
        const b = i * 2 + 1;
        const c = (i + 1) * 2;
        const d = (i + 1) * 2 + 1;
        idx.push(a, b, d, a, d, c);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      g.setIndex(idx);
      return g;
    })();
    const glow = new THREE.Mesh(
      glowGeo,
      new THREE.MeshBasicMaterial({
        map: glowTex,
        color: silverCol,
        transparent: true,
        opacity: 0.3,
        toneMapped: false,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: true,
      }),
    );
    glow.frustumCulled = false;
    scene.add(glow);

    // ---- Портал света: ядро + мягкое свечение спрайтом (depthTest => дома перекрывают) ----
    const glowTexP = (function () {
      const s = 256;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const g = c.getContext("2d")!;
      const rg = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      rg.addColorStop(0.0, "rgba(255,255,255,1)");
      rg.addColorStop(0.16, "rgba(255,255,255,0.5)");
      rg.addColorStop(0.42, "rgba(255,255,255,0.14)");
      rg.addColorStop(1.0, "rgba(255,255,255,0)");
      g.fillStyle = rg;
      g.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(c);
    })();
    const portalGroup = new THREE.Group();
    portalGroup.position.copy(portalPos);
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false, toneMapped: false }),
    );
    portalGroup.add(core);
    function makeGlow(scale: number, opacity: number) {
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexP,
          color: new THREE.Color(0xffe6bc),
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          depthTest: true,
          fog: false,
          toneMapped: false,
        }),
      );
      sp.scale.set(scale, scale, 1);
      portalGroup.add(sp);
      return sp;
    }
    makeGlow(7, 0.6);
    makeGlow(15, 0.3);
    portalGroup.frustumCulled = false;
    scene.add(portalGroup);
    const portalLight = new THREE.PointLight(0xffdca2, 1.2 * POINT_LIGHT_SCALE, 40, 2);
    portalLight.position.copy(portalPos);
    scene.add(portalLight);

    // ---- Частицы, «отлетающие» от тропинки ----
    const soft = (function () {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d")!;
      const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      rg.addColorStop(0, "rgba(255,255,255,1)");
      rg.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = rg;
      g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();
    const P = CONFIG.particleCount;
    const ppos = new Float32Array(P * 3);
    const pbase = new Float32Array(P * 2); // x, z фиксированы
    const pspeed = new Float32Array(P);
    const ptop = 9;
    for (let i = 0; i < P; i++) {
      const u = clampU(Math.random());
      const p = curve.getPointAt(u);
      const n = perpXZ(curve.getTangentAt(u));
      const off = (Math.random() - 0.5) * CONFIG.roadWidth * 1.5;
      const x = p.x + n.x * off;
      const z = p.z + n.z * off;
      pbase[i * 2] = x;
      pbase[i * 2 + 1] = z;
      ppos[i * 3] = x;
      ppos[i * 3 + 1] = Math.random() * ptop;
      ppos[i * 3 + 2] = z;
      pspeed[i] = rand(0.4, 1.2);
    }
    const pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute("position", new THREE.BufferAttribute(ppos, 3));
    const pmat = new THREE.PointsMaterial({
      color: new THREE.Color(CONFIG.particleColor),
      size: 0.28,
      map: soft,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pgeo, pmat);
    scene.add(particles);

    // ---- Прокрутка страницы ведёт камеру по кривой ----
    let targetT = 0;
    let curT = 0;
    const maxU = 0.955;
    function readScroll() {
      targetT = sceneScrollProgress();
    }
    window.addEventListener("scroll", readScroll, { passive: true });
    readScroll();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    const lookAt = new THREE.Vector3();
    let raf = 0;

    function frame() {
      const dt = Math.min(clock.getDelta(), 0.05);

      // камера едет по кривой согласно прокрутке (плавно)
      curT += (targetT - curT) * CONFIG.scrollSmooth;
      const uCam = clampU(curT * maxU);
      const p = curve.getPointAt(uCam);
      const pa = curve.getPointAt(clampU(uCam + 0.06)); // направление ВДОЛЬ пути
      const camH = CONFIG.cameraHeight;
      const dx = pa.x - p.x;
      const dz = pa.z - p.z;
      const dl = Math.hypot(dx, dz) || 1;
      camera.position.set(p.x, p.y + camH, p.z);
      // цель на фикс. расстоянии по направлению пути + фикс. наклон вниз:
      // и по поворотам ведёт, и наклон стабильный
      lookAt.set(p.x + (dx / dl) * 25, p.y + camH - 3.0, p.z + (dz / dl) * 25);
      camera.lookAt(lookAt);
      followLight.position.set(p.x, p.y + 7, p.z);

      if (!reduce) {
        updateStrands(clock.elapsedTime); // нити текут вперёд
        glowTex.offset.y -= CONFIG.streamSpeed * dt; // свечение-русло плывёт следом
        const pz = 0.94 + 0.07 * Math.sin(clock.elapsedTime * 1.6); // пульсация портала
        portalGroup.scale.setScalar(pz);
        portalLight.intensity =
          (1.0 + 0.4 * (0.5 + 0.5 * Math.sin(clock.elapsedTime * 1.6))) * POINT_LIGHT_SCALE;
        // частицы медленно поднимаются и заново
        const et = clock.elapsedTime;
        for (let i = 0; i < P; i++) {
          let y = ppos[i * 3 + 1] + pspeed[i] * dt;
          if (y > ptop) y -= ptop;
          ppos[i * 3 + 1] = y;
          ppos[i * 3] = pbase[i * 2] + Math.sin(et * 0.5 + i * 1.3) * 0.5; // мягкий дрейф
          ppos[i * 3 + 2] = pbase[i * 2 + 1] + Math.cos(et * 0.4 + i * 0.7) * 0.5;
        }
        pgeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    frame();

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", onResize);
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        // Спрайты в three делят одну геометрию на всё приложение — освободить её
        // здесь значит погасить спрайты в других сценах (например, на Contact).
        if (mesh.geometry && !(o as THREE.Sprite).isSprite) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      boxGeo.dispose();
      glowTex.dispose();
      glowTexP.dispose();
      soft.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Небо — картинка под прозрачным канвасом */}
      <div
        className="fixed inset-0 z-0"
        style={{ background: "#03060e url(/redesign/about/sky.jpg) center 28% / cover no-repeat" }}
      />
      <canvas ref={canvasRef} className="fixed inset-0 z-[1] block h-full w-full" />
      {/* Виньетка — притемняет края, держит текст читаемым */}
      <div
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.78))",
        }}
      />
    </>
  );
}
