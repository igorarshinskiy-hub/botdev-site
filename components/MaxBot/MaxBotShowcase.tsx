'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Gift, Camera, Languages, Zap, ExternalLink } from 'lucide-react'
import { stagger, slideFromBottom } from '@/lib/motion'

// ─── Constants ────────────────────────────────────────────────────────────

const MAX_BOT_URL = 'https://max.ru/id270390707748_1_bot'

const CHAT_MESSAGES = [
  { from: 'user', text: 'Объясни как работает Reflex API в трёх предложениях' },
  {
    from: 'bot',
    text: 'Reflex API — паттерн для реактивных Python-приложений. При изменении state UI обновляется автоматически. Как React, но без JSX и frontend-кода.',
  },
  { from: 'user', text: 'Переведи: «Готов сегодня в 17:00»' },
  { from: 'bot', text: 'Available today at 5 PM 👌' },
]

const FEATURES = [
  {
    icon: Gift,
    title: 'Реферальная система',
    text: 'Бесплатные запросы за приглашение друзей.',
    color: '#5EE7FF',
  },
  {
    icon: Camera,
    title: 'Распознавание фото',
    text: 'Пришли скрин — бот опишет и вытащит текст.',
    color: '#8B5CF6',
  },
  {
    icon: Languages,
    title: 'RU + EN',
    text: 'Оба языка и смешанные запросы.',
    color: '#FF4FD8',
  },
  {
    icon: Zap,
    title: 'Всегда под рукой',
    text: 'В мессенджере, без отдельных сайтов.',
    color: '#C6FF4F',
  },
]

const MARQUEE_ITEMS = [
  'переведи весь этот документ на английский',
  'что лучше — учить React или Vue в 2026?',
  'опиши что на этом скриншоте 📸',
  'придумай тему поста про путешествия',
  'почему мой Python-код падает с этой ошибкой?',
  'перескажи эту статью в 5 пунктах',
  'напиши вежливый ответ клиенту по-английски',
  'найди ошибки в этом тексте',
]

// ─── Mock Phone ───────────────────────────────────────────────────────────

