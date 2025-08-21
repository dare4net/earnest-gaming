"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, ArrowLeft, Search, Clock, CheckCircle, AlertTriangle, Eye, Trophy } from "lucide-react"
import Link from "next/link"

export default function VerificationPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock verification data
  const pendingVerifications = [
    {
      id: "match-001",
      game: "eFootball",
      gameIcon: "⚽",
      players: ["ProGamer123", "SkillMaster99"],
      wagerAmount: 50,
      submittedAt: "2024-01-20T10:30:00Z",
      timeRemaining: 420, // 7 minutes remaining
      screenshots: 2,
      status: "pending",
    },
    {
      id: "match-002",
      game: "FIFA",
      gameIcon: "🏆",
      players: ["FifaKing", "ChampionPlayer"],
      wagerAmount: 75,
      submittedAt: "2024-01-20T09:15:00Z",
      timeRemaining: 180, // 3 minutes remaining
      screenshots: 2,
      status: "pending",
    },
  ]

  const completedVerifications = [
    {
      id: "match-003",
      game: "CODM",
      gameIcon: "🎯",
      players: ["SniperElite", "BattleRoyale"],
      wagerAmount: 100,
      winner: "SniperElite",
      completedAt: "2024-01-20T08:45:00Z",
      status: "verified",
    },
    {
      id: "match-004",
      game: "eFootball",
      gameIcon: "⚽",
      players: ["FootballPro", "GoalMachine"],
      wagerAmount: 25,
      winner: "disputed",
      completedAt: "2024-01-20T07:30:00Z",
      status: "disputed",
    },
  ]

  const formatTimeRemaining = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case "disputed":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Disputed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Match Verification</h1>
            </div>
          </div>
          <Badge variant="secondary">Admin Panel</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Search Matches</CardTitle>
            <CardDescription>Find matches by ID, player name, or game</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search matches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Verification Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending ({pendingVerifications.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="disputed">Disputed</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {pendingVerifications.map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-lg">
                          {match.gameIcon}
                        </div>
                        <div>
                          <div className="font-medium">Match #{match.id}</div>
                          <div className="text-sm text-muted-foreground">{match.game}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(match.status)}
                        <div className="text-sm text-muted-foreground mt-1">
                          Time left: {formatTimeRemaining(match.timeRemaining)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Players</Label>
                        <div className="text-sm font-medium">{match.players.join(" vs ")}</div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Wager Amount</Label>
                        <div className="text-sm font-medium">${match.wagerAmount}</div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Screenshots</Label>
                        <div className="text-sm font-medium">{match.screenshots}/2 submitted</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        Review Screenshots
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Trophy className="h-4 w-4 mr-2" />
                        Declare Winner
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Mark Disputed
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedVerifications
                .filter((match) => match.status === "verified")
                .map((match) => (
                  <Card key={match.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-lg">
                            {match.gameIcon}
                          </div>
                          <div>
                            <div className="font-medium">Match #{match.id}</div>
                            <div className="text-sm text-muted-foreground">{match.game}</div>
                          </div>
                        </div>
                        {getStatusBadge(match.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Players</Label>
                          <div className="text-sm font-medium">{match.players.join(" vs ")}</div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Winner</Label>
                          <div className="text-sm font-medium text-green-600">{match.winner}</div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Prize</Label>
                          <div className="text-sm font-medium">${match.wagerAmount}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="disputed" className="mt-6">
            <div className="space-y-4">
              {completedVerifications
                .filter((match) => match.status === "disputed")
                .map((match) => (
                  <Card key={match.id} className="border-red-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-lg">
                            {match.gameIcon}
                          </div>
                          <div>
                            <div className="font-medium">Match #{match.id}</div>
                            <div className="text-sm text-muted-foreground">{match.game}</div>
                          </div>
                        </div>
                        {getStatusBadge(match.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Players</Label>
                          <div className="text-sm font-medium">{match.players.join(" vs ")}</div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Wager Amount</Label>
                          <div className="text-sm font-medium">${match.wagerAmount}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          Review Evidence
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve Dispute
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
