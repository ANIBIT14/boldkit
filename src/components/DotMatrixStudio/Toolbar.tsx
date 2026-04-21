import type { Tool, ShapeType, StudioState } from './types'
import type { StudioAction } from './hooks/useStudioState'
import { cn } from '@/lib/utils'

const SHAPES: { id: ShapeType; label: string; icon: string }[] = [
  { id: 'line', label: 'Line', icon: '╱' },
  { id: 'rect', label: 'Rectangle', icon: '▭' },
  { id: 'circle', label: 'Circle', icon: '○' },
]

const TOOLS: { id: Tool; label: string; key: string; icon: string; hint: string }[] = [
  { id: 'pencil', label: 'Pencil', key: 'P', icon: '✏', hint: 'Draw dots' },
  { id: 'eraser', label: 'Eraser', key: 'E', icon: '⌫', hint: 'Erase dots' },
  { id: 'text', label: 'Text', key: 'T', icon: 'T', hint: 'Type with NDot font' },
  { id: 'shapes', label: 'Shapes', key: 'S', icon: '□', hint: 'Line / Rect / Circle' },
  { id: 'select', label: 'Select', key: 'V', icon: '⊹', hint: 'Select region' },
]

interface ToolbarProps {
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
  /** mobile: renders as horizontal pill */
  mobile?: boolean
}

export function Toolbar({ state, dispatch, mobile }: ToolbarProps) {
  const { activeTool, activeShape } = state
  const sFont = { fontFamily: 'var(--studio-font)' }

  if (mobile) {
    return (
      <div className="flex items-center gap-1 px-3 py-2 studio-panel" style={{ borderRadius: 0 }}>
        {TOOLS.map(tool => (
          <button
            key={tool.id}
            aria-label={tool.label}
            onClick={() => dispatch({ type: 'SET_TOOL', tool: tool.id })}
            className={cn(
              'w-11 h-11 flex items-center justify-center text-xl border-3 border-[var(--studio-border)] transition-colors',
              activeTool === tool.id ? 'studio-tool-active' : 'bg-transparent text-[var(--studio-text)] hover:bg-[var(--studio-tint)]'
            )}
            style={sFont}
          >
            {tool.icon}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5 p-3">
      <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase mb-1">Tools</p>
      {TOOLS.map(tool => (
        <button
          key={tool.id}
          onClick={() => dispatch({ type: 'SET_TOOL', tool: tool.id })}
          aria-label={tool.label}
          title={tool.hint}
          className={cn(
            'flex items-center gap-2.5 px-3 py-2.5 text-sm border-3 border-[var(--studio-border)] transition-colors w-full',
            activeTool === tool.id ? 'studio-tool-active' : 'bg-transparent text-[var(--studio-text)] hover:bg-[var(--studio-tint)]'
          )}
          style={sFont}
        >
          <span className="text-lg w-6 text-center leading-none">{tool.icon}</span>
          <span className="text-xs">{tool.label}</span>
          <span className="ml-auto text-[var(--studio-text-muted)] text-[9px]">{tool.key}</span>
        </button>
      ))}

      {activeTool === 'shapes' && (
        <div className="mt-2 border-t border-[var(--studio-border)] pt-2 flex flex-col gap-1">
          <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase mb-1">
            Shape — drag on canvas
          </p>
          {SHAPES.map(shape => (
            <button
              key={shape.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_SHAPE', shape: shape.id })}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-xs border border-[var(--studio-border)] transition-colors',
                activeShape === shape.id ? 'studio-tool-active' : 'bg-transparent text-[var(--studio-text)] hover:bg-[var(--studio-tint)]'
              )}
              style={sFont}
            >
              <span className="text-base w-5 text-center">{shape.icon}</span>
              {shape.label}
            </button>
          ))}
          <p className="text-[8px] text-[var(--studio-text-muted)] mt-1 px-1 leading-relaxed" style={sFont}>
            Click and drag on the canvas to draw
          </p>
        </div>
      )}
    </div>
  )
}
