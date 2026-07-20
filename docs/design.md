# MARS Agency — Design Documentation

Документация дизайн-прототипов репозитория `site_mars`.

| Прототип | Файл | Описание |
|----------|------|----------|
| Лендинг | `design/index.html` | Маркетинговая страница mars-agency.pro |
| **Уведомления** | `design/notifications.html` | Glassmorphism toast + banner system |

```bash
cd design && python3 -m http.server 8080
# Лендинг:        http://localhost:8080/
# Уведомления:    http://localhost:8080/notifications.html
```

---

# Часть A. Система уведомлений (glassmorphism)

## 1. Цели дизайна

| Цель | Решение |
|------|---------|
| Ненавязчивая обратная связь | Toast-стек у верхнего края viewport, автоскрытие |
| Читаемость на любом фоне | Glass-поверхность с непрозрачностью ≥ 72% + blur |
| Бренд MARS | Montserrat, красный акцент, семантические цвета на токенах |
| Доступность WCAG 2.1 AA | Контраст текста ≥ 4.5:1, `aria-live`, focus-visible |
| Адаптивность | Mobile-first: full-width top → desktop right-top |

## 2. Wireframe

### 2.1 Viewport — toast region (верх страницы)

```
Mobile (< 768px)
┌─────────────────────────────────────────┐
│  ░░░░░ toast-region (fixed, top) ░░░░░  │
│  ┌───────────────────────────────────┐  │
│  │▌ ●  Title                      ✕ │  │  ← glass card
│  │     Message text…                 │  │
│  │     [Action]  [Dismiss]           │  │
│  │████████████░░░░ progress bar      │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │▌ ●  Next toast in stack…       ✕ │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Page content scrolls underneath…       │
└─────────────────────────────────────────┘

Tablet / Desktop (≥ 768px)
┌──────────────────────────────────────────────┐
│                         ┌──────────────────┐ │
│                         │▌ ● Title      ✕ │ │  ← right-aligned
│                         │  Message…        │ │     max-width 26rem
│                         │████████░░░░░░░░  │ │
│                         └──────────────────┘ │
│  Page content…                               │
└──────────────────────────────────────────────┘
```

### 2.2 Анатомия toast

```
┌─ toast ─────────────────────────────────────┐
│▌ ┌────┐  Title (semibold, sm)            [✕]│
│▌ │icon│  Message (secondary, sm)            │
│▌ └────┘  [Primary action] [Secondary]       │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░ progress         │
└─────────────────────────────────────────────┘
 │
 └── 4px accent bar (type color)
```

### 2.3 Page-level banner (в потоке контента, сверху)

```
┌─ banner ────────────────────────────────────────────┐
│  (●)  Title                                         │
│       Supporting sentence                           │
│                      [Подробнее]  [Скрыть]          │
└─────────────────────────────────────────────────────┘
```

### 2.4 Типы (variants)

| Variant | Акцент | Role | Когда |
|---------|--------|------|-------|
| `info` | `#1D4ED8` | `status` | Новости, нейтральные события |
| `success` | `#15803D` | `status` | Успешное действие |
| `warning` | `#A16207` | `status` | Требует внимания, не блокер |
| `error` | `#E02121` | `alert` | Ошибка, `aria-live` assertive via role |

### Breakpoints (mobile-first)

| Breakpoint | Ширина | Поведение toast-region |
|------------|--------|------------------------|
| Base | &lt; 768px | `left/right: 1rem`, растягивание на ширину |
| Tablet | ≥ 768px | `right: 1.5rem`, fixed width `26rem` |
| Desktop | ≥ 1024px | `top/right: 2rem` |

---

## 3. Цветовая палитра (CSS variables)

Файлы: `design/css/variables.css` (+ использование в `notifications.css`).

### Brand (существующие)

