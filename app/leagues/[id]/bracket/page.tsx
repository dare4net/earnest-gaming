"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Trophy, Users, Calendar, Settings, RefreshCw, Target } from "lucide-react"
import Link from "next/link"
import { TournamentBracket } from "@/components/tournament-bracket"
import { GroupStageTable } from "@/components/group-stage-table"

interface LeagueBracketPageProps {
  params: {
    id: string
  }
}

export default function LeagueBracketPage({ params }: LeagueBracketPageProps) {
  const [activeView, setActiveView] = useState("bracket")

  // Mock league data
  const leagueData = {
    id: params.id,
    name: "Winter Championship - eFootball",
    gameType: "efootball" as const,
    format: "knockout" as const,
    status: "in_progress",
    participants: 32,
    currentRound: "Quarter Finals",
    prizePool: 5000,
    startDate: "2024-01-27T10:00:00Z",
  }

  // Mock participants
  const participants = [
    { id: "1", username: "ProGamer123", seed: 1, status: "active" as const },
    { id: "2", username: "SkillMaster99", seed: 2, status: "active" as const },
    { id: "3", username: "ChampionPlayer", seed: 3, status: "active" as const },
    { id: "4", username: "FootballPro", seed: 4, status: "active" as const },
    { id: "5", username: "GoalMachine", seed: 5, status: "eliminated" as const },
    { id: "6", username: "SoccerKing", seed: 6, status: "eliminated" as const },
    { id: "7", username: "FieldMaster", seed: 7, status: "eliminated" as const },
    { id: "8", username: "StrikerElite", seed: 8, status: "eliminated" as const },
  ]

  // Mock bracket matches
  const bracketMatches = [
    {
      id: "qf1",
      roundName: "Quarter Finals",
      roundNumber: 3,
      matchNumber: 1,
      participant1: participants[0],
      participant2: participants[4],
      winner: participants[0],
      status: "completed" as const,
      scheduledDate: "2024-01-27T14:00:00Z",
      score: "3-1",
    },
    {
      id: "qf2",
      roundName: "Quarter Finals",
      roundNumber: 3,
      matchNumber: 2,
      participant1: participants[1],
      participant2: participants[5],
      winner: participants[1],
      status: "completed" as const,
      scheduledDate: "2024-01-27T15:00:00Z",
      score: "2-0",
    },
    {
      id: "qf3",
      roundName: "Quarter Finals",
      roundNumber: 3,
      matchNumber: 3,
      participant1: participants[2],
      participant2: participants[6],
      status: "in_progress" as const,
      scheduledDate: "2024-01-27T16:00:00Z",
    },
    {
      id: "qf4",
      roundName: "Quarter Finals",
      roundNumber: 3,
      matchNumber: 4,
      participant1: participants[3],
      participant2: participants[7],
      status: "scheduled" as const,
      scheduledDate: "2024-01-27T17:00:00Z",
    },
    {
      id: "sf1",
      roundName: "Semi Finals",
      roundNumber: 4,
      matchNumber: 1,
      participant1: participants[0],
      participant2: participants[1],
      status: "pending" as const,
      scheduledDate: "2024-01-28T14:00:00Z",
    },
    {
      id: "sf2",
      roundName: "Semi Finals",
      roundNumber: 4,
      matchNumber: 2,
      status: "pending" as const,
      scheduledDate: "2024-01-28T15:00:00Z",
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

  // Mock group stage data (for group stage tournaments)
  const groupStageData = {
    A: [
      {
        id: "1",
        participantId: "1",
        username: "ProGamer123",
        groupName: "A",
        matchesPlayed: 3,
        wins: 3,
        losses: 0,
        draws: 0,
        goalsFor: 8,
        goalsAgainst: 2,
        goalDifference: 6,
        points: 9,
        position: 1,
        status: "qualified" as const,
      },
      {
        id: "2",
        participantId: "2",
        username: "SkillMaster99",
        groupName: "A",
        matchesPlayed: 3,
        wins: 2,
        losses: 1,
        draws: 0,
        goalsFor: 5,
        goalsAgainst: 4,
        goalDifference: 1,
        points: 6,
        position: 2,
        status: "qualified" as const,
      },
    ],
    B: [
      {
        id: "3",
        participantId: "3",
        username: "ChampionPlayer",
        groupName: "B",
        matchesPlayed: 3,
        wins: 2,
        losses: 0,
        draws: 1,
        goalsFor: 6,
        goalsAgainst: 3,
        goalDifference: 3,
        points: 7,
        position: 1,
        status: "qualified" as const,
      },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Badge variant="default">In Progress</Badge>
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>
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
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">{leagueData.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(leagueData.status)}
            <Link href={`/leagues/${params.id}/betting`}>
              <Button variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Place Bets
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* League Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">Participants</span>
              </div>
              <div className="text-2xl font-bold">{leagueData.participants}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-muted-foreground">Current Round</span>
              </div>
              <div className="text-lg font-bold">{leagueData.currentRound}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Started</span>
              </div>
              <div className="text-lg font-bold">{new Date(leagueData.startDate).toLocaleDateString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-muted-foreground">Format</span>
              </div>
              <div className="text-lg font-bold capitalize">{leagueData.format}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Views */}
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList>
            <TabsTrigger value="bracket">Tournament Bracket</TabsTrigger>
            {leagueData.format === "group_stage" && <TabsTrigger value="groups">Group Stage</TabsTrigger>}
            <TabsTrigger value="schedule">Match Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="bracket" className="mt-6">
            <TournamentBracket
              leagueId={leagueData.id}
              format={leagueData.format}
              participants={participants}
              matches={bracketMatches}
            />
          </TabsContent>

          {leagueData.format === "group_stage" && (
            <TabsContent value="groups" className="mt-6">
              <GroupStageTable leagueId={leagueData.id} groups={groupStageData} gameType={leagueData.gameType} />
            </TabsContent>
          )}

          <TabsContent value="schedule" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Match Schedule</CardTitle>
                <CardDescription>Upcoming and completed matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Match schedule view coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
