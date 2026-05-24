"use client";

import { useEffect, useRef } from "react";

// ─── GLSL Shaders ─────────────────────────────────────────────────────────────

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPositionNormal;
  uniform float time;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
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
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns  = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
    float noise = snoise(position * 0.5 + time * 0.2);
    vec3 newPosition = position + normal * (noise * 0.3);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec3 vNormal;
  varying vec3 vPositionNormal;

  void main() {
    float intensity = pow(0.7 - dot(vNormal, vPositionNormal), 1.5);
    vec3 finalColor = mix(color2, color1, intensity * 1.5);
    float edgeGlow = pow(1.0 - dot(vNormal, vPositionNormal), 3.0);
    finalColor += color1 * edgeGlow * 0.8;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ─── Types ────────────────────────────────────────────────────────────────────

type View = "home" | "projects" | "about";

interface Props {
  activeView: View;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WebGLBackground({ activeView }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Mutable target state — read inside the rAF loop without stale closures
  const targetRef = useRef({ x: 0, y: 0, z: 0, scale: 1.0 });

  // Update target when the view changes
  useEffect(() => {
    const config: Record<View, { x: number; y: number; z: number; scale: number }> = {
      home:     { x: 0, y: 1.5, z: 0, scale: 1.0 },
      projects: { x: 0, y: 4.5, z: 0, scale: 0.8 },
      about:    { x: 0, y: 1.5, z: 0, scale: 1.2 },
    };
    targetRef.current = config[activeView];
  }, [activeView]);

  // One-time Three.js setup
  useEffect(() => {
    if (!mountRef.current) return;

    let animId: number;
    let cleanup: (() => void) | null = null;
    let disposed = false;

    import("three").then((THREE) => {
      if (disposed || !mountRef.current) return;

      const container = mountRef.current;

      // ── Scene / Camera / Renderer ──────────────────────────────────────────
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 20;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // ── Orb group ─────────────────────────────────────────────────────────
      const orbGroup = new THREE.Group();
      scene.add(orbGroup);

      const coreUniforms = {
        color1: { value: new THREE.Color("#FF0055") },
        color2: { value: new THREE.Color("#7A0022") },
        time:   { value: 0 },
      };
      const coreMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(4, 32),
        new THREE.ShaderMaterial({ uniforms: coreUniforms, vertexShader, fragmentShader }),
      );
      orbGroup.add(coreMesh);

      // Haze glow sprite
      const hazeCanvas = document.createElement("canvas");
      hazeCanvas.width = 512;
      hazeCanvas.height = 512;
      const ctx = hazeCanvas.getContext("2d")!;
      const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      grad.addColorStop(0,   "rgba(255, 0, 85, 0.8)");
      grad.addColorStop(0.3, "rgba(255, 0, 85, 0.4)");
      grad.addColorStop(0.6, "rgba(200, 0, 50, 0.1)");
      grad.addColorStop(1,   "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
      const hazeSprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: new THREE.CanvasTexture(hazeCanvas),
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      hazeSprite.scale.set(18, 18, 1);
      orbGroup.add(hazeSprite);

      // Orbital particles
      const count = 100;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(Math.random() * 2 - 1);
        const r     = 6 + Math.random() * 2;
        positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particles = new THREE.Points(
        particleGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.4 }),
      );
      orbGroup.add(particles);

      // ── Animation state (pre-allocated vectors) ───────────────────────────
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

        coreMesh.rotation.y  = elapsed * 0.1;
        coreMesh.rotation.x  = elapsed * 0.05;
        particles.rotation.y = elapsed * -0.05;

        const { x, y, z, scale } = targetRef.current;
        tmpPos.set(x, y, z);
        tmpScale.setScalar(scale);

        currentPos.lerp(tmpPos, 0.05);
        currentScale.lerp(tmpScale, 0.05);

        orbGroup.position.copy(currentPos);
        orbGroup.scale.copy(currentScale);

        renderer.render(scene, camera);
      }

      animate();

      // ── Resize handler ────────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      // ── Expose cleanup to outer scope ─────────────────────────────────────
      cleanup = () => {
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      cleanup?.();
    };
  }, []); // runs once

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
