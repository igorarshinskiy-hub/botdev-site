'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import { Terminal, MessageSquare, TrendingUp, Package } from 'lucide-react'

const CASES = [
  {
    title: 'WB-парсер с авто-публикацией',
    desc: 'Бот фетчит скидочные товары с Wildberries и публикует одновременно в VK-группу и MAX-канал. Полностью автономен — от сбора до форматирования поста.',
    stack: ['Python', 'VK API', 'MAX Bot API', 'Timeweb VPS', 'systemd'],
    metrics: [
      { value: '500+', label: 'постов/мес' },
      { value: '24/7', label: 'uptime' },
      { value: '< 3 мин', label: 'задержка' },
    ],
    icon: Package,
    color: '#5EE7FF',
    previewType: 'terminal' as const,
    terminalLines: [
      '$ python wb_parser.py --start',
      '[INFO] Connecting to WB API...',
      '[INFO] Found 47 items with discount >30%',
      '[INFO] Filtering by rating >= 4.5...',
      '[OK]   Publishing to VK group...',
      '[OK]   Publishing to MAX channel...',
      '[INFO] Sleeping 180s until next run',
    ],
  },
  {
    title: 'Кросс-платформенный издатель',
    desc: 'Публикует видео сразу в 6 площадок с AI-генерируемыми подписями под каждую аудиторию и динамическими обложками с лого и текстом поверх превью.',
    stack: ['Python', 'Pillow', 'Claude API', 'FFmpeg', 'asyncio'],
    metrics: [
      { value: '6', label: 'платформ' },
      { value: '~40 сек', label: 'на пост' },
      { value: '200+', label: 'публикаций' },
    ],
    icon: TrendingUp,
    color: '#8B5CF6',
    previewType: 'chat' as const,
    chatMessages: [
      { from: 'user', text: 'Добавь видео: tutorial_react.mp4' },
      { from: 'bot', text: 'Анализирую... Claude генерирует подписи для каждой площадки 🎯' },
      { from: 'bot', text: '✅ Instagram: @dev.notes — 280 символов' },
      { from: 'bot', text: '✅ Telegram: краткий + хэштеги' },
      { from: 'bot', text: '✅ VK: с призывом к действию' },
      { from: 'bot', text: 'Публикую в 6 площадок...' },
      { from: 'bot', text: '🚀 Готово! Охват запущен.' },
    ],
  },
  {
    title: 'MAX AI-ассистент с 8 персонами',
    desc: 'Мульти-ролевой чат-бот для MAX с Claude Vision для фото-анализа, SQLite-персистентностью контекста и системой автоматических рассылок по сегментам.',
    stack: ['Python', 'MAX Bot API', 'Claude Vision', 'SQLite', 'APScheduler'],
    metrics: [
      { value: '8', label: 'персон' },
      { value: '∞', label: 'контекст' },
      { value: 'Vision', label: 'фото-анализ' },
    ],
    icon: MessageSquare,
    color: '#FF4FD8',
    previewType: 'chat' as const,
    chatMessages: [
      { from: 'user', text: '[Фото товара]' },
      { from: 'bot', text: 'Вижу: кроссовки Nike Air Max, размер ~42. Нашла аналоги дешевле на 30%:' },
      { from: 'bot', text: '→ WB: 4 890 ₽ (рейтинг 4.8)' },
      { from: 'bot', text: '→ Ozon: 5 120 ₽ (быстрая доставка)' },
      { from: 'user', text: 'Переключи на режим "Поддержка"' },
      { from: 'bot', text: 'Переключаюсь. Чем могу помочь?' },
    ],
  },
  {
    title: 'WB-аналитика для ПВЗ',
    desc: 'Дашборд с ключевыми метриками пункта выдачи и Telegram-уведомления о событиях: новые заказы, возвраты, рейтинг, выплаты.',
    stack: ['Python', 'WB Partner API', 'Telegram Bot', 'Chart.js', 'FastAPI'],
    metrics: [
      { value: '12', label: 'метрик' },
      { value: '< 5 мин', label: 'уведомления' },
      { value: 'REST', label: 'WB API' },
    ],
    icon: TrendingUp,
    color: '#C6FF4F',
    previewType: 'terminal' as const,
    terminalLines: [
      '$ ./wb_analytics --live',
      '─── Сегодня ──────────────────────────',
      '📦 Заказов: 84   Выдано: 71   Возврат: 3',
      '⭐ Рейтинг ПВЗ: 4.93 (+0.02 за неделю)',
      '💰 К выплате: 18 420 ₽',
      '─── Уведомление ──────────────────────',
      '🔔 Новый возврат #WB-88821 → ТГ',
    ],
  },
]

