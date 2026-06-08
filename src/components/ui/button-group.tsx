import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Visually joins a row (or column) of Buttons into a single bordered unit:
 * shared borders collapse, individual shadows/press animations are neutralized,
 * and the group carries one hard neubrutalism shadow.
 */
const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        'inline-flex shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        // neutralize each child's own shadow + press-translate so the group reads as one block
        '[&>*]:shadow-none [&>*]:hover:translate-x-0 [&>*]:hover:translate-y-0 [&>*]:active:translate-x-0 [&>*]:active:translate-y-0',
        orientation === 'horizontal'
          ? '[&>*:not(:first-child)]:ml-[-3px]'
          : 'flex-col [&>*:not(:first-child)]:mt-[-3px]',
        className
      )}
      {...props}
    />
  )
)
ButtonGroup.displayName = 'ButtonGroup'

export { ButtonGroup }
