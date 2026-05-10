'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { slideFromBottom, slideFromRight, stagger } from '@/lib/motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'Сколько стоит разработка бота?',
    a: 'Зависит от сложности: простой Telegram-бот — от 8 000 ₽, бот с AI и интеграцией с CRM — от 25 000 ₽. Парсер маркетплейса с дашбордом — от 20 000 ₽. Называю точную сумму после краткого брифа — без "от и до" с вилкой в 10x.',
  },
  {
    q: 'Как быстро вы делаете проект?',
    a: 'Простой бот — 3-7 дней. Парсер или кросс-постинг — 1-2 недели. Комплексный AI-ассистент с интеграциями — 2-4 недели. Сроки называю реалистично и держу их.',
  },
  {
    q: 'Что если бот сломается после сдачи?',
    a: 'Первые 2 недели после деплоя — бесплатная поддержка. Если баг по моей вине — фиксирую вне зависимости от срока. Дальше — доступна техподдержка по договорённости.',
  },
  {
    q: 'Где будет жить бот? Нужен ли мне сервер?',
    a: 'Деплою на любую VPS — Timeweb, Selectel, DigitalOcean. Если своего сервера нет, помогу выбрать и настрою всё сам. Для простых ботов достаточно тарифа за 200-300 ₽/мес.',
  },
  {
    q: 'Можно ли передать готовый бот мне?',
    a: 'Да. Исходный код — ваш. По желанию провожу онбординг: объясняю структуру, как запускать и вносить правки. Документация внутри кода — в обязательном порядке.',
  },
  {
    q: 'Работаете ли вы с не-российскими сервисами?',
    a: 'Да. Работаю с Instagram, WhatsApp Business API, YouTube API, TikTok API, OpenAI, Anthropic. Если сервис доступен через API — подключу. VPN и зарубежные хостинги — без проблем.',
  },
]

function FaqItem({ item, index }: { item: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={slideFromRight}
      className="relative rounded-xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${open ? 'rgba(94,231,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'border-color 0.3s ease',
        willChange: 'transform, opacity',
      }}
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl"
        animate={{
          background: open ? '#5EE7FF' : 'transparent',
          boxShadow: open ? '0 0 12px #5EE7FF80' : 'none',
        }}
        transition={{ duration: 0.3 }}
      />

      <button
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-display font-semibold text-sm lg:text-base text-text-primary group-hover:text-accent-cyan transition-colors duration-200">
          {item.q}
        </span>

        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: open ? 'rgba(94,231,255,0.15)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${open ? '#5EE7FF40' : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          <Plus size={14} style={{ color: open ? '#5EE7FF' : '#9A9AB0' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-5 text-text-muted text-sm leading-relaxed">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FaqAccordion() {
  return (
    <section
      id="faq"
      className="relative py-16 lg:py-20 overflow-hidden"
      aria-label="Часто задаваемые вопросы"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <motion.div
          className="text-center mb-10"
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px', amount: 0.2 }}
        >
          <motion.p
            variants={slideFromBottom}
            className="text-xs font-display tracking-[0.25em] text-text-muted uppercase mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            variants={slideFromBottom}
            className="font-display font-black leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            <span className="gradient-text">Часто</span> спрашивают
          </motion.h2>
        </motion.div>

        <motion.div
          className="space-y-3"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px', amount: 0.2 }}
        >
          {FAQS.map((item, i) => (
            <FaqItem key={i} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
