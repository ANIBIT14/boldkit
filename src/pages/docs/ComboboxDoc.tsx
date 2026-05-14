import { useState } from 'react'
import { Check } from 'lucide-react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxMultiTrigger,
  ComboboxSeparator,
  ComboboxTrigger,
} from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'
import sourceCode from '@/components/ui/combobox.tsx?raw'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const languages = [
  { value: 'typescript', label: 'TypeScript', group: 'Frontend' },
  { value: 'javascript', label: 'JavaScript', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'python', label: 'Python', group: 'Backend' },
  { value: 'go', label: 'Go', group: 'Backend' },
  { value: 'rust', label: 'Rust', group: 'Backend' },
]

// ─── Source code strings shown in the doc ────────────────────────────────────


const usageCode = `import { useState } from 'react'
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
}`

const vueSourceCode = `<!-- ComboboxTrigger.vue — single-select -->
<script setup lang="ts">
import { PopoverTrigger as PopoverTriggerPrimitive } from 'reka-ui'
import { ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: string
  placeholder?: string
  value?: string
  open?: boolean
}>(), { placeholder: 'Select...' })
</script>

<template>
  <PopoverTriggerPrimitive as-child>
    <button role="combobox" :aria-expanded="props.open"
      :class="cn(
        'flex h-11 w-full items-center justify-between border-3 border-input bg-background px-4 py-2 text-sm font-medium shadow-[4px_4px_0px_hsl(var(--shadow-color))] focus:outline-none focus:translate-x-[4px] focus:translate-y-[4px] focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
        props.class
      )">
      <span :class="cn('truncate', !props.value && 'text-muted-foreground')">
        {{ props.value || props.placeholder }}
      </span>
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" :stroke-width="2.5" />
    </button>
  </PopoverTriggerPrimitive>
</template>

<!-- ComboboxMultiTrigger.vue — multi-select -->
<script setup lang="ts">
import { PopoverTrigger as PopoverTriggerPrimitive } from 'reka-ui'
import { ChevronsUpDown, X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: string
  placeholder?: string
  values?: { value: string; label: string }[]
  open?: boolean
}>(), { placeholder: 'Select...', values: () => [] })

const emit = defineEmits<{ remove: [value: string] }>()
</script>

<template>
  <PopoverTriggerPrimitive as-child>
    <button role="combobox" :aria-expanded="props.open"
      :class="cn(
        'flex min-h-11 w-full flex-wrap items-center gap-1.5 border-3 border-input bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_hsl(var(--shadow-color))] focus:outline-none focus:translate-x-[4px] focus:translate-y-[4px] focus:shadow-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
        props.class
      )">
      <span class="flex flex-1 flex-wrap items-center gap-1">
        <template v-if="props.values && props.values.length > 0">
          <span v-for="item in props.values" :key="item.value"
            class="flex items-center gap-1 border-2 border-foreground bg-accent px-1.5 py-0.5 text-xs font-bold">
            {{ item.label }}
            <X class="h-3 w-3 cursor-pointer hover:opacity-70" :stroke-width="3"
              @click.stop="emit('remove', item.value)" />
          </span>
        </template>
        <span v-else class="text-muted-foreground">{{ props.placeholder }}</span>
      </span>
      <ChevronsUpDown class="ml-auto h-4 w-4 shrink-0 opacity-50" :stroke-width="2.5" />
    </button>
  </PopoverTriggerPrimitive>
</template>`

const vueUsageCode = `<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import {
  Popover, PopoverContent, ComboboxTrigger,
  Command, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem,
} from '@/components/ui'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
]

const open = ref(false)
const value = ref('')
const selectedLabel = computed(() => frameworks.find(f => f.value === value.value)?.label)

function select(v: string) {
  value.value = v === value.value ? '' : v
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <ComboboxTrigger
      class="w-[200px]"
      :open="open"
      :value="selectedLabel"
      placeholder="Select framework..."
    />
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command>
        <CommandInput placeholder="Search framework..." />
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="f in frameworks"
              :key="f.value"
              :value="f.value"
              @select="select(f.value)"
            >
              {{ f.label }}
              <Check
                :class="cn('ml-auto h-4 w-4', value === f.value ? 'opacity-100' : 'opacity-0')"
                :stroke-width="3"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>`

