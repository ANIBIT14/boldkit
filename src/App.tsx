import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/use-theme'
import { FrameworkProvider } from '@/hooks/use-framework'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Skeleton } from '@/components/ui/skeleton'
import { Home, ThemeBuilder, Charts, Shapes, Templates } from '@/pages'
import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate'
import { PortfolioTemplate } from '@/components/templates/PortfolioTemplate'
import { DashboardTemplate } from '@/components/templates/DashboardTemplate'
import { PricingTemplate } from '@/components/templates/PricingTemplate'
import { BlogTemplate } from '@/components/templates/BlogTemplate'
import { ProductTemplate } from '@/components/templates/ProductTemplate'
import { DocsLayout } from '@/layouts/DocsLayout'
import '@/styles/globals.css'

// Lazy load doc pages for better initial load performance
const Introduction = lazy(() => import('@/pages/docs/Introduction').then(m => ({ default: m.Introduction })))
const Installation = lazy(() => import('@/pages/docs/Installation').then(m => ({ default: m.Installation })))

// Lazy load component documentation pages
const AccordionDoc = lazy(() => import('@/pages/docs/AccordionDoc').then(m => ({ default: m.AccordionDoc })))
const AlertDoc = lazy(() => import('@/pages/docs/AlertDoc').then(m => ({ default: m.AlertDoc })))
const AlertDialogDoc = lazy(() => import('@/pages/docs/AlertDialogDoc').then(m => ({ default: m.AlertDialogDoc })))
const AspectRatioDoc = lazy(() => import('@/pages/docs/AspectRatioDoc').then(m => ({ default: m.AspectRatioDoc })))
const AvatarDoc = lazy(() => import('@/pages/docs/AvatarDoc').then(m => ({ default: m.AvatarDoc })))
const BadgeDoc = lazy(() => import('@/pages/docs/BadgeDoc').then(m => ({ default: m.BadgeDoc })))
const BreadcrumbDoc = lazy(() => import('@/pages/docs/BreadcrumbDoc').then(m => ({ default: m.BreadcrumbDoc })))
const ButtonDoc = lazy(() => import('@/pages/docs/ButtonDoc').then(m => ({ default: m.ButtonDoc })))
const CalendarDoc = lazy(() => import('@/pages/docs/CalendarDoc').then(m => ({ default: m.CalendarDoc })))
const CardDoc = lazy(() => import('@/pages/docs/CardDoc').then(m => ({ default: m.CardDoc })))
const CheckboxDoc = lazy(() => import('@/pages/docs/CheckboxDoc').then(m => ({ default: m.CheckboxDoc })))
const CollapsibleDoc = lazy(() => import('@/pages/docs/CollapsibleDoc').then(m => ({ default: m.CollapsibleDoc })))
const CommandDoc = lazy(() => import('@/pages/docs/CommandDoc').then(m => ({ default: m.CommandDoc })))
const DialogDoc = lazy(() => import('@/pages/docs/DialogDoc').then(m => ({ default: m.DialogDoc })))
const DrawerDoc = lazy(() => import('@/pages/docs/DrawerDoc').then(m => ({ default: m.DrawerDoc })))
const DropdownMenuDoc = lazy(() => import('@/pages/docs/DropdownMenuDoc').then(m => ({ default: m.DropdownMenuDoc })))
const HoverCardDoc = lazy(() => import('@/pages/docs/HoverCardDoc').then(m => ({ default: m.HoverCardDoc })))
const InputDoc = lazy(() => import('@/pages/docs/InputDoc').then(m => ({ default: m.InputDoc })))
const InputOtpDoc = lazy(() => import('@/pages/docs/InputOtpDoc').then(m => ({ default: m.InputOtpDoc })))
const LabelDoc = lazy(() => import('@/pages/docs/LabelDoc').then(m => ({ default: m.LabelDoc })))
const LayeredCardDoc = lazy(() => import('@/pages/docs/LayeredCardDoc').then(m => ({ default: m.LayeredCardDoc })))
const MarqueeDoc = lazy(() => import('@/pages/docs/MarqueeDoc').then(m => ({ default: m.MarqueeDoc })))
const PaginationDoc = lazy(() => import('@/pages/docs/PaginationDoc').then(m => ({ default: m.PaginationDoc })))
const PopoverDoc = lazy(() => import('@/pages/docs/PopoverDoc').then(m => ({ default: m.PopoverDoc })))
const ProgressDoc = lazy(() => import('@/pages/docs/ProgressDoc').then(m => ({ default: m.ProgressDoc })))
const RadioGroupDoc = lazy(() => import('@/pages/docs/RadioGroupDoc').then(m => ({ default: m.RadioGroupDoc })))
const ScrollAreaDoc = lazy(() => import('@/pages/docs/ScrollAreaDoc').then(m => ({ default: m.ScrollAreaDoc })))
const SelectDoc = lazy(() => import('@/pages/docs/SelectDoc').then(m => ({ default: m.SelectDoc })))
const SeparatorDoc = lazy(() => import('@/pages/docs/SeparatorDoc').then(m => ({ default: m.SeparatorDoc })))
const SheetDoc = lazy(() => import('@/pages/docs/SheetDoc').then(m => ({ default: m.SheetDoc })))
const SkeletonDoc = lazy(() => import('@/pages/docs/SkeletonDoc').then(m => ({ default: m.SkeletonDoc })))
const SliderDoc = lazy(() => import('@/pages/docs/SliderDoc').then(m => ({ default: m.SliderDoc })))
const SonnerDoc = lazy(() => import('@/pages/docs/SonnerDoc').then(m => ({ default: m.SonnerDoc })))
const StickerDoc = lazy(() => import('@/pages/docs/StickerDoc').then(m => ({ default: m.StickerDoc })))
const SwitchDoc = lazy(() => import('@/pages/docs/SwitchDoc').then(m => ({ default: m.SwitchDoc })))
const TableDoc = lazy(() => import('@/pages/docs/TableDoc').then(m => ({ default: m.TableDoc })))
const TabsDoc = lazy(() => import('@/pages/docs/TabsDoc').then(m => ({ default: m.TabsDoc })))
const TextareaDoc = lazy(() => import('@/pages/docs/TextareaDoc').then(m => ({ default: m.TextareaDoc })))
const ToggleDoc = lazy(() => import('@/pages/docs/ToggleDoc').then(m => ({ default: m.ToggleDoc })))
const ToggleGroupDoc = lazy(() => import('@/pages/docs/ToggleGroupDoc').then(m => ({ default: m.ToggleGroupDoc })))
const TooltipDoc = lazy(() => import('@/pages/docs/TooltipDoc').then(m => ({ default: m.TooltipDoc })))

