"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Clock, CheckCircle, AlertTriangle, Gamepad2, Filter, Trophy } from "lucide-react"

export function MatchManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock match data
  const matches = [
    {
      id: "match-001",
      game: "eFootball",
      gameIcon: "⚽",
      players: ["ProGamer123", "SkillMaster99"],
      wagerAmount: 50,
      status: "active",
      startTime: "2024-01-20T10:30:00Z",
      duration: "15 min",
    },
    {
      id: "match-002",
      game: "FIFA",
      gameIcon: "🏆",
      players: ["ChampionPlayer", "NewbieGamer"],
      wagerAmount: 75,
      status: "verification",
      startTime: "2024-01-20T10:15:00Z",
      duration: "12 min",
    },
    {
      id: "match-003",
      game: "CODM",
      gameIcon: "🎯",
      players: ["SniperElite", "BattleRoyale"],
      wagerAmount: 100,
      status: "completed",
      startTime: "2024-01-20T09:45:00Z",
      duration: "8 min",
      winner: "SniperElite",
    },
    {
      id: "match-004",
      game: "eFootball",
      gameIcon: "⚽",
      players: ["FootballPro", "GoalMachine"],
      wagerAmount: 25,
      status: "disputed",
      startTime: "2024-01-20T09:30:00Z",
      duration: "15 min",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "verification":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Verification
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "disputed":
        return <Badge variant="destructive">Disputed</Badge>
      default:
        return null
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString()
  }

  const filteredMatches = matches.filter(
    (match) =>
      match.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.players.some((player) => player.toLowerCase().includes(searchQuery.toLowerCase())) ||
      match.game.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Match Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gamepad2 className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-muted-foreground">Active Matches</span>
            </div>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-muted-foreground">In Verification</span>
            </div>
            <div className="text-2xl font-bold">23</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">Completed Today</span>
            </div>
            <div className="text-2xl font-bold">89</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-muted-foreground">Disputed</span>
            </div>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>

      {/* Match Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Match Management
          </CardTitle>
          <CardDescription>Monitor and manage ongoing matches</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search matches by ID, player, or game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Matches Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Match ID</TableHead>
                  <TableHead>Game</TableHead>
                  <TableHead>Players</TableHead>
                  <TableHead>Wager</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell className="font-medium">{match.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{match.gameIcon}</span>
                        <span>{match.game}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {match.players.join(" vs ")}
                        {match.winner && (
                          <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                            <Trophy className="h-3 w-3" />
                            Winner: {match.winner}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(match.wagerAmount)}</TableCell>
                    <TableCell>{getStatusBadge(match.status)}</TableCell>
                    <TableCell>{formatTime(match.startTime)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {match.status === "disputed" && (
                          <Button size="sm" variant="outline">
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
