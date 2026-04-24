import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { Toolbar } from '../Toolbar'
import { createFrame } from '../hooks/useStudioState'
import type { StudioState } from '../types'

function makeState(overrides?: Partial<StudioState>): StudioState {
  const frame = createFrame(4, 4)
  return {
    frames: [frame], activeFrameId: frame.id,
    rows: 4, cols: 4, dotColor: '#E8FF00', bgTransparent: false,
    activeTool: 'pencil', activeShape: 'rect',
    isPlaying: false, playFrameIndex: 0, fps: 12,
    loopMode: 'infinite', selection: null,
    undoStack: [], redoStack: [],
    liveEffect: null,
    liveEffectTick: 0,
    ...overrides,
  }
}

describe('Toolbar', () => {
  it('renders all 5 tool buttons', () => {
    render(<Toolbar state={makeState()} dispatch={vi.fn()} />)
    expect(screen.getByLabelText('Pencil')).toBeInTheDocument()
    expect(screen.getByLabelText('Eraser')).toBeInTheDocument()
    expect(screen.getByLabelText('Text')).toBeInTheDocument()
    expect(screen.getByLabelText('Shapes')).toBeInTheDocument()
    expect(screen.getByLabelText('Select')).toBeInTheDocument()
  })

  it('dispatches SET_TOOL when a tool is clicked', async () => {
    const dispatch = vi.fn()
    const user = userEvent.setup()
    render(<Toolbar state={makeState()} dispatch={dispatch} />)
    await user.click(screen.getByLabelText('Eraser'))
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_TOOL', tool: 'eraser' })
  })

  it('active tool button has studio-tool-active class', () => {
    render(<Toolbar state={makeState({ activeTool: 'text' })} dispatch={vi.fn()} />)
    expect(screen.getByLabelText('Text')).toHaveClass('studio-tool-active')
  })

  it('shows shape sub-toolbar when shapes tool is active', () => {
    render(<Toolbar state={makeState({ activeTool: 'shapes' })} dispatch={vi.fn()} />)
    expect(screen.getByText('Line')).toBeInTheDocument()
    expect(screen.getByText('Rectangle')).toBeInTheDocument()
    expect(screen.getByText('Circle')).toBeInTheDocument()
  })

  it('does not show shape sub-toolbar for other tools', () => {
    render(<Toolbar state={makeState({ activeTool: 'pencil' })} dispatch={vi.fn()} />)
    expect(screen.queryByText('Line')).not.toBeInTheDocument()
  })
})
