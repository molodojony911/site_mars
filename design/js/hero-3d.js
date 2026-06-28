/**
 * MARS Hero — Three.js 3D scene (rotating object + particles)
 * Respects prefers-reduced-motion and missing WebGL.
 */

(function () {
  "use strict";

  const canvas = document.getElementById("hero-canvas");
  const wrap = document.querySelector(".hero__canvas-wrap");

  if (!canvas || !wrap || typeof THREE === "undefined") {
    wrap?.classList.add("hero__canvas-wrap--fallback");
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const particleCount = isCoarsePointer ? 120 : 220;

  let renderer;
  let scene;
  let camera;
  let coreMesh;
  let particles;
  let animationId = null;

  function init() {
    const width = wrap.clientWidth;
    const height = wrap.clientHeight;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isCoarsePointer,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCoarsePointer ? 1.5 : 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);

    const accentLight = new THREE.PointLight(0xe02121, 1.4, 12);
    accentLight.position.set(-2, -1, 2);
    scene.add(accentLight);

    const coreGeometry = new THREE.IcosahedronGeometry(1.05, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: 0x3a0808,
      emissiveIntensity: 0.45,
      metalness: 0.65,
      roughness: 0.25,
      wireframe: false,
    });
    coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    const wireGeometry = new THREE.IcosahedronGeometry(1.18, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xe02121,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    coreMesh.add(wireMesh);

    const ringGeometry = new THREE.TorusGeometry(1.65, 0.025, 8, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xe02121,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.4;
    coreMesh.add(ring);

    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 1.8 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe02121,
      size: isCoarsePointer ? 0.035 : 0.028,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    wrap.classList.add("hero__canvas-wrap--ready");
    renderOnce();

    if (!prefersReducedMotion) {
      animate();
    }

    window.addEventListener("resize", onResize, { passive: true });
  }

  function renderOnce() {
    if (!renderer || !scene || !camera) return;
    renderer.render(scene, camera);
  }

  function animate() {
    const time = performance.now() * 0.001;

    if (coreMesh) {
      coreMesh.rotation.y = time * 0.45;
      coreMesh.rotation.x = Math.sin(time * 0.35) * 0.18;
    }

    if (particles) {
      particles.rotation.y = time * 0.08;
      particles.rotation.x = time * 0.04;
    }

    renderOnce();
    animationId = requestAnimationFrame(animate);
  }

  function onResize() {
    if (!renderer || !camera) return;

    const width = wrap.clientWidth;
    const height = wrap.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderOnce();
  }

  function destroy() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    window.removeEventListener("resize", onResize);

    if (renderer) {
      renderer.dispose();
    }
  }

  try {
    init();
  } catch (error) {
    console.warn("Hero 3D scene unavailable:", error);
    wrap.classList.add("hero__canvas-wrap--fallback");
    destroy();
  }

  window.addEventListener(
    "pagehide",
    () => {
      destroy();
    },
    { once: true }
  );
})();