// ─── Demo components ──────────────────────────────────────────────────────────

function BasicDemo() {
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

function MultiSelectDemo() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  function toggle(val: string) {
    setSelected(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    )
  }

  const selectedItems = frameworks
    .filter(f => selected.includes(f.value))
    .map(f => ({ value: f.value, label: f.label }))

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxMultiTrigger
        className="w-[280px]"
        open={open}
        values={selectedItems}
        placeholder="Select frameworks..."
        onRemove={val => toggle(val)}
      />
      <ComboboxContent className="w-[280px]">
        <ComboboxInput placeholder="Search framework..." />
        <ComboboxList>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxGroup>
            {frameworks.map(f => (
              <ComboboxItem
                key={f.value}
                value={f.value}
                onSelect={() => toggle(f.value)}
              >
                {f.label}
                <Check
                  className={cn(
                    'ml-auto h-4 w-4 stroke-[3]',
                    selected.includes(f.value) ? 'opacity-100' : 'opacity-0'
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

function GroupedDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const frontendLangs = languages.filter(l => l.group === 'Frontend')
  const backendLangs = languages.filter(l => l.group === 'Backend')
  const selectedLabel = languages.find(l => l.value === value)?.label

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger
        className="w-[220px]"
        open={open}
        value={selectedLabel}
        placeholder="Select language..."
      />
      <ComboboxContent className="w-[220px]">
        <ComboboxInput placeholder="Search language..." />
        <ComboboxList>
          <ComboboxEmpty>No language found.</ComboboxEmpty>
          <ComboboxGroup heading="Frontend">
            {frontendLangs.map(lang => (
              <ComboboxItem
                key={lang.value}
                value={lang.value}
                onSelect={current => {
                  setValue(current === value ? '' : current)
                  setOpen(false)
                }}
              >
                {lang.label}
                <Check
                  className={cn(
                    'ml-auto h-4 w-4 stroke-[3]',
                    value === lang.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </ComboboxItem>
            ))}
          </ComboboxGroup>
          <ComboboxSeparator />
          <ComboboxGroup heading="Backend">
            {backendLangs.map(lang => (
              <ComboboxItem
                key={lang.value}
                value={lang.value}
                onSelect={current => {
                  setValue(current === value ? '' : current)
                  setOpen(false)
                }}
              >
                {lang.label}
                <Check
                  className={cn(
                    'ml-auto h-4 w-4 stroke-[3]',
                    value === lang.value ? 'opacity-100' : 'opacity-0'
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

function WithLabelDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>Framework</Label>
      <Combobox open={open} onOpenChange={setOpen}>
        <ComboboxTrigger
          open={open}
          value={frameworks.find(f => f.value === value)?.label}
          placeholder="Select framework..."
        />
        <ComboboxContent>
          <ComboboxInput placeholder="Search..." />
          <ComboboxList>
            <ComboboxEmpty>No results.</ComboboxEmpty>
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
    </div>
  )
}

// ─── Doc page ─────────────────────────────────────────────────────────────────

export function ComboboxDoc() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <>
      <ComponentDoc
        name="Combobox"
        description="The BoldKit Combobox is a searchable dropdown built by composing Popover and Command. It gives you a neubrutalism-styled trigger with the same thick border and hard shadow as Select, but with a live-filter search input inside the dropdown. Use ComboboxTrigger for single selection or ComboboxMultiTrigger for multi-select with removable tag chips."
        dependencies={['@radix-ui/react-popover', 'cmdk']}
        vueDependencies={['reka-ui']}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
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
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="Searchable dropdown. Closes and sets value on selection."
        code={`const [open, setOpen] = useState(false)
const [value, setValue] = useState('')

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
            <Check className={cn('ml-auto h-4 w-4 stroke-[3]', value === f.value ? 'opacity-100' : 'opacity-0')} />
          </ComboboxItem>
        ))}
      </ComboboxGroup>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        vueCode={`<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, ComboboxTrigger, Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui'

const open = ref(false)
const value = ref('')
const selectedLabel = computed(() => frameworks.find(f => f.value === value.value)?.label)

function select(v: string) {
  value.value = v === value.value ? '' : v
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <ComboboxTrigger class="w-[200px]" :open="open" :value="selectedLabel" placeholder="Select framework..." />
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command>
        <CommandInput placeholder="Search framework..." />
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandItem v-for="f in frameworks" :key="f.value" :value="f.value" @select="select(f.value)">
              {{ f.label }}
              <Check :class="cn('ml-auto h-4 w-4', value === f.value ? 'opacity-100' : 'opacity-0')" :stroke-width="3" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>`}
      >
        <BasicDemo />
      </ExampleSection>

      {/* Multi Select */}
      <ExampleSection
        title="Multi Select"
        description="Select multiple items. The trigger shows removable chips — each chip's onRemove receives the item's value directly, no reverse-lookup needed. The dropdown stays open between selections."
        code={`const [open, setOpen] = useState(false)
const [selected, setSelected] = useState<string[]>([])

function toggle(val: string) {
  setSelected(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
}

const selectedItems = frameworks
  .filter(f => selected.includes(f.value))
  .map(f => ({ value: f.value, label: f.label }))

<Combobox open={open} onOpenChange={setOpen}>
  <ComboboxMultiTrigger
    className="w-[280px]"
    open={open}
    values={selectedItems}
    placeholder="Select frameworks..."
    onRemove={val => toggle(val)}
  />
  <ComboboxContent className="w-[280px]">
    <ComboboxInput placeholder="Search framework..." />
    <ComboboxList>
      <ComboboxEmpty>No framework found.</ComboboxEmpty>
      <ComboboxGroup>
        {frameworks.map(f => (
          <ComboboxItem key={f.value} value={f.value} onSelect={() => toggle(f.value)}>
            {f.label}
            <Check className={cn('ml-auto h-4 w-4 stroke-[3]', selected.includes(f.value) ? 'opacity-100' : 'opacity-0')} />
          </ComboboxItem>
        ))}
      </ComboboxGroup>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        vueCode={`<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, ComboboxMultiTrigger, Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui'

const open = ref(false)
const selected = ref<string[]>([])

function toggle(val: string) {
  selected.value = selected.value.includes(val)
    ? selected.value.filter(v => v !== val)
    : [...selected.value, val]
}

const selectedItems = computed(() =>
  frameworks.filter(f => selected.value.includes(f.value))
    .map(f => ({ value: f.value, label: f.label }))
)
</script>

<template>
  <Popover v-model:open="open">
    <ComboboxMultiTrigger
      class="w-[280px]"
      :open="open"
      :values="selectedItems"
      placeholder="Select frameworks..."
      @remove="toggle"
    />
    <PopoverContent class="w-[280px] p-0" align="start">
      <Command>
        <CommandInput placeholder="Search framework..." />
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandItem v-for="f in frameworks" :key="f.value" :value="f.value" @select="toggle(f.value)">
              {{ f.label }}
              <Check :class="cn('ml-auto h-4 w-4', selected.includes(f.value) ? 'opacity-100' : 'opacity-0')" :stroke-width="3" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>`}
      >
        <MultiSelectDemo />
      </ExampleSection>

      {/* With Groups */}
      <ExampleSection
        title="With Groups"
        description="Organize options into labeled groups separated by a divider."
        code={`<Combobox open={open} onOpenChange={setOpen}>
  <ComboboxTrigger className="w-[220px]" open={open} value={selectedLabel} placeholder="Select language..." />
  <ComboboxContent className="w-[220px]">
    <ComboboxInput placeholder="Search language..." />
    <ComboboxList>
      <ComboboxEmpty>No language found.</ComboboxEmpty>
      <ComboboxGroup heading="Frontend">
        {frontendLangs.map(lang => (
          <ComboboxItem key={lang.value} value={lang.value}
            onSelect={current => { setValue(current === value ? '' : current); setOpen(false) }}>
            {lang.label}
            <Check className={cn('ml-auto h-4 w-4 stroke-[3]', value === lang.value ? 'opacity-100' : 'opacity-0')} />
          </ComboboxItem>
        ))}
      </ComboboxGroup>
      <ComboboxSeparator />
      <ComboboxGroup heading="Backend">
        {/* same pattern */}
      </ComboboxGroup>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        vueCode={`<template>
  <Popover v-model:open="open">
    <ComboboxTrigger class="w-[220px]" :open="open" :value="selectedLabel" placeholder="Select language..." />
    <PopoverContent class="w-[220px] p-0" align="start">
      <Command>
        <CommandInput placeholder="Search language..." />
        <CommandList>
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup heading="Frontend">
            <CommandItem v-for="lang in frontendLangs" :key="lang.value" :value="lang.value" @select="select(lang.value)">
              {{ lang.label }}
              <Check :class="cn('ml-auto h-4 w-4', value === lang.value ? 'opacity-100' : 'opacity-0')" :stroke-width="3" />
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Backend">
            <!-- same pattern -->
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>`}
      >
        <GroupedDemo />
      </ExampleSection>

      {/* With Label */}
      <ExampleSection
        title="With Label"
        description="Pair with a Label for accessible form fields."
        code={`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label>Framework</Label>
  <Combobox open={open} onOpenChange={setOpen}>
    <ComboboxTrigger open={open} value={selectedLabel} placeholder="Select framework..." />
    <ComboboxContent>
      <ComboboxInput placeholder="Search..." />
      <ComboboxList>
        <ComboboxEmpty>No results.</ComboboxEmpty>
        <ComboboxGroup>
          {frameworks.map(f => (
            <ComboboxItem key={f.value} value={f.value}
              onSelect={current => { setValue(current === value ? '' : current); setOpen(false) }}>
              {f.label}
              <Check className={cn('ml-auto h-4 w-4 stroke-[3]', value === f.value ? 'opacity-100' : 'opacity-0')} />
            </ComboboxItem>
          ))}
        </ComboboxGroup>
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>`}
        vueCode={`<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label>Framework</Label>
    <Popover v-model:open="open">
      <ComboboxTrigger :open="open" :value="selectedLabel" placeholder="Select framework..." />
      <PopoverContent class="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              <CommandItem v-for="f in frameworks" :key="f.value" :value="f.value" @select="select(f.value)">
                {{ f.label }}
                <Check :class="cn('ml-auto h-4 w-4', value === f.value ? 'opacity-100' : 'opacity-0')" :stroke-width="3" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>`}
      >
        <WithLabelDemo />
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection
        title="Disabled"
        description="Disable the entire combobox."
        code={`<Combobox>
  <ComboboxTrigger className="w-[200px]" placeholder="Select framework..." disabled />
  <ComboboxContent className="w-[200px]">
    <ComboboxInput placeholder="Search..." />
    <ComboboxList>
      <ComboboxGroup>
        <ComboboxItem value="next">Next.js</ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        vueCode={`<template>
  <Popover>
    <ComboboxTrigger class="w-[200px]" placeholder="Select framework..." disabled />
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup>
            <CommandItem value="next">Next.js</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>`}
      >
        <Combobox>
          <ComboboxTrigger className="w-[200px]" placeholder="Select framework..." disabled />
          <ComboboxContent className="w-[200px]">
            <ComboboxInput placeholder="Search..." />
            <ComboboxList>
              <ComboboxGroup>
                {frameworks.map(f => (
                  <ComboboxItem key={f.value} value={f.value}>
                    {f.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </ExampleSection>
    </>
  )
}
