'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glowColor?: string
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glowColor = '#8B5CF6',
}: GlassCardProps) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      whileHover={
        hover
          ? { y: -6, scale: 1.01 }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      {/* Hover glow */}
      {hover && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${glowColor}22, transparent 60%)`,
            boxShadow: `inset 0 1px 0 ${glowColor}44`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
