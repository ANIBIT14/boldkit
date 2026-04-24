declare module 'gifenc' {
  export function GIFEncoder(): {
    writeFrame(indexedPixels: Uint8Array, width: number, height: number, options?: { palette?: number[][]; delay?: number; repeat?: number }): void
    finish(): void
    bytes(): Uint8Array
  }
  export function quantize(rgba: Uint8ClampedArray | Uint8Array, maxColors: number): number[][]
  export function applyPalette(rgba: Uint8ClampedArray | Uint8Array, palette: number[][]): Uint8Array
}
