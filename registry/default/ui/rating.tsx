import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Star, Heart, Circle } from 'lucide-react'

const ratingVariants = cva('flex items-center gap-0.5', {
  variants: {
    size: {
      sm: '[&_svg]:h-4 [&_svg]:w-4',
      md: '[&_svg]:h-5 [&_svg]:w-5',
      lg: '[&_svg]:h-6 [&_svg]:w-6',
      xl: '[&_svg]:h-8 [&_svg]:w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const iconMap = {
  star: Star,
  heart: Heart,
  circle: Circle,
}

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof ratingVariants> {
  value?: number
  defaultValue?: number
  max?: number
  precision?: 0.5 | 1
  icon?: 'star' | 'heart' | 'circle'
  readOnly?: boolean
  disabled?: boolean
  onChange?: (value: number) => void
  onHoverChange?: (value: number | null) => void
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      precision = 1,
      icon = 'star',
      size,
      readOnly = false,
      disabled = false,
      onChange,
      onHoverChange,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)

    const isControlled = controlledValue !== undefined
    const currentValue = isControlled ? controlledValue : uncontrolledValue
    const displayValue = hoverValue ?? currentValue

    const Icon = iconMap[icon]

    const handleClick = (index: number, isHalf: boolean) => {
      if (readOnly || disabled) return

      const newValue = isHalf && precision === 0.5 ? index + 0.5 : index + 1

      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onChange?.(newValue)
    }

    const handleMouseMove = (
      e: React.MouseEvent<HTMLButtonElement>,
      index: number
    ) => {
      if (readOnly || disabled) return

      const rect = e.currentTarget.getBoundingClientRect()
      const isHalf = e.clientX - rect.left < rect.width / 2

      const newHoverValue =
        isHalf && precision === 0.5 ? index + 0.5 : index + 1
      setHoverValue(newHoverValue)
      onHoverChange?.(newHoverValue)
    }

    const handleMouseLeave = () => {
      if (readOnly || disabled) return
      setHoverValue(null)
      onHoverChange?.(null)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (readOnly || disabled) return

      let newValue = currentValue

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault()
          newValue = Math.min(currentValue + precision, max)
          break
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault()
          newValue = Math.max(currentValue - precision, 0)
          break
        case 'Home':
          e.preventDefault()
          newValue = 0
          break
        case 'End':
          e.preventDefault()
          newValue = max
          break
        default:
          return
      }

      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onChange?.(newValue)
    }

    return (
      <div
        ref={ref}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-label="Rating"
        tabIndex={readOnly || disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onMouseLeave={handleMouseLeave}
        className={cn(
          ratingVariants({ size }),
          disabled && 'opacity-50 pointer-events-none',
          !readOnly && !disabled && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {Array.from({ length: max }, (_, index) => {
          const fillValue = displayValue - index
          const isFilled = fillValue >= 1
          const isHalfFilled = fillValue > 0 && fillValue < 1

          return (
            <button
              key={index}
              type="button"
              tabIndex={-1}
              disabled={disabled || readOnly}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const isHalf = e.clientX - rect.left < rect.width / 2
                handleClick(index, isHalf)
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              className={cn(
                'relative transition-transform duration-150 focus:outline-none',
                !readOnly && !disabled && 'hover:scale-110'
              )}
            >
              {/* Empty icon (background) */}
              <Icon
                className={cn(
                  'stroke-foreground stroke-[2px] fill-muted transition-colors duration-150'
                )}
              />

              {/* Filled icon (overlay) */}
              {(isFilled || isHalfFilled) && (
                <Icon
                  className={cn(
                    'absolute inset-0 stroke-foreground stroke-[2px] fill-primary transition-colors duration-150'
                  )}
                  style={
                    isHalfFilled
                      ? {
                          clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                        }
                      : undefined
                  }
                />
              )}
            </button>
          )
        })}
      </div>
    )
  }
)
Rating.displayName = 'Rating'

export { Rating, ratingVariants }
