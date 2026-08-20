"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

// Фон страницы Contact — «фон 2» из макета (contact-cube.html): куб-монолит
// над ночной водой на фоне луны. Прокрутка поднимает куб и камеру и
// доворачивает кувырок — хореография снята с референса.
//
// Порт исходной сцены на three r128 → 0.169. Текстуры, вшитые в макет
// base64-строками, вынесены в /public/redesign/contact/.

const CONFIG = {
  silver: "#dfe8ff", // свечение куба: лунное серебро с голубизной
  cubeSize: 3.0, // ребро куба
  cubeY: 2.6, // высота куба над водой
  rotationSpeed: -0.1, // скорость вращения
  bobSpeed: 0.7, // скорость покачивания
  bobAmount: 0.15, // амплитуда покачивания
  particleCount: 560, // искорки над водой
  scrollSmooth: 0.16, // отклик на скролл
};

const TEX = "/redesign/contact";

export default function ContactCubeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Без WebGL остаётся картинка луны под виньеткой.
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
    // Потолок 2, а не 3 как в макете: сцена работает фоном под контентом.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * 2, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // прозрачный фон => видно картинку с луной
    // Макет писался под r128, где вывод по умолчанию линейный. С r152 значение
    // по умолчанию — sRGB, и без этой строки сцена выцветает.
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    // Взгляд строго горизонтальный, камера НЕ вращается; по скроллу поднимается
    // вместе с кубом и слегка наезжает.
    const CAM = { y0: 2.0, z0: 11.2, z1: 8.4 };
    const CUBE_RISE = 7.2; // подъём куба и камеры за прокрутку
    camera.position.set(0, CAM.y0, CAM.z0);
    camera.rotation.set(0, 0, 0);

    const silverCol = new THREE.Color(CONFIG.silver);
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const loader = new THREE.TextureLoader();
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const loadTex = (file: string, onLoad?: (t: THREE.Texture) => void) => {
      const t = loader.load(`${TEX}/${file}`, onLoad);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = maxAniso;
      return t;
    };

    // ---- Задник: картинка с луной внутри сцены — попадает в отражения на воде ----
    scene.add(camera);
    const bgTex = loadTex("moon.jpg");
    const BG_DIST = 150;
    const BG_ASPECT = 2688 / 1520;
    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map: bgTex, side: THREE.DoubleSide, fog: false }),
    );
    // задник стоит В МИРЕ, а не на камере: при подъёме камеры вода и задник
    // уходят вниз кадра вместе — вода не «ходит» по картинке
    const BG_Z = CAM.z0 - BG_DIST;
    const BG_CY = CAM.y0 + CUBE_RISE / 2;
    bg.position.set(0, BG_CY, BG_Z);
    scene.add(bg);
    function sizeBg() {
      const dist = CAM.z0 + 6 - BG_Z; // самый дальний случай (интро-подъезд)
      const h = 2 * dist * Math.tan((camera.fov * Math.PI) / 360);
      const w = h * Math.max(camera.aspect, 1.8);
      let sw = w * 1.25;
      let sh = sw / BG_ASPECT; // запас по краям + на ход камеры
      const hNeed = h * 1.25 + CUBE_RISE;
      if (sh < hNeed) {
        sh = hNeed;
        sw = sh * BG_ASPECT;
      }
      bg.scale.set(sw, sh, 1);
    }
    sizeBg();

    // процедурный шум для reveal-проявления: гладкие бесшовные пятна
    const noiseTex = (function () {
      const S = 512;
      const c = document.createElement("canvas");
      c.width = c.height = S;
      const g = c.getContext("2d")!;
      g.fillStyle = "#3c3c3c";
      g.fillRect(0, 0, S, S);
      g.globalCompositeOperation = "lighter";
      for (let i = 0; i < 240; i++) {
        const x = Math.random() * S;
        const y = Math.random() * S;
        const r = 40 + Math.random() * 150;
        const a = 0.05 + Math.random() * 0.09;
        for (let ox = -1; ox <= 1; ox++)
          for (let oy = -1; oy <= 1; oy++) {
            const rg = g.createRadialGradient(x + ox * S, y + oy * S, 0, x + ox * S, y + oy * S, r);
            rg.addColorStop(0, `rgba(255,255,255,${a})`);
            rg.addColorStop(1, "rgba(255,255,255,0)");
            g.fillStyle = rg;
            g.beginPath();
            g.arc(x + ox * S, y + oy * S, r, 0, Math.PI * 2);
            g.fill();
          }
      }
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      return t;
    })();

    // ---- Текстуры куба: грань с референса + «чистая» грань без знака (для боков) ----
    const cleanCanvas = document.createElement("canvas");
    cleanCanvas.width = cleanCanvas.height = 1024;
    const cleanTex = new THREE.CanvasTexture(cleanCanvas);
    cleanTex.anisotropy = maxAniso;
    const faceTex = loadTex("face.jpg", (t) => {
      // боковые грани: та же картинка, но знак закрыт заплаткой из чистых панелей снизу
      const g = cleanCanvas.getContext("2d")!;
      const img = t.image as HTMLImageElement;
      const S = 1024;
      g.drawImage(img, 0, 0, S, S);
      g.save();
      g.translate(0.12 * S, 0.9 * S);
      g.scale(1, -1);
      g.drawImage(
        img,
        0.02 * img.width,
        0.58 * img.height,
        0.42 * img.width,
        0.4 * img.height,
        0,
        0,
        0.78 * S,
        0.78 * S,
      );
      g.restore();
      cleanTex.needsUpdate = true;
    });
    const edgesTex = loadTex("edges.png"); // карта швов — для вспышек сетки
    const gridTex = loadTex("grid.png"); // мозаика панелей — танец света и параллакс

    // ---- Материалы: общие uniforms, у каждой части своя светимость (uShade) ----
    const cubeUniforms = {
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uColor: { value: new THREE.Vector3(silverCol.r, silverCol.g, silverCol.b) },
    };
    const cubeMats: THREE.ShaderMaterial[] = [];
    function makeCubeMat(tex: THREE.Texture, shade: number) {
      const m = new THREE.ShaderMaterial({
        uniforms: {
          uTime: cubeUniforms.uTime,
          uReveal: cubeUniforms.uReveal,
          uColor: cubeUniforms.uColor,
          uShade: { value: shade },
          tFace: { value: tex },
          tEdges: { value: edgesTex },
          tGrid: { value: gridTex },
          tNoise: { value: noiseTex },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            vUv = uv;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vViewDir = -mv.xyz;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform float uReveal;
          uniform float uShade;
          uniform vec3  uColor;
          uniform sampler2D tFace;
          uniform sampler2D tEdges;
          uniform sampler2D tGrid;
          uniform sampler2D tNoise;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewDir;
          // трёхцветный градиент референса
          vec3 threeGrad(vec3 c1, vec3 c2, vec3 c3, float s1, float s2, float s3, float s4, float t) {
            vec3 c = mix(c1, c2, smoothstep(s1, s2, t));
            return mix(c, c3, smoothstep(s3, s4, t));
          }
          void main() {
            vec3 col = texture2D(tFace, vUv).rgb;
            // замазать тёмные крапины фото-грани: жёсткий пол + подтяжка теней к серебру
            float flum = dot(col, vec3(0.333));
            col = mix(vec3(0.52), col, smoothstep(0.26, 0.5, flum));
            col = max(col, vec3(0.4));   // ни один тексель не темнее серого
            float pulse = 0.92 + 0.08 * sin(uTime * 0.9);
            col *= vec3(0.56, 0.6, 0.7) * pulse * uShade;   // база тёмного серебра
            // внутренний свет — пятно гуляет по граням
            vec2 lobePos = vec2(0.5 + 0.2 * sin(uTime * 0.21), 0.42 + 0.16 * cos(uTime * 0.17));
            float lobe = smoothstep(0.75, 0.05, distance(vUv, lobePos));
            col *= 1.0 + lobe * lobe * 0.3;

            // 1) живой перелив: кросс-фейд двух слоёв шума — узор морфится на месте
            float na = texture2D(tNoise, vUv * vec2(0.89, 1.17) + vec2(uTime * 0.05, uTime * 0.032)).r;
            float nb = texture2D(tNoise, vUv * vec2(1.31, 0.83) - vec2(uTime * 0.037, uTime * 0.049)).r;
            float xf = 0.5 + 0.5 * sin(uTime * 0.55);
            float gn = pow(clamp(mix(na, nb, xf) * 1.15, 0.0, 1.0), 1.13);
            vec3 grad = threeGrad(
              vec3(0.05, 0.065, 0.11),      // глубокая холодная тень
              vec3(0.38, 0.44, 0.55),       // среднее серебро
              vec3(0.82, 0.9, 1.05),        // лунный белый
              0.0, 0.29, 0.7, 0.99, gn);
            col += grad * 0.38;
            // 2) мозаика панелей «переплывает»: каждая дышит по своей фазе
            vec2 guv = (vUv - 0.5) * -0.27 + 0.5 + vec2(1.32, 0.0);
            float gRaw = texture2D(tGrid, guv).r;
            float gs = pow(gRaw, 0.1);
            gs = 0.4 + gs * 0.6;
            float panelWave = 0.5 + 0.5 * sin(uTime * 0.75 + gRaw * 34.0 + (na + nb) * 3.14159);
            gs *= 0.74 + 0.5 * panelWave;
            col *= mix(1.0, gs, 1.5);
            // 3) параллакс-глубина стекла: внутренние слои едут при вращении
            vec3 V = normalize(vViewDir);
            vec2 pshift = V.xy * 0.05;
            float in1 = pow(texture2D(tGrid, guv * 0.9 + pshift).r, 2.0);
            float in2 = pow(texture2D(tGrid, guv * 1.35 + pshift * 2.2).r, 2.0);
            col += (in1 * 0.09 + in2 * 0.06) * (0.35 + 0.65 * gn) * vec3(0.78, 0.85, 1.0);
            // 4) «дышащие» полосы сверху/снизу — серебристые
            float nts = texture2D(tNoise, vUv * vec2(0.55, 0.13) + vec2(uTime * 0.01)).r;
            float bandUV = vUv.y + (nts - 0.5) * 0.26;
            float xh = threeGrad(vec3(1.0), vec3(0.0), vec3(1.0), -0.15, 0.33, 0.52, 1.15, bandUV).r;
            col += xh * vec3(0.72, 0.8, 1.0) * 0.2;
            // 5) сетка вспыхивает там, где проходит волна
            float eg = texture2D(tEdges, guv).r;
            eg = pow(eg, 1.58);
            eg = 1.0 - smoothstep(0.79, 0.9, eg);
            col += eg * 0.3 * (col + grad * 1.5);
            // 6) холодный буст светов + контраст
            col += vec3(0.24, 0.28, 0.38) * col * 0.3;
            col = pow(col, vec3(1.12));
            col *= 0.8;   // -20% общей яркости

            // френель — контур разгорается
            float fres = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDir))), 3.0);
            col *= 1.0 + fres * 0.7;
            col += uColor * fres * 0.25;
            // reveal: проявление пятнами шума + светлая кромка
            float n = texture2D(tNoise, vUv * 2.0).r;
            float rv = smoothstep(n - 0.25, n, uReveal * 1.25);
            float rvEdge = rv * (1.0 - smoothstep(n, n + 0.12, uReveal * 1.25));
            col *= rv;
            col += vec3(0.85, 0.9, 1.0) * rvEdge * 1.6;
            // ---- вписываем куб в сцену: гамма фона/воды + атмосферная дымка ----
            col *= vec3(0.72, 0.92, 1.0);                  // сине-бирюзовый тон ночи
            col *= 0.80;                                    // куб был ярче окружения
            col = mix(col, vec3(0.09, 0.14, 0.19), 0.16);   // дымка сцены
            gl_FragColor = vec4(col, 1.0);
          }`,
        side: THREE.DoubleSide,
        fog: false,
      });
      cubeMats.push(m);
      return m;
    }

    // ---- Куб с настоящей 3D-выемкой: только спереди и сзади ----
    const cubeGroup = new THREE.Group(); // позиция + покачивание
    cubeGroup.position.set(0, CONFIG.cubeY, 0);
    scene.add(cubeGroup);
    const spin = new THREE.Group(); // кувырок от прокрутки
    cubeGroup.add(spin);
    const tilt = new THREE.Group();
    spin.add(tilt);

    const s = CONFIG.cubeSize;
    const hs = s / 2;
    const dpt = s * 0.11; // глубина выемки
    // вершины треугольной выемки — совпадают со знаком на текстуре
    const An: [number, number] = [-0.275 * s, 0.295 * s];
    const Bn: [number, number] = [0.285 * s, 0.295 * s];
    const Cn: [number, number] = [0.285 * s, -0.275 * s];
    const matFace = makeCubeMat(faceTex, 1.0); // лицевая пластина
    const matClean = makeCubeMat(cleanTex, 1.0); // чистые грани без знака
    const matFloor = makeCubeMat(cleanTex, 0.78); // дно кармана — темнее
    const matHyp = makeCubeMat(cleanTex, 1.35); // стенка-гипотенуза ловит свет
    const matWallD = makeCubeMat(cleanTex, 0.48); // верхняя стенка — в тени
    const matWallR = makeCubeMat(cleanTex, 0.7); // правая стенка — полутень

    const disposables: { dispose(): void }[] = [];

    function setFaceUVs(geo: THREE.BufferGeometry) {
      const pos = geo.attributes.position;
      const uv = geo.attributes.uv;
      for (let i = 0; i < uv.count; i++)
        (uv as THREE.BufferAttribute).setXY(i, pos.getX(i) / s + 0.5, pos.getY(i) / s + 0.5);
      uv.needsUpdate = true;
    }
    function buildNotchFace() {
      const grp = new THREE.Group();
      // пластина грани с треугольным отверстием
      const shape = new THREE.Shape();
      shape.moveTo(-hs, -hs);
      shape.lineTo(hs, -hs);
      shape.lineTo(hs, hs);
      shape.lineTo(-hs, hs);
      shape.closePath();
      const hole = new THREE.Path();
      hole.moveTo(An[0], An[1]);
      hole.lineTo(Bn[0], Bn[1]);
      hole.lineTo(Cn[0], Cn[1]);
      hole.closePath();
      shape.holes.push(hole);
      const plateGeo = new THREE.ShapeGeometry(shape, 8);
      const plate = new THREE.Mesh(plateGeo, matFace);
      setFaceUVs(plate.geometry);
      disposables.push(plateGeo);
      grp.add(plate);
      // дно кармана (углублено на dpt)
      const floorGeo = new THREE.BufferGeometry();
      floorGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          [An[0], An[1], -dpt, Bn[0], Bn[1], -dpt, Cn[0], Cn[1], -dpt],
          3,
        ),
      );
      floorGeo.setAttribute(
        "uv",
        new THREE.Float32BufferAttribute(
          [
            An[0] / s + 0.5,
            An[1] / s + 0.5,
            Bn[0] / s + 0.5,
            Bn[1] / s + 0.5,
            Cn[0] / s + 0.5,
            Cn[1] / s + 0.5,
          ],
          2,
        ),
      );
      floorGeo.computeVertexNormals();
      disposables.push(floorGeo);
      grp.add(new THREE.Mesh(floorGeo, matFloor));
      // стенки кармана
      function wallMesh(P: [number, number], Q: [number, number], mat: THREE.Material) {
        const g = new THREE.BufferGeometry();
        g.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(
            [
              P[0], P[1], 0,
              Q[0], Q[1], 0,
              Q[0], Q[1], -dpt,
              P[0], P[1], 0,
              Q[0], Q[1], -dpt,
              P[0], P[1], -dpt,
            ],
            3,
          ),
        );
        const pu = P[0] / s + 0.5;
        const pv = P[1] / s + 0.5;
        const qu = Q[0] / s + 0.5;
        const qv = Q[1] / s + 0.5;
        g.setAttribute(
          "uv",
          new THREE.Float32BufferAttribute([pu, pv, qu, qv, qu, qv, pu, pv, qu, qv, pu, pv], 2),
        );
        g.computeVertexNormals();
        disposables.push(g);
        grp.add(new THREE.Mesh(g, mat));
      }
      wallMesh(An, Bn, matWallD); // верхняя стенка
      wallMesh(Bn, Cn, matWallR); // правая стенка
      wallMesh(Cn, An, matHyp); // гипотенуза — светлая кромка
      grp.position.z = hs;
      return grp;
    }
    const cube = new THREE.Group();
    cube.add(buildNotchFace());
    const faceBack = new THREE.Group();
    faceBack.add(buildNotchFace());
    faceBack.rotation.y = Math.PI;
    cube.add(faceBack);
    // чистые грани без выемки: лево, право, верх, низ
    const plainGeo = new THREE.PlaneGeometry(s, s);
    disposables.push(plainGeo);
    function plainFace(rx: number, ry: number) {
      const g = new THREE.Group();
      const m = new THREE.Mesh(plainGeo, matClean);
      m.position.z = hs;
      g.add(m);
      g.rotation.set(rx, ry, 0);
      return g;
    }
    cube.add(plainFace(0, Math.PI / 2));
    cube.add(plainFace(0, -Math.PI / 2));
    cube.add(plainFace(-Math.PI / 2, 0));
    cube.add(plainFace(Math.PI / 2, 0));
    tilt.add(cube);

    // мягкое свечение вокруг куба (вместо bloom)
    const glowTexP = (function () {
      const sz = 256;
      const c = document.createElement("canvas");
      c.width = c.height = sz;
      const g = c.getContext("2d")!;
      const rg = g.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz / 2);
      rg.addColorStop(0.0, "rgba(255,255,255,1)");
      rg.addColorStop(0.16, "rgba(255,255,255,0.5)");
      rg.addColorStop(0.42, "rgba(255,255,255,0.14)");
      rg.addColorStop(1.0, "rgba(255,255,255,0)");
      g.fillStyle = rg;
      g.fillRect(0, 0, sz, sz);
      return new THREE.CanvasTexture(c);
    })();
    // мягкая круглая точка — для искр и пылинок
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
    function makeGlow(scale: number, opacity: number) {
      const mat = new THREE.SpriteMaterial({
        map: glowTexP,
        color: silverCol,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      });
      const sp = new THREE.Sprite(mat);
      sp.scale.set(scale, scale, 1);
      cubeGroup.add(sp);
      return sp;
    }
    const glowA = makeGlow(5, 0.22);
    const glowB = makeGlow(9, 0.07);

    // ---- Вода: океанский шейдер three.js — настоящие отражения куба и луны ----
    const waterNormals = loadTex("water-normal.jpg");
    const waterGeo = new THREE.PlaneGeometry(2000, 2000);
    disposables.push(waterGeo);
    const water = new Water(waterGeo, {
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new THREE.Vector3(0, 0.55, -0.83).normalize(), // луна впереди-сверху
      sunColor: 0xcfe0ff,
      waterColor: 0x00101f, // тёмная ночная вода
      distortionScale: 2.6,
      fog: false,
    });
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0;
    scene.add(water);
    const waterUniforms = (water.material as THREE.ShaderMaterial).uniforms;
    waterUniforms.size.value = 4;

    // полосы дымки на стыке воды и картинки — прячут горизонт
    const hazeMats: THREE.SpriteMaterial[] = [];
    for (const [w, h, x, y, z, o] of [
      [320, 24, 0, 3.0, -118, 0.5],
      [240, 16, -35, 2.2, -112, 0.32],
      [220, 14, 38, 2.0, -108, 0.3],
    ]) {
      const m = new THREE.SpriteMaterial({
        map: glowTexP,
        color: new THREE.Color("#111c33"),
        transparent: true,
        opacity: o,
        depthWrite: false,
      });
      const sp = new THREE.Sprite(m);
      sp.scale.set(w, h, 1);
      sp.position.set(x, y, z);
      scene.add(sp);
      hazeMats.push(m);
    }

    // зарево у берегов — подсвеченные склоны
    const shoreMats: THREE.SpriteMaterial[] = [];
    for (const [sx, sy, px, pz] of [
      [26, 7, -14, -26],
      [24, 6, 15, -24],
    ]) {
      const m = new THREE.SpriteMaterial({
        map: glowTexP,
        color: new THREE.Color("#9fc0ff"),
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      });
      const sp = new THREE.Sprite(m);
      sp.scale.set(sx, sy, 1);
      sp.position.set(px, 1.1, pz);
      scene.add(sp);
      shoreMats.push(m);
    }

    // искры, мерцающие над самой водой
    const wsLayers: THREE.PointsMaterial[] = [];
    for (let L = 0; L < 2; L++) {
      const N = 130;
      const arr = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        arr[i * 3] = rand(-34, 34);
        arr[i * 3 + 1] = 0.05 + Math.random() * 0.5;
        arr[i * 3 + 2] = rand(-85, 8);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      disposables.push(geo);
      const mat = new THREE.PointsMaterial({
        color: silverCol,
        size: 0.17,
        map: soft,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const pts = new THREE.Points(geo, mat);
      pts.frustumCulled = false;
      scene.add(pts);
      wsLayers.push(mat);
    }

    // ---- Искорки, поднимающиеся от воды ----
    // плотность падает с высотой: у воды густо, наверху — редкие одиночки
    const P = CONFIG.particleCount;
    const PART_TOP = 16.0; // докуда вообще долетают
    const PART_TOP_DENSITY = 0.12; // плотность наверху относительно низа
    const pPos = new Float32Array(P * 3);
    const pBase = new Float32Array(P); // низ «участка» частицы
    const pSpan = new Float32Array(P); // насколько она успевает всплыть
    const pSpeed = new Float32Array(P);
    const pPhase = new Float32Array(P);
    const pSize = new Float32Array(P);
    const pTwink = new Float32Array(P);
    for (let i = 0; i < P; i++) {
      // отбор по высоте: чем выше, тем реже принимаем кандидата
      let y = 0;
      for (let tries = 0; tries < 40; tries++) {
        y = rand(-0.4, PART_TOP);
        const t = Math.max(0, y) / PART_TOP;
        const keep = 1 - (1 - PART_TOP_DENSITY) * (t * t * (3 - 2 * t));
        if (Math.random() < keep) break;
      }
      const spread = 9 + y * 0.55; // кверху разлетаются шире
      pPos[i * 3] = rand(-spread, spread);
      pPos[i * 3 + 1] = 0; // высота живёт в шейдере
      pPos[i * 3 + 2] = rand(-7, 7);
      pBase[i] = y;
      pSpan[i] = rand(2.0, 5.0);
      pSpeed[i] = rand(0.035, 0.1);
      pPhase[i] = Math.random();
      // крупные искры редки, мелкой пыли много
      pSize[i] = (y < 3 ? rand(1.6, 5.2) : rand(1.4, 3.6)) * (Math.random() < 0.12 ? 1.6 : 1.0);
      pTwink[i] = Math.random();
    }
    const pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pgeo.setAttribute("aBase", new THREE.BufferAttribute(pBase, 1));
    pgeo.setAttribute("aSpan", new THREE.BufferAttribute(pSpan, 1));
    pgeo.setAttribute("aSpeed", new THREE.BufferAttribute(pSpeed, 1));
    pgeo.setAttribute("aPhase", new THREE.BufferAttribute(pPhase, 1));
    pgeo.setAttribute("aSize", new THREE.BufferAttribute(pSize, 1));
    pgeo.setAttribute("aTwink", new THREE.BufferAttribute(pTwink, 1));
    disposables.push(pgeo);

    const partUniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#e8eeff") },
      uPR: { value: renderer.getPixelRatio() },
      uFade: { value: 0 },
    };
    const partMat = new THREE.ShaderMaterial({
      uniforms: partUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uPR;
        attribute float aBase;
        attribute float aSpan;
        attribute float aSpeed;
        attribute float aPhase;
        attribute float aSize;
        attribute float aTwink;
        varying float vAlpha;
        varying float vCore;
        void main() {
          vec3 pos = position;
          float k = fract(uTime * aSpeed + aPhase);          // 0..1 — путь наверх
          pos.y = aBase + k * aSpan;
          // лёгкий дрейф вбок, будто воздух тянет
          pos.x += sin(uTime * 0.25 + aPhase * 6.28) * 0.35;
          pos.z += cos(uTime * 0.19 + aPhase * 4.71) * 0.25;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          // плавно проявляется у воды и тает наверху своего участка
          float fade = smoothstep(0.0, 0.18, k) * smoothstep(1.0, 0.62, k);
          // мерцание: каждая искра дышит по-своему
          float tw = 0.55 + 0.45 * sin(uTime * (1.1 + aTwink * 2.6) + aPhase * 12.0);
          vAlpha = fade * (0.35 + 0.65 * tw);
          vCore = aTwink;
          gl_PointSize = aSize * uPR * (26.0 / max(0.001, -mv.z));
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uFade;
        varying float vAlpha;
        varying float vCore;
        void main() {
          vec2 pc = gl_PointCoord - 0.5;
          float d = length(pc) * 2.0;
          if (d > 1.0) discard;
          float core = smoothstep(0.5, 0.0, d);            // плотное ядро искры
          core = pow(core, 1.6);
          float halo = smoothstep(1.0, 0.15, d) * 0.22;    // мягкий ореол
          // тонкие лучики — искра, а не пятно
          float rays = pow(max(0.0, 1.0 - abs(pc.x) * 13.0), 5.0)
                     + pow(max(0.0, 1.0 - abs(pc.y) * 13.0), 5.0);
          rays *= smoothstep(1.0, 0.0, d) * (0.25 + 0.5 * vCore);
          float a = (core + halo + rays * 0.55) * vAlpha * uFade;
          vec3 c = uColor * (0.85 + core * 0.8);
          gl_FragColor = vec4(c, a);
        }`,
    });
    const particles = new THREE.Points(pgeo, partMat);
    particles.frustumCulled = false;
    scene.add(particles);

    // ---- Прокрутка ----
    let targetT = 0;
    let curT = 0;
    function readScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetT = max > 0 ? window.scrollY / max : 0;
    }
    window.addEventListener("scroll", readScroll, { passive: true });
    readScroll();

    let pointerX = 0;
    let pointerY = 0;
    function onPointer(e: PointerEvent) {
      pointerX = e.clientX / window.innerWidth - 0.5;
      pointerY = e.clientY / window.innerHeight - 0.5;
    }
    window.addEventListener("pointermove", onPointer, { passive: true });

    // ---- Хореография из референса ----
    // скролл -> позиция секвенции; куб: y +7.2, кувырок rotY +2.8 / rotZ -2.7,
    // его keyframes кончаются на 85% секвенции; камера едет все 100%.
    const SPIN_Y0 = -0.35;
    const SPIN_DY = 2.8; // старт выемкой к зрителю + дельта
    const SPIN_Z0 = 0.6;
    const SPIN_DZ = -2.7; // наклон и дельта по z
    const CUBE_TRACK_END = 0.85; // доля секвенции, где куб останавливается

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    const revealStart = performance.now();
    let raf = 0;

    function frame() {
      const time = clock.getElapsedTime();

      curT += (targetT - curT) * CONFIG.scrollSmooth;

      // ---- анимация куба + доворот и приближение прокруткой ----
      if (!reduce) {
        cube.rotation.y = time * CONFIG.rotationSpeed; // сам по себе крутится
        cube.rotation.x = Math.sin(time * 0.21) * 0.1; // едва заметное живое качание
        cubeUniforms.uTime.value = time;
      } else {
        cube.rotation.y = 0;
        cube.rotation.x = 0;
      }
      // ---- скролл: линейно, плавность даёт lerp curT ----
      const eased = curT;
      const cubeK = Math.min(1, eased / CUBE_TRACK_END);
      const bob = reduce ? 0 : Math.sin(time * CONFIG.bobSpeed + Math.PI * 0.4) * CONFIG.bobAmount;
      cubeGroup.position.set(0, CONFIG.cubeY + CUBE_RISE * eased + bob, 0);
      cubeGroup.scale.setScalar(0.9 + 0.1 * eased); // внизу на 10% меньше
      // кувырок по двум осям одновременно
      spin.rotation.set(0, SPIN_Y0 + SPIN_DY * cubeK, SPIN_Z0 + SPIN_DZ * cubeK);
      // камера поднимается с кубом и слегка наезжает; вода мировая — неподвижна
      const introK = reduce ? 1 : Math.min(1, (performance.now() - revealStart) / 2200);
      const introE = introK * introK * (3 - 2 * introK);
      camera.position.y = CAM.y0 + CUBE_RISE * eased; // строго синхронно с кубом
      camera.position.z = CAM.z0 + (CAM.z1 - CAM.z0) * eased + (1 - introE) * 6; // интро-подъезд
      // лёгкий параллакс камеры от мыши
      camera.rotation.y += (-pointerX * 0.03 - camera.rotation.y) * 0.05;
      camera.rotation.x += (pointerY * 0.018 - camera.rotation.x) * 0.05;

      // reveal при загрузке (~1.8 c)
      const rvt = reduce ? 1 : Math.min(1, (performance.now() - revealStart) / 1800);
      cubeUniforms.uReveal.value = rvt * rvt * (3 - 2 * rvt);

      if (!reduce) {
        const pulse = 0.86 + 0.14 * Math.sin(time * 1.1);
        const rv = cubeUniforms.uReveal.value;
        (glowA.material as THREE.SpriteMaterial).opacity = 0.15 * pulse * rv;
        (glowB.material as THREE.SpriteMaterial).opacity = 0.05 * pulse * rv;
        waterUniforms.time.value = time * 0.5;
        for (let i = 0; i < wsLayers.length; i++)
          wsLayers[i].opacity = (0.2 + 0.3 * (0.5 + 0.5 * Math.sin(time * 0.8 + i * 2.4))) * rv;
        shoreMats[0].opacity = (0.07 + 0.03 * Math.sin(time * 0.5)) * rv;
        shoreMats[1].opacity = (0.07 + 0.03 * Math.sin(time * 0.5 + 1.7)) * rv;
        // искорки живут в шейдере — только двигаем время
        partUniforms.uTime.value = time;
        partUniforms.uFade.value = rv;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    frame();

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      sizeBg();
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      disposables.forEach((d) => d.dispose());
      cubeMats.forEach((m) => m.dispose());
      [...hazeMats, ...shoreMats, ...wsLayers].forEach((m) => m.dispose());
      partMat.dispose();
      (water.material as THREE.ShaderMaterial).dispose();
      bg.geometry.dispose();
      (bg.material as THREE.Material).dispose();
      [bgTex, faceTex, edgesTex, gridTex, noiseTex, cleanTex, glowTexP, soft, waterNormals].forEach(
        (t) => t.dispose(),
      );
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Луна — картинка под прозрачным канвасом */}
      <div
        className="fixed inset-0 z-0"
        style={{ background: "#02030a url(/redesign/contact/moon.jpg) center 40% / cover no-repeat" }}
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
