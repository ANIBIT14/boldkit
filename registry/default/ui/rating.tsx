import * as React from 'react'
import { cn } from '@/lib/utils'

// ── Icons ────────────────────────────────────────────────────────────────────

function StarIcon({ filled, half, gradientId }: { filled: boolean; half?: boolean; gradientId: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {half ? (
        <>
          <defs>
            <linearGradient id={gradientId}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={`url(#${gradientId})`}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CircleIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

// ── Types ────────────────────────────────────────────────────────────────────

type IconType = 'star' | 'heart' | 'circle'
type SizeVariant = 'sm' | 'md' | 'lg' | 'xl'

interface RatingProps {
  /** Controlled value */
  value?: number
  /** Uncontrolled default value */
  defaultValue?: number
  /** Maximum number of icons (default 5) */
  max?: number
  /** Precision: 1 for whole, 0.5 for half stars */
  precision?: number
  /** Icon type */
  icon?: IconType
  /** Size variant */
  size?: SizeVariant
  /** Disable interactions */
  readOnly?: boolean
  /** Disable completely */
  disabled?: boolean
  /** Called when value changes */
  onChange?: (value: number) => void
  /** Called when hover value changes (null = mouse left) */
  onHoverChange?: (value: number | null) => void
  className?: string
}

const sizeClasses: Record<SizeVariant, string> = {
  sm: '[&_svg]:h-4 [&_svg]:w-4',
  md: '[&_svg]:h-5 [&_svg]:w-5',
  lg: '[&_svg]:h-6 [&_svg]:w-6',
  xl: '[&_svg]:h-8 [&_svg]:w-8',
}

const iconLabel: Record<IconType, string> = {
  star: 'stars',
  heart: 'hearts',
  circle: 'circles',
}

// "1 stars" reads wrong in an accessible name. Vue's Rating already singularises.
const iconLabelFor = (icon: IconType, count: number) =>
  count === 1 ? iconLabel[icon].slice(0, -1) : iconLabel[icon]

// ── Component ────────────────────────────────────────────────────────────────

export function Rating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  precision = 1,
  icon = 'star',
  size = 'md',
  readOnly = false,
  disabled = false,
  onChange,
  onHoverChange,
  className,
}: RatingProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  // Unique gradient id per instance so multiple ratings don't share/clobber the
  // half-star <linearGradient> definition (duplicate DOM ids).
  const gradientId = `rating-half-${React.useId().replace(/:/g, '')}`

  const currentValue = isControlled ? controlledValue! : internalValue

  const setValue = (next: number) => {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  const interactive = !readOnly && !disabled

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!interactive) return
    const step = precision
    let next = currentValue
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      next = Math.min(max, currentValue + step)
      e.preventDefault()
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      next = Math.max(0, currentValue - step)
      e.preventDefault()
    } else if (e.key === 'Home') {
      next = 0
      e.preventDefault()
    } else if (e.key === 'End') {
      next = max
      e.preventDefault()
    } else {
      return
    }
    setValue(next)
  }

  const handleMouseLeave = () => {
    onHoverChange?.(null)
  }

  const handleStarMouseMove = (_e: React.MouseEvent<HTMLButtonElement>, starIndex: number) => {
    if (!interactive) return
    onHoverChange?.(starIndex)
  }

  const handleStarClick = (starIndex: number) => {
    if (!interactive) return
    setValue(starIndex)
  }

  const valueText =
    icon === 'heart'
      ? `${currentValue} out of ${max} hearts`
      : icon === 'circle'
        ? `${currentValue} out of ${max} circles`
        : `${currentValue} out of ${max} stars`

  function renderIcon(index: number) {
    const filled = index <= currentValue
    const half = !filled && index - 0.5 <= currentValue && precision === 0.5
    if (icon === 'heart') return <HeartIcon filled={filled} />
    if (icon === 'circle') return <CircleIcon filled={filled} />
    return <StarIcon filled={filled} half={half} gradientId={gradientId} />
  }

  return (
    // role="group" of toggle buttons (roving tabindex), not role="slider": a
    // focusable slider wrapping focusable buttons is a nested-interactive
    // violation (axe). Arrow keys still work — keydown bubbles from the stars.
    <div
      role="group"
      aria-label={`Rating: ${valueText}`}
      onKeyDown={handleKeyDown}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'flex items-center gap-0.5 outline-none',
        sizeClasses[size],
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {Array.from({ length: max }, (_, i) => {
        const starIndex = i + 1
        // Roving tabindex: exactly one star must be tabbable. Clamp first —
        // an out-of-range value would match no star and make the whole group
        // unreachable by keyboard.
        const activeIndex = Math.min(Math.max(Math.ceil(currentValue), 1), max)
        const isFocusable = interactive && starIndex === activeIndex
        return (
          <button
            key={starIndex}
            type="button"
            tabIndex={isFocusable ? 0 : -1}
            disabled={disabled}
            aria-label={`${starIndex} ${iconLabelFor(icon, starIndex)}`}
            aria-pressed={starIndex <= currentValue}
            onClick={() => handleStarClick(starIndex)}
            onMouseMove={(e) => handleStarMouseMove(e, starIndex)}
            className={cn(
              'flex items-center justify-center transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              interactive && 'hover:scale-110 cursor-pointer',
              !interactive && 'cursor-default'
            )}
          >
            {renderIcon(starIndex)}
          </button>
        )
      })}
    </div>
  )
}
