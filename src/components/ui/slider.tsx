import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  // Jelly physics settings
  stiffness?: number
  damping?: number
  mass?: number
}

interface SpringState {
  position: number
  velocity: number
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = [0],
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      onValueCommit,
      disabled = false,
      orientation = 'horizontal',
      stiffness = 400,
      damping = 28,
      mass = 1,
      className,
      ...props
    },
    ref
  ) => {
    const trackRef = React.useRef<HTMLDivElement>(null)
    const animationRef = React.useRef<number | null>(null)
    const lastTimeRef = React.useRef<number>(0)
    const isDraggingRef = React.useRef<boolean>(false)
    const keyboardDragTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const currentValueRef = React.useRef<number[]>(defaultValue)

    // Track active drag handlers for cleanup on unmount
    const dragHandlersRef = React.useRef<{
      onMove: ((e: PointerEvent) => void) | null
      onUp: (() => void) | null
    }>({ onMove: null, onUp: null })

    const isControlled = controlledValue !== undefined
    const wasControlled = React.useRef(isControlled)
    React.useEffect(() => {
      if (wasControlled.current !== isControlled) {
        console.warn('[Slider] Component is changing from ' + (wasControlled.current ? 'controlled' : 'uncontrolled') + ' to ' + (isControlled ? 'controlled' : 'uncontrolled') + '. This is not supported.')
        wasControlled.current = isControlled
      }
    }, [isControlled])
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const actualValue = isControlled ? controlledValue : uncontrolledValue

    const isRange = actualValue.length > 1

    // Spring physics state for each thumb
    const [springs, setSprings] = React.useState<SpringState[]>(() =>
      actualValue.map((v) => ({
        position: ((v - min) / (max - min)) * 100,
        velocity: 0,
      }))
    )

    const [targets, setTargets] = React.useState<number[]>(() =>
      actualValue.map((v) => ((v - min) / (max - min)) * 100)
    )
    const targetsRef = React.useRef<number[]>(targets)

    const [activeThumb, setActiveThumb] = React.useState<number | null>(null)
    const [squishes, setSquishes] = React.useState<{ scaleX: number; scaleY: number }[]>(() =>
      actualValue.map(() => ({ scaleX: 1, scaleY: 1 }))
    )
    const [hoveringThumb, setHoveringThumb] = React.useState<number | null>(null)

    // Keep currentValueRef in sync for stale-closure-free commit
    React.useEffect(() => {
      currentValueRef.current = actualValue
    }, [actualValue])

    // Update targets when value changes externally
    React.useEffect(() => {
      const newTargets = actualValue.map((v) => ((v - min) / (max - min)) * 100)
      setTargets(newTargets)
      targetsRef.current = newTargets

      // Ensure springs array matches value array length
      if (springs.length !== actualValue.length) {
        setSprings(actualValue.map((v) => ({
          position: ((v - min) / (max - min)) * 100,
          velocity: 0,
        })))
        setSquishes(actualValue.map(() => ({ scaleX: 1, scaleY: 1 })))
      }
    }, [actualValue, min, max, springs.length])

    // Spring physics simulation — only runs while dragging
    const startSpringLoop = React.useCallback(() => {
      if (animationRef.current) return // already running

      lastTimeRef.current = 0

      const simulate = (timestamp: number) => {
        if (!isDraggingRef.current) {
          animationRef.current = null
          return
        }

        if (!lastTimeRef.current) {
          lastTimeRef.current = timestamp
        }

        const deltaTime = Math.min((timestamp - lastTimeRef.current) / 1000, 0.064)
        lastTimeRef.current = timestamp

        setSprings((prev) => {
          const newSprings: SpringState[] = []
          const newSquishes: { scaleX: number; scaleY: number }[] = []

          for (let i = 0; i < prev.length; i++) {
            const displacement = targetsRef.current[i] - prev[i].position
            const springForce = stiffness * displacement
            const dampingForce = damping * prev[i].velocity
            const acceleration = (springForce - dampingForce) / mass

            const newVelocity = prev[i].velocity + acceleration * deltaTime
            const newPosition = prev[i].position + newVelocity * deltaTime

            // Calculate squish based on velocity
            const velocityMagnitude = Math.abs(newVelocity)
            const squishAmount = Math.min(velocityMagnitude / 500, 0.25)
            const direction = newVelocity > 0 ? 1 : -1

            newSquishes.push({
              scaleX: 1 + squishAmount * direction * 0.4,
              scaleY: 1 - squishAmount * 0.25,
            })

            // Stop animation when settled
            if (Math.abs(displacement) < 0.01 && Math.abs(newVelocity) < 0.01) {
              newSprings.push({ position: targetsRef.current[i], velocity: 0 })
              newSquishes[i] = { scaleX: 1, scaleY: 1 }
            } else {
              newSprings.push({ position: newPosition, velocity: newVelocity })
            }
          }

          setSquishes(newSquishes)
          return newSprings
        })

        animationRef.current = requestAnimationFrame(simulate)
      }

      animationRef.current = requestAnimationFrame(simulate)
    }, [stiffness, damping, mass])

    // Cleanup rAF on unmount
    React.useEffect(() => {
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        if (keyboardDragTimeoutRef.current) {
          clearTimeout(keyboardDragTimeoutRef.current)
        }
      }
    }, [])

    // Cleanup drag handlers on unmount
    React.useEffect(() => {
      return () => {
        const { onMove, onUp } = dragHandlersRef.current
        if (onMove) {
          document.removeEventListener('pointermove', onMove)
        }
        if (onUp) {
          document.removeEventListener('pointerup', onUp)
        }
      }
    }, [])

    const getValueFromPosition = (clientX: number, clientY: number) => {
      if (!trackRef.current) return 0

      const rect = trackRef.current.getBoundingClientRect()
      let percent: number

      if (orientation === 'vertical') {
        percent = 1 - Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
      } else {
        percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      }

      const rawValue = min + percent * (max - min)
      const steppedValue = Math.round(rawValue / step) * step
      return Math.max(min, Math.min(max, steppedValue))
    }

    const getPercentFromPosition = (clientX: number, clientY: number) => {
      if (!trackRef.current) return 0

      const rect = trackRef.current.getBoundingClientRect()

      if (orientation === 'vertical') {
        return (1 - Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))) * 100
      }
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * 100
    }

    const findNearestThumb = (percent: number): number => {
      if (!isRange) return 0

      let nearestIndex = 0
      let nearestDistance = Infinity

      for (let i = 0; i < springs.length; i++) {
        const distance = Math.abs(springs[i].position - percent)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = i
        }
      }

      return nearestIndex
    }

    const updateValue = (index: number, newValue: number) => {
      const newValues = [...actualValue]

      if (isRange) {
        // Ensure values don't cross over
        if (index === 0) {
          newValues[0] = Math.min(newValue, actualValue[1] - step)
        } else {
          newValues[1] = Math.max(newValue, actualValue[0] + step)
        }
      } else {
        newValues[index] = newValue
      }

      // Clamp to min/max
      newValues[index] = Math.max(min, Math.min(max, newValues[index]))

      if (!isControlled) {
        setUncontrolledValue(newValues)
      }
      onValueChange?.(newValues)
    }

    const handleTrackPointerDown = (e: React.PointerEvent) => {
      if (disabled) return

      e.preventDefault()
      const percent = getPercentFromPosition(e.clientX, e.clientY)
      const nearestThumbIndex = findNearestThumb(percent)
      const newValue = getValueFromPosition(e.clientX, e.clientY)

      setActiveThumb(nearestThumbIndex)
      isDraggingRef.current = true
      startSpringLoop()
      updateValue(nearestThumbIndex, newValue)

      // Add velocity boost for jelly effect
      setSprings((prev) => {
        const newSprings = [...prev]
        newSprings[nearestThumbIndex] = {
          ...newSprings[nearestThumbIndex],
          velocity: (e.movementX || 0) * 10,
        }
        return newSprings
      })

      const handlePointerMove = (e: PointerEvent) => {
        const newValue = getValueFromPosition(e.clientX, e.clientY)
        updateValue(nearestThumbIndex, newValue)

        // Add velocity for jelly effect
        setSprings((prev) => {
          const newSprings = [...prev]
          newSprings[nearestThumbIndex] = {
            ...newSprings[nearestThumbIndex],
            velocity: newSprings[nearestThumbIndex].velocity + (e.movementX || 0) * 3,
          }
          return newSprings
        })
      }

      const handlePointerUp = () => {
        setActiveThumb(null)
        isDraggingRef.current = false
        onValueCommit?.(currentValueRef.current)
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
        dragHandlersRef.current = { onMove: null, onUp: null }
      }

      // Store handlers for cleanup
      dragHandlersRef.current = { onMove: handlePointerMove, onUp: handlePointerUp }

      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    }

    const handleThumbPointerDown = (index: number) => (e: React.PointerEvent) => {
      if (disabled) return

      e.preventDefault()
      e.stopPropagation()
      setActiveThumb(index)
      isDraggingRef.current = true
      startSpringLoop()

      const handlePointerMove = (e: PointerEvent) => {
        const newValue = getValueFromPosition(e.clientX, e.clientY)
        updateValue(index, newValue)

        // Add velocity for jelly effect
        setSprings((prev) => {
          const newSprings = [...prev]
          newSprings[index] = {
            ...newSprings[index],
            velocity: newSprings[index].velocity + (e.movementX || 0) * 3,
          }
          return newSprings
        })
      }

      const handlePointerUp = () => {
        setActiveThumb(null)
        isDraggingRef.current = false
        onValueCommit?.(currentValueRef.current)
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
        dragHandlersRef.current = { onMove: null, onUp: null }
      }

      // Store handlers for cleanup
      dragHandlersRef.current = { onMove: handlePointerMove, onUp: handlePointerUp }

      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    }

    const handleKeyDown = (index: number) => (e: React.KeyboardEvent) => {
      if (disabled) return

      let newValue = actualValue[index]
      const largeStep = (max - min) / 10

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(max, actualValue[index] + step)
          break
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(min, actualValue[index] - step)
          break
        case 'PageUp':
          newValue = Math.min(max, actualValue[index] + largeStep)
          break
        case 'PageDown':
          newValue = Math.max(min, actualValue[index] - largeStep)
          break
        case 'Home':
          newValue = min
          break
        case 'End':
          newValue = max
          break
        default:
          return
      }

      e.preventDefault()
      updateValue(index, newValue)

      // Add velocity for keyboard navigation jelly effect
      setSprings((prev) => {
        const newSprings = [...prev]
        newSprings[index] = {
          ...newSprings[index],
          velocity: (newValue > actualValue[index] ? 1 : -1) * 80,
        }
        return newSprings
      })
      isDraggingRef.current = true
      startSpringLoop()
      if (keyboardDragTimeoutRef.current) clearTimeout(keyboardDragTimeoutRef.current)
      keyboardDragTimeoutRef.current = setTimeout(() => { isDraggingRef.current = false }, 300)
    }

    // Calculate range fill position
    const getRangeFillStyle = () => {
      if (isRange) {
        const left = Math.min(springs[0]?.position ?? 0, springs[1]?.position ?? 0)
        const right = Math.max(springs[0]?.position ?? 0, springs[1]?.position ?? 0)
        return {
          left: `${left}%`,
          width: `${right - left}%`,
        }
      }
      return {
        left: '0%',
        width: `${springs[0]?.position ?? 0}%`,
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex touch-none select-none items-center',
          orientation === 'vertical' ? 'h-full w-5 flex-col' : 'w-full py-2',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...props}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className={cn(
            'relative cursor-pointer overflow-hidden',
            'border-3 border-foreground bg-muted',
            'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
            'transition-shadow duration-200',
            orientation === 'vertical' ? 'h-full w-4' : 'h-4 w-full',
            activeThumb !== null && 'shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
          )}
          onPointerDown={handleTrackPointerDown}
        >
          {/* Range fill */}
          <div
            className={cn(
              'absolute bg-primary',
              orientation === 'vertical' ? 'w-full' : 'h-full'
            )}
            style={
              orientation === 'vertical'
                ? {
                    bottom: getRangeFillStyle().left,
                    height: getRangeFillStyle().width,
                  }
                : getRangeFillStyle()
            }
          />

          {/* Decorative stripes */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(
                ${orientation === 'vertical' ? '0deg' : '45deg'},
                transparent,
                transparent 3px,
                currentColor 3px,
                currentColor 4px
              )`,
            }}
          />
        </div>

        {/* Thumbs */}
        {springs.map((spring, index) => (
          <div
            key={`thumb-${index}`}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={actualValue[index]}
            aria-valuetext={`${actualValue[index]} of ${max}`}
            aria-disabled={disabled}
            aria-orientation={orientation}
            onKeyDown={handleKeyDown(index)}
            onPointerDown={handleThumbPointerDown(index)}
            onMouseEnter={() => setHoveringThumb(index)}
            onMouseLeave={() => setHoveringThumb(null)}
            className={cn(
              'absolute h-7 w-7 cursor-grab',
              'border-3 border-foreground bg-background',
              'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'transition-shadow duration-150',
              activeThumb === index && 'cursor-grabbing shadow-[2px_2px_0px_hsl(var(--shadow-color))] z-10',
              hoveringThumb === index && activeThumb !== index && 'shadow-[5px_5px_0px_hsl(var(--shadow-color))]'
            )}
            style={
              orientation === 'vertical'
                ? {
                    bottom: `calc(${spring.position}% - 14px)`,
                    left: '50%',
                    transform: `
                      translateX(-50%)
                      scaleX(${squishes[index]?.scaleY ?? 1})
                      scaleY(${squishes[index]?.scaleX ?? 1})
                      rotate(${((squishes[index]?.scaleX ?? 1) - 1) * 8}deg)
                    `,
                  }
                : {
                    left: `calc(${spring.position}% - 14px)`,
                    top: '50%',
                    transform: `
                      translateY(-50%)
                      scaleX(${squishes[index]?.scaleX ?? 1})
                      scaleY(${squishes[index]?.scaleY ?? 1})
                      rotate(${((squishes[index]?.scaleX ?? 1) - 1) * 8}deg)
                    `,
                  }
            }
          >
            {/* Inner border detail */}
            <div className="absolute inset-1 border-2 border-foreground/20" />
            {/* Grip lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                'flex gap-0.5',
                orientation === 'vertical' ? 'flex-row' : 'flex-col'
              )}>
                <div className={cn(
                  'bg-foreground/30',
                  orientation === 'vertical' ? 'w-0.5 h-3' : 'w-3 h-0.5'
                )} />
                <div className={cn(
                  'bg-foreground/30',
                  orientation === 'vertical' ? 'w-0.5 h-3' : 'w-3 h-0.5'
                )} />
                <div className={cn(
                  'bg-foreground/30',
                  orientation === 'vertical' ? 'w-0.5 h-3' : 'w-3 h-0.5'
                )} />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
)
Slider.displayName = 'Slider'

export { Slider }
