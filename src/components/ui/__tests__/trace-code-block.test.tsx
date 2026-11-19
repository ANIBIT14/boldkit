/**
 * Trace + CodeBlock — the agent-step list and the code/output slab.
 */
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { axe } from 'vitest-axe'
import { render, screen, fireEvent, act } from '@/test/test-utils'
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
} from '../code-block'
import {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceDescription,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
} from '../trace'

describe('CodeBlockContent', () => {
  it('splits a string into one numbered line per row, dropping the trailing newline', () => {
    const { container } = render(
      <CodeBlock>
        <CodeBlockContent lineNumbers startLine={10}>{'a\n\nc\n'}</CodeBlockContent>
      </CodeBlock>
    )
    const pre = container.querySelector('pre')!
    expect(pre).toHaveAttribute('data-numbered')
    expect(pre.style.counterReset).toBe('line 9')
    const lines = container.querySelectorAll('[data-slot=code-block-line]')
    expect(lines).toHaveLength(3)
    // the empty middle line keeps a newline so copied selections keep it
    expect(lines[1].textContent).toBe('\n')
  })

  it('renders children as-is without lineNumbers', () => {
    const { container } = render(<CodeBlockContent>{'a\nb'}</CodeBlockContent>)
    expect(container.querySelectorAll('[data-slot=code-block-line]')).toHaveLength(0)
    expect(container.querySelector('code')!.textContent).toBe('a\nb')
  })

  it('is keyboard-focusable so overflowing code can be scrolled', () => {
    render(<CodeBlockContent data-testid="pre">x</CodeBlockContent>)
    expect(screen.getByTestId('pre')).toHaveAttribute('tabindex', '0')
  })
})

describe('CodeBlockLine', () => {
  it('announces diff lines to screen readers', () => {
    render(
      <>
        <CodeBlockLine variant="added">new</CodeBlockLine>
        <CodeBlockLine variant="removed">old</CodeBlockLine>
        <CodeBlockLine variant="highlighted">hot</CodeBlockLine>
      </>
    )
    expect(screen.getByText('Added:', { exact: false })).toHaveClass('sr-only')
    expect(screen.getByText('Removed:', { exact: false })).toHaveClass('sr-only')
    expect(screen.queryByText('Highlighted', { exact: false })).toBeNull()
  })
})

describe('CodeBlockCopyButton', () => {
  let spy: ReturnType<typeof vi.spyOn>
  beforeEach(() => {
    spy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
  })
  afterEach(() => {
    vi.useRealTimers()
    spy.mockRestore()
  })

  it('copies the value, flips to "Copied", and resets after 2s', async () => {
    vi.useFakeTimers()

    render(<CodeBlockCopyButton value="npm i" />)
    const button = screen.getByRole('button', { name: 'Copy code' })
    await act(async () => {
      fireEvent.click(button)
    })
    expect(spy).toHaveBeenCalledWith('npm i')
    expect(button).toHaveAttribute('aria-label', 'Copied')
    expect(button).toHaveAttribute('data-copied')
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(button).toHaveAttribute('aria-label', 'Copy code')
  })

  it('skips copying when the consumer prevents default', async () => {
    render(<CodeBlockCopyButton value="x" onClick={(e) => e.preventDefault()} />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Copy code' }))
    })
    expect(spy).not.toHaveBeenCalled()
  })
})

describe('Trace', () => {
  it('shimmers the title and marks the line busy while running', () => {
    render(
      <Trace>
        <TraceLine status="running">
          <TraceIcon>•</TraceIcon>
          <TraceTitle>Searching</TraceTitle>
          <TraceDescription>2s</TraceDescription>
        </TraceLine>
        <TraceLine status="error">
          <TraceTitle>Failed</TraceTitle>
        </TraceLine>
      </Trace>
    )
    expect(screen.getByText('Searching')).toHaveClass('bk-shimmer')
    expect(screen.getByText('Searching').parentElement).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByText('Failed')).not.toHaveClass('bk-shimmer')
    expect(screen.getByText('Failed').parentElement).not.toHaveAttribute('aria-busy')
  })

  it('expands and collapses through the trigger', () => {
    render(
      <Trace>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceTitle>Ran tests</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>output</TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    )
    const trigger = screen.getByRole('button', { name: /ran tests/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('output')).toBeNull()
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('output')).toBeInTheDocument()
  })

  it('has no axe violations with a nested code block', async () => {
    const { container } = render(
      <Trace>
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>$</TraceIcon>
              <TraceTitle>Ran node --version</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockHeader>
                <CodeBlockTitle>bash</CodeBlockTitle>
                <CodeBlockActions>
                  <CodeBlockCopyButton value="v24" />
                </CodeBlockActions>
              </CodeBlockHeader>
              <CodeBlockContent aria-label="Command output">v24</CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
