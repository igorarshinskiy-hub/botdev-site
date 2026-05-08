'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CSSProperties } from 'react'

type Phase = 'idle' | 'start' | 'client' | 'typing' | 'bot' | 'clear'

interface Dialogue { client: string; bot: string }
interface Msg { id: number; role: 'client' | 'bot'; text: string }

interface PlatformConfig {
  id: string
  botName: string
  status: string
  headerStyle: CSSProperties
  clientBubble: CSSProperties
  botBubble: CSSProperties
  showCheckmarks?: boolean
  avatarLetter?: string
  dialogues: Dialogue[]
  delay: number
}

const PLATFORMS: PlatformConfig[] = [
  {
    id: 'telegram',
    botName: 'WB Помощник',
    status: 'online',
    headerStyle: { background: 'linear-gradient(135deg, #2AABEE, #229ED9)' },
    clientBubble: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.9)' },
    botBubble: { background: '#2AABEE', color: '#fff' },
    dialogues: [
      { client: 'Когда придёт заказ?', bot: 'Заказ #4821 в пути, доставка завтра до 18:00 📦' },
      { client: 'Спасибо!', bot: 'Всегда рады помочь 🤝' },
    ],
    delay: 0,
  },
  {
    id: 'whatsapp',
    botName: 'WA Business',
    status: 'активен',
    headerStyle: { background: '#075E54' },
    clientBubble: { background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.9)' },
    botBubble: { background: 'linear-gradient(135deg, #1a4a3a, #1e5c3f)', border: '1px solid rgba(220,248,198,0.2)', color: '#dcf8c6' },
    showCheckmarks: true,
    dialogues: [
      { client: 'Hi, do you ship to Bali?', bot: 'Yes! Delivery to Bali takes 7-10 days 🌴' },
      { client: 'Price for 5 items?', bot: '$129 with free shipping' },
    ],
    delay: 700,
  },
  {
    id: 'vk',
    botName: 'Анна, поддержка',
    status: 'в сети',
    headerStyle: { background: '#0077FF' },
    avatarLetter: 'В',
    clientBubble: { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.9)' },
    botBubble: { background: 'linear-gradient(135deg, #0077FF, #0055cc)', color: '#fff' },
    dialogues: [
      { client: 'Как вернуть товар?', bot: 'Возврат в течение 14 дней. Прислать инструкцию?' },
      { client: 'Да, давай', bot: 'Отправил в личные сообщения ✉️' },
    ],
    delay: 1400,
  },
  {
    id: 'max',
    botName: 'MAX Бот · WB',
    status: 'активен',
    headerStyle: { background: 'linear-gradient(135deg, #7B2FBE, #3B4FD8)' },
    clientBubble: { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.9)' },
    botBubble: { background: 'linear-gradient(135deg, rgba(123,47,190,0.7), rgba(59,79,216,0.7))', border: '1px solid rgba(123,47,190,0.4)', color: '#fff' },
    dialogues: [
      { client: 'Скидки на сегодня?', bot: 'Топ-3 скидки:\n• Худи Nike −45%\n• Кроссовки Adidas −38%\n• Куртка Columbia −52%' },
      { client: 'Ссылку на худи', bot: 'Держи 👉 wb.ru/c/4821' },
    ],
    delay: 2100,
  },
]

