import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  CHART_PALETTES,
  getChartColor,
} from '@/components/ui/chart'
import type { ChartConfig, ChartPalette } from '@/components/ui/chart'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'
import { TrendingUp, TrendingDown, Code, Copy, Check } from 'lucide-react'
import { Layout } from '@/components/layout'

// Sample data for charts
const areaData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const barData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const lineData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const pieData = [
  { browser: 'Chrome', visitors: 275, fill: 'hsl(var(--primary))' },
  { browser: 'Safari', visitors: 200, fill: 'hsl(var(--secondary))' },
  { browser: 'Firefox', visitors: 187, fill: 'hsl(var(--accent))' },
  { browser: 'Edge', visitors: 173, fill: 'hsl(var(--success))' },
  { browser: 'Other', visitors: 90, fill: 'hsl(var(--muted))' },
]

const horizontalBarData = [
  { browser: 'Chrome', visitors: 275 },
  { browser: 'Safari', visitors: 200 },
  { browser: 'Firefox', visitors: 187 },
  { browser: 'Edge', visitors: 173 },
  { browser: 'Other', visitors: 90 },
]

const chartConfig: ChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--primary))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--secondary))',
  },
  visitors: {
    label: 'Visitors',
    color: 'hsl(var(--primary))',
  },
}

const pieChartConfig: ChartConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'hsl(var(--primary))' },
  safari: { label: 'Safari', color: 'hsl(var(--secondary))' },
  firefox: { label: 'Firefox', color: 'hsl(var(--accent))' },
  edge: { label: 'Edge', color: 'hsl(var(--success))' },
  other: { label: 'Other', color: 'hsl(var(--muted))' },
}

// Code examples for copy functionality
const chartCodes = {
  areaBasic: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'Jun', desktop: 214 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--primary))' },
}

export function AreaChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Area
          type="monotone"
          dataKey="desktop"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--foreground))"
          strokeWidth={3}
          fillOpacity={0.6}
        />
      </AreaChart>
    </ChartContainer>
  )
}`,

  areaStacked: `import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--primary))' },
  mobile: { label: 'Mobile', color: 'hsl(var(--secondary))' },
}

export function AreaChartStacked() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          type="monotone"
          dataKey="mobile"
          stackId="1"
          fill="hsl(var(--secondary))"
          stroke="hsl(var(--foreground))"
          strokeWidth={3}
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          dataKey="desktop"
          stackId="1"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--foreground))"
          strokeWidth={3}
          fillOpacity={0.6}
        />
      </AreaChart>
    </ChartContainer>
  )
}`,

  areaStep: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'Jun', desktop: 214 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--accent))' },
}

export function AreaChartStep() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Area
          type="step"
          dataKey="desktop"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth={3}
          fillOpacity={0.6}
        />
      </AreaChart>
    </ChartContainer>
  )
}`,

  areaLinear: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'Jun', desktop: 214 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--success))' },
}

export function AreaChartLinear() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Area
          type="linear"
          dataKey="desktop"
          fill="hsl(var(--success))"
          stroke="hsl(var(--foreground))"
          strokeWidth={3}
          fillOpacity={0.6}
        />
      </AreaChart>
    </ChartContainer>
  )
}`,

  barBasic: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'Jun', desktop: 214 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--primary))' },
}

export function BarChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Bar
          dataKey="desktop"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--foreground))"
          strokeWidth={3}
        />
      </BarChart>
    </ChartContainer>
  )
}`,

  barMultiple: `import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--primary))' },
  mobile: { label: 'Mobile', color: 'hsl(var(--secondary))' },
}

export function BarChartMultiple() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth={3} />
        <Bar dataKey="mobile" fill="hsl(var(--secondary))" stroke="hsl(var(--foreground))" strokeWidth={3} />
      </BarChart>
    </ChartContainer>
  )
}`,

  barHorizontal: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { browser: 'Chrome', visitors: 275 },
  { browser: 'Safari', visitors: 200 },
  { browser: 'Firefox', visitors: 187 },
  { browser: 'Edge', visitors: 173 },
  { browser: 'Other', visitors: 90 },
]

const chartConfig = {
  visitors: { label: 'Visitors', color: 'hsl(var(--accent))' },
}

