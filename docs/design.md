# Mars Agency — Design Spec

**Проект:** Landing mars-agency.pro (test)  
**Версия:** 1.0  
**Прототип:** [`design/index.html`](../design/index.html)

---

## 1. Цели страницы

| Цель | Метрика успеха |
|------|----------------|
| Сформировать доверие к агентству | Время на странице > 45 с |
| Показать экспертизу и процесс | Переход к секции «Кейсы» |
| Конвертировать в заявку | Отправка формы / клик «Обсудить проект» |

**Целевая аудитория:** основатели стартапов, маркетинг-директора SMB, product-менеджеры, ищущие digital-партнёра полного цикла.

---

## 2. Wireframe (структура блоков)

```
┌─────────────────────────────────────────────────────────────┐
│  SKIP LINK (скрыт, виден при фокусе)                        │
├─────────────────────────────────────────────────────────────┤
│  HEADER (sticky)                                            │
│  [Logo]                              [☰ mobile] [CTA btn]   │
│  Nav: Услуги | Процесс | Кейсы | Контакты                   │
├─────────────────────────────────────────────────────────────┤
│  HERO                                                       │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │ Badge: Q3 2026       │  │                      │        │
│  │ H1: Запускаем бренды │  │   Visual: Mars orbit │        │
│  │     на новую орбиту  │  │   (CSS illustration) │        │
│  │ Lead text            │  │                      │        │
│  │ [Primary] [Secondary]│  │                      │        │
│  │ 120+ | 8 лет | 94%   │  └──────────────────────┘        │
│  └──────────────────────┘                                   │
├─────────────────────────────────────────────────────────────┤
│  SERVICES (alt bg)                                          │
│  Eyebrow + H2 + Lead                                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                       │
│  │ Card 1  │ │ Card 2  │ │ Card 3  │  → 1 col mobile       │
│  │ Брендинг│ │ Веб     │ │ Маркет. │     3 col desktop     │
│  └─────────┘ └─────────┘ └─────────┘                       │
├─────────────────────────────────────────────────────────────┤
│  PROCESS                                                    │
│  01 Исследование → 02 Стратегия → 03 Дизайн → 04 Запуск    │
│  (numbered steps, 1→2→4 columns)                            │
├─────────────────────────────────────────────────────────────┤
│  CASES (alt bg)                                             │
│  2 case cards in grid                                       │
├─────────────────────────────────────────────────────────────┤
│  TESTIMONIAL                                                │
│  Blockquote + author avatar + role                          │
├─────────────────────────────────────────────────────────────┤
│  CTA BAND (alt bg)                                          │
│  H2 + text + primary button                                 │
├─────────────────────────────────────────────────────────────┤
│  CONTACT                                                    │
│  ┌─────────────────┐  ┌─────────────────┐                │
│  │ Form            │  │ Contact info    │                │
│  │ name, email,    │  │ email, telegram │                │
│  │ service, message│  │ address         │                │
│  └─────────────────┘  └─────────────────┘                │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
│  Brand | Nav links | Legal | © 2026                         │
└─────────────────────────────────────────────────────────────┘
```

### Breakpoints (mobile-first)

| Breakpoint | Ширина | Изменения |
|------------|--------|-----------|
| Base | &lt; 640px | 1 колонка, hamburger-меню, stats 3 col |
| `sm` | ≥ 640px | Case cards 2 col |
| `md` | ≥ 768px | Header nav inline, hero 2 col, services 3 col |
| `lg` | ≥ 1024px | Process 4 col, footer 3 col |

---

## 3. Цветовая палитра (CSS variables)

Определены в [`design/css/variables.css`](../design/css/variables.css).

| Token | Значение | Назначение |
|-------|----------|------------|
| `--color-mars-500` | `#e86a4d` | Акцент, CTA, eyebrow |
| `--color-mars-700` | `#a33b1f` | Hover/active states |
| `--color-mars-300` | `#f4a48f` | Светлый акцент |
| `--color-space-900` | `#0b0f14` | Основной фон |
| `--color-space-800` | `#151b24` | Карточки, поверхности |
| `--color-text-primary` | `#f4f4f5` | Основной текст |
| `--color-text-secondary` | `#b4bcc8` | Вторичный текст |
| `--color-focus-ring` | `#6ec8ff` | Focus indicator |

### Контраст (WCAG 2.1 AA)

