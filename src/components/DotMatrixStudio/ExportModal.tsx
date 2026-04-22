import { useState } from 'react'
import type { ExportConfig, LoopMode, StudioState } from './types'
import { useExport } from './hooks/useExport'
import { cn } from '@/lib/utils'

interface ExportModalProps {
  state: StudioState
  onClose: () => void
}

const FORMATS = ['gif', 'png', 'svg', 'json'] as const
const SCALES = [1, 2, 4, 8] as const

export function ExportModal({ state, onClose }: ExportModalProps) {
  const [format, setFormat] = useState<ExportConfig['format']>('gif')
  const [scale, setScale] = useState<1 | 2 | 4 | 8>(2)
  const [loopMode, setLoopMode] = useState<LoopMode>('infinite')
  const [svgAnimated, setSvgAnimated] = useState(true)
  const [pngSpritesheet, setPngSpritesheet] = useState(false)
  const [bgTransparent, setBgTransparent] = useState(state.bgTransparent)
  const [exporting, setExporting] = useState(false)

  const { runExport } = useExport(state)

  const sFont = { fontFamily: 'var(--studio-font)' }

  const handleExport = async () => {
    setExporting(true)
    try {
      await runExport({ format, scale, bgTransparent, loopMode, svgAnimated, svgEmbedFont: false, pngSpritesheet })
      onClose()
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="studio-panel w-full max-w-sm mx-4"
        style={{ background: 'var(--studio-panel)' }}
        role="dialog"
        aria-label="Export"
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--studio-border)]">
          <h2 className="text-sm tracking-widest uppercase" style={sFont}>Export</h2>
          <button onClick={onClose} className="text-[var(--studio-text-muted)] hover:text-[var(--studio-text)]" aria-label="Close export modal">×</button>
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div>
            <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase mb-2">Format</p>
            <div className="flex">
              {FORMATS.map(f => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={cn(
                    'flex-1 py-2 text-xs border border-[var(--studio-border)] uppercase',
                    format === f ? 'studio-tool-active' : 'bg-transparent text-[var(--studio-text)] hover:bg-[var(--studio-tint)]'
                  )}
                  style={sFont}
                  aria-label={`Export as ${f.toUpperCase()}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase mb-2">Scale</p>
            <div className="flex gap-1">
              {SCALES.map(s => (
                <button
                  key={s}
                  onClick={() => setScale(s)}
                  className={cn(
                    'flex-1 py-1 text-xs border border-[var(--studio-border)]',
                    scale === s ? 'studio-tool-active' : 'bg-transparent text-[var(--studio-text)]'
                  )}
                  style={sFont}
                  aria-label={`Scale ${s}x`}
                >
                  {s}×
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer" style={sFont}>
            <input
              type="checkbox"
              checked={bgTransparent}
              onChange={e => setBgTransparent(e.target.checked)}
            />
            <span className="text-xs text-[var(--studio-text)]">Transparent background</span>
          </label>

          {format === 'gif' && (
            <div>
              <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase mb-2">Loop</p>
              <div className="flex gap-1">
                {(['infinite', 'once', '3x'] as const).map(m => (
                  <button key={m} onClick={() => setLoopMode(m)}
                    className={cn('flex-1 py-1 text-xs border border-[var(--studio-border)]',
                      loopMode === m ? 'studio-tool-active' : 'bg-transparent text-[var(--studio-text)]')}
                    style={sFont} aria-label={`Loop ${m}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {format === 'svg' && (
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--studio-text)]" style={sFont}>
                <input type="checkbox" checked={svgAnimated} onChange={e => setSvgAnimated(e.target.checked)} />
                Animated SVG (multi-frame)
              </label>
            </div>
          )}

          {format === 'png' && (
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--studio-text)]" style={sFont}>
              <input type="checkbox" checked={pngSpritesheet} onChange={e => setPngSpritesheet(e.target.checked)} />
              Export as spritesheet (all frames)
            </label>
          )}

          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full py-3 text-sm uppercase tracking-widest border-3 border-[var(--studio-border)] studio-tool-active disabled:opacity-50"
            style={sFont}
            aria-label="Download export"
          >
            {exporting ? 'Exporting...' : `Download ${format.toUpperCase()}`}
          </button>
        </div>
      </div>
    </div>
  )
}
