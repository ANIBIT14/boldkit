import { useState } from 'react'
import { C } from './lib/studioTheme'

const TOUR_KEY = 'studio-tour-done-v1'

interface Step {
  title: string
  body: string
  icon: string
}

const STEPS: Step[] = [
  {
    icon: '◉',
    title: 'Welcome to Dot Matrix Studio',
    body: 'Design and animate dot-grid art inspired by Nothing Phone\'s iconic display. Your work is auto-saved — come back any time and pick up where you left off.',
  },
  {
    icon: '✏',
    title: 'Drawing Tools (Left Panel)',
    body: 'Pencil (P) — click or drag to fill dots. Smart toggle: if you start on a filled dot, dragging erases instead.\n\nEraser (E) — drag to clear dots.\n\nText (T) — type in the bar that appears at the top, press Enter to stamp text using the NDot 47 font.\n\nUndo / Redo: ⌘Z / ⌘⇧Z.',
  },
  {
    icon: '□',
    title: 'Shapes Tool (S)',
    body: 'Press S or click Shapes in the left panel.\n\nChoose a shape below the tool buttons: Line, Rectangle, or Circle.\n\nThen click and drag on the canvas — a live preview appears as you drag. Release to commit the shape.',
  },
  {
    icon: '▶',
    title: 'Animation (Right Panel)',
    body: 'Add frames with + Blank or + Dupe. Click a frame to edit it.\n\nPresets auto-generate animation sequences from your current art (Blink, Typewriter, Scan Line, etc.).\n\nUse the FPS slider and loop mode to control playback.',
  },
  {
    icon: '⬇',
    title: 'Export & Reset',
    body: 'Click Export (top right) to download as Video (WebM), PNG, SVG, or JSON.\n\nImport a .boldkit.json to restore a previous session.\n\nReset (↺ in the header) clears everything and starts fresh.',
  },
]

interface GuidedTourProps {
  onDone: () => void
}

export function GuidedTour({ onDone }: GuidedTourProps) {
  const [step, setStep] = useState(0)
  const sFont = { fontFamily: 'var(--studio-font)' }
  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  const handleDone = () => {
    try { localStorage.setItem(TOUR_KEY, '1') } catch { /* ok */ }
    onDone()
  }

  return (
    <div className="studio-tour-backdrop" onClick={handleDone} aria-modal="true" role="dialog" aria-label="Guided tour">
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.panel,
          border: `3px solid ${C.border}`,
          boxShadow: C.shadow,
          width: 'min(480px, 90vw)',
          padding: '32px',
          position: 'relative',
          ...sFont,
        }}
      >
        {/* Step counter */}
        <div className="flex items-center gap-1.5 mb-6">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Go to step ${i + 1}`}
              style={{
                width: i === step ? '24px' : '8px',
                height: '8px',
                background: i === step ? C.border : C.faint,
                border: 'none',
                cursor: 'pointer',
                transition: 'width 200ms, background 200ms',
              }}
            />
          ))}
          <span className="ml-auto text-[10px]" style={{ color: C.muted, ...sFont }}>
            {step + 1} / {STEPS.length}
          </span>
        </div>

        {/* Icon */}
        <div className="text-5xl mb-4" style={{ color: C.border, lineHeight: 1 }}>
          {current.icon}
        </div>

        {/* Title */}
        <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: C.text, ...sFont }}>
          {current.title}
        </h2>

        {/* Body */}
        <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: C.muted, ...sFont }}>
          {current.body}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="px-4 py-2 text-xs"
              style={{ border: `1px solid ${C.border}`, background: 'transparent', color: C.text, cursor: 'pointer', ...sFont }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleDone}
            className="px-4 py-2 text-xs"
            style={{ border: `1px solid ${C.subtle}`, background: 'transparent', color: C.muted, cursor: 'pointer', marginRight: 'auto', ...sFont }}
          >
            Skip tour
          </button>
          <button
            onClick={isLast ? handleDone : () => setStep(s => s + 1)}
            className="px-6 py-2 text-xs font-bold"
            style={{ border: `3px solid ${C.border}`, background: C.border, color: '#ffffff', cursor: 'pointer', ...sFont }}
          >
            {isLast ? 'Start creating →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function shouldShowTour(): boolean {
  try { return !localStorage.getItem(TOUR_KEY) } catch { return false }
}
