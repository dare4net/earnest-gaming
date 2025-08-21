"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Trophy, TrendingUp, DollarSign, Target, Users, Clock, Star } from "lucide-react"
import Link from "next/link"
import { LeagueBettingModal } from "@/components/league-betting-modal"
import { BetHistory } from "@/components/bet-history"

interface LeagueBettingPageProps {
  params: {
    id: string
  }
}

export default function LeagueBettingPage({ params }: LeagueBettingPageProps) {
  const [selectedBet, setSelectedBet] = useState<any>(null)
  const [showBettingModal, setShowBettingModal] = useState(false)

  // Mock league data
  const leagueData = {
    id: params.id,
    name: "Winter Championship - eFootball",
    gameType: "eFootball",
    status: "in_progress",
    currentRound: "Quarter Finals",
    prizePool: 5000,
  }

  // Mock betting options
  const tournamentWinnerBets = [
    {
      id: "tw1",
      type: "tournament_winner",
      participant: "ProGamer123",
      odds: 2.5,
      description: "Tournament Winner",
      status: "active",
    },
    {
      id: "tw2",
      type: "tournament_winner",
      participant: "SkillMaster99",
      odds: 3.2,
      description: "Tournament Winner",
      status: "active",
    },
    {
      id: "tw3",
      type: "tournament_winner",
      participant: "ChampionPlayer",
      odds: 4.1,
      description: "Tournament Winner",
      status: "active",
    },
    {
      id: "tw4",
      type: "tournament_winner",
      participant: "FootballPro",
      odds: 5.5,
      description: "Tournament Winner",
      status: "active",
    },
  ]

  const matchBets = [
    {
      id: "mb1",
      type: "match_winner",
      matchName: "Quarter Final 1",
      participant1: "ProGamer123",
      participant2: "ElitePlayer",
      odds1: 1.8,
      odds2: 2.1,
      status: "active",
      scheduledTime: "2024-01-27T16:00:00Z",
    },
    {
      id: "mb2",
      type: "match_winner",
      matchName: "Quarter Final 2",
      participant1: "SkillMaster99",
      participant2: "GameChamp",
      odds1: 1.6,
      odds2: 2.4,
      status: "active",
      scheduledTime: "2024-01-27T17:00:00Z",
    },
    {
      id: "mb3",
      type: "match_winner",
      matchName: "Semi Final 1",
      participant1: "TBD",
      participant2: "TBD",
      odds1: 2.0,
      odds2: 2.0,
      status: "upcoming",
      scheduledTime: "2024-01-28T14:00:00Z",
    },
  ]

  const specialBets = [
    {
      id: "sb1",
      type: "top_scorer",
      description: "Most Goals in Tournament",
      participant: "ProGamer123",
      odds: 3.5,
      status: "active",
    },
    {
      id: "sb2",
      type: "top_scorer",
      description: "Most Goals in Tournament",
      participant: "SkillMaster99",
      odds: 4.2,
      status: "active",
    },
    {
      id: "sb3",
      type: "special",
      description: "Tournament to go to Final",
      participant: "Yes",
      odds: 1.2,
      status: "active",
    },
  ]

  const handlePlaceBet = (bet: any) => {
    setSelectedBet(bet)
    setShowBettingModal(true)
  }

  const formatOdds = (odds: number) => {
    return odds.toFixed(2)
  }

  const calculatePayout = (stake: number, odds: number) => {
    return (stake * odds).toFixed(2)
  }

  const BetCard = ({ bet, onClick }: { bet: any; onClick: () => void }) => (
    <Card className="hover:shadow-md transition-all cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="font-medium text-sm">{bet.participant || bet.description}</div>
            {bet.participant1 && bet.participant2 && (
              <div className="text-xs text-muted-foreground mt-1">
                {bet.participant1} vs {bet.participant2}
              </div>
            )}
            {bet.scheduledTime && (
              <div className="text-xs text-muted-foreground mt-1">{new Date(bet.scheduledTime).toLocaleString()}</div>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">{formatOdds(bet.odds || bet.odds1)}</div>
            <div className="text-xs text-muted-foreground">odds</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const MatchBetCard = ({ bet, onClick }: { bet: any; onClick: (participant: string, odds: number) => void }) => (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{bet.matchName}</CardTitle>
        {bet.scheduledTime && (
          <CardDescription className="text-xs">
            <Clock className="h-3 w-3 inline mr-1" />
            {new Date(bet.scheduledTime).toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="h-auto p-3 flex flex-col gap-1 bg-transparent"
            onClick={() => onClick(bet.participant1, bet.odds1)}
            disabled={bet.status !== "active"}
          >
            <div className="font-medium text-xs">{bet.participant1}</div>
            <div className="text-lg font-bold text-green-600">{formatOdds(bet.odds1)}</div>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-3 flex flex-col gap-1 bg-transparent"
            onClick={() => onClick(bet.participant2, bet.odds2)}
            disabled={bet.status !== "active"}
          >
            <div className="font-medium text-xs">{bet.participant2}</div>
            <div className="text-lg font-bold text-green-600">{formatOdds(bet.odds2)}</div>
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
            <Link href={`/leagues/${params.id}/bracket`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tournament
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Tournament Betting</h1>
            </div>
          </div>
          <Badge variant="default">Live Betting</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Tournament Info */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">{leagueData.name}</h2>
          <p className="text-muted-foreground">
            Place bets on matches, tournament winners, and special outcomes. Current round: {leagueData.currentRound}
          </p>
        </div>

        {/* Betting Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Total Bets Placed</span>
              </div>
              <div className="text-2xl font-bold">$12,450</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">Active Bettors</span>
              </div>
              <div className="text-2xl font-bold">247</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-muted-foreground">Favorite to Win</span>
              </div>
              <div className="text-lg font-bold">ProGamer123</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-muted-foreground">Biggest Payout</span>
              </div>
              <div className="text-2xl font-bold">$2,850</div>
            </CardContent>
          </Card>
        </div>

        {/* Betting Tabs */}
        <Tabs defaultValue="tournament" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tournament">Tournament Winner</TabsTrigger>
            <TabsTrigger value="matches">Match Betting</TabsTrigger>
            <TabsTrigger value="special">Special Bets</TabsTrigger>
            <TabsTrigger value="history">My Bets</TabsTrigger>
          </TabsList>

          <TabsContent value="tournament" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Tournament Winner Odds
                </CardTitle>
                <CardDescription>Bet on who will win the entire tournament</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tournamentWinnerBets.map((bet) => (
                    <BetCard key={bet.id} bet={bet} onClick={() => handlePlaceBet(bet)} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Match Betting
                </CardTitle>
                <CardDescription>Bet on individual match outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchBets.map((bet) => (
                    <MatchBetCard
                      key={bet.id}
                      bet={bet}
                      onClick={(participant, odds) =>
                        handlePlaceBet({
                          ...bet,
                          participant,
                          odds,
                          type: "match_winner",
                        })
                      }
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="special" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Special Bets
                </CardTitle>
                <CardDescription>Unique betting opportunities and prop bets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {specialBets.map((bet) => (
                    <BetCard key={bet.id} bet={bet} onClick={() => handlePlaceBet(bet)} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <BetHistory leagueId={params.id} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Betting Modal */}
      <LeagueBettingModal
        isOpen={showBettingModal}
        onClose={() => setShowBettingModal(false)}
        bet={selectedBet}
        leagueName={leagueData.name}
      />
    </div>
  )
}
