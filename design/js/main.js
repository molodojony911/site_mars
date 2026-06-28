/**
 * MARS Agency — minimal UI interactions
 * Progressive enhancement only; page works without JS
 */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (!toggle || !nav) return;

  function setNavOpen(isOpen) {
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Закрыть меню навигации" : "Открыть меню навигации"
    );
  }

  toggle.addEventListener("click", function () {
    setNavOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll(".nav__link").forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setNavOpen(false);
      toggle.focus();
    }
  });

  window.matchMedia("(min-width: 48rem)").addEventListener("change", function (event) {
    if (event.matches) setNavOpen(false);
  });
})();
