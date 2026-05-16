import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup,
  ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger,
} from '@/components/ui/combobox'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
]

export default function Example() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger
        className="w-[200px]"
        open={open}
        value={frameworks.find(f => f.value === value)?.label}
        placeholder="Select framework..."
      />
      <ComboboxContent className="w-[200px]">
        <ComboboxInput placeholder="Search framework..." />
        <ComboboxList>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxGroup>
            {frameworks.map(f => (
              <ComboboxItem
                key={f.value}
                value={f.value}
                onSelect={current => {
                  setValue(current === value ? '' : current)
                  setOpen(false)
                }}
              >
                {f.label}
                <Check
                  className={cn(
                    'ml-auto h-4 w-4 stroke-[3]',
                    value === f.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </ComboboxItem>
            ))}
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}