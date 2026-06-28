/**
 * Lead magnet forms — prototype UI (backend TBD)
 * Site audit + restaurant-specific audit (booking, menu)
 */

(function initLeadMagnets() {
  "use strict";

  const tablist = document.querySelector(".lead-tabs");
  if (!tablist) return;

  const tabs = tablist.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (e) => {
      const index = Array.from(tabs).indexOf(tab);
      let next = index;

      if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      else return;

      e.preventDefault();
      tabs[next].focus();
      activateTab(tabs[next]);
    });
  });

  function activateTab(activeTab) {
    const panelId = activeTab.getAttribute("aria-controls");

    tabs.forEach((tab) => {
      const selected = tab === activeTab;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      const visible = panel.id === panelId;
      panel.hidden = !visible;
    });
  }

  setupForm({
    form: document.getElementById("site-audit-form"),
    onSuccess: renderSiteAuditPreview,
  });

  setupForm({
    form: document.getElementById("restaurant-audit-form"),
    onSuccess: renderRestaurantAuditPreview,
  });

  function setupForm({ form, onSuccess }) {
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;

      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Анализируем…";

      window.setTimeout(() => {
        onSuccess(form);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        const preview = form.closest(".lead-panel")?.querySelector(".audit-preview");
        preview?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 1400);
    });
  }

  function validateForm(form) {
    let valid = true;

    form.querySelectorAll("[required]").forEach((field) => {
      const group = field.closest(".form__group") || field.closest("label");
      const errorId = field.getAttribute("aria-describedby")?.split(" ").find((id) => id.includes("error"));
      const errorEl = errorId ? document.getElementById(errorId) : group?.querySelector(".form__error");

      const isEmpty =
        field.type === "checkbox" ? !field.checked : !field.value.trim();

      if (isEmpty) {
        field.setAttribute("aria-invalid", "true");
        if (errorEl) errorEl.hidden = false;
        valid = false;
      } else {
        field.setAttribute("aria-invalid", "false");
        if (errorEl) errorEl.hidden = true;
      }
    });

    const auditTypeInputs = form.querySelectorAll('input[name="audit_type"]');
    const auditTypeError = form.querySelector("#audit-type-error");
    if (auditTypeInputs.length) {
      const checked = form.querySelector('input[name="audit_type"]:checked');
      if (!checked) {
        if (auditTypeError) auditTypeError.hidden = false;
        valid = false;
      } else if (auditTypeError) {
        auditTypeError.hidden = true;
      }
    }

    return valid;
  }

  function renderSiteAuditPreview(form) {
    const url = form.querySelector("#site-url")?.value.trim() || "ваш сайт";
    const preview = document.getElementById("site-audit-preview");
    if (!preview) return;

    preview.hidden = false;
    preview.innerHTML = buildPreviewHtml({
      title: "Предварительный отчёт по сайту",
      subtitle: `Анализ: ${escapeHtml(url)}`,
      score: 62,
      items: [
        { label: "SEO и мета-теги", status: "warn", text: "Отсутствует уникальный title на 3 страницах, нет schema.org для ресторана." },
        { label: "Скорость загрузки", status: "bad", text: "LCP 4.2 с — выше рекомендуемого порога для мобильных устройств." },
        { label: "Мобильная версия", status: "warn", text: "Кнопка «Забронировать» перекрывается фиксированным меню на iPhone SE." },
        { label: "Доступность (WCAG)", status: "warn", text: "7 изображений без alt-текста, контраст вторичных ссылок ниже AA." },
        { label: "Конверсионные элементы", status: "good", text: "Форма заявки и телефон видны без прокрутки на desktop." },
      ],
      cta: "Полный отчёт с приоритетами исправлений отправим на указанный контакт.",
    });

    announce(preview);
  }

  function renderRestaurantAuditPreview(form) {
    const name = form.querySelector("#restaurant-name")?.value.trim() || "ваш ресторан";
    const types = Array.from(form.querySelectorAll('input[name="audit_type"]:checked')).map((i) => i.value);
    const preview = document.getElementById("restaurant-audit-preview");
    if (!preview) return;

    const items = [];

    if (types.includes("booking")) {
      items.push(
        { label: "Система бронирования", status: "bad", text: "Вотслеживаемый виджет без UTM — невозможно оценить ROI канала «сайт → стол»." },
        { label: "Мобильное бронирование", status: "warn", text: "Форма брони требует 6 полей — выше среднего для casual dining (рекомендуем 3–4)." }
      );
    }

    if (types.includes("menu")) {
      items.push(
        { label: "Онлайн-меню", status: "warn", text: "PDF-меню без текстового слоя — поисковики не индексируют блюда и цены." },
        { label: "Фото и описания", status: "good", text: "80% позиций с фото, но отсутствуют аллергены и вес порций." }
      );
    }

    if (types.includes("aggregators")) {
      items.push(
        { label: "Агрегаторы и карты", status: "warn", text: "Часы работы на Яндекс.Картах не совпадают с сайтом — риск негативных отзывов." }
      );
    }

    preview.hidden = false;
    preview.innerHTML = buildPreviewHtml({
      title: "Диагностика ресторана",
      subtitle: escapeHtml(name),
      score: 58,
      items,
      cta: "Эксперт MARS свяжется с вами и пришлёт детальный чек-лист с рекомендациями.",
    });

    announce(preview);
  }

  function buildPreviewHtml({ title, subtitle, score, items, cta }) {
    const rows = items
      .map(
        (item) => `
        <li class="audit-preview__item audit-preview__item--${item.status}">
          <span class="audit-preview__badge" aria-hidden="true">${statusIcon(item.status)}</span>
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <p>${escapeHtml(item.text)}</p>
          </div>
        </li>`
      )
      .join("");

    return `
      <div class="audit-preview__header">
        <div>
          <h3 class="audit-preview__title">${escapeHtml(title)}</h3>
          <p class="audit-preview__subtitle">${subtitle}</p>
        </div>
        <div class="audit-preview__score" aria-label="Общая оценка ${score} из 100">
          <span class="audit-preview__score-value">${score}</span>
          <span class="audit-preview__score-label">из 100</span>
        </div>
      </div>
      <ul class="audit-preview__list">${rows}</ul>
      <p class="audit-preview__note">${escapeHtml(cta)}</p>
      <p class="audit-preview__disclaimer">* Прототип: данные сгенерированы для демонстрации UX. Реальный анализ подключится на backend.</p>
    `;
  }

  function statusIcon(status) {
    if (status === "good") return "✓";
    if (status === "warn") return "!";
    return "×";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function announce(el) {
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }
})();
