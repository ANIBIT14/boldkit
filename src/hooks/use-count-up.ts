import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  threshold?: number
}

export function useCountUp({ end, duration = 1400, threshold = 0.2 }: UseCountUpOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  useEffect(() => {
    if (!triggered) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [triggered, end, duration])

  return { ref, count }
}
