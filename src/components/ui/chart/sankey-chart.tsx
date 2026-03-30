import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SankeyNode {
  id: string
  label: string
  color?: string
}

export interface SankeyLink {
  source: string
  target: string
  value: number
}

export interface SankeyChartProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: SankeyNode[]
  links: SankeyLink[]
  height?: number
  showTooltip?: boolean
  showLabels?: boolean
}

const NODE_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--success))',
  'hsl(var(--info))',
  'hsl(var(--warning))',
]

interface ComputedNode {
  id: string
  label: string
  color: string
  x: number
  y: number
  width: number
  height: number
  value: number
}

interface ComputedLink {
  source: ComputedNode
  target: ComputedNode
  value: number
  sourceY: number
  targetY: number
  thickness: number
  path: string
  color: string
}

function computeLayout(
  nodes: SankeyNode[],
  links: SankeyLink[],
  width: number,
  height: number
): { computedNodes: ComputedNode[]; computedLinks: ComputedLink[] } {
  const padding = { top: 16, right: 120, bottom: 16, left: 120 }
  const nodeWidth = 16
  const nodePadding = 10

  // Build adjacency
  const nodeMap = new Map<string, SankeyNode & { index: number }>()
  nodes.forEach((n, i) => nodeMap.set(n.id, { ...n, index: i }))

  // Determine columns (depth) via BFS
  const depth = new Map<string, number>()
  const inLinks = new Map<string, SankeyLink[]>()
  const outLinks = new Map<string, SankeyLink[]>()
  nodes.forEach(n => { inLinks.set(n.id, []); outLinks.set(n.id, []) })
  links.forEach(l => {
    outLinks.get(l.source)?.push(l)
    inLinks.get(l.target)?.push(l)
  })

  const sources = nodes.filter(n => (inLinks.get(n.id) || []).length === 0)
  const queue = sources.map(n => n.id)
  queue.forEach(id => depth.set(id, 0))
  while (queue.length > 0) {
    const id = queue.shift()!
    const d = depth.get(id) ?? 0
    for (const link of outLinks.get(id) || []) {
      if (!depth.has(link.target)) {
        depth.set(link.target, d + 1)
        queue.push(link.target)
      }
    }
  }

  const maxDepth = Math.max(...Array.from(depth.values()))
  const colWidth = maxDepth === 0 ? 0 : (width - padding.left - padding.right - nodeWidth) / maxDepth

  // Group nodes by column
  const cols = new Map<number, string[]>()
  depth.forEach((d, id) => {
    if (!cols.has(d)) cols.set(d, [])
    cols.get(d)!.push(id)
  })

  // Node values = sum of in-links (or out-links for sources)
  const nodeValue = new Map<string, number>()
  nodes.forEach(n => {
    const inVal = (inLinks.get(n.id) || []).reduce((s, l) => s + l.value, 0)
    const outVal = (outLinks.get(n.id) || []).reduce((s, l) => s + l.value, 0)
    nodeValue.set(n.id, Math.max(inVal, outVal, 1))
  })

  const totalVal = Math.max(...Array.from(nodeValue.values()))
  const innerHeight = height - padding.top - padding.bottom

  // Compute node heights and y positions per column
  const computedNodes = new Map<string, ComputedNode>()
  cols.forEach((ids, col) => {
    const colTotal = ids.reduce((s, id) => s + (nodeValue.get(id) || 1), 0)
    const totalNodeHeight = innerHeight - nodePadding * (ids.length - 1)
    let yOffset = padding.top

    ids.forEach((id) => {
      const val = nodeValue.get(id) || 1
      const h = Math.max(8, (val / colTotal) * totalNodeHeight)
      const node = nodeMap.get(id)!
      computedNodes.set(id, {
        id,
        label: node.label,
        color: node.color || NODE_COLORS[node.index % NODE_COLORS.length],
        x: padding.left + col * colWidth,
        y: yOffset,
        width: nodeWidth,
        height: h,
        value: val,
      })
      yOffset += h + nodePadding
    })
  })

  // Track current link offsets per node side
  const sourceOffsets = new Map<string, number>()
  const targetOffsets = new Map<string, number>()
  computedNodes.forEach((n, id) => {
    sourceOffsets.set(id, n.y)
    targetOffsets.set(id, n.y)
  })

  void totalVal

  const computedLinks: ComputedLink[] = links.map(link => {
    const src = computedNodes.get(link.source)!
    const tgt = computedNodes.get(link.target)!
    if (!src || !tgt) return null

    const srcNode = computedNodes.get(link.source)!
    const srcTotal = (outLinks.get(link.source) || []).reduce((s, l) => s + l.value, 0)
    const tgtTotal = (inLinks.get(link.target) || []).reduce((s, l) => s + l.value, 0)
    const thickness = Math.max(2, (link.value / Math.max(srcTotal, tgtTotal)) * srcNode.height)

    const sY = sourceOffsets.get(link.source)!
    const tY = targetOffsets.get(link.target)!
    sourceOffsets.set(link.source, sY + thickness)
    targetOffsets.set(link.target, tY + thickness)

    const x1 = src.x + src.width
    const x2 = tgt.x
    const mx = (x1 + x2) / 2

    const path = `M${x1},${sY} C${mx},${sY} ${mx},${tY} ${x2},${tY} L${x2},${tY + thickness} C${mx},${tY + thickness} ${mx},${sY + thickness} ${x1},${sY + thickness} Z`

    return {
      source: src,
      target: tgt,
      value: link.value,
      sourceY: sY,
      targetY: tY,
      thickness,
      path,
      color: src.color,
    }
  }).filter(Boolean) as ComputedLink[]

  return { computedNodes: Array.from(computedNodes.values()), computedLinks }
}

