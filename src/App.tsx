import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ThemeProvider } from '@/hooks/use-theme'
import { FrameworkProvider } from '@/hooks/use-framework'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Skeleton } from '@/components/ui/skeleton'
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })))
const ThemeBuilder = lazy(() => import('@/pages/ThemeBuilder').then(m => ({ default: m.ThemeBuilder })))
const Charts = lazy(() => import('@/pages/Charts').then(m => ({ default: m.Charts })))
const Shapes = lazy(() => import('@/pages/Shapes').then(m => ({ default: m.Shapes })))
const Templates = lazy(() => import('@/pages/Templates').then(m => ({ default: m.Templates })))
const Blocks = lazy(() => import('@/pages/Blocks').then(m => ({ default: m.Blocks })))
const ShapeBuilder = lazy(() => import('@/pages/ShapeBuilder').then(m => ({ default: m.ShapeBuilder })))
const AsciiShapes = lazy(() => import('@/pages/AsciiShapes').then(m => ({ default: m.AsciiShapes })))
const DotMatrixStudio = lazy(() => import('@/pages/DotMatrixStudio').then(m => ({ default: m.DotMatrixStudio })))
const LandingPageTemplate = lazy(() => import('@/components/templates/LandingPageTemplate').then(m => ({ default: m.LandingPageTemplate })))
const PortfolioTemplate = lazy(() => import('@/components/templates/PortfolioTemplate').then(m => ({ default: m.PortfolioTemplate })))
const DashboardTemplate = lazy(() => import('@/components/templates/DashboardTemplate').then(m => ({ default: m.DashboardTemplate })))
const PricingTemplate = lazy(() => import('@/components/templates/PricingTemplate').then(m => ({ default: m.PricingTemplate })))
const BlogTemplate = lazy(() => import('@/components/templates/BlogTemplate').then(m => ({ default: m.BlogTemplate })))
const ProductTemplate = lazy(() => import('@/components/templates/ProductTemplate').then(m => ({ default: m.ProductTemplate })))
const DocsTemplate = lazy(() => import('@/components/templates/DocsTemplate').then(m => ({ default: m.DocsTemplate })))
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

// ASCII Shapes documentation page
const AsciiShapesDoc = lazy(() => import('@/pages/docs/AsciiShapesDoc').then(m => ({ default: m.AsciiShapesDoc })))

// Math Curve component documentation pages
const MathCurveLoaderDoc = lazy(() => import('@/pages/docs/MathCurveLoaderDoc').then(m => ({ default: m.MathCurveLoaderDoc })))
const MathCurveProgressDoc = lazy(() => import('@/pages/docs/MathCurveProgressDoc').then(m => ({ default: m.MathCurveProgressDoc })))
const MathCurveBackgroundDoc = lazy(() => import('@/pages/docs/MathCurveBackgroundDoc').then(m => ({ default: m.MathCurveBackgroundDoc })))

// New v2.5.0 component documentation pages
const SpinnerDoc = lazy(() => import('@/pages/docs/SpinnerDoc').then(m => ({ default: m.SpinnerDoc })))
const KbdDoc = lazy(() => import('@/pages/docs/KbdDoc').then(m => ({ default: m.KbdDoc })))
const StatCardDoc = lazy(() => import('@/pages/docs/StatCardDoc').then(m => ({ default: m.StatCardDoc })))
const StepperDoc = lazy(() => import('@/pages/docs/StepperDoc').then(m => ({ default: m.StepperDoc })))
const DropzoneDoc = lazy(() => import('@/pages/docs/DropzoneDoc').then(m => ({ default: m.DropzoneDoc })))
const EmptyStateDoc = lazy(() => import('@/pages/docs/EmptyStateDoc').then(m => ({ default: m.EmptyStateDoc })))