export function BarChartHorizontal() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tickLine={false} axisLine={false} />
        <YAxis dataKey="browser" type="category" tickLine={false} axisLine={false} width={80} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Bar
          dataKey="visitors"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth={3}
        />
      </BarChart>
    </ChartContainer>
  )
}`,

  barStacked: `import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--primary))' },
  mobile: { label: 'Mobile', color: 'hsl(var(--secondary))' },
}

export function BarChartStacked() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" stackId="a" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth={3} />
        <Bar dataKey="mobile" stackId="a" fill="hsl(var(--secondary))" stroke="hsl(var(--foreground))" strokeWidth={3} />
      </BarChart>
    </ChartContainer>
  )
}`,

  lineBasic: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'Jun', desktop: 214 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--primary))' },
}

export function LineChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Line
          type="monotone"
          dataKey="desktop"
          stroke="hsl(var(--primary))"
          strokeWidth={4}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 3, stroke: 'hsl(var(--foreground))' }}
        />
      </LineChart>
    </ChartContainer>
  )
}`,

  lineMultiple: `import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--primary))' },
  mobile: { label: 'Mobile', color: 'hsl(var(--secondary))' },
}

export function LineChartMultiple() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="desktop"
          stroke="hsl(var(--primary))"
          strokeWidth={4}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 3, stroke: 'hsl(var(--foreground))' }}
        />
        <Line
          type="monotone"
          dataKey="mobile"
          stroke="hsl(var(--secondary))"
          strokeWidth={4}
          dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 3, stroke: 'hsl(var(--foreground))' }}
        />
      </LineChart>
    </ChartContainer>
  )
}`,

  lineStep: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'Jun', desktop: 214 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--accent))' },
}

export function LineChartStep() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Line
          type="stepAfter"
          dataKey="desktop"
          stroke="hsl(var(--accent))"
          strokeWidth={4}
          dot={{ fill: 'hsl(var(--accent))', strokeWidth: 3, stroke: 'hsl(var(--foreground))' }}
        />
      </LineChart>
    </ChartContainer>
  )
}`,

  lineLinear: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const data = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'Jun', desktop: 214 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--success))' },
}

export function LineChartLinear() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Line
          type="linear"
          dataKey="desktop"
          stroke="hsl(var(--success))"
          strokeWidth={4}
          dot={{ fill: 'hsl(var(--success))', strokeWidth: 3, stroke: 'hsl(var(--foreground))' }}
        />
      </LineChart>
    </ChartContainer>
  )
}`,

  pieBasic: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Pie, PieChart, Cell } from 'recharts'

const data = [
  { browser: 'Chrome', visitors: 275, fill: 'hsl(var(--primary))' },
  { browser: 'Safari', visitors: 200, fill: 'hsl(var(--secondary))' },
  { browser: 'Firefox', visitors: 187, fill: 'hsl(var(--accent))' },
  { browser: 'Edge', visitors: 173, fill: 'hsl(var(--success))' },
  { browser: 'Other', visitors: 90, fill: 'hsl(var(--muted))' },
]

const chartConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'hsl(var(--primary))' },
  safari: { label: 'Safari', color: 'hsl(var(--secondary))' },
  firefox: { label: 'Firefox', color: 'hsl(var(--accent))' },
  edge: { label: 'Edge', color: 'hsl(var(--success))' },
  other: { label: 'Other', color: 'hsl(var(--muted))' },
}

