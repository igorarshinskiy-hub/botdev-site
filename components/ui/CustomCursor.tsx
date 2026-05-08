'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)

  const springX = useSpring(trailX, { stiffness: 180, damping: 20 })
  const springY = useSpring(trailY, { stiffness: 180, damping: 20 })

  const isHovering = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4)
      cursorY.set(e.clientY - 4)
      trailX.set(e.clientX - 18)
      trailY.set(e.clientY - 18)
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.cursor === 'pointer'
      ) {
        isHovering.current = true
      }
    }

    const onLeave = () => {
      isHovering.current = false
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [cursorX, cursorY, trailX, trailY])

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-cyan pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY }}
      />
      {/* Trailing circle */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-accent-cyan/40 pointer-events-none z-[9998]"
        style={{ x: springX, y: springY }}
      />
    </>
  )
}
