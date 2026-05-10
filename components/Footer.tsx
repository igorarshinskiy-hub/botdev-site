'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail, Github } from 'lucide-react'

function NodeLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="4" fill="url(#logo-grad)" />
      <circle cx="5" cy="10" r="3" fill="url(#logo-grad)" opacity="0.8" />
      <circle cx="31" cy="10" r="3" fill="url(#logo-grad)" opacity="0.8" />
      <circle cx="5" cy="26" r="3" fill="url(#logo-grad)" opacity="0.8" />
      <circle cx="31" cy="26" r="3" fill="url(#logo-grad)" opacity="0.8" />
      <line x1="18" y1="18" x2="5" y2="10" stroke="url(#logo-grad)" strokeWidth="1.2" opacity="0.6" />
      <line x1="18" y1="18" x2="31" y2="10" stroke="url(#logo-grad)" strokeWidth="1.2" opacity="0.6" />
      <line x1="18" y1="18" x2="5" y2="26" stroke="url(#logo-grad)" strokeWidth="1.2" opacity="0.6" />
      <line x1="18" y1="18" x2="31" y2="26" stroke="url(#logo-grad)" strokeWidth="1.2" opacity="0.6" />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5EE7FF" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#FF4FD8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const LINKS = [
  { label: 'Hero', href: '#hero' },
  { label: 'Процесс', href: '#process' },
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакт', href: '#contact' },
]

const SOCIAL = [
  { icon: MessageCircle, href: 'https://t.me/IgorArshinskii', label: 'Telegram' },
  { icon: Mail, href: 'mailto:igorarshinskiy@gmail.com', label: 'Email' },
  { icon: Github, href: 'https://github.com/', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/05">
      {/* Big watermark text */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 flex items-end overflow-hidden pointer-events-none select-none"
      >
        <span
          className="font-display font-black text-white whitespace-nowrap leading-none"
          style={{
            fontSize: 'clamp(80px, 18vw, 220px)',
            opacity: 0.03,
            letterSpacing: '-0.04em',
            transform: 'translateY(20%)',
          }}
        >
          BUILT WITH BOTS
        </span>
      </div>

      <motion.div
        className="container mx-auto px-6 lg:px-12 py-14 relative z-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-50px', amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <NodeLogo />
            <div>
              <p className="font-display font-bold text-sm text-text-primary">
                BotDev
              </p>
              <p className="text-xs text-text-muted">Автоматизация и боты</p>
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Навигация">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-accent-cyan transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/05 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} BotDev. Все права защищены.
          </p>
          <p className="text-xs text-text-muted">
            Разработка ботов и автоматизации под ключ
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