| Token | HEX | Использование |
|-------|-----|---------------|
| `--color-brand-red` | `#E02121` | Error accent, CTA, eyebrow |
| `--color-brand-black` | `#000000` | Demo background base |
| `--color-brand-white` | `#FFFFFF` | Текст на тёмном, fallback glass |

### Glass & notifications (новые)

| Token | Значение | Использование |
|-------|----------|---------------|
| `--color-glass-bg` | `rgba(255,255,255,0.72)` | Баннеры, playground |
| `--color-glass-bg-strong` | `rgba(255,255,255,0.88)` | Toast (выше контраст) |
| `--color-glass-text` | `#0D0D0D` | Заголовок на glass |
| `--color-glass-text-secondary` | `#2E2E2E` | Текст сообщения |
| `--color-notify-info` | `#1D4ED8` | Info accent |
| `--color-notify-success` | `#15803D` | Success accent |
| `--color-notify-warning` | `#A16207` | Warning accent |
| `--color-notify-error` | `#E02121` | Error accent |
| `--glass-blur` | `16px` | backdrop-filter |
| `--z-toast` | `400` | Над header/modal |

### Контраст (WCAG 2.1 AA)

| Пара | Ratio | Статус |
|------|-------|--------|
| `#0D0D0D` на glass `#FFFFFF@88%` | ≥ 16:1 | ✅ AAA |
| `#2E2E2E` на glass | ≥ 10:1 | ✅ AAA |
| Success `#15803D` на белом | ~4.6:1 | ✅ AA |
| Info `#1D4ED8` на белом | ~5.7:1 | ✅ AA |
| Warning `#A16207` на белом | ~4.6:1 | ✅ AA |
| Error `#E02121` на белом | ~4.6:1 | ✅ AA |
| Белый на error/success/info buttons | ≥ 4.5:1 | ✅ AA |

**Примечание:** полупрозрачное стекло намеренно «усилено» (`0.72–0.88`), чтобы glassmorphism не ломал контраст на пёстрых фонах. Fallback без `backdrop-filter` — сплошной белый.

---

## 4. Типографика

- **Шрифт:** Montserrat (из дизайн-системы лендинга)
- **Toast title:** `0.875rem` / weight 600 / line-height 1.2
- **Toast message:** `0.875rem` / weight 400 / secondary color
- **Banner title:** `1rem` / weight 600
- **Action chips:** `0.75rem` / weight 600

---

## 5. UX-заметки

### Появление и исчезновение

1. Enter: `opacity 0 → 1` + `translateY(-1rem) → 0` за `--transition-base` (250ms).
2. Exit: обратная анимация, затем remove из DOM.
3. Стек: новые тосты добавляются снизу региона; при > 4 видимых — старые dismiss.
4. Автоскрытие: 5s по умолчанию; progress-bar показывает оставшееся время.
5. Пауза: hover / focus внутри toast останавливает таймер и progress.

### Взаимодействие

| Элемент | Поведение |
|---------|-----------|
| ✕ Close | Немедленный dismiss, доступен с клавиатуры |
| Primary action | Выполняет действие → dismiss |
| Secondary action | Обычно «Позже» → dismiss |
| Banner «Скрыть» | `hidden` + `aria-hidden` |

### Когда toast, когда banner

| Сценарий | Паттерн |
|----------|---------|
| Короткий feedback на действие пользователя | Toast |
| Системное объявление на всю сессию/страницу | Banner вверху контента |
| Критическая ошибка формы | Inline у поля + опционально toast error |

### Рекомендации для продакшена

- Не дублировать один и тот же success toast и banner одновременно.
- Error toast: не автоскрывать критические ошибки оплаты/безопасности (duration: 0).
- Добавить `aria-atomic="true"` на отдельные тосты при динамическом обновлении текста.
- Связать с глобальным store (React Context / toast library) без изменения визуальных токенов.

### Motion

- Минимум 2 анимации в прототипе: slide-fade enter/exit, progress shrink.
- Третья: пауза progress при hover (play-state).
- `prefers-reduced-motion: reduce` → мгновенные переходы, progress без анимации.

