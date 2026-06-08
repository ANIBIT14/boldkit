import { cva } from 'class-variance-authority'

export const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center border-3 border-foreground bg-background px-4 py-2 text-sm font-bold uppercase tracking-wide shadow-[4px_4px_0px_hsl(var(--shadow-color))] outline-none transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:translate-x-[2px] data-[state=open]:translate-y-[2px] data-[state=open]:shadow-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground'
)
