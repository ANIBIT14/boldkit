import { useState } from 'react'
import type { ExportConfig, LoopMode, StudioState } from './types'
import { useExport } from './hooks/useExport'
import { cn } from '@/lib/utils'
import { C } from './lib/studioTheme'

function defaultFilename() {
  const now = new Date()
  const yy = String(now.getFullYear()).slice(2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const hh = String(now.getHours()).padStart(2, '0')
  const mi = String(now.getMinutes()).padStart(2, '0')
  return `dot-matrix-${yy}${mm}${dd}-${hh}${mi}`
}

interface ExportModalProps {
  state: StudioState
  onClose: () => void
}

const FORMATS = ['webm', 'png', 'svg', 'json'] as const
const SCALES = [1, 2, 4, 8] as const

export function ExportModal({ state, onClose }: ExportModalProps) {
  const [format, setFormat] = useState<ExportConfig['format']>('webm')
  const [scale, setScale] = useState<1 | 2 | 4 | 8>(2)
  const [loopMode, setLoopMode] = useState<LoopMode>('infinite')
  const [svgAnimated, setSvgAnimated] = useState(true)
  const [pngSpritesheet, setPngSpritesheet] = useState(false)
  const [bgTransparent, setBgTransparent] = useState(state.bgTransparent)
  const [filename, setFilename] = useState(defaultFilename)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  const { runExport } = useExport(state)

  const sFont = { fontFamily: 'var(--studio-font)' }

  const handleExport = async () => {
    setExporting(true)
    try {
      const trimmed = filename.trim() || defaultFilename()
      await runExport({ format, scale, bgTransparent, loopMode, svgAnimated, svgEmbedFont: false, pngSpritesheet }, trimmed)
      onClose()
    } catch (err) {
      setExportError(err instanceof Error ? err.message : 'Export failed. Please try again.')
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
                  onClick={() => { setFormat(f); setExportError(null) }}
                  className={cn(
                    'flex-1 py-2 text-xs border border-[var(--studio-border)] uppercase',
                    format === f ? 'studio-tool-active' : 'bg-transparent text-[var(--studio-text)] hover:bg-[var(--studio-tint)]'
                  )}
                  style={sFont}
                  aria-label={`Export as ${f === 'webm' ? 'Video (WebM)' : f.toUpperCase()}`}
                >
                  {f === 'webm' ? 'Video' : f}
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

          {format === 'webm' && (
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

          <div>
            <p className="text-[9px] tracking-widest text-[var(--studio-text-muted)] uppercase mb-2">Filename</p>
            <div className="flex items-center border border-[var(--studio-border)] bg-transparent">
              <input
                type="text"
                value={filename}
                onChange={e => setFilename(e.target.value)}
                spellCheck={false}
                className="flex-1 px-2 py-1.5 text-xs bg-transparent text-[var(--studio-text)] outline-none min-w-0"
                style={sFont}
                aria-label="Export filename"
              />
              <span className="px-2 text-[10px] text-[var(--studio-text-muted)] border-l border-[var(--studio-border)] shrink-0" style={sFont}>
                .{format === 'webm' ? 'webm' : format === 'json' ? 'boldkit.json' : format}
              </span>
            </div>
          </div>

          {exportError && (
            <div
              className="text-xs px-3 py-2 border"
              style={{ borderColor: C.border, color: C.text, background: C.tint, ...sFont }}
            >
              ⚠ {exportError}
            </div>
          )}

          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full py-3 text-sm uppercase tracking-widest border-3 border-[var(--studio-border)] studio-tool-active disabled:opacity-50"
            style={sFont}
            aria-label="Download export"
          >
            {exporting ? 'Exporting...' : `Download ${format === 'webm' ? 'Video (WebM)' : format.toUpperCase()}`}
          </button>
        </div>
      </div>
    </div>
  )
}
