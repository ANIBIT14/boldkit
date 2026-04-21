import { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStudioState } from '@/components/DotMatrixStudio/hooks/useStudioState'
import { useTextTool } from '@/components/DotMatrixStudio/hooks/useTextTool'
import { Canvas } from '@/components/DotMatrixStudio/Canvas'
import { Toolbar } from '@/components/DotMatrixStudio/Toolbar'
import { CanvasSettings } from '@/components/DotMatrixStudio/CanvasSettings'
import { AnimationPanel } from '@/components/DotMatrixStudio/AnimationPanel'
import { ExportModal } from '@/components/DotMatrixStudio/ExportModal'
import '@/styles/dot-matrix-studio.css'

export function DotMatrixStudio() {
  const { state, dispatch, activeFrame } = useStudioState()
  const { textToGrid } = useTextTool(state.rows, state.cols)
  const [showExport, setShowExport] = useState(false)
  const [showMobilePanel, setShowMobilePanel] = useState<'tools' | 'animate' | null>(null)
  const [textInput, setTextInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Displayed grid: during playback show playFrameIndex, else active frame
  const displayGrid = state.isPlaying
    ? (state.frames[state.playFrameIndex]?.grid ?? activeFrame.grid)
    : activeFrame.grid

  // Grid size change with confirmation if non-empty
  const requestGridChange = useCallback((rows: number, cols: number) => {
    const hasContent = state.frames.some(f => f.grid.some(r => r.some(Boolean)))
    if (hasContent) {
      if (!window.confirm('Changing grid size will clear all frames. Continue?')) return
    }
    dispatch({ type: 'CHANGE_GRID_SIZE', rows, cols })
  }, [state.frames, dispatch])

  // Text tool submit
  const applyText = useCallback(() => {
    if (!textInput.trim()) return
    const grid = textToGrid(textInput)
    dispatch({ type: 'APPLY_GRID', grid })
    setTextInput('')
  }, [textInput, textToGrid, dispatch])

  // JSON re-import from file input
  const handleImportFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        if (!data.frames || !data.rows || !data.cols) throw new Error('Invalid file')
        dispatch({ type: 'IMPORT', frames: data.frames, rows: data.rows, cols: data.cols, dotColor: data.dotColor ?? '#E8FF00', bgTransparent: data.bgTransparent ?? false })
      } catch {
        alert('Invalid .boldkit.json file')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }, [dispatch])

  // Drag-drop JSON import
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file?.name.endsWith('.boldkit.json') && !file?.name.endsWith('.json')) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        if (!data.frames || !data.rows || !data.cols) throw new Error()
        dispatch({ type: 'IMPORT', frames: data.frames, rows: data.rows, cols: data.cols, dotColor: data.dotColor ?? '#E8FF00', bgTransparent: data.bgTransparent ?? false })
      } catch { alert('Invalid .boldkit.json file') }
    }
    reader.readAsText(file)
  }, [dispatch])

  const isEmpty = !state.frames.some(f => f.grid.some(r => r.some(Boolean)))
  const sFont = { fontFamily: 'var(--studio-font)' }

  return (
    <div className="studio-root studio-ghost-grid" style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden' }}>

      {/* Top bar */}
      <header
        className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{ background: 'var(--studio-panel)', borderBottom: '3px solid var(--studio-border)', ...sFont }}
      >
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xs hover:opacity-70" style={{ color: 'var(--studio-text-muted)', ...sFont }}>
            ← BoldKit
          </Link>
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--studio-text)', ...sFont }}>
            Dot Matrix Studio
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportFile} className="hidden" aria-label="Import file" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1 text-xs hover:opacity-80"
            style={{ border: '1px solid var(--studio-border)', background: 'transparent', color: 'var(--studio-text)', ...sFont }}
          >
            Import
          </button>
          <button
            onClick={() => setShowExport(true)}
            className="px-3 py-1 text-xs"
            style={{ border: '3px solid var(--studio-border)', background: 'var(--studio-border)', color: '#000', fontWeight: 700, ...sFont }}
          >
            Export
          </button>
        </div>
      </header>

      {/* Text tool input bar */}
      {state.activeTool === 'text' && (
        <div
          className="flex items-center gap-2 px-4 py-2 shrink-0"
          style={{ background: '#0d0d0d', borderBottom: '1px solid var(--studio-border)', ...sFont }}
        >
          <span className="text-[9px] uppercase tracking-widest" style={{ color: 'var(--studio-text-muted)' }}>Text →</span>
          <input
            autoFocus
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') applyText() }}
            placeholder="Type and press Enter…"
            className="flex-1 bg-transparent text-sm px-1 py-0.5 focus:outline-none"
            style={{ borderBottom: '1px solid var(--studio-border)', color: 'var(--studio-text)', fontFamily: 'NDot47, var(--studio-font)', letterSpacing: '0.05em' }}
          />
          <button
            onClick={applyText}
            className="px-3 py-1 text-xs"
            style={{ border: '1px solid var(--studio-border)', color: 'var(--studio-text)', background: 'transparent', ...sFont }}
          >
            Apply
          </button>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 min-h-0 flex overflow-hidden">

        {/* LEFT PANEL — desktop only (≥1024px) */}
        <aside
          className="hidden lg:flex flex-col w-44 shrink-0 overflow-y-auto"
          style={{ background: 'var(--studio-panel)', borderRight: '3px solid var(--studio-border)' }}
        >
          <Toolbar state={state} dispatch={dispatch} />
          <CanvasSettings state={state} dispatch={dispatch} onGridChangeRequest={requestGridChange} />
        </aside>

        {/* CENTER — canvas */}
        <main
          className="flex-1 min-w-0 flex items-center justify-center p-4 relative"
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
        >
          {/* Drop zone hint when empty */}
          {isEmpty && (
            <div
              className="absolute inset-4 flex items-center justify-center pointer-events-none z-10"
              style={{ border: '2px dashed var(--studio-text-muted)' }}
            >
              <p className="text-[10px] uppercase tracking-widest text-center" style={{ color: 'var(--studio-text-muted)', ...sFont }}>
                Drop .boldkit.json to import<br/>or start drawing
              </p>
            </div>
          )}

          <div
            className="w-full h-full"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              aspectRatio: `${state.cols} / ${state.rows}`,
              position: 'relative',
            }}
          >
            <Canvas
              state={state}
              dispatch={dispatch}
              activeGrid={displayGrid}
              isPreviewMode={state.isPlaying}
            />
          </div>
        </main>

        {/* RIGHT PANEL — desktop only (≥1024px) */}
        <aside
          className="hidden lg:flex flex-col w-52 shrink-0 overflow-hidden"
          style={{ background: 'var(--studio-panel)', borderLeft: '3px solid var(--studio-border)' }}
        >
          <AnimationPanel state={state} dispatch={dispatch} activeGrid={activeFrame.grid} />
        </aside>
      </div>

      {/* TABLET PANEL — 768px–1023px */}
      <div
        className="hidden md:flex lg:hidden flex-col shrink-0 h-48 overflow-hidden"
        style={{ background: 'var(--studio-panel)', borderTop: '3px solid var(--studio-border)' }}
      >
        <div style={{ display: 'flex', borderBottom: '1px solid var(--studio-border)' }}>
          {(['tools', 'animate'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setShowMobilePanel(showMobilePanel === tab ? null : tab)}
              className="flex-1 py-2 text-[10px] uppercase tracking-widest"
              style={{
                borderRight: '1px solid var(--studio-border)',
                background: showMobilePanel === tab ? 'var(--studio-border)' : 'transparent',
                color: showMobilePanel === tab ? '#000' : 'var(--studio-text)',
                ...sFont,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-auto flex">
          {showMobilePanel === 'tools' && (
            <div className="flex flex-row gap-4 p-3 w-full overflow-auto">
              <div className="flex-1"><Toolbar state={state} dispatch={dispatch} /></div>
              <div className="flex-1"><CanvasSettings state={state} dispatch={dispatch} onGridChangeRequest={requestGridChange} /></div>
            </div>
          )}
          {showMobilePanel === 'animate' && (
            <div className="flex-1 overflow-hidden">
              <AnimationPanel state={state} dispatch={dispatch} activeGrid={activeFrame.grid} />
            </div>
          )}
        </div>
      </div>

      {/* MOBILE floating toolbar — <768px */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <Toolbar state={state} dispatch={dispatch} mobile />
      </div>

      {/* Export modal */}
      {showExport && (
        <ExportModal state={state} onClose={() => setShowExport(false)} />
      )}
    </div>
  )
}
