'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { slideFromBottom, stagger } from '@/lib/motion'
import { FileText, Search, GitBranch, Code2, Rocket } from 'lucide-react'

const STEPS = [
  {
    id: 1,
    title: 'Бриф',
    desc: 'Разбираем задачу, цели и ограничения. Определяем, что именно нужно автоматизировать и какой результат ожидается.',
    icon: FileText,
    color: '#5EE7FF',
  },
  {
    id: 2,
    title: 'Анализ',
    desc: 'Изучаем API, стек, данные и ограничения платформ. Проверяем технические риски заранее, а не в процессе.',
    icon: Search,
    color: '#8B5CF6',
  },
  {
    id: 3,
    title: 'Архитектура',
    desc: 'Проектируем структуру: схема данных, логика взаимодействий, точки интеграции. Всё согласуем до строчки кода.',
    icon: GitBranch,
    color: '#FF4FD8',
  },
  {
    id: 4,
    title: 'Разработка',
    desc: 'Пишем, тестируем итерациями. Промежуточные демо по готовности каждого модуля — никакого кота в мешке.',
    icon: Code2,
    color: '#5EE7FF',
  },
  {
    id: 5,
    title: 'Деплой и поддержка',
    desc: 'Разворачиваем на сервере, настраиваем мониторинг. Сопровождаем — при сбоях реагируем, не ждём жалоб.',
    icon: Rocket,
    color: '#8B5CF6',
  },
]

function StepCard({
  step,
  index,
  activeIndex,
}: {
  step: (typeof STEPS)[0]
  index: number
  activeIndex: number
}) {
  const Icon = step.icon
  const isActive = index === activeIndex
  const isDone = index < activeIndex

  return (
    <motion.div
      className="flex flex-col items-center gap-4 relative"
      animate={{
        opacity: isActive ? 1 : isDone ? 0.7 : 0.35,
        scale: isActive ? 1 : isDone ? 0.95 : 0.88,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center"
        style={{
          background: isActive
            ? `radial-gradient(circle, ${step.color}30, transparent)`
            : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isActive ? step.color : 'rgba(255,255,255,0.1)'}`,
          boxShadow: isActive ? `0 0 30px ${step.color}50, 0 0 60px ${step.color}20` : 'none',
          transition: 'all 0.5s ease',
        }}
      >
        <Icon
          size={24}
          style={{ color: isActive ? step.color : '#9A9AB0' }}
          className="transition-colors duration-500"
        />

        {isActive && (
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ border: `1px solid ${step.color}`, opacity: 0.5 }}
          />
        )}
      </div>

      <div className="text-center max-w-[120px] lg:max-w-[160px]">
        <p
          className="font-display font-bold text-sm lg:text-base"
          style={{ color: isActive ? step.color : '#F5F5FA' }}
        >
          {step.title}
        </p>
      </div>

      <motion.div
        className="absolute top-[calc(100%+1.5rem)] left-1/2 -translate-x-1/2 w-52 glass rounded-xl p-4 z-10"
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -10 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: isActive ? 'auto' : 'none' }}
      >
        <p className="text-text-muted text-xs leading-relaxed">{step.desc}</p>
      </motion.div>
    </motion.div>
  )
}

function Connector({ index, activeIndex }: { index: number; activeIndex: number }) {
  const filled = index < activeIndex

  return (
    <div className="flex-1 relative h-px mx-2" style={{ marginTop: '-2.5rem' }}>
      <div className="absolute inset-0 bg-white/10 rounded-full" />
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background: 'linear-gradient(90deg, #5EE7FF, #8B5CF6)',
          transformOrigin: 'left',
        }}
        animate={{ scaleX: filled ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {filled && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{
            background: '#5EE7FF',
            boxShadow: '0 0 8px #5EE7FF',
          }}
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  )
}

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: false, margin: '-20%' })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-16 lg:py-20 overflow-hidden"
      aria-label="Процесс работы"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-10 lg:mb-12"
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px', amount: 0.2 }}
        >
          <motion.p
            variants={slideFromBottom}
            className="text-xs font-display tracking-[0.25em] text-text-muted uppercase mb-4"
          >
            КАК Я РАБОТАЮ
          </motion.p>
          <motion.h2
            variants={slideFromBottom}
            className="font-display font-black leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            Процесс, в котором{' '}
            <span className="gradient-text">нет магии</span>{' '}
            — только система
          </motion.h2>
        </motion.div>

        <div className="flex items-start justify-between pb-24">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              className="flex items-center flex-1 min-w-0"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-50px', amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <StepCard step={step} index={i} activeIndex={activeIndex} />
              {i < STEPS.length - 1 && (
                <Connector index={i} activeIndex={activeIndex} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
