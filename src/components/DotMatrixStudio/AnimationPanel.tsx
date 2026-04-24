import { useEffect, useRef, useState } from 'react'
import type { StudioState, Frame } from './types'
import type { StudioAction } from './hooks/useStudioState'
import {
  applyBlink, applyTypewriter, applyScanLine, applyMarquee, applyRipple,
  applyBounce, applySlide, applyFade,
} from './lib/presets'
import { C } from './lib/studioTheme'
import { cn } from '@/lib/utils'

interface AnimationPanelProps {
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
  activeGrid: boolean[][]
}

interface Direction { value: string; label: string }

interface PresetOption {
  id: string
  label: string
  icon: string
  desc: string
  directions?: Direction[]
}

const PRESET_OPTIONS: PresetOption[] = [
  { id: 'blink',      label: 'Blink',       icon: '◉', desc: 'Art ↔ blank' },
  { id: 'typewriter', label: 'Typewriter',   icon: '▶', desc: 'Reveal col by col',
    directions: [{ value: 'ltr', label: '→' }, { value: 'rtl', label: '←' }] },
  { id: 'scanline',   label: 'Scan Line',    icon: '▬', desc: 'Sweep row by row',
    directions: [{ value: 'ttb', label: '↓' }, { value: 'btt', label: '↑' }] },
  { id: 'marquee',    label: 'Marquee',      icon: '↔', desc: 'Scroll & wrap',
    directions: [{ value: 'left', label: '←' }, { value: 'right', label: '→' }] },
  { id: 'ripple',     label: 'Ripple',       icon: '◎', desc: 'Radial reveal',
    directions: [{ value: 'expand', label: 'Out' }, { value: 'contract', label: 'In' }] },
  { id: 'bounce',     label: 'Bounce',       icon: '⟺', desc: 'Ping-pong scroll' },
  { id: 'slide',      label: 'Slide',        icon: '▷', desc: 'Slide in from edge',
    directions: [
      { value: 'right', label: '←' }, { value: 'left', label: '→' },
      { value: 'down',  label: '↑' }, { value: 'up',   label: '↓' },
    ] },
  { id: 'fade',       label: 'Fade',         icon: '⬡', desc: 'Dither dissolve',
    directions: [{ value: 'in', label: 'In' }, { value: 'out', label: 'Out' }] },
]

