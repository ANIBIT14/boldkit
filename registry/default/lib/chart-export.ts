/**
 * BoldKit Chart Export — framework-agnostic chart toolbar helpers.
 *
 * Operates on a chart's container element, so it works regardless of the
 * rendering engine: Recharts (SVG) and ECharts (canvas) are both handled.
 * Consumed by the React <ChartToolbar> and the Vue <ChartToolbar>.
 *
 * All functions are SSR-safe: they no-op on the server.
 */

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

function triggerDownload(href: string, filename: string) {
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// ──────────────────────────────────────────────────────────────────
// CSV — from the same data array you feed the chart
// ──────────────────────────────────────────────────────────────────

/** Escape a single CSV cell per RFC 4180 (quote if it contains ,"\n). */
function csvCell(value: unknown): string {
  const s = value == null ? '' : String(value)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/**
 * Serialize an array of row objects to a CSV string. Columns are the union
 * of keys across all rows, in first-seen order. Pure — no DOM access.
 */
export function toCSV(rows: Array<Record<string, unknown>>): string {
  if (!rows.length) return ''

  const columns: string[] = []
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!columns.includes(key)) columns.push(key)
    }
  }

  const lines = [
    columns.map(csvCell).join(','),
    ...rows.map((row) => columns.map((col) => csvCell(row[col])).join(',')),
  ]
  return lines.join('\n')
}

/**
 * Serialize an array of row objects to CSV and download it.
 * Columns are the union of keys across all rows, in first-seen order.
 */
export function downloadCSV(rows: Array<Record<string, unknown>>, filename = 'chart.csv'): void {
  if (!isBrowser || !rows.length) return

  const blob = new Blob([toCSV(rows)], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  triggerDownload(url, filename)
  URL.revokeObjectURL(url)
}

// ──────────────────────────────────────────────────────────────────
// SVG — only when the engine renders vector output (Recharts)
// ──────────────────────────────────────────────────────────────────

function findSvg(container: HTMLElement): SVGSVGElement | null {
  return container.querySelector('svg')
}

/** Returns true when the container has an <svg> to export (Recharts). */
export function canExportSVG(container: HTMLElement | null): boolean {
  return !!container && !!findSvg(container)
}

/** Serialize the container's <svg> and download it. No-op if there's no svg. */
export function exportSVG(container: HTMLElement, filename = 'chart.svg'): void {
  if (!isBrowser) return
  const svg = findSvg(container)
  if (!svg) return
  const clone = svg.cloneNode(true) as SVGSVGElement
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  const source = new XMLSerializer().serializeToString(clone)
  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  triggerDownload(url, filename)
  URL.revokeObjectURL(url)
}

// ──────────────────────────────────────────────────────────────────
// PNG — rasterize an <svg>, or grab an existing <canvas> directly
// ──────────────────────────────────────────────────────────────────

/**
 * Export the chart as a PNG. Handles both SVG (Recharts) and canvas
 * (ECharts) engines. `scale` multiplies resolution for crisp exports.
 */
export async function exportPNG(
  container: HTMLElement,
  filename = 'chart.png',
  scale = 2
): Promise<void> {
  if (!isBrowser) return

  // Canvas engine (ECharts) — read the bitmap straight off the canvas.
  const canvasEl = container.querySelector('canvas')
  if (canvasEl) {
    triggerDownload(canvasEl.toDataURL('image/png'), filename)
    return
  }

  // SVG engine (Recharts) — draw the vector onto an offscreen canvas.
  const svg = findSvg(container)
  if (!svg) return

  const rect = svg.getBoundingClientRect()
  const width = rect.width || svg.clientWidth || 640
  const height = rect.height || svg.clientHeight || 320

  const clone = svg.cloneNode(true) as SVGSVGElement
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  const source = new XMLSerializer().serializeToString(clone)
  const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)

  await new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width * scale
      canvas.height = height * scale
      const ctx = canvas.getContext('2d')
      if (!ctx) return resolve()
      // White backdrop so transparent charts don't render black on export.
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      triggerDownload(canvas.toDataURL('image/png'), filename)
      resolve()
    }
    img.onerror = () => resolve()
    img.src = svgUrl
  })
}

// ──────────────────────────────────────────────────────────────────
// Fullscreen — toggle the chart container into fullscreen
// ──────────────────────────────────────────────────────────────────

/** Toggle the container in/out of fullscreen. Safe no-op where unsupported. */
export function toggleFullscreen(container: HTMLElement): void {
  if (!isBrowser) return
  if (document.fullscreenElement) {
    void document.exitFullscreen?.()
  } else {
    void container.requestFullscreen?.()
  }
}