// New v2.7.0 & v2.8.0 component documentation pages
const RatingDoc = lazy(() => import('@/pages/docs/RatingDoc').then(m => ({ default: m.RatingDoc })))
const TagInputDoc = lazy(() => import('@/pages/docs/TagInputDoc').then(m => ({ default: m.TagInputDoc })))
const TimePickerDoc = lazy(() => import('@/pages/docs/TimePickerDoc').then(m => ({ default: m.TimePickerDoc })))
const DateRangePickerDoc = lazy(() => import('@/pages/docs/DateRangePickerDoc').then(m => ({ default: m.DateRangePickerDoc })))
const DataTableDoc = lazy(() => import('@/pages/docs/DataTableDoc').then(m => ({ default: m.DataTableDoc })))
const CarouselDoc = lazy(() => import('@/pages/docs/CarouselDoc').then(m => ({ default: m.CarouselDoc })))
const TimelineDoc = lazy(() => import('@/pages/docs/TimelineDoc').then(m => ({ default: m.TimelineDoc })))
const TreeViewDoc = lazy(() => import('@/pages/docs/TreeViewDoc').then(m => ({ default: m.TreeViewDoc })))
const SidebarDoc = lazy(() => import('@/pages/docs/SidebarDoc').then(m => ({ default: m.SidebarDoc })))
const TourDoc = lazy(() => import('@/pages/docs/TourDoc').then(m => ({ default: m.TourDoc })))

// Block documentation pages
const HeroSectionDoc = lazy(() => import('@/pages/docs/blocks/HeroSectionDoc').then(m => ({ default: m.HeroSectionDoc })))
const FeatureGridDoc = lazy(() => import('@/pages/docs/blocks/FeatureGridDoc').then(m => ({ default: m.FeatureGridDoc })))
const TestimonialsDoc = lazy(() => import('@/pages/docs/blocks/TestimonialsDoc').then(m => ({ default: m.TestimonialsDoc })))
const LogoCloudDoc = lazy(() => import('@/pages/docs/blocks/LogoCloudDoc').then(m => ({ default: m.LogoCloudDoc })))
const CTASectionDoc = lazy(() => import('@/pages/docs/blocks/CTASectionDoc').then(m => ({ default: m.CTASectionDoc })))
const StatsSectionDoc = lazy(() => import('@/pages/docs/blocks/StatsSectionDoc').then(m => ({ default: m.StatsSectionDoc })))
const TeamSectionDoc = lazy(() => import('@/pages/docs/blocks/TeamSectionDoc').then(m => ({ default: m.TeamSectionDoc })))
const FAQSectionDoc = lazy(() => import('@/pages/docs/blocks/FAQSectionDoc').then(m => ({ default: m.FAQSectionDoc })))
const FooterSectionDoc = lazy(() => import('@/pages/docs/blocks/FooterSectionDoc').then(m => ({ default: m.FooterSectionDoc })))
const ContactSectionDoc = lazy(() => import('@/pages/docs/blocks/ContactSectionDoc').then(m => ({ default: m.ContactSectionDoc })))
const AuthFormsDoc = lazy(() => import('@/pages/docs/blocks/AuthFormsDoc').then(m => ({ default: m.AuthFormsDoc })))
const ErrorPagesDoc = lazy(() => import('@/pages/docs/blocks/ErrorPagesDoc').then(m => ({ default: m.ErrorPagesDoc })))
const SettingsPageDoc = lazy(() => import('@/pages/docs/blocks/SettingsPageDoc').then(m => ({ default: m.SettingsPageDoc })))
const OnboardingFlowDoc = lazy(() => import('@/pages/docs/blocks/OnboardingFlowDoc').then(m => ({ default: m.OnboardingFlowDoc })))
const InvoiceDoc = lazy(() => import('@/pages/docs/blocks/InvoiceDoc').then(m => ({ default: m.InvoiceDoc })))

