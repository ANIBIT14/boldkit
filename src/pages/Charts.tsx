import { useState } from 'react'
import { Link } from 'react-router-dom'
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
} from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'
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
import { TrendingUp, TrendingDown, Code, Copy, Check, Moon, Sun, Github } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

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
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b-3 border-foreground bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png" alt="BoldKit" className="h-8 w-8" />
            <span className="text-xl font-black uppercase tracking-wider">BoldKit</span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Beta</Badge>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/docs" className="hidden sm:block">
              <Button variant="ghost">Docs</Button>
            </Link>
            <Link to="/components" className="hidden sm:block">
              <Button variant="ghost">Components</Button>
            </Link>
            <Link to="/charts" className="hidden sm:block">
              <Button variant="secondary">Charts</Button>
            </Link>
            <Link to="/themes" className="hidden sm:block">
              <Button variant="ghost">Themes</Button>
            </Link>
            <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
            >
              {resolvedTheme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

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
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t-3 border-foreground bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src="https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png" alt="BoldKit" className="h-6 w-6" />
                <span className="font-bold uppercase tracking-wide">BoldKit</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Beta</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                A neubrutalism React component library built on top of shadcn/ui.
              </p>
              <p className="text-xs text-muted-foreground">
                Assets powered by{' '}
                <a href="https://vanikya.ai" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                  Vanikya.ai
                </a>
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wide text-sm">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground">Documentation</Link>
                <Link to="/components" className="text-sm text-muted-foreground hover:text-foreground">Components</Link>
                <Link to="/charts" className="text-sm text-muted-foreground hover:text-foreground">Charts</Link>
                <Link to="/themes" className="text-sm text-muted-foreground hover:text-foreground">Themes</Link>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wide text-sm">Contact</h4>
              <div className="flex flex-col gap-2">
                <a href="mailto:aniruddha@boldkit.dev" className="text-sm text-muted-foreground hover:text-foreground">
                  aniruddha@boldkit.dev
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wide text-sm">Connect</h4>
              <div className="flex items-center gap-4">
                <a href="https://github.com/ANIBIT14/boldkit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/aniruddhaagarwal/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center">
            <p className="text-xs text-muted-foreground">
              MIT License. Open source and free to use.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
