import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { GearShape } from '@/components/ui/shapes'
import { SEO } from '@/components/SEO'
import { useTheme } from '@/hooks/use-theme'
import {
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  ShoppingCart,
  UserPlus,
  ChevronRight,
  MoreHorizontal,
  Home,
  FileText,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react'

// ============================================
// DASHBOARD TEMPLATE - NEUBRUTALISM STYLE
// ============================================
// A SaaS admin panel with dark sidebar, stats grid, charts, and data tables

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
  color: string
  large?: boolean
}

function StatCard({ title, value, change, trend, icon, color, large }: StatCardProps) {
  return (
    <Card className={`relative overflow-hidden ${large ? 'md:col-span-2' : ''}`}>
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-20 -translate-y-8 translate-x-8 rotate-12`} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-black">{value}</p>
            <div className={`flex items-center gap-1 mt-2 ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
              {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="text-sm font-bold">{change}</span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          </div>
          <div className={`w-12 h-12 ${color} border-3 border-foreground flex items-center justify-center shadow-[3px_3px_0px_hsl(var(--shadow-color))]`}>
            {icon}
          </div>
        </div>
        {large && (
          <div className="mt-4 pt-4 border-t-2 border-foreground/10">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Monthly Target</span>
              <span className="font-bold">78%</span>
            </div>
            <Progress value={78} className="h-3" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface ActivityItemProps {
  type: 'sale' | 'user' | 'update' | 'alert'
  title: string
  description: string
  time: string
}

const activityColors = {
  sale: 'bg-success',
  user: 'bg-info',
  update: 'bg-primary',
  alert: 'bg-warning',
}

function ActivityItem({ type, title, description, time }: ActivityItemProps) {
  return (
    <div className="flex gap-3 py-3 border-b-2 border-foreground/10 last:border-0">
      <div className={`w-3 h-3 ${activityColors[type]} border-2 border-foreground mt-1.5 shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground shrink-0">{time}</span>
    </div>
  )
}

const recentOrders = [
  { id: 'ORD-001', customer: 'Sarah Chen', product: 'Pro Plan', amount: '$299', status: 'completed' },
  { id: 'ORD-002', customer: 'Mike Johnson', product: 'Enterprise', amount: '$999', status: 'pending' },
  { id: 'ORD-003', customer: 'Emily Davis', product: 'Starter', amount: '$49', status: 'completed' },
  { id: 'ORD-004', customer: 'Alex Kim', product: 'Pro Plan', amount: '$299', status: 'processing' },
  { id: 'ORD-005', customer: 'Jordan Lee', product: 'Enterprise', amount: '$999', status: 'completed' },
]

const statusColors: Record<string, string> = {
  completed: 'bg-success text-success-foreground',
  pending: 'bg-warning text-warning-foreground',
  processing: 'bg-info text-info-foreground',
}

const navItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Users, label: 'Customers' },
  { icon: ShoppingCart, label: 'Orders' },
  { icon: FileText, label: 'Reports' },
  { icon: Settings, label: 'Settings' },
]

export function DashboardTemplate() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isThemeAnimating, setIsThemeAnimating] = useState(false)

  const handleThemeToggle = () => {
    setIsThemeAnimating(true)
    setTimeout(() => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      setTimeout(() => {
        setIsThemeAnimating(false)
      }, 200)
    }, 200)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Theme Transition Overlay */}
      <div
        className={`fixed inset-0 z-[100] pointer-events-none bg-foreground transition-opacity duration-200 ${
          isThemeAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Theme Toggle */}
      <button
        onClick={handleThemeToggle}
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full border-4 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--foreground))] flex items-center justify-center hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_hsl(var(--foreground))] transition-all"
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      <SEO
        title="Dashboard Template"
        description="A SaaS admin dashboard template with stats grid, charts, activity feed, and data tables. Built with BoldKit neubrutalism components."
        keywords="dashboard template, admin panel, saas dashboard, react dashboard, vue dashboard, neubrutalism dashboard"
        canonical="https://boldkit.dev/templates/dashboard"
        breadcrumbs={[
          { name: 'Home', url: 'https://boldkit.dev/' },
          { name: 'Templates', url: 'https://boldkit.dev/templates' },
          { name: 'Dashboard' },
        ]}
      />

      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-foreground text-background flex-col border-r-3 border-foreground">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b-3 border-background/20">
          <div className="w-8 h-8 bg-primary border-2 border-background" />
          <span className="font-black text-xl uppercase">AdminKit</span>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-3 py-2.5 font-bold text-sm uppercase tracking-wide transition-colors ${
                  item.active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-background/70 hover:bg-background/10 hover:text-background'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </a>
            ))}
          </nav>

          <div className="px-3 mt-8">
            <div className="p-4 bg-background/10 border-2 border-background/20">
              <div className="flex items-center gap-3 mb-3">
                <GearShape size={32} className="text-primary" />
                <span className="font-bold text-sm">Pro Plan</span>
              </div>
              <p className="text-xs text-background/70 mb-3">
                Upgrade to unlock all features and remove limits.
              </p>
              <Button size="sm" variant="secondary" className="w-full">
                Upgrade Now
              </Button>
            </div>
          </div>
        </ScrollArea>

        {/* User Section */}
        <div className="p-4 border-t-3 border-background/20">
          <div className="flex items-center gap-3">
            <Avatar className="border-2 border-background">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">Admin User</p>
              <p className="text-xs text-background/60 truncate">admin@example.com</p>
            </div>
            <Button variant="ghost" size="icon" className="text-background/60 hover:text-background hover:bg-background/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-background border-b-3 border-foreground flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile menu button would go here */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-64 pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Avatar className="border-2 border-foreground lg:hidden">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <ScrollArea className="flex-1">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-black uppercase tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">Export</Button>
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Customer
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Revenue"
                value="$45,231"
                change="+20.1%"
                trend="up"
                icon={<DollarSign className="h-6 w-6" />}
                color="bg-success"
                large
              />
              <StatCard
                title="New Customers"
                value="2,350"
                change="+15.3%"
                trend="up"
                icon={<UserPlus className="h-6 w-6" />}
                color="bg-info"
              />
              <StatCard
                title="Active Users"
                value="12,234"
                change="-3.2%"
                trend="down"
                icon={<Activity className="h-6 w-6" />}
                color="bg-primary"
              />
            </div>

            {/* Charts & Activity */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="uppercase">Revenue Overview</CardTitle>
                    <Tabs defaultValue="monthly">
                      <TabsList>
                        <TabsTrigger value="weekly">Week</TabsTrigger>
                        <TabsTrigger value="monthly">Month</TabsTrigger>
                        <TabsTrigger value="yearly">Year</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Chart Placeholder */}
                  <div className="h-64 bg-muted border-3 border-foreground relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-30" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around px-4 pb-4">
                      {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((height, i) => (
                        <div
                          key={i}
                          className="w-full max-w-[40px] bg-primary border-2 border-foreground mx-0.5"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <div className="absolute top-4 left-4 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary border-2 border-foreground" />
                        <span className="text-xs font-bold">Revenue</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Feed */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="uppercase">Recent Activity</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-0">
                    <ActivityItem
                      type="sale"
                      title="New sale completed"
                      description="Enterprise plan - $999"
                      time="2m ago"
                    />
                    <ActivityItem
                      type="user"
                      title="New user registered"
                      description="john@example.com"
                      time="15m ago"
                    />
                    <ActivityItem
                      type="update"
                      title="System update"
                      description="Version 2.4.0 deployed"
                      time="1h ago"
                    />
                    <ActivityItem
                      type="alert"
                      title="Low inventory alert"
                      description="Product SKU-123"
                      time="2h ago"
                    />
                    <ActivityItem
                      type="sale"
                      title="New sale completed"
                      description="Pro plan - $299"
                      time="3h ago"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Table */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="uppercase">Recent Orders</CardTitle>
                    <CardDescription>A list of recent orders from your store.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Search orders..." className="w-48" />
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold uppercase">Order ID</TableHead>
                      <TableHead className="font-bold uppercase">Customer</TableHead>
                      <TableHead className="font-bold uppercase">Product</TableHead>
                      <TableHead className="font-bold uppercase">Amount</TableHead>
                      <TableHead className="font-bold uppercase">Status</TableHead>
                      <TableHead className="font-bold uppercase text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono font-bold">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell className="font-bold">{order.amount}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[order.status]}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-foreground/10">
                  <p className="text-sm text-muted-foreground">
                    Showing 1 to 5 of 50 results
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                      1
                    </Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default DashboardTemplate
