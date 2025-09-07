"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trophy,
  Plus,
  Search,
  Eye,
  Edit,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  Filter,
  Settings,
} from "lucide-react"

export function LeagueManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateLeague, setShowCreateLeague] = useState(false)
  const [newLeague, setNewLeague] = useState({
    name: "",
    description: "",
    gameType: "",
    tournamentFormat: "knockout",
    maxParticipants: 32,
    entryFee: 25,
    prizePool: 1000,
    registrationStart: "",
    registrationEnd: "",
    tournamentStart: "",
    tournamentEnd: "",
  })

  // Mock league data
  const leagues = [
    {
      id: "league-001",
      name: "Winter Championship - eFootball",
      gameType: "eFootball",
      gameIcon: "⚽",
      status: "registration_open",
      participants: 24,
      maxParticipants: 32,
      entryFee: 25.0,
      prizePool: 5000.0,
      registrationEnd: "2024-01-25T23:59:59Z",
      tournamentStart: "2024-01-27T10:00:00Z",
      format: "knockout",
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "league-002",
      name: "FIFA Masters League",
      gameType: "FIFA",
      gameIcon: "🏆",
      status: "upcoming",
      participants: 0,
      maxParticipants: 16,
      entryFee: 50.0,
      prizePool: 8000.0,
      registrationEnd: "2024-01-30T23:59:59Z",
      tournamentStart: "2024-02-02T10:00:00Z",
      format: "group_stage",
      createdAt: "2024-01-18T14:30:00Z",
    },
    {
      id: "league-003",
      name: "CODM Battle Royale Championship",
      gameType: "CODM",
      gameIcon: "🎯",
      status: "registration_open",
      participants: 45,
      maxParticipants: 64,
      entryFee: 15.0,
      prizePool: 7500.0,
      registrationEnd: "2024-01-26T23:59:59Z",
      tournamentStart: "2024-01-28T15:00:00Z",
      format: "knockout",
      createdAt: "2024-01-19T09:15:00Z",
    },
    {
      id: "league-004",
      name: "Spring Cup - eFootball",
      gameType: "eFootball",
      gameIcon: "⚽",
      status: "in_progress",
      participants: 8,
      maxParticipants: 8,
      entryFee: 10.0,
      prizePool: 500.0,
      registrationEnd: "2024-01-17T23:59:59Z",
      tournamentStart: "2024-01-19T10:00:00Z",
      format: "round_robin",
      createdAt: "2024-01-10T11:00:00Z",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Upcoming
          </Badge>
        )
      case "registration_open":
        return (
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Registration Open
          </Badge>
        )
      case "registration_closed":
        return (
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Registration Closed
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-gray-500/20 text-gray-400 border-gray-500/30">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
            Cancelled
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

  const handleCreateLeague = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement league creation logic
    console.log("Creating league:", newLeague)
    setShowCreateLeague(false)
    // Reset form
    setNewLeague({
      name: "",
      description: "",
      gameType: "",
      tournamentFormat: "knockout",
      maxParticipants: 32,
      entryFee: 25,
      prizePool: 1000,
      registrationStart: "",
      registrationEnd: "",
      tournamentStart: "",
      tournamentEnd: "",
    })
  }

  const filteredLeagues = leagues.filter(
    (league) =>
      league.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      league.gameType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
        {/* League Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Leagues</p>
                <p className="text-2xl font-bold text-white">24</p>
                <p className="text-xs text-emerald-500">+3 this month</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Participants</p>
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-xs text-blue-400">Across all leagues</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Prize Pools</p>
                <p className="text-2xl font-bold text-white">$89,500</p>
                <p className="text-xs text-emerald-400">Active leagues</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-white">156</p>
                <p className="text-xs text-purple-400">All time</p>
              </div>
            </div>
          </div>
        </div>

        {/* League Management Tabs */}
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-6">
          <Tabs defaultValue="active" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-[#0A0B0F] border border-[#2A2D36] p-1">
                <TabsTrigger 
                  value="active"
                  className="data-[state=active]:bg-[#2A2D36] data-[state=active]:text-white text-gray-400 hover:text-gray-300"
                >
                  Active Leagues
                </TabsTrigger>
                <TabsTrigger 
                  value="upcoming"
                  className="data-[state=active]:bg-[#2A2D36] data-[state=active]:text-white text-gray-400 hover:text-gray-300"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger 
                  value="completed"
                  className="data-[state=active]:bg-[#2A2D36] data-[state=active]:text-white text-gray-400 hover:text-gray-300"
                >
                  Completed
                </TabsTrigger>
              </TabsList>

              <Dialog open={showCreateLeague} onOpenChange={setShowCreateLeague}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-br from-purple-500 to-blue-600 text-white border-0 hover:from-purple-600 hover:to-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create League
                  </Button>
                </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-[#1C1E24] border border-[#2A2D36] text-white">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold">Create New League</DialogTitle>
                    <DialogDescription className="text-gray-400">Set up a new tournament league for players to compete in</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <form onSubmit={handleCreateLeague} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">League Name</Label>
                    <Input
                      id="name"
                      value={newLeague.name}
                      onChange={(e) => setNewLeague({ ...newLeague, name: e.target.value })}
                      placeholder="Winter Championship 2024"
                      className="bg-[#0A0B0F] border-[#2A2D36] text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gameType" className="text-gray-300">Game Type</Label>
                    <Select
                      value={newLeague.gameType}
                      onValueChange={(value) => setNewLeague({ ...newLeague, gameType: value })}
                    >
                      <SelectTrigger className="bg-[#0A0B0F] border-[#2A2D36] text-white">
                        <SelectValue placeholder="Select a game" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1C1E24] border-[#2A2D36] text-white">
                        <SelectItem value="FIFA">FIFA</SelectItem>
                        <SelectItem value="eFootball">eFootball</SelectItem>
                        <SelectItem value="CODM">CODM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="entryFee" className="text-gray-300">Entry Fee</Label>
                    <Input
                      id="entryFee"
                      type="number"
                      value={newLeague.entryFee}
                      onChange={(e) => setNewLeague({ ...newLeague, entryFee: Number(e.target.value) })}
                      className="bg-[#0A0B0F] border-[#2A2D36] text-white"
                      placeholder="25"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prizePool" className="text-gray-300">Prize Pool</Label>
                    <Input
                      id="prizePool"
                      type="number"
                      value={newLeague.prizePool}
                      onChange={(e) => setNewLeague({ ...newLeague, prizePool: Number(e.target.value) })}
                      className="bg-[#0A0B0F] border-[#2A2D36] text-white"
                      placeholder="1000"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants" className="text-gray-300">Max Participants</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={newLeague.maxParticipants}
                      onChange={(e) => setNewLeague({ ...newLeague, maxParticipants: Number(e.target.value) })}
                      className="bg-[#0A0B0F] border-[#2A2D36] text-white"
                      placeholder="32"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="format" className="text-gray-300">Tournament Format</Label>
                    <Select
                      value={newLeague.tournamentFormat}
                      onValueChange={(value) => setNewLeague({ ...newLeague, tournamentFormat: value })}
                    >
                      <SelectTrigger className="bg-[#0A0B0F] border-[#2A2D36] text-white">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1C1E24] border-[#2A2D36] text-white">
                        <SelectItem value="knockout">Single Elimination</SelectItem>
                        <SelectItem value="double_elimination">Double Elimination</SelectItem>
                        <SelectItem value="round_robin">Round Robin</SelectItem>
                        <SelectItem value="group_stage">Group Stage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateLeague(false)}
                    className="bg-[#0A0B0F] border-[#2A2D36] text-white hover:bg-[#2A2D36]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-br from-purple-500 to-blue-600 text-white border-0 hover:from-purple-600 hover:to-blue-700"
                  >
                    Create League
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="active" className="mt-6">
          <div className="rounded-xl border border-[#2A2D36] bg-[#0A0B0F] overflow-hidden p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Active Leagues</h3>
                <p className="text-sm text-gray-400">Currently running and open for registration leagues</p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leagues by name or game type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#1C1E24] border-[#2A2D36] text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>
              <Button variant="outline" className="bg-[#1C1E24] border-[#2A2D36] text-gray-300 hover:bg-[#2A2D36] hover:text-purple-400">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              </div>

              {/* Leagues Table */}
              <div className="rounded-xl border border-[#2A2D36] bg-[#0A0B0F] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-[#2A2D36] bg-[#1C1E24]">
                      <TableHead className="text-gray-400">League</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Participants</TableHead>
                      <TableHead className="text-gray-400">Entry Fee</TableHead>
                      <TableHead className="text-gray-400">Prize Pool</TableHead>
                      <TableHead className="text-gray-400">Registration Ends</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeagues
                      .filter((l) => l.status === "registration_open" || l.status === "in_progress")
                      .map((league) => (
                        <TableRow key={league.id} className="border-b border-[#2A2D36] hover:bg-[#1C1E24] transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm">
                                {league.gameIcon}
                              </div>
                              <div>
                                <div className="font-medium text-white">{league.name}</div>
                                <div className="text-sm text-gray-400">
                                  {league.gameType} • {league.format}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(league.status)}</TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-300">
                              {league.participants}/{league.maxParticipants}
                              <div className="w-full bg-[#2A2D36] rounded-full h-1.5 mt-1">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full"
                                  style={{ width: `${(league.participants / league.maxParticipants) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-purple-400 font-medium">{formatCurrency(league.entryFee)}</TableCell>
                          <TableCell className="font-medium text-emerald-400">
                            {formatCurrency(league.prizePool)}
                          </TableCell>
                          <TableCell className="text-gray-300">{formatDate(league.registrationEnd)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-[#1C1E24] border-[#2A2D36] text-gray-300 hover:bg-[#2A2D36] hover:text-purple-400"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-[#1C1E24] border-[#2A2D36] text-gray-300 hover:bg-[#2A2D36] hover:text-purple-400"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-[#1C1E24] border-[#2A2D36] text-gray-300 hover:bg-[#2A2D36] hover:text-purple-400"
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <div className="rounded-xl border border-[#2A2D36] bg-[#0A0B0F] overflow-hidden p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Upcoming Leagues</h3>
                  <p className="text-sm text-gray-400">Leagues scheduled to start soon</p>
                </div>
              </div>
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-30" />
                <p className="text-gray-400">No upcoming leagues scheduled</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="rounded-xl border border-[#2A2D36] bg-[#0A0B0F] overflow-hidden p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Completed Leagues</h3>
                  <p className="text-sm text-gray-400">Past tournaments and their results</p>
                </div>
              </div>
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-30" />
                <p className="text-gray-400">Completed leagues will appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
