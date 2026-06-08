// src/config/component-docs.tsx
// Single source of truth for the lazy-loaded component & block documentation pages.
// App.tsx maps over these arrays to build the /components/* and /blocks/* routes,
// so adding a new doc page is a one-line entry here instead of a lazy const + a <Route>.
import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

export interface DocRoute {
  /** URL segment under /components or /blocks (e.g. "context-menu") */
  slug: string
  Component: LazyExoticComponent<ComponentType>
}

// Wrap a dynamic import that exposes a named export as a default-style lazy component.
// `import('@/pages/docs/XDoc')` stays a static string so Vite can code-split each page.
const load = (
  importer: () => Promise<unknown>,
  name: string
): LazyExoticComponent<ComponentType> =>
  lazy(async () => {
    const mod = (await importer()) as Record<string, ComponentType>
    return { default: mod[name] }
  })

// Component documentation pages (rendered under /components/:slug).
export const componentDocRoutes: DocRoute[] = [
  { slug: 'accordion', Component: load(() => import('@/pages/docs/AccordionDoc'), 'AccordionDoc') },
  { slug: 'alert', Component: load(() => import('@/pages/docs/AlertDoc'), 'AlertDoc') },
  { slug: 'alert-dialog', Component: load(() => import('@/pages/docs/AlertDialogDoc'), 'AlertDialogDoc') },
  { slug: 'aspect-ratio', Component: load(() => import('@/pages/docs/AspectRatioDoc'), 'AspectRatioDoc') },
  { slug: 'avatar', Component: load(() => import('@/pages/docs/AvatarDoc'), 'AvatarDoc') },
  { slug: 'badge', Component: load(() => import('@/pages/docs/BadgeDoc'), 'BadgeDoc') },
  { slug: 'breadcrumb', Component: load(() => import('@/pages/docs/BreadcrumbDoc'), 'BreadcrumbDoc') },
  { slug: 'button', Component: load(() => import('@/pages/docs/ButtonDoc'), 'ButtonDoc') },
  { slug: 'button-group', Component: load(() => import('@/pages/docs/ButtonGroupDoc'), 'ButtonGroupDoc') },
  { slug: 'calendar', Component: load(() => import('@/pages/docs/CalendarDoc'), 'CalendarDoc') },
  { slug: 'card', Component: load(() => import('@/pages/docs/CardDoc'), 'CardDoc') },
  { slug: 'checkbox', Component: load(() => import('@/pages/docs/CheckboxDoc'), 'CheckboxDoc') },
  { slug: 'collapsible', Component: load(() => import('@/pages/docs/CollapsibleDoc'), 'CollapsibleDoc') },
  { slug: 'combobox', Component: load(() => import('@/pages/docs/ComboboxDoc'), 'ComboboxDoc') },
  { slug: 'command', Component: load(() => import('@/pages/docs/CommandDoc'), 'CommandDoc') },
  { slug: 'context-menu', Component: load(() => import('@/pages/docs/ContextMenuDoc'), 'ContextMenuDoc') },
  { slug: 'date-picker', Component: load(() => import('@/pages/docs/DatePickerDoc'), 'DatePickerDoc') },
  { slug: 'dialog', Component: load(() => import('@/pages/docs/DialogDoc'), 'DialogDoc') },
  { slug: 'drawer', Component: load(() => import('@/pages/docs/DrawerDoc'), 'DrawerDoc') },
  { slug: 'dropdown-menu', Component: load(() => import('@/pages/docs/DropdownMenuDoc'), 'DropdownMenuDoc') },
  { slug: 'hover-card', Component: load(() => import('@/pages/docs/HoverCardDoc'), 'HoverCardDoc') },
  { slug: 'input', Component: load(() => import('@/pages/docs/InputDoc'), 'InputDoc') },
  { slug: 'input-group', Component: load(() => import('@/pages/docs/InputGroupDoc'), 'InputGroupDoc') },
  { slug: 'input-otp', Component: load(() => import('@/pages/docs/InputOtpDoc'), 'InputOtpDoc') },
  { slug: 'label', Component: load(() => import('@/pages/docs/LabelDoc'), 'LabelDoc') },
  { slug: 'layered-card', Component: load(() => import('@/pages/docs/LayeredCardDoc'), 'LayeredCardDoc') },
  { slug: 'marquee', Component: load(() => import('@/pages/docs/MarqueeDoc'), 'MarqueeDoc') },
  { slug: 'menubar', Component: load(() => import('@/pages/docs/MenubarDoc'), 'MenubarDoc') },
  { slug: 'native-select', Component: load(() => import('@/pages/docs/NativeSelectDoc'), 'NativeSelectDoc') },
  { slug: 'navigation-menu', Component: load(() => import('@/pages/docs/NavigationMenuDoc'), 'NavigationMenuDoc') },
  { slug: 'pagination', Component: load(() => import('@/pages/docs/PaginationDoc'), 'PaginationDoc') },
  { slug: 'popover', Component: load(() => import('@/pages/docs/PopoverDoc'), 'PopoverDoc') },
  { slug: 'progress', Component: load(() => import('@/pages/docs/ProgressDoc'), 'ProgressDoc') },
  { slug: 'radio-group', Component: load(() => import('@/pages/docs/RadioGroupDoc'), 'RadioGroupDoc') },
  { slug: 'resizable', Component: load(() => import('@/pages/docs/ResizableDoc'), 'ResizableDoc') },
  { slug: 'scroll-area', Component: load(() => import('@/pages/docs/ScrollAreaDoc'), 'ScrollAreaDoc') },
  { slug: 'select', Component: load(() => import('@/pages/docs/SelectDoc'), 'SelectDoc') },
  { slug: 'separator', Component: load(() => import('@/pages/docs/SeparatorDoc'), 'SeparatorDoc') },
  { slug: 'sheet', Component: load(() => import('@/pages/docs/SheetDoc'), 'SheetDoc') },
  { slug: 'skeleton', Component: load(() => import('@/pages/docs/SkeletonDoc'), 'SkeletonDoc') },
  { slug: 'slider', Component: load(() => import('@/pages/docs/SliderDoc'), 'SliderDoc') },
  { slug: 'sonner', Component: load(() => import('@/pages/docs/SonnerDoc'), 'SonnerDoc') },
  { slug: 'sticker', Component: load(() => import('@/pages/docs/StickerDoc'), 'StickerDoc') },
  { slug: 'switch', Component: load(() => import('@/pages/docs/SwitchDoc'), 'SwitchDoc') },
  { slug: 'table', Component: load(() => import('@/pages/docs/TableDoc'), 'TableDoc') },
  { slug: 'tabs', Component: load(() => import('@/pages/docs/TabsDoc'), 'TabsDoc') },
  { slug: 'textarea', Component: load(() => import('@/pages/docs/TextareaDoc'), 'TextareaDoc') },
  { slug: 'toggle', Component: load(() => import('@/pages/docs/ToggleDoc'), 'ToggleDoc') },
  { slug: 'toggle-group', Component: load(() => import('@/pages/docs/ToggleGroupDoc'), 'ToggleGroupDoc') },
  { slug: 'tooltip', Component: load(() => import('@/pages/docs/TooltipDoc'), 'TooltipDoc') },
  { slug: 'ascii-shapes', Component: load(() => import('@/pages/docs/AsciiShapesDoc'), 'AsciiShapesDoc') },
  { slug: 'math-curve-loader', Component: load(() => import('@/pages/docs/MathCurveLoaderDoc'), 'MathCurveLoaderDoc') },
  { slug: 'math-curve-progress', Component: load(() => import('@/pages/docs/MathCurveProgressDoc'), 'MathCurveProgressDoc') },
  { slug: 'math-curve-background', Component: load(() => import('@/pages/docs/MathCurveBackgroundDoc'), 'MathCurveBackgroundDoc') },
  { slug: 'error-boundary', Component: load(() => import('@/pages/docs/ErrorBoundaryDoc'), 'ErrorBoundaryDoc') },
  { slug: 'spinner', Component: load(() => import('@/pages/docs/SpinnerDoc'), 'SpinnerDoc') },
  { slug: 'kbd', Component: load(() => import('@/pages/docs/KbdDoc'), 'KbdDoc') },
  { slug: 'stat-card', Component: load(() => import('@/pages/docs/StatCardDoc'), 'StatCardDoc') },
  { slug: 'stepper', Component: load(() => import('@/pages/docs/StepperDoc'), 'StepperDoc') },
  { slug: 'dropzone', Component: load(() => import('@/pages/docs/DropzoneDoc'), 'DropzoneDoc') },
  { slug: 'empty-state', Component: load(() => import('@/pages/docs/EmptyStateDoc'), 'EmptyStateDoc') },
  { slug: 'field', Component: load(() => import('@/pages/docs/FieldDoc'), 'FieldDoc') },
  { slug: 'rating', Component: load(() => import('@/pages/docs/RatingDoc'), 'RatingDoc') },
  { slug: 'tag-input', Component: load(() => import('@/pages/docs/TagInputDoc'), 'TagInputDoc') },
  { slug: 'time-picker', Component: load(() => import('@/pages/docs/TimePickerDoc'), 'TimePickerDoc') },
  { slug: 'date-range-picker', Component: load(() => import('@/pages/docs/DateRangePickerDoc'), 'DateRangePickerDoc') },
  { slug: 'data-table', Component: load(() => import('@/pages/docs/DataTableDoc'), 'DataTableDoc') },
  { slug: 'carousel', Component: load(() => import('@/pages/docs/CarouselDoc'), 'CarouselDoc') },
  { slug: 'timeline', Component: load(() => import('@/pages/docs/TimelineDoc'), 'TimelineDoc') },
  { slug: 'tree-view', Component: load(() => import('@/pages/docs/TreeViewDoc'), 'TreeViewDoc') },
  { slug: 'sidebar', Component: load(() => import('@/pages/docs/SidebarDoc'), 'SidebarDoc') },
  { slug: 'tour', Component: load(() => import('@/pages/docs/TourDoc'), 'TourDoc') },
  { slug: 'sparkline', Component: load(() => import('@/pages/docs/SparklineDoc'), 'SparklineDoc') },
  { slug: 'donut-chart', Component: load(() => import('@/pages/docs/DonutChartDoc'), 'DonutChartDoc') },
  { slug: 'gauge-chart', Component: load(() => import('@/pages/docs/GaugeChartDoc'), 'GaugeChartDoc') },
  { slug: 'radar-chart', Component: load(() => import('@/pages/docs/RadarChartDoc'), 'RadarChartDoc') },
  { slug: 'radial-bar-chart', Component: load(() => import('@/pages/docs/RadialBarChartDoc'), 'RadialBarChartDoc') },
]

