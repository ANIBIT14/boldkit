import type { Tool, ShapeType, StudioState } from './types'
import type { StudioAction } from './hooks/useStudioState'
import { cn } from '@/lib/utils'

const SHAPES: { id: ShapeType; label: string }[] = [
  { id: 'line', label: 'Line' },
  { id: 'rect', label: 'Rectangle' },
  { id: 'circle', label: 'Circle' },
]

const TOOLS: { id: Tool; label: string; key: string; icon: string }[] = [
  { id: 'pencil', label: 'Pencil', key: 'P', icon: '✏' },
  { id: 'eraser', label: 'Eraser', key: 'E', icon: '⌫' },
  { id: 'text', label: 'Text', key: 'T', icon: 'T' },
  { id: 'shapes', label: 'Shapes', key: 'S', icon: '□' },
  { id: 'select', label: 'Select', key: 'V', icon: '⊹' },
]

interface ToolbarProps {
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
  /** mobile: renders as horizontal pill */
  mobile?: boolean
}

export function Toolbar({ state, dispatch, mobile }: ToolbarProps) {
  const { activeTool, activeShape } = state

  if (mobile) {
    return (
      <div
        className="flex items-center gap-2 px-4 py-2 studio-panel"
        style={{ borderRadius: 0 }}
      >
        {TOOLS.map(tool => (
          <button
            key={tool.id}
            aria-label={tool.label}
            onClick={() => dispatch({ type: 'SET_TOOL', tool: tool.id })}
            className={cn(
              'w-10 h-10 flex items-center justify-center text-sm border-3 border-[var(--studio-border)] transition-colors',
              activeTool === tool.id ? 'studio-tool-active' : 'bg-transparent text-[var(--studio-text)] hover:bg-[#1a1a1a]'
            )}
            style={{ fontFamily: 'var(--studio-font)' }}
          >
            {tool.icon}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase mb-1">Tools</p>
      {TOOLS.map(tool => (
        <button
          key={tool.id}
          onClick={() => dispatch({ type: 'SET_TOOL', tool: tool.id })}
          aria-label={tool.label}
          className={cn(
            'flex items-center gap-2 px-3 py-2 text-xs border-3 border-[var(--studio-border)] transition-colors w-full',
            activeTool === tool.id ? 'studio-tool-active' : 'bg-transparent text-[var(--studio-text)] hover:bg-[#1a1a1a]'
          )}
          style={{ fontFamily: 'var(--studio-font)' }}
        >
          <span className="w-5 text-center">{tool.icon}</span>
          <span>{tool.label}</span>
          <span className="ml-auto text-[var(--studio-text-muted)] text-[9px]">{tool.key}</span>
        </button>
      ))}

      {activeTool === 'shapes' && (
        <div className="mt-2 border-t border-[var(--studio-border)] pt-2 flex flex-col gap-1">
          <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase mb-1">Shape</p>
          {SHAPES.map(shape => (
            <button
              key={shape.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_SHAPE', shape: shape.id })}
              className={cn(
                'px-3 py-1 text-xs border border-[var(--studio-border)] transition-colors',
                activeShape === shape.id ? 'studio-tool-active' : 'bg-transparent text-[var(--studio-text)] hover:bg-[#1a1a1a]'
              )}
              style={{ fontFamily: 'var(--studio-font)' }}
            >
              {shape.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
