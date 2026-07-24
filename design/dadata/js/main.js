/**
 * Dadata UI prototype — mock suggest / autofill / result viz
 * No real API calls; demo data for design review
 */

(function () {
  "use strict";

  const MOCK = {
    address: [
      {
        value: "г Москва, ул Тверская, д 1",
        unrestricted: "125009, г Москва, ул Тверская, д 1",
        secondary: "125009 · ЦАО",
        confidence: 98,
        qc: "high",
        data: {
          postal_code: "125009",
          region: "Москва",
          city: "Москва",
          street: "ул Тверская",
          house: "1",
          fias_id: "0c5b2444-70a0-4932-980c-b4dc0d3f02b5",
          geo_lat: "55.7577",
          geo_lon: "37.6137",
        },
        fill: {
          "postal-code": "125009",
          region: "Москва",
          city: "Москва",
          street: "ул Тверская, д 1",
        },
      },
      {
        value: "г Санкт-Петербург, Невский пр-кт, д 28",
        unrestricted: "191186, г Санкт-Петербург, Невский пр-кт, д 28",
        secondary: "191186 · Центральный",
        confidence: 94,
        qc: "high",
        data: {
          postal_code: "191186",
          region: "Санкт-Петербург",
          city: "Санкт-Петербург",
          street: "Невский пр-кт",
          house: "28",
          fias_id: "c2deb16a-0330-4f05-821f-1d09c93331e6",
          geo_lat: "59.9354",
          geo_lon: "30.3267",
        },
        fill: {
          "postal-code": "191186",
          region: "Санкт-Петербург",
          city: "Санкт-Петербург",
          street: "Невский пр-кт, д 28",
        },
      },
      {
        value: "г Казань, ул Баумана, д 9",
        unrestricted: "420111, Респ Татарстан, г Казань, ул Баумана, д 9",
        secondary: "420111 · Вахитовский",
        confidence: 81,
        qc: "mid",
        data: {
          postal_code: "420111",
          region: "Татарстан",
          city: "Казань",
          street: "ул Баумана",
          house: "9",
          fias_id: "93b3df57-4c89-44df-ac42-96f05e9cd3b9",
          geo_lat: "55.7887",
          geo_lon: "49.1221",
        },
        fill: {
          "postal-code": "420111",
          region: "Республика Татарстан",
          city: "Казань",
          street: "ул Баумана, д 9",
        },
      },
    ],
    party: [
      {
        value: "ПАО СБЕРБАНК",
        unrestricted: "ПАО СБЕРБАНК",
        secondary: "ИНН 7707083893 · действующая",
        confidence: 99,
        qc: "high",
        data: {
          inn: "7707083893",
          ogrn: "1027700132195",
          name: "ПАО СБЕРБАНК",
          address: "г Москва, ул Вавилова, д 19",
          status: "ACTIVE",
          type: "LEGAL",
        },
        fill: {
          inn: "7707083893",
          ogrn: "1027700132195",
          "legal-name": "ПАО СБЕРБАНК",
          "legal-address": "г Москва, ул Вавилова, д 19",
        },
      },
      {
        value: 'ООО "ЯНДЕКС"',
        unrestricted: 'ООО "ЯНДЕКС"',
        secondary: "ИНН 7736207543 · действующая",
        confidence: 97,
        qc: "high",
        data: {
          inn: "7736207543",
          ogrn: "1027700229193",
          name: 'ООО "ЯНДЕКС"',
          address: "г Москва, ул Льва Толстого, д 16",
          status: "ACTIVE",
          type: "LEGAL",
        },
        fill: {
          inn: "7736207543",
          ogrn: "1027700229193",
          "legal-name": 'ООО "ЯНДЕКС"',
          "legal-address": "г Москва, ул Льва Толстого, д 16",
        },
      },
    ],
    bank: [
      {
        value: "ПАО Сбербанк",
        unrestricted: "ПАО Сбербанк",
        secondary: "БИК 044525225 · Москва",
        confidence: 99,
        qc: "high",
        data: {
          bic: "044525225",
          swift: "SABRRUMM",
          name: "ПАО Сбербанк",
          correspondent_account: "30101810400000000225",
          payment_city: "г Москва",
        },
        fill: {
          bic: "044525225",
          swift: "SABRRUMM",
          "bank-name": "ПАО Сбербанк",
          "corr-account": "30101810400000000225",
        },
      },
      {
        value: "АО «Тинькофф Банк»",
        unrestricted: "АО «Тинькофф Банк»",
        secondary: "БИК 044525974 · Москва",
        confidence: 96,
        qc: "high",
        data: {
          bic: "044525974",
          swift: "TICSRUMM",
          name: "АО «Тинькофф Банк»",
          correspondent_account: "30101810145250000974",
          payment_city: "г Москва",
        },
        fill: {
          bic: "044525974",
          swift: "TICSRUMM",
          "bank-name": "АО «Тинькофф Банк»",
          "corr-account": "30101810145250000974",
        },
      },
    ],
    fio: [
      {
        value: "Иванов Иван Иванович",
        unrestricted: "Иванов Иван Иванович",
        secondary: "Муж · qc_name: 0",
        confidence: 92,
        qc: "high",
        data: {
          surname: "Иванов",
          name: "Иван",
          patronymic: "Иванович",
          gender: "MALE",
          qc: "0",
        },
        fill: {
          surname: "Иванов",
          name: "Иван",
          patronymic: "Иванович",
          gender: "Мужской",
        },
      },
      {
        value: "Петрова Анна Сергеевна",
        unrestricted: "Петрова Анна Сергеевна",
        secondary: "Жен · qc_name: 0",
        confidence: 90,
        qc: "high",
        data: {
          surname: "Петрова",
          name: "Анна",
          patronymic: "Сергеевна",
          gender: "FEMALE",
          qc: "0",
        },
        fill: {
          surname: "Петрова",
          name: "Анна",
          patronymic: "Сергеевна",
          gender: "Женский",
        },
      },
    ],
  };

  const MODE_META = {
    address: {
      title: "Адрес",
      hint: "Suggest → разбор по КЛАДР / ФИАС",
      tabId: "tab-address",
      queryId: "query-address",
      listId: "suggest-address",
      controlId: "control-address",
      labels: {
        postal_code: "Индекс",
        region: "Регион",
        city: "Город",
        street: "Улица",
        house: "Дом",
        fias_id: "ФИАС",
        geo_lat: "Широта",
        geo_lon: "Долгота",
      },
    },
    party: {
      title: "Организация",
      hint: "Party → ИНН / ОГРН / статус",
      tabId: "tab-party",
      queryId: "query-party",
      listId: "suggest-party",
      controlId: "control-party",
      labels: {
        inn: "ИНН",
        ogrn: "ОГРН",
        name: "Название",
        address: "Адрес",
        status: "Статус",
        type: "Тип",
      },
    },
    bank: {
      title: "Банк",
      hint: "Bank → БИК / корр. счёт",
      tabId: "tab-bank",
      queryId: "query-bank",
      listId: "suggest-bank",
      controlId: "control-bank",
      labels: {
        bic: "БИК",
        swift: "SWIFT",
        name: "Банк",
        correspondent_account: "Корр. счёт",
        payment_city: "Город",
      },
    },
    fio: {
      title: "ФИО",
      hint: "Fio → разбор частей и пола",
      tabId: "tab-fio",
      queryId: "query-fio",
      listId: "suggest-fio",
      controlId: "control-fio",
      labels: {
        surname: "Фамилия",
        name: "Имя",
        patronymic: "Отчество",
        gender: "Пол",
        qc: "QC",
      },
    },
  };

  let currentMode = "address";
  let activeIndex = -1;
  let currentItems = [];
  let selectedItem = null;
  let debounceTimer = null;

  const form = document.getElementById("dadata-form");
  const formTitle = document.getElementById("form-title");
  const formHint = document.getElementById("form-hint");
  const tabs = document.querySelectorAll(".mode-tab");
  const fieldBlocks = document.querySelectorAll(".mode-fields");
  const resultEmpty = document.getElementById("result-empty");
  const resultPanel = document.getElementById("result-panel");
  const resultValue = document.getElementById("result-value");
  const resultMeta = document.getElementById("result-meta");
  const resultKv = document.getElementById("result-kv");
  const confidenceFill = document.getElementById("confidence-fill");
  const confidencePct = document.getElementById("confidence-pct");
  const rawToggle = document.getElementById("raw-toggle");
  const rawPanel = document.getElementById("raw-panel");
  const rawCode = document.getElementById("raw-code");
  const liveStatus = document.getElementById("live-status");
  const flowSteps = document.querySelectorAll(".flow__step");

  function setFlow(step) {
    flowSteps.forEach((el) => {
      const n = Number(el.getAttribute("data-step"));
      el.classList.toggle("is-active", n === step);
      el.classList.toggle("is-done", n < step);
    });
  }

  function announce(message) {
    if (!liveStatus) return;
    liveStatus.textContent = message;
    liveStatus.classList.add("is-visible");
    window.clearTimeout(announce._t);
    announce._t = window.setTimeout(() => {
      liveStatus.classList.remove("is-visible");
    }, 2800);
  }

  function filterItems(mode, query) {
    const q = query.trim().toLowerCase();
    const pool = MOCK[mode] || [];
    if (!q) return pool.slice(0, 3);
    return pool.filter(
      (item) =>
        item.value.toLowerCase().includes(q) ||
        item.unrestricted.toLowerCase().includes(q) ||
        item.secondary.toLowerCase().includes(q)
    );
  }

  function getModeEls(mode) {
    const meta = MODE_META[mode];
    return {
      meta,
      input: document.getElementById(meta.queryId),
      list: document.getElementById(meta.listId),
      control: document.getElementById(meta.controlId),
    };
  }

  function closeSuggest(mode) {
    const { input, list } = getModeEls(mode || currentMode);
    if (!list || !input) return;
    list.hidden = true;
    list.innerHTML = "";
    input.setAttribute("aria-expanded", "false");
    activeIndex = -1;
    currentItems = [];
  }

  function renderSuggest(mode, items) {
    const { input, list } = getModeEls(mode);
    if (!list || !input) return;

    currentItems = items;
    activeIndex = items.length ? 0 : -1;
    list.innerHTML = "";

    if (!items.length) {
      const empty = document.createElement("li");
      empty.className = "suggest__empty";
      empty.textContent = "Ничего не найдено в mock-данных";
      list.appendChild(empty);
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
      return;
    }

    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.id = `${mode}-opt-${index}`;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "suggest__item";
      btn.setAttribute("aria-selected", index === 0 ? "true" : "false");
      btn.innerHTML =
        `<span class="suggest__primary">${escapeHtml(item.value)}</span>` +
        `<span class="suggest__secondary">${escapeHtml(item.secondary)}</span>`;

      btn.addEventListener("click", () => selectItem(mode, item));
      li.appendChild(btn);
      list.appendChild(li);
    });

    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
    input.setAttribute("aria-activedescendant", `${mode}-opt-0`);
    setFlow(2);
  }

  function updateActiveOption(mode) {
    const { input, list } = getModeEls(mode);
    if (!list) return;
    const buttons = list.querySelectorAll(".suggest__item");
    buttons.forEach((btn, i) => {
      btn.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
      if (i === activeIndex) {
        btn.scrollIntoView({ block: "nearest" });
        input.setAttribute("aria-activedescendant", `${mode}-opt-${i}`);
      }
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setBusy(mode, busy) {
    const { control, input } = getModeEls(mode);
    if (!control || !input) return;
    control.classList.toggle("is-busy", busy);
    input.classList.toggle("is-loading", busy);
  }

  function requestSuggest(mode, query) {
    setBusy(mode, true);
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      const items = filterItems(mode, query);
      setBusy(mode, false);
      renderSuggest(mode, items);
    }, 280);
  }

  function applyFill(item) {
    if (!item || !item.fill) return;
    Object.entries(item.fill).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) {
        el.value = value;
        el.classList.add("is-filled");
      }
    });
    setFlow(3);
  }

  function qualityLabel(qc) {
    if (qc === "high") return { text: "Высокое качество", cls: "chip--high" };
    if (qc === "mid") return { text: "Среднее качество", cls: "chip--mid" };
    return { text: "Низкое качество", cls: "chip--low" };
  }

  function showResult(mode, item) {
    selectedItem = item;
    resultEmpty.hidden = true;
    resultPanel.hidden = false;

    resultValue.textContent = item.unrestricted || item.value;

    const q = qualityLabel(item.qc);
    resultMeta.innerHTML = "";
    const chipQ = document.createElement("span");
    chipQ.className = `chip ${q.cls}`;
    chipQ.innerHTML = `<span class="chip__dot" aria-hidden="true"></span>${q.text}`;
    resultMeta.appendChild(chipQ);

    const chipMode = document.createElement("span");
    chipMode.className = "chip";
    chipMode.textContent = MODE_META[mode].title;
    resultMeta.appendChild(chipMode);

    confidencePct.textContent = `${item.confidence}%`;
    requestAnimationFrame(() => {
      confidenceFill.style.width = `${item.confidence}%`;
    });

    const labels = MODE_META[mode].labels;
    resultKv.innerHTML = "";
    Object.entries(item.data).forEach(([key, value]) => {
      const row = document.createElement("div");
      row.className = "kv";
      const isMono = /id|inn|ogrn|bic|swift|account|fias|geo_/i.test(key);
      row.innerHTML =
        `<dt class="kv__key">${escapeHtml(labels[key] || key)}</dt>` +
        `<dd class="kv__value${isMono ? " kv__value--mono" : ""}">${escapeHtml(String(value))}</dd>`;
      resultKv.appendChild(row);
    });

    rawCode.textContent = JSON.stringify(
      {
        value: item.value,
        unrestricted_value: item.unrestricted,
        data: item.data,
      },
      null,
      2
    );

    setFlow(4);
    announce("Поля заполнены. Результат API обновлён.");
  }

  function selectItem(mode, item) {
    const { input } = getModeEls(mode);
    if (input) input.value = item.value;
    closeSuggest(mode);
    applyFill(item);
    showResult(mode, item);
  }

  function switchMode(mode) {
    if (!MODE_META[mode]) return;
    closeSuggest(currentMode);
    currentMode = mode;
    selectedItem = null;

    tabs.forEach((tab) => {
      const selected = tab.getAttribute("data-mode") === mode;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
    });

    fieldBlocks.forEach((block) => {
      const match = block.getAttribute("data-fields") === mode;
      block.hidden = !match;
    });

    formTitle.textContent = MODE_META[mode].title;
    formHint.textContent = MODE_META[mode].hint;
    document.getElementById("panel-form")?.setAttribute(
      "aria-labelledby",
      MODE_META[mode].tabId
    );

    resultEmpty.hidden = false;
    resultPanel.hidden = true;
    confidenceFill.style.width = "0";
    setFlow(1);

    const { input } = getModeEls(mode);
    input?.focus();
  }

  function clearFilled() {
    form.querySelectorAll(".field__input").forEach((el) => {
      if (el.readOnly) el.value = "";
    });
    resultEmpty.hidden = false;
    resultPanel.hidden = true;
    selectedItem = null;
    confidenceFill.style.width = "0";
    setFlow(1);
    closeSuggest(currentMode);
    announce("Форма очищена.");
  }

  /* Events */

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      switchMode(tab.getAttribute("data-mode"));
    });

    tab.addEventListener("keydown", (e) => {
      const modes = ["address", "party", "bank", "fio"];
      const idx = modes.indexOf(currentMode);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const next =
          e.key === "ArrowRight"
            ? modes[(idx + 1) % modes.length]
            : modes[(idx - 1 + modes.length) % modes.length];
        switchMode(next);
        document.getElementById(MODE_META[next].tabId)?.focus();
      }
    });
  });

  Object.keys(MODE_META).forEach((mode) => {
    const { input, list } = getModeEls(mode);
    if (!input) return;

    input.addEventListener("input", () => {
      const q = input.value;
      if (!q.trim()) {
        closeSuggest(mode);
        setFlow(1);
        return;
      }
      requestSuggest(mode, q);
    });

    input.addEventListener("keydown", (e) => {
      if (list.hidden && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        requestSuggest(mode, input.value);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!currentItems.length) return;
        activeIndex = (activeIndex + 1) % currentItems.length;
        updateActiveOption(mode);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!currentItems.length) return;
        activeIndex = (activeIndex - 1 + currentItems.length) % currentItems.length;
        updateActiveOption(mode);
      } else if (e.key === "Enter") {
        if (!list.hidden && activeIndex >= 0 && currentItems[activeIndex]) {
          e.preventDefault();
          selectItem(mode, currentItems[activeIndex]);
        }
      } else if (e.key === "Escape") {
        closeSuggest(mode);
      }
    });

    input.addEventListener("blur", () => {
      window.setTimeout(() => closeSuggest(mode), 150);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (selectedItem) {
      showResult(currentMode, selectedItem);
      announce("Текущая подсказка применена повторно.");
      return;
    }
    const { input } = getModeEls(currentMode);
    const items = filterItems(currentMode, input?.value || "");
    if (items[0]) {
      selectItem(currentMode, items[0]);
    } else {
      announce("Нет подходящей подсказки. Уточните запрос.");
    }
  });

  form.addEventListener("reset", (e) => {
    e.preventDefault();
    const { input } = getModeEls(currentMode);
    if (input) input.value = "";
    clearFilled();
  });

  rawToggle?.addEventListener("click", () => {
    const open = rawToggle.getAttribute("aria-expanded") === "true";
    rawToggle.setAttribute("aria-expanded", open ? "false" : "true");
    rawToggle.lastChild.textContent = open ? " Показать JSON" : " Скрыть JSON";
    if (rawPanel) rawPanel.hidden = open;
  });

  document.addEventListener("click", (e) => {
    const { list, control } = getModeEls(currentMode);
    if (!list || list.hidden) return;
    if (control && !control.contains(e.target)) {
      closeSuggest(currentMode);
    }
  });

  setFlow(1);
})();
