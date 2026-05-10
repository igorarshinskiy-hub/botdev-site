'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { slideFromBottom, stagger } from '@/lib/motion'
import {
  Send, MessageCircle, Mail, User, Phone, FileText,
  CheckCircle2, AlertCircle,
} from 'lucide-react'

// ─── Typing bot (unchanged) ────────────────────────────────────────────────

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
      <div
        className="px-5 py-4 flex items-center gap-3 border-b border-white/5"
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

      <div className="flex-1 p-5 flex flex-col justify-end gap-3">
        {messageIndex > 0 && (
          <div className="text-text-muted/40 text-xs px-3 py-2 rounded-xl bg-white/[0.03] max-w-[85%]">
            {BOT_MESSAGES[messageIndex - 1]}
          </div>
        )}
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
            {isTyping && <span className="cursor-blink ml-0.5 text-accent-cyan">|</span>}
          </div>
        </motion.div>
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

// ─── Form ──────────────────────────────────────────────────────────────────

type Status = 'idle' | 'sending' | 'success' | 'error'

interface FormData {
  name: string
  contact: string
  task: string
}

interface FormErrors {
  name?: string
  contact?: string
  task?: string
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (data.name.trim().length < 2) errors.name = 'Минимум 2 символа'
  if (!data.contact.trim()) errors.contact = 'Укажите способ связи'
  if (data.task.trim().length < 10) errors.task = 'Минимум 10 символов'
  return errors
}

const EMPTY_FORM: FormData = { name: '', contact: '', task: '' }

