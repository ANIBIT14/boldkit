import { useCallback, useRef } from 'react'
import type { StudioState, ExportConfig, Frame } from '../types'

// ── helpers ────────────────────────────────────────────────────────────────

function renderFrameToCanvas(
  frame: Frame,
  rows: number,
  cols: number,
  dotColor: string,
  bgColor: string,
  transparent: boolean,
  scale: number
): HTMLCanvasElement {
  const dotSize = scale * 10
  const gap = scale * 2
  const cellSize = dotSize + gap
  const width = cols * cellSize
  const height = rows * cellSize

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  if (!transparent) {
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const filled = frame.grid[row]?.[col] ?? false
      ctx.beginPath()
      ctx.arc(
        col * cellSize + cellSize / 2,
        row * cellSize + cellSize / 2,
        dotSize / 2,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = filled ? dotColor : '#1C1C1C'
      ctx.fill()
    }
  }
  return canvas
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ── export functions ────────────────────────────────────────────────────────

export async function exportPNG(
  state: StudioState,
  config: ExportConfig,
  filename: string
): Promise<void> {
  const { frames, rows, cols, dotColor } = state
  const bgColor = '#080808'

  if (config.pngSpritesheet && frames.length > 1) {
    const dotSize = config.scale * 10
    const gap = config.scale * 2
    const cellSize = dotSize + gap
    const frameWidth = cols * cellSize
    const frameHeight = rows * cellSize
    const canvas = document.createElement('canvas')
    canvas.width = frameWidth * frames.length
    canvas.height = frameHeight
    const ctx = canvas.getContext('2d')!
    frames.forEach((frame, i) => {
      const fc = renderFrameToCanvas(frame, rows, cols, dotColor, bgColor, config.bgTransparent, config.scale)
      ctx.drawImage(fc, i * frameWidth, 0)
    })
    canvas.toBlob(blob => blob && downloadBlob(blob, `${filename}-spritesheet.png`), 'image/png')
  } else {
    const activeFrame = frames.find(f => f.id === state.activeFrameId) ?? frames[0]
    const canvas = renderFrameToCanvas(activeFrame, rows, cols, dotColor, bgColor, config.bgTransparent, config.scale)
    canvas.toBlob(blob => blob && downloadBlob(blob, `${filename}.png`), 'image/png')
  }
}

export function exportSVGString(
  state: StudioState,
  config: ExportConfig
): string {
  const { rows, cols, dotColor } = state
  const activeFrame = state.frames.find(f => f.id === state.activeFrameId) ?? state.frames[0]

  const dotR = 0.38
  const bgRect = config.bgTransparent
    ? ''
    : `<rect width="${cols}" height="${rows}" fill="#080808"/>`

  if (config.svgAnimated && state.frames.length > 1) {
    const totalDuration = state.frames.reduce((s, f) => s + f.duration, 0) / 1000

    const dots = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c + 0.5
        const cy = r + 0.5
        let t = 0
        const keyTimes: number[] = []
        const values: string[] = []
        state.frames.forEach(frame => {
          keyTimes.push(t / totalDuration)
          values.push(frame.grid[r]?.[c] ? dotColor : '#1C1C1C')
          t += frame.duration / 1000
        })
        keyTimes.push(1)
        values.push(values[values.length - 1])

        dots.push(
          `<circle cx="${cx}" cy="${cy}" r="${dotR}">` +
          `<animate attributeName="fill" dur="${totalDuration}s" repeatCount="indefinite" ` +
          `keyTimes="${keyTimes.join(';')}" values="${values.join(';')}"/>` +
          `</circle>`
        )
      }
    }

    const fontFace = config.svgEmbedFont
      ? `<defs><style>@font-face{font-family:'NDot47';src:url('data:font/woff2;base64,...') format('woff2');}</style></defs>`
      : ''

    return `<?xml version="1.0" encoding="UTF-8"?>` +
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols} ${rows}">` +
      fontFace + bgRect + dots.join('') + `</svg>`
  }

  // Static SVG — active frame only
  const circles = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const filled = activeFrame.grid[r]?.[c] ?? false
      circles.push(`<circle cx="${c + 0.5}" cy="${r + 0.5}" r="${dotR}" fill="${filled ? dotColor : '#1C1C1C'}"/>`)
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols} ${rows}">` +
    bgRect + circles.join('') + `</svg>`
}

export function exportJSON(state: StudioState, filename: string): void {
  const payload = {
    frames: state.frames,
    rows: state.rows,
    cols: state.cols,
    dotColor: state.dotColor,
    bgTransparent: state.bgTransparent,
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  downloadBlob(blob, `${filename}.boldkit.json`)
}

export async function exportWebM(
  state: StudioState,
  config: ExportConfig,
  filename: string
): Promise<void> {
  const { rows, cols, dotColor, bgTransparent } = state
  const bgColor = '#080808'

  const dotSize = config.scale * 10
  const gap = config.scale * 2
  const cellSize = dotSize + gap
  const width = cols * cellSize
  const height = rows * cellSize

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  const mimeType = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']
    .find(t => MediaRecorder.isTypeSupported(t)) ?? 'video/webm'

  const stream = canvas.captureStream()
  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 4_000_000 })
  const chunks: Blob[] = []
  recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data) }

  const playCount = config.loopMode === 'once' ? 1 : config.loopMode === '3x' ? 3 : 10

  function drawFrame(frame: Frame) {
    if (!bgTransparent) {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)
    } else {
      ctx.clearRect(0, 0, width, height)
    }
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const filled = frame.grid[row]?.[col] ?? false
        if (bgTransparent && !filled) continue
        ctx.beginPath()
        ctx.arc(
          col * cellSize + cellSize / 2,
          row * cellSize + cellSize / 2,
          dotSize / 2,
          0,
          Math.PI * 2
        )
        ctx.fillStyle = filled ? dotColor : '#1C1C1C'
        ctx.fill()
      }
    }
  }

  return new Promise<void>(resolve => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType })
      downloadBlob(blob, `${filename}.webm`)
      resolve()
    }

    recorder.start()

    const allFrames: Frame[] = []
    for (let i = 0; i < playCount; i++) {
      allFrames.push(...state.frames)
    }

    let idx = 0
    function advance() {
      if (idx >= allFrames.length) {
        recorder.stop()
        return
      }
      const frame = allFrames[idx++]
      drawFrame(frame)
      setTimeout(advance, frame.duration)
    }
    advance()
  })
}

// ── hook ───────────────────────────────────────────────────────────────────

export function useExport(state: StudioState) {
  const stateRef = useRef(state)
  stateRef.current = state

  const runExport = useCallback(async (config: ExportConfig, filename: string) => {
    const s = stateRef.current
    switch (config.format) {
      case 'png': return exportPNG(s, config, filename)
      case 'svg': {
        const svgStr = exportSVGString(s, config)
        const blob = new Blob([svgStr], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = `${filename}.svg`; a.click()
        URL.revokeObjectURL(url)
        break
      }
      case 'json': return exportJSON(s, filename)
      case 'webm': return exportWebM(s, config, filename)
    }
  }, [])

  return { runExport }
}
