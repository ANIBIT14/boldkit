import { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ThemeProvider } from '@/hooks/use-theme'
import { FrameworkProvider } from '@/hooks/use-framework'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { DocsLayout } from '@/layouts/DocsLayout'
import { componentDocRoutes, blockDocRoutes } from '@/config/component-docs'
import '@/styles/globals.css'

const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })))
const ThemeBuilder = lazy(() => import('@/pages/ThemeBuilder').then(m => ({ default: m.ThemeBuilder })))
const Charts = lazy(() => import('@/pages/Charts').then(m => ({ default: m.Charts })))
const Shapes = lazy(() => import('@/pages/Shapes').then(m => ({ default: m.Shapes })))
const Templates = lazy(() => import('@/pages/Templates').then(m => ({ default: m.Templates })))
const Blocks = lazy(() => import('@/pages/Blocks').then(m => ({ default: m.Blocks })))
const ShapeBuilder = lazy(() => import('@/pages/ShapeBuilder').then(m => ({ default: m.ShapeBuilder })))
const AsciiShapes = lazy(() => import('@/pages/AsciiShapes').then(m => ({ default: m.AsciiShapes })))
const DotMatrixStudio = lazy(() => import('@/pages/DotMatrixStudio').then(m => ({ default: m.DotMatrixStudio })))
const CanvasEffects = lazy(() => import('@/pages/CanvasEffects').then(m => ({ default: m.CanvasEffects })))
// SEO / landing pages (neubrutalism topic cluster + tools/FavGrab funnel)
const Neubrutalism = lazy(() => import('@/pages/seo/Neubrutalism').then(m => ({ default: m.Neubrutalism })))
const NeubrutalismColors = lazy(() => import('@/pages/seo/NeubrutalismColors').then(m => ({ default: m.NeubrutalismColors })))
const NeubrutalismFonts = lazy(() => import('@/pages/seo/NeubrutalismFonts').then(m => ({ default: m.NeubrutalismFonts })))
const NeubrutalismExamples = lazy(() => import('@/pages/seo/NeubrutalismExamples').then(m => ({ default: m.NeubrutalismExamples })))
const NeubrutalismVsBrutalism = lazy(() => import('@/pages/seo/NeubrutalismVsBrutalism').then(m => ({ default: m.NeubrutalismVsBrutalism })))
const ToolsHub = lazy(() => import('@/pages/seo/ToolsHub').then(m => ({ default: m.ToolsHub })))
const FaviconGenerator = lazy(() => import('@/pages/seo/FaviconGenerator').then(m => ({ default: m.FaviconGenerator })))
const PngToIco = lazy(() => import('@/pages/seo/PngToIco').then(m => ({ default: m.PngToIco })))
const FaviconSizes = lazy(() => import('@/pages/seo/FaviconSizes').then(m => ({ default: m.FaviconSizes })))
const ExtractFavicon = lazy(() => import('@/pages/seo/ExtractFavicon').then(m => ({ default: m.ExtractFavicon })))
const LandingPageTemplate = lazy(() => import('@/components/templates/LandingPageTemplate').then(m => ({ default: m.LandingPageTemplate })))
const PortfolioTemplate = lazy(() => import('@/components/templates/PortfolioTemplate').then(m => ({ default: m.PortfolioTemplate })))
const DashboardTemplate = lazy(() => import('@/components/templates/DashboardTemplate').then(m => ({ default: m.DashboardTemplate })))
const PricingTemplate = lazy(() => import('@/components/templates/PricingTemplate').then(m => ({ default: m.PricingTemplate })))
const BlogTemplate = lazy(() => import('@/components/templates/BlogTemplate').then(m => ({ default: m.BlogTemplate })))
const ProductTemplate = lazy(() => import('@/components/templates/ProductTemplate').then(m => ({ default: m.ProductTemplate })))
const DocsTemplate = lazy(() => import('@/components/templates/DocsTemplate').then(m => ({ default: m.DocsTemplate })))

// Docs landing pages (component & block doc pages live in @/config/component-docs)
const ComponentsIndex = lazy(() => import('@/pages/docs/ComponentsIndex').then(m => ({ default: m.ComponentsIndex })))
const Introduction = lazy(() => import('@/pages/docs/Introduction').then(m => ({ default: m.Introduction })))
const Installation = lazy(() => import('@/pages/docs/Installation').then(m => ({ default: m.Installation })))