// New v2.5.0 component documentation pages
const SpinnerDoc = lazy(() => import('@/pages/docs/SpinnerDoc').then(m => ({ default: m.SpinnerDoc })))
const KbdDoc = lazy(() => import('@/pages/docs/KbdDoc').then(m => ({ default: m.KbdDoc })))
const StatCardDoc = lazy(() => import('@/pages/docs/StatCardDoc').then(m => ({ default: m.StatCardDoc })))
const StepperDoc = lazy(() => import('@/pages/docs/StepperDoc').then(m => ({ default: m.StepperDoc })))
const DropzoneDoc = lazy(() => import('@/pages/docs/DropzoneDoc').then(m => ({ default: m.DropzoneDoc })))

// Note: Chart documentation is now on the /charts page, not individual routes

// Loading fallback for lazy loaded pages
function PageLoader() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Skeleton className="h-64 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <FrameworkProvider>
          <TooltipProvider>
            <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/themes" element={<ThemeBuilder />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/shapes" element={<Shapes />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/landing-page" element={<LandingPageTemplate />} />
            <Route path="/templates/portfolio" element={<PortfolioTemplate />} />
            <Route path="/templates/dashboard" element={<DashboardTemplate />} />
            <Route path="/templates/pricing" element={<PricingTemplate />} />
            <Route path="/templates/blog" element={<BlogTemplate />} />
            <Route path="/templates/product" element={<ProductTemplate />} />

            {/* Documentation routes */}
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<Suspense fallback={<PageLoader />}><Introduction /></Suspense>} />
              <Route path="installation" element={<Suspense fallback={<PageLoader />}><Installation /></Suspense>} />
              <Route path="theming" element={<ThemeBuilder />} />
              <Route path="*" element={<Suspense fallback={<PageLoader />}><Introduction /></Suspense>} />
            </Route>

            {/* Component documentation routes */}
            <Route path="/components" element={<DocsLayout />}>
              <Route index element={<Navigate to="/components/button" replace />} />
              <Route path="accordion" element={<Suspense fallback={<PageLoader />}><AccordionDoc /></Suspense>} />
              <Route path="alert" element={<Suspense fallback={<PageLoader />}><AlertDoc /></Suspense>} />
              <Route path="alert-dialog" element={<Suspense fallback={<PageLoader />}><AlertDialogDoc /></Suspense>} />
              <Route path="aspect-ratio" element={<Suspense fallback={<PageLoader />}><AspectRatioDoc /></Suspense>} />
              <Route path="avatar" element={<Suspense fallback={<PageLoader />}><AvatarDoc /></Suspense>} />
              <Route path="badge" element={<Suspense fallback={<PageLoader />}><BadgeDoc /></Suspense>} />
              <Route path="breadcrumb" element={<Suspense fallback={<PageLoader />}><BreadcrumbDoc /></Suspense>} />
              <Route path="button" element={<Suspense fallback={<PageLoader />}><ButtonDoc /></Suspense>} />
              <Route path="calendar" element={<Suspense fallback={<PageLoader />}><CalendarDoc /></Suspense>} />
              <Route path="card" element={<Suspense fallback={<PageLoader />}><CardDoc /></Suspense>} />
              <Route path="checkbox" element={<Suspense fallback={<PageLoader />}><CheckboxDoc /></Suspense>} />
              <Route path="collapsible" element={<Suspense fallback={<PageLoader />}><CollapsibleDoc /></Suspense>} />
              <Route path="command" element={<Suspense fallback={<PageLoader />}><CommandDoc /></Suspense>} />
              <Route path="dialog" element={<Suspense fallback={<PageLoader />}><DialogDoc /></Suspense>} />
              <Route path="drawer" element={<Suspense fallback={<PageLoader />}><DrawerDoc /></Suspense>} />
              <Route path="dropdown-menu" element={<Suspense fallback={<PageLoader />}><DropdownMenuDoc /></Suspense>} />
              <Route path="hover-card" element={<Suspense fallback={<PageLoader />}><HoverCardDoc /></Suspense>} />
              <Route path="input" element={<Suspense fallback={<PageLoader />}><InputDoc /></Suspense>} />
              <Route path="input-otp" element={<Suspense fallback={<PageLoader />}><InputOtpDoc /></Suspense>} />
              <Route path="label" element={<Suspense fallback={<PageLoader />}><LabelDoc /></Suspense>} />
              <Route path="layered-card" element={<Suspense fallback={<PageLoader />}><LayeredCardDoc /></Suspense>} />
              <Route path="marquee" element={<Suspense fallback={<PageLoader />}><MarqueeDoc /></Suspense>} />
              <Route path="pagination" element={<Suspense fallback={<PageLoader />}><PaginationDoc /></Suspense>} />
              <Route path="popover" element={<Suspense fallback={<PageLoader />}><PopoverDoc /></Suspense>} />
              <Route path="progress" element={<Suspense fallback={<PageLoader />}><ProgressDoc /></Suspense>} />
              <Route path="radio-group" element={<Suspense fallback={<PageLoader />}><RadioGroupDoc /></Suspense>} />
              <Route path="scroll-area" element={<Suspense fallback={<PageLoader />}><ScrollAreaDoc /></Suspense>} />
              <Route path="select" element={<Suspense fallback={<PageLoader />}><SelectDoc /></Suspense>} />
              <Route path="separator" element={<Suspense fallback={<PageLoader />}><SeparatorDoc /></Suspense>} />
              <Route path="sheet" element={<Suspense fallback={<PageLoader />}><SheetDoc /></Suspense>} />
              <Route path="skeleton" element={<Suspense fallback={<PageLoader />}><SkeletonDoc /></Suspense>} />
              <Route path="slider" element={<Suspense fallback={<PageLoader />}><SliderDoc /></Suspense>} />
              <Route path="sonner" element={<Suspense fallback={<PageLoader />}><SonnerDoc /></Suspense>} />
              <Route path="sticker" element={<Suspense fallback={<PageLoader />}><StickerDoc /></Suspense>} />
              <Route path="switch" element={<Suspense fallback={<PageLoader />}><SwitchDoc /></Suspense>} />
              <Route path="table" element={<Suspense fallback={<PageLoader />}><TableDoc /></Suspense>} />
              <Route path="tabs" element={<Suspense fallback={<PageLoader />}><TabsDoc /></Suspense>} />
              <Route path="textarea" element={<Suspense fallback={<PageLoader />}><TextareaDoc /></Suspense>} />
              <Route path="toggle" element={<Suspense fallback={<PageLoader />}><ToggleDoc /></Suspense>} />
              <Route path="toggle-group" element={<Suspense fallback={<PageLoader />}><ToggleGroupDoc /></Suspense>} />
              <Route path="tooltip" element={<Suspense fallback={<PageLoader />}><TooltipDoc /></Suspense>} />
              {/* v2.5.0 Components */}
              <Route path="spinner" element={<Suspense fallback={<PageLoader />}><SpinnerDoc /></Suspense>} />
              <Route path="kbd" element={<Suspense fallback={<PageLoader />}><KbdDoc /></Suspense>} />
              <Route path="stat-card" element={<Suspense fallback={<PageLoader />}><StatCardDoc /></Suspense>} />
              <Route path="stepper" element={<Suspense fallback={<PageLoader />}><StepperDoc /></Suspense>} />
              <Route path="dropzone" element={<Suspense fallback={<PageLoader />}><DropzoneDoc /></Suspense>} />
              <Route path="*" element={<Navigate to="/components/button" replace />} />
            </Route>
          </Routes>
            </BrowserRouter>
            <Toaster />
          </TooltipProvider>
        </FrameworkProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