function MockPhone() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-10%' })
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!inView) {
      setVisibleCount(0)
      setShowTyping(false)
      return
    }

    const schedule = (index: number) => {
      if (index >= CHAT_MESSAGES.length) return
      const msg = CHAT_MESSAGES[index]

      if (msg.from === 'bot') {
        setShowTyping(true)
        timerRef.current = setTimeout(() => {
          setShowTyping(false)
          setVisibleCount(index + 1)
          timerRef.current = setTimeout(() => schedule(index + 1), 900)
        }, 1400)
      } else {
        setVisibleCount(index + 1)
        timerRef.current = setTimeout(() => schedule(index + 1), 700)
      }
    }

    timerRef.current = setTimeout(() => schedule(0), 600)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [inView])

  const FLOATERS: { emoji: string; style: React.CSSProperties }[] = [
    { emoji: '💬', style: { top: '8%',  left: '0' } },
    { emoji: '✨', style: { top: '22%', right: '0' } },
    { emoji: '🤖', style: { bottom: '22%', left: '0' } },
    { emoji: '⚡', style: { bottom: '10%', right: '0' } },
  ]

  return (
    // padding creates room for the floating decorators so they stay within the container
    <div ref={ref} className="relative w-full flex justify-center" style={{ padding: '16px 28px' }}>
      {FLOATERS.map(({ emoji, style }, i) => (
        <motion.div
          key={i}
          className="absolute text-xl select-none pointer-events-none"
          style={style}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.55 }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Phone frame — tilted only on sm+ to prevent mobile overflow */}
      <div
        className="w-full sm:-rotate-3"
        style={{
          maxWidth: '300px',
          borderRadius: '36px',
          background: '#0A0A0F',
          border: '1.5px solid rgba(255,255,255,0.12)',
          overflow: 'hidden',
          boxShadow:
            '0 0 40px rgba(139,92,246,0.4), 0 0 80px rgba(94,231,255,0.12), 0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Notch */}
        <div className="flex justify-center pt-3 pb-1.5" style={{ background: '#0A0A0F' }}>
          <div className="w-20 h-5 rounded-full" style={{ background: '#000' }} />
        </div>

        {/* Chat header */}
        <div
          className="px-4 py-3 flex items-center gap-3"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(94,231,255,0.1))',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #8B5CF6, #5EE7FF)' }}
          >
            🤖
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold" style={{ color: '#fff' }}>Claude Bot</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#4ade80' }} />
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                online · ИИ ассистент
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          className="px-3 py-4 space-y-3"
          style={{ background: 'rgba(10,10,20,0.97)', minHeight: '230px' }}
        >
          {CHAT_MESSAGES.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[82%] px-3 py-2 rounded-2xl text-xs leading-relaxed break-words"
                style={
                  msg.from === 'user'
                    ? {
                        background: 'rgba(139,92,246,0.28)',
                        border: '1px solid rgba(139,92,246,0.4)',
                        color: '#F5F5FA',
                        borderBottomRightRadius: '4px',
                      }
                    : {
                        background: 'rgba(94,231,255,0.1)',
                        border: '1px solid rgba(94,231,255,0.22)',
                        color: '#F5F5FA',
                        borderBottomLeftRadius: '4px',
                      }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {showTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div
                className="px-3 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1"
                style={{ background: 'rgba(94,231,255,0.1)', border: '1px solid rgba(94,231,255,0.2)' }}
              >
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#5EE7FF' }}
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: dot * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Input bar */}
        <div
          className="px-3 py-2.5 flex items-center gap-2"
          style={{ background: 'rgba(10,10,20,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="flex-1 rounded-full px-4 py-2 text-xs"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}
          >
            Сообщение...
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #8B5CF6, #5EE7FF)' }}
            aria-hidden="true"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <polyline points="22,2 11,13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <polygon points="22,2 15,22 11,13 2,9" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-2.5" style={{ background: 'rgba(10,10,20,0.98)' }}>
          <div className="w-24 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
        </div>
      </div>
    </div>
  )
}

// ─── Marquee band ─────────────────────────────────────────────────────────

function MarqueeBand({ running }: { running: boolean }) {
  const [hovered, setHovered] = useState(false)
  const isPlaying = running && !hovered
  // duplicate for seamless loop: translateX(-50%) brings us back to start
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div
      className="overflow-hidden"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className="flex gap-4 w-max"
        style={{
          animation: 'marquee-scroll 32s linear infinite',
          animationPlayState: isPlaying ? 'running' : 'paused',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {items.map((text, i) => (
          <div
            key={i}
            className="flex-shrink-0 glass rounded-2xl px-5 py-3.5"
            style={{ width: '270px' }}
          >
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="font-bold mr-1.5" style={{ color: '#5EE7FF' }}>›</span>
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────

export default function MaxBotShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sectionInView = useInView(sectionRef, { once: false, margin: '-5%' })

  return (
    <section
      id="maxbot"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-x-clip"
      aria-label="Claude Bot в MAX"
      style={{
        background:
          'radial-gradient(ellipse 90% 50% at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 65%)',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px', amount: 0 }}
        >
          <motion.p
            variants={slideFromBottom}
            className="text-xs font-display tracking-[0.25em] text-text-muted uppercase mb-4"
          >
            ФЛАГМАНСКИЙ ПРОЕКТ
          </motion.p>
          <motion.h2
            variants={slideFromBottom}
            className="font-display font-black leading-tight text-balance break-words mb-5"
            style={{ fontSize: 'clamp(24px, 4vw, 56px)' }}
          >
            <span className="gradient-text">Claude Bot</span> в MAX —{' '}
            мой ИИ‑ассистент,{' '}
            которым пользуются прямо сейчас
          </motion.h2>
          <motion.p
            variants={slideFromBottom}
            className="text-text-muted leading-relaxed max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(14px, 1.4vw, 16px)' }}
          >
            Не теория и не демо — рабочий бот в живом мессенджере.
            Можешь открыть прямо сейчас и задать любой вопрос.
          </motion.p>
        </motion.div>

        {/* ── 2-col: phone + content ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-20">

          {/* Left: phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px', amount: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <MockPhone />
          </motion.div>

          {/* Right: description + features + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px', amount: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="flex flex-col gap-6"
          >
            {/* Pulsing live badge */}
            <div className="flex">
              <motion.div
                className="glass rounded-full px-4 py-2 flex items-center gap-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }}
                />
                <span className="text-xs font-display font-semibold text-text-primary">
                  🤖 Работает 24/7
                </span>
              </motion.div>
            </div>

            {/* Copy */}
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary mb-3 leading-snug">
                ИИ‑ассистент для повседневных задач
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Claude Bot — это Claude Sonnet 4.5 в обёртке MAX. Подходит для переводов,
                объяснений, помощи с кодом, генерации идей, рецептов, пересказа статей.
                Всегда под рукой в мессенджере — без отдельных приложений и подписок.
              </p>
            </div>

            {/* Features 2×2 */}
            <motion.div
              className="grid grid-cols-2 gap-3 sm:gap-4"
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-50px', amount: 0 }}
            >
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.title}
                    variants={{
                      hidden: { opacity: 0, scale: 0.92, y: 14 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className="glass rounded-xl p-3.5 sm:p-4"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5"
                      style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}
                    >
                      <Icon size={15} style={{ color: f.color }} aria-hidden="true" />
                    </div>
                    <p className="font-display font-bold text-xs text-text-primary mb-1 leading-snug break-words">
                      {f.title}
                    </p>
                    <p className="text-text-muted text-xs leading-relaxed">{f.text}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA — floats gently */}
            <div className="flex flex-col gap-2.5">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <a
                  href={MAX_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl font-display font-bold text-bg-deep overflow-hidden transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #5EE7FF 0%, #8B5CF6 50%, #FF4FD8 100%)',
                    padding: '15px 32px',
                    fontSize: '15px',
                    boxShadow: '0 0 30px rgba(139,92,246,0.45), 0 0 60px rgba(94,231,255,0.12)',
                  }}
                >
                  Открыть Claude Bot в MAX
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </motion.div>
              <p className="text-text-muted text-xs italic">
                Бесплатно. Без регистрации. Открывается в приложении MAX.
              </p>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {['Claude Sonnet 4.5', 'MAX Bot API', 'Python', 'VPS'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono"
                  style={{
                    background: 'rgba(139,92,246,0.1)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    color: '#8B5CF6',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Marquee ── */}
        <div>
          <motion.p
            className="text-xs font-display tracking-[0.2em] text-text-muted uppercase text-center mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px', amount: 0 }}
            transition={{ duration: 0.5 }}
          >
            Что у бота спрашивают
          </motion.p>
          <MarqueeBand running={sectionInView} />
        </div>

      </div>
    </section>
  )
}
