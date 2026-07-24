# Dadata UI — Design Documentation

Визуальный макет интерфейса интеграции **API Dadata**: автоматизация ввода (suggest + autofill) и визуализация ответа API.

**Прототип:** [`design/dadata/index.html`](../design/dadata/index.html)  
**Базовая design system:** [`design/`](../design/) (палитра steel + safety, Space Grotesk) + слой glassmorphism.

> Лендинг ОПОРА ([`design/index.html`](../design/index.html)) не изменялся.

---

## 1. Цели дизайна

| Цель | Решение |
|------|---------|
| Ускорить ввод данных | Suggest по мере набора, клавиатура ↑↓ / Enter / Esc |
| Снизить ошибки | Readonly-поля заполняются из выбранной подсказки |
| Показать «что вернул API» | Панель результата: value, qc, confidence, key-value, JSON |
| Modern web-platform look | Glass panels, atmosphere gradient, tokens из DS |
| Доступность WCAG 2.1 AA | Контраст, focus-visible, ARIA listbox/tabs, live region |

---

## 2. Wireframe

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (sticky glass)                                      │
│  [■ ОПОРА / Dadata UI]          [● API online] [Design docs]│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  INTRO                                                      │
│  Eyebrow: Интеграция API                                    │
│  H1: Dadata: ввод без ручной рутины                         │
│  Lead: подсказки · автозаполнение · визуализация ответа     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  MODE TABS  [ Адрес ] [ Организация ] [ Банк ] [ ФИО ]     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  FLOW (tablet+)  01 Ввод → 02 Подсказка → 03 Fill → 04 API │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────┬──────────────────────────────┐
│  INPUT PANEL (glass)         │  RESULT PANEL (glass, sticky)│
│                              │                              │
│  Query [suggest ▾]           │  Empty state  /  Result      │
│  ┌─────────────────────┐     │  unrestricted value          │
│  │ Подсказка 1         │     │  [qc chip] [mode chip]       │
│  │ Подсказка 2         │     │  ▓▓▓▓▓▓▓▓░░ confidence %     │
│  └─────────────────────┘     │  key · value rows            │
│  Автозаполненные поля        │  ▸ Показать JSON             │
│  [Применить] [Очистить]      │                              │
└──────────────────────────────┴──────────────────────────────┘

Mobile: одна колонка — форма сверху, результат снизу.
```

### Breakpoints (mobile-first)

| Breakpoint | Ширина | Изменения |
|------------|--------|-----------|
| Base | &lt; 768px | 1 колонка, горизонтальный scroll табов, flow скрыт |
| Tablet | ≥ 768px | Flow-шаги, 2 колонки полей, kv в 2 колонки |
| Desktop | ≥ 1024px | Workspace 2 панели; results sticky |

---

## 3. Цветовая палитра (CSS variables)

Файл: [`design/dadata/css/variables.css`](../design/dadata/css/variables.css)

Наследует токены ОПОРА и добавляет glass-слой.

| Token | Значение | Использование |
|-------|----------|---------------|
| `--color-safety` | `#C2410C` | CTA, eyebrow, акценты |
| `--color-steel-900` | `#14171A` | Текст, активный tab |
| `--color-steel-600` | `#454E59` | Вторичный текст |
| `--color-bg` | `#E4E8EE` | База под atmosphere |
| `--glass-bg` | `rgba(255,255,255,0.72)` | Панели |
| `--glass-blur` | `18px` | Backdrop blur |
| `--color-focus` | `#005FCC` | Focus ring (не бренд) |
| `--color-quality-high/mid/low` | green / amber / red | QC chips |

### Контраст (WCAG 2.1 AA)

| Пара | Ratio | Статус |
|------|-------|--------|
| Steel-900 на glass/white | ~16:1 | ✅ AAA |
| Steel-600 на white | ~7.8:1 | ✅ AAA |
| White на safety | ~5.1:1 | ✅ AA |
| Opacity glass ≥ 0.72 | — | Текст читаем на atmosphere |

---

## 4. Типографика

- **UI / headings:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (design system)
- **JSON / ID:** [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
- Display title: `--text-display` ≈ 1.5–2.25rem
- Body: 1rem / line-height 1.55

---

## 5. UX-заметки

### Автоматизация ввода

1. Пользователь печатает в query-поле → debounce ~280 ms → dropdown suggest.
2. Выбор (клик / Enter) заполняет связанные readonly-поля.
3. Правая панель показывает структурированный «ответ API» (mock).
4. Flow-индикатор отражает этап: ввод → подсказка → fill → результат.

### Визуализация API

- **Summary** — `unrestricted_value`
- **QC chips** — high / mid / low
- **Confidence bar** — процентная уверенность (motion)
- **Key-value** — человекочитаемые поля
- **Raw JSON** — раскрываемый блок для разработчиков

### Режимы

| Режим | Endpoint (концепт) | Автозаполнение |
|-------|--------------------|----------------|
| Адрес | `/suggest/address` | индекс, регион, город, улица |
| Организация | `/suggest/party` | ИНН, ОГРН, имя, юр. адрес |
| Банк | `/suggest/bank` | БИК, SWIFT, название, корр. счёт |
| ФИО | `/suggest/fio` | фамилия, имя, отчество, пол |

### Motion (намеренные)

1. `rise-in` — появление intro / tabs / workspace  
2. `pulse-dot` — статус API online  
3. Confidence bar width + busy spinner на suggest  

Отключаются при `prefers-reduced-motion: reduce`.

### Glassmorphism

- Панели и dropdown: полупрозрачный белый + `backdrop-filter`
- Фон страницы: радиальные wash (safety / info) + steel gradient — не плоский цвет
- Fallback без `backdrop-filter`: почти непрозрачный белый

---

## 6. Доступность (WCAG 2.1 AA)

| Критерий | Реализация |
|----------|------------|
| 1.3.1 | `header`, `main`, `section`, `aside`, `footer`, tabs/listbox |
| 1.4.3 | Палитра и glass opacity проверены |
| 2.1.1 | Tabs ←→, suggest ↑↓ Enter Esc, форма |
| 2.4.1 | Skip-link |
| 2.4.7 | Синий `outline` 3px (`--color-focus`) |
| 4.1.2 | `aria-selected`, `aria-expanded`, `aria-controls`, `aria-live` |
| 2.3 / 2.2 | Reduced motion отключает анимации |

`lang="ru"`. Readonly autofill-поля не требуют ручного ввода (снижают cognitive load).

---

## 7. Файловая структура

```
design/
├── index.html                 # Лендинг ОПОРА (без изменений)
├── css/ · js/                 # DS лендинга
└── dadata/
    ├── index.html             # Прототип интеграции Dadata
    ├── css/
    │   ├── variables.css      # Tokens + glass
    │   └── styles.css         # Layout / components
    └── js/
        └── main.js            # Mock suggest / fill / viz

docs/
└── design.md                  # Этот документ
```

---

## 8. Как просмотреть

```bash
cd design/dadata && python3 -m http.server 8080
# http://localhost:8080
```

Или открыть `design/dadata/index.html` в браузере.

Попробуйте ввести «Москва», «Сбер», «Иванов» — сработают mock-подсказки.

---

## 9. Следующие шаги (интеграция)

1. Подключить реальный Dadata Suggest API (token / proxy).
2. Добавить debounce/cancel (AbortController) и обработку 429/5xx.
3. Перенести CSS variables в прод-дизайн-токены.
4. Focus trap / портал для suggest на очень узких экранах при необходимости.
5. Юнит-тесты на маппинг `data → form fields`.
