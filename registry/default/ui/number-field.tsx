import * as React from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Number helpers ───────────────────────────────────────────────────────────
//
// Radix has no NumberField, so this mirrors Reka UI's NumberField behaviour
// (which the Vue version is built on): snap to the `step` grid anchored at
// `min`, clamp to [min, max], and round-trip through the formatter so the
// stored value never holds more precision than is displayed.

const decimalsOf = (n: number) => {
  const [, fraction = ''] = String(n).split('.')
  return fraction.length
}

const clamp = (n: number, min?: number, max?: number) =>
  Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n))

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

interface NumberCodec {
  format: (n: number) => string
  parse: (text: string) => number
  /** Whether `text` is something a user could be part-way through typing. */
  isPartial: (text: string) => boolean
  hasDecimals: boolean
  /**
   * Compact notation ("1.5K") rounds for display, so the displayed string is
   * not a faithful copy of the value and must not be used to cap precision.
   */
  isLossy: boolean
}

// JS `\s` already covers NBSP and the narrow NBSP used by fr/ru grouping.
const SPACES = /\s/g

function createCodec(locale: string | undefined, options: Intl.NumberFormatOptions | undefined): NumberCodec {
  const formatter = new Intl.NumberFormat(locale, options)
  const { numberingSystem } = formatter.resolvedOptions()
  const isCompact = options?.notation === 'compact'
  const isPercent = options?.style === 'percent'

  // Separators come from a plain formatter in the same numbering system:
  // compact output ("-11K") has no decimal part to read them from.
  const baseParts = new Intl.NumberFormat(locale, { numberingSystem }).formatToParts(-11111.1)
  const decimal = baseParts.find((p) => p.type === 'decimal')?.value ?? '.'
  const group = baseParts.find((p) => p.type === 'group')?.value ?? ','

  // Locales such as ar-EG, fa-IR and bn format with their own digits; map them
  // back to ASCII before parsing (ASCII digits are always accepted too).
  const digitFormatter = new Intl.NumberFormat(locale, { numberingSystem, useGrouping: false })
  const localDigits = Array.from({ length: 10 }, (_, i) => digitFormatter.format(i))
  const toAsciiDigits = (text: string) =>
    [...text].map((ch) => {
      const i = localDigits.indexOf(ch)
      return i === -1 ? ch : String(i)
    }).join('')

  // Compact suffixes ("K", "M", "万"…) with the magnitude each stands for,
  // longest first so "Mio." wins over "M".
  const compactSuffixes: Array<[string, number]> = []
  if (isCompact) {
    for (let power = 1; power <= 15; power++) {
      const suffix = formatter.formatToParts(10 ** power).find((p) => p.type === 'compact')?.value
      if (suffix && !compactSuffixes.some(([s]) => s === suffix)) compactSuffixes.push([suffix, 10 ** power])
    }
    compactSuffixes.sort((a, b) => b[0].length - a[0].length)
  }

  // Every character the formatter can emit (currency symbols, %, accounting
  // parentheses, unit labels, bidi marks) plus digits and minus signs is
  // acceptable while typing.
  const emitted = [
    ...formatter.formatToParts(-11111.1),
    ...formatter.formatToParts(-1.5),
  ]
    .filter((p) => p.type !== 'integer' && p.type !== 'fraction')
    .map((p) => p.value)
    .join('')
  const allowed = new Set([
    ...'0123456789-−+',
    ...localDigits.join(''),
    ...emitted,
    ...compactSuffixes.map(([s]) => s).join(''),
    decimal,
    group,
    ' ',
    String.fromCharCode(0xa0),
    String.fromCharCode(0x202f),
  ])

  return {
    format: (n) => formatter.format(n),
    parse: (text) => {
      let rest = toAsciiDigits(text)
      let magnitude = 1
      const suffix = compactSuffixes.find(([s]) => rest.includes(s))
      if (suffix) {
        rest = rest.replace(suffix[0], '')
        magnitude = suffix[1]
      }
      // Accounting format writes negatives as "($5.00)".
      const parenthesised = /\(.*\)/.test(rest)
      const normalised = rest
        .replace(new RegExp(escapeRegExp(group), 'g'), '')
        .replace(SPACES, '')
        .replace(new RegExp(escapeRegExp(decimal), 'g'), '.')
        .replace(/−/g, '-')
        .replace(/[^\d.-]/g, '')
      if (!/\d/.test(normalised)) return NaN
      let n = Number(normalised) * magnitude
      if (parenthesised) n = -Math.abs(n)
      return isPercent ? n / 100 : n
    },
    isPartial: (text) => [...text].every((ch) => allowed.has(ch)),
    hasDecimals: isCompact || (formatter.resolvedOptions().maximumFractionDigits ?? 0) > 0,
    isLossy: isCompact,
  }
}

