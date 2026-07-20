/**
 * MARS — Glassmorphism notification system (prototype)
 * Top-of-page toasts: enter/exit transitions, stack, pause on hover, WCAG live regions
 */

(function () {
  "use strict";

  const region = document.getElementById("toast-region");
  if (!region) return;

  const MAX_VISIBLE = 4;
  const DEFAULT_DURATION = 5000;

  const ICONS = {
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>',
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4M12 17h.01"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/></svg>',
  };

  const PRESETS = {
    info: {
      type: "info",
      title: "Новое сообщение",
      message: "Менеджер ответил на ваш запрос по аудиту.",
    },
    success: {
      type: "success",
      title: "Сохранено",
      message: "Изменения в профиле успешно применены.",
    },
    warning: {
      type: "warning",
      title: "Проверьте данные",
      message: "Срок действия промокода истекает через 2 дня.",
    },
    error: {
      type: "error",
      title: "Не удалось отправить",
      message: "Проверьте соединение и попробуйте ещё раз.",
      assertive: true,
    },
    action: {
      type: "info",
      title: "Отчёт готов",
      message: "Еженедельная аналитика по каналам доступна к скачиванию.",
      actions: [
        { label: "Скачать", primary: true },
        { label: "Позже" },
      ],
      duration: 8000,
    },
  };

  let idCounter = 0;
  const timers = new WeakMap();

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function createToast(options) {
    const {
      type = "info",
      title,
      message,
      actions = [],
      duration = DEFAULT_DURATION,
      assertive = false,
    } = options;

    const id = `toast-${++idCounter}`;
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.id = id;
    toast.setAttribute("role", assertive ? "alert" : "status");
    toast.setAttribute("aria-labelledby", `${id}-title`);
    toast.setAttribute("aria-describedby", `${id}-msg`);

    const actionsHtml = actions.length
      ? `<div class="toast__actions">${actions
          .map(
            (a, i) =>
              `<button type="button" class="toast__action${a.primary ? " toast__action--primary" : ""}" data-action-index="${i}">${escapeHtml(a.label)}</button>`
          )
          .join("")}</div>`
      : "";

    const showProgress = duration > 0 && !prefersReducedMotion();

    toast.innerHTML = `
      <div class="toast__icon">${ICONS[type] || ICONS.info}</div>
      <div class="toast__body">
        <p class="toast__title" id="${id}-title">${escapeHtml(title)}</p>
        <p class="toast__message" id="${id}-msg">${escapeHtml(message)}</p>
        ${actionsHtml}
      </div>
      <button type="button" class="toast__close" aria-label="Закрыть уведомление">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18"/>
        </svg>
      </button>
      ${showProgress ? `<div class="toast__progress" aria-hidden="true"><span class="toast__progress-bar" style="--toast-duration:${duration}ms"></span></div>` : ""}
    `;

    toast.querySelector(".toast__close").addEventListener("click", () => dismiss(toast));

    toast.querySelectorAll("[data-action-index]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = Number(btn.getAttribute("data-action-index"));
        const action = actions[index];
        if (action && typeof action.onClick === "function") action.onClick();
        dismiss(toast);
      });
    });

    toast.addEventListener("mouseenter", () => pause(toast));
    toast.addEventListener("mouseleave", () => resume(toast, duration));
    toast.addEventListener("focusin", () => pause(toast));
    toast.addEventListener("focusout", (e) => {
      if (!toast.contains(e.relatedTarget)) resume(toast, duration);
    });

    return { toast, duration };
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function trimStack() {
    const toasts = region.querySelectorAll(".toast:not(.is-leaving)");
    if (toasts.length <= MAX_VISIBLE) return;
    for (let i = 0; i < toasts.length - MAX_VISIBLE; i++) {
      dismiss(toasts[i]);
    }
  }

  function show(options) {
    const { toast, duration } = createToast(options);
    region.appendChild(toast);
    trimStack();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add("is-visible"));
    });

    if (duration > 0) scheduleDismiss(toast, duration);
    return toast;
  }

  function scheduleDismiss(toast, duration) {
    clearTimer(toast);
    const started = performance.now();
    const remaining = { value: duration, started };

    const timerId = window.setTimeout(() => dismiss(toast), duration);
    timers.set(toast, { timerId, remaining, duration });
  }

  function clearTimer(toast) {
    const state = timers.get(toast);
    if (state) {
      window.clearTimeout(state.timerId);
      timers.delete(toast);
    }
  }

  function pause(toast) {
    toast.classList.add("is-paused");
    const state = timers.get(toast);
    if (!state || state.paused) return;
    window.clearTimeout(state.timerId);
    const elapsed = performance.now() - state.remaining.started;
    state.remaining.value = Math.max(0, state.remaining.value - elapsed);
    state.paused = true;
  }

  function resume(toast, fallbackDuration) {
    toast.classList.remove("is-paused");
    const state = timers.get(toast);
    if (state && !state.paused) return;
    const left = state ? state.remaining.value : fallbackDuration;
    if (left <= 0) {
      dismiss(toast);
      return;
    }
    scheduleDismiss(toast, left);
  }

  function dismiss(toast) {
    if (!toast || toast.classList.contains("is-leaving")) return;
    clearTimer(toast);
    toast.classList.remove("is-visible");
    toast.classList.add("is-leaving");

    const ms = prefersReducedMotion() ? 0 : 250;
    window.setTimeout(() => {
      toast.remove();
    }, ms);
  }

  /* Demo controls */
  document.querySelectorAll("[data-toast]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-toast");
      if (key === "stack") {
        ["info", "success", "warning"].forEach((k, i) => {
          window.setTimeout(() => show({ ...PRESETS[k] }), i * 180);
        });
        return;
      }
      show({ ...PRESETS[key] });
    });
  });

  document.querySelectorAll("[data-dismiss-banner]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const banner = btn.closest(".banner");
      if (banner) {
        banner.hidden = true;
        banner.setAttribute("aria-hidden", "true");
      }
    });
  });

  document.querySelector("[data-demo='info']")?.addEventListener("click", () => {
    show({
      type: "info",
      title: "Расписание работ",
      message: "Технические работы: 23:00–23:30 МСК. Кабинет будет недоступен.",
    });
  });

  /* Seed one toast so the pattern is visible on first paint */
  window.setTimeout(() => {
    show({
      type: "success",
      title: "Добро пожаловать",
      message: "Прототип системы уведомлений MARS готов к просмотру.",
      duration: 6000,
    });
  }, 400);

  window.MarsNotify = { show, dismiss };
})();
