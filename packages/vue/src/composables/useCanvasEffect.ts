/**
 * useCanvasEffect — Vue adapter over canvas-effect-core.
 * Mirrors the React useCanvasEffect hook.
 *
 * Owns the whole canvas lifecycle so an effect only has to describe how to
 * paint one frame: sizing (DPR-aware, pixel-count capped), pausing when
 * off-screen or backgrounded, and `prefers-reduced-motion`.
 */
import { onMounted, onUnmounted, type Ref } from 'vue'
import {
  mountCanvasEffect,
  type CanvasEffectHandle,
  type CanvasEffectOptions,
  type CanvasEffectSetup,
} from '@/lib/canvas-effect-core'

export type {
  CanvasEffectOptions,
  CanvasEffectSetup,
  CanvasEffectFrame,
} from '@/lib/canvas-effect-core'

/**
 * Call from `<script setup>`. Wires `onMounted` / `onUnmounted` for you.
 *
 * @param canvasRef Template ref on the `<canvas>` element.
 * @param setup     Runs once after the canvas is sized. Allocate state here and
 *                  return a `(dt) => void` frame function, where `dt` is ms
 *                  since the previous frame.
 * @param options   Sizing and pause behaviour.
 *
 * Read reactive props directly inside the frame function — Vue props are a
 * live proxy, so `props.speed` is always current with no ref mirroring.
 *
 * @example
 * useCanvasEffect(canvasRef, (ctx, el) => {
 *   let t = 0
 *   return (dt) => {
 *     t += dt * 0.001 * props.speed
 *     ctx.clearRect(0, 0, el.width, el.height)
 *   }
 * })
 */
export function useCanvasEffect(
  canvasRef: Ref<HTMLCanvasElement | null>,
  setup: CanvasEffectSetup,
  options?: CanvasEffectOptions
) {
  let handle: CanvasEffectHandle | null = null

  onMounted(() => {
    handle = mountCanvasEffect(canvasRef.value, setup, options)
  })

  onUnmounted(() => {
    handle?.dispose()
    handle = null
  })
}
