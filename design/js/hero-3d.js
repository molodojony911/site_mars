/**
 * MARS Hero — 3D scene (Three.js)
 * Inspired by open-source landing patterns (Bruno Simon, Three.js examples).
 * Restaurant / data-growth metaphor: orbiting KPI rings + floating plate form.
 */

import * as THREE from "three";

(function initHero3D() {
  "use strict";

  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.matchMedia("(min-width: 64rem)").matches;

  if (prefersReducedMotion || !isDesktop) {
    canvas.setAttribute("aria-hidden", "true");
    canvas.closest(".hero__visual")?.classList.add("hero__visual--static");
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.4, 4.2);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const group = new THREE.Group();
  scene.add(group);

  const red = 0xe02121;
  const white = 0xffffff;
  const dark = 0x1a1a1a;

  /* Central plate — restaurant metaphor */
  const plateGeo = new THREE.TorusGeometry(1.05, 0.06, 16, 64);
  const plateMat = new THREE.MeshStandardMaterial({
    color: white,
    metalness: 0.35,
    roughness: 0.25,
    emissive: red,
    emissiveIntensity: 0.08,
  });
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.rotation.x = Math.PI / 2;
  group.add(plate);

  const innerPlate = new THREE.Mesh(
    new THREE.CircleGeometry(0.82, 48),
    new THREE.MeshStandardMaterial({
      color: dark,
      metalness: 0.5,
      roughness: 0.4,
      side: THREE.DoubleSide,
    })
  );
  innerPlate.rotation.x = -Math.PI / 2;
  innerPlate.position.y = 0.02;
  group.add(innerPlate);

  /* KPI orbit rings */
  const rings = [];
  [1.35, 1.65, 2.0].forEach((radius, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.018, 8, 96),
      new THREE.MeshStandardMaterial({
        color: i === 1 ? red : white,
        metalness: 0.6,
        roughness: 0.3,
        transparent: true,
        opacity: i === 0 ? 0.55 : 0.85,
      })
    );
    ring.rotation.x = Math.PI / 2 + i * 0.12;
    ring.rotation.z = i * 0.4;
    group.add(ring);
    rings.push(ring);
  });

  /* Floating data nodes */
  const nodes = [];
  const nodeGeo = new THREE.IcosahedronGeometry(0.11, 0);
  for (let i = 0; i < 14; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: i % 3 === 0 ? red : white,
      metalness: 0.4,
      roughness: 0.35,
      emissive: i % 3 === 0 ? red : 0x222222,
      emissiveIntensity: i % 3 === 0 ? 0.25 : 0.05,
    });
    const node = new THREE.Mesh(nodeGeo, mat);
    const angle = (i / 14) * Math.PI * 2;
    const orbit = 1.35 + (i % 3) * 0.28;
    node.userData = { angle, orbit, speed: 0.25 + (i % 5) * 0.06, y: Math.sin(i) * 0.35 };
    group.add(node);
    nodes.push(node);
  }

  /* Ambient particles */
  const particleCount = 120;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  const particles = new THREE.Points(
    new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(positions, 3)),
    new THREE.PointsMaterial({ color: red, size: 0.025, transparent: true, opacity: 0.55 })
  );
  scene.add(particles);

  const keyLight = new THREE.DirectionalLight(white, 1.4);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(red, 0.35);
  fillLight.position.set(-4, -1, 2);
  scene.add(fillLight);

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  let pointerX = 0;
  let pointerY = 0;
  let targetRotX = 0;
  let targetRotY = 0;

  const heroSection = canvas.closest(".hero");
  heroSection?.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    targetRotY = pointerX * 0.35;
    targetRotX = pointerY * 0.2;
  });

  heroSection?.addEventListener("pointerleave", () => {
    targetRotX = 0;
    targetRotY = 0;
  });

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const { width, height } = parent.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let animationId;

  function animate() {
    animationId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    group.rotation.y += (targetRotY - group.rotation.y) * 0.06;
    group.rotation.x += (targetRotX - group.rotation.x) * 0.06;
    group.rotation.y += 0.0025;
    plate.rotation.z = t * 0.15;

    rings.forEach((ring, i) => {
      ring.rotation.z += 0.004 + i * 0.002;
    });

    nodes.forEach((node) => {
      const { angle, orbit, speed, y } = node.userData;
      const a = angle + t * speed;
      node.position.set(Math.cos(a) * orbit, y + Math.sin(t * 1.2 + angle) * 0.12, Math.sin(a) * orbit);
      node.rotation.x = t * 0.8;
      node.rotation.y = t * 0.6;
    });

    particles.rotation.y = t * 0.03;

    renderer.render(scene, camera);
  }

  animate();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
})();