// ── Context ──────────────────────────────────────────────────────────────────

interface NumberFieldContextValue {
  inputId: string
  inputRef: React.MutableRefObject<HTMLInputElement | null>
  registerInput: (node: HTMLInputElement | null) => void
  value: number | undefined
  text: string
  setText: (text: string) => void
  commit: (text: string) => void
  increment: (multiplier?: number) => void
  decrement: (multiplier?: number) => void
  toMin: () => void
  toMax: () => void
  canIncrement: boolean
  canDecrement: boolean
  isPartial: (text: string) => boolean
  inputMode: 'decimal' | 'numeric'
  min?: number
  max?: number
  disabled: boolean
  readOnly: boolean
}

const NumberFieldContext = React.createContext<NumberFieldContextValue | null>(null)

function useNumberField(part: string) {
  const ctx = React.useContext(NumberFieldContext)
  if (!ctx) throw new Error(`<${part}> must be used within <NumberField>`)
  return ctx
}

// ── Root ─────────────────────────────────────────────────────────────────────

interface NumberFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * Controlled value. Passing the prop at all makes the field controlled, so
   * `undefined` or `null` mean "controlled and empty" — feeding
   * `onValueChange`'s `undefined` straight back in keeps it controlled.
   */
  value?: number | null
  /** Uncontrolled initial value */
  defaultValue?: number
  /** Called with the new value (`undefined` when the field is cleared) */
  onValueChange?: (value: number | undefined) => void
  min?: number
  max?: number
  /** Amount each increment/decrement changes the value (default 1). PageUp/PageDown use ×10. */
  step?: number
  /** Intl.NumberFormat options for the displayed value (currency, percent, unit…) */
  formatOptions?: Intl.NumberFormatOptions
  /** Locale used for formatting (defaults to the browser locale) */
  locale?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  /** Submits the raw number under this name in native forms */
  name?: string
  /** Id applied to the input, so a <Label htmlFor> can target it */
  id?: string
  /** Stop the mouse wheel from changing the value while the input is focused */
  disableWheelChange?: boolean
  /** Reverse the wheel direction */
  invertWheelChange?: boolean
}

