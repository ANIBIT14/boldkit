import { useRef, useCallback, useEffect, useState } from 'react'
import type { StudioState, ShapeType } from './types'
import type { StudioAction } from './hooks/useStudioState'
import { C } from './lib/studioTheme'

interface CanvasProps {
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
  activeGrid: boolean[][]
  isPreviewMode?: boolean
}

// ── coordinate helper ──────────────────────────────────────────────────────
// Uses SVG's own coordinate transform so letterboxing from preserveAspectRatio
// never causes an offset — the click lands exactly on the right dot.

function svgCoords(
  e: { clientX: number; clientY: number },
  svgEl: SVGSVGElement
): { svgX: number; svgY: number } {
  const pt = svgEl.createSVGPoint()
  pt.x = e.clientX
  pt.y = e.clientY
  const ctm = svgEl.getScreenCTM()
  if (!ctm) {
    // Fallback: bounding rect
    const rect = svgEl.getBoundingClientRect()
    return { svgX: e.clientX - rect.left, svgY: e.clientY - rect.top }
  }
  const transformed = pt.matrixTransform(ctm.inverse())
  return { svgX: transformed.x, svgY: transformed.y }
}

function getGridCoords(
  e: { clientX: number; clientY: number },
  svgEl: SVGSVGElement
): { row: number; col: number } {
  const { svgX, svgY } = svgCoords(e, svgEl)
  return {
    col: Math.floor(svgX),
    row: Math.floor(svgY),
  }
}

// ── shape helpers ──────────────────────────────────────────────────────────

function linePoints(r0: number, c0: number, r1: number, c1: number): [number, number][] {
  const pts: [number, number][] = []
  const dC = Math.abs(c1 - c0)
  const dR = -Math.abs(r1 - r0)
  const sC = c0 < c1 ? 1 : -1
  const sR = r0 < r1 ? 1 : -1
  let err = dC + dR
  let r = r0, c = c0
  while (true) {
    pts.push([r, c])
    if (r === r1 && c === c1) break
    const e2 = 2 * err
    if (e2 >= dR) { err += dR; c += sC }
    if (e2 <= dC) { err += dC; r += sR }
  }
  return pts
}

function rectPoints(r0: number, c0: number, r1: number, c1: number): [number, number][] {
  const minR = Math.min(r0, r1), maxR = Math.max(r0, r1)
  const minC = Math.min(c0, c1), maxC = Math.max(c0, c1)
  const pts: [number, number][] = []
  for (let c = minC; c <= maxC; c++) {
    pts.push([minR, c])
    if (minR !== maxR) pts.push([maxR, c])
  }
  for (let r = minR + 1; r < maxR; r++) {
    pts.push([r, minC])
    if (minC !== maxC) pts.push([r, maxC])
  }
  return pts
}

function circlePoints(r0: number, c0: number, r1: number, c1: number): [number, number][] {
  const centerR = (r0 + r1) / 2
  const centerC = (c0 + c1) / 2
  const radiusR = Math.abs(r1 - r0) / 2
  const radiusC = Math.abs(c1 - c0) / 2
  const steps = Math.max(radiusR, radiusC) * 4 * Math.PI + 8
  const seen = new Set<string>()
  const pts: [number, number][] = []
  for (let i = 0; i < steps; i++) {
    const angle = (2 * Math.PI * i) / steps
    const r = Math.round(centerR + radiusR * Math.sin(angle))
    const c = Math.round(centerC + radiusC * Math.cos(angle))
    const key = `${r},${c}`
    if (!seen.has(key)) { seen.add(key); pts.push([r, c]) }
  }
  return pts
}

function getShapePoints(
  r0: number, c0: number, r1: number, c1: number, shape: ShapeType
): [number, number][] {
  switch (shape) {
    case 'line': return linePoints(r0, c0, r1, c1)
    case 'rect': return rectPoints(r0, c0, r1, c1)
    case 'circle': return circlePoints(r0, c0, r1, c1)
  }
}

// ── component ──────────────────────────────────────────────────────────────

