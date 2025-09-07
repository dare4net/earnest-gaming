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
        return (
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Active
          </Badge>
        )
      case "verification":
        return (
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Verification
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Completed
          </Badge>
        )
      case "disputed":
        return (
          <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
            Disputed
          </Badge>
        )
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
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Gamepad2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Matches</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">In Verification</p>
              <p className="text-2xl font-bold text-white">23</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed Today</p>
              <p className="text-2xl font-bold text-white">89</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg shadow-red-500/20">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Disputed</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Match Management */}
      <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Gamepad2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Match Management</h2>
              <p className="text-sm text-gray-400">Monitor and manage ongoing matches</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search matches by ID, player, or game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0A0B0F] border-[#2A2D36] text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>
            <Button variant="outline" className="bg-[#0A0B0F] border-[#2A2D36] text-white hover:bg-[#2A2D36] hover:text-purple-400">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Matches Table */}
          <div className="rounded-xl border border-[#2A2D36] bg-[#0A0B0F] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#2A2D36] bg-[#1C1E24]">
                  <TableHead className="text-gray-400">Match ID</TableHead>
                  <TableHead className="text-gray-400">Game</TableHead>
                  <TableHead className="text-gray-400">Players</TableHead>
                  <TableHead className="text-gray-400">Wager</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Start Time</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatches.map((match) => (
                  <TableRow key={match.id} className="border-b border-[#2A2D36] bg-[#0A0B0F] hover:bg-[#1C1E24] transition-colors">
                    <TableCell className="font-medium text-gray-300">{match.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#1C1E24] flex items-center justify-center text-lg">
                          {match.gameIcon}
                        </div>
                        <span className="text-gray-300">{match.game}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-300">
                        {match.players.join(" vs ")}
                        {match.winner && (
                          <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                            <Trophy className="h-3 w-3" />
                            Winner: {match.winner}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-purple-400 font-medium">{formatCurrency(match.wagerAmount)}</TableCell>
                    <TableCell>{getStatusBadge(match.status)}</TableCell>
                    <TableCell className="text-gray-300">{formatTime(match.startTime)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-[#1C1E24] border-[#2A2D36] text-gray-300 hover:bg-[#2A2D36] hover:text-purple-400">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {match.status === "disputed" && (
                          <Button size="sm" variant="outline" className="bg-[#1C1E24] border-[#2A2D36] text-gray-300 hover:bg-[#2A2D36] hover:text-red-400">
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
        </div>
      </div>
    </div>
  )
}
