/**
 * MARS Agency — 3D Mars planet (Three.js)
 * Interactive WebGL sphere with mouse/touch parallax
 * Falls back gracefully when WebGL unavailable or reduced motion preferred
 */

(function () {
  "use strict";

  const canvas = document.getElementById("mars-canvas");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    canvas.setAttribute("aria-hidden", "true");
    return;
  }

  if (typeof THREE === "undefined") {
    console.warn("Three.js not loaded — 3D Mars disabled");
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 3.2;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  /* Procedural Mars texture */
  function createMarsTexture() {
    const size = 512;
    const cvs = document.createElement("canvas");
    cvs.width = size;
    cvs.height = size;
    const ctx = cvs.getContext("2d");

    const base = ctx.createLinearGradient(0, 0, size, size);
    base.addColorStop(0, "#8b2500");
    base.addColorStop(0.3, "#c1440e");
    base.addColorStop(0.6, "#e27b58");
    base.addColorStop(1, "#a03000");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 800; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random() * 18 + 2;
      const alpha = Math.random() * 0.25;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5
        ? `rgba(60, 20, 5, ${alpha})`
        : `rgba(255, 140, 66, ${alpha * 0.5})`;
      ctx.fill();
    }

  /* Polar ice caps */
    ctx.fillStyle = "rgba(255, 240, 230, 0.35)";
    ctx.beginPath();
    ctx.ellipse(size / 2, 20, size * 0.25, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(size / 2, size - 20, size * 0.2, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(cvs);
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return texture;
  }

  const marsTexture = createMarsTexture();
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    map: marsTexture,
    roughness: 0.85,
    metalness: 0.05,
    bumpMap: marsTexture,
    bumpScale: 0.04,
  });

  const mars = new THREE.Mesh(geometry, material);
  scene.add(mars);

  /* Atmosphere glow */
  const atmosGeo = new THREE.SphereGeometry(1.08, 32, 32);
  const atmosMat = new THREE.MeshBasicMaterial({
    color: 0xff6b35,
    transparent: true,
    opacity: 0.08,
    side: THREE.BackSide,
  });
  const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
  scene.add(atmosphere);

  /* Lighting */
  const ambient = new THREE.AmbientLight(0xffd4b8, 0.4);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xfff0e0, 1.8);
  sun.position.set(5, 3, 4);
  scene.add(sun);

  const rim = new THREE.DirectionalLight(0xff6b35, 0.5);
  rim.position.set(-4, -2, -3);
  scene.add(rim);

  /* Mouse / touch interaction */
  let targetRotX = 0;
  let targetRotY = 0;
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;
  let autoRotate = true;

  function onPointerDown(e) {
    isDragging = true;
    autoRotate = false;
    prevX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    prevY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    canvas.style.cursor = "grabbing";
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const dx = x - prevX;
    const dy = y - prevY;
    targetRotY += dx * 0.005;
    targetRotX += dy * 0.005;
    targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
    prevX = x;
    prevY = y;
  }

  function onPointerUp() {
    isDragging = false;
    canvas.style.cursor = "grab";
    setTimeout(() => { autoRotate = true; }, 3000);
  }

  canvas.addEventListener("mousedown", onPointerDown);
  canvas.addEventListener("mousemove", onPointerMove);
  canvas.addEventListener("mouseup", onPointerUp);
  canvas.addEventListener("mouseleave", onPointerUp);
  canvas.addEventListener("touchstart", onPointerDown, { passive: true });
  canvas.addEventListener("touchmove", onPointerMove, { passive: true });
  canvas.addEventListener("touchend", onPointerUp);

  /* Parallax from scroll */
  let scrollY = 0;
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  }, { passive: true });

  function resize() {
    const parent = canvas.parentElement;
    const w = parent.clientWidth;
    const h = parseInt(getComputedStyle(canvas).height, 10) || 280;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener("resize", resize);

  let animationId;
  const clock = new THREE.Clock();

  function animate() {
    animationId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    if (autoRotate) {
      targetRotY += 0.002;
    }

    mars.rotation.y += (targetRotY - mars.rotation.y) * 0.05;
    mars.rotation.x += (targetRotX - mars.rotation.x) * 0.05;

    const parallax = Math.min(scrollY * 0.0003, 0.3);
    mars.position.y = -parallax;
    atmosphere.position.y = -parallax;

    atmosphere.material.opacity = 0.06 + Math.sin(elapsed * 0.5) * 0.02;

    renderer.render(scene, camera);
  }

  animate();

  /* Cleanup on page hide */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Интерактивная 3D-модель планеты Марс. Перетащите для вращения.");
})();
