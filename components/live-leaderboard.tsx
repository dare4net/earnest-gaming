"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, TrendingUp, TrendingDown, Minus, Crown } from "lucide-react"

interface LeaderboardPlayer {
  id: string
  username: string
  avatar: string
  wins: number
  winRate: number
  earnings: number
  rank: number
  previousRank: number
  isOnline: boolean
}

export function LiveLeaderboard() {
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([
    {
      id: "1",
      username: "ProGamer123",
      avatar: "/placeholder.svg?height=32&width=32",
      wins: 89,
      winRate: 78.5,
      earnings: 2450.75,
      rank: 1,
      previousRank: 1,
      isOnline: true,
    },
    {
      id: "2",
      username: "SkillMaster99",
      avatar: "/placeholder.svg?height=32&width=32",
      wins: 76,
      winRate: 72.1,
      earnings: 2180.25,
      rank: 2,
      previousRank: 3,
      isOnline: true,
    },
    {
      id: "3",
      username: "ChampionPlayer",
      avatar: "/placeholder.svg?height=32&width=32",
      wins: 82,
      winRate: 69.8,
      earnings: 2050.5,
      rank: 3,
      previousRank: 2,
      isOnline: false,
    },
    {
      id: "4",
      username: "EliteGamer",
      avatar: "/placeholder.svg?height=32&width=32",
      wins: 65,
      winRate: 71.2,
      earnings: 1890.0,
      rank: 4,
      previousRank: 4,
      isOnline: true,
    },
    {
      id: "5",
      username: "GameMaster",
      avatar: "/placeholder.svg?height=32&width=32",
      wins: 58,
      winRate: 68.9,
      earnings: 1675.25,
      rank: 5,
      previousRank: 6,
      isOnline: true,
    },
  ])

  // Simulate real-time leaderboard updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prev) =>
        prev.map((player) => ({
          ...player,
          wins: player.wins + (Math.random() > 0.8 ? 1 : 0),
          earnings: player.earnings + (Math.random() > 0.7 ? Math.random() * 50 : 0),
          winRate: Math.max(50, Math.min(90, player.winRate + (Math.random() - 0.5) * 2)),
          isOnline: Math.random() > 0.2, // 80% chance to be online
        })),
      )
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) {
      return <TrendingUp className="h-3 w-3 text-green-600" />
    }
    if (current > previous) {
      return <TrendingDown className="h-3 w-3 text-red-600" />
    }
    return <Minus className="h-3 w-3 text-muted-foreground" />
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-4 w-4 text-yellow-500" />
      case 2:
        return <Trophy className="h-4 w-4 text-gray-400" />
      case 3:
        return <Trophy className="h-4 w-4 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Live Leaderboard
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
            LIVE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getRankBadge(player.rank)}
                  {getRankChange(player.rank, player.previousRank)}
                </div>

                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.username} />
                    <AvatarFallback>{player.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {player.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>

                <div>
                  <div className="font-medium text-sm">{player.username}</div>
                  <div className="text-xs text-muted-foreground">
                    {player.wins} wins • {player.winRate.toFixed(1)}% win rate
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-sm">{formatCurrency(player.earnings)}</div>
                <div className="text-xs text-muted-foreground">Total earnings</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t text-center">
          <div className="text-xs text-muted-foreground">
            Leaderboard updates every 10 seconds • Based on total earnings
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