export function Canvas({ state, dispatch, activeGrid, isPreviewMode }: CanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const isDragging = useRef(false)
  const dragMode = useRef<boolean | null>(null)
  const shapeStartRef = useRef<{ row: number; col: number } | null>(null)
  const shapePreviewRef = useRef<[number, number][]>([])
  const [shapePreviewTick, setShapePreviewTick] = useState(0)

  const { rows, cols, dotColor, activeTool, activeShape } = state

  // Triggers a re-render when shape preview changes
  const updateShapePreview = useCallback((pts: [number, number][]) => {
    shapePreviewRef.current = pts
    setShapePreviewTick(t => t + 1)
  }, [])

  const applyDraw = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return
    const { row, col } = getGridCoords({ clientX, clientY }, svgRef.current)
    if (row < 0 || row >= rows || col < 0 || col >= cols) return
    if (activeTool === 'pencil') {
      dispatch({ type: 'SET_DOT', row, col, value: dragMode.current ?? true })
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
    const { row, col } = getGridCoords(e, svgRef.current)

    if (activeTool === 'pencil') {
      const filled = activeGrid[row]?.[col] ?? false
      dragMode.current = !filled
      dispatch({ type: 'SET_DOT', row, col, value: !filled })
    } else if (activeTool === 'eraser') {
      dragMode.current = false
      dispatch({ type: 'SET_DOT', row, col, value: false })
    } else if (activeTool === 'select') {
      dispatch({ type: 'SET_SELECTION', selection: { startRow: row, startCol: col, endRow: row, endCol: col } })
    } else if (activeTool === 'shapes') {
      shapeStartRef.current = { row, col }
      const pts = getShapePoints(row, col, row, col, activeShape)
      updateShapePreview(pts)
    }
  }, [activeTool, activeShape, activeGrid, rows, cols, dispatch, isPreviewMode, updateShapePreview])

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging.current || isPreviewMode) return
    if (!svgRef.current) return
    const { row, col } = getGridCoords(e, svgRef.current)
    const clampedRow = Math.max(0, Math.min(rows - 1, row))
    const clampedCol = Math.max(0, Math.min(cols - 1, col))

    if (activeTool === 'pencil' || activeTool === 'eraser') {
      applyDraw(e.clientX, e.clientY)
    } else if (activeTool === 'select' && svgRef.current) {
      if (state.selection) {
        dispatch({ type: 'SET_SELECTION', selection: { ...state.selection, endRow: clampedRow, endCol: clampedCol } })
      }
    } else if (activeTool === 'shapes' && shapeStartRef.current) {
      const { row: r0, col: c0 } = shapeStartRef.current
      const pts = getShapePoints(r0, c0, clampedRow, clampedCol, activeShape)
      updateShapePreview(pts)
    }
  }, [activeTool, activeShape, applyDraw, rows, cols, state.selection, dispatch, isPreviewMode, updateShapePreview])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
    dragMode.current = null

    if (activeTool === 'shapes' && shapeStartRef.current) {
      const pts = shapePreviewRef.current
      if (pts.length > 0) {
        dispatch({
          type: 'SET_DOTS',
          dots: pts.map(([r, c]) => ({ row: r, col: c, value: true })),
        })
      }
      shapeStartRef.current = null
      updateShapePreview([])
    }
  }, [activeTool, dispatch, updateShapePreview])

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
    : activeTool === 'shapes' ? 'crosshair'
    : 'crosshair'

  // Merge activeGrid + shape preview into a Set for fast lookup
  const previewSet = new Set(
    shapePreviewRef.current.map(([r, c]) => `${r},${c}`)
  )

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

        {activeGrid.map((rowArr, r) =>
          rowArr.map((filled, c) => {
            const isPreviewed = previewSet.has(`${r},${c}`)
            const isLit = filled || isPreviewed
            return (
              <circle
                key={`${r}-${c}`}
                cx={c + 0.5}
                cy={r + 0.5}
                r={0.38}
                fill={isLit ? dotColor : 'var(--studio-dot-empty)'}
                stroke={isLit ? undefined : 'var(--studio-dot-empty-border)'}
                strokeWidth={isLit ? 0 : 0.03}
                opacity={isPreviewed && !filled ? 0.55 : 1}
                filter={filled ? 'url(#glow)' : undefined}
              />
            )
          })
        )}

        {selRect && (
          <rect
            x={selRect.x}
            y={selRect.y}
            width={selRect.w}
            height={selRect.h}
            fill="rgba(91,79,207,0.1)"
            stroke="#5b4fcf"
            strokeWidth={0.06}
            strokeDasharray="0.2 0.1"
          />
        )}
      </svg>
      {/* suppress unused var warning — shapePreviewTick is read to force re-render */}
      <span style={{ display: 'none' }}>{shapePreviewTick}</span>
      {activeTool === 'select' && state.selection && !isPreviewMode && (
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-row gap-2 z-10"
        >
          {(['Fill', 'Clear', 'Invert'] as const).map((label) => (
            <button
              key={label}
              onClick={() => dispatch({ type: `${label.toUpperCase()}_SELECTION` as 'FILL_SELECTION' | 'CLEAR_SELECTION' | 'INVERT_SELECTION' })}
              className="px-3 py-1 text-xs tracking-widest uppercase"
              style={{
                border: `2px solid ${C.border}`,
                color: C.text,
                background: C.panel,
                fontFamily: 'var(--studio-font)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.tint }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.panel }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
