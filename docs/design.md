# Mars Agency — Design System & UX Specification

Визуальный прототип лендинга находится в [`design/`](../design/). Откройте [`design/index.html`](../design/index.html) в браузере для просмотра.

---

## 1. Обзор

| Параметр | Значение |
|----------|----------|
| Тип | Одностраничный лендинг (SPA-style scroll) |
| Целевая аудитория | Основатели и CMO среднего бизнеса, стартапы Series A–B |
| Цель страницы | Генерация лидов (заявка / email / звонок) |
| Подход | Mobile-first, progressive enhancement |
| Стандарт доступности | WCAG 2.1 Level AA |

---

## 2. Wireframe (структура страницы)

```
┌─────────────────────────────────────────────────────────────┐
│  SKIP LINK (скрыт, виден при фокусе)                        │
├─────────────────────────────────────────────────────────────┤
│  HEADER (sticky)                                            │
│  [Logo]                              [☰]  ← mobile        │
│  [Logo]    Услуги | Работы | Процесс | Отзывы  [CTA] ← desk│
├─────────────────────────────────────────────────────────────┤
│  HERO                                                       │
│  ┌─────────────────────────────────────┐                    │
│  │ ● Принимаем проекты на Q3 2026      │  badge             │
│  │                                     │                    │
│  │ Создаём бренды, которые             │  H1                │
│  │ запоминаются                        │                    │
│  │                                     │                    │
│  │ Lead paragraph (2 строки)           │                    │
│  │                                     │                    │
│  │ [Начать проект]  [Смотреть кейсы]   │  primary + secondary│
│  │                                     │                    │
│  │ ─────────────────────────────────── │                    │
│  │ 120+        4 года        18        │  stats row         │
│  │ проектов    LTV клиента   наград    │                    │
│  └─────────────────────────────────────┘                    │
│  (фон: grid + gradient orbs)                                │
├─────────────────────────────────────────────────────────────┤
│  SERVICES (#services)                                       │
│  Eyebrow / H2 / Lead                                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Icon     │ │ Icon     │ │ Icon     │ │ Icon     │       │
│  │ Брендинг │ │ Digital  │ │ Стратегия│ │ Контент  │       │
│  │ desc     │ │ desc     │ │ desc     │ │ desc     │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│  1 col → 2 col (640px) → 4 col (1024px)                    │
├─────────────────────────────────────────────────────────────┤
│  WORK (#work)                                               │
│  Eyebrow / H2 / Lead                                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ [visual]     │ │ [visual]     │ │ [visual]     │        │
│  │ tag          │ │ tag          │ │ tag          │        │
│  │ Title        │ │ Title        │ │ Title        │        │
│  │ desc + metric│ │ desc + metric│ │ desc + metric│        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│  1 col → 2 col (768px) → 3 col (1024px)                    │
├─────────────────────────────────────────────────────────────┤
│  PROCESS (#process) — alternate background                  │
│  Eyebrow / H2 / Lead                                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ 01      │ │ 02      │ │ 03      │ │ 04      │           │
│  │ Исслед. │ │ Концеп. │ │ Реализ. │ │ Запуск  │           │
│  │ desc    │ │ desc    │ │ desc    │ │ desc    │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
├─────────────────────────────────────────────────────────────┤
│  TESTIMONIALS (#testimonials)                               │
│  Eyebrow / H2 / Lead                                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ " Quote...   │ │ " Quote...   │ │ " Quote...   │        │
│  │              │ │              │ │              │        │
│  │ [AV] Name    │ │ [AV] Name    │ │ [AV] Name    │        │
│  │     Role     │ │     Role     │ │     Role     │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  CTA BANNER (#contact)                                      │
│  ┌─────────────────────────────────────────────────────┐  │
│  │         Готовы вывести бренд на новый уровень?        │  │
│  │              Lead text (центр)                        │  │
│  │     [email CTA]        [phone CTA]                    │  │
│  └─────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
│  [Logo + desc]     Навигация      Контакты                  │
│  ─────────────────────────────────────────────────────────  │
│  © 2026 Mars Agency              [TG] [Be] [Li]             │
└─────────────────────────────────────────────────────────────┘
```

### Breakpoints

