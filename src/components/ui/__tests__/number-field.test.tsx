import * as React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { act } from '@testing-library/react'
import { render, screen, fireEvent } from '@/test/test-utils'
import { axe } from 'vitest-axe'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  type NumberFieldProps,
} from '../number-field'

function Field(props: NumberFieldProps) {
  return (
    <NumberField locale="en-US" {...props}>
      <NumberFieldContent>
        <NumberFieldDecrement />
        <NumberFieldInput aria-label="Quantity" />
        <NumberFieldIncrement />
      </NumberFieldContent>
    </NumberField>
  )
}

const input = () => screen.getByRole('spinbutton') as HTMLInputElement
const inc = () => screen.getByRole('button', { name: 'Increase' })
const dec = () => screen.getByRole('button', { name: 'Decrease' })

describe('NumberField', () => {
  describe('Rendering', () => {
    it('renders a spinbutton text input with stepper buttons', () => {
      render(<Field defaultValue={3} min={0} max={10} />)
      const el = input()
      expect(el).toHaveAttribute('type', 'text')
      expect(el).toHaveAttribute('inputmode', 'decimal')
      expect(el).toHaveAttribute('aria-valuenow', '3')
      expect(el).toHaveAttribute('aria-valuemin', '0')
      expect(el).toHaveAttribute('aria-valuemax', '10')
      expect(el).toHaveAttribute('aria-valuetext', '3')
      expect(el).toHaveValue('3')
      expect(inc()).toHaveAttribute('tabindex', '-1')
      expect(dec()).toHaveAttribute('tabindex', '-1')
    })

    it('uses a numeric keyboard when the format has no fraction digits', () => {
      render(<Field defaultValue={3} formatOptions={{ maximumFractionDigits: 0 }} />)
      expect(input()).toHaveAttribute('inputmode', 'numeric')
    })

    it('puts the id on the input so a label can target it', () => {
      render(
        <>
          <label htmlFor="qty">Qty</label>
          <NumberField id="qty">
            <NumberFieldContent>
              <NumberFieldInput />
            </NumberFieldContent>
          </NumberField>
        </>
      )
      expect(screen.getByLabelText('Qty')).toBe(input())
    })
  })

  describe('Stepping', () => {
    it('increments and decrements by step', () => {
      const onValueChange = vi.fn()
      render(<Field defaultValue={5} step={5} onValueChange={onValueChange} />)
      fireEvent.click(inc())
      expect(input()).toHaveValue('10')
      expect(onValueChange).toHaveBeenLastCalledWith(10)
      fireEvent.click(dec())
      fireEvent.click(dec())
      expect(input()).toHaveValue('0')
      expect(onValueChange).toHaveBeenLastCalledWith(0)
    })

    it('starts from min (or 0) when empty', () => {
      render(<Field min={2} />)
      expect(input()).toHaveValue('')
      fireEvent.click(inc())
      expect(input()).toHaveValue('2')
    })

    it('handles decimal steps without float drift', () => {
      render(<Field defaultValue={0.2} step={0.1} />)
      fireEvent.click(inc())
      expect(input()).toHaveAttribute('aria-valuenow', '0.3')
    })

    it('disables the buttons at the bounds', () => {
      render(<Field defaultValue={9} min={0} max={10} />)
      expect(inc()).not.toBeDisabled()
      fireEvent.click(inc())
      expect(input()).toHaveValue('10')
      expect(inc()).toBeDisabled()
      expect(dec()).not.toBeDisabled()
    })

    it('respects a controlled value', () => {
      const onValueChange = vi.fn()
      render(<Field value={4} onValueChange={onValueChange} />)
      fireEvent.click(inc())
      expect(onValueChange).toHaveBeenCalledWith(5)
      expect(input()).toHaveValue('4')
    })
  })

  it('follows a controlled value the parent updates', () => {
    function Controlled() {
      const [value, setValue] = React.useState<number | undefined>(1)
      return (
        <>
          <Field value={value ?? null} onValueChange={setValue} />
          <output>{String(value)}</output>
        </>
      )
    }
    render(<Controlled />)
    fireEvent.click(inc())
    expect(input()).toHaveValue('2')
    expect(screen.getByRole('status')).toHaveTextContent('2')
  })

  describe('Clamping', () => {
    it('clamps typed values to max on blur', () => {
      render(<Field defaultValue={1} min={0} max={10} />)
      fireEvent.change(input(), { target: { value: '42' } })
      fireEvent.blur(input())
      expect(input()).toHaveValue('10')
      expect(input()).toHaveAttribute('aria-valuenow', '10')
    })

    it('clamps typed values to min on Enter', () => {
      render(<Field defaultValue={5} min={0} max={10} />)
      fireEvent.change(input(), { target: { value: '-7' } })
      fireEvent.keyDown(input(), { key: 'Enter' })
      expect(input()).toHaveValue('0')
    })

    it('snaps typed values to the step grid', () => {
      render(<Field defaultValue={0} step={5} />)
      fireEvent.change(input(), { target: { value: '12' } })
      fireEvent.blur(input())
      expect(input()).toHaveValue('10')
    })

    it('rejects characters that cannot form a number', () => {
      render(<Field defaultValue={5} />)
      fireEvent.change(input(), { target: { value: '5x' } })
      expect(input()).toHaveValue('5')
    })

    it('clears to undefined when emptied', () => {
      const onValueChange = vi.fn()
      render(<Field defaultValue={5} onValueChange={onValueChange} />)
      fireEvent.change(input(), { target: { value: '' } })
      fireEvent.blur(input())
      expect(onValueChange).toHaveBeenLastCalledWith(undefined)
      expect(input()).not.toHaveAttribute('aria-valuenow')
    })
  })

  describe('Keyboard', () => {
    it('ArrowUp/ArrowDown step by one step', () => {
      render(<Field defaultValue={4} step={2} />)
      fireEvent.keyDown(input(), { key: 'ArrowUp' })
      expect(input()).toHaveValue('6')
      fireEvent.keyDown(input(), { key: 'ArrowDown' })
      fireEvent.keyDown(input(), { key: 'ArrowDown' })
      expect(input()).toHaveValue('2')
    })

    it('an off-grid value moves to the next grid point first', () => {
      render(<Field defaultValue={5} step={2} />)
      fireEvent.keyDown(input(), { key: 'ArrowUp' })
      expect(input()).toHaveValue('6')
    })

    it('PageUp/PageDown step by ten steps', () => {
      render(<Field defaultValue={50} />)
      fireEvent.keyDown(input(), { key: 'PageUp' })
      expect(input()).toHaveValue('60')
      fireEvent.keyDown(input(), { key: 'PageDown' })
      fireEvent.keyDown(input(), { key: 'PageDown' })
      expect(input()).toHaveValue('40')
    })

    it('Home/End jump to min/max', () => {
      render(<Field defaultValue={5} min={1} max={20} />)
      fireEvent.keyDown(input(), { key: 'End' })
      expect(input()).toHaveValue('20')
      fireEvent.keyDown(input(), { key: 'Home' })
      expect(input()).toHaveValue('1')
    })

    it('does not exceed bounds with PageUp', () => {
      render(<Field defaultValue={95} max={100} />)
      fireEvent.keyDown(input(), { key: 'PageUp' })
      expect(input()).toHaveValue('100')
    })
  })

  describe('Formatting', () => {
    it('formats currency and parses it back', () => {
      const onValueChange = vi.fn()
      render(
        <Field
          defaultValue={1234.5}
          step={0.25}
          formatOptions={{ style: 'currency', currency: 'USD' }}
          onValueChange={onValueChange}
        />
      )
      expect(input()).toHaveValue('$1,234.50')
      expect(input()).toHaveAttribute('inputmode', 'decimal')
      fireEvent.click(inc())
      expect(input()).toHaveValue('$1,234.75')
      expect(onValueChange).toHaveBeenLastCalledWith(1234.75)
    })

    it('formats percentages', () => {
      render(<Field defaultValue={0.25} step={0.05} formatOptions={{ style: 'percent' }} />)
      expect(input()).toHaveValue('25%')
      fireEvent.change(input(), { target: { value: '40%' } })
      fireEvent.blur(input())
      expect(input()).toHaveAttribute('aria-valuenow', '0.4')
    })
  })

  describe('Disabled / read-only', () => {
    it('disables the input and buttons', () => {
      render(<Field defaultValue={5} disabled />)
      expect(input()).toBeDisabled()
      expect(inc()).toBeDisabled()
      expect(dec()).toBeDisabled()
    })

    it('read-only ignores keyboard and buttons', () => {
      render(<Field defaultValue={5} readOnly />)
      expect(input()).toHaveAttribute('readonly')
      expect(inc()).toBeDisabled()
      fireEvent.keyDown(input(), { key: 'ArrowUp' })
      expect(input()).toHaveValue('5')
    })
  })

  describe('Forms', () => {
    it('submits the raw number under `name`', () => {
      const { container } = render(
        <form>
          <Field name="quantity" defaultValue={1000} />
        </form>
      )
      const form = container.querySelector('form')!
      expect(new FormData(form).get('quantity')).toBe('1000')
      fireEvent.click(inc())
      expect(new FormData(form).get('quantity')).toBe('1001')
    })
  })

  describe('Controlled reset', () => {
    it('stays controlled when the parent feeds undefined back in', () => {
      function Resettable() {
        const [v, setV] = React.useState<number | undefined>()
        return (
          <form>
            <Field name="qty" value={v} onValueChange={setV} />
            <button type="button" onClick={() => setV(undefined)}>
              Reset
            </button>
          </form>
        )
      }
      const { container } = render(<Resettable />)
      const form = container.querySelector('form')!
      fireEvent.click(inc())
      expect(input()).toHaveValue('0')
      fireEvent.click(inc())
      expect(input()).toHaveValue('1')
      fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
      expect(input()).toHaveValue('')
      expect(input()).not.toHaveAttribute('aria-valuenow')
      expect(new FormData(form).get('qty')).toBe('')
    })

    it('treats value={null} as controlled and empty', () => {
      const onValueChange = vi.fn()
      render(<Field value={null} onValueChange={onValueChange} />)
      fireEvent.click(inc())
      expect(onValueChange).toHaveBeenCalledWith(0)
      expect(input()).toHaveValue('')
    })
  })

  describe('Locale numerals', () => {
    it('formats, keeps and parses Arabic-Indic digits (ar-EG)', () => {
      const onValueChange = vi.fn()
      render(<Field locale="ar-EG" defaultValue={1234.5} step={0.1} onValueChange={onValueChange} />)
      const display = new Intl.NumberFormat('ar-EG').format(1234.5)
      expect(input()).toHaveValue(display)
      // Untouched blur keeps the value.
      fireEvent.blur(input())
      expect(input()).toHaveAttribute('aria-valuenow', '1234.5')
      // Typing locale digits is accepted and parsed.
      fireEvent.change(input(), { target: { value: '٤٢' } })
      expect(input()).toHaveValue('٤٢')
      fireEvent.blur(input())
      expect(onValueChange).toHaveBeenLastCalledWith(42)
      expect(input()).toHaveValue(new Intl.NumberFormat('ar-EG').format(42))
      fireEvent.keyDown(input(), { key: 'ArrowUp' })
      expect(input()).toHaveAttribute('aria-valuenow', '42.1')
    })
  })

  describe('Non-round-tripping formats', () => {
    it('compact notation keeps the stored value and parses suffixes', () => {
      render(<Field defaultValue={1499} formatOptions={{ notation: 'compact' }} />)
      expect(input()).toHaveValue('1.5K')
      fireEvent.blur(input())
      expect(input()).toHaveAttribute('aria-valuenow', '1499')
      fireEvent.click(inc())
      expect(input()).toHaveAttribute('aria-valuenow', '1500')
      fireEvent.change(input(), { target: { value: '2.5M' } })
      fireEvent.blur(input())
      expect(input()).toHaveAttribute('aria-valuenow', '2500000')
    })

    it('accounting currency treats parentheses as negative', () => {
      render(
        <Field
          defaultValue={-5}
          formatOptions={{ style: 'currency', currency: 'USD', currencySign: 'accounting' }}
        />
      )
      expect(input()).toHaveValue('($5.00)')
      fireEvent.blur(input())
      expect(input()).toHaveAttribute('aria-valuenow', '-5')
      fireEvent.click(inc())
      expect(input()).toHaveValue('($4.00)')
      fireEvent.change(input(), { target: { value: '(3)' } })
      fireEvent.blur(input())
      expect(input()).toHaveAttribute('aria-valuenow', '-3')
    })
  })

  describe('Press and hold', () => {
    afterEach(() => {
      vi.useRealTimers()
    })

    const down = (el: HTMLElement, pointerType = 'mouse') =>
      fireEvent.pointerDown(el, { button: 0, pointerId: 1, pointerType })
    const up = (pointerType = 'mouse') =>
      fireEvent.pointerUp(window, { button: 0, pointerId: 1, pointerType })
    const tick = (ms: number) => act(() => void vi.advanceTimersByTime(ms))

    it('mouse: steps at once, repeats after a delay, stops on release', () => {
      vi.useFakeTimers()
      render(<Field defaultValue={0} />)
      down(inc())
      expect(input()).toHaveValue('1')
      tick(399)
      expect(input()).toHaveValue('1')
      tick(1)
      expect(input()).toHaveValue('2')
      tick(60)
      tick(60)
      expect(input()).toHaveValue('4')
      up()
      // The click that follows a real mouse press (detail 1) must not step again.
      fireEvent.click(inc(), { detail: 1 })
      tick(1000)
      expect(input()).toHaveValue('4')
    })

    it('stops repeating at the bound', () => {
      vi.useFakeTimers()
      render(<Field defaultValue={8} max={10} />)
      down(inc())
      tick(400)
      tick(60)
      tick(60)
      expect(input()).toHaveValue('10')
      expect(inc()).toBeDisabled()
      up()
    })

    it('stops when the pointer leaves the button', () => {
      vi.useFakeTimers()
      render(<Field defaultValue={0} />)
      down(dec())
      fireEvent.pointerLeave(dec(), { pointerType: 'mouse', pointerId: 1 })
      tick(1000)
      expect(input()).toHaveValue('-1')
    })

    it('touch: steps on release, not on press', () => {
      vi.useFakeTimers()
      render(<Field defaultValue={0} />)
      down(inc(), 'touch')
      expect(input()).toHaveValue('0')
      up('touch')
      expect(input()).toHaveValue('1')
    })

    it('clears its timer on unmount', () => {
      vi.useFakeTimers()
      const { unmount } = render(<Field defaultValue={0} />)
      down(inc())
      unmount()
      expect(vi.getTimerCount()).toBe(0)
    })
  })

  describe('Mouse wheel', () => {
    it('steps while focused and prevents page scroll', () => {
      render(<Field defaultValue={5} />)
      input().focus()
      const notPrevented = fireEvent.wheel(input(), { deltaY: 100 })
      expect(notPrevented).toBe(false)
      expect(input()).toHaveValue('6')
      fireEvent.wheel(input(), { deltaY: -100 })
      fireEvent.wheel(input(), { deltaY: -100 })
      expect(input()).toHaveValue('4')
    })

    it('ignores the wheel when the input is not focused', () => {
      render(<Field defaultValue={5} />)
      expect(fireEvent.wheel(input(), { deltaY: 100 })).toBe(true)
      expect(input()).toHaveValue('5')
    })

    it('invertWheelChange reverses and disableWheelChange turns it off', () => {
      const { unmount } = render(<Field defaultValue={5} invertWheelChange />)
      input().focus()
      fireEvent.wheel(input(), { deltaY: 100 })
      expect(input()).toHaveValue('4')
      unmount()
      render(<Field defaultValue={5} disableWheelChange />)
      input().focus()
      expect(fireEvent.wheel(input(), { deltaY: 100 })).toBe(true)
      expect(input()).toHaveValue('5')
    })
  })

  it('has no axe violations', async () => {
    const { container } = render(<Field defaultValue={3} min={0} max={10} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
