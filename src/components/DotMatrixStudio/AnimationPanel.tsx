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

const PRESET_OPTIONS = [
  { id: 'blink', label: 'Blink' },
  { id: 'typewriter', label: 'Typewriter' },
  { id: 'scanline', label: 'Scan Line' },
  { id: 'marquee', label: 'Marquee' },
  { id: 'ripple', label: 'Ripple' },
  { id: 'glitch', label: 'Glitch' },
]

export function AnimationPanel({ state, dispatch, activeGrid }: AnimationPanelProps) {
  const { frames, activeFrameId, isPlaying, fps, loopMode } = state
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
      case 'blink': newFrames = applyBlink(activeGrid, rows, cols); break
      case 'typewriter': newFrames = applyTypewriter(activeGrid, rows, cols); break
      case 'scanline': newFrames = applyScanLine(rows, cols); break
      case 'marquee': newFrames = applyMarquee(activeGrid, rows, cols); break
      case 'ripple': newFrames = applyRipple(rows, cols); break
      case 'glitch': newFrames = applyGlitch(activeGrid, rows, cols); break
    }
    if (newFrames.length) dispatch({ type: 'ADD_FRAMES', frames: newFrames, afterId: activeFrameId })
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
      {/* Frame timeline */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
        <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase mb-1 px-1">Frames</p>
        {frames.map((frame, idx) => (
          <div
            key={frame.id}
            onClick={() => dispatch({ type: 'SET_ACTIVE_FRAME', frameId: frame.id })}
            className={cn(
              'flex items-center gap-2 px-2 py-1 cursor-pointer border transition-colors',
              frame.id === activeFrameId
                ? 'border-[var(--studio-border)] bg-[#1a1a00]'
                : 'border-[#2a2a2a] hover:border-[var(--studio-border)]'
            )}
          >
            <svg
              viewBox={`0 0 ${state.cols} ${state.rows}`}
              className="w-12 h-6 shrink-0"
              style={{ background: '#080808' }}
            >
              {frame.grid.map((row, r) =>
                row.map((filled, c) =>
                  filled ? (
                    <circle
                      key={`${r}-${c}`}
                      cx={c + 0.5} cy={r + 0.5} r={0.4}
                      fill={state.dotColor}
                    />
                  ) : null
                )
              )}
            </svg>

            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[9px] text-[var(--studio-text-muted)]" style={sFont}>
                {idx + 1}
              </span>
              <input
                type="number"
                value={frame.duration}
                min={16}
                onClick={e => e.stopPropagation()}
                onChange={e => dispatch({ type: 'SET_FRAME_DURATION', frameId: frame.id, duration: Number(e.target.value) })}
                className="w-full text-[9px] bg-transparent border-b border-[#2a2a2a] text-[var(--studio-text)] focus:outline-none focus:border-[var(--studio-border)]"
                style={sFont}
                aria-label={`Frame ${idx + 1} duration`}
              />
            </div>

            <button
              onClick={e => { e.stopPropagation(); dispatch({ type: 'DELETE_FRAME', frameId: frame.id }) }}
              className="text-[var(--studio-text-muted)] hover:text-[var(--studio-border)] text-xs"
              aria-label={`Delete frame ${idx + 1}`}
            >
              ×
            </button>
          </div>
        ))}

        <div className="flex gap-1 mt-1">
          <button
            onClick={() => dispatch({ type: 'ADD_FRAME' })}
            className="flex-1 py-1 text-xs border border-[var(--studio-border)] bg-transparent text-[var(--studio-text)] hover:bg-[#1a1a00]"
            style={sFont}
            aria-label="Add blank frame"
          >
            + Blank
          </button>
          <button
            onClick={() => dispatch({ type: 'ADD_FRAME', duplicate: true })}
            className="flex-1 py-1 text-xs border border-[var(--studio-border)] bg-transparent text-[var(--studio-text)] hover:bg-[#1a1a00]"
            style={sFont}
            aria-label="Duplicate frame"
          >
            + Dupe
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="p-2 border-t border-[var(--studio-border)] shrink-0">
        <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase mb-2">Presets</p>
        <div className="grid grid-cols-2 gap-1">
          {PRESET_OPTIONS.map(p => (
            <button
              key={p.id}
              onClick={() => applyPreset(p.id)}
              className="py-1 text-[10px] border border-[var(--studio-border)] bg-transparent text-[var(--studio-text)] hover:bg-[#1a1a00]"
              style={sFont}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tween */}
      <div className="p-2 border-t border-[var(--studio-border)] shrink-0">
        <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase mb-2">Tween to</p>
        <select
          value={tweenTarget ?? ''}
          onChange={e => setTweenTarget(e.target.value || null)}
          className="w-full mb-1 text-xs bg-[#1a1a1a] border border-[var(--studio-border)] text-[var(--studio-text)] px-1 py-1"
          style={sFont}
          aria-label="Tween target frame"
        >
          <option value="">— select frame —</option>
          {frames.filter(f => f.id !== activeFrameId).map((f) => (
            <option key={f.id} value={f.id}>Frame {frames.indexOf(f) + 1}</option>
          ))}
        </select>
        <div className="flex gap-1 items-center">
          <input
            type="number"
            value={tweenN}
            min={1} max={30}
            onChange={e => setTweenN(Number(e.target.value))}
            className="w-12 text-xs bg-[#1a1a1a] border border-[var(--studio-border)] text-[var(--studio-text)] px-1 py-1 text-center"
            style={sFont}
            aria-label="Number of tween frames"
          />
          <span className="text-[10px] text-[var(--studio-text-muted)]" style={sFont}>frames</span>
          <button
            onClick={applyTween}
            disabled={!tweenTarget}
            className="ml-auto px-2 py-1 text-[10px] border border-[var(--studio-border)] bg-transparent text-[var(--studio-text)] disabled:opacity-30 hover:bg-[#1a1a00]"
            style={sFont}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Playback */}
      <div className="p-2 border-t border-[var(--studio-border)] shrink-0">
        <div className="flex gap-1 mb-2">
          <button
            onClick={() => dispatch({ type: 'SET_PLAYING', playing: !isPlaying })}
            className="flex-1 py-1 text-xs border-3 border-[var(--studio-border)] studio-tool-active"
            style={sFont}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={() => { dispatch({ type: 'SET_PLAYING', playing: false }); dispatch({ type: 'SET_PLAY_FRAME', index: 0 }) }}
            className="px-3 py-1 text-xs border border-[var(--studio-border)] bg-transparent text-[var(--studio-text)]"
            style={sFont}
            aria-label="Stop"
          >
            ⏹
          </button>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-[9px] text-[var(--studio-text-muted)]" style={sFont}>FPS</span>
          <input
            type="range"
            min={1} max={60}
            value={fps}
            onChange={e => dispatch({ type: 'SET_FPS', fps: Number(e.target.value) })}
            className="flex-1 accent-[#E8FF00]"
            aria-label="Frames per second"
          />
          <span className="text-[10px] text-[var(--studio-text)] w-6 text-right" style={sFont}>{fps}</span>
        </div>

        <div className="flex gap-1">
          {(['infinite', 'once', '3x'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => dispatch({ type: 'SET_LOOP_MODE', mode })}
              className={cn(
                'flex-1 py-1 text-[9px] border border-[var(--studio-border)]',
                loopMode === mode ? 'studio-tool-active' : 'bg-transparent text-[var(--studio-text)]'
              )}
              style={sFont}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
