import { useState } from 'react'
import type { StudioState } from './types'
import type { StudioAction } from './hooks/useStudioState'
import { GRID_PRESETS } from './types'

interface CanvasSettingsProps {
  state: StudioState
  dispatch: React.Dispatch<StudioAction>
  onGridChangeRequest: (rows: number, cols: number) => void
}

const sFont = { fontFamily: 'var(--studio-font)' }

export function CanvasSettings({ state, dispatch, onGridChangeRequest }: CanvasSettingsProps) {
  const [customRows, setCustomRows] = useState(String(state.rows))
  const [customCols, setCustomCols] = useState(String(state.cols))

  const currentPreset = GRID_PRESETS.find(p => p.rows === state.rows && p.cols === state.cols)

  return (
    <div className="flex flex-col gap-3 p-3 border-t" style={{ borderColor: 'var(--studio-border)' }}>
      <p className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--studio-text-muted)', ...sFont }}>Grid Size</p>

      <div className="flex flex-col gap-1">
        {GRID_PRESETS.map(preset => {
          const active = currentPreset?.name === preset.name
          return (
            <button
              key={preset.name}
              onClick={() => onGridChangeRequest(preset.rows, preset.cols)}
              className="px-2 py-1 text-xs border transition-colors text-left"
              style={{
                borderColor: active ? 'var(--studio-border)' : '#333',
                background: active ? 'var(--studio-border)' : 'transparent',
                color: active ? '#000000' : '#cccccc',
                ...sFont,
              }}
            >
              {preset.name}{' '}
              <span style={{ color: active ? '#333' : '#666666' }}>{preset.cols}×{preset.rows}</span>
            </button>
          )
        })}
      </div>

      <div className="flex gap-1 items-center">
        <input
          type="number"
          min={2} max={128}
          value={customCols}
          onChange={e => setCustomCols(e.target.value)}
          className="w-12 px-1 py-1 text-xs text-center focus:outline-none"
          style={{ background: '#1a1a1a', border: '1px solid #444', color: '#cccccc', ...sFont }}
          aria-label="Custom columns"
        />
        <span className="text-xs" style={{ color: '#777777' }}>×</span>
        <input
          type="number"
          min={2} max={64}
          value={customRows}
          onChange={e => setCustomRows(e.target.value)}
          className="w-12 px-1 py-1 text-xs text-center focus:outline-none"
          style={{ background: '#1a1a1a', border: '1px solid #444', color: '#cccccc', ...sFont }}
          aria-label="Custom rows"
        />
        <button
          onClick={() => {
            const r = parseInt(customRows)
            const c = parseInt(customCols)
            if (r >= 2 && r <= 64 && c >= 2 && c <= 128) onGridChangeRequest(r, c)
          }}
          className="px-2 py-1 text-xs bg-transparent hover:bg-[var(--studio-tint)] transition-colors"
          style={{ border: '1px solid var(--studio-border)', color: '#cccccc', ...sFont }}
        >
          Set
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-[9px] tracking-widest uppercase" style={{ color: 'var(--studio-text-muted)', ...sFont }}>Dot Color</p>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={state.dotColor}
            onChange={e => dispatch({ type: 'SET_DOT_COLOR', color: e.target.value })}
            className="w-8 h-8 border-3 cursor-pointer bg-transparent"
            style={{ borderColor: 'var(--studio-border)' }}
            aria-label="Dot color picker"
          />
          <span className="text-xs" style={{ color: '#cccccc', ...sFont }}>
            {state.dotColor.toUpperCase()}
          </span>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={state.bgTransparent}
          onChange={e => dispatch({ type: 'SET_BG_TRANSPARENT', transparent: e.target.checked })}
          className="border-3"
          style={{ accentColor: 'var(--studio-border)' }}
        />
        <span className="text-xs" style={{ color: '#cccccc', ...sFont }}>
          Transparent BG
        </span>
      </label>
    </div>
  )
}
