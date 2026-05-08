'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GradientButtonProps {
  children: ReactNode
  variant?: 'filled' | 'ghost'
  href?: string
  onClick?: () => void
  className?: string
}

export default function GradientButton({
  children,
  variant = 'filled',
  href,
  onClick,
  className = '',
}: GradientButtonProps) {
  const base =
    'relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-sm tracking-wide transition-all cursor-pointer select-none overflow-hidden'

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${base} ${
        variant === 'filled'
          ? 'text-bg-deep'
          : 'text-text-primary border border-white/20'
      } ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {variant === 'filled' && (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #5EE7FF 0%, #8B5CF6 50%, #FF4FD8 100%)' }}
        />
      )}

      {variant === 'ghost' && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'transparent',
            border: '1px solid transparent',
            backgroundImage:
              'linear-gradient(var(--bg-deep), var(--bg-deep)), linear-gradient(135deg, #5EE7FF, #8B5CF6, #FF4FD8)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        />
      )}

      <span className="relative z-10">{children}</span>
    </Component>
  )
}
