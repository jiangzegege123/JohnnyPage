"use client";

import { useEffect, useRef } from "react";

// ─── Sun surface shaders ──────────────────────────────────────────────────────

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPositionNormal;
  varying vec3 vPos;
  uniform float time;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0,i1.z,i2.z,1.0))
      + i.y + vec4(0.0,i1.y,i2.y,1.0))
      + i.x + vec4(0.0,i1.x,i2.x,1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0+1.0;
    vec4 s1 = floor(b1)*2.0+1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
    vPos = normalize(position);
    float noise = snoise(position * 1.8 + time * 0.12);
    vec3 newPosition = position + normal * (noise * 0.07);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec3 vNormal;
  varying vec3 vPositionNormal;
  varying vec3 vPos;

  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }

  void main() {
    vec3 n = normalize(vPos);
    float theta = atan(n.y, n.x);
    float phi   = asin(clamp(n.z, -1.0, 1.0));

    // Tennis-ball seam — read as solar plasma stream
    float seamCurve = 0.44 * sin(2.0 * theta);
    float seam = smoothstep(0.052, 0.052 * 0.2, abs(phi - seamCurve));

    // Limb darkening + corona
    float facing = dot(vNormal, vPositionNormal);
    float limb   = pow(max(facing, 0.0), 0.35);
    float corona = pow(1.0 - max(facing, 0.0), 2.2);

    float grain = (hash(floor(n * 22.0)) - 0.5) * 0.045;

    vec3 midColor  = mix(color2, color1, limb * 0.8) + grain;
    vec3 ballColor = mix(midColor, vec3(1.0, 0.97, 0.75), limb * 0.55);
    ballColor     += vec3(1.0, 0.55, 0.05) * corona * 0.6;

    // Seam as bright plasma
    vec3 finalColor = mix(ballColor, vec3(1.0, 0.96, 0.7), seam * 0.75);
    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
  }