function TerminalPreview({ lines, color }: { lines: string[]; color: string }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const lineIndex = useRef(0)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    lineIndex.current = 0
    setVisibleLines([])

    const interval = setInterval(() => {
      if (lineIndex.current < lines.length) {
        const idx = lineIndex.current          // capture before increment
        lineIndex.current++
        setVisibleLines((prev) => [...prev, lines[idx]])
      } else if (!resetTimer.current) {        // guard: only one pending reset
        resetTimer.current = setTimeout(() => {
          lineIndex.current = 0
          setVisibleLines([])
          resetTimer.current = null
        }, 2000)
      }
    }, 500)

    return () => {
      clearInterval(interval)
      if (resetTimer.current) clearTimeout(resetTimer.current)
    }
  }, [lines])

  return (
    <div
      className="rounded-xl overflow-hidden font-mono text-xs h-full"
      style={{ background: '#0D0D1A', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/05">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-text-muted text-xs ml-2">bash</span>
      </div>

      <div className="p-4 space-y-1.5 min-h-[200px]">
        {visibleLines.filter(Boolean).map((line, i) => (
          <motion.div
            key={`${i}-${line}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="leading-relaxed"
            style={{
              color: line?.startsWith('[OK]')
                ? '#C6FF4F'
                : line?.startsWith('[INFO]')
                ? color
                : line?.startsWith('[ERR')
                ? '#FF4FD8'
                : line?.startsWith('$')
                ? '#F5F5FA'
                : '#9A9AB0',
            }}
          >
            {line}
          </motion.div>
        ))}
        <span
          className="cursor-blink text-text-muted"
          aria-hidden="true"
        >
          ▋
        </span>
      </div>
    </div>
  )
}

function ChatPreview({
  messages,
  color,
}: {
  messages: { from: string; text: string }[]
  color: string
}) {
  const [visibleMessages, setVisibleMessages] = useState<typeof messages>([])
  const msgIndex = useRef(0)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    msgIndex.current = 0
    setVisibleMessages([])

    const interval = setInterval(() => {
      if (msgIndex.current < messages.length) {
        const idx = msgIndex.current            // capture before increment
        msgIndex.current++
        setVisibleMessages((prev) => [...prev, messages[idx]])
      } else if (!resetTimer.current) {         // guard: only one pending reset
        resetTimer.current = setTimeout(() => {
          msgIndex.current = 0
          setVisibleMessages([])
          resetTimer.current = null
        }, 2500)
      }
    }, 700)

    return () => {
      clearInterval(interval)
      if (resetTimer.current) clearTimeout(resetTimer.current)
    }
  }, [messages])

  return (
    <div
      className="rounded-xl overflow-hidden h-full"
      style={{ background: '#0D0D1A', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-white/05"
        style={{ background: `${color}10` }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: color, color: '#0A0A14' }}
        >
          AI
        </div>
        <div>
          <p className="text-xs font-semibold text-text-primary">Бот-ассистент</p>
          <div className="flex items-center gap-1">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#C6FF4F' }}
            />
            <span className="text-[10px] text-text-muted">онлайн</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 min-h-[200px] overflow-hidden">
        {visibleMessages.filter(Boolean).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed"
              style={{
                background:
                  msg.from === 'user'
                    ? `${color}25`
                    : 'rgba(255,255,255,0.06)',
                border: `1px solid ${msg.from === 'user' ? color + '40' : 'rgba(255,255,255,0.08)'}`,
                color: msg.from === 'user' ? color : '#F5F5FA',
              }}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function CasesSection() {
  return (
    <section
      id="cases"
      className="relative py-16 lg:py-20 overflow-hidden"
      aria-label="Кейсы"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-10 lg:mb-12"
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-display tracking-[0.25em] text-text-muted uppercase mb-4"
          >
            ПОРТФОЛИО
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            <span className="gradient-text">Реальные</span> проекты,{' '}
            реальные результаты
          </motion.h2>
        </motion.div>

        <div className="space-y-8">
          {CASES.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                className="group grid lg:grid-cols-2 gap-6 rounded-2xl p-6 lg:p-8 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(12px)',
                }}
                whileHover={{ scale: 1.005 }}
              >
                {/* Left: info */}
                <div className="flex flex-col gap-5 justify-center">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}
                    >
                      <Icon size={18} style={{ color: c.color }} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-text-primary">
                      {c.title}
                    </h3>
                  </div>

                  <p className="text-text-muted text-sm leading-relaxed">{c.desc}</p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-3">
                    {c.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="glass px-4 py-2 rounded-full"
                      >
                        <span
                          className="font-display font-bold text-sm"
                          style={{ color: c.color }}
                        >
                          {m.value}
                        </span>
                        <span className="text-text-muted text-xs ml-2">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2">
                    {c.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono"
                        style={{
                          background: `${c.color}10`,
                          border: `1px solid ${c.color}25`,
                          color: c.color,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: preview */}
                <div className="h-64 lg:h-72">
                  {c.previewType === 'terminal' ? (
                    <TerminalPreview lines={c.terminalLines!} color={c.color} />
                  ) : (
                    <ChatPreview messages={c.chatMessages!} color={c.color} />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