// ─── Main section ─────────────────────────────────────────────────────────

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FormErrors>({})
  const [errorMessage, setErrorMessage] = useState('')
  const successRef = useRef<HTMLDivElement>(null)

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((f) => ({ ...f, [field]: e.target.value }))
    // Clear per-field error as user types
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          contact: formData.contact,
          message: formData.task,
          subject: 'Новая заявка с botdev.pro',
          from_name: 'botdev.pro',
          botcheck: '',
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setFormData(EMPTY_FORM)
        setTimeout(() => successRef.current?.focus(), 60)
      } else {
        throw new Error(data.message ?? 'Ошибка отправки')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Неизвестная ошибка')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setErrors({})
    setErrorMessage('')
  }

  // Compute border color for each field
  const fieldBorder = (field: keyof FormErrors) =>
    errors[field] ? 'rgba(255,79,216,0.6)' : 'rgba(255,255,255,0.1)'

  const focusBorder = (field: keyof FormErrors) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!errors[field]) e.target.style.borderColor = 'rgba(94,231,255,0.4)'
  }

  const blurBorder = (field: keyof FormErrors) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!errors[field]) e.target.style.borderColor = 'rgba(255,255,255,0.1)'
  }

  return (
    <section
      id="contact"
      className="relative w-full py-16 lg:py-20 overflow-x-clip"
      aria-label="Контакты"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          className="text-center mb-10"
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px', amount: 0 }}
        >
          <motion.p
            variants={slideFromBottom}
            className="text-xs font-display tracking-[0.25em] text-text-muted uppercase mb-4"
          >
            КОНТАКТ
          </motion.p>
          <motion.h2
            variants={slideFromBottom}
            className="font-display font-black leading-tight text-balance break-words"
            style={{ fontSize: 'clamp(28px, 4.5vw, 56px)' }}
          >
            Расскажи <span className="gradient-text">о задаче</span>{' '}
            — отвечу за пару часов
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: contact links + form / success */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px', amount: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Contact links */}
            <div className="flex flex-col gap-3">
              <a
                href="https://t.me/IgorArshinskii"
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-4 px-5 py-4 rounded-xl hover:border-accent-cyan/40 transition-colors group"
              >
                <MessageCircle size={20} className="text-accent-cyan shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-text-muted">Telegram</p>
                  <p className="text-sm font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
                    @IgorArshinskii
                  </p>
                </div>
              </a>
              <a
                href="mailto:igorarshinskiy@gmail.com"
                className="glass flex items-center gap-4 px-5 py-4 rounded-xl hover:border-accent-violet/40 transition-colors group"
              >
                <Mail size={20} className="text-accent-violet shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-text-muted">Email</p>
                  <p className="text-sm font-semibold text-text-primary group-hover:text-accent-violet transition-colors">
                    igorarshinskiy@gmail.com
                  </p>
                </div>
              </a>
            </div>

            {/* ── Success state ── */}
            {status === 'success' ? (
              <motion.div
                ref={successRef}
                tabIndex={-1}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-8 flex flex-col items-center gap-5 text-center outline-none"
                role="status"
                aria-live="polite"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(198,255,79,0.12)',
                    border: '1px solid rgba(198,255,79,0.4)',
                  }}
                >
                  <CheckCircle2 size={32} style={{ color: '#C6FF4F' }} />
                </div>
                <div>
                  <p className="font-display font-bold text-lg text-text-primary mb-2">
                    Заявка отправлена!
                  </p>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Отвечу в течение пары часов. Если срочно — напишите в{' '}
                    <a
                      href="https://t.me/IgorArshinskii"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-cyan hover:underline"
                    >
                      Telegram
                    </a>
                    .
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-text-muted hover:text-text-primary transition-colors underline underline-offset-4"
                >
                  Отправить ещё одну заявку
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <p className="text-sm font-display font-semibold text-text-primary">
                  Или заполни быструю форму:
                </p>

                {/* Honeypot — invisible to humans, bots fill it → Web3Forms rejects */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                  readOnly
                />

                {/* Name */}
                <div>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" aria-hidden="true" />
                    <input
                      type="text"
                      id="form-name"
                      aria-label="Имя"
                      placeholder="Как вас зовут?"
                      value={formData.name}
                      onChange={handleChange('name')}
                      onFocus={focusBorder('name')}
                      onBlur={blurBorder('name')}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-text-primary placeholder-text-muted/60 outline-none transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${fieldBorder('name')}` }}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs mt-1.5 ml-1" style={{ color: '#FF4FD8' }} role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Contact */}
                <div>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" aria-hidden="true" />
                    <input
                      type="text"
                      id="form-contact"
                      aria-label="Контакт для связи — Telegram, email или телефон"
                      placeholder="TG, email или номер"
                      value={formData.contact}
                      onChange={handleChange('contact')}
                      onFocus={focusBorder('contact')}
                      onBlur={blurBorder('contact')}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-text-primary placeholder-text-muted/60 outline-none transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${fieldBorder('contact')}` }}
                    />
                  </div>
                  {errors.contact && (
                    <p className="text-xs mt-1.5 ml-1" style={{ color: '#FF4FD8' }} role="alert">
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* Task */}
                <div>
                  <div className="relative">
                    <FileText size={16} className="absolute left-4 top-4 text-text-muted pointer-events-none" aria-hidden="true" />
                    <textarea
                      id="form-task"
                      aria-label="Описание задачи"
                      placeholder="Кратко опиши задачу..."
                      rows={4}
                      value={formData.task}
                      onChange={handleChange('task')}
                      onFocus={focusBorder('task')}
                      onBlur={blurBorder('task')}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-text-primary placeholder-text-muted/60 outline-none resize-none transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${fieldBorder('task')}` }}
                    />
                  </div>
                  {errors.task && (
                    <p className="text-xs mt-1.5 ml-1" style={{ color: '#FF4FD8' }} role="alert">
                      {errors.task}
                    </p>
                  )}
                </div>

                {/* Network error banner */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl"
                    style={{
                      background: 'rgba(255,79,216,0.08)',
                      border: '1px solid rgba(255,79,216,0.3)',
                    }}
                    role="alert"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: '#FF4FD8' }} aria-hidden="true" />
                    <div>
                      <p className="text-xs text-text-primary">Что-то пошло не так.</p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Напишите напрямую:{' '}
                        <a
                          href="https://t.me/IgorArshinskii"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-cyan hover:underline"
                        >
                          @IgorArshinskii
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-disabled={status === 'sending'}
                  className="w-full relative py-4 rounded-xl font-display font-bold text-sm text-bg-deep overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={status !== 'sending' ? { scale: 1.02 } : undefined}
                  whileTap={status !== 'sending' ? { scale: 0.98 } : undefined}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #5EE7FF 0%, #8B5CF6 50%, #FF4FD8 100%)' }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                        Отправляю...
                      </>
                    ) : (
                      <>
                        <Send size={15} aria-hidden="true" />
                        Отправить
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right: typing bot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px', amount: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <TypingBot />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