`;

// ─── Types ────────────────────────────────────────────────────────────────────

type View = "home" | "projects" | "about";
interface Props { activeView: View; }

interface PlanetDef {
  color: string; emissive: string;
  size: number; orbit: number; speed: number;
  tilt: number; roughness: number;
  rings?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WebGLBackground({ activeView }: Props) {
  const mountRef  = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0, z: 0, scale: 1.0 });

  useEffect(() => {
    const config: Record<View, typeof targetRef.current> = {
      home:     { x: 0, y: 1.5, z: 0, scale: 1.0 },
      projects: { x: 0, y: 3.5, z: 0, scale: 0.6 },
      about:    { x: 0, y: 1.5, z: 0, scale: 1.2 },
    };
    targetRef.current = config[activeView];
  }, [activeView]);

  useEffect(() => {
    if (!mountRef.current) return;
    let animId: number;
    let cleanup: (() => void) | null = null;
    let disposed = false;

    import("three").then((THREE) => {
      if (disposed || !mountRef.current) return;
      const container = mountRef.current;

      // ── Renderer / Camera ──────────────────────────────────────────────────
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 25;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // ── Solar system group (moves / scales with view) ──────────────────────
      const solarSystem = new THREE.Group();
      scene.add(solarSystem);

      // ── Sun ───────────────────────────────────────────────────────────────
      const coreUniforms = {
        color1: { value: new THREE.Color("#C9DC35") },
        color2: { value: new THREE.Color("#8FA018") },
        time:   { value: 0 },
      };
      const coreMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(4, 64),
        new THREE.ShaderMaterial({ uniforms: coreUniforms, vertexShader, fragmentShader }),
      );
      solarSystem.add(coreMesh);

      // Sun corona glow sprite
      const makeSprite = (colors: [string, number][], size: number) => {
        const c = document.createElement("canvas");
        c.width = c.height = 512;
        const ctx = c.getContext("2d")!;
        const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
        colors.forEach(([col, stop]) => g.addColorStop(stop, col));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 512, 512);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
          map: new THREE.CanvasTexture(c),
          transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        sprite.scale.set(size, size, 1);
        return sprite;
      };

      solarSystem.add(makeSprite([
        ["rgba(220,210,50,0.7)", 0],
        ["rgba(200,180,30,0.3)", 0.25],
        ["rgba(180,120,10,0.1)", 0.55],
        ["rgba(0,0,0,0)",        1],
      ], 22));

      // Point light — sun illuminates the planets
      const sunLight = new THREE.PointLight(0xffe580, 3.5, 90);
      solarSystem.add(sunLight);

      // Ambient so planets aren't pitch black on the far side
      scene.add(new THREE.AmbientLight(0x111108, 0.8));

      // ── Planets ───────────────────────────────────────────────────────────
      const PLANETS: PlanetDef[] = [
        { color: "#9A9AA8", emissive: "#111118", size: 0.28, orbit: 7.0,  speed: 0.85, tilt: 5,  roughness: 0.95 },
        { color: "#2B7EC1", emissive: "#051830", size: 0.52, orbit: 10.5, speed: 0.48, tilt: 3,  roughness: 0.75 },
        { color: "#D4A832", emissive: "#2d1e00", size: 0.70, orbit: 14.5, speed: 0.27, tilt: 8,  roughness: 0.85, rings: true },
        { color: "#3A4FC8", emissive: "#080e30", size: 0.40, orbit: 19.0, speed: 0.11, tilt: 14, roughness: 0.65 },
      ];

      const pivots: THREE.Group[] = [];
      const planetMeshes: THREE.Mesh[] = [];

      PLANETS.forEach((p) => {
        // Tilted orbital plane group
        const orbitGroup = new THREE.Group();
        orbitGroup.rotation.z = (p.tilt * Math.PI) / 180;
        solarSystem.add(orbitGroup);

        // Faint orbit path
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 128; i++) {
          const a = (i / 128) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * p.orbit, 0, Math.sin(a) * p.orbit));
        }
        orbitGroup.add(new THREE.LineLoop(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.07 }),
        ));

        // Pivot (rotated each frame to orbit)
        const pivot = new THREE.Group();
        orbitGroup.add(pivot);
        pivots.push(pivot);

        // Planet mesh
        const mesh = new THREE.Mesh(
          new THREE.IcosahedronGeometry(p.size, 6),
          new THREE.MeshStandardMaterial({
            color: p.color, emissive: p.emissive,
            roughness: p.roughness, metalness: 0.05,
          }),
        );
        mesh.position.x = p.orbit;
        pivot.add(mesh);
        planetMeshes.push(mesh);

        // Saturn-style rings
        if (p.rings) {
          const ring = new THREE.Mesh(
            new THREE.RingGeometry(p.size * 1.5, p.size * 2.6, 64),
            new THREE.MeshBasicMaterial({ color: "#C8A040", transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
          );
          ring.rotation.x = Math.PI * 0.42;
          ring.rotation.z = 0.15;
          mesh.add(ring);
        }

        // Tiny atmospheric glow per planet
        mesh.add(makeSprite([
          ["rgba(255,255,255,0.35)", 0],
          ["rgba(255,255,255,0.0)",  1],
        ], p.size * 5));
      });

      // ── Asteroid belt (between planets 2 and 3) ────────────────────────────
      const beltCount = 280;
      const beltPos   = new Float32Array(beltCount * 3);
      for (let i = 0; i < beltCount; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 12.0 + (Math.random() - 0.5) * 1.8;
        beltPos[i * 3]     = Math.cos(a) * r;
        beltPos[i * 3 + 1] = (Math.random() - 0.5) * 0.55;
        beltPos[i * 3 + 2] = Math.sin(a) * r;
      }
      const belt = new THREE.Points(
        Object.assign(new THREE.BufferGeometry(), {
          attributes: { position: new THREE.BufferAttribute(beltPos, 3) },
        }),
        new THREE.PointsMaterial({ color: 0x887766, size: 0.045, transparent: true, opacity: 0.65 }),
      );
      solarSystem.add(belt);

      // ── Star field (fixed — added to scene, not solarSystem) ──────────────

      // Shared soft circular star texture
      const starCanvas = document.createElement("canvas");
      starCanvas.width = starCanvas.height = 64;
      const starCtx  = starCanvas.getContext("2d")!;
      const starGrad = starCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      starGrad.addColorStop(0,    "rgba(255,255,255,1)");
      starGrad.addColorStop(0.25, "rgba(255,255,255,0.6)");
      starGrad.addColorStop(0.6,  "rgba(255,255,255,0.08)");
      starGrad.addColorStop(1,    "rgba(255,255,255,0)");
      starCtx.fillStyle = starGrad;
      starCtx.fillRect(0, 0, 64, 64);
      const starTex = new THREE.CanvasTexture(starCanvas);

      const starMat = new THREE.PointsMaterial({
        map: starTex, vertexColors: true,
        size: 0.55, transparent: true, opacity: 0.92,
        alphaTest: 0.01, sizeAttenuation: true,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });

      // Star colour palette: blue-white / white / warm-yellow / orange
      const STAR_COLORS = [
        [0.72, 0.88, 1.00],  // blue-white   (cool giants)
        [1.00, 1.00, 1.00],  // white         (most common)
        [1.00, 1.00, 1.00],  // white         (weight more)
        [1.00, 0.96, 0.72],  // warm yellow
        [1.00, 0.80, 0.50],  // orange
      ];

      function buildStars(count: number, rMin: number, rMax: number, sizeMin: number, sizeMax: number, band = false) {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          let theta: number, phi: number;
          if (band) {
            // Milky Way band: concentrate stars near equatorial plane
            theta = Math.random() * Math.PI * 2;
            phi   = (Math.random() - 0.5) * 0.55 + Math.PI / 2; // narrow band
          } else {
            theta = Math.random() * Math.PI * 2;
            phi   = Math.acos(Math.random() * 2 - 1);
          }
          const r = rMin + Math.random() * (rMax - rMin);
          pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
          pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          pos[i * 3 + 2] = r * Math.cos(phi);
          const c = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
          // Slight random brightness variation
          const bright = 0.6 + Math.random() * 0.4;
          col[i * 3]     = c[0] * bright;
          col[i * 3 + 1] = c[1] * bright;
          col[i * 3 + 2] = c[2] * bright;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
        return geo;
      }

      // Main scattered star field
      scene.add(new THREE.Points(buildStars(2200, 65, 120, 0.3, 0.9), starMat));
      // Milky Way band — denser strip of smaller stars
      scene.add(new THREE.Points(buildStars(900, 70, 110, 0.2, 0.5, true),
        new THREE.PointsMaterial({
          map: starTex, vertexColors: true,
          size: 0.32, transparent: true, opacity: 0.55,
          alphaTest: 0.01, sizeAttenuation: true,
          blending: THREE.AdditiveBlending, depthWrite: false,
        }),
      ));

      // ── Nebula clouds (large blurred sprites for colour) ───────────────────
      const makeNebula = (r: number, g: number, b: number, w: number, h: number, x: number, y: number, z: number, rot = 0) => {
        const nc = document.createElement("canvas");
        nc.width = nc.height = 256;
        const nctx = nc.getContext("2d")!;
        // Three overlapping off-centre gradients for an irregular cloud shape
        [[128, 128], [80, 100], [160, 150]].forEach(([cx, cy], idx) => {
          const ng = nctx.createRadialGradient(cx, cy, 0, cx, cy, 110 - idx * 20);
          ng.addColorStop(0,   `rgba(${r},${g},${b},${(0.18 - idx * 0.04).toFixed(2)})`);
          ng.addColorStop(0.5, `rgba(${r},${g},${b},${(0.08 - idx * 0.02).toFixed(2)})`);
          ng.addColorStop(1,   `rgba(${r},${g},${b},0)`);
          nctx.fillStyle = ng;
          nctx.fillRect(0, 0, 256, 256);
        });
        const spr = new THREE.Sprite(new THREE.SpriteMaterial({
          map: new THREE.CanvasTexture(nc),
          transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        spr.scale.set(w, h, 1);
        spr.position.set(x, y, z);
        spr.material.rotation = rot;
        return spr;
      };

      scene.add(makeNebula( 70,  40, 200,  90,  65, -40,  25, -50,  0.4));
      scene.add(makeNebula( 20,  90, 180, 110,  80,  50, -20, -45, -0.6));
      scene.add(makeNebula( 30, 160, 120,  75,  95, -25, -45, -40,  1.1));
      scene.add(makeNebula(140,  30, 110,  95,  70,  40,  45, -35, -0.3));
      scene.add(makeNebula( 55,  20, 130, 130, 100,   0,   0, -70,  0.0));
      scene.add(makeNebula(180, 120,  20,  60,  50,  20, -60, -30,  0.8));

      // ── Animation ─────────────────────────────────────────────────────────
      const currentPos   = new THREE.Vector3();
      const currentScale = new THREE.Vector3(1, 1, 1);
      const tmpPos       = new THREE.Vector3();
      const tmpScale     = new THREE.Vector3();
      const startTime    = Date.now();

      function animate() {
        if (disposed) return;
        animId = requestAnimationFrame(animate);

        const elapsed = (Date.now() - startTime) / 1000;
        coreUniforms.time.value = elapsed;

        // Sun self-rotation
        coreMesh.rotation.y = elapsed * 0.18;
        coreMesh.rotation.x = elapsed * 0.07;

        // Planet orbits + self-rotation
        PLANETS.forEach((p, i) => {
          pivots[i].rotation.y       = elapsed * p.speed;
          planetMeshes[i].rotation.y = elapsed * 0.4;
        });

        // Slowly drift asteroid belt
        belt.rotation.y = elapsed * 0.018;

        const { x, y, z, scale } = targetRef.current;
        tmpPos.set(x, y, z);
        tmpScale.setScalar(scale);
        currentPos.lerp(tmpPos, 0.05);
        currentScale.lerp(tmpScale, 0.05);
        solarSystem.position.copy(currentPos);
        solarSystem.scale.copy(currentScale);

        renderer.render(scene, camera);
      }

      animate();

      // ── Resize ────────────────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      cleanup?.();
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />
  );
}
