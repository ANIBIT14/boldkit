import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { PanelLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const SIDEBAR_COOKIE_NAME = 'sidebar:state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_COLLAPSED = '4rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

// Context
interface SidebarContextValue {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a <SidebarProvider />')
  }
  return context
}

// Provider
interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: controlledOpen,
      onOpenChange,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
    const [openMobile, setOpenMobile] = React.useState(false)
    const [isMobile, setIsMobile] = React.useState(false)

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen

    const setOpen = React.useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(value)
        }
        onOpenChange?.(value)

        // Save to cookie
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [isControlled, onOpenChange]
    )

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev)
      } else {
        setOpen(!open)
      }
    }, [isMobile, open, setOpen])

    // Check if mobile
    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Keyboard shortcut
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          e.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (e.metaKey || e.ctrlKey) &&
          !e.shiftKey &&
          !e.altKey
        ) {
          e.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [toggleSidebar])

    const state = open ? 'expanded' : 'collapsed'

    const contextValue = React.useMemo<SidebarContextValue>(
      () => ({
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-collapsed': SIDEBAR_WIDTH_COLLAPSED,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper flex min-h-screen w-full',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = 'SidebarProvider'

// Main Sidebar
const sidebarVariants = cva(
  'relative flex h-full flex-col border-r-3 border-foreground bg-background transition-all duration-300 ease-out',
  {
    variants: {
      collapsible: {
        none: 'w-[var(--sidebar-width)]',
        icon: 'w-[var(--sidebar-width)] group-data-[state=collapsed]/sidebar:w-[var(--sidebar-width-collapsed)]',
        hidden: 'w-[var(--sidebar-width)] group-data-[state=collapsed]/sidebar:w-0 group-data-[state=collapsed]/sidebar:border-0 group-data-[state=collapsed]/sidebar:overflow-hidden',
      },
      side: {
        left: '',
        right: 'border-r-0 border-l-3',
      },
    },
    defaultVariants: {
      collapsible: 'icon',
      side: 'left',
    },
  }
)

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ side = 'left', collapsible = 'icon', className, children, ...props }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent
            side={side === 'left' ? 'left' : 'right'}
            className="w-[var(--sidebar-width-mobile)] p-0"
            style={{ '--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
          >
            <div className="flex h-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        data-state={state}
        data-collapsible={collapsible}
        className="group/sidebar hidden md:block"
      >
        <div
          className={cn(sidebarVariants({ collapsible, side }), className)}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }
)
Sidebar.displayName = 'Sidebar'

// Sidebar Toggle
const SidebarToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn('h-8 w-8 transition-transform duration-300', className)}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeft
        className={cn(
          'h-4 w-4 transition-transform duration-300',
          state === 'collapsed' && 'rotate-180'
        )}
      />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarToggle.displayName = 'SidebarToggle'

// Sidebar Header
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center border-b-3 border-foreground p-4',
      'group-data-[state=collapsed]/sidebar:justify-center',
      className
    )}
    {...props}
  />
))
SidebarHeader.displayName = 'SidebarHeader'

// Sidebar Content
const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-auto p-4', className)}
    {...props}
  />
))
SidebarContent.displayName = 'SidebarContent'

// Sidebar Footer
const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center border-t-3 border-foreground p-4',
      'group-data-[state=collapsed]/sidebar:justify-center',
      className
    )}
    {...props}
  />
))
SidebarFooter.displayName = 'SidebarFooter'

// Sidebar Group
const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('space-y-2', className)}
    {...props}
  />
))
SidebarGroup.displayName = 'SidebarGroup'

// Sidebar Group Label
const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(SidebarContext)
  const state = context?.state ?? 'expanded'

  return (
    <div
      ref={ref}
      className={cn(
        'px-2 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground',
        'transition-opacity duration-200',
        state === 'collapsed' && 'opacity-0 hidden',
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

// Sidebar Item
const sidebarItemVariants = cva(
  'flex w-full items-center gap-3 px-3 py-2 text-sm transition-all duration-150',
  {
    variants: {
      variant: {
        default: 'hover:bg-muted',
        active: 'bg-accent shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarItemVariants> {
  icon?: React.ReactNode
  tooltip?: string
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ variant, icon, tooltip, className, children, ...props }, ref) => {
    const context = React.useContext(SidebarContext)
    const isCollapsed = context?.state === 'collapsed'

    const button = (
      <button
        ref={ref}
        className={cn(
          sidebarItemVariants({ variant }),
          isCollapsed && 'justify-center px-2',
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {!isCollapsed && <span className="truncate">{children}</span>}
      </button>
    )

    if (isCollapsed && tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right">{tooltip}</TooltipContent>
        </Tooltip>
      )
    }

    return button
  }
)
SidebarItem.displayName = 'SidebarItem'

// Sidebar Separator
const SidebarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mx-2 h-[3px] bg-foreground', className)}
    {...props}
  />
))
SidebarSeparator.displayName = 'SidebarSeparator'

// Sidebar Inset (main content wrapper)
const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-auto', className)}
    {...props}
  />
))
SidebarInset.displayName = 'SidebarInset'

export {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarSeparator,
  SidebarToggle,
  SidebarInset,
  useSidebar,
  sidebarVariants,
  sidebarItemVariants,
}
