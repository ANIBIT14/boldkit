import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const SAFE_URL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:'])

/** Sanitize a URL to prevent javascript: protocol injection. Returns '#' for unsafe values. */
export function safeHref(url: string | undefined): string {
  if (!url) return '#'
  if (url.startsWith('/') || url.startsWith('#')) return url
  try {
    const parsed = new URL(url, 'https://placeholder.invalid')
    return SAFE_URL_PROTOCOLS.has(parsed.protocol) ? url : '#'
  } catch {
    return '#'
  }
}

/** Sanitize a CSS value by stripping characters that could break out of a CSS declaration. */
export function sanitizeCssValue(value: string): string {
  return value.replace(/[{}<>;"'\\]/g, '')
}
