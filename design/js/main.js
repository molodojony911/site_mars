/**
 * ОПОРА landing — interactions
 * Mobile nav, FAQ, form validation, scroll reveal
 */

(function () {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const faqButtons = document.querySelectorAll(".faq-item__button");
  const form = document.querySelector(".contact-form");
  const heroVideo = document.querySelector(".hero__video");

  /* ── Reduced motion: pause hero video ───────────────────── */

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function syncVideoMotion() {
    if (!heroVideo) return;
    if (prefersReducedMotion.matches) {
      heroVideo.pause();
      heroVideo.removeAttribute("autoplay");
    } else if (heroVideo.paused) {
      heroVideo.play().catch(() => {
        /* Autoplay may be blocked — poster remains */
      });
    }
  }

  syncVideoMotion();
  prefersReducedMotion.addEventListener("change", syncVideoMotion);

  /* ── Mobile navigation ──────────────────────────────────── */

  function openMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Закрыть меню");
    mobileNav.classList.add("is-open");
    mobileNav.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    mobileNav.querySelector(".mobile-nav__link")?.focus();
  }

  function closeMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
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

    mobileNav.querySelectorAll(".mobile-nav__link, .btn").forEach((el) => {
      el.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  /* ── FAQ accordion (one open at a time) ─────────────────── */

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";

      faqButtons.forEach((other) => {
        other.setAttribute("aria-expanded", "false");
      });

      button.setAttribute("aria-expanded", expanded ? "false" : "true");
    });
  });

  /* ── Contact form validation stub ───────────────────────── */

  function showError(input, errorId, show) {
    const error = document.getElementById(errorId);
    if (!error) return;
    input.setAttribute("aria-invalid", show ? "true" : "false");
    error.hidden = !show;
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#name");
      const phone = form.querySelector("#phone");
      const consent = form.querySelector("#consent");
      const status = form.querySelector(".form__status");
      let valid = true;

      if (name && !name.value.trim()) {
        showError(name, "name-error", true);
        valid = false;
      } else if (name) {
        showError(name, "name-error", false);
      }

      if (phone && !phone.value.trim()) {
        showError(phone, "phone-error", true);
        valid = false;
      } else if (phone) {
        showError(phone, "phone-error", false);
      }

      const consentError = document.getElementById("consent-error");
      if (consent && !consent.checked) {
        if (consentError) consentError.hidden = false;
        consent.setAttribute("aria-invalid", "true");
        valid = false;
      } else if (consent) {
        if (consentError) consentError.hidden = true;
        consent.setAttribute("aria-invalid", "false");
      }

      if (!valid) {
        form.querySelector("[aria-invalid='true']")?.focus();
        return;
      }

      if (status) {
        status.hidden = false;
        status.focus();
      }
      form.reset();
      [name, phone, consent].forEach((el) => el?.removeAttribute("aria-invalid"));
    });
  }

  /* ── Scroll reveal ──────────────────────────────────────── */

  const revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length && !prefersReducedMotion.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
