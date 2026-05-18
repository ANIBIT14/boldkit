<script setup lang="ts">
/**
 * GravityWells — Orbital particle physics
 *
 * Particles orbit drifting gravitational attractors, leaving fading
 * trails that form accretion-disk spirals. Each particle spawns in a
 * tangential orbit and slowly spirals inward due to light friction.
 *
 * @example
 * <GravityWells :well-count="3" :particle-count="180" :speed="1" />
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  /** Number of gravitational attractors */
  wellCount?: number
  /** Number of orbiting particles */
  particleCount?: number
  /** Palette for particles */
  colors?: string[]
  /** Animation speed multiplier */
  speed?: number
}>(), {
  wellCount: 3,
  particleCount: 180,
  colors: () => ['#ff6b6b', '#51cf66', '#339af0', '#fcc419', '#cc5de8'],
  speed: 1,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')!

  type Well = { x: number; y: number; vx: number; vy: number; mass: number }
  type Particle = {
    x: number; y: number; px: number; py: number
    vx: number; vy: number; color: string; life: number; maxLife: number
  }
  let wells: Well[] = []
  let particles: Particle[] = []

  const off = document.createElement('canvas')
  const offCtx = off.getContext('2d')!

  const initWells = () => {
    const W = el.width, H = el.height
    wells = Array.from({ length: props.wellCount }, () => ({
      x: W * (0.2 + Math.random() * 0.6), y: H * (0.2 + Math.random() * 0.6),
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      mass: 400 + Math.random() * 300,
    }))
  }

  const spawnParticle = (): Particle => {
    const w = wells[Math.floor(Math.random() * wells.length)]
    const orbitR = 60 + Math.random() * 180
    const angle = Math.random() * Math.PI * 2
    const x = w.x + Math.cos(angle) * orbitR
    const y = w.y + Math.sin(angle) * orbitR
    const tangentSpeed = Math.sqrt(w.mass / orbitR) * (0.7 + Math.random() * 0.6)
    const dir = Math.random() < 0.5 ? 1 : -1
    return {
      x, y, px: x, py: y,
      vx: -Math.sin(angle) * tangentSpeed * dir,
      vy:  Math.cos(angle) * tangentSpeed * dir,
      color: props.colors[Math.floor(Math.random() * props.colors.length)],
      life: 0, maxLife: 400 + Math.random() * 500,
    }
  }

  const init = () => { initWells(); particles = Array.from({ length: props.particleCount }, spawnParticle) }

  const resize = () => {
    const dpr = window.devicePixelRatio || 1
    if (el.offsetWidth > 0) el.width = el.offsetWidth * dpr
    if (el.offsetHeight > 0) el.height = el.offsetHeight * dpr
    init()
  }
  resize()

  const draw = () => {
    const W = el.width, H = el.height, spd = props.speed
    if (off.width !== W || off.height !== H) { off.width = W; off.height = H }

    offCtx.fillStyle = 'rgba(0,0,0,0.035)'
    offCtx.fillRect(0, 0, W, H)

    wells.forEach(w => {
      w.x += w.vx * spd; w.y += w.vy * spd
      if (w.x < W * 0.15 || w.x > W * 0.85) w.vx *= -1
      if (w.y < H * 0.15 || w.y > H * 0.85) w.vy *= -1
    })

    particles.forEach((p, i) => {
      p.px = p.x; p.py = p.y

      wells.forEach(w => {
        const dx = w.x - p.x, dy = w.y - p.y
        const distSq = dx * dx + dy * dy
        const dist = Math.sqrt(distSq) + 50
        const force = w.mass / (dist * dist)
        p.vx += (dx / dist) * force * 0.08 * spd
        p.vy += (dy / dist) * force * 0.08 * spd
      })

      p.vx *= 0.998; p.vy *= 0.998

      const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      if (vel > 6) { p.vx *= 6 / vel; p.vy *= 6 / vel }

      p.x += p.vx * spd; p.y += p.vy * spd; p.life++

      const nearWell = wells.some(w => {
        const dx = w.x - p.x, dy = w.y - p.y
        return dx * dx + dy * dy < 100
      })

      if (p.x < -80 || p.x > W + 80 || p.y < -80 || p.y > H + 80
        || p.life > p.maxLife || nearWell) {
        particles[i] = spawnParticle(); return
      }

      const fadeIn = Math.min(1, p.life / 30)
      const fadeOut = 1 - p.life / p.maxLife
      offCtx.globalAlpha = fadeIn * fadeOut * 0.75
      offCtx.strokeStyle = p.color
      offCtx.lineWidth = 1.6
      offCtx.beginPath()
      offCtx.moveTo(p.px, p.py); offCtx.lineTo(p.x, p.y)
      offCtx.stroke()
    })

    wells.forEach(w => {
      const grad = offCtx.createRadialGradient(w.x, w.y, 0, w.x, w.y, 55)
      grad.addColorStop(0, 'rgba(255,255,255,0.12)')
      grad.addColorStop(0.4, 'rgba(255,255,255,0.04)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      offCtx.globalAlpha = 1; offCtx.fillStyle = grad
      offCtx.beginPath(); offCtx.arc(w.x, w.y, 55, 0, Math.PI * 2); offCtx.fill()
    })

    ctx.clearRect(0, 0, W, H)
    ctx.globalAlpha = 1
    ctx.drawImage(off, 0, 0)
    raf = requestAnimationFrame(draw)
  }

  draw()
  ro = new ResizeObserver(resize)
  ro.observe(el)
})

onUnmounted(() => { cancelAnimationFrame(raf); ro?.disconnect() })
</script>

<template>
  <canvas ref="canvasRef" style="display:block;width:100%;height:100%" />
</template>
