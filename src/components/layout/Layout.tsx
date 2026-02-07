import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
  showFooter?: boolean
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}