const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  (allProps, ref) => {
    const {
      value: controlledValue,
      defaultValue,
      onValueChange,
      min,
      max,
      step = 1,
      formatOptions,
      locale,
      disabled = false,
      readOnly = false,
      required,
      name,
      id,
      disableWheelChange = false,
      invertWheelChange = false,
      className,
      children,
      ...props
    } = allProps
    const generatedId = React.useId()
    const inputId = id ?? `number-field-${generatedId.replace(/:/g, '')}`
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    // Mouse wheel steps the value while the input is focused, as in Reka.
    // React's onWheel is passive (it can't preventDefault the page scroll), so
    // the listener is bound natively when the input registers. It forwards to
    // the latest render's handler.
    const wheelHandler = React.useRef<(e: WheelEvent) => void>(() => {})
    const onWheel = React.useCallback((e: WheelEvent) => wheelHandler.current(e), [])
    const registerInput = React.useCallback(
      (node: HTMLInputElement | null) => {
        if (inputRef.current === node) return
        inputRef.current?.removeEventListener('wheel', onWheel)
        node?.addEventListener('wheel', onWheel, { passive: false })
        inputRef.current = node
      },
      [onWheel]
    )

    // Presence, not definedness: `value={undefined}` is a controlled empty field.
    const isControlled = 'value' in allProps
    const [internalValue, setInternalValue] = React.useState<number | undefined>(defaultValue)
    const value = isControlled ? (controlledValue ?? undefined) : internalValue

    // Key on the serialised options so an inline object literal doesn't
    // rebuild the formatter (and reset the typed text) on every render.
    const formatKey = JSON.stringify(formatOptions ?? {})
    const codec = React.useMemo(
      () => createCodec(locale, JSON.parse(formatKey) as Intl.NumberFormatOptions),
      [locale, formatKey]
    )

    const formatValue = React.useCallback(
      (n: number | undefined) => (n === undefined || Number.isNaN(n) ? '' : codec.format(n)),
      [codec]
    )

    const [text, setText] = React.useState(() => formatValue(value))

    // Re-sync the visible text whenever the value (or its format) changes —
    // adjusted during render rather than in an effect, so there is no frame
    // showing stale text.
    const [synced, setSynced] = React.useState({ value, formatValue })
    if (synced.value !== value || synced.formatValue !== formatValue) {
      setSynced({ value, formatValue })
      setText(formatValue(value))
    }

    const precision = Math.max(decimalsOf(step), decimalsOf(min ?? 0))
    const round = React.useCallback((n: number) => Number(n.toFixed(precision)), [precision])

    /** Snap to the step grid (anchored at `min`), clamp, then round-trip the formatter. */
    const normalise = React.useCallback(
      (n: number) => {
        const base = min ?? 0
        let snapped = round(Math.round((n - base) / step) * step + base)
        if (max !== undefined && snapped > max) snapped = round(Math.floor((max - base) / step) * step + base)
        const clamped = clamp(snapped, min, max)
        if (codec.isLossy) return clamped
        // Only trust the round-trip when it really is the same displayed number.
        const roundTripped = codec.parse(codec.format(clamped))
        return Number.isNaN(roundTripped) || codec.format(roundTripped) !== codec.format(clamped)
          ? clamped
          : roundTripped
      },
      [min, max, step, round, codec]
    )

    const getNext = React.useCallback(
      (direction: 1 | -1, from: number, multiplier = 1) => {
        const base = min ?? 0
        const snapped = round(Math.round((from - base) / step) * step + base)
        let next: number
        if (snapped === from) {
          next = from + direction * step * multiplier
        } else {
          // Off-grid: the first tick lands on the next grid point in that direction.
          const aligned =
            direction === 1
              ? snapped > from ? snapped : snapped + step
              : snapped < from ? snapped : snapped - step
          next = aligned + direction * step * (multiplier - 1)
        }
        return normalise(round(next))
      },
      [min, step, round, normalise]
    )

    const setValue = React.useCallback(
      (next: number | undefined) => {
        if (!isControlled) setInternalValue(next)
        if (next !== value) onValueChange?.(next)
        // Controlled: show the current value; if the parent accepts `next`,
        // the render-time sync above re-formats it.
        setText(formatValue(isControlled ? value : next))
      },
      [isControlled, value, onValueChange, formatValue]
    )

    const interactive = !disabled && !readOnly

    /**
     * The value the text stands for. Untouched display text maps to the stored
     * value rather than being re-parsed, since formats like compact ("1.5K"
     * for 1499) don't round-trip exactly.
     */
    const parseText = (raw: string) =>
      value !== undefined && raw === formatValue(value) ? value : codec.parse(raw)

    const commit = (raw: string) => {
      if (!interactive) return
      const parsed = parseText(raw)
      setValue(Number.isNaN(parsed) ? undefined : normalise(parsed))
    }

    const change = (direction: 1 | -1, multiplier = 1) => {
      if (!interactive) return
      // Uncommitted typed text counts as the current value, as in Reka.
      const current = parseText(text)
      if (Number.isNaN(current)) {
        setValue(normalise(min ?? 0))
        return
      }
      const next = getNext(direction, current, multiplier)
      if (direction === 1 ? next < current : next > current) return
      setValue(next)
    }

    React.useLayoutEffect(() => {
      wheelHandler.current = (e) => {
        const node = inputRef.current
        if (disableWheelChange || !interactive || !node) return
        if (node.ownerDocument.activeElement !== node) return
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
        e.preventDefault()
        // Same direction as Reka: positive deltaY increases unless inverted.
        change(e.deltaY > 0 !== invertWheelChange ? 1 : -1)
      }
    })

    const canIncrement = value === undefined || getNext(1, value) > value
    const canDecrement = value === undefined || getNext(-1, value) < value

    const ctx: NumberFieldContextValue = {
      inputId,
      inputRef,
      registerInput,
      value,
      text,
      setText,
      commit,
      increment: (m) => change(1, m),
      decrement: (m) => change(-1, m),
      toMin: () => {
        if (interactive && min !== undefined) setValue(normalise(min))
      },
      toMax: () => {
        if (interactive && max !== undefined) setValue(normalise(max))
      },
      canIncrement,
      canDecrement,
      isPartial: codec.isPartial,
      inputMode: codec.hasDecimals ? 'decimal' : 'numeric',
      min,
      max,
      disabled,
      readOnly,
    }

    return (
      <NumberFieldContext.Provider value={ctx}>
        <div
          ref={ref}
          role="group"
          data-slot="number-field"
          data-disabled={disabled ? '' : undefined}
          data-readonly={readOnly ? '' : undefined}
          className={cn('grid gap-1.5', className)}
          {...props}
        >
          {children}
          {name && (
            <input
              type="hidden"
              name={name}
              value={value ?? ''}
              disabled={disabled}
              required={required}
            />
          )}
        </div>
      </NumberFieldContext.Provider>
    )
  }
)
NumberField.displayName = 'NumberField'

