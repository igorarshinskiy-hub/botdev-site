'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import { Send, MessageCircle, Mail, User, Phone, FileText } from 'lucide-react'
import GradientButton from '@/components/ui/GradientButton'

const BOT_MESSAGES = [
  'Привет! Расскажи о своём проекте 👋',
  'Какую задачу нужно автоматизировать?',
  'Уже есть бот или начинаем с нуля?',
  'Есть дедлайн или срочность?',
  'Отвечу в течение пары часов...',
]

function TypingBot() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const charIndex = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const currentMsg = BOT_MESSAGES[messageIndex]
    charIndex.current = 0
    setDisplayText('')
    setIsTyping(true)

    const typeChar = () => {
      if (charIndex.current < currentMsg.length) {
        setDisplayText(currentMsg.slice(0, charIndex.current + 1))
        charIndex.current++
        timeoutRef.current = setTimeout(typeChar, 45)
      } else {
        setIsTyping(false)
        timeoutRef.current = setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % BOT_MESSAGES.length)
        }, 2000)
      }
    }

    timeoutRef.current = setTimeout(typeChar, 300)
    return () => clearTimeout(timeoutRef.current)
  }, [messageIndex])

  return (
    <div
      className="rounded-2xl overflow-hidden h-full min-h-[320px] flex flex-col"
      style={{ background: '#0D0D1A', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Chat header */}
      <div
        className="px-5 py-4 flex items-center gap-3 border-b border-white/05"
        style={{ background: 'rgba(139,92,246,0.08)' }}
      >
        <div className="relative">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #5EE7FF, #8B5CF6)', color: '#0A0A14' }}
          >
            Б
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
            style={{ background: '#C6FF4F', borderColor: '#0D0D1A' }}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">Бот-ассистент</p>
          <p className="text-xs text-accent-cyan">
            {isTyping ? 'печатает...' : 'онлайн'}
          </p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-5 flex flex-col justify-end gap-3">
        {/* Previous messages (greyed out) */}
        {messageIndex > 0 && (
          <div className="text-text-muted/40 text-xs px-3 py-2 rounded-xl bg-white/03 max-w-[85%]">
            {BOT_MESSAGES[messageIndex - 1]}
          </div>
        )}

        {/* Current message */}
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-end gap-2"
        >
          <div
            className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #5EE7FF, #8B5CF6)', color: '#0A0A14' }}
          >
            Б
          </div>
          <div
            className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-text-primary max-w-[85%]"
            style={{
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.25)',
            }}
          >
            {displayText}
            {isTyping && (
              <span className="cursor-blink ml-0.5 text-accent-cyan">|</span>
            )}
          </div>
        </motion.div>

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-1 px-3 py-1 ml-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-text-muted"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', contact: '', task: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section
      id="contact"
      className="relative py-16 lg:py-20 overflow-hidden"
      aria-label="Контакты"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-10"
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-display tracking-[0.25em] text-text-muted uppercase mb-4"
          >
            КОНТАКТ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black leading-tight"
            style={{ fontSize: 'clamp(28px, 4.5vw, 56px)' }}
          >
            Расскажи <span className="gradient-text">о задаче</span>{' '}
            — отвечу за пару часов
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: contacts + form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Contact links */}
            <div className="flex flex-col gap-3">
              <a
                href="https://t.me/@your_handle"
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-4 px-5 py-4 rounded-xl hover:border-accent-cyan/40 transition-colors group"
              >
                <MessageCircle size={20} className="text-accent-cyan shrink-0" />
                <div>
                  <p className="text-xs text-text-muted">Telegram</p>
                  <p className="text-sm font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
                    @your_handle
                  </p>
                </div>
              </a>
              <a
                href="mailto:you@mail.com"
                className="glass flex items-center gap-4 px-5 py-4 rounded-xl hover:border-accent-violet/40 transition-colors group"
              >
                <Mail size={20} className="text-accent-violet shrink-0" />
                <div>
                  <p className="text-xs text-text-muted">Email</p>
                  <p className="text-sm font-semibold text-text-primary group-hover:text-accent-violet transition-colors">
                    you@mail.com
                  </p>
                </div>
              </a>
            </div>

            {/* Quick form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm font-display font-semibold text-text-primary">
                Или заполни быструю форму:
              </p>

              {[
                { key: 'name', label: 'Имя', icon: User, placeholder: 'Как вас зовут?' },
                { key: 'contact', label: 'Контакт', icon: Phone, placeholder: 'TG, email или номер' },
              ].map((field) => {
                const Icon = field.icon
                return (
                  <div key={field.key} className="relative">
                    <Icon
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                    />
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [field.key]: e.target.value }))
                      }
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-text-primary placeholder-text-muted/60 outline-none transition-colors"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = 'rgba(94,231,255,0.4)')
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = 'rgba(255,255,255,0.1)')
                      }
                    />
                  </div>
                )
              })}

              <div className="relative">
                <FileText
                  size={16}
                  className="absolute left-4 top-4 text-text-muted"
                />
                <textarea
                  placeholder="Кратко опиши задачу..."
                  rows={4}
                  value={form.task}
                  onChange={(e) => setForm((f) => ({ ...f, task: e.target.value }))}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-text-primary placeholder-text-muted/60 outline-none resize-none transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = 'rgba(94,231,255,0.4)')
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = 'rgba(255,255,255,0.1)')
                  }
                />
              </div>

              <motion.button
                type="submit"
                className="w-full relative py-4 rounded-xl font-display font-bold text-sm text-bg-deep overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, #5EE7FF 0%, #8B5CF6 50%, #FF4FD8 100%)' }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {sent ? (
                    '✓ Отправлено!'
                  ) : (
                    <>
                      <Send size={15} />
                      Отправить
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Right: typing bot */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <TypingBot />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
