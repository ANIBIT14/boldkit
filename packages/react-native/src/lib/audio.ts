/**
 * Thin wrapper around react-native-audio-api for neubrutalism sound feedback.
 *
 * Both functions detect API availability via try/require and are fire-and-forget
 * — they never throw or propagate errors to the calling component.
 */

let AudioContextClass: (new () => AudioContext) | null = null

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const api = require('@software-mansion/react-native-audio-api')
  AudioContextClass = api.AudioContext ?? null
} catch {
  // audio-api not installed — all sound functions become no-ops
}

/** Short 50ms sine burst at 800Hz — used for Button press feedback. */
export async function playClickSound(): Promise<void> {
  if (!AudioContextClass) return
  try {
    const ctx = new AudioContextClass()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.value = 800
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.05)
  } catch {
    // silently ignore
  }
}

/**
 * Two-tone 80ms sweep for toggle feedback.
 * on=true: 600→900Hz (ascending feel = "on")
 * on=false: 900→600Hz (descending feel = "off")
 */
export async function playToggleSound(on: boolean): Promise<void> {
  if (!AudioContextClass) return
  try {
    const ctx = new AudioContextClass()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    const startFreq = on ? 600 : 900
    const endFreq = on ? 900 : 600
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(endFreq, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.08)
  } catch {
    // silently ignore
  }
}

/** Whether the audio API is available in the current environment. */
export const isAudioAvailable = AudioContextClass !== null
