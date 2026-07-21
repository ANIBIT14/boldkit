import { describe, expect, it } from 'vitest'
import { parseArgs, run } from './cli.js'

describe('parseArgs', () => {
  it('parses add with names and flags', () => {
    expect(parseArgs(['add', 'button', 'card', '--vue', '--dry-run'])).toEqual({
      command: 'add',
      names: ['button', 'card'],
      framework: 'vue',
      dryRun: true,
    })
  })

  it('parses bare invocation as help', () => {
    expect(parseArgs([]).command).toBeUndefined()
  })
})

describe('run', () => {
  it('add --dry-run prints the command without installing', async () => {
    expect(await run(['add', 'button', '--react', '--dry-run'])).toBe(0)
  })

  it('add with only unknown names fails', async () => {
    expect(await run(['add', 'definitely-not-real', '--react', '--dry-run'])).toBe(1)
  })

  it('search finds results', async () => {
    expect(await run(['search', 'button'])).toBe(0)
  })

  it('unknown command exits non-zero', async () => {
    expect(await run(['frobnicate'])).toBe(1)
  })
})
