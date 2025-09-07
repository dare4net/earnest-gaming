"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Ban, CheckCircle, AlertTriangle, Users, Filter } from "lucide-react"

export function PlayerManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock player data
  const players = [
    {
      id: "1",
      username: "ProGamer123",
      email: "progamer@email.com",
      joinDate: "2024-01-15",
      status: "active",
      totalMatches: 45,
      winRate: 68.9,
      walletBalance: 234.5,
      lastActive: "2024-01-20T10:30:00Z",
    },
    {
      id: "2",
      username: "SkillMaster99",
      email: "skillmaster@email.com",
      joinDate: "2024-01-10",
      status: "suspended",
      totalMatches: 23,
      winRate: 43.5,
      walletBalance: 89.25,
      lastActive: "2024-01-19T15:20:00Z",
    },
    {
      id: "3",
      username: "ChampionPlayer",
      email: "champion@email.com",
      joinDate: "2024-01-08",
      status: "active",
      totalMatches: 78,
      winRate: 72.4,
      walletBalance: 567.8,
      lastActive: "2024-01-20T11:45:00Z",
    },
    {
      id: "4",
      username: "NewbieGamer",
      email: "newbie@email.com",
      joinDate: "2024-01-19",
      status: "pending",
      totalMatches: 2,
      winRate: 50.0,
      walletBalance: 25.0,
      lastActive: "2024-01-20T09:15:00Z",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Active
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
            Suspended
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Pending
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const filteredPlayers = players.filter(
    (player) =>
      player.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Player Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Players</p>
              <p className="text-2xl font-bold text-white">8,247</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-2xl font-bold text-white">7,892</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg shadow-red-500/20">
              <Ban className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Suspended</p>
              <p className="text-2xl font-bold text-white">234</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-white">121</p>
            </div>
          </div>
        </div>
      </div>

      {/* Player Management */}
      <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Player Management</h2>
              <p className="text-sm text-gray-400">View and manage player accounts</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search players by username or email..."
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

          {/* Players Table */}
          <div className="rounded-xl border border-[#2A2D36] bg-[#0A0B0F] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#2A2D36] bg-[#1C1E24]">
                  <TableHead className="text-gray-400">Player</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Matches</TableHead>
                  <TableHead className="text-gray-400">Win Rate</TableHead>
                  <TableHead className="text-gray-400">Balance</TableHead>
                  <TableHead className="text-gray-400">Last Active</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player) => (
                  <TableRow key={player.id} className="border-b border-[#2A2D36] bg-[#0A0B0F] hover:bg-[#1C1E24] transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-medium text-white">{player.username}</div>
                        <div className="text-sm text-gray-400">{player.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(player.status)}</TableCell>
                    <TableCell className="text-gray-300">{player.totalMatches}</TableCell>
                    <TableCell>
                      <span className={player.winRate > 50 ? "text-emerald-400" : "text-gray-300"}>
                        {player.winRate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-300">{formatCurrency(player.walletBalance)}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(player.lastActive)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-[#1C1E24] border-[#2A2D36] text-gray-300 hover:bg-[#2A2D36] hover:text-purple-400">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="bg-[#1C1E24] border-[#2A2D36] text-gray-300 hover:bg-[#2A2D36] hover:text-red-400">
                          <Ban className="h-4 w-4" />
                        </Button>
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
