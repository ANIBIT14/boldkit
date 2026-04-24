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
import { C } from '@/components/DotMatrixStudio/lib/studioTheme'
import { SEO, pageSEO } from '@/components/SEO'
import '@/styles/dot-matrix-studio.css'

type PendingConfirm =
  | { type: 'gridChange'; rows: number; cols: number }
  | { type: 'reset' }
  | null

const TOOLS_SIDEBAR_W = 240
const ANIM_SIDEBAR_W  = 300

function SidebarHeader({ label, onClose }: { label: string; onClose: () => void }) {
  const sFont = { fontFamily: 'var(--studio-font)' }
  return (
    <div className="flex items-center justify-between px-3 py-2 shrink-0" style={{ background: C.border, ...sFont }}>
      <div className="flex items-center gap-2">
        <span className="text-[9px] tracking-[0.3em] uppercase font-bold" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Studio
        </span>
        <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.35)' }}>/</span>
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: '#ffffff' }}>
          {label}
        </span>
      </div>
      <button
        onClick={onClose}
        className="w-7 h-7 flex items-center justify-center text-base font-bold hover:opacity-70 transition-opacity"
        style={{ border: '2px solid rgba(255,255,255,0.35)', color: '#ffffff' }}
        aria-label={`Close ${label} panel`}
      >
        ×
      </button>
    </div>
  )
}

