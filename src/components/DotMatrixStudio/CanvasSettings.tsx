import { useState } from 'react'
import type { StudioState } from './types'
import type { StudioAction } from './hooks/useStudioState'
import { GRID_PRESETS } from './types'

interface CanvasSettingsProps {
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
  onGridChangeRequest: (rows: number, cols: number) => void
}

export function CanvasSettings({ state, dispatch, onGridChangeRequest }: CanvasSettingsProps) {
  const [customRows, setCustomRows] = useState(String(state.rows))
  const [customCols, setCustomCols] = useState(String(state.cols))

  const currentPreset = GRID_PRESETS.find(p => p.rows === state.rows && p.cols === state.cols)

  return (
    <div className="flex flex-col gap-3 p-3 border-t border-[var(--studio-border)]">
      <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase">Grid Size</p>

      <div className="flex flex-col gap-1">
        {GRID_PRESETS.map(preset => (
          <button
            key={preset.name}
            onClick={() => onGridChangeRequest(preset.rows, preset.cols)}
            className={`px-2 py-1 text-xs border border-[var(--studio-border)] transition-colors text-left ${
              currentPreset?.name === preset.name
                ? 'studio-tool-active'
                : 'bg-transparent text-[var(--studio-text)] hover:bg-[#1a1a1a]'
            }`}
            style={{ fontFamily: 'var(--studio-font)' }}
          >
            {preset.name} <span className="text-[var(--studio-text-muted)]">{preset.cols}×{preset.rows}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-1 items-center">
        <input
          type="number"
          min={2} max={128}
          value={customCols}
          onChange={e => setCustomCols(e.target.value)}
          className="w-12 px-1 py-1 text-xs bg-[#1a1a1a] border border-[var(--studio-border)] text-[var(--studio-text)] text-center"
          style={{ fontFamily: 'var(--studio-font)' }}
          aria-label="Custom columns"
        />
        <span className="text-[var(--studio-text-muted)] text-xs">×</span>
        <input
          type="number"
          min={2} max={64}
          value={customRows}
          onChange={e => setCustomRows(e.target.value)}
          className="w-12 px-1 py-1 text-xs bg-[#1a1a1a] border border-[var(--studio-border)] text-[var(--studio-text)] text-center"
          style={{ fontFamily: 'var(--studio-font)' }}
          aria-label="Custom rows"
        />
        <button
          onClick={() => {
            const r = parseInt(customRows)
            const c = parseInt(customCols)
            if (r >= 2 && r <= 64 && c >= 2 && c <= 128) onGridChangeRequest(r, c)
          }}
          className="px-2 py-1 text-xs bg-transparent border border-[var(--studio-border)] text-[var(--studio-text)] hover:bg-[#1a1a1a]"
          style={{ fontFamily: 'var(--studio-font)' }}
        >
          Set
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase">Dot Color</p>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={state.dotColor}
            onChange={e => dispatch({ type: 'SET_DOT_COLOR', color: e.target.value })}
            className="w-8 h-8 border-3 border-[var(--studio-border)] cursor-pointer bg-transparent"
            aria-label="Dot color picker"
          />
          <span className="text-xs text-[var(--studio-text)]" style={{ fontFamily: 'var(--studio-font)' }}>
            {state.dotColor.toUpperCase()}
          </span>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={state.bgTransparent}
          onChange={e => dispatch({ type: 'SET_BG_TRANSPARENT', transparent: e.target.checked })}
          className="border-3 border-[var(--studio-border)]"
        />
        <span className="text-xs text-[var(--studio-text)]" style={{ fontFamily: 'var(--studio-font)' }}>
          Transparent BG
        </span>
      </label>
    </div>
  )
}