// Block documentation pages (rendered under /blocks/:slug).
export const blockDocRoutes: DocRoute[] = [
  { slug: 'hero-section', Component: load(() => import('@/pages/docs/blocks/HeroSectionDoc'), 'HeroSectionDoc') },
  { slug: 'feature-grid', Component: load(() => import('@/pages/docs/blocks/FeatureGridDoc'), 'FeatureGridDoc') },
  { slug: 'testimonials', Component: load(() => import('@/pages/docs/blocks/TestimonialsDoc'), 'TestimonialsDoc') },
  { slug: 'logo-cloud', Component: load(() => import('@/pages/docs/blocks/LogoCloudDoc'), 'LogoCloudDoc') },
  { slug: 'cta-section', Component: load(() => import('@/pages/docs/blocks/CTASectionDoc'), 'CTASectionDoc') },
  { slug: 'stats-section', Component: load(() => import('@/pages/docs/blocks/StatsSectionDoc'), 'StatsSectionDoc') },
  { slug: 'team-section', Component: load(() => import('@/pages/docs/blocks/TeamSectionDoc'), 'TeamSectionDoc') },
  { slug: 'faq-section', Component: load(() => import('@/pages/docs/blocks/FAQSectionDoc'), 'FAQSectionDoc') },
  { slug: 'footer-section', Component: load(() => import('@/pages/docs/blocks/FooterSectionDoc'), 'FooterSectionDoc') },
  { slug: 'contact-section', Component: load(() => import('@/pages/docs/blocks/ContactSectionDoc'), 'ContactSectionDoc') },
  { slug: 'auth-forms', Component: load(() => import('@/pages/docs/blocks/AuthFormsDoc'), 'AuthFormsDoc') },
  { slug: 'error-pages', Component: load(() => import('@/pages/docs/blocks/ErrorPagesDoc'), 'ErrorPagesDoc') },
  { slug: 'settings-page', Component: load(() => import('@/pages/docs/blocks/SettingsPageDoc'), 'SettingsPageDoc') },
  { slug: 'onboarding-flow', Component: load(() => import('@/pages/docs/blocks/OnboardingFlowDoc'), 'OnboardingFlowDoc') },
  { slug: 'invoice', Component: load(() => import('@/pages/docs/blocks/InvoiceDoc'), 'InvoiceDoc') },
]
