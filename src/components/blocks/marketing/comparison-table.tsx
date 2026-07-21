 
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ComparisonRow {
  feature: string
  values: (string | boolean)[]
}

export interface ComparisonTableProps {
  title?: string
  subtitle?: string
  columns: string[]
  rows: ComparisonRow[]
  /** Zero-based index of the emphasized column. */
  highlightColumn?: number
  className?: string
}

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="inline-flex h-6 w-6 items-center justify-center border-2 border-foreground bg-success">
        <Check className="h-3.5 w-3.5 text-success-foreground" />
      </span>
    ) : (
      <span className="inline-flex h-6 w-6 items-center justify-center border-2 border-foreground bg-muted">
        <X className="h-3.5 w-3.5 text-muted-foreground" />
      </span>
    )
  }
  return <span className="text-sm font-bold">{value}</span>
}

export function ComparisonTable({
  title = 'Compare plans',
  subtitle,
  columns,
  rows,
  highlightColumn,
  className,
}: ComparisonTableProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{title}</h2>
          {subtitle && <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
        </div>
        <div className="overflow-x-auto border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-3 border-foreground bg-muted">
                <th className="p-4 text-left text-sm font-black uppercase tracking-wide">Feature</th>
                {columns.map((col, i) => (
                  <th
                    key={col}
                    className={cn(
                      'p-4 text-center text-sm font-black uppercase tracking-wide',
                      i === highlightColumn && 'bg-primary text-primary-foreground'
                    )}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b-2 border-foreground last:border-b-0">
                  <td className="p-4 text-sm font-bold">{row.feature}</td>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={cn(
                        'p-4 text-center',
                        i === highlightColumn && 'bg-primary/10'
                      )}
                    >
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