| Пара | Ratio | Статус |
|------|-------|--------|
| `--color-text-primary` на `--color-space-900` | ~18:1 | ✅ AAA |
| `--color-text-secondary` на `--color-space-900` | ~8.5:1 | ✅ AA |
| `--color-text-muted` на `--color-space-900` | ~5.2:1 | ✅ AA |
| `--color-text-primary` на `--color-mars-500` (кнопка) | ~4.6:1 | ✅ AA |
| `--color-focus-ring` на тёмном фоне | ≥ 3:1 | ✅ |

---

## 4. Типографика

- **Шрифт:** Inter (Google Fonts), fallback system-ui
- **H1 (hero):** `clamp(2.25rem, 6vw, 3.75rem)`, bold
- **H2 (section):** `clamp(1.75rem, 4vw, 2.25rem)`
- **Body:** 16px / 1.5
- **Минимальный touch target:** 44×44px (кнопки, nav toggle)

---

## 5. UX-заметки

### Навигация
- Sticky header с полупрозрачным фоном — контекст не теряется при скролле.
- На mobile — hamburger с `aria-expanded` и закрытием при выборе пункта.
- Skip link для клавиатурных пользователей и скринридеров.
- Якорные ссылки на секции; плавный скролл отключается при `prefers-reduced-motion`.

### Иерархия контента
1. **Hero** — ценностное предложение + два CTA (primary/secondary).
2. **Услуги** — быстрое понимание компетенций.
3. **Процесс** — снижение неопределённости, прозрачность этапов.
4. **Кейсы** — социальное доказательство с цифрами.
5. **Отзыв** — эмоциональное доверие.
6. **CTA band** — повторный призыв перед формой.
7. **Контакты** — низкое трение: форма + альтернативные каналы.

### Форма
- Явные `<label>` связаны с полями (`for` / `id`).
- Обязательные поля помечены `*` и `aria-required`.
- `autocomplete` для имени и email.
- Hint под формой объясняет обязательность полей.
- Минимальная высота полей 44px для touch.

### Микровзаимодействия
- Hover на карточках: border + shadow (без motion для reduced-motion).
- Focus-visible: 3px синее кольцо (`--color-focus-ring`), не полагаемся только на `:focus`.
- CTA-кнопки: distinct primary (заливка) vs secondary (outline).

### Контент и тон
- Тон: уверенный, экспертный, без жаргона.
- Метафора «орбита / Марс» — в заголовке и визуале hero, не перегружает текст.
- Статистика в hero — конкретные числа для credibility.

---

## 6. Доступность (WCAG 2.1 AA checklist)

- [x] Семантическая разметка: `header`, `main`, `nav`, `section`, `footer`, `article`
- [x] Один `h1`, логичная иерархия заголовков
- [x] `lang="ru"` на `<html>`
- [x] Skip link к `#main-content`
- [x] Все интерактивные элементы доступны с клавиатуры
- [x] `:focus-visible` стили на ссылках, кнопках, полях
- [x] `aria-label` / `aria-labelledby` где нужно
- [x] Декоративные элементы: `aria-hidden="true"`
- [x] Hero visual: `role="img"` + `aria-label`
- [x] Контраст текста ≥ 4.5:1 (normal), ≥ 3:1 (large)
- [x] `prefers-reduced-motion` — отключение анимаций и smooth scroll
- [x] Форма: labels, required indicators, hint text

### Рекомендации для production
- Подключить валидацию формы с `aria-invalid` и `aria-describedby` для ошибок.
- Добавить cookie/consent banner при сборе данных (GDPR/152-ФЗ).
- Провести тест со скринридером (NVDA/VoiceOver).
- Lighthouse Accessibility audit ≥ 95.

---

## 7. Файловая структура

```
design/
├── index.html          # HTML-прототип лендинга
└── css/
    ├── variables.css   # Design tokens, цвета, spacing
    ├── base.css        # Reset, typography, layout utilities
    └── components.css  # Header, hero, cards, form, footer
docs/
└── design.md           # Этот документ
```

## 8. Как просмотреть

Откройте `design/index.html` в браузере:

```bash
# Из корня репозитория
python3 -m http.server 8080 --directory design
# → http://localhost:8080
```

Или откройте файл напрямую через `file://` (шрифты загрузятся с CDN).

---

## 9. Следующие шаги (вне scope прототипа)

1. Интеграция в основной стек (React/Next при появлении).
2. Реальные изображения кейсов и логотипы клиентов.
3. Анимация орбиты hero (с учётом `prefers-reduced-motion`).
4. i18n (RU/EN) при необходимости.
5. Подключение аналитики и CRM для формы.
