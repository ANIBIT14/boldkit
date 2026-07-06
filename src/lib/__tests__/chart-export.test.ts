import { describe, it, expect } from 'vitest'
import { toCSV } from '../chart-export'

describe('toCSV', () => {
  it('returns empty string for no rows', () => {
    expect(toCSV([])).toBe('')
  })

  it('writes a header row from the keys', () => {
    expect(toCSV([{ month: 'Jan', sales: 10 }])).toBe('month,sales\nJan,10')
  })

  it('unions keys across rows in first-seen order, filling gaps empty', () => {
    const csv = toCSV([{ a: 1 }, { a: 2, b: 3 }])
    expect(csv).toBe('a,b\n1,\n2,3')
  })

  it('escapes cells containing commas, quotes, or newlines (RFC 4180)', () => {
    const csv = toCSV([{ label: 'a,b', note: 'say "hi"', multi: 'x\ny' }])
    expect(csv).toBe('label,note,multi\n"a,b","say ""hi""","x\ny"')
  })

  it('renders null and undefined as empty cells', () => {
    expect(toCSV([{ a: null, b: undefined, c: 0 }])).toBe('a,b,c\n,,0')
  })
})
