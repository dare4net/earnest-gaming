"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Users, Eye, Target, RefreshCw, Play } from "lucide-react"
import Link from "next/link"
import { TournamentBracket } from "@/components/tournament-bracket"

interface LiveTournamentPageProps {
  params: {
    id: string
  }
}

export default function LiveTournamentPage({ params }: LiveTournamentPageProps) {
  const [isLive, setIsLive] = useState(true)
  const [viewerCount, setViewerCount] = useState(1247)

  // Mock live tournament data
  const tournamentData = {
    id: params.id,
    name: "Winter Championship - eFootball",
    gameType: "eFootball",
    status: "in_progress",
    currentRound: "Semi Finals",
    participants: 32,
    prizePool: 5000,
    startDate: "2024-01-27T10:00:00Z",
  }

  // Mock live matches
  const liveMatches = [
    {
      id: "live1",
      roundName: "Semi Final 1",
      participant1: "ProGamer123",
      participant2: "SkillMaster99",
      score: "2-1",
      status: "live",
      timeElapsed: "78'",
      viewers: 456,
    },
    {
      id: "live2",
      roundName: "Semi Final 2",
      participant1: "ChampionPlayer",
      participant2: "FootballPro",
      score: "1-1",
      status: "live",
      timeElapsed: "65'",
      viewers: 389,
    },
  ]

  // Mock participants for bracket
  const participants = [
    { id: "1", username: "ProGamer123", seed: 1, status: "active" as const },
    { id: "2", username: "SkillMaster99", seed: 2, status: "active" as const },
    { id: "3", username: "ChampionPlayer", seed: 3, status: "active" as const },
    { id: "4", username: "FootballPro", seed: 4, status: "active" as const },
  ]

  // Mock bracket matches
  const bracketMatches = [
    {
      id: "sf1",
      roundName: "Semi Finals",
      roundNumber: 4,
      matchNumber: 1,
      participant1: participants[0],
      participant2: participants[1],
      status: "in_progress" as const,
      scheduledDate: "2024-01-28T14:00:00Z",
      score: "2-1",
    },
    {
      id: "sf2",
      roundName: "Semi Finals",
      roundNumber: 4,
      matchNumber: 2,
      participant1: participants[2],
      participant2: participants[3],
      status: "in_progress" as const,
      scheduledDate: "2024-01-28T15:00:00Z",
      score: "1-1",
    },
    {
      id: "final",
      roundName: "Final",
      roundNumber: 5,
      matchNumber: 1,
      status: "pending" as const,
      scheduledDate: "2024-01-29T15:00:00Z",
    },
  ]

  // Simulate live viewer count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 10) - 5)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const LiveMatchCard = ({ match }: { match: (typeof liveMatches)[0] }) => (
    <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{match.roundName}</CardTitle>
          <Badge variant="destructive" className="animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
            LIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="font-bold">{match.participant1}</div>
            <div className="text-2xl font-bold text-primary">{match.score.split("-")[0]}</div>
          </div>
          <div className="text-center px-4">
            <div className="text-sm text-muted-foreground">VS</div>
            <div className="font-bold text-lg">{match.timeElapsed}</div>
          </div>
          <div className="text-center flex-1">
            <div className="font-bold">{match.participant2}</div>
            <div className="text-2xl font-bold text-primary">{match.score.split("-")[1]}</div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {match.viewers} watching
          </div>
          <Button size="sm" variant="outline">
            <Play className="h-4 w-4 mr-2" />
            Watch
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/leagues/${params.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tournament
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">{tournamentData.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4" />
              <span className="font-medium">{viewerCount.toLocaleString()}</span>
              <span className="text-muted-foreground">watching</span>
            </div>
            <Badge variant="destructive" className="animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              LIVE
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Tournament Status */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Live Tournament</h2>
              <p className="text-muted-foreground">
                Current Round: <span className="font-medium">{tournamentData.currentRound}</span> • Prize Pool:{" "}
                <span className="font-medium text-green-600">{formatCurrency(tournamentData.prizePool)}</span>
              </p>
            </div>
            <Link href={`/leagues/${params.id}/betting`}>
              <Button variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Live Betting
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              Live Matches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveMatches.map((match) => (
                <LiveMatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}

        {/* Tournament Bracket */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Tournament Bracket</h3>
          <TournamentBracket
            leagueId={tournamentData.id}
            format="knockout"
            participants={participants}
            matches={bracketMatches}
          />
        </div>

        {/* Tournament Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">Total Viewers</span>
              </div>
              <div className="text-2xl font-bold">{viewerCount.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-muted-foreground">Participants</span>
              </div>
              <div className="text-2xl font-bold">{tournamentData.participants}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Play className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Live Matches</span>
              </div>
              <div className="text-2xl font-bold">{liveMatches.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-muted-foreground">Prize Pool</span>
              </div>
              <div className="text-lg font-bold text-green-600">{formatCurrency(tournamentData.prizePool)}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