const SankeyChart = React.forwardRef<HTMLDivElement, SankeyChartProps>(
  (
    {
      nodes,
      links,
      height = 320,
      showTooltip = true,
      showLabels = true,
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [width, setWidth] = React.useState(600)
    const [tooltip, setTooltip] = React.useState<{ x: number; y: number; label: string; value: number } | null>(null)

    React.useEffect(() => {
      if (!containerRef.current) return
      const ro = new ResizeObserver(entries => {
        setWidth(entries[0].contentRect.width)
      })
      ro.observe(containerRef.current)
      setWidth(containerRef.current.offsetWidth)
      return () => ro.disconnect()
    }, [])

    const { computedNodes, computedLinks } = React.useMemo(
      () => computeLayout(nodes, links, width, height),
      [nodes, links, width, height]
    )

    return (
      <div
        ref={ref}
        className={cn('relative w-full', className)}
        {...props}
      >
        <div ref={containerRef} style={{ height }}>
          <svg width="100%" height={height}>
            {/* Links */}
            {computedLinks.map((link, i) => (
              <path
                key={i}
                d={link.path}
                fill={link.color}
                fillOpacity={0.45}
                stroke="hsl(var(--foreground))"
                strokeWidth={1}
                onMouseEnter={(e) => {
                  if (showTooltip) {
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      label: `${link.source.label} → ${link.target.label}`,
                      value: link.value,
                    })
                  }
                }}
                onMouseLeave={() => setTooltip(null)}
                style={{ cursor: 'default', transition: 'fill-opacity 100ms' }}
                className="hover:fill-opacity-70"
              />
            ))}

            {/* Nodes */}
            {computedNodes.map(node => (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  fill={node.color}
                  stroke="hsl(var(--foreground))"
                  strokeWidth={3}
                />
                {showLabels && (
                  <text
                    x={node.x > width / 2 ? node.x - 6 : node.x + node.width + 6}
                    y={node.y + node.height / 2}
                    dominantBaseline="middle"
                    textAnchor={node.x > width / 2 ? 'end' : 'start'}
                    fill="hsl(var(--foreground))"
                    style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}
                  >
                    {node.label}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Tooltip */}
        {showTooltip && tooltip && (
          <div
            className="fixed z-50 pointer-events-none border-3 border-foreground bg-background px-3 py-2 text-xs font-mono shadow-[4px_4px_0px_hsl(var(--foreground))]"
            style={{ left: tooltip.x + 12, top: tooltip.y - 32 }}
          >
            <p className="font-black">{tooltip.label}</p>
            <p className="text-muted-foreground">{tooltip.value.toLocaleString()}</p>
          </div>
        )}
      </div>
    )
  }
)
SankeyChart.displayName = 'SankeyChart'

export { SankeyChart }
