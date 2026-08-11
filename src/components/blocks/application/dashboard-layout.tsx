 
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface DashboardNavItem {
  label: string
  active?: boolean
}

export interface DashboardStat {
  label: string
  value: string
  trend?: string
}

export interface DashboardLayoutProps {
  title?: string
  nav: DashboardNavItem[]
  stats: DashboardStat[]
  /** Optional main-area content; a placeholder chart + table render by default. */
  children?: ReactNode
  className?: string
}

// Simple bar visualization built from divs — no chart dependency needed for the
// showcase block.
const demoBars = [60, 85, 45, 95, 70, 55, 80]

export function DashboardLayout({
  title = 'Dashboard',
  nav,
  stats,
  children,
  className,
}: DashboardLayoutProps) {
  return (
    <section
      className={cn(
        'flex min-h-[560px] border-3 border-foreground shadow-[6px_6px_0px_hsl(var(--shadow-color))] bg-background',
        className
      )}
    >
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r-3 border-foreground bg-card p-4 md:flex">
        <div className="mb-6 text-lg font-black uppercase tracking-tight">BoldKit</div>
        <nav className="space-y-1">
          {nav.map((item) => (
            <button
              key={item.label}
              // Without this the active item is styling only — AT gets no signal.
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'w-full border-2 border-transparent px-3 py-2 text-left text-sm font-bold uppercase tracking-wide transition',
                item.active
                  ? 'border-foreground bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
                  : 'hover:border-foreground hover:bg-muted'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-6 space-y-6">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase tracking-tight">{title}</h2>
          <div className="h-9 w-9 border-3 border-foreground bg-accent shadow-[2px_2px_0px_hsl(var(--shadow-color))]" />
        </header>

        {/* Stat row */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-3 border-foreground bg-card p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))]"
            >
              <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </div>
              <div className="mt-1 text-3xl font-black">{stat.value}</div>
              {stat.trend && (
                <div className="mt-1 text-xs font-bold text-success">{stat.trend}</div>
              )}
            </div>
          ))}
        </div>

        {children ?? (
          <>
            {/* Chart placeholder */}
            <div className="border-3 border-foreground bg-card p-5 shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
              <div className="mb-4 text-sm font-black uppercase tracking-wide">Weekly activity</div>
              <div className="flex h-40 items-end gap-3">
                {demoBars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 border-2 border-foreground bg-primary"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Table shell */}
            <div className="overflow-hidden border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-3 border-foreground bg-muted">
                    {['User', 'Plan', 'Status'].map((h) => (
                      <th key={h} className="p-3 text-left text-xs font-black uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Ada L.', 'Pro', 'Active'],
                    ['Alan T.', 'Team', 'Active'],
                    ['Grace H.', 'Free', 'Trial'],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b-2 border-foreground last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="p-3 text-sm font-medium">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
