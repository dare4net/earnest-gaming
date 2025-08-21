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
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Upcoming
          </Badge>
        )
      case "registration_open":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Registration Open
          </Badge>
        )
      case "registration_closed":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Registration Closed
          </Badge>
        )
      case "in_progress":
        return <Badge variant="default">In Progress</Badge>
      case "completed":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Completed
          </Badge>
        )
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
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
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-muted-foreground">Total Leagues</span>
            </div>
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-green-600">+3 this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-muted-foreground">Active Participants</span>
            </div>
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-xs text-blue-600">Across all leagues</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">Total Prize Pools</span>
            </div>
            <div className="text-2xl font-bold">$89,500</div>
            <div className="text-xs text-green-600">Active leagues</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
            <div className="text-2xl font-bold">156</div>
            <div className="text-xs text-purple-600">All time</div>
          </CardContent>
        </Card>
      </div>

      {/* League Management Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="active">Active Leagues</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <Dialog open={showCreateLeague} onOpenChange={setShowCreateLeague}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create League
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New League</DialogTitle>
                <DialogDescription>Set up a new tournament league for players to compete in</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateLeague} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">League Name</Label>
                    <Input
                      id="name"
                      value={newLeague.name}
                      onChange={(e) => setNewLeague({ ...newLeague, name: e.target.value })}
                      placeholder="Winter Championship 2024"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gameType">Game Type</Label>
                    <Select
                      value={newLeague.gameType}
                      onValueChange={(value) => setNewLeague({ ...newLeague, gameType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select game" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="efootball">eFootball</SelectItem>
                        <SelectItem value="fifa">FIFA</SelectItem>
                        <SelectItem value="codm">CODM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newLeague.description}
                    onChange={(e) => setNewLeague({ ...newLeague, description: e.target.value })}
                    placeholder="Describe the league, rules, and what makes it special..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="format">Tournament Format</Label>
                    <Select
                      value={newLeague.tournamentFormat}
                      onValueChange={(value) => setNewLeague({ ...newLeague, tournamentFormat: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="knockout">Knockout</SelectItem>
                        <SelectItem value="group_stage">Group Stage</SelectItem>
                        <SelectItem value="round_robin">Round Robin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={newLeague.maxParticipants}
                      onChange={(e) => setNewLeague({ ...newLeague, maxParticipants: Number.parseInt(e.target.value) })}
                      min="4"
                      max="128"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entryFee">Entry Fee ($)</Label>
                    <Input
                      id="entryFee"
                      type="number"
                      value={newLeague.entryFee}
                      onChange={(e) => setNewLeague({ ...newLeague, entryFee: Number.parseFloat(e.target.value) })}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prizePool">Prize Pool ($)</Label>
                    <Input
                      id="prizePool"
                      type="number"
                      value={newLeague.prizePool}
                      onChange={(e) => setNewLeague({ ...newLeague, prizePool: Number.parseFloat(e.target.value) })}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationStart">Registration Start</Label>
                    <Input
                      id="registrationStart"
                      type="datetime-local"
                      value={newLeague.registrationStart}
                      onChange={(e) => setNewLeague({ ...newLeague, registrationStart: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="registrationEnd">Registration End</Label>
                    <Input
                      id="registrationEnd"
                      type="datetime-local"
                      value={newLeague.registrationEnd}
                      onChange={(e) => setNewLeague({ ...newLeague, registrationEnd: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tournamentStart">Tournament Start</Label>
                    <Input
                      id="tournamentStart"
                      type="datetime-local"
                      value={newLeague.tournamentStart}
                      onChange={(e) => setNewLeague({ ...newLeague, tournamentStart: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowCreateLeague(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Create League
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Active Leagues
              </CardTitle>
              <CardDescription>Currently running and open for registration leagues</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leagues by name or game type..."
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

              {/* Leagues Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>League</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Entry Fee</TableHead>
                      <TableHead>Prize Pool</TableHead>
                      <TableHead>Registration Ends</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeagues
                      .filter((l) => l.status === "registration_open" || l.status === "in_progress")
                      .map((league) => (
                        <TableRow key={league.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-sm">
                                {league.gameIcon}
                              </div>
                              <div>
                                <div className="font-medium">{league.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {league.gameType} • {league.format}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(league.status)}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {league.participants}/{league.maxParticipants}
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                <div
                                  className="bg-blue-600 h-1.5 rounded-full"
                                  style={{ width: `${(league.participants / league.maxParticipants) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(league.entryFee)}</TableCell>
                          <TableCell className="font-medium text-green-600">
                            {formatCurrency(league.prizePool)}
                          </TableCell>
                          <TableCell>{formatDate(league.registrationEnd)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Settings className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Leagues</CardTitle>
              <CardDescription>Leagues scheduled to start soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming leagues scheduled</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Leagues</CardTitle>
              <CardDescription>Past tournaments and their results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Completed leagues will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
