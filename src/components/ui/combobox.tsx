import * as React from 'react'
import { ChevronsUpDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

const Combobox = Popover

const ComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    placeholder?: string
    value?: string
    open?: boolean
  }
>(({ className, placeholder = 'Select...', value, open, ...props }, ref) => (
  <PopoverTrigger asChild>
    <button
      ref={ref}
      role="combobox"
      aria-expanded={open}
      className={cn(
        'flex h-11 w-full items-center justify-between border-3 border-input bg-background px-4 py-2 text-sm font-medium shadow-[4px_4px_0px_hsl(var(--shadow-color))] focus:outline-none focus:translate-x-[4px] focus:translate-y-[4px] focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
        className
      )}
      {...props}
    >
      <span className={cn('truncate', !value && 'text-muted-foreground')}>
        {value || placeholder}
      </span>
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 stroke-[2.5]" />
    </button>
  </PopoverTrigger>
))
ComboboxTrigger.displayName = 'ComboboxTrigger'

/**
 * Multi-select trigger. Each entry in `values` has a `value` (identifier)
 * and a `label` (display text). The `onRemove` callback receives the `value`
 * of the chip that was dismissed, so you can remove it from state directly.
 */
const ComboboxMultiTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    placeholder?: string
    values?: { value: string; label: string }[]
    open?: boolean
    onRemove?: (value: string) => void
  }
>(({ className, placeholder = 'Select...', values = [], open, onRemove, ...props }, ref) => (
  <PopoverTrigger asChild>
    <button
      ref={ref}
      role="combobox"
      aria-expanded={open}
      className={cn(
        'flex min-h-11 w-full flex-wrap items-center gap-1.5 border-3 border-input bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_hsl(var(--shadow-color))] focus:outline-none focus:translate-x-[4px] focus:translate-y-[4px] focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
        className
      )}
      {...props}
    >
      <span className="flex flex-1 flex-wrap items-center gap-1">
        {values.length > 0 ? (
          values.map(({ value, label }) => (
            <span
              key={value}
              className="flex items-center gap-1 border-2 border-foreground bg-accent px-1.5 py-0.5 text-xs font-bold"
            >
              {label}
              <X
                className="h-3 w-3 cursor-pointer stroke-[3] hover:opacity-70"
                onClick={e => {
                  e.stopPropagation()
                  onRemove?.(value)
                }}
              />
            </span>
          ))
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </span>
      <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50 stroke-[2.5]" />
    </button>
  </PopoverTrigger>
))
ComboboxMultiTrigger.displayName = 'ComboboxMultiTrigger'

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent>
>(({ className, children, align = 'start', ...props }, ref) => (
  <PopoverContent ref={ref} align={align} className={cn('p-0', className)} {...props}>
    <Command>{children}</Command>
  </PopoverContent>
))
ComboboxContent.displayName = 'ComboboxContent'

export {
  Combobox,
  ComboboxTrigger,
  ComboboxMultiTrigger,
  ComboboxContent,
  CommandInput as ComboboxInput,
  CommandList as ComboboxList,
  CommandEmpty as ComboboxEmpty,
  CommandGroup as ComboboxGroup,
  CommandItem as ComboboxItem,
  CommandSeparator as ComboboxSeparator,
}
