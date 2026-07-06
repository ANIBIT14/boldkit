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

// The container holds the toolbar buttons (whose icons are <svg> elements)
// AND the chart. Skip any <svg> belonging to the toolbar controls so we
// serialize the chart, not a button icon.
function findSvg(container: HTMLElement): SVGSVGElement | null {
  for (const svg of container.querySelectorAll('svg')) {
    if (!svg.closest('[data-chart-export-controls]')) return svg as SVGSVGElement
  }
  return null
}

/** Returns true when the container has an <svg> to export (Recharts). */
export function canExportSVG(container: HTMLElement | null): boolean {
  return !!container && !!findSvg(container)
}

// Presentation properties that carry a chart's appearance. Recharts drives
// most of these through CSS variables (e.g. fill: hsl(var(--primary))) and
// external stylesheets — neither of which survive serialization. We read the
// *computed* value (which resolves the variables to concrete colors) and pin
// it on the clone so the exported SVG is fully self-contained.
//
// All of these are valid SVG presentation attributes, so we write them BOTH
// as an inline style AND as attributes — overwriting any `fill="hsl(var(--x))"`
// left on the element. Chrome honours the style override, but Preview /
// Quick Look / Illustrator and many rasterizers read the attribute and choke
// on var(), rendering the chart colorless. Overwriting the attribute fixes
// color in every viewer.
const SVG_STYLE_PROPS = [
  'fill', 'fill-opacity', 'fill-rule',
  'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray',
  'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit',
  'opacity', 'color', 'visibility', 'display',
  'font-family', 'font-size', 'font-weight', 'font-style',
  'text-anchor', 'dominant-baseline', 'letter-spacing',
]

function inlineComputedStyles(src: Element, dst: Element): void {
  const cs = getComputedStyle(src)
  let style = ''
  for (const prop of SVG_STYLE_PROPS) {
    const value = cs.getPropertyValue(prop)
    if (!value) continue
    style += `${prop}:${value};`
    // Overwrite the presentation attribute with the concrete value so
    // renderers that don't apply CSS `style` precedence still get color.
    dst.setAttribute(prop, value)
  }
  dst.setAttribute('style', style)

  const srcChildren = src.children
  const dstChildren = dst.children
  for (let i = 0; i < srcChildren.length; i++) {
    if (dstChildren[i]) inlineComputedStyles(srcChildren[i], dstChildren[i])
  }
}

/**
 * Clone the live <svg>, inline every element's computed style so it renders
 * standalone, and return the serialized markup plus its rendered size.
 */
function serializeSvg(svg: SVGSVGElement): { source: string; width: number; height: number } {
  const rect = svg.getBoundingClientRect()
  const width = Math.round(rect.width || svg.clientWidth || 640)
  const height = Math.round(rect.height || svg.clientHeight || 320)

  const clone = svg.cloneNode(true) as SVGSVGElement
  inlineComputedStyles(svg, clone)
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  clone.setAttribute('width', String(width))
  clone.setAttribute('height', String(height))
  if (!clone.getAttribute('viewBox')) {
    clone.setAttribute('viewBox', `0 0 ${width} ${height}`)
  }
  // Opaque backdrop so the export isn't transparent (reads as black in some viewers).
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  bg.setAttribute('x', '0')
  bg.setAttribute('y', '0')
  bg.setAttribute('width', String(width))
  bg.setAttribute('height', String(height))
  bg.setAttribute('fill', '#ffffff')
  clone.insertBefore(bg, clone.firstChild)

  return { source: new XMLSerializer().serializeToString(clone), width, height }
}

/** Serialize the container's <svg> and download it. No-op if there's no svg. */
export function exportSVG(container: HTMLElement, filename = 'chart.svg'): void {
  if (!isBrowser) return
  const svg = findSvg(container)
  if (!svg) return
  const { source } = serializeSvg(svg)
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

  // Canvas engine (ECharts) — composite the bitmap onto white so a
  // transparent chart background doesn't export as black.
  const canvasEl = container.querySelector('canvas')
  if (canvasEl) {
    const out = document.createElement('canvas')
    out.width = canvasEl.width
    out.height = canvasEl.height
    const c = out.getContext('2d')
    if (!c) return
    c.fillStyle = '#ffffff'
    c.fillRect(0, 0, out.width, out.height)
    c.drawImage(canvasEl, 0, 0)
    triggerDownload(out.toDataURL('image/png'), filename)
    return
  }

  // SVG engine (Recharts) — draw the style-inlined vector onto an offscreen canvas.
  const svg = findSvg(container)
  if (!svg) return

  const { source, width, height } = serializeSvg(svg)
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

/**
 * Toggle the container in/out of fullscreen. Safe no-op where unsupported.
 *
 * A fullscreened element is sized to the whole screen, but the chart inside
 * keeps its fixed height — leaving the browser's black backdrop showing in the
 * gap. On enter we give the container an opaque background and stretch the
 * chart to fill; on exit we restore the original inline styles.
 */
export function toggleFullscreen(container: HTMLElement): void {
  if (!isBrowser) return

  if (document.fullscreenElement) {
    void document.exitFullscreen?.()
    return
  }
  if (!container.requestFullscreen) return

  // The chart is the last child (the toolbar is an absolutely-positioned sibling).
  const chart = container.lastElementChild as HTMLElement | null
  const prevContainerStyle = container.getAttribute('style') ?? ''
  const prevChartStyle = chart?.getAttribute('style') ?? ''

  const onChange = () => {
    if (document.fullscreenElement === container) {
      // Fill the screen with the page background and CENTER the chart, so the
      // browser's black fullscreen backdrop never shows. Canvas engines
      // (ECharts autoresize) grow to fill; SVG engines (Recharts) that don't
      // re-measure simply sit centered on the matching background — no black gap.
      container.style.background = 'hsl(var(--background, 0 0% 100%))'
      container.style.boxSizing = 'border-box'
      container.style.padding = '1.5rem'
      container.style.display = 'flex'
      container.style.flexDirection = 'column'
      if (chart) {
        // flex:1 + min-height:0 gives the chart a DEFINITE height (not a
        // percentage), which is what Recharts' ResponsiveContainer and
        // ECharts' autoresize need to grow. align-items:center + height:100%
        // would instead collapse the chart to min-content. margin:auto centers.
        chart.style.flex = '1 1 auto'
        chart.style.minHeight = '0'
        chart.style.width = '100%'
        chart.style.maxWidth = '1600px'
        chart.style.margin = '0 auto'
      }
    } else {
      // Restore and detach — fullscreen was exited.
      container.setAttribute('style', prevContainerStyle)
      if (chart) chart.setAttribute('style', prevChartStyle)
      document.removeEventListener('fullscreenchange', onChange)
    }
  }

  document.addEventListener('fullscreenchange', onChange)
  void container.requestFullscreen()
}
