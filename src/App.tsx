import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/use-theme'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { Home, ThemeBuilder, Charts, Shapes, Templates } from '@/pages'
import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate'
import { DocsLayout } from '@/layouts/DocsLayout'
import {
  Introduction,
  Installation,
  AccordionDoc,
  AlertDoc,
  AlertDialogDoc,
  AspectRatioDoc,
  AvatarDoc,
  BadgeDoc,
  BreadcrumbDoc,
  ButtonDoc,
  CalendarDoc,
  CardDoc,
  CheckboxDoc,
  CollapsibleDoc,
  CommandDoc,
  DialogDoc,
  DrawerDoc,
  DropdownMenuDoc,
  HoverCardDoc,
  InputDoc,
  InputOtpDoc,
  LabelDoc,
  LayeredCardDoc,
  MarqueeDoc,
  PaginationDoc,
  PopoverDoc,
  ProgressDoc,
  RadioGroupDoc,
  ScrollAreaDoc,
  SelectDoc,
  SeparatorDoc,
  SheetDoc,
  SkeletonDoc,
  SliderDoc,
  SonnerDoc,
  StickerDoc,
  SwitchDoc,
  TableDoc,
  TabsDoc,
  TextareaDoc,
  ToggleDoc,
  ToggleGroupDoc,
  TooltipDoc,
} from '@/pages/docs'
import '@/styles/globals.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/themes" element={<ThemeBuilder />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/shapes" element={<Shapes />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/landing-page" element={<LandingPageTemplate />} />

            {/* Documentation routes */}
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<Introduction />} />
              <Route path="installation" element={<Installation />} />
              <Route path="theming" element={<ThemeBuilder />} />
              <Route path="*" element={<Introduction />} />
            </Route>

            {/* Component documentation routes */}
            <Route path="/components" element={<DocsLayout />}>
              <Route index element={<Navigate to="/components/button" replace />} />
              <Route path="accordion" element={<AccordionDoc />} />
              <Route path="alert" element={<AlertDoc />} />
              <Route path="alert-dialog" element={<AlertDialogDoc />} />
              <Route path="aspect-ratio" element={<AspectRatioDoc />} />
              <Route path="avatar" element={<AvatarDoc />} />
              <Route path="badge" element={<BadgeDoc />} />
              <Route path="breadcrumb" element={<BreadcrumbDoc />} />
              <Route path="button" element={<ButtonDoc />} />
              <Route path="calendar" element={<CalendarDoc />} />
              <Route path="card" element={<CardDoc />} />
              <Route path="checkbox" element={<CheckboxDoc />} />
              <Route path="collapsible" element={<CollapsibleDoc />} />
              <Route path="command" element={<CommandDoc />} />
              <Route path="dialog" element={<DialogDoc />} />
              <Route path="drawer" element={<DrawerDoc />} />
              <Route path="dropdown-menu" element={<DropdownMenuDoc />} />
              <Route path="hover-card" element={<HoverCardDoc />} />
              <Route path="input" element={<InputDoc />} />
              <Route path="input-otp" element={<InputOtpDoc />} />
              <Route path="label" element={<LabelDoc />} />
              <Route path="layered-card" element={<LayeredCardDoc />} />
              <Route path="marquee" element={<MarqueeDoc />} />
              <Route path="pagination" element={<PaginationDoc />} />
              <Route path="popover" element={<PopoverDoc />} />
              <Route path="progress" element={<ProgressDoc />} />
              <Route path="radio-group" element={<RadioGroupDoc />} />
              <Route path="scroll-area" element={<ScrollAreaDoc />} />
              <Route path="select" element={<SelectDoc />} />
              <Route path="separator" element={<SeparatorDoc />} />
              <Route path="sheet" element={<SheetDoc />} />
              <Route path="skeleton" element={<SkeletonDoc />} />
              <Route path="slider" element={<SliderDoc />} />
              <Route path="sonner" element={<SonnerDoc />} />
              <Route path="sticker" element={<StickerDoc />} />
              <Route path="switch" element={<SwitchDoc />} />
              <Route path="table" element={<TableDoc />} />
              <Route path="tabs" element={<TabsDoc />} />
              <Route path="textarea" element={<TextareaDoc />} />
              <Route path="toggle" element={<ToggleDoc />} />
              <Route path="toggle-group" element={<ToggleGroupDoc />} />
              <Route path="tooltip" element={<TooltipDoc />} />
              <Route path="*" element={<Navigate to="/components/button" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