// Chart variant documentation pages (also accessible via /charts)
const SparklineDoc = lazy(() => import('@/pages/docs/SparklineDoc').then(m => ({ default: m.SparklineDoc })))
const DonutChartDoc = lazy(() => import('@/pages/docs/DonutChartDoc').then(m => ({ default: m.DonutChartDoc })))
const GaugeChartDoc = lazy(() => import('@/pages/docs/GaugeChartDoc').then(m => ({ default: m.GaugeChartDoc })))
const RadarChartDoc = lazy(() => import('@/pages/docs/RadarChartDoc').then(m => ({ default: m.RadarChartDoc })))
const RadialBarChartDoc = lazy(() => import('@/pages/docs/RadialBarChartDoc').then(m => ({ default: m.RadialBarChartDoc })))

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
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
            <Route path="/themes" element={<Suspense fallback={<PageLoader />}><ThemeBuilder /></Suspense>} />
            <Route path="/charts" element={<Suspense fallback={<PageLoader />}><Charts /></Suspense>} />
            <Route path="/shapes" element={<Suspense fallback={<PageLoader />}><Shapes /></Suspense>} />
            <Route path="/shapes/builder" element={<Suspense fallback={<PageLoader />}><ShapeBuilder /></Suspense>} />
            <Route path="/ascii-shapes" element={<Suspense fallback={<PageLoader />}><AsciiShapes /></Suspense>} />
            <Route path="/studio" element={<Suspense fallback={<PageLoader />}><DotMatrixStudio /></Suspense>} />
            <Route path="/templates" element={<Suspense fallback={<PageLoader />}><Templates /></Suspense>} />
            <Route path="/templates/landing-page" element={<Suspense fallback={<PageLoader />}><LandingPageTemplate /></Suspense>} />
            <Route path="/templates/portfolio" element={<Suspense fallback={<PageLoader />}><PortfolioTemplate /></Suspense>} />
            <Route path="/templates/dashboard" element={<Suspense fallback={<PageLoader />}><DashboardTemplate /></Suspense>} />
            <Route path="/templates/pricing" element={<Suspense fallback={<PageLoader />}><PricingTemplate /></Suspense>} />
            <Route path="/templates/blog" element={<Suspense fallback={<PageLoader />}><BlogTemplate /></Suspense>} />
            <Route path="/templates/product" element={<Suspense fallback={<PageLoader />}><ProductTemplate /></Suspense>} />
            <Route path="/templates/docs" element={<Suspense fallback={<PageLoader />}><DocsTemplate /></Suspense>} />

            {/* Documentation routes */}
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<Suspense fallback={<PageLoader />}><Introduction /></Suspense>} />
              <Route path="installation" element={<Suspense fallback={<PageLoader />}><Installation /></Suspense>} />
              <Route path="theming" element={<Suspense fallback={<PageLoader />}><ThemeBuilder embedded /></Suspense>} />
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
              {/* ASCII Shapes */}
              <Route path="ascii-shapes" element={<Suspense fallback={<PageLoader />}><AsciiShapesDoc /></Suspense>} />
              {/* Math Curve Components */}
              <Route path="math-curve-loader" element={<Suspense fallback={<PageLoader />}><MathCurveLoaderDoc /></Suspense>} />
              <Route path="math-curve-progress" element={<Suspense fallback={<PageLoader />}><MathCurveProgressDoc /></Suspense>} />
              <Route path="math-curve-background" element={<Suspense fallback={<PageLoader />}><MathCurveBackgroundDoc /></Suspense>} />
              {/* v2.5.0 Components */}
              <Route path="spinner" element={<Suspense fallback={<PageLoader />}><SpinnerDoc /></Suspense>} />
              <Route path="kbd" element={<Suspense fallback={<PageLoader />}><KbdDoc /></Suspense>} />
              <Route path="stat-card" element={<Suspense fallback={<PageLoader />}><StatCardDoc /></Suspense>} />
              <Route path="stepper" element={<Suspense fallback={<PageLoader />}><StepperDoc /></Suspense>} />
              <Route path="dropzone" element={<Suspense fallback={<PageLoader />}><DropzoneDoc /></Suspense>} />
              <Route path="empty-state" element={<Suspense fallback={<PageLoader />}><EmptyStateDoc /></Suspense>} />
              {/* v2.7.0 Components */}
              <Route path="rating" element={<Suspense fallback={<PageLoader />}><RatingDoc /></Suspense>} />
              <Route path="tag-input" element={<Suspense fallback={<PageLoader />}><TagInputDoc /></Suspense>} />
              <Route path="time-picker" element={<Suspense fallback={<PageLoader />}><TimePickerDoc /></Suspense>} />
              <Route path="date-range-picker" element={<Suspense fallback={<PageLoader />}><DateRangePickerDoc /></Suspense>} />
              <Route path="data-table" element={<Suspense fallback={<PageLoader />}><DataTableDoc /></Suspense>} />
              {/* v2.8.0 Components */}
              <Route path="carousel" element={<Suspense fallback={<PageLoader />}><CarouselDoc /></Suspense>} />
              <Route path="timeline" element={<Suspense fallback={<PageLoader />}><TimelineDoc /></Suspense>} />
              <Route path="tree-view" element={<Suspense fallback={<PageLoader />}><TreeViewDoc /></Suspense>} />
              <Route path="sidebar" element={<Suspense fallback={<PageLoader />}><SidebarDoc /></Suspense>} />
              <Route path="tour" element={<Suspense fallback={<PageLoader />}><TourDoc /></Suspense>} />
              {/* Chart variant pages */}
              <Route path="sparkline" element={<Suspense fallback={<PageLoader />}><SparklineDoc /></Suspense>} />
              <Route path="donut-chart" element={<Suspense fallback={<PageLoader />}><DonutChartDoc /></Suspense>} />
              <Route path="gauge-chart" element={<Suspense fallback={<PageLoader />}><GaugeChartDoc /></Suspense>} />
              <Route path="radar-chart" element={<Suspense fallback={<PageLoader />}><RadarChartDoc /></Suspense>} />
              <Route path="radial-bar-chart" element={<Suspense fallback={<PageLoader />}><RadialBarChartDoc /></Suspense>} />
              <Route path="*" element={<Navigate to="/components/button" replace />} />
            </Route>

            {/* Blocks overview + documentation routes */}
            <Route path="/blocks">
              <Route index element={<Suspense fallback={<PageLoader />}><Blocks /></Suspense>} />
              <Route element={<DocsLayout />}>
                <Route path="hero-section" element={<Suspense fallback={<PageLoader />}><HeroSectionDoc /></Suspense>} />
                <Route path="feature-grid" element={<Suspense fallback={<PageLoader />}><FeatureGridDoc /></Suspense>} />
                <Route path="testimonials" element={<Suspense fallback={<PageLoader />}><TestimonialsDoc /></Suspense>} />
                <Route path="logo-cloud" element={<Suspense fallback={<PageLoader />}><LogoCloudDoc /></Suspense>} />
                <Route path="cta-section" element={<Suspense fallback={<PageLoader />}><CTASectionDoc /></Suspense>} />
                <Route path="stats-section" element={<Suspense fallback={<PageLoader />}><StatsSectionDoc /></Suspense>} />
                <Route path="team-section" element={<Suspense fallback={<PageLoader />}><TeamSectionDoc /></Suspense>} />
                <Route path="faq-section" element={<Suspense fallback={<PageLoader />}><FAQSectionDoc /></Suspense>} />
                <Route path="footer-section" element={<Suspense fallback={<PageLoader />}><FooterSectionDoc /></Suspense>} />
                <Route path="contact-section" element={<Suspense fallback={<PageLoader />}><ContactSectionDoc /></Suspense>} />
                <Route path="auth-forms" element={<Suspense fallback={<PageLoader />}><AuthFormsDoc /></Suspense>} />
                <Route path="error-pages" element={<Suspense fallback={<PageLoader />}><ErrorPagesDoc /></Suspense>} />
                <Route path="settings-page" element={<Suspense fallback={<PageLoader />}><SettingsPageDoc /></Suspense>} />
                <Route path="onboarding-flow" element={<Suspense fallback={<PageLoader />}><OnboardingFlowDoc /></Suspense>} />
                <Route path="invoice" element={<Suspense fallback={<PageLoader />}><InvoiceDoc /></Suspense>} />
              </Route>
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