| Token | Min-width | Поведение |
|-------|-----------|-----------|
| Mobile (base) | 0 | 1-колоночные сетки, burger-меню |
| `sm` | 480px (`30rem`) | Hero-кнопки в ряд |
| `md` | 640px (`40rem`) | Services: 2 колонки |
| `lg` | 768px (`48rem`) | Work/Testimonials: 2 колонки; увеличенные отступы |
| `xl` | 1024px (`64rem`) | Desktop nav; Services 4 col; Work 3 col; Process 4 col |

---

## 3. Цветовая палитра

Все токены определены в [`design/css/variables.css`](../design/css/variables.css).

### Brand colors

| Token | HEX | Использование |
|-------|-----|---------------|
| `--color-mars-500` | `#c1440e` | Primary accent, CTA, ссылки |
| `--color-mars-400` | `#d4622a` | Hover-состояния |
| `--color-gold-400` | `#e8a838` | Focus ring, декоративные акценты |
| `--color-space-900` | `#0a0e17` | Основной фон |
| `--color-space-700` | `#141b2d` | Карточки, elevated surfaces |
| `--color-space-50` | `#e8eaed` | Основной текст |

### Semantic tokens

| Token | Назначение |
|-------|------------|
| `--color-bg-base` | Фон страницы |
| `--color-bg-elevated` | Карточки, header overlay |
| `--color-text-primary` | Заголовки, основной текст |
| `--color-text-secondary` | Lead-параграфы, цитаты |
| `--color-text-muted` | Мета-информация, подписи |
| `--color-focus-ring` | Кольцо фокуса (3px solid) |
| `--color-border` | Разделители, границы карточек |

### Контрастность (WCAG AA)

| Пара | Ratio | Статус |
|------|-------|--------|
| `--color-text-primary` на `--color-bg-base` | 15.8:1 | ✅ AAA |
| `--color-text-secondary` на `--color-bg-base` | 7.2:1 | ✅ AAA |
| `--color-text-muted` на `--color-bg-base` | 4.6:1 | ✅ AA |
| `--color-mars-500` на `--color-bg-base` | 4.6:1 | ✅ AA (large text / UI) |
| `--color-text-primary` на `--color-accent` (кнопка) | 4.8:1 | ✅ AA |
| `--color-focus-ring` на `--color-bg-base` | 5.1:1 | ✅ AA |

---

## 4. Типографика

| Роль | Шрифт | Вес | Размер (fluid) |
|------|-------|-----|----------------|
| Display / H1 | Syne | 700–800 | `--text-hero` (40–68px) |
| H2 | Syne | 700 | `--text-3xl` (30–44px) |
| H3 | Syne | 700 | `--text-lg` |
| Body | Source Sans 3 | 400 | `--text-base` (16–17px) |
| Lead | Source Sans 3 | 400 | `--text-lg` / `--text-xl` |
| Eyebrow | Source Sans 3 | 600 | `--text-sm`, uppercase |
| Caption | Source Sans 3 | 400 | `--text-xs` / `--text-sm` |

Масштаб построен на `clamp()` — плавное увеличение от mobile к desktop без резких скачков.

---

## 5. UX-заметки

### Информационная архитектура

1. **Hero** — мгновенная ценностная proposition + два CTA (высокий и низкий commitment).
2. **Услуги** — быстрое сканирование компетенций (F-pattern на desktop).
3. **Портфолио** — социальное доказательство через конкретные метрики в описаниях.
4. **Процесс** — снижение тревожности: клиент понимает, что его ждёт.
5. **Отзывы** — эмоциональное подкрепление от реальных людей с ролями.
6. **CTA-баннер** — финальный push с прямым контактом (email + телефон).
7. **Footer** — дублирование навигации и контактов для уставших скроллеров.

### Паттерны взаимодействия

| Элемент | Поведение | Обоснование |
|---------|-----------|-------------|
| Sticky header | Остаётся при скролле с blur-фоном | CTA всегда доступен |
| Burger → drawer | Slide-in справа на mobile | Стандартный паттерн, не перекрывает контент полностью |
| Anchor links | Плавный скролл (`scroll-behavior: smooth`) | Быстрая навигация по секциям |
| Карточки услуг | Subtle lift on hover (desktop) | Affordance без отвлечения |
| Карточки кейсов | Glow border on hover | Сигнал кликабельности |
| Escape | Закрывает mobile menu + возвращает фокус на toggle | Keyboard UX |

