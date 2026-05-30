/**
 * Copy text to the clipboard, returning whether it succeeded. Uses the async
 * Clipboard API when available and falls back to a legacy `execCommand` path
 * for insecure contexts / older browsers. Never throws, so callers can show a
 * "copied" confirmation only when the copy actually worked.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the legacy path below
  }

  try {
    if (typeof document === 'undefined') return false
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}