const ICONS: Record<string, React.ReactNode> = {
  telegram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  whatsapp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  ),
  vk: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.27h-1.52c-.58 0-.76-.47-1.79-1.52-1-.99-1.44-.84-1.44-.84s-.15.15-.15.57v1.39c0 .38-.12.61-1.12.61-1.65 0-3.48-1-4.77-2.87C5.88 10.4 5.54 8.42 5.54 8.42s-.05-.15.08-.24l1.52-.01c.24 0 .33.11.38.24.82 2.27 2.19 4.26 2.75 4.26.21 0 .31-.1.31-.64v-2.5c-.06-1.15-.67-1.25-.67-1.25-.08-.09.03-.2.14-.2h2.4c.2 0 .26.1.26.32v3.38c0 .18.08.24.13.24.21 0 .39-.06 1.43-1.04 1.08-1.06 1.85-2.78 1.85-2.78.06-.13.17-.25.38-.25h1.53c.46 0 .56.23.46.46-.19.45-1.88 3.05-1.88 3.05-.16.26-.22.38 0 .64.14.18.62.6 1 1.01.64.66 1.09 1.21 1.22 1.6.12.38-.08.57-.51.57z"/>
    </svg>
  ),
  max: (
    <span style={{ fontSize: 9, fontWeight: 800, color: 'white', letterSpacing: '0.05em', fontFamily: 'sans-serif' }}>MAX</span>
  ),
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 3, padding: '8px 12px', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.65)', display: 'block', flexShrink: 0 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function ChatWindow({ config, isVisible }: { config: PlatformConfig; isVisible: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const pairIdxRef = useRef(0)
  const nextIdRef = useRef(0)

  useEffect(() => {
    if (isVisible) {
      pairIdxRef.current = 0
      setMessages([])
      setIsTyping(false)
      setPhase('start')
    } else {
      setPhase('idle')
    }
  }, [isVisible])

  useEffect(() => {
    if (phase === 'idle') return
    let t: ReturnType<typeof setTimeout>

    switch (phase) {
      case 'start':
        t = setTimeout(() => setPhase('client'), config.delay)
        break
      case 'client': {
        const pair = config.dialogues[pairIdxRef.current % config.dialogues.length]
        const id = nextIdRef.current++
        setMessages(prev => {
          const next = [...prev, { id, role: 'client' as const, text: pair.client }]
          return next.length > 4 ? next.slice(-4) : next
        })
        t = setTimeout(() => setPhase('typing'), 800)
        break
      }
      case 'typing':
        setIsTyping(true)
        t = setTimeout(() => setPhase('bot'), 1500)
        break
      case 'bot': {
        const pair = config.dialogues[pairIdxRef.current % config.dialogues.length]
        setIsTyping(false)
        const id = nextIdRef.current++
        setMessages(prev => {
          const next = [...prev, { id, role: 'bot' as const, text: pair.bot }]
          return next.length > 4 ? next.slice(-4) : next
        })
        pairIdxRef.current++
        t = setTimeout(
          () => setPhase(pairIdxRef.current >= config.dialogues.length ? 'clear' : 'client'),
          2000,
        )
        break
      }
      case 'clear':
        setMessages([])
        setIsTyping(false)
        pairIdxRef.current = 0
        t = setTimeout(() => setPhase('client'), 600)
        break
    }

    return () => clearTimeout(t)
  }, [phase, config])

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 28px 72px rgba(0,0,0,0.58)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: 256,
      }}
    >
      {/* Header */}
      <div style={{ ...config.headerStyle, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {config.avatarLetter
            ? <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{config.avatarLetter}</span>
            : ICONS[config.id]
          }
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'white', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {config.botName}
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', display: 'inline-block', flexShrink: 0 }} />
            {config.status}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div style={{
        flex: 1,
        overflowY: 'hidden',
        padding: '8px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 5,
      }}>
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.role === 'client' ? -10 : 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ display: 'flex', justifyContent: msg.role === 'bot' ? 'flex-end' : 'flex-start', flexShrink: 0 }}
            >
              <div style={{
                ...(msg.role === 'bot' ? config.botBubble : config.clientBubble),
                fontSize: 11,
                lineHeight: 1.5,
                padding: '6px 10px',
                borderRadius: msg.role === 'bot' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                maxWidth: '84%',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
              }}>
                {msg.text}
                {msg.role === 'bot' && config.showCheckmarks && (
                  <span style={{ fontSize: 9, marginLeft: 5, color: '#93c5fd' }}>✓✓</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}
            >
              <div style={{ ...config.botBubble, padding: 0, borderRadius: '12px 12px 2px 12px' }}>
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ChatCarousel() {
  const [isVisible, setIsVisible] = useState(false)
  const [count, setCount] = useState(247)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => setIsVisible(e.isIntersecting),
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      setCount(c => c + 1)
      t = setTimeout(tick, 3000 + Math.random() * 2000)
    }
    t = setTimeout(tick, 3000 + Math.random() * 2000)
    return () => clearTimeout(t)
  }, [isVisible])

  return (
    <div ref={containerRef}>
      {/* Status bar */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: '9px 14px',
        marginBottom: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 11,
        color: 'rgba(255,255,255,0.6)',
        flexWrap: 'wrap',
      }}>
        <span style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#4ade80',
          display: 'inline-block',
          flexShrink: 0,
          boxShadow: '0 0 8px rgba(74,222,128,0.7)',
        }} />
        <span>4 платформы активны</span>
        <span style={{ opacity: 0.3 }}>·</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          Отвечено сегодня:&nbsp;
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ fontWeight: 700, color: 'rgba(255,255,255,0.9)', display: 'inline-block' }}
          >
            {count}
          </motion.span>
        </span>
      </div>

      {/* 2×2 grid */}
      <div
        className="grid grid-cols-2 gap-3.5"
      >
        {PLATFORMS.map((config, i) => (
          <div key={config.id} className={i >= 2 ? 'hidden sm:block' : ''}>
            <ChatWindow config={config} isVisible={isVisible} />
          </div>
        ))}
      </div>
    </div>
  )
}