export function DotMatrixStudio() {
  const { state, dispatch, activeFrame } = useStudioState()
  const { textToGrid } = useTextTool(state.rows, state.cols)
  const [showExport, setShowExport] = useState(false)
  const [toolsSidebarOpen, setToolsSidebarOpen] = useState(false)
  const [animSidebarOpen, setAnimSidebarOpen]   = useState(false)
  const [textInput, setTextInput] = useState('')
  const [showTour, setShowTour]   = useState(shouldShowTour)
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const closeAllPanels = () => { setToolsSidebarOpen(false); setAnimSidebarOpen(false) }
  const anyPanelOpen = toolsSidebarOpen || animSidebarOpen

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
  const confirmDesc  = pendingConfirm?.type === 'reset'
    ? 'This will clear all frames and settings and start fresh. This cannot be undone.'
    : 'Changing the grid size will clear all frames. Your current artwork will be lost.'
  const confirmLabel = pendingConfirm?.type === 'reset' ? 'Reset' : 'Change size'

  return (
    <>
    <SEO {...pageSEO.studio} />
    <div className="studio-root studio-ghost-grid" style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden' }}>

      {/* ── Top bar ──────────────────────────────────────────────── */}
      <header
        className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{ background: C.panel, borderBottom: `3px solid ${C.border}`, ...sFont }}
      >
        {/* Left — branding + Tools toggle on tablet */}
        <div className="flex items-center gap-3">
          {/* Tools toggle — tablet only (md–lg). Mobile uses floating button. */}
          <button
            onClick={() => setToolsSidebarOpen(true)}
            className="hidden md:flex lg:hidden items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
            style={{ border: `2px solid ${C.border}`, color: C.border, background: 'transparent', ...sFont }}
            aria-label="Open tools panel"
          >
            ◁ Tools
          </button>

          <Link to="/" className="text-xs hover:opacity-70 transition-opacity" style={{ color: C.muted, ...sFont }}>
            ← BoldKit
          </Link>
          <span className="hidden sm:inline text-xs tracking-[0.3em] uppercase font-bold" style={{ color: C.text, ...sFont }}>
            Dot Matrix Studio
          </span>
          <span
            className="hidden sm:inline px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
            style={{ background: C.border, color: '#ffffff', ...sFont }}
          >
            Beta
          </span>
        </div>

        {/* Right — actions + Animate toggle on tablet */}
        <div className="flex items-center gap-2">
          {/* Animate toggle — tablet only (md–lg). Mobile uses floating button. */}
          <button
            onClick={() => setAnimSidebarOpen(true)}
            className="hidden md:flex lg:hidden items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
            style={{ border: `2px solid ${C.border}`, color: C.border, background: 'transparent', ...sFont }}
            aria-label="Open animation panel"
          >
            Animate ▷
          </button>

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
            className="hidden sm:flex px-3 py-1 text-xs hover:opacity-80 transition-opacity"
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

      {/* ── Text tool bar ─────────────────────────────────────────── */}
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

      {/* ── Main area — canvas fills the full viewport height ─────── */}
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
          className="hidden lg:flex flex-col w-72 shrink-0 overflow-hidden"
          style={{ background: C.panel, borderLeft: `3px solid ${C.border}` }}
        >
          <AnimationPanel state={state} dispatch={dispatch} activeGrid={activeFrame.grid} />
        </aside>
      </div>

      {/* ── MOBILE floating buttons (< md) ───────────────────────── */}
      {/* Compact drawing tool selector — centered */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
        <Toolbar state={state} dispatch={dispatch} mobile />
      </div>
      {/* Tools panel toggle — bottom-left */}
      <button
        onClick={() => setToolsSidebarOpen(true)}
        className="md:hidden fixed bottom-4 left-4 z-30 w-10 h-10 flex items-center justify-center text-sm font-bold hover:opacity-90 transition-opacity"
        style={{ border: `3px solid ${C.border}`, background: C.panel, color: C.border, ...sFont }}
        aria-label="Open tools panel"
      >
        ◁
      </button>
      {/* Animate panel toggle — bottom-right */}
      <button
        onClick={() => setAnimSidebarOpen(true)}
        className="md:hidden fixed bottom-4 right-4 z-30 w-10 h-10 flex items-center justify-center text-sm font-bold hover:opacity-90 transition-opacity"
        style={{ border: `3px solid ${C.border}`, background: C.panel, color: C.border, ...sFont }}
        aria-label="Open animation panel"
      >
        ▷
      </button>

      {/* ── SHARED BACKDROP — covers canvas when either panel is open ── */}
      <div
        className="lg:hidden fixed inset-0 z-40"
        style={{
          background: 'rgba(45,36,99,0.45)',
          opacity: anyPanelOpen ? 1 : 0,
          pointerEvents: anyPanelOpen ? 'auto' : 'none',
          transition: 'opacity 260ms ease',
        }}
        onClick={closeAllPanels}
        aria-hidden="true"
      />

      {/* ── LEFT SLIDING SIDEBAR — Tools (non-desktop) ────────────── */}
      <aside
        className="lg:hidden fixed top-0 left-0 bottom-0 z-50 flex flex-col"
        style={{
          width: TOOLS_SIDEBAR_W,
          background: C.panel,
          borderRight: `3px solid ${C.border}`,
          transform: toolsSidebarOpen ? 'translateX(0)' : `translateX(-${TOOLS_SIDEBAR_W}px)`,
          transition: 'transform 260ms cubic-bezier(0.4, 0, 0.15, 1)',
          boxShadow: toolsSidebarOpen ? `8px 0 0 0 ${C.border}` : 'none',
        }}
        aria-label="Tools panel"
      >
        <SidebarHeader label="Tools" onClose={() => setToolsSidebarOpen(false)} />
        <div className="flex-1 overflow-y-auto">
          <Toolbar state={state} dispatch={dispatch} />
          <CanvasSettings state={state} dispatch={dispatch} onGridChangeRequest={requestGridChange} />
        </div>
      </aside>

      {/* ── RIGHT SLIDING SIDEBAR — Animation (non-desktop) ──────── */}
      <aside
        className="lg:hidden fixed top-0 right-0 bottom-0 z-50 flex flex-col"
        style={{
          width: ANIM_SIDEBAR_W,
          background: C.panel,
          borderLeft: `3px solid ${C.border}`,
          transform: animSidebarOpen ? 'translateX(0)' : `translateX(${ANIM_SIDEBAR_W}px)`,
          transition: 'transform 260ms cubic-bezier(0.4, 0, 0.15, 1)',
          boxShadow: animSidebarOpen ? `-8px 0 0 0 ${C.border}` : 'none',
        }}
        aria-label="Animation panel"
      >
        <SidebarHeader label="Animation" onClose={() => setAnimSidebarOpen(false)} />
        <div className="flex-1 overflow-hidden">
          <AnimationPanel state={state} dispatch={dispatch} activeGrid={activeFrame.grid} />
        </div>
      </aside>

      {/* ── Modals & dialogs ──────────────────────────────────────── */}
      {showExport && <ExportModal state={state} onClose={() => setShowExport(false)} />}
      {showTour && <GuidedTour onDone={() => setShowTour(false)} />}

      <ConfirmDialog
        open={!!pendingConfirm}
        title={confirmTitle}
        description={confirmDesc}
        confirmLabel={confirmLabel}
        onConfirm={handleConfirm}
        onCancel={() => setPendingConfirm(null)}
        destructive
      />

      <NoticeDialog
        open={!!errorMsg}
        title="Invalid file"
        description={errorMsg ?? ''}
        onClose={() => setErrorMsg(null)}
      />
    </div>
    </>
  )
}
