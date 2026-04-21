import { useEffect, useRef, useState } from 'react'
import type { StudioState, Frame } from './types'
import type { StudioAction } from './hooks/useStudioState'
import { applyBlink, applyTypewriter, applyScanLine, applyMarquee, applyRipple, applyGlitch } from './lib/presets'
import { tweenFrames } from './lib/tween'
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
  { id: 'blink',      label: 'Blink',       icon: '◉', desc: '2 frames: art ↔ blank' },
  { id: 'typewriter', label: 'Typewriter',   icon: '▶', desc: 'Reveal left to right' },
  { id: 'scanline',   label: 'Scan Line',    icon: '▬', desc: 'Sweep row by row' },
  { id: 'marquee',    label: 'Marquee',      icon: '↔', desc: 'Scroll & wrap around' },
  { id: 'ripple',     label: 'Ripple',       icon: '◎', desc: 'Reveal from center out' },
  { id: 'glitch',     label: 'Glitch',       icon: '▓', desc: 'Random noise frames' },
]

export function AnimationPanel({ state, dispatch, activeGrid }: AnimationPanelProps) {
  const { frames, activeFrameId, isPlaying, fps, loopMode } = state
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [tweenTarget, setTweenTarget] = useState<string | null>(null)
  const [tweenN, setTweenN] = useState(5)
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const playCountRef = useRef(0)

  useEffect(() => {
    if (!isPlaying) {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current)
      return
    }
    playCountRef.current = 0
    let idx = 0
    const totalFrames = frames.length

    const tick = () => {
      dispatch({ type: 'SET_PLAY_FRAME', index: idx })
      idx = (idx + 1) % totalFrames

      if (idx === 0) {
        playCountRef.current++
        if (loopMode === 'once' && playCountRef.current >= 1) {
          dispatch({ type: 'SET_PLAYING', playing: false })
          return
        }
        if (loopMode === '3x' && playCountRef.current >= 3) {
          dispatch({ type: 'SET_PLAYING', playing: false })
          return
        }
      }
    }

    playIntervalRef.current = setInterval(tick, 1000 / fps)
    return () => { if (playIntervalRef.current) clearInterval(playIntervalRef.current) }
  }, [isPlaying, fps, frames.length, loopMode, dispatch])

  const applyPreset = (presetId: string) => {
    const { rows, cols } = state
    let newFrames: Frame[] = []
    switch (presetId) {
      case 'blink':      newFrames = applyBlink(activeGrid, rows, cols); break
      case 'typewriter': newFrames = applyTypewriter(activeGrid, rows, cols); break
      case 'scanline':   newFrames = applyScanLine(activeGrid, rows, cols); break
      case 'marquee':    newFrames = applyMarquee(activeGrid, rows, cols); break
      case 'ripple':     newFrames = applyRipple(activeGrid, rows, cols); break
      case 'glitch':     newFrames = applyGlitch(activeGrid, rows, cols); break
    }
    if (newFrames.length) dispatch({ type: 'ADD_FRAMES', frames: newFrames, afterId: activeFrameId })
  }

  const handleApplyPreset = () => {
    if (!selectedPreset) return
    applyPreset(selectedPreset)
    setSelectedPreset(null)
  }

  const applyTween = () => {
    if (!tweenTarget) return
    const frameA = frames.find(f => f.id === activeFrameId)
    const frameB = frames.find(f => f.id === tweenTarget)
    if (!frameA || !frameB) return
    const generated = tweenFrames(frameA, frameB, tweenN, state.rows, state.cols)
    dispatch({ type: 'ADD_FRAMES', frames: generated, afterId: activeFrameId })
    setTweenTarget(null)
  }

  const sFont = { fontFamily: 'var(--studio-font)' }

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Frame timeline ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1 min-h-0">
        <p className="text-[9px] tracking-widest uppercase mb-1 px-1"
          style={{ color: 'var(--studio-text-muted)', ...sFont }}>
          Frames
        </p>

        {frames.map((frame, idx) => (
          <div
            key={frame.id}
            onClick={() => dispatch({ type: 'SET_ACTIVE_FRAME', frameId: frame.id })}
            className={cn(
              'flex items-center gap-2 px-2 py-1 cursor-pointer border transition-colors',
              frame.id === activeFrameId
                ? 'border-[var(--studio-border)] bg-[var(--studio-tint)]'
                : 'border-[#2a2a2a] hover:border-[var(--studio-border)]'
            )}
          >
            {/* Mini SVG thumbnail */}
            <svg
              viewBox={`0 0 ${state.cols} ${state.rows}`}
              className="w-12 h-6 shrink-0"
              style={{ background: '#080808' }}
            >
              {frame.grid.map((row, r) =>
                row.map((filled, c) =>
                  filled ? (
                    <circle key={`${r}-${c}`} cx={c + 0.5} cy={r + 0.5} r={0.4} fill={state.dotColor} />
                  ) : null
                )
              )}
            </svg>

            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[9px]" style={{ color: 'var(--studio-text-muted)', ...sFont }}>
                {idx + 1}
              </span>
              <input
                type="number"
                value={frame.duration}
                min={16}
                onClick={e => e.stopPropagation()}
                onChange={e => dispatch({ type: 'SET_FRAME_DURATION', frameId: frame.id, duration: Number(e.target.value) })}
                className="w-full text-[9px] bg-transparent border-b focus:outline-none"
                style={{
                  borderColor: '#2a2a2a',
                  color: '#cccccc',
                  ...sFont,
                }}
                aria-label={`Frame ${idx + 1} duration`}
              />
            </div>

            <button
              onClick={e => { e.stopPropagation(); dispatch({ type: 'DELETE_FRAME', frameId: frame.id }) }}
              className="text-xs hover:opacity-80 transition-opacity"
              style={{ color: 'var(--studio-text-muted)' }}
              aria-label={`Delete frame ${idx + 1}`}
            >
              ×
            </button>
          </div>
        ))}

        <div className="flex gap-1 mt-1">
          <button
            onClick={() => dispatch({ type: 'ADD_FRAME' })}
            className="flex-1 py-1.5 text-xs border bg-transparent hover:bg-[var(--studio-tint)] transition-colors"
            style={{ borderColor: 'var(--studio-border)', color: '#cccccc', ...sFont }}
            aria-label="Add blank frame"
          >
            + Blank
          </button>
          <button
            onClick={() => dispatch({ type: 'ADD_FRAME', duplicate: true })}
            className="flex-1 py-1.5 text-xs border bg-transparent hover:bg-[var(--studio-tint)] transition-colors"
            style={{ borderColor: 'var(--studio-border)', color: '#cccccc', ...sFont }}
            aria-label="Duplicate frame"
          >
            + Dupe
          </button>
        </div>
      </div>

      {/* ── Presets ────────────────────────────────────────────── */}
      <div className="p-2 border-t shrink-0" style={{ borderColor: 'var(--studio-border)' }}>
        <p className="text-[9px] tracking-widest uppercase mb-2"
          style={{ color: 'var(--studio-text-muted)', ...sFont }}>
          Presets — applied to your art
        </p>

        <div className="flex flex-col gap-1">
          {PRESET_OPTIONS.map(p => {
            const active = selectedPreset === p.id
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPreset(active ? null : p.id)}
                className="flex items-center gap-2 px-2 py-1.5 text-left border transition-colors"
                style={{
                  borderColor: active ? 'var(--studio-border)' : '#333',
                  background: active ? 'var(--studio-tint)' : 'transparent',
                  color: active ? 'var(--studio-text)' : '#aaaaaa',
                  ...sFont,
                }}
                aria-pressed={active}
              >
                <span className="text-sm w-5 text-center shrink-0">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold tracking-wide">{p.label}</div>
                  <div className="text-[8px]" style={{ color: active ? '#cccccc' : '#555555' }}>{p.desc}</div>
                </div>
                {active && (
                  <span className="text-xs shrink-0" style={{ color: 'var(--studio-border)' }}>✓</span>
                )}
              </button>
            )
          })}
        </div>

        {selectedPreset ? (
          <button
            onClick={handleApplyPreset}
            className="w-full mt-2 py-1.5 text-xs font-bold tracking-wide border-3 studio-tool-active transition-opacity hover:opacity-90"
            style={{ ...sFont }}
          >
            Apply {PRESET_OPTIONS.find(p => p.id === selectedPreset)?.label}
          </button>
        ) : (
          <p className="text-[8px] mt-2 text-center" style={{ color: '#444444', ...sFont }}>
            Select a preset above, then apply
          </p>
        )}
      </div>

      {/* ── Tween ──────────────────────────────────────────────── */}
      <div className="p-2 border-t shrink-0" style={{ borderColor: 'var(--studio-border)' }}>
        <p className="text-[9px] tracking-widest uppercase mb-2"
          style={{ color: 'var(--studio-text-muted)', ...sFont }}>
          Tween
        </p>
        <select
          value={tweenTarget ?? ''}
          onChange={e => setTweenTarget(e.target.value || null)}
          className="w-full mb-1 text-xs px-1 py-1 focus:outline-none"
          style={{
            background: '#1a1a1a',
            border: '1px solid #333',
            color: '#cccccc',
            ...sFont,
          }}
          aria-label="Tween target frame"
        >
          <option value="">— target frame —</option>
          {frames.filter(f => f.id !== activeFrameId).map((f) => (
            <option key={f.id} value={f.id} style={{ background: '#1a1a1a' }}>
              Frame {frames.indexOf(f) + 1}
            </option>
          ))}
        </select>
        <div className="flex gap-1 items-center">
          <input
            type="number"
            value={tweenN}
            min={1} max={30}
            onChange={e => setTweenN(Number(e.target.value))}
            className="w-12 text-xs px-1 py-1 text-center focus:outline-none"
            style={{ background: '#1a1a1a', border: '1px solid #333', color: '#cccccc', ...sFont }}
            aria-label="Number of tween frames"
          />
          <span className="text-[10px]" style={{ color: '#777777', ...sFont }}>frames</span>
          <button
            onClick={applyTween}
            disabled={!tweenTarget}
            className="ml-auto px-2 py-1 text-[10px] border bg-transparent disabled:opacity-30 hover:bg-[var(--studio-tint)] transition-colors"
            style={{ borderColor: 'var(--studio-border)', color: '#cccccc', ...sFont }}
          >
            Apply
          </button>
        </div>
      </div>

      {/* ── Playback ───────────────────────────────────────────── */}
      <div className="p-2 border-t shrink-0" style={{ borderColor: 'var(--studio-border)' }}>
        <div className="flex gap-1 mb-2">
          <button
            onClick={() => dispatch({ type: 'SET_PLAYING', playing: !isPlaying })}
            className="flex-1 py-1.5 text-xs border-3 studio-tool-active flex items-center justify-center gap-1"
            style={sFont}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <span className="text-base">{isPlaying ? '⏸' : '▶'}</span>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => { dispatch({ type: 'SET_PLAYING', playing: false }); dispatch({ type: 'SET_PLAY_FRAME', index: 0 }) }}
            className="px-3 py-1.5 text-base border bg-transparent hover:bg-[var(--studio-tint)] transition-colors"
            style={{ borderColor: 'var(--studio-border)', color: '#cccccc' }}
            aria-label="Stop"
          >
            <span className="text-base">⏹</span>
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] w-6 shrink-0" style={{ color: '#777777', ...sFont }}>FPS</span>
          <input
            type="range"
            min={1} max={60}
            value={fps}
            onChange={e => dispatch({ type: 'SET_FPS', fps: Number(e.target.value) })}
            className="flex-1"
            style={{ accentColor: 'var(--studio-border)' }}
            aria-label="Frames per second"
          />
          <span className="text-[10px] w-6 text-right" style={{ color: '#cccccc', ...sFont }}>{fps}</span>
        </div>

        <div className="flex gap-1">
          {(['infinite', 'once', '3x'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => dispatch({ type: 'SET_LOOP_MODE', mode })}
              className={cn(
                'flex-1 py-1 text-[9px] border transition-colors',
                loopMode === mode ? 'studio-tool-active' : 'bg-transparent hover:bg-[var(--studio-tint)]'
              )}
              style={{
                borderColor: 'var(--studio-border)',
                color: loopMode === mode ? '#000' : '#aaaaaa',
                ...sFont,
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