export function AnimationPanel({ state, dispatch, activeGrid }: AnimationPanelProps) {
  const { frames, activeFrameId, isPlaying, fps, loopMode } = state

  // Track which preset is "applied" and per-preset direction choices
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [directionMap, setDirectionMap] = useState<Record<string, string>>({})

  const selectedPresetOpt = PRESET_OPTIONS.find(p => p.id === selectedPreset) ?? null

  // Returns the stored direction for a preset, or its first option's default
  const getDirection = (presetId: string): string => {
    if (directionMap[presetId]) return directionMap[presetId]
    return PRESET_OPTIONS.find(p => p.id === presetId)?.directions?.[0]?.value ?? ''
  }

  const buildFrames = (presetId: string, direction: string): Frame[] => {
    const { rows, cols } = state
    switch (presetId) {
      case 'blink':      return applyBlink(activeGrid, rows, cols)
      case 'typewriter': return applyTypewriter(activeGrid, rows, cols, direction as 'ltr' | 'rtl')
      case 'scanline':   return applyScanLine(activeGrid, rows, cols, 2, direction as 'ttb' | 'btt')
      case 'marquee':    return applyMarquee(activeGrid, rows, cols, direction as 'left' | 'right')
      case 'ripple':     return applyRipple(activeGrid, rows, cols, 10, direction as 'expand' | 'contract')
      case 'bounce':     return applyBounce(activeGrid, rows, cols)
      case 'slide':      return applySlide(activeGrid, rows, cols, direction as 'left' | 'right' | 'up' | 'down')
      case 'fade':       return applyFade(activeGrid, rows, cols, direction as 'in' | 'out')
      default: return []
    }
  }

  const applyNow = (presetId: string, direction: string) => {
    const newFrames = buildFrames(presetId, direction)
    if (newFrames.length) dispatch({ type: 'SET_ALL_FRAMES', frames: newFrames })
  }

  const handleSelectPreset = (presetId: string) => {
    if (selectedPreset === presetId) {
      // Click active preset again → deselect (UI indicator only, frames stay)
      setSelectedPreset(null)
    } else {
      const dir = getDirection(presetId)
      setSelectedPreset(presetId)
      applyNow(presetId, dir)
    }
  }

  const handleDirectionChange = (dir: string) => {
    if (!selectedPreset) return
    setDirectionMap(prev => ({ ...prev, [selectedPreset]: dir }))
    applyNow(selectedPreset, dir)
  }

  // ── Playback ───────────────────────────────────────────────────────────
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
      if (nextIdx === 0) {
        loopCountRef.current++
        const mode = loopModeRef.current
        if (mode === 'once' && loopCountRef.current >= 1) {
          dispatch({ type: 'SET_PLAYING', playing: false }); stopInterval()
        } else if (mode === '3x' && loopCountRef.current >= 3) {
          dispatch({ type: 'SET_PLAYING', playing: false }); stopInterval()
        }
      }
    }

    tick()
    intervalRef.current = setInterval(tick, 1000 / fps)
    return stopInterval
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, fps, dispatch])

  const sFont = { fontFamily: 'var(--studio-font)' }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={sFont}>

      {/* ── Frame strip ─────────────────────────────────────────── */}
      <div className="p-2 border-b shrink-0" style={{ borderColor: C.border }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>Frames</span>
          <div className="flex gap-1">
            <button
              onClick={() => dispatch({ type: 'ADD_FRAME' })}
              className="px-2 py-0.5 text-[10px] border hover:bg-[var(--studio-tint)] transition-colors"
              style={{ borderColor: C.border, color: C.text }}
              aria-label="Add blank frame"
            >+ Blank</button>
            <button
              onClick={() => dispatch({ type: 'ADD_FRAME', duplicate: true })}
              className="px-2 py-0.5 text-[10px] border hover:bg-[var(--studio-tint)] transition-colors"
              style={{ borderColor: C.border, color: C.text }}
              aria-label="Duplicate frame"
            >+ Dupe</button>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin', scrollbarColor: `${C.subtle} transparent` }}>
          {frames.map((frame, idx) => (
            <div
              key={frame.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_FRAME', frameId: frame.id })}
              className="relative shrink-0 cursor-pointer group"
              style={{
                border: frame.id === activeFrameId ? `2px solid ${C.border}` : `2px solid ${C.faint}`,
                transition: 'border-color 150ms',
              }}
            >
              <svg
                viewBox={`0 0 ${state.cols} ${state.rows}`}
                style={{ width: 48, height: 32, display: 'block', background: C.thumb_bg }}
              >
                {frame.grid.map((row, r) =>
                  row.map((filled, c) =>
                    filled ? <circle key={`${r}-${c}`} cx={c + 0.5} cy={r + 0.5} r={0.4} fill={state.dotColor} /> : null
                  )
                )}
              </svg>
              <div className="absolute bottom-0 left-0 px-0.5 text-[8px] leading-none" style={{ background: 'rgba(255,255,255,0.85)', color: C.border }}>
                {idx + 1}
              </div>
              {frames.length > 1 && (
                <button
                  onClick={e => { e.stopPropagation(); dispatch({ type: 'DELETE_FRAME', frameId: frame.id }) }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full items-center justify-center text-[9px] opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex"
                  style={{ background: C.border, color: '#ffffff', lineHeight: 1 }}
                  aria-label={`Delete frame ${idx + 1}`}
                >×</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Animation Presets ────────────────────────────────────── */}
      <div className="p-2 border-b shrink-0" style={{ borderColor: C.border }}>

        {/* Header + active-preset badge */}
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>Animation</p>
          {selectedPreset ? (
            <span
              className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5"
              style={{ background: C.border, color: '#fff' }}
            >
              {selectedPresetOpt?.label}
              {selectedPresetOpt?.directions && directionMap[selectedPreset]
                ? ` · ${selectedPresetOpt.directions.find(d => d.value === directionMap[selectedPreset])?.label ?? ''}`
                : selectedPresetOpt?.directions
                  ? ` · ${selectedPresetOpt.directions[0]?.label ?? ''}`
                  : ''}
            </span>
          ) : (
            <span className="text-[8px] uppercase tracking-widest" style={{ color: C.subtle }}>none</span>
          )}
        </div>

        {/* None button */}
        <button
          onClick={() => setSelectedPreset(null)}
          className="w-full py-1 mb-1.5 text-[10px] border text-center transition-colors hover:bg-[var(--studio-tint)]"
          style={{
            borderColor: !selectedPreset ? C.border : C.faint,
            background: !selectedPreset ? C.tint : 'transparent',
            color: !selectedPreset ? C.text : C.subtle,
          }}
          aria-pressed={!selectedPreset}
        >
          ○ None
        </button>

        {/* Preset grid — click to apply immediately */}
        <div className="grid grid-cols-2 gap-1 mb-1.5">
          {PRESET_OPTIONS.map(p => {
            const active = selectedPreset === p.id
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className="flex flex-col items-start px-2 py-1.5 text-left border transition-colors"
                style={{
                  borderColor: active ? C.border : C.faint,
                  background: active ? C.tint : 'transparent',
                }}
                aria-pressed={active}
              >
                <div className="flex items-center gap-1.5 w-full">
                  <span className="text-sm" style={{ color: active ? C.border : C.muted }}>{p.icon}</span>
                  <span className="text-xs font-bold flex-1" style={{ color: active ? C.text : C.muted }}>{p.label}</span>
                  {active && <span className="text-xs" style={{ color: C.border }}>✓</span>}
                </div>
                <div className="text-[9px] mt-0.5 pl-5" style={{ color: active ? C.muted : C.subtle }}>{p.desc}</div>
              </button>
            )
          })}
        </div>

        {/* Direction sub-options — only shown when selected preset has directions */}
        {selectedPresetOpt?.directions && (
          <div className="flex items-center gap-1">
            <span className="text-[9px] shrink-0" style={{ color: C.muted }}>Dir</span>
            <div className="flex gap-1 flex-1">
              {selectedPresetOpt.directions.map(d => {
                const activeDir = directionMap[selectedPreset!] ?? selectedPresetOpt.directions![0].value
                const isActive = activeDir === d.value
                return (
                  <button
                    key={d.value}
                    onClick={() => handleDirectionChange(d.value)}
                    className="flex-1 py-0.5 text-[10px] border transition-colors"
                    style={{
                      borderColor: isActive ? C.border : C.faint,
                      background: isActive ? C.border : 'transparent',
                      color: isActive ? '#fff' : C.muted,
                    }}
                    aria-pressed={isActive}
                  >
                    {d.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <p className="text-[8px] mt-1.5" style={{ color: C.subtle }}>Replaces all frames · use undo to revert</p>
      </div>

      {/* ── Playback ─────────────────────────────────────────────── */}
      <div className="p-2 flex-1">
        <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: C.muted }}>Playback</p>

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
            style={{ borderColor: C.border, color: C.text }}
            aria-label="Stop"
          >⏹</button>
        </div>

        <div className="text-[10px] mb-3 text-center" style={{ color: C.muted }}>
          {frames.length} frame{frames.length !== 1 ? 's' : ''}
          {isPlaying ? ` · frame ${state.playFrameIndex + 1}` : ''}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs w-8 shrink-0" style={{ color: C.muted }}>FPS</span>
          <input
            type="range" min={1} max={60} value={fps}
            onChange={e => dispatch({ type: 'SET_FPS', fps: Number(e.target.value) })}
            className="flex-1"
            style={{ accentColor: C.border }}
            aria-label="Frames per second"
          />
          <span className="text-xs w-6 text-right" style={{ color: C.text }}>{fps}</span>
        </div>

        <div className="flex gap-1">
          {(['infinite', 'once', '3x'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => dispatch({ type: 'SET_LOOP_MODE', mode })}
              className={cn('flex-1 py-1.5 text-xs border transition-colors', loopMode === mode ? 'studio-tool-active' : 'bg-transparent hover:bg-[var(--studio-tint)]')}
              style={{ borderColor: C.border, color: loopMode === mode ? '#ffffff' : C.muted }}
            >
              {mode === 'infinite' ? '∞' : mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
