import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ButtonProps, buttonVariants } from '@/components/ui/button'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
))

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'default' : 'outline',
        size,
      }),
      className
    )}
    {...props}
  />
)

// ... PaginationPrevious, PaginationNext, PaginationEllipsis

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}`

const usageCode = `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function Example() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`

const vueSourceCode = `<script setup lang="ts">
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { buttonVariants } from './Button.vue'

defineProps<{
  class?: string
  isActive?: boolean
}>()
</script>

<!-- Pagination -->
<template>
  <nav role="navigation" aria-label="pagination" :class="cn('mx-auto flex w-full justify-center', props.class)">
    <slot />
  </nav>
</template>

<!-- PaginationContent -->
<template>
  <ul :class="cn('flex flex-row items-center gap-1', props.class)">
    <slot />
  </ul>
</template>

<!-- PaginationItem -->
<template>
  <li :class="props.class">
    <slot />
  </li>
</template>

<!-- PaginationLink -->
<template>
  <a
    :aria-current="isActive ? 'page' : undefined"
    :class="cn(
      buttonVariants({ variant: isActive ? 'default' : 'outline', size: 'icon' }),
      props.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<!-- PaginationPrevious -->
<template>
  <a :class="cn(buttonVariants({ variant: 'outline', size: 'default' }), 'gap-1 pl-2.5', props.class)" v-bind="$attrs">
    <ChevronLeft class="h-4 w-4 stroke-[3]" />
    <span>Previous</span>
  </a>
</template>

<!-- PaginationNext -->
<template>
  <a :class="cn(buttonVariants({ variant: 'outline', size: 'default' }), 'gap-1 pr-2.5', props.class)" v-bind="$attrs">
    <span>Next</span>
    <ChevronRight class="h-4 w-4 stroke-[3]" />
  </a>
</template>

<!-- PaginationEllipsis -->
<template>
  <span :class="cn('flex h-10 w-10 items-center justify-center', props.class)">
    <MoreHorizontal class="h-4 w-4 stroke-[3]" />
    <span class="sr-only">More pages</span>
  </span>
</template>`

const vueUsageCode = `<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui'
</script>

<template>
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" is-active>2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="#" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</template>`

export function PaginationDoc() {
  return (
    <>
      <ComponentDoc
        name="Pagination"
        description="Pagination with page navigation, next and previous links with neubrutalism styling."
        dependencies={[]}
        vueDependencies={[]}
        sourceCode={sourceCode}
        vueSourceCode={vueSourceCode}
        usageCode={usageCode}
        vueUsageCode={vueUsageCode}
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ComponentDoc>

      {/* Basic */}
      <ExampleSection
        title="Basic"
        description="Simple pagination with previous, next and page numbers."
        code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ExampleSection>

      {/* With Ellipsis */}
      <ExampleSection
        title="With Ellipsis"
        description="Use ellipsis to indicate more pages."
        code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">6</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">6</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ExampleSection>

      {/* First Page */}
      <ExampleSection
        title="First Page"
        description="Pagination when on the first page."
        code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ExampleSection>

      {/* Compact */}
      <ExampleSection
        title="Compact"
        description="A minimal pagination with just previous and next."
        code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <span className="px-4 text-sm font-medium">Page 2 of 10</span>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <span className="px-4 text-sm font-bold">Page 2 of 10</span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ExampleSection>
    </>
  )
}