// PageLoader — only shown when a lazy chunk takes longer than 200 ms to fetch.
// On warm cache (all subsequent navigations) this never renders at all.
// Fixed + centered so it appears over the full viewport, not buried in a content area.
function PageLoader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(id)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none">
      {/* Subtle backdrop so the card reads against any background */}
      <div className="absolute inset-0 bg-background/60" />

      <div className="relative flex items-center gap-3 border-3 border-foreground bg-background px-5 py-3.5 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
        {/* Three neubrutalism squares in the brand palette */}
        <span className="inline-block h-2.5 w-2.5 bg-primary animate-bounce [animation-delay:0ms]" />
        <span className="inline-block h-2.5 w-2.5 bg-secondary animate-bounce [animation-delay:150ms]" />
        <span className="inline-block h-2.5 w-2.5 bg-accent animate-bounce [animation-delay:300ms]" />
        <span
          className="ml-1 text-[11px] font-black uppercase tracking-[0.15em] text-foreground"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Loading
        </span>
      </div>
    </div>
  )
}

// Wrap a lazy page element in the shared Suspense boundary.
const page = (element: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
)

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <FrameworkProvider>
          <TooltipProvider>
            <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={page(<Home />)} />
            <Route path="/themes" element={page(<ThemeBuilder />)} />
            <Route path="/charts" element={page(<Charts />)} />
            <Route path="/shapes" element={page(<Shapes />)} />
            <Route path="/shapes/builder" element={page(<ShapeBuilder />)} />
            <Route path="/ascii-shapes" element={page(<AsciiShapes />)} />
            <Route path="/studio" element={page(<DotMatrixStudio />)} />
            <Route path="/canvas-effects" element={page(<CanvasEffects />)} />

            {/* SEO / landing pages — neubrutalism topic cluster */}
            <Route path="/neubrutalism" element={page(<Neubrutalism />)} />
            <Route path="/neubrutalism/colors" element={page(<NeubrutalismColors />)} />
            <Route path="/neubrutalism/fonts" element={page(<NeubrutalismFonts />)} />
            <Route path="/neubrutalism/examples" element={page(<NeubrutalismExamples />)} />
            <Route path="/neubrutalism/vs-brutalism" element={page(<NeubrutalismVsBrutalism />)} />

            {/* SEO / landing pages — tools + FavGrab funnel */}
            <Route path="/tools" element={page(<ToolsHub />)} />
            <Route path="/tools/favicon-generator" element={page(<FaviconGenerator />)} />
            <Route path="/tools/png-to-ico" element={page(<PngToIco />)} />
            <Route path="/tools/favicon-sizes" element={page(<FaviconSizes />)} />
            <Route path="/tools/extract-favicon" element={page(<ExtractFavicon />)} />
            <Route path="/templates" element={page(<Templates />)} />
            <Route path="/templates/landing-page" element={page(<LandingPageTemplate />)} />
            <Route path="/templates/portfolio" element={page(<PortfolioTemplate />)} />
            <Route path="/templates/dashboard" element={page(<DashboardTemplate />)} />
            <Route path="/templates/pricing" element={page(<PricingTemplate />)} />
            <Route path="/templates/blog" element={page(<BlogTemplate />)} />
            <Route path="/templates/product" element={page(<ProductTemplate />)} />
            <Route path="/templates/docs" element={page(<DocsTemplate />)} />

            {/* Documentation routes */}
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={page(<Introduction />)} />
              <Route path="installation" element={page(<Installation />)} />
              <Route path="theming" element={page(<ThemeBuilder embedded />)} />
              <Route path="*" element={<Navigate to="/docs" replace />} />
            </Route>

            {/* Component documentation routes (manifest-driven) */}
            <Route path="/components" element={<DocsLayout />}>
              <Route index element={page(<ComponentsIndex />)} />
              {componentDocRoutes.map(({ slug, Component }) => (
                <Route key={slug} path={slug} element={page(<Component />)} />
              ))}
              <Route path="*" element={<Navigate to="/components/button" replace />} />
            </Route>

            {/* Blocks overview + documentation routes (manifest-driven) */}
            <Route path="/blocks">
              <Route index element={page(<Blocks />)} />
              <Route element={<DocsLayout />}>
                {blockDocRoutes.map(({ slug, Component }) => (
                  <Route key={slug} path={slug} element={page(<Component />)} />
                ))}
              </Route>
            </Route>
          </Routes>
          <Toaster />
            </BrowserRouter>
          </TooltipProvider>
        </FrameworkProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
