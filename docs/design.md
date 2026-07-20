# ОПОРА — Design Documentation

Визуальный макет лендинга локальной строительной бригады (заборы, бани, мелкий строй).

**Прототип:** [`design/index.html`](../design/index.html) — откройте в браузере или через локальный сервер.

---

## 1. Цели дизайна

| Цель | Решение |
|------|---------|
| Доверие к локальной бригаде | Крупный бренд в hero, честный тон, фиксированная смета в copy |
| Быстрая заявка | CTA «Рассчитать смету» в header, hero, mid-page band и форме |
| Понятность услуг | Три вертикали: заборы / бани / мелкий строй — без карточного шума |
| Современный industrial look | Video-first hero, industrial grey, safety orange, Space Grotesk, exaggerated minimalism |

---

## 2. Wireframe (структура страницы)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (sticky, светлый steel)                             │
│  [■ ОПОРА]     Услуги · Как работаем · Вопросы · Контакты  │
│                                    [Рассчитать смету]       │
│  Mobile: [■ ОПОРА]                          [☰ меню]      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  HERO (full-bleed video + industrial scrim)                 │
│  — один viewport = одна композиция —                        │
│                                                             │
│  ОПОРА                          ← brand (hero-level)        │
│  Заборы, бани и мелкий строй…   ← один H1                   │
│  Локальная бригада: …           ← один lead                 │
│  [Рассчитать смету] [Услуги]    ← одна CTA-группа           │
│                                              [scroll cue]   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  УСЛУГИ                                                     │
│  Eyebrow + H2 + lead                                        │
│  01  Сборка заборов     | описание + meta                   │
│  02  Бани               | описание + meta   ← list rows     │
│  03  Мелкий строй       | описание + meta   (не cards)      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ATMOSPHERE (full-bleed photo)                              │
│  Фото площадки + короткая caption с orange accent bar       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  КАК РАБОТАЕМ (muted steel bg)                              │
│  [01 Замер]  [02 Монтаж]  [03 Сдача]                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  CTA BAND (inverse + orange edge of palette)                │
│  «Нужен забор или баня…»              [Оставить заявку]    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  FAQ (аккордеон, один открытый)                             │
│  ▶ Работаете только в районе?                               │
│  ▶ Материалы ваши или наши?                                 │
│  ▶ Как фиксируется цена?                                    │
│  ▶ Есть гарантия?                                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  КОНТАКТЫ                                                   │
│  ┌──────────────────┐  ┌──────────────────────────────┐    │
│  │ Тел / мессенджер │  │ Форма: имя, телефон, задача, │    │
│  │ зона работ       │  │ согласие, [Отправить]        │    │
│  └──────────────────┘  └──────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  FOOTER (steel-900, orange top border)                      │
│  ОПОРА | ссылки | © 2026                                    │
└─────────────────────────────────────────────────────────────┘
```

### Breakpoints (mobile-first)

| Breakpoint | Ширина | Изменения |
|------------|--------|-----------|
| Base | &lt; 768px | 1 колонка, burger-меню, hero без scroll-cue |
| Tablet | ≥ 768px | Nav в header, услуги 2 колонки в ряду, process 3 кол., contact 2 кол. |
| Desktop | ≥ 1024px | Шире ритм услуг, центрированная nav |

---

## 3. Цветовая палитра (CSS variables)

Файл: [`design/css/variables.css`](../design/css/variables.css)

| Token | HEX | Использование |
|-------|-----|---------------|
| `--color-safety` | `#C2410C` | CTA, акценты, индексы услуг |
| `--color-safety-hover` | `#9A3412` | Hover primary buttons |
| `--color-steel-50` | `#F5F6F7` | Фон страницы |
| `--color-steel-100` | `#E8EAED` | Muted-секции |
| `--color-steel-600` | `#454E59` | Вторичный текст |
| `--color-steel-900` | `#14171A` | Основной текст, inverse surfaces |
| `--color-focus` | `#005FCC` | Focus-visible (не бренд-оранжевый) |

### Контраст (WCAG 2.1 AA)

