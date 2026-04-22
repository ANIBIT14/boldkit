import { useEffect, useRef, useState } from 'react'
import type { StudioState, Frame } from './types'
import type { StudioAction } from './hooks/useStudioState'
import { applyBlink, applyTypewriter, applyScanLine, applyMarquee, applyRipple } from './lib/presets'
import { cn } from '@/lib/utils'

interface AnimationPanelProps {
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
  activeGrid: boolean[][]
}

interface PresetOption {
  id: string
  label: string
  icon: string
  desc: string
}

const PRESET_OPTIONS: PresetOption[] = [
  { id: 'blink',      label: 'Blink',       icon: '◉', desc: 'Art ↔ blank, 2 frames' },
  { id: 'typewriter', label: 'Typewriter',   icon: '▶', desc: 'Reveal col by col' },
  { id: 'scanline',   label: 'Scan Line',    icon: '▬', desc: 'Sweep row by row' },
  { id: 'marquee',    label: 'Marquee',      icon: '↔', desc: 'Scroll & wrap' },
  { id: 'ripple',     label: 'Ripple',       icon: '◎', desc: 'Reveal from center' },
]

export function AnimationPanel({ state, dispatch, activeGrid }: AnimationPanelProps) {
  const { frames, activeFrameId, isPlaying, fps, loopMode } = state
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

  // ── Playback ───────────────────────────────────────────────────────────
  // Use refs so the interval tick always sees the latest values without
  // needing to restart the interval on every frames/fps change.
  const framesRef = useRef(frames)
  const fpsRef = useRef(fps)
  const loopModeRef = useRef(loopMode)
  const isPlayingRef = useRef(isPlaying)
  framesRef.current = frames
  fpsRef.current = fps
  loopModeRef.current = loopMode
  isPlayingRef.current = isPlaying

  const tickIdxRef = useRef(0)
  const loopCountRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopInterval = () => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }

  useEffect(() => {
    if (!isPlaying) { stopInterval(); return }

    tickIdxRef.current = 0
    loopCountRef.current = 0

    const tick = () => {
      const currentFrames = framesRef.current
      if (!currentFrames.length) return

      const idx = tickIdxRef.current
      dispatch({ type: 'SET_PLAY_FRAME', index: idx })
      const nextIdx = (idx + 1) % currentFrames.length
      tickIdxRef.current = nextIdx

      // Loop counting
      if (nextIdx === 0) {
        loopCountRef.current++
        const mode = loopModeRef.current
        if (mode === 'once' && loopCountRef.current >= 1) {
          dispatch({ type: 'SET_PLAYING', playing: false })
          stopInterval()
        } else if (mode === '3x' && loopCountRef.current >= 3) {
          dispatch({ type: 'SET_PLAYING', playing: false })
          stopInterval()
        }
      }
    }

    // Start immediately then repeat
    tick()
    intervalRef.current = setInterval(tick, 1000 / fps)
    return stopInterval
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, fps, dispatch])

  // ── Presets ────────────────────────────────────────────────────────────
  const buildPresetFrames = (presetId: string): Frame[] => {
    const { rows, cols } = state
    switch (presetId) {
      case 'blink':      return applyBlink(activeGrid, rows, cols)
      case 'typewriter': return applyTypewriter(activeGrid, rows, cols)
      case 'scanline':   return applyScanLine(activeGrid, rows, cols)
      case 'marquee':    return applyMarquee(activeGrid, rows, cols)
      case 'ripple':     return applyRipple(activeGrid, rows, cols)
      default: return []
    }
  }

  const handleApplyPreset = () => {
    if (!selectedPreset) return
    const newFrames = buildPresetFrames(selectedPreset)
    if (newFrames.length) dispatch({ type: 'SET_ALL_FRAMES', frames: newFrames })
    setSelectedPreset(null)
  }

  const sFont = { fontFamily: 'var(--studio-font)' }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={sFont}>

      {/* ── Frame strip ─────────────────────────────────────────── */}
      <div className="p-2 border-b shrink-0" style={{ borderColor: 'var(--studio-border)' }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-widest" style={{ color: '#777777' }}>Frames</span>
          <div className="flex gap-1">
            <button
              onClick={() => dispatch({ type: 'ADD_FRAME' })}
              className="px-2 py-0.5 text-[10px] border hover:bg-[var(--studio-tint)] transition-colors"
              style={{ borderColor: 'var(--studio-border)', color: '#cccccc' }}
              aria-label="Add blank frame"
            >+ Blank</button>
            <button
              onClick={() => dispatch({ type: 'ADD_FRAME', duplicate: true })}
              className="px-2 py-0.5 text-[10px] border hover:bg-[var(--studio-tint)] transition-colors"
              style={{ borderColor: 'var(--studio-border)', color: '#cccccc' }}
              aria-label="Duplicate frame"
            >+ Dupe</button>
          </div>
        </div>

        {/* Scrollable horizontal frame thumbnails */}
        <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
          {frames.map((frame, idx) => (
            <div
              key={frame.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_FRAME', frameId: frame.id })}
              className="relative shrink-0 cursor-pointer group"
              style={{
                border: frame.id === activeFrameId ? '2px solid var(--studio-border)' : '2px solid #333',
                transition: 'border-color 150ms',
              }}
            >
              <svg
                viewBox={`0 0 ${state.cols} ${state.rows}`}
                style={{ width: 48, height: 32, display: 'block', background: '#080808' }}
              >
                {frame.grid.map((row, r) =>
                  row.map((filled, c) =>
                    filled ? <circle key={`${r}-${c}`} cx={c + 0.5} cy={r + 0.5} r={0.4} fill={state.dotColor} /> : null
                  )
                )}
              </svg>
              {/* Frame number */}
              <div
                className="absolute bottom-0 left-0 px-0.5 text-[8px] leading-none"
                style={{ background: 'rgba(0,0,0,0.7)', color: '#888' }}
              >
                {idx + 1}
              </div>
              {/* Delete button — appears on hover */}
              {frames.length > 1 && (
                <button
                  onClick={e => { e.stopPropagation(); dispatch({ type: 'DELETE_FRAME', frameId: frame.id }) }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full items-center justify-center text-[9px] opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex"
                  style={{ background: 'var(--studio-border)', color: '#000', lineHeight: 1 }}
                  aria-label={`Delete frame ${idx + 1}`}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Presets ─────────────────────────────────────────────── */}
      <div className="p-2 border-b shrink-0" style={{ borderColor: 'var(--studio-border)' }}>
        <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#777777' }}>
          Animate — replaces all frames
        </p>

        <div className="grid grid-cols-2 gap-1 mb-2">
          {PRESET_OPTIONS.map(p => {
            const active = selectedPreset === p.id
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPreset(active ? null : p.id)}
                className="flex flex-col items-start px-2 py-1.5 text-left border transition-colors"
                style={{
                  borderColor: active ? 'var(--studio-border)' : '#333',
                  background: active ? 'var(--studio-tint)' : 'transparent',
                }}
                aria-pressed={active}
              >
                <div className="flex items-center gap-1.5 w-full">
                  <span className="text-sm" style={{ color: active ? 'var(--studio-text)' : '#888' }}>{p.icon}</span>
                  <span className="text-xs font-bold flex-1" style={{ color: active ? '#ffffff' : '#cccccc' }}>{p.label}</span>
                  {active && <span className="text-xs" style={{ color: 'var(--studio-border)' }}>✓</span>}
                </div>
                <div className="text-[9px] mt-0.5 pl-5" style={{ color: active ? '#aaaaaa' : '#555555' }}>{p.desc}</div>
              </button>
            )
          })}
        </div>

        {selectedPreset ? (
          <button
            onClick={handleApplyPreset}
            className="w-full py-2 text-xs font-bold tracking-wide border-3 studio-tool-active"
          >
            Apply {PRESET_OPTIONS.find(p => p.id === selectedPreset)?.label}
          </button>
        ) : (
          <div className="text-[9px] text-center py-1" style={{ color: '#444444' }}>
            Select a preset above, then apply
          </div>
        )}
      </div>

      {/* ── Playback ─────────────────────────────────────────────── */}
      <div className="p-2 flex-1">
        <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#777777' }}>Playback</p>

        {/* Play / Stop */}
        <div className="flex gap-1.5 mb-3">
          <button
            onClick={() => dispatch({ type: 'SET_PLAYING', playing: !isPlaying })}
            className={cn(
              'flex-1 py-2 text-sm font-bold border-3 flex items-center justify-center gap-2 transition-colors',
              isPlaying ? 'studio-tool-active' : 'bg-transparent border-[var(--studio-border)] text-[var(--studio-text)] hover:bg-[var(--studio-tint)]'
            )}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <span className="text-base">{isPlaying ? '⏸' : '▶'}</span>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => {
              dispatch({ type: 'SET_PLAYING', playing: false })
              dispatch({ type: 'SET_PLAY_FRAME', index: 0 })
            }}
            className="px-3 py-2 text-base border hover:bg-[var(--studio-tint)] transition-colors"
            style={{ borderColor: 'var(--studio-border)', color: '#cccccc' }}
            aria-label="Stop"
          >⏹</button>
        </div>

        {/* Frame count info */}
        <div className="text-[10px] mb-3 text-center" style={{ color: '#666666' }}>
          {frames.length} frame{frames.length !== 1 ? 's' : ''}
          {isPlaying ? ` · frame ${state.playFrameIndex + 1}` : ''}
        </div>

        {/* FPS */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs w-8 shrink-0" style={{ color: '#aaaaaa' }}>FPS</span>
          <input
            type="range" min={1} max={60} value={fps}
            onChange={e => dispatch({ type: 'SET_FPS', fps: Number(e.target.value) })}
            className="flex-1"
            style={{ accentColor: 'var(--studio-border)' }}
            aria-label="Frames per second"
          />
          <span className="text-xs w-6 text-right" style={{ color: '#ffffff' }}>{fps}</span>
        </div>

        {/* Loop mode */}
        <div className="flex gap-1">
          {(['infinite', 'once', '3x'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => dispatch({ type: 'SET_LOOP_MODE', mode })}
              className={cn('flex-1 py-1.5 text-xs border transition-colors', loopMode === mode ? 'studio-tool-active' : 'bg-transparent hover:bg-[var(--studio-tint)]')}
              style={{ borderColor: 'var(--studio-border)', color: loopMode === mode ? '#000' : '#aaaaaa' }}
            >
              {mode === 'infinite' ? '∞' : mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