// ── Content (the bordered box) ───────────────────────────────────────────────

const NumberFieldContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="number-field-content"
      className={cn(
        'flex h-11 w-full items-stretch border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] bk-interactive focus-within:translate-x-[4px] focus-within:translate-y-[4px] focus-within:shadow-none has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
        className
      )}
      {...props}
    />
  )
)
NumberFieldContent.displayName = 'NumberFieldContent'

// ── Input ────────────────────────────────────────────────────────────────────

type NumberFieldInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue' | 'type' | 'min' | 'max' | 'step'
>

const NumberFieldInput = React.forwardRef<HTMLInputElement, NumberFieldInputProps>(
  ({ className, onKeyDown, onBlur, onChange, ...props }, ref) => {
    const ctx = useNumberField('NumberFieldInput')


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e)
      if (e.defaultPrevented || e.nativeEvent.isComposing) return
      const actions: Record<string, () => void> = {
        ArrowUp: () => ctx.increment(),
        ArrowDown: () => ctx.decrement(),
        PageUp: () => ctx.increment(10),
        PageDown: () => ctx.decrement(10),
        Home: () => ctx.toMin(),
        End: () => ctx.toMax(),
      }
      if (e.key === 'Enter') {
        ctx.commit(e.currentTarget.value)
        return
      }
      const action = actions[e.key]
      if (!action) return
      e.preventDefault()
      action()
    }

    return (
      <input
        ref={(node) => {
          ctx.registerInput(node)
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        id={ctx.inputId}
        type="text"
        role="spinbutton"
        inputMode={ctx.inputMode}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        data-slot="number-field-input"
        aria-valuenow={ctx.value}
        aria-valuemin={ctx.min}
        aria-valuemax={ctx.max}
        aria-valuetext={ctx.text || undefined}
        disabled={ctx.disabled}
        readOnly={ctx.readOnly}
        value={ctx.text}
        onChange={(e) => {
          onChange?.(e)
          // Reject characters that can never form a number in this format.
          if (ctx.isPartial(e.target.value)) ctx.setText(e.target.value)
        }}
        onBlur={(e) => {
          onBlur?.(e)
          ctx.commit(e.currentTarget.value)
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full min-w-0 flex-1 bg-transparent px-3 text-center text-base font-bold tabular-nums placeholder:font-normal placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed md:text-sm',
          className
        )}
        {...props}
      />
    )
  }
)
NumberFieldInput.displayName = 'NumberFieldInput'

// ── Stepper buttons ──────────────────────────────────────────────────────────

const stepperClasses =
  'flex w-11 shrink-0 items-center justify-center border-foreground bg-secondary text-secondary-foreground transition-[background-color,box-shadow] duration-100 hover:bg-primary hover:text-primary-foreground active:shadow-[inset_3px_3px_0px_hsl(var(--shadow-color))] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:stroke-[3]'

type StepperProps = React.ButtonHTMLAttributes<HTMLButtonElement>

// Press-and-hold timing, matching Reka's NumberField.
const HOLD_DELAY = 400
const REPEAT_INTERVAL = 60
const TOUCH_MOVE_TOLERANCE = 10

/**
 * Press-and-hold auto-repeat, mirroring Reka: a mouse press steps at once and
 * then repeats after HOLD_DELAY every REPEAT_INTERVAL; a touch/pen press steps
 * on release (so a scroll gesture starting on the button doesn't step) unless
 * it was held long enough to repeat. Stops on pointerup/cancel, leaving the
 * button, hitting a bound, or unmount.
 */