---

## 6. Доступность (WCAG 2.1 AA)

| Критерий | Реализация |
|----------|------------|
| 1.4.3 Contrast | Тёмный текст на усиленном glass; акценты AA |
| 1.4.11 Non-text Contrast | Accent bar, icons ≥ 3:1 |
| 2.1.1 Keyboard | Close и actions в tab-order; Enter/Space |
| 2.2.1 Timing | Пауза на hover/focus; dismiss вручную всегда доступен |
| 2.4.7 Focus Visible | Синий outline 3px (`--color-focus-ring`) |
| 4.1.2 Name, Role, Value | `role="status"` / `role="alert"`, `aria-label` на close |
| 4.1.3 Status Messages | `aria-live="polite"` на регионе; error → `alert` |

Skip-link на демо-странице ведёт к `#main`, выше toast-region по z-index.

---

## 7. Файловая структура (уведомления)

```
design/
├── notifications.html      # HTML-прототип системы уведомлений
├── css/
│   ├── variables.css       # Design tokens (brand + glass + notify)
│   ├── styles.css          # Лендинг (без изменений логики)
│   └── notifications.css   # Toast, banner, demo shell
└── js/
    ├── main.js             # Лендинг
    └── notifications.js    # Toast API: show / dismiss / stack

docs/
└── design.md               # Этот документ
```

Публичный API прототипа: `window.MarsNotify.show({ type, title, message, actions, duration })`.

---

# Часть B. Лендинг (справочно)

Визуальный макет лендинга [mars-agency.pro](https://mars-agency.pro).  
**Прототип:** `design/index.html`.

## B.1 Цели дизайна

| Цель | Решение |
|------|---------|
| Конверсия в заявку | CTA «Оставить заявку» в hero, sticky header и повторный CTA-блок |
| Доверие | Метрики (500+ проектов, +35% конверсии), блок партнёров, FAQ |
| Понятность услуг | 4 карточки услуг с bullet-списками |
| Премиальный HoReCa-образ | Тёмный hero, красный акцент, Montserrat, минимализм |

## B.2 Wireframe (структура страницы)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (sticky, чёрный)                                    │
│  [Logo MARS]  Кто мы · Услуги · Подход · FAQ · Контакты    │
│                              [TG] [WA] 8 963…  [Заявка]    │
│  Mobile: [Logo]                              [☰ меню]     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  HERO (тёмный фон, красный градиент)                        │
│  H1 + подзаголовок + [Оставить заявку] [Узнать больше]     │
│  Stats: 500+ · +35% · +20% · 10 лет                         │
└─────────────────────────────────────────────────────────────┘

  … About → Process → Services → CTA → Partners → FAQ → Contact → Footer
```

| Breakpoint | Ширина | Изменения |
|------------|--------|-----------|
| Base | &lt; 768px | 1 колонка, burger-меню, stats 2×2 |
| Tablet | ≥ 768px | Навигация в header, 2 колонки |
| Desktop | ≥ 1024px | Hero 2 колонки, услуги 4 в ряд |

## B.3 UX-заметки (лендинг)

- Sticky header + skip-link; mobile drawer с Escape / backdrop.
- Форма: имя + телефон + согласие; `aria-invalid` + `role="status"`.
- FAQ: один открытый пункт; `aria-expanded` / `aria-controls`.

## B.4 Доступность лендинга

Семантика регионов, контраст brand-палитры, keyboard, focus-visible — см. исходный аудит в git-истории и реализацию в `design/css/styles.css`.

---

## Следующие шаги (интеграция уведомлений)

1. Перенести токены `--color-notify-*` / `--color-glass-*` в основной стек.
2. Обернуть `MarsNotify` в React-провайдер (если появится React-приложение).
3. Подключить реальные события: submit формы, ошибки API, системные баннеры.
4. Добавить unit/a11y тесты на live region и focus management.