| Пара | Ratio | Статус |
|------|-------|--------|
| Steel-900 на steel-50 | ~16:1 | ✅ AAA |
| Белый на safety `#C2410C` | ~5.1:1 | ✅ AA |
| Safety на белом | ~5.1:1 | ✅ AA |
| Steel-600 на белом | ~7.8:1 | ✅ AAA |
| Steel-500 на белом | ~5.4:1 | ✅ AA (secondary) |

---

## 4. Типографика

- **Шрифт:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — headings и body
- **Brand в hero:** `clamp(3rem, 12vw, 7rem)`, weight 700 — сильнее H1
- **Hero H1:** `clamp(1.35rem, 3.5vw + 0.5rem, 2.25rem)`, weight 500
- **Section H2:** `--text-display` ≈ 1.75–3rem
- **Body:** 1rem / line-height 1.55
- **Eyebrow:** uppercase, wide tracking, safety orange + hairline

---

## 5. UX-заметки

### Hero (video-first, exaggerated minimalism)

- Первый viewport — одна композиция: бренд → заголовок → lead → CTA → video plane.
- Нет stats, карточек, бейджей и overlays поверх видео (кроме scrim для читаемости).
- Бренд «ОПОРА» крупнее headline — проходит brand test без nav.
- Video `muted autoplay loop playsinline` + poster; при `prefers-reduced-motion` видео ставится на паузу.

### Навигация

- Sticky header на светлом steel с blur — не «тёмный dashboard».
- Mobile drawer справа: Escape, backdrop, focus return на toggle.
- Skip-link «Перейти к содержимому».

### Услуги без card-chrome

- Ряды с hairline-разделителями вместо карточек с тенью/радиусом.
- Meta-строки (срок / гарантия) как secondary signals, не pill-кластеры.

### Конверсионные точки

1. Header CTA  
2. Hero primary  
3. Mid-page CTA band  
4. Contact form  

### Форма

- Минимум: имя + телефон + опциональное описание задачи + согласие.
- `aria-invalid` + видимые ошибки; успех через `role="status"`.

### FAQ

- Один открытый пункт; `aria-expanded` / `aria-controls` / `role="region"`.

### Motion (3 намеренных)

1. Медленный Ken Burns на hero video (`hero-drift`)
2. Staggered entrance бренда / текста / CTA (`brand-in`)
3. Scroll-cue pulse + scroll-reveal секций (`IntersectionObserver`)

Все отключаются при `prefers-reduced-motion: reduce`.

---

## 6. Доступность (WCAG 2.1 AA)

| Критерий | Реализация |
|----------|------------|
| 1.3.1 Info and Relationships | `header`, `nav`, `main`, `section`, `article`, `footer`, `aside` |
| 1.4.3 Contrast | Палитра проверена (таблица выше) |
| 1.4.11 Non-text Contrast | Кнопки и границы полей ≥ 3:1 |
| 2.1.1 Keyboard | Меню, FAQ, форма, ссылки |
| 2.2.2 Pause/Stop/Hide | Video pause при reduced motion |
| 2.4.1 Bypass Blocks | Skip-link |
| 2.4.7 Focus Visible | Синий outline 3px (`--color-focus`) |
| 3.3.1 / 3.3.3 Errors | `aria-invalid` + текст ошибки |
| 4.1.2 Name, Role, Value | ARIA на меню, FAQ, форме |

`lang="ru"` на `<html>`. Alt на atmosphere-фото описывает сцену.

---

## 7. Файловая структура

```
design/
├── index.html          # HTML-прототип лендинга
├── css/
│   ├── variables.css   # Design tokens / палитра
│   └── styles.css      # Компоненты и layout (mobile-first)
└── js/
    └── main.js         # Меню, FAQ, форма, reveal, video motion

docs/
└── design.md           # Этот документ
```

---

## 8. Как просмотреть

```bash
cd design && python3 -m http.server 8080
# Открыть http://localhost:8080
```

Или открыть `design/index.html` напрямую в браузере.

---

## 9. Следующие шаги (интеграция)

1. Заменить CDN-видео/фото на собственные материалы бригады.
2. Подставить реальный телефон, зону выезда и мессенджеры.
3. Подключить форму к CRM / Telegram-боту.
4. Перенести токены из `variables.css` в прод-стек.
5. Добавить страницу политики конфиденциальности и focus trap в модалке.
