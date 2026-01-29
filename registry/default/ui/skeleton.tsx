import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse bg-muted border-2 border-foreground/20', className)}
      {...props}
    />
  )
}

export { Skeleton }
