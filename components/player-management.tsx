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
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
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
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-muted-foreground">Total Players</span>
            </div>
            <div className="text-2xl font-bold">8,247</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">Active</span>
            </div>
            <div className="text-2xl font-bold">7,892</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Ban className="h-4 w-4 text-red-600" />
              <span className="text-sm text-muted-foreground">Suspended</span>
            </div>
            <div className="text-2xl font-bold">234</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <div className="text-2xl font-bold">121</div>
          </CardContent>
        </Card>
      </div>

      {/* Player Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Player Management
          </CardTitle>
          <CardDescription>View and manage player accounts</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search players by username or email..."
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

          {/* Players Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Matches</TableHead>
                  <TableHead>Win Rate</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{player.username}</div>
                        <div className="text-sm text-muted-foreground">{player.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(player.status)}</TableCell>
                    <TableCell>{player.totalMatches}</TableCell>
                    <TableCell>{player.winRate}%</TableCell>
                    <TableCell>{formatCurrency(player.walletBalance)}</TableCell>
                    <TableCell>{formatDate(player.lastActive)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Ban className="h-4 w-4" />
                        </Button>
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
