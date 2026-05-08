import type { Metadata } from 'next'
import { unbounded, manrope } from '@/lib/fonts'
import './globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'

export const metadata: Metadata = {
  title: 'BotDev — автоматизация процессов и боты под ключ',
  description:
    'Разработка Telegram, VK, MAX, WhatsApp ботов. Парсеры маркетплейсов, AI-ассистенты, автоматизация бизнес-процессов.',
  keywords: ['Telegram бот', 'парсер', 'автоматизация', 'n8n', 'Claude AI', 'Wildberries'],
  openGraph: {
    title: 'BotDev — автоматизация процессов и боты под ключ',
    description: 'Разработка Telegram, VK, MAX, WhatsApp ботов. Парсеры маркетплейсов, AI-ассистенты, автоматизация бизнес-процессов.',
    url: 'https://botdev.pro',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${manrope.variable}`}
    >
      <body className="bg-bg-deep text-text-primary font-sans antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
