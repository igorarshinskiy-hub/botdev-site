import Hero from '@/components/Hero/Hero'
import MaxBotShowcase from '@/components/MaxBot/MaxBotShowcase'
import ProcessTimeline from '@/components/Process/ProcessTimeline'
import ServicesGrid from '@/components/Services/ServicesGrid'
import CasesSection from '@/components/Cases/CasesSection'
import FaqAccordion from '@/components/Faq/FaqAccordion'
import ContactSection from '@/components/Contact/ContactSection'
import Footer from '@/components/Footer'
import BackgroundGlow from '@/components/ui/BackgroundGlow'

export default function Page() {
  return (
    <>
      <BackgroundGlow />

      <main className="relative z-10 overflow-x-clip">
        <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <a
              href="#hero"
              className="font-display font-black text-sm text-text-primary tracking-tight"
            >
              <span className="gradient-text">Bot</span>Dev
            </a>

            <nav className="hidden md:flex items-center gap-6" aria-label="Основная навигация">
              {[
                ['Процесс', '#process'],
                ['Услуги', '#services'],
                ['Кейсы', '#cases'],
                ['FAQ', '#faq'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200 font-medium"
                >
                  {label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="text-sm font-display font-semibold px-5 py-2.5 rounded-xl text-bg-deep transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #5EE7FF, #8B5CF6)',
              }}
            >
              Связаться
            </a>
          </div>
        </header>

        <Hero />
        <MaxBotShowcase />
        <ProcessTimeline />
        <ServicesGrid />
        <CasesSection />
        <FaqAccordion />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
