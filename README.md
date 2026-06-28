# Mars Agency

Лендинг маркетингового агентства MARS для HoReCa. Визуальный прототип вынесен в отдельную папку `design/`, чтобы не затрагивать основной код проекта.

## Как проверить макет

### Быстрый просмотр

Откройте файл `design/index.html` в браузере (двойной клик или drag-and-drop).

### Локальный сервер (рекомендуется)

Сервер нужен для корректной работы относительных путей и проверки интерактива (меню, FAQ, форма):

```bash
cd design && python3 -m http.server 8080
```

Откройте [http://localhost:8080](http://localhost:8080).

Альтернатива с Node.js:

```bash
npx --yes serve design -p 8080
```

### Что проверить

| Область | Как проверить |
|---------|---------------|
| **Mobile-first** | DevTools → режим устройства, ширина 375px → 768px → 1024px+ |
| **Навигация** | Burger-меню на mobile, sticky header при скролле |
| **FAQ** | Аккордеон: один открытый пункт, клавиша Escape |
| **Форма** | Отправка без заполнения → ошибки; с заполнением → статус |
| **Доступность** | Tab по странице, skip-link, видимый focus ring |
| **Контраст** | Палитра и пары цветов — в `docs/design.md` |

### Документация

- **Wireframe и UX:** [`docs/design.md`](docs/design.md)
- **Design tokens:** [`design/css/variables.css`](design/css/variables.css)

## Структура

```
design/           # HTML/CSS/JS прототип (изолирован от основного кода)
docs/design.md    # Wireframe, палитра, UX-заметки, WCAG 2.1 AA
```
