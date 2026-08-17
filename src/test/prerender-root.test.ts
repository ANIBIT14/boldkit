/**
 * replaceRootDiv is the piece that decides what crawlers actually receive.
 * It previously used a non-greedy regex, so running prerender twice over one
 * dist appended a second copy of every page instead of replacing it — two <h1>s
 * and doubled body text, which is a real SEO problem and produced no error.
 */
import { describe, it, expect } from 'vitest'
import { replaceRootDiv } from '../../scripts/prerender'

// Mirrors the real generate-html.ts output: #root, then a <noscript> that
// contains its own <div> — which is why a greedy match is also wrong.
const TEMPLATE = `<!doctype html>
<html><head><title>t</title></head>
  <body>
    <div id="root"></div>
    <script src="/a.js"></script>
    <noscript>
      <div><h1>Fallback</h1></div>
    </noscript>
  </body>
</html>`

describe('replaceRootDiv', () => {
  it('injects the rendered body into #root', () => {
    const out = replaceRootDiv(TEMPLATE, '<main><h1>Real</h1></main>')!
    expect(out).toContain('<div id="root"><main><h1>Real</h1></main></div>')
  })

  it('leaves the trailing noscript block intact', () => {
    const out = replaceRootDiv(TEMPLATE, '<main>x</main>')!
    expect(out).toContain('<noscript>')
    expect(out).toContain('<div><h1>Fallback</h1></div>')
    expect(out).toContain('</body>')
  })

  it('is idempotent — re-running replaces rather than appends', () => {
    const once = replaceRootDiv(TEMPLATE, '<main><h1>Real</h1><div>nested</div></main>')!
    const twice = replaceRootDiv(once, '<main><h1>Real</h1><div>nested</div></main>')!
    expect(twice).toBe(once)
    expect(twice.match(/<h1>Real<\/h1>/g)).toHaveLength(1)
  })

  it('handles deeply nested divs in the rendered body', () => {
    const body = '<div><div><div><p>deep</p></div></div></div>'
    const out = replaceRootDiv(TEMPLATE, body)!
    expect(out).toContain(`<div id="root">${body}</div>`)
    expect(out).toContain('<noscript>')
  })

  it('returns null when the root marker is missing, so the file is left alone', () => {
    expect(replaceRootDiv('<html><body>no root</body></html>', 'x')).toBeNull()
  })
})
