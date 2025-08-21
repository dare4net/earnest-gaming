"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Trophy, Medal, Star, Users, DollarSign } from "lucide-react"
import Link from "next/link"

interface TournamentResultsPageProps {
  params: {
    id: string
  }
}

export default function TournamentResultsPage({ params }: TournamentResultsPageProps) {
  // Mock tournament results data
  const tournamentData = {
    id: params.id,
    name: "Winter Championship - eFootball",
    gameType: "eFootball",
    gameIcon: "⚽",
    status: "completed",
    participants: 32,
    prizePool: 5000,
    startDate: "2024-01-27T10:00:00Z",
    endDate: "2024-01-29T18:30:00Z",
    format: "knockout",
    winner: "ProGamer123",
  }

  // Mock final standings
  const finalStandings = [
    {
      position: 1,
      username: "ProGamer123",
      rating: 1850,
      matchesPlayed: 5,
      matchesWon: 5,
      goalsFor: 12,
      goalsAgainst: 3,
      prizeWon: 2500,
    },
    {
      position: 2,
      username: "SkillMaster99",
      rating: 1720,
      matchesPlayed: 5,
      matchesWon: 4,
      goalsFor: 10,
      goalsAgainst: 6,
      prizeWon: 1500,
    },
    {
      position: 3,
      username: "ChampionPlayer",
      rating: 1920,
      matchesPlayed: 4,
      matchesWon: 3,
      goalsFor: 8,
      goalsAgainst: 4,
      prizeWon: 750,
    },
    {
      position: 4,
      username: "FootballPro",
      rating: 1680,
      matchesPlayed: 4,
      matchesWon: 3,
      goalsFor: 7,
      goalsAgainst: 5,
      prizeWon: 250,
    },
  ]

  // Mock tournament statistics
  const tournamentStats = {
    totalMatches: 31,
    totalGoals: 89,
    averageGoalsPerMatch: 2.87,
    topScorer: "ProGamer123",
    topScorerGoals: 12,
    longestMatch: "89 minutes",
    shortestMatch: "12 minutes",
    totalViewers: 15420,
    peakViewers: 3247,
  }

  // Mock notable matches
  const notableMatches = [
    {
      id: "final",
      round: "Final",
      participant1: "ProGamer123",
      participant2: "SkillMaster99",
      score: "3-1",
      date: "2024-01-29T15:00:00Z",
      viewers: 3247,
      highlight: "Championship Match",
    },
    {
      id: "sf1",
      round: "Semi Final",
      participant1: "ProGamer123",
      participant2: "ChampionPlayer",
      score: "2-1",
      date: "2024-01-28T14:00:00Z",
      viewers: 2156,
      highlight: "Comeback Victory",
    },
    {
      id: "qf2",
      round: "Quarter Final",
      participant1: "SkillMaster99",
      participant2: "EliteGamer",
      score: "4-3",
      date: "2024-01-27T16:00:00Z",
      viewers: 1834,
      highlight: "Highest Scoring Match",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
            {position}
          </div>
        )
    }
  }

  const getPositionBadge = (position: number) => {
    switch (position) {
      case 1:
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Champion
          </Badge>
        )
      case 2:
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Runner-up
          </Badge>
        )
      case 3:
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            3rd Place
          </Badge>
        )
      default:
        return <Badge variant="outline">{position}th Place</Badge>
    }
  }

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
              <div className="text-2xl">{tournamentData.gameIcon}</div>
              <h1 className="text-xl font-bold text-foreground">{tournamentData.name}</h1>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Tournament Complete
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Tournament Summary */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">Tournament Results</h2>
            <p className="text-lg text-muted-foreground">
              Completed on {formatDate(tournamentData.endDate)} • {tournamentData.participants} participants
            </p>
          </div>

          {/* Champion Spotlight */}
          <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-yellow-200">
            <CardContent className="p-8">
              <div className="text-center">
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                  🏆 {tournamentData.winner}
                </h3>
                <p className="text-lg text-yellow-700 dark:text-yellow-300 mb-4">Tournament Champion</p>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(finalStandings[0].prizeWon)} Prize Won
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">Total Viewers</span>
              </div>
              <div className="text-2xl font-bold">{tournamentStats.totalViewers.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-muted-foreground">Total Matches</span>
              </div>
              <div className="text-2xl font-bold">{tournamentStats.totalMatches}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Total Goals</span>
              </div>
              <div className="text-2xl font-bold">{tournamentStats.totalGoals}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-muted-foreground">Prize Pool</span>
              </div>
              <div className="text-lg font-bold text-green-600">{formatCurrency(tournamentData.prizePool)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Final Standings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Final Standings
            </CardTitle>
            <CardDescription>Top 4 finishers and their tournament performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-center">Matches</TableHead>
                    <TableHead className="text-center">Wins</TableHead>
                    <TableHead className="text-center">Goals</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                    <TableHead className="text-right">Prize Won</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {finalStandings.map((player) => (
                    <TableRow key={player.position} className={player.position <= 3 ? "bg-muted/50" : ""}>
                      <TableCell>
                        <div className="flex items-center gap-2">{getPositionIcon(player.position)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-medium">{player.username}</div>
                            {player.position <= 3 && getPositionBadge(player.position)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{player.matchesPlayed}</TableCell>
                      <TableCell className="text-center">{player.matchesWon}</TableCell>
                      <TableCell className="text-center">
                        {player.goalsFor}-{player.goalsAgainst}
                      </TableCell>
                      <TableCell className="text-center font-medium">{player.rating}</TableCell>
                      <TableCell className="text-right font-bold text-green-600">
                        {formatCurrency(player.prizeWon)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Notable Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Notable Matches
            </CardTitle>
            <CardDescription>Highlights from the tournament</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notableMatches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-medium text-sm">{match.round}</div>
                      <div className="text-xs text-muted-foreground">{formatDate(match.date)}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">
                        {match.participant1} vs {match.participant2}
                      </div>
                      <div className="text-2xl font-bold text-primary">{match.score}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      {match.highlight}
                    </Badge>
                    <div className="text-sm text-muted-foreground">{match.viewers} viewers</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