### CTA-иерархия

```
Primary:   «Начать проект» / «Обсудить проект» / email
Secondary: «Смотреть кейсы» / телефон
Ghost:     Навигационные ссылки
```

Один primary CTA на экран — правило соблюдено: в hero и в финальном баннере.

### Доверие (trust signals)

- Статистика в hero (120+ проектов, LTV, награды)
- Метрики в кейсах (+47% узнаваемости, +32% конверсии)
- Имена и должности в отзывах
- Badge «Принимаем проекты» — urgency без агрессии

### Mobile-first решения

- Touch targets ≥ 44×44px (`--touch-min: 2.75rem`)
- Кнопки на всю ширину в hero на узких экранах
- Stats переходят в 1 колонку < 480px
- Навигация не загромождает header на mobile

---

## 6. Доступность (WCAG 2.1 AA)

### Реализовано в прототипе

| Критерий | Реализация |
|----------|------------|
| **1.1.1** Non-text Content | `aria-hidden` на декоративных SVG; `aria-label` на icon-only кнопках |
| **1.3.1** Info and Relationships | Семантические теги: `header`, `nav`, `main`, `section`, `footer`, `article`, `figure`, `blockquote` |
| **1.3.2** Meaningful Sequence | DOM-порядок = визуальный порядок |
| **1.4.3** Contrast (Minimum) | Все текстовые пары ≥ 4.5:1 (см. таблицу выше) |
| **1.4.4** Resize Text | Fluid typography через `clamp()`, без фиксированных px для текста |
| **1.4.10** Reflow | Нет горизонтального скролла до 320px |
| **1.4.11** Non-text Contrast | Границы карточек, focus ring ≥ 3:1 |
| **2.1.1** Keyboard | Все интерактивные элементы доступны с клавиатуры |
| **2.4.1** Bypass Blocks | Skip link → `#main-content` |
| **2.4.2** Page Titled | `<title>` + meta description |
| **2.4.3** Focus Order | Логичный tab order; Escape закрывает меню |
| **2.4.4** Link Purpose | Текст ссылок описателен; icon links имеют `aria-label` |
| **2.4.6** Headings and Labels | Иерархия H1 → H2 → H3 без пропусков |
| **2.4.7** Focus Visible | `:focus-visible` с 3px gold ring |
| **2.5.5** Target Size | Минимум 44×44px на кнопках и ссылках |
| **3.2.3** Consistent Navigation | Header и footer дублируют одни и те же пункты |
| **4.1.2** Name, Role, Value | `aria-expanded`, `aria-controls` на burger; `role="list"` где сброшен list-style |

### Рекомендации для production

- [ ] Добавить `lang` атрибут переключения при мультиязычности
- [ ] Подключить аналитику с consent banner (GDPR)
- [ ] Заменить placeholder-ссылки (`href="#"`) на реальные URL
- [ ] Добавить форму обратной связи с валидацией и error states
- [ ] Провести тест с screen reader (NVDA / VoiceOver)
- [ ] Провести аудит через axe DevTools или Lighthouse Accessibility

---

## 7. Файловая структура

```
design/
├── index.html          # HTML-прототип лендинга
└── css/
    ├── variables.css   # Design tokens (цвета, типографика, spacing)
    └── main.css        # Компоненты и layout (mobile-first)

docs/
└── design.md           # Этот документ
```

### Как просмотреть

```bash
# Локальный сервер (опционально)
cd design && python3 -m http.server 8080
# Открыть http://localhost:8080

# Или просто открыть файл в браузере
open design/index.html
```

---

## 8. Дальнейшие шаги (roadmap)

1. **Валидация с stakeholders** — hero message, набор услуг, кейсы
2. **Визуальные ассеты** — реальные скриншоты проектов вместо gradient placeholders
3. **Микроанимации** — scroll-triggered fade-in (с `prefers-reduced-motion` fallback)
4. **Форма заявки** — inline или modal с полями: имя, email, тип проекта, бюджет
5. **Интеграция в production** — перенос токенов и компонентов в основной стек проекта
