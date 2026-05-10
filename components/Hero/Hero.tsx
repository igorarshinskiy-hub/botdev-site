'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import GradientButton from '@/components/ui/GradientButton'
import ChatCarousel from '@/components/Hero/ChatCarousel'

const METRICS = [
  { value: '40+', label: 'ботов' },
  { value: '6', label: 'платформ' },
  { value: '24/7', label: 'uptime' },
  { value: '3 года', label: 'опыта' },
]

const PLATFORMS = ['Telegram', 'VK', 'MAX', 'WhatsApp', 'Wildberries', 'Ozon', 'n8n', 'Claude AI']

export default function Hero() {
  const { scrollY } = useScroll()
  const textY = useTransform(scrollY, [0, 400], [0, -60])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-grid"
      aria-label="Главный экран"
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:py-24 lg:min-h-screen">

          {/* Left: text */}
          <motion.div
            style={{ y: textY }}
            variants={stagger(0.12)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:gap-8"
          >
            <motion.div variants={fadeUp}>
              <span className="text-xs font-display tracking-[0.25em] text-text-muted uppercase">
                АВТОМАТИЗАЦИЯ · БОТЫ · ПАРСЕРЫ · AI
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display font-black leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(44px, 6vw, 88px)' }}
            >
              Боты, которые{' '}
              <span className="gradient-text">работают за тебя</span>{' '}
              24/7
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-text-muted leading-relaxed"
              style={{ fontSize: 'clamp(15px, 1.6vw, 18px)' }}
            >
              Создаю системы автоматизации любой сложности — от простых Telegram-ботов
              до парсеров маркетплейсов с AI-аналитикой. Работаю удалённо, говорю на языке
              кода и бизнеса.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1 rounded-full text-xs font-mono text-text-muted"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {p}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <GradientButton href="#contact" variant="filled">
                Обсудить проект
              </GradientButton>
              <GradientButton href="#cases" variant="ghost">
                Смотреть кейсы
              </GradientButton>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-2">
              {METRICS.map((m) => (
                <div key={m.label} className="glass px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="font-display font-bold text-accent-cyan text-sm">{m.value}</span>
                  <span className="text-text-muted text-xs">{m.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: chat carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full"
          >
            <ChatCarousel />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
