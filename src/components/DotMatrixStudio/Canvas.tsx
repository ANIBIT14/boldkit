import { useRef, useCallback, useEffect } from 'react'
import type { StudioState } from './types'
import type { StudioAction } from './hooks/useStudioState'

interface CanvasProps {
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
  activeGrid: boolean[][]
  isPreviewMode?: boolean
}

function getGridCoords(
  e: { clientX: number; clientY: number },
  svgEl: SVGSVGElement,
  rows: number,
  cols: number
): { row: number; col: number } {
  const rect = svgEl.getBoundingClientRect()
  const col = Math.floor(((e.clientX - rect.left) / rect.width) * cols)
  const row = Math.floor(((e.clientY - rect.top) / rect.height) * rows)
  return { row, col }
}

export function Canvas({ state, dispatch, activeGrid, isPreviewMode }: CanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const isDragging = useRef(false)
  const dragMode = useRef<boolean | null>(null)

  const { rows, cols, dotColor, activeTool } = state

  const applyDraw = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return
    const { row, col } = getGridCoords({ clientX, clientY }, svgRef.current, rows, cols)
    if (row < 0 || row >= rows || col < 0 || col >= cols) return

    if (activeTool === 'pencil') {
      const value = dragMode.current ?? true
      dispatch({ type: 'SET_DOT', row, col, value })
    } else if (activeTool === 'eraser') {
      dispatch({ type: 'SET_DOT', row, col, value: false })
    }
  }, [activeTool, rows, cols, dispatch])

  const handlePointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (isPreviewMode) return
    if (e.button !== 0 && e.pointerType === 'mouse') return
    e.currentTarget.setPointerCapture(e.pointerId)
    isDragging.current = true

    if (!svgRef.current) return
    const { row, col } = getGridCoords(e, svgRef.current, rows, cols)

    if (activeTool === 'pencil') {
      const filled = activeGrid[row]?.[col] ?? false
      dragMode.current = !filled
      dispatch({ type: 'SET_DOT', row, col, value: !filled })
    } else if (activeTool === 'eraser') {
      dragMode.current = false
      dispatch({ type: 'SET_DOT', row, col, value: false })
    } else if (activeTool === 'select') {
      dispatch({ type: 'SET_SELECTION', selection: { startRow: row, startCol: col, endRow: row, endCol: col } })
    }
  }, [activeTool, activeGrid, rows, cols, dispatch, isPreviewMode])

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging.current || isPreviewMode) return
    if (activeTool === 'pencil' || activeTool === 'eraser') {
      applyDraw(e.clientX, e.clientY)
    } else if (activeTool === 'select' && svgRef.current) {
      const { row, col } = getGridCoords(e, svgRef.current, rows, cols)
      if (state.selection) {
        dispatch({ type: 'SET_SELECTION', selection: { ...state.selection, endRow: row, endCol: col } })
      }
    }
  }, [activeTool, applyDraw, rows, cols, state.selection, dispatch, isPreviewMode])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
    dragMode.current = null
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        dispatch({ type: 'UNDO' })
      } else if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        dispatch({ type: 'REDO' })
      } else if (!e.metaKey && !e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'p': dispatch({ type: 'SET_TOOL', tool: 'pencil' }); break
          case 'e': dispatch({ type: 'SET_TOOL', tool: 'eraser' }); break
          case 't': dispatch({ type: 'SET_TOOL', tool: 'text' }); break
          case 's': dispatch({ type: 'SET_TOOL', tool: 'shapes' }); break
          case 'v': dispatch({ type: 'SET_TOOL', tool: 'select' }); break
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dispatch])

  const selection = state.selection
  const selRect = selection ? {
    x: Math.min(selection.startCol, selection.endCol),
    y: Math.min(selection.startRow, selection.endRow),
    w: Math.abs(selection.endCol - selection.startCol) + 1,
    h: Math.abs(selection.endRow - selection.startRow) + 1,
  } : null

  const cursor = activeTool === 'pencil' ? 'crosshair'
    : activeTool === 'eraser' ? 'cell'
    : activeTool === 'select' ? 'default'
    : 'crosshair'

  return (
    <div className="relative w-full h-full studio-scanlines">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${cols} ${rows}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        style={{ cursor, display: 'block' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.08" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {activeGrid.map((row, r) =>
          row.map((filled, c) => (
            <circle
              key={`${r}-${c}`}
              cx={c + 0.5}
              cy={r + 0.5}
              r={0.38}
              fill={filled ? dotColor : '#1C1C1C'}
              stroke={filled ? undefined : '#2A2A2A'}
              strokeWidth={filled ? 0 : 0.03}
              filter={filled ? 'url(#glow)' : undefined}
            />
          ))
        )}

        {selRect && (
          <rect
            x={selRect.x}
            y={selRect.y}
            width={selRect.w}
            height={selRect.h}
            fill="rgba(232,255,0,0.08)"
            stroke="#E8FF00"
            strokeWidth={0.06}
            strokeDasharray="0.2 0.1"
          />
        )}
      </svg>
    </div>
  )
}
