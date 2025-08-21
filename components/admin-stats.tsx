import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Gamepad2, DollarSign, TrendingUp, Clock, CheckCircle, BarChart3 } from "lucide-react"

interface AdminStatsProps {
  stats: {
    totalUsers: number
    activeMatches: number
    pendingVerifications: number
    totalRevenue: number
    dailySignups: number
    matchesCompleted: number
    disputedMatches: number
    systemHealth: string
  }
}

export function AdminStats({ stats }: AdminStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Users */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(stats.totalUsers)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+{stats.dailySignups}</span> today
          </p>
        </CardContent>
      </Card>

      {/* Active Matches */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Matches</CardTitle>
          <Gamepad2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(stats.activeMatches)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-blue-600">{formatNumber(stats.matchesCompleted)}</span> completed
          </p>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+12.5%</span> from last month
          </p>
        </CardContent>
      </Card>

      {/* Pending Verifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(stats.pendingVerifications)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-600">{stats.disputedMatches}</span> disputed
          </p>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Health</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-lg font-semibold text-green-600">All Systems Operational</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-muted-foreground">API Response</div>
              <div className="font-medium text-green-600">98.7ms avg</div>
            </div>
            <div>
              <div className="text-muted-foreground">Uptime</div>
              <div className="font-medium text-green-600">99.9%</div>
            </div>
            <div>
              <div className="text-muted-foreground">Error Rate</div>
              <div className="font-medium text-green-600">0.01%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Trend */}
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue Trend</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{formatCurrency(12450)}</div>
          <div className="text-xs text-muted-foreground mb-3">This month</div>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-8 bg-primary/20 rounded"></div>
            <div className="h-10 bg-primary/40 rounded"></div>
            <div className="h-12 bg-primary/60 rounded"></div>
            <div className="h-14 bg-primary rounded"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
