import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/use-theme'
import { FrameworkProvider } from '@/hooks/use-framework'
import { TooltipProvider } from '@/components/ui/tooltip'

// All providers wrapper
interface AllProvidersProps {
  children: ReactNode
}

function AllProviders({ children }: AllProvidersProps) {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="boldkit-test-theme">
        <FrameworkProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </FrameworkProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

// Custom render with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
  theme?: 'light' | 'dark'
}

function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const { route = '/', ...renderOptions } = options || {}

  // Set initial route
  window.history.pushState({}, 'Test page', route)

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllProviders, ...renderOptions }),
  }
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { userEvent }

// Override render with custom render
export { customRender as render }

// Utility to wait for element
export async function waitForElement(
  callback: () => HTMLElement | null,
  timeout = 1000
): Promise<HTMLElement> {
  const startTime = Date.now()

  while (Date.now() - startTime < timeout) {
    const element = callback()
    if (element) return element
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  throw new Error('Element not found within timeout')
}

// Utility to create mock props for components
export function createMockProps<T extends Record<string, unknown>>(
  defaultProps: T,
  overrides?: Partial<T>
): T {
  return { ...defaultProps, ...overrides }
}

// Accessibility testing helper
export async function checkA11y(container: HTMLElement) {
  // Basic accessibility checks
  const issues: string[] = []

  // Check for images without alt text
  const images = container.querySelectorAll('img:not([alt])')
  if (images.length > 0) {
    issues.push(`Found ${images.length} image(s) without alt text`)
  }

  // Check for buttons without accessible names
  const buttons = container.querySelectorAll('button')
  buttons.forEach((button, index) => {
    const hasText = button.textContent?.trim()
    const hasAriaLabel = button.getAttribute('aria-label')
    const hasAriaLabelledBy = button.getAttribute('aria-labelledby')

    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push(`Button ${index + 1} has no accessible name`)
    }
  })

  // Check for inputs without labels
  const inputs = container.querySelectorAll('input:not([type="hidden"])')
  inputs.forEach((input, index) => {
    const id = input.getAttribute('id')
    const hasLabel = id && container.querySelector(`label[for="${id}"]`)
    const hasAriaLabel = input.getAttribute('aria-label')
    const hasAriaLabelledBy = input.getAttribute('aria-labelledby')

    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push(`Input ${index + 1} has no associated label`)
    }
  })

  return {
    violations: issues,
    passes: issues.length === 0,
  }
}

// Keyboard navigation testing helper
export async function testKeyboardNavigation(
  user: ReturnType<typeof userEvent.setup>,
  expectedOrder: string[]
) {
  for (const expectedText of expectedOrder) {
    await user.tab()
    const focusedElement = document.activeElement
    expect(focusedElement?.textContent).toContain(expectedText)
  }
}