export function PieChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey="visitors"
          nameKey="browser"
          cx="50%"
          cy="50%"
          outerRadius={100}
          strokeWidth={3}
          stroke="hsl(var(--foreground))"
        >
          {data.map((entry, index) => (
            <Cell key={\`cell-\${index}\`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}`,

  pieDonut: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Pie, PieChart, Cell } from 'recharts'

const data = [
  { browser: 'Chrome', visitors: 275, fill: 'hsl(var(--primary))' },
  { browser: 'Safari', visitors: 200, fill: 'hsl(var(--secondary))' },
  { browser: 'Firefox', visitors: 187, fill: 'hsl(var(--accent))' },
  { browser: 'Edge', visitors: 173, fill: 'hsl(var(--success))' },
  { browser: 'Other', visitors: 90, fill: 'hsl(var(--muted))' },
]

const chartConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'hsl(var(--primary))' },
  safari: { label: 'Safari', color: 'hsl(var(--secondary))' },
  firefox: { label: 'Firefox', color: 'hsl(var(--accent))' },
  edge: { label: 'Edge', color: 'hsl(var(--success))' },
  other: { label: 'Other', color: 'hsl(var(--muted))' },
}

export function PieChartDonut() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey="visitors"
          nameKey="browser"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          strokeWidth={3}
          stroke="hsl(var(--foreground))"
        >
          {data.map((entry, index) => (
            <Cell key={\`cell-\${index}\`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}`,

  pieLegend: `import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import { Pie, PieChart, Cell } from 'recharts'

const data = [
  { browser: 'Chrome', visitors: 275, fill: 'hsl(var(--primary))' },
  { browser: 'Safari', visitors: 200, fill: 'hsl(var(--secondary))' },
  { browser: 'Firefox', visitors: 187, fill: 'hsl(var(--accent))' },
  { browser: 'Edge', visitors: 173, fill: 'hsl(var(--success))' },
  { browser: 'Other', visitors: 90, fill: 'hsl(var(--muted))' },
]

const chartConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'hsl(var(--primary))' },
  safari: { label: 'Safari', color: 'hsl(var(--secondary))' },
  firefox: { label: 'Firefox', color: 'hsl(var(--accent))' },
  edge: { label: 'Edge', color: 'hsl(var(--success))' },
  other: { label: 'Other', color: 'hsl(var(--muted))' },
}

export function PieChartWithLegend() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent nameKey="browser" />} verticalAlign="bottom" />
        <Pie
          data={data}
          dataKey="visitors"
          nameKey="browser"
          cx="50%"
          cy="45%"
          outerRadius={80}
          strokeWidth={3}
          stroke="hsl(var(--foreground))"
        >
          {data.map((entry, index) => (
            <Cell key={\`cell-\${index}\`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}`,

  pieInteractive: `import { useState } from 'react'
import { ChartContainer } from '@/components/ui/chart'
import { Pie, PieChart, Cell } from 'recharts'

const data = [
  { browser: 'Chrome', visitors: 275, fill: 'hsl(var(--primary))' },
  { browser: 'Safari', visitors: 200, fill: 'hsl(var(--secondary))' },
  { browser: 'Firefox', visitors: 187, fill: 'hsl(var(--accent))' },
  { browser: 'Edge', visitors: 173, fill: 'hsl(var(--success))' },
  { browser: 'Other', visitors: 90, fill: 'hsl(var(--muted))' },
]

const chartConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'hsl(var(--primary))' },
  safari: { label: 'Safari', color: 'hsl(var(--secondary))' },
  firefox: { label: 'Firefox', color: 'hsl(var(--accent))' },
  edge: { label: 'Edge', color: 'hsl(var(--success))' },
  other: { label: 'Other', color: 'hsl(var(--muted))' },
}

export function InteractivePieChart() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div>
      <div className="text-center mb-4">
        <p className="text-2xl font-black">{data[activeIndex].visitors}</p>
        <p className="text-sm text-muted-foreground">{data[activeIndex].browser} visitors</p>
      </div>
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <PieChart>
          <Pie
            data={data}
            dataKey="visitors"
            nameKey="browser"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            strokeWidth={3}
            stroke="hsl(var(--foreground))"
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.fill}
                opacity={index === activeIndex ? 1 : 0.5}
                style={{
                  transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: 'center',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  )
}`,
}

function ChartCard({
  title,
  description,
  trend,
  trendValue,
  code,
  children,
}: {
  title: string
  description: string
  trend?: 'up' | 'down'
  trendValue?: string
  code: string
  children: React.ReactNode
}) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
              <Code className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] p-0">
            <DialogHeader className="p-6 pb-4 pr-14">
              <DialogTitle>{title}</DialogTitle>
              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={copyCode} className="gap-2">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </Button>
              </div>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] px-6 pb-6">
              <pre className="p-4 bg-muted border-3 border-foreground text-sm whitespace-pre-wrap break-words">
                <code className="text-xs leading-relaxed block">{code}</code>
              </pre>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {children}
        {trend && trendValue && (
          <div className="flex items-center gap-2 mt-4 text-sm">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span className="font-bold">{trendValue}</span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function Charts() {
  const [activeSlice, setActiveSlice] = useState(0)

  return (
    <Layout>
      {/* Header */}
      <header className="border-b-3 border-foreground bg-background">
        <div className="container mx-auto py-12 px-4 md:px-6 text-center">
          <Badge variant="accent" className="mb-4">Charts</Badge>
          <h1 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
            Chart Components
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Beautiful charts with neubrutalism styling. Built on top of Recharts with bold borders and hard shadows.
          </p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <Tabs defaultValue="area" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="pie">Pie</TabsTrigger>
            <TabsTrigger value="styles">Styles</TabsTrigger>
            </TabsList>
          </div>

          {/* Area Charts */}
          <TabsContent value="area" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <ChartCard
                title="Area Chart"
                description="Showing total visitors for the last 6 months"
                trend="up"
                trendValue="+5.2%"
                code={chartCodes.areaBasic}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <AreaChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Area
                      type="monotone"
                      dataKey="desktop"
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={3}
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Area Chart - Stacked"
                description="Showing desktop and mobile visitors"
                trend="up"
                trendValue="+12.5%"
                code={chartCodes.areaStacked}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <AreaChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area
                      type="monotone"
                      dataKey="mobile"
                      stackId="1"
                      fill="hsl(var(--secondary))"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={3}
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="desktop"
                      stackId="1"
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={3}
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Area Chart - Step"
                description="Step interpolation for discrete data"
                code={chartCodes.areaStep}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <AreaChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Area
                      type="step"
                      dataKey="desktop"
                      fill="hsl(var(--accent))"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={3}
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Area Chart - Linear"
                description="Linear interpolation between points"
                code={chartCodes.areaLinear}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <AreaChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Area
                      type="linear"
                      dataKey="desktop"
                      fill="hsl(var(--success))"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={3}
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ChartContainer>
              </ChartCard>
            </div>
          </TabsContent>

          {/* Bar Charts */}
          <TabsContent value="bar" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <ChartCard
                title="Bar Chart"
                description="Monthly visitor statistics"
                trend="up"
                trendValue="+8.1%"
                code={chartCodes.barBasic}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Bar
                      dataKey="desktop"
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={3}
                    />
                  </BarChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Bar Chart - Multiple"
                description="Comparing desktop and mobile"
                code={chartCodes.barMultiple}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="desktop"
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={3}
                    />
                    <Bar
                      dataKey="mobile"
                      fill="hsl(var(--secondary))"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={3}
                    />
                  </BarChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Bar Chart - Horizontal"
                description="Browser usage statistics"
                code={chartCodes.barHorizontal}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <BarChart data={horizontalBarData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tickLine={false} axisLine={false} />
                    <YAxis dataKey="browser" type="category" tickLine={false} axisLine={false} width={80} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Bar
                      dataKey="visitors"
                      fill="hsl(var(--accent))"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={3}
                    />
                  </BarChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Bar Chart - Stacked"
                description="Stacked comparison view"
                code={chartCodes.barStacked}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="desktop"
                      stackId="a"
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={3}
                    />
                    <Bar
                      dataKey="mobile"
                      stackId="a"
                      fill="hsl(var(--secondary))"
                      stroke="hsl(var(--foreground))"
                      strokeWidth={3}
                    />
                  </BarChart>
                </ChartContainer>
              </ChartCard>
            </div>
          </TabsContent>

          {/* Line Charts */}
          <TabsContent value="line" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <ChartCard
                title="Line Chart"
                description="Visitor trends over time"
                trend="up"
                trendValue="+3.7%"
                code={chartCodes.lineBasic}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Line
                      type="monotone"
                      dataKey="desktop"
                      stroke="hsl(var(--primary))"
                      strokeWidth={4}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 3, stroke: 'hsl(var(--foreground))' }}
                    />
                  </LineChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Line Chart - Multiple"
                description="Multiple data series"
                code={chartCodes.lineMultiple}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line
                      type="monotone"
                      dataKey="desktop"
                      stroke="hsl(var(--primary))"
                      strokeWidth={4}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 3, stroke: 'hsl(var(--foreground))' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mobile"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={4}
                      dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 3, stroke: 'hsl(var(--foreground))' }}
                    />
                  </LineChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Line Chart - Step"
                description="Step-wise progression"
                code={chartCodes.lineStep}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Line
                      type="stepAfter"
                      dataKey="desktop"
                      stroke="hsl(var(--accent))"
                      strokeWidth={4}
                      dot={{ fill: 'hsl(var(--accent))', strokeWidth: 3, stroke: 'hsl(var(--foreground))' }}
                    />
                  </LineChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Line Chart - Linear"
                description="Linear interpolation"
                code={chartCodes.lineLinear}
              >
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Line
                      type="linear"
                      dataKey="desktop"
                      stroke="hsl(var(--success))"
                      strokeWidth={4}
                      dot={{ fill: 'hsl(var(--success))', strokeWidth: 3, stroke: 'hsl(var(--foreground))' }}
                    />
                  </LineChart>
                </ChartContainer>
              </ChartCard>
            </div>
          </TabsContent>

          {/* Pie Charts */}
          <TabsContent value="pie" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <ChartCard
                title="Pie Chart"
                description="Browser usage breakdown"
                code={chartCodes.pieBasic}
              >
                <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={pieData}
                      dataKey="visitors"
                      nameKey="browser"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      strokeWidth={3}
                      stroke="hsl(var(--foreground))"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Pie Chart - Donut"
                description="Donut style visualization"
                code={chartCodes.pieDonut}
              >
                <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={pieData}
                      dataKey="visitors"
                      nameKey="browser"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      strokeWidth={3}
                      stroke="hsl(var(--foreground))"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Pie Chart - With Legend"
                description="Including data legend"
                code={chartCodes.pieLegend}
              >
                <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend
                      content={<ChartLegendContent nameKey="browser" />}
                      verticalAlign="bottom"
                    />
                    <Pie
                      data={pieData}
                      dataKey="visitors"
                      nameKey="browser"
                      cx="50%"
                      cy="45%"
                      outerRadius={80}
                      strokeWidth={3}
                      stroke="hsl(var(--foreground))"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </ChartCard>

              <ChartCard
                title="Pie Chart - Interactive"
                description="Hover to highlight segments"
                code={chartCodes.pieInteractive}
              >
                <div className="text-center mb-4">
                  <p className="text-2xl font-black">{pieData[activeSlice].visitors}</p>
                  <p className="text-sm text-muted-foreground">{pieData[activeSlice].browser} visitors</p>
                </div>
                <ChartContainer config={pieChartConfig} className="h-[250px] w-full">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="visitors"
                      nameKey="browser"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      strokeWidth={3}
                      stroke="hsl(var(--foreground))"
                      onMouseEnter={(_, index) => setActiveSlice(index)}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-interactive-${index}`}
                          fill={entry.fill}
                          opacity={index === activeSlice ? 1 : 0.5}
                          style={{
                            transform: index === activeSlice ? 'scale(1.05)' : 'scale(1)',
                            transformOrigin: 'center',
                            transition: 'all 0.2s ease-in-out',
                            cursor: 'pointer'
                          }}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </ChartCard>
            </div>
          </TabsContent>

          {/* Styles Tab */}
          <TabsContent value="styles" className="space-y-12">
            {/* Chart Container Variants */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Container Variants</h2>
                <p className="text-muted-foreground">Different container styles for your charts using the variant prop.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(['default', 'elevated', 'flat', 'filled', 'accent', 'primary', 'minimal'] as const).map((variant) => (
                  <Card key={variant}>
                    <CardHeader className="pb-2">
                      <CardTitle className="capitalize">{variant}</CardTitle>
                      <CardDescription>variant="{variant}"</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} variant={variant} className="h-[180px] w-full">
                        <BarChart data={barData.slice(0, 4)}>
                          <Bar dataKey="desktop" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth={3} />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Color Palettes */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Color Palettes</h2>
                <p className="text-muted-foreground">Pre-built color palettes for consistent neubrutalism styling.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {(Object.keys(CHART_PALETTES) as ChartPalette[]).map((paletteName) => {
                  const palette = CHART_PALETTES[paletteName]
                  const paletteConfig: ChartConfig = palette.reduce((acc, color, index) => ({
                    ...acc,
                    [`value${index}`]: { label: `Series ${index + 1}`, color },
                  }), {})
                  const paletteData = palette.map((_, index) => ({
                    name: `S${index + 1}`,
                    value: 100 - index * 10,
                    fill: palette[index],
                  }))

                  return (
                    <Card key={paletteName}>
                      <CardHeader>
                        <CardTitle className="capitalize">{paletteName} Palette</CardTitle>
                        <CardDescription>CHART_PALETTES.{paletteName}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2 mb-4">
                          {palette.map((color, index) => (
                            <div
                              key={index}
                              className="h-8 flex-1 border-3 border-foreground"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <ChartContainer config={paletteConfig} className="h-[200px] w-full">
                          <BarChart data={paletteData}>
                            <XAxis dataKey="name" tickLine={false} axisLine={false} />
                            <Bar dataKey="value" stroke="hsl(var(--foreground))" strokeWidth={3}>
                              {paletteData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Quick Win Examples */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Quick Styling Examples</h2>
                <p className="text-muted-foreground">Copy these patterns for instant neubrutalism chart styling.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Vibrant Stacked Area</CardTitle>
                    <CardDescription>Using the vibrant palette with elevated variant</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} variant="elevated" className="h-[250px] w-full">
                      <AreaChart data={areaData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="mobile"
                          stackId="1"
                          fill={getChartColor('vibrant', 1)}
                          stroke="hsl(var(--foreground))"
                          strokeWidth={3}
                          fillOpacity={0.7}
                        />
                        <Area
                          type="monotone"
                          dataKey="desktop"
                          stackId="1"
                          fill={getChartColor('vibrant', 0)}
                          stroke="hsl(var(--foreground))"
                          strokeWidth={3}
                          fillOpacity={0.7}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Accent Highlighted Bars</CardTitle>
                    <CardDescription>Using accent variant with pastel colors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} variant="accent" className="h-[250px] w-full">
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="desktop" fill={getChartColor('pastel', 0)} stroke="hsl(var(--foreground))" strokeWidth={3} />
                        <Bar dataKey="mobile" fill={getChartColor('pastel', 1)} stroke="hsl(var(--foreground))" strokeWidth={3} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Primary Line Chart</CardTitle>
                    <CardDescription>Primary variant with thick line strokes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} variant="primary" className="h-[250px] w-full">
                      <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="desktop"
                          stroke={getChartColor('vibrant', 0)}
                          strokeWidth={5}
                          dot={{ fill: getChartColor('vibrant', 0), strokeWidth: 3, stroke: 'hsl(var(--foreground))', r: 6 }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vibrant Donut</CardTitle>
                    <CardDescription>Using filled variant with vibrant colors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={pieChartConfig} variant="filled" className="h-[250px] w-full">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie
                          data={pieData.map((item, index) => ({ ...item, fill: getChartColor('vibrant', index) }))}
                          dataKey="visitors"
                          nameKey="browser"
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={85}
                          strokeWidth={3}
                          stroke="hsl(var(--foreground))"
                        >
                          {pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={getChartColor('vibrant', index)} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Code Example */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle>Usage Example</CardTitle>
                <CardDescription>How to use the chart utilities</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-background border-3 border-foreground text-sm overflow-x-auto shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
                  <code>{`import { ChartContainer, CHART_PALETTES, getChartColor, createChartConfig } from '@/components/ui/chart'

// Use pre-built palettes
const colors = CHART_PALETTES.vibrant // ['hsl(0 84% 60%)', 'hsl(174 62% 50%)', ...]

// Get individual colors by index
const primaryColor = getChartColor('vibrant', 0)
const secondaryColor = getChartColor('vibrant', 1)

// Generate chart config from palette
const config = createChartConfig(['sales', 'profit'], ['Sales', 'Profit'], 'bold')

// Use container variants
<ChartContainer config={config} variant="elevated">
  <BarChart data={data}>
    <Bar dataKey="sales" fill={getChartColor('vibrant', 0)} />
    <Bar dataKey="profit" fill={getChartColor('vibrant', 1)} />
  </BarChart>
</ChartContainer>`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

    </Layout>
  )
}
