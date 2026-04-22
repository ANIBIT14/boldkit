import { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStudioState } from '@/components/DotMatrixStudio/hooks/useStudioState'
import { useTextTool } from '@/components/DotMatrixStudio/hooks/useTextTool'
import { Canvas } from '@/components/DotMatrixStudio/Canvas'
import { Toolbar } from '@/components/DotMatrixStudio/Toolbar'
import { CanvasSettings } from '@/components/DotMatrixStudio/CanvasSettings'
import { AnimationPanel } from '@/components/DotMatrixStudio/AnimationPanel'
import { ExportModal } from '@/components/DotMatrixStudio/ExportModal'
import { GuidedTour, shouldShowTour } from '@/components/DotMatrixStudio/GuidedTour'
import { ConfirmDialog, NoticeDialog } from '@/components/DotMatrixStudio/ConfirmDialog'
import '@/styles/dot-matrix-studio.css'

type PendingConfirm =
  | { type: 'gridChange'; rows: number; cols: number }
  | { type: 'reset' }
  | null

const C = {
  border:  '#5b4fcf',
  text:    '#2d2463',
  muted:   '#9b94d4',
  subtle:  '#c4bef5',
  faint:   '#dddaf7',
  panel:   '#ffffff',
}

export function DotMatrixStudio() {
  const { state, dispatch, activeFrame } = useStudioState()
  const { textToGrid } = useTextTool(state.rows, state.cols)
  const [showExport, setShowExport] = useState(false)
  const [showMobilePanel, setShowMobilePanel] = useState<'tools' | 'animate' | null>(null)
  const [textInput, setTextInput] = useState('')
  const [showTour, setShowTour] = useState(shouldShowTour)
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const displayGrid = state.isPlaying
    ? (state.frames[state.playFrameIndex]?.grid ?? activeFrame.grid)
    : activeFrame.grid

  const requestGridChange = useCallback((rows: number, cols: number) => {
    const hasContent = state.frames.some(f => f.grid.some(r => r.some(Boolean)))
    if (hasContent) {
      setPendingConfirm({ type: 'gridChange', rows, cols })
    } else {
      dispatch({ type: 'CHANGE_GRID_SIZE', rows, cols })
    }
  }, [state.frames, dispatch])

  const handleReset = useCallback(() => {
    setPendingConfirm({ type: 'reset' })
  }, [])

  const handleConfirm = useCallback(() => {
    if (!pendingConfirm) return
    if (pendingConfirm.type === 'gridChange') {
      dispatch({ type: 'CHANGE_GRID_SIZE', rows: pendingConfirm.rows, cols: pendingConfirm.cols })
    } else if (pendingConfirm.type === 'reset') {
      dispatch({ type: 'RESET' })
    }
    setPendingConfirm(null)
  }, [pendingConfirm, dispatch])

  const applyText = useCallback(() => {
    if (!textInput.trim()) return
    const grid = textToGrid(textInput)
    dispatch({ type: 'APPLY_GRID', grid })
    setTextInput('')
  }, [textInput, textToGrid, dispatch])

  const handleImportFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        if (!data.frames || !data.rows || !data.cols) throw new Error('Invalid file')
        dispatch({ type: 'IMPORT', frames: data.frames, rows: data.rows, cols: data.cols, dotColor: data.dotColor ?? '#5b4fcf', bgTransparent: data.bgTransparent ?? false })
      } catch {
        setErrorMsg('This file is not a valid .boldkit.json — make sure you exported it from Dot Matrix Studio.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }, [dispatch])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file?.name.endsWith('.boldkit.json') && !file?.name.endsWith('.json')) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        if (!data.frames || !data.rows || !data.cols) throw new Error()
        dispatch({ type: 'IMPORT', frames: data.frames, rows: data.rows, cols: data.cols, dotColor: data.dotColor ?? '#5b4fcf', bgTransparent: data.bgTransparent ?? false })
      } catch {
        setErrorMsg('This file is not a valid .boldkit.json — make sure you exported it from Dot Matrix Studio.')
      }
    }
    reader.readAsText(file)
  }, [dispatch])

  const isEmpty = !state.frames.some(f => f.grid.some(r => r.some(Boolean)))
  const sFont = { fontFamily: 'var(--studio-font)' }

  const confirmTitle = pendingConfirm?.type === 'reset' ? 'Reset everything?' : 'Change grid size?'
  const confirmDesc = pendingConfirm?.type === 'reset'
    ? 'This will clear all frames and settings and start fresh. This cannot be undone.'
    : 'Changing the grid size will clear all frames. Your current artwork will be lost.'
  const confirmLabel = pendingConfirm?.type === 'reset' ? 'Reset' : 'Change size'

  return (
    <div className="studio-root studio-ghost-grid" style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden' }}>

      {/* Top bar */}
      <header
        className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{ background: C.panel, borderBottom: `3px solid ${C.border}`, ...sFont }}
      >
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xs hover:opacity-70 transition-opacity" style={{ color: C.muted, ...sFont }}>
            ← BoldKit
          </Link>
          <span className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: C.text, ...sFont }}>
            Dot Matrix Studio
          </span>
          <span
            className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
            style={{ background: C.border, color: '#ffffff', ...sFont }}
          >
            Beta
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTour(true)}
            title="Show guided tour"
            aria-label="Show guided tour"
            className="w-7 h-7 flex items-center justify-center text-xs hover:opacity-80 transition-opacity"
            style={{ border: `1px solid ${C.subtle}`, background: 'transparent', color: C.muted, ...sFont }}
          >
            ?
          </button>
          <button
            onClick={handleReset}
            title="Reset everything"
            aria-label="Reset everything"
            className="w-7 h-7 flex items-center justify-center text-sm hover:opacity-80 transition-opacity"
            style={{ border: `1px solid ${C.subtle}`, background: 'transparent', color: C.muted, ...sFont }}
          >
            ↺
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportFile} className="hidden" aria-label="Import file" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1 text-xs hover:opacity-80 transition-opacity"
            style={{ border: `1px solid ${C.border}`, background: 'transparent', color: C.text, ...sFont }}
          >
            Import
          </button>
          <button
            onClick={() => setShowExport(true)}
            className="px-3 py-1 text-xs font-bold"
            style={{ border: `3px solid ${C.border}`, background: C.border, color: '#ffffff', ...sFont }}
          >
            Export
          </button>
        </div>
      </header>

      {/* Text tool input bar */}
      {state.activeTool === 'text' && (
        <div
          className="flex items-center gap-2 px-4 py-2 shrink-0"
          style={{ background: C.panel, borderBottom: `1px solid ${C.border}`, ...sFont }}
        >
          <span className="text-[9px] uppercase tracking-widest" style={{ color: C.muted }}>Text →</span>
          <input
            autoFocus
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') applyText() }}
            placeholder="Type and press Enter…"
            className="flex-1 bg-transparent text-sm px-1 py-0.5 focus:outline-none placeholder:text-[#9b94d4]"
            style={{ borderBottom: `1px solid ${C.border}`, color: C.text, fontFamily: 'NDot47, var(--studio-font)', letterSpacing: '0.05em' }}
          />
          <button
            onClick={applyText}
            className="px-3 py-1 text-xs hover:opacity-80 transition-opacity"
            style={{ border: `1px solid ${C.border}`, color: C.text, background: 'transparent', ...sFont }}
          >
            Apply
          </button>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 min-h-0 flex overflow-hidden">

        {/* LEFT PANEL — desktop only (≥1024px) */}
        <aside
          className="hidden lg:flex flex-col w-52 shrink-0 overflow-y-auto"
          style={{ background: C.panel, borderRight: `3px solid ${C.border}` }}
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
          {isEmpty && (
            <div
              className="absolute inset-4 flex items-center justify-center pointer-events-none z-10"
              style={{ border: `2px dashed ${C.subtle}` }}
            >
              <p className="text-[10px] uppercase tracking-widest text-center" style={{ color: C.muted, ...sFont }}>
                Drop .boldkit.json to import<br/>or start drawing
              </p>
            </div>
          )}
          <div
            style={{
              width: '100%',
              height: '100%',
              maxWidth: `min(${Math.round(state.cols * 20)}px, 100%)`,
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
          className="hidden lg:flex flex-col w-56 shrink-0 overflow-hidden"
          style={{ background: C.panel, borderLeft: `3px solid ${C.border}` }}
        >
          <AnimationPanel state={state} dispatch={dispatch} activeGrid={activeFrame.grid} />
        </aside>
      </div>

      {/* TABLET PANEL */}
      <div
        className="hidden md:flex lg:hidden flex-col shrink-0 h-48 overflow-hidden"
        style={{ background: C.panel, borderTop: `3px solid ${C.border}` }}
      >
        <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>
          {(['tools', 'animate'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setShowMobilePanel(showMobilePanel === tab ? null : tab)}
              className="flex-1 py-2 text-[10px] uppercase tracking-widest"
              style={{
                borderRight: `1px solid ${C.border}`,
                background: showMobilePanel === tab ? C.border : 'transparent',
                color: showMobilePanel === tab ? '#ffffff' : C.muted,
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

      {/* MOBILE floating toolbar */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <Toolbar state={state} dispatch={dispatch} mobile />
      </div>

      {/* Export modal */}
      {showExport && <ExportModal state={state} onClose={() => setShowExport(false)} />}

      {/* Guided tour */}
      {showTour && <GuidedTour onDone={() => setShowTour(false)} />}

      {/* Confirmation dialog */}
      <ConfirmDialog
        open={!!pendingConfirm}
        title={confirmTitle}
        description={confirmDesc}
        confirmLabel={confirmLabel}
        onConfirm={handleConfirm}
        onCancel={() => setPendingConfirm(null)}
        destructive
      />

      {/* Error / notice dialog */}
      <NoticeDialog
        open={!!errorMsg}
        title="Invalid file"
        description={errorMsg ?? ''}
        onClose={() => setErrorMsg(null)}
      />
    </div>
  )
}