function useStepper(direction: 1 | -1, part: string, disabledProp?: boolean) {
  const ctx = useNumberField(part)
  const canMove = direction === 1 ? ctx.canIncrement : ctx.canDecrement
  const isDisabled = Boolean(disabledProp) || ctx.disabled || ctx.readOnly || !canMove

  const step = () => {
    if (direction === 1) ctx.increment()
    else ctx.decrement()
    // Keep focus on the spinbutton so arrow keys keep working, as Reka does.
    ctx.inputRef.current?.focus()
  }

  // Timers fire after re-renders, so they must call the latest closure.
  const latest = React.useRef({ step, isDisabled })
  React.useLayoutEffect(() => {
    latest.current = { step, isDisabled }
  })

  const timer = React.useRef<number | undefined>(undefined)
  const release = React.useRef<(() => void) | null>(null)

  const stop = React.useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = undefined
    release.current?.()
    release.current = null
  }, [])
  React.useEffect(() => stop, [stop])

  const fire = () => {
    if (latest.current.isDisabled) {
      stop()
      return false
    }
    latest.current.step()
    return true
  }

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0 || isDisabled) return
    e.preventDefault()
    stop()
    const { pointerId, pointerType, clientX, clientY } = e
    let held = false
    const repeat = (delay: number) => {
      timer.current = window.setTimeout(() => {
        held = true
        if (fire()) repeat(REPEAT_INTERVAL)
      }, delay)
    }
    const onMove = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId || pointerType === 'mouse') return
      const dx = ev.clientX - clientX
      const dy = ev.clientY - clientY
      if (dx * dx + dy * dy > TOUCH_MOVE_TOLERANCE ** 2) stop()
    }
    const onUp = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return
      const tap = pointerType !== 'mouse' && !held
      stop()
      if (tap) fire()
    }
    const onCancel = (ev: PointerEvent) => {
      if (ev.pointerId === pointerId) stop()
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onCancel)
    release.current = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onCancel)
    }
    if (pointerType === 'mouse') {
      held = true
      if (fire()) repeat(HOLD_DELAY)
    } else {
      repeat(HOLD_DELAY)
    }
  }

  const onPointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'mouse') stop()
  }

  // Pointer presses are handled above; a click with detail 0 comes from
  // assistive tech or a synthetic activation, which has no pointerdown.
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.detail === 0 && !isDisabled) step()
  }

  // Stop the button taking focus from the input on mouse press.
  const onMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()

  return { isDisabled, onPointerDown, onPointerLeave, onClick, onMouseDown }
}

function createStepper(direction: 1 | -1, part: string, label: string, slot: string, icon: React.ReactNode, border: string) {
  const Stepper = React.forwardRef<HTMLButtonElement, StepperProps>(
    ({ className, children, disabled, onClick, onPointerDown, onPointerLeave, onMouseDown, ...props }, ref) => {
      const stepper = useStepper(direction, part, disabled)
      return (
        <button
          ref={ref}
          type="button"
          tabIndex={-1}
          aria-label={label}
          data-slot={slot}
          disabled={stepper.isDisabled}
          onPointerDown={(e) => {
            onPointerDown?.(e)
            if (!e.defaultPrevented) stepper.onPointerDown(e)
          }}
          onPointerLeave={(e) => {
            onPointerLeave?.(e)
            stepper.onPointerLeave(e)
          }}
          onMouseDown={(e) => {
            onMouseDown?.(e)
            stepper.onMouseDown(e)
          }}
          onClick={(e) => {
            onClick?.(e)
            if (!e.defaultPrevented) stepper.onClick(e)
          }}
          onContextMenu={(e) => e.preventDefault()}
          className={cn(stepperClasses, border, className)}
          {...props}
        >
          {children ?? icon}
        </button>
      )
    }
  )
  Stepper.displayName = part
  return Stepper
}

const NumberFieldIncrement = createStepper(
  1,
  'NumberFieldIncrement',
  'Increase',
  'number-field-increment',
  <Plus aria-hidden="true" />,
  'border-l-3'
)

const NumberFieldDecrement = createStepper(
  -1,
  'NumberFieldDecrement',
  'Decrease',
  'number-field-decrement',
  <Minus aria-hidden="true" />,
  'border-r-3'
)

export {
  NumberField,
  NumberFieldContent,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
}
export type { NumberFieldProps }
