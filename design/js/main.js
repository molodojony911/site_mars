/**
 * MARS Agency landing — interactions & engagement features
 * Starfield, scroll reveals, counters, ROI calculator, mission timeline
 */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Mobile navigation ───────────────────────────────────── */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav__link, .mobile-nav__sublink");

  function openMenu() {
    menuToggle.setAttribute("aria-expanded", "true");
    mobileNav.classList.add("is-open");
    mobileNav.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    mobileNav.querySelector(".mobile-nav__link")?.focus();
  }

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    menuToggle.focus();
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    mobileNav.querySelector(".mobile-nav__backdrop")?.addEventListener("click", closeMenu);

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  /* ── Header scroll state ─────────────────────────────────── */

  const header = document.querySelector(".header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── Mission progress bar ────────────────────────────────── */

  const progressBar = document.querySelector(".mission-progress__bar");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressBar.style.width = progress + "%";
      progressBar.setAttribute("aria-valuenow", Math.round(progress));
    }, { passive: true });
  }

  /* ── Starfield canvas ────────────────────────────────────── */

  const starCanvas = document.getElementById("starfield");
  if (starCanvas && !prefersReducedMotion) {
    const ctx = starCanvas.getContext("2d");
    let stars = [];
    let w, h;

    function initStars() {
      w = starCanvas.width = window.innerWidth;
      h = starCanvas.height = window.innerHeight;
      stars = Array.from({ length: Math.floor(w * h / 8000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      }));
    }

    function drawStars() {
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        s.alpha += s.twinkleSpeed;
        const opacity = 0.3 + Math.abs(Math.sin(s.alpha)) * 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 248, 240, ${opacity})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = h;
          s.x = Math.random() * w;
        }
      });
      requestAnimationFrame(drawStars);
    }

    initStars();
    drawStars();
    window.addEventListener("resize", initStars);
  }

  /* ── Scroll reveal ───────────────────────────────────────── */

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ── Animated stat counters ──────────────────────────────── */

  function animateCounter(el, target, suffix, duration) {
    const start = performance.now();
    const isDecimal = String(target).includes(".");
    const numTarget = parseFloat(target);

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numTarget * eased;

      if (isDecimal) {
        el.textContent = "+" + current.toFixed(0) + suffix;
      } else if (suffix === "+") {
        el.textContent = Math.floor(current) + suffix;
      } else {
        el.textContent = Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  const statCards = document.querySelectorAll("[data-count]");
  if (statCards.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = el.dataset.count;
          const suffix = el.dataset.suffix || "";
          if (!prefersReducedMotion) {
            animateCounter(el, target, suffix, 1800);
          } else {
            el.textContent = target + suffix;
          }
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    statCards.forEach((el) => counterObserver.observe(el));
  }

  /* ── Mission timeline activation ─────────────────────────── */

  const missionSteps = document.querySelectorAll(".mission-step");
  if (missionSteps.length) {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { threshold: 0.4 }
    );
    missionSteps.forEach((step) => stepObserver.observe(step));
  }

  /* ── ROI Calculator ──────────────────────────────────────── */

  const revenueSlider = document.getElementById("roi-revenue");
  const guestsSlider = document.getElementById("roi-guests");
  const revenueDisplay = document.getElementById("roi-revenue-value");
  const guestsDisplay = document.getElementById("roi-guests-value");
  const growthResult = document.getElementById("roi-growth");
  const profitResult = document.getElementById("roi-profit");

  function formatMoney(n) {
    return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
  }

  function updateROI() {
    if (!revenueSlider) return;
    const revenue = parseInt(revenueSlider.value, 10);
    const guests = parseInt(guestsSlider.value, 10);

    if (revenueDisplay) revenueDisplay.textContent = formatMoney(revenue);
    if (guestsDisplay) guestsDisplay.textContent = guests + " чел/день";

    const growthPct = 20 + Math.floor(guests / 50);
    const extraRevenue = Math.round(revenue * (growthPct / 100));
    const extraProfit = Math.round(extraRevenue * 0.35);

    if (growthResult) growthResult.textContent = "+" + growthPct + "%";
    if (profitResult) profitResult.textContent = formatMoney(extraProfit);
  }

  revenueSlider?.addEventListener("input", updateROI);
  guestsSlider?.addEventListener("input", updateROI);
  updateROI();

  /* ── Service card 3D tilt ────────────────────────────────── */

  if (!prefersReducedMotion) {
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ── Dust particles in hero ──────────────────────────────── */

  const dustContainer = document.querySelector(".dust-container");
  if (dustContainer && !prefersReducedMotion) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("span");
      particle.className = "dust-particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.setProperty("--dust-x", (Math.random() - 0.5) * 200 + "px");
      particle.style.setProperty("--dust-y", -(Math.random() * 300 + 100) + "px");
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = Math.random() * 6 + 6 + "s";
      dustContainer.appendChild(particle);
    }
  }

  /* ── FAQ accordion ───────────────────────────────────────── */

  const faqButtons = document.querySelectorAll(".faq-item__button");
  faqButtons.forEach((button) => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;

    panel.style.height = "0px";

    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      faqButtons.forEach((otherBtn) => {
        if (otherBtn !== button) {
          otherBtn.setAttribute("aria-expanded", "false");
          const otherPanel = document.getElementById(otherBtn.getAttribute("aria-controls"));
          if (otherPanel) otherPanel.style.height = "0px";
        }
      });

      if (isExpanded) {
        button.setAttribute("aria-expanded", "false");
        panel.style.height = "0px";
      } else {
        button.setAttribute("aria-expanded", "true");
        panel.style.height = panel.scrollHeight + "px";
      }
    });
  });

  /* ── Form validation (prototype) ─────────────────────────── */

  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const requiredFields = form.querySelectorAll("[required]");
      requiredFields.forEach((field) => {
        const groupError = field.closest(".form__group")?.querySelector(".form__error")
          || (field.type === "checkbox" ? document.getElementById("consent-error") : null);

        if (!field.value.trim() || (field.type === "checkbox" && !field.checked)) {
          field.setAttribute("aria-invalid", "true");
          if (groupError) groupError.hidden = false;
          valid = false;
        } else {
          field.setAttribute("aria-invalid", "false");
          if (groupError) groupError.hidden = true;
        }
      });

      if (valid) {
        const status = form.querySelector(".form__status");
        if (status) {
          status.hidden = false;
          status.focus();
        }
      }
    });
  }
})();
