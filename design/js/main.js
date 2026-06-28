/**
 * MARS Agency landing — minimal interactions
 * Mobile nav, FAQ accordion, form validation stub
 */

(function () {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav__link, .mobile-nav__sublink");
  const faqButtons = document.querySelectorAll(".faq-item__button");
  const form = document.querySelector(".contact-form");

  /* ── Mobile navigation ───────────────────────────────────── */

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

  /* ── FAQ accordion ─────────────────────────────────────── */

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

  /* ── Form validation (prototype) ───────────────────────── */

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const requiredFields = form.querySelectorAll("[required]");
      requiredFields.forEach((field) => {
        const errorEl = document.getElementById(field.getAttribute("aria-describedby")?.split(" ")[1] || "");
        const groupError = field.closest(".form__group")?.querySelector(".form__error");

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
