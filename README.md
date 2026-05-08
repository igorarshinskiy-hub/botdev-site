# BotDev — Portfolio Site

Современный одностраничный сайт-портфолио специалиста по автоматизации процессов и разработке ботов.

## Стек

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + CSS-переменные
- **Framer Motion** — анимации и scroll-effects
- **Lenis** — плавный инерционный скролл
- **GSAP** — сложные scroll-сценарии
- **React Three Fiber + drei + three** — 3D-сцена в Hero
- **Lucide React** — иконки
- Шрифты: **Unbounded** (дисплейный) + **Manrope** (основной)

## Установка и запуск

```bash
# Клонировать репозиторий
git clone <repo-url>
cd bots-site

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
```

Сайт откроется по адресу [http://localhost:3000](http://localhost:3000).

## Продакшн-сборка

```bash
npm run build
npm run start
```

## Настройка контактов

В файлах замени плейсхолдеры:
- `@your_handle` → твой Telegram-никнейм
- `you@mail.com` → твой email

Места замены:
- `components/Contact/ContactSection.tsx`
- `components/Footer.tsx`

## Структура проекта

```
app/
  layout.tsx          # Корневой layout с метаданными и провайдерами
  page.tsx            # Главная страница
  globals.css         # Глобальные стили и CSS-переменные

components/
  Hero/
    Hero.tsx           # Hero-секция с текстом и 3D-сценой
    BotEcosystem3D.tsx # React Three Fiber 3D-экосистема ботов
  Process/
    ProcessTimeline.tsx # Таймлайн рабочего процесса с GSAP
  Services/
    ServicesGrid.tsx    # Сетка услуг с hover-эффектами
  Cases/
    CasesSection.tsx    # Кейсы с анимированными превью
  Faq/
    FaqAccordion.tsx    # Аккордеон FAQ
  Contact/
    ContactSection.tsx  # Форма обратной связи + тайпинг-бот
  Footer.tsx            # Футер с водяным знаком

  ui/
    SmoothScroll.tsx    # Lenis-провайдер
    CustomCursor.tsx    # Кастомный курсор (десктоп)
    NoiseOverlay.tsx    # Шумовая текстура поверх сайта
    BackgroundGlow.tsx  # Анимированные цветные пятна фона
    ParticleField.tsx   # Canvas-частицы
    GlassCard.tsx       # Glassmorphism-карточка
    GradientButton.tsx  # Кнопка с градиентом
    AnimatedNumber.tsx  # Счётчик с анимацией

lib/
  fonts.ts             # Конфигурация Google Fonts
  motion.ts            # Общие Framer Motion variants
```

## Доступность

- Семантическая HTML-разметка (`header`, `main`, `section`, `footer`, `nav`)
- `aria-label` на всех интерактивных секциях
- Поддержка `prefers-reduced-motion` — отключает тяжёлые анимации
- Кастомный курсор и частицы скрыты на touch-устройствах
