import { Header } from './Header'
import { Footer } from './Footer'
import { useScrollProgress } from '@/hooks/use-scroll-progress'

interface LayoutProps {
  children: React.ReactNode
  showFooter?: boolean
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  const progress = useScrollProgress()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Scroll progress bar — fixed, sits above the sticky header */}
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-primary transition-none"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}
