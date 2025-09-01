"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Gamepad2, TrendingUp, Activity } from "lucide-react"

interface LiveStats {
  onlineUsers: number
  activeMatches: number
  totalWagered: number
  matchesCompleted: number
}

export function LiveStats() {
  const [stats, setStats] = useState<LiveStats>({
    onlineUsers: 8247,
    activeMatches: 156,
    totalWagered: 125430.5,
    matchesCompleted: 1834,
  })

  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        onlineUsers: prev.onlineUsers + Math.floor(Math.random() * 10) - 5,
        activeMatches: Math.max(0, prev.activeMatches + Math.floor(Math.random() * 6) - 3),
        totalWagered: prev.totalWagered + Math.random() * 100,
        matchesCompleted: prev.matchesCompleted + Math.floor(Math.random() * 3),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)

  const formatNumber = (num: number) => new Intl.NumberFormat("en-US").format(num)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Online Users */}
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <CardTitle className="text-sm font-medium">Online Players</CardTitle>
          <div className="flex flex-col items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            {isLive && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  LIVE
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(stats.onlineUsers)}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> +2.5% from yesterday
          </p>
        </CardContent>
      </Card>

      {/* Active Matches */}
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Matches</CardTitle>
          <div className="flex flex-col items-center gap-1">
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            {isLive && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                  LIVE
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(stats.activeMatches)}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <Activity className="h-3 w-3 mr-1" /> Peak: 234 matches
          </p>
        </CardContent>
      </Card>

      {/* Total Wagered */}
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Wagered</CardTitle>
          <div className="flex flex-col items-center gap-1">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            {isLive && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  LIVE
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalWagered)}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> +15.2% this week
          </p>
        </CardContent>
      </Card>

      {/* Matches Completed */}
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <CardTitle className="text-sm font-medium">Matches Completed</CardTitle>
          <div className="flex flex-col items-center gap-1">
            <Activity className="h-4 w-4 text-muted-foreground" />
            {isLive && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                  LIVE
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(stats.matchesCompleted)}</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <Activity className="h-3 w-3 mr-1" /> +89 today
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
