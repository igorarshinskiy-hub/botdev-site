'use client'

import { motion, type Variants } from 'framer-motion'
import { Send, BarChart3, Bot, Share2, Workflow, Plug } from 'lucide-react'
import { slideFromBottom, stagger } from '@/lib/motion'

const EASE = [0.22, 1, 0.36, 1] as const

const cardVariant = (x: number, y: number, rotate: number): Variants => ({
  hidden: { opacity: 0, x, y, scale: 0.9, rotate },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: EASE },
  },
})

const CARD_VARIANTS: Variants[] = [
  cardVariant(-60, 0, -3),
  cardVariant(0, 60, 0),
  cardVariant(60, 0, 3),
  cardVariant(-60, 0, -3),
  cardVariant(0, 60, 0),
  cardVariant(60, 0, 3),
]

const SERVICES = [
  {
    icon: Send,
    title: 'Telegram-боты',
    desc: 'Продажи, рассылки, FAQ, CRM-интеграции. Любая логика — от простых команд до полноценных воронок.',
    color: '#5EE7FF',
    accent: 'rgba(94,231,255,0.08)',
    tag: '→ aiogram, python-telegram-bot',
  },
  {
    icon: BarChart3,
    title: 'Парсеры маркетплейсов',
    desc: 'Wildberries, Ozon, Яндекс.Маркет: цены, остатки, аналитика конкурентов в реальном времени.',
    color: '#FF4FD8',
    accent: 'rgba(255,79,216,0.08)',
    tag: '→ aiohttp, BeautifulSoup, SQLite',
  },
  {
    icon: Bot,
    title: 'AI-ассистенты',
    desc: 'Claude и GPT под конкретную задачу: поддержка пользователей, генерация контента, анализ данных.',
    color: '#C6FF4F',
    accent: 'rgba(198,255,79,0.08)',
    tag: '→ Claude API, OpenAI, RAG',
  },
  {
    icon: Share2,
    title: 'Кросс-постинг',
    desc: 'Публикация из одной точки в VK, MAX, Telegram, Instagram. Авто-генерация подписей и обложек.',
    color: '#8B5CF6',
    accent: 'rgba(139,92,246,0.08)',
    tag: '→ VK API, MAX Bot API, Pillow',
  },
  {
    icon: Workflow,
    title: 'Автоматизация процессов',
    desc: 'n8n, Make, кастомные пайплайны. Связываем любые процессы без рутины и человеческого фактора.',
    color: '#5EE7FF',
    accent: 'rgba(94,231,255,0.08)',
    tag: '→ n8n, Make, Zapier',
  },
  {
    icon: Plug,
    title: 'Интеграции и API',
    desc: 'Связка любых сервисов через webhook\'и и REST API. CRM, платёжки, склад, аналитика — всё в одном.',
    color: '#FF4FD8',
    accent: 'rgba(255,79,216,0.08)',
    tag: '→ FastAPI, webhooks, REST',
  },
]

function ServiceCard({
  service,
  index,
  entryVariant,
}: {
  service: (typeof SERVICES)[0]
  index: number
  entryVariant: Variants
}) {
  const Icon = service.icon

  return (
    <motion.div
      variants={entryVariant}
      custom={index}
      className="group relative rounded-2xl p-6 lg:p-7 cursor-default overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        willChange: 'transform, opacity',
      }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      {/* Hover background glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${service.color}15, transparent 60%)`,
        }}
      />

      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${service.color}40, 0 0 40px ${service.color}15`,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Corner status dots — статичные */}
      <div className="absolute top-4 right-4 flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: service.color, opacity: 0.5 + i * 0.2 }}
          />
        ))}
      </div>

      {/* Icon */}
      <motion.div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
        style={{ background: service.accent, border: `1px solid ${service.color}30` }}
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <Icon size={22} style={{ color: service.color }} />
      </motion.div>

      <h3 className="font-display font-bold text-lg text-text-primary mb-3">
        {service.title}
      </h3>
      <p className="text-text-muted text-sm leading-relaxed mb-4">{service.desc}</p>

      {/* Stack tag */}
      <p
        className="text-xs font-mono opacity-50 group-hover:opacity-80 transition-opacity"
        style={{ color: service.color }}
      >
        {service.tag}
      </p>

      {/* Bottom accent line — статичная */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="relative py-16 lg:py-20 overflow-x-clip"
      aria-label="Услуги"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-10 lg:mb-12"
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px', amount: 0.2 }}
        >
          <motion.p
            variants={slideFromBottom}
            className="text-xs font-display tracking-[0.25em] text-text-muted uppercase mb-4"
          >
            НАПРАВЛЕНИЯ
          </motion.p>
          <motion.h2
            variants={slideFromBottom}
            className="font-display font-black leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            Что <span className="gradient-text">автоматизирую</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px', amount: 0.2 }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} entryVariant={CARD_VARIANTS[i]} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
