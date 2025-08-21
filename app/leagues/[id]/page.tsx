"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Trophy,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Target,
  Star,
  Eye,
  TrendingUp,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { LeagueRegistrationModal } from "@/components/league-registration-modal"

interface LeagueDetailPageProps {
  params: {
    id: string
  }
}

export default function LeagueDetailPage({ params }: LeagueDetailPageProps) {
  const [showRegistration, setShowRegistration] = useState(false)

  // Mock league data
  const leagueData = {
    id: params.id,
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
    tournamentEnd: "2024-01-29T18:00:00Z",
    format: "knockout",
    description:
      "The ultimate eFootball tournament featuring the best players from around the world. Compete for glory and a massive prize pool! This tournament follows a single-elimination knockout format where every match matters. Only the strongest will survive to claim the championship title.",
    requirements: [],
    rules: [
      "All matches must be played within the scheduled time window",
      "Screenshot verification required within 10 minutes of match completion",
      "No disconnections or rage quits - automatic forfeit",
      "Fair play and sportsmanship expected at all times",
      "Tournament organizers have final say on disputes",
    ],
    prizeDistribution: [
      { position: 1, amount: 2500, percentage: 50 },
      { position: 2, amount: 1500, percentage: 30 },
      { position: 3, amount: 750, percentage: 15 },
      { position: 4, amount: 250, percentage: 5 },
    ],
    featured: true,
    createdBy: "GameMatch Admin",
    createdAt: "2024-01-15T10:00:00Z",
  }

  // Mock recent participants
  const recentParticipants = [
    { id: "1", username: "ProGamer123", joinedAt: "2024-01-20T14:30:00Z", rating: 1850 },
    { id: "2", username: "SkillMaster99", joinedAt: "2024-01-20T13:15:00Z", rating: 1720 },
    { id: "3", username: "ChampionPlayer", joinedAt: "2024-01-20T12:45:00Z", rating: 1920 },
    { id: "4", username: "FootballPro", joinedAt: "2024-01-20T11:30:00Z", rating: 1680 },
    { id: "5", username: "GoalMachine", joinedAt: "2024-01-20T10:15:00Z", rating: 1750 },
  ]

  // Mock tournament stats
  const tournamentStats = {
    totalPrizePool: 5000,
    averageRating: 1784,
    topRatedPlayer: "ChampionPlayer",
    registrationProgress: (24 / 32) * 100,
    daysUntilStart: Math.ceil((new Date("2024-01-27T10:00:00Z").getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "registration_open":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Registration Open
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Upcoming
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
    return new Date(dateString).toLocaleString()
  }

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/leagues">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Leagues
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="text-2xl">{leagueData.gameIcon}</div>
              <h1 className="text-xl font-bold text-foreground">{leagueData.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {leagueData.featured && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {getStatusBadge(leagueData.status)}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{leagueData.name}</CardTitle>
                <CardDescription className="text-base">{leagueData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tournament Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">{leagueData.participants}</div>
                    <div className="text-sm text-muted-foreground">Participants</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                    <div className="text-lg font-bold capitalize">{leagueData.format}</div>
                    <div className="text-sm text-muted-foreground">Format</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">{formatCurrency(leagueData.entryFee)}</div>
                    <div className="text-sm text-muted-foreground">Entry Fee</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-lg font-bold">{tournamentStats.daysUntilStart}d</div>
                    <div className="text-sm text-muted-foreground">Until Start</div>
                  </div>
                </div>

                {/* Registration Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Registration Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {leagueData.participants}/{leagueData.maxParticipants} players
                    </span>
                  </div>
                  <Progress value={tournamentStats.registrationProgress} className="h-3" />
                  <div className="text-sm text-muted-foreground">
                    {leagueData.maxParticipants - leagueData.participants} spots remaining
                  </div>
                </div>

                {/* Important Dates */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="font-medium text-sm">Registration Ends</div>
                      <div className="text-sm text-muted-foreground">{formatDate(leagueData.registrationEnd)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">Tournament Starts</div>
                      <div className="text-sm text-muted-foreground">{formatDate(leagueData.tournamentStart)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Trophy className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-sm">Tournament Ends</div>
                      <div className="text-sm text-muted-foreground">{formatDate(leagueData.tournamentEnd)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{formatCurrency(leagueData.prizePool)}</div>
                  <div className="text-lg">Total Prize Pool</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leagueData.status === "registration_open" && (
                  <>
                    <Button className="w-full text-lg py-6" onClick={() => setShowRegistration(true)}>
                      Register Now - {formatCurrency(leagueData.entryFee)}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      Registration closes in{" "}
                      {Math.ceil((new Date(leagueData.registrationEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}{" "}
                      days
                    </div>
                  </>
                )}

                {leagueData.status === "in_progress" && (
                  <>
                    <Link href={`/leagues/${params.id}/bracket`}>
                      <Button className="w-full text-lg py-6">
                        <Eye className="h-5 w-5 mr-2" />
                        Watch Tournament
                      </Button>
                    </Link>
                    <Link href={`/leagues/${params.id}/betting`}>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Target className="h-5 w-5 mr-2" />
                        Place Bets
                      </Button>
                    </Link>
                  </>
                )}

                {leagueData.status === "upcoming" && (
                  <Button className="w-full text-lg py-6" disabled>
                    Registration Opens Soon
                  </Button>
                )}

                {/* Quick Stats */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Average Rating:</span>
                    <span className="font-medium">{tournamentStats.averageRating}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Top Player:</span>
                    <span className="font-medium">{tournamentStats.topRatedPlayer}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium">{formatDateShort(leagueData.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tournament Details Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="prizes">Prizes</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Tournament Format
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium capitalize">{leagueData.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Participants:</span>
                    <span className="font-medium">{leagueData.maxParticipants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Game Type:</span>
                    <span className="font-medium">{leagueData.gameType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">3 days</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Tournament Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Participants:</span>
                    <span className="font-medium">{leagueData.participants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Rating:</span>
                    <span className="font-medium">{tournamentStats.averageRating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prize Pool:</span>
                    <span className="font-medium text-green-600">{formatCurrency(leagueData.prizePool)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entry Fee:</span>
                    <span className="font-medium">{formatCurrency(leagueData.entryFee)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="participants" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Participants ({leagueData.participants})
                </CardTitle>
                <CardDescription>Players who have registered for this tournament</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentParticipants.map((participant, index) => (
                    <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{participant.username}</div>
                          <div className="text-sm text-muted-foreground">
                            Joined {formatDateShort(participant.joinedAt)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{participant.rating}</div>
                        <div className="text-sm text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  ))}
                  {leagueData.participants > 5 && (
                    <div className="text-center py-4 text-muted-foreground">
                      And {leagueData.participants - 5} more participants...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prizes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Prize Distribution
                </CardTitle>
                <CardDescription>
                  How the {formatCurrency(leagueData.prizePool)} prize pool is distributed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leagueData.prizeDistribution.map((prize) => (
                    <div key={prize.position} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            prize.position === 1
                              ? "bg-yellow-500"
                              : prize.position === 2
                                ? "bg-gray-400"
                                : prize.position === 3
                                  ? "bg-amber-600"
                                  : "bg-blue-600"
                          }`}
                        >
                          {prize.position}
                        </div>
                        <div>
                          <div className="font-medium">
                            {prize.position === 1
                              ? "1st Place"
                              : `${prize.position}${prize.position === 2 ? "nd" : prize.position === 3 ? "rd" : "th"} Place`}
                          </div>
                          <div className="text-sm text-muted-foreground">{prize.percentage}% of prize pool</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(prize.amount)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Tournament Rules
                </CardTitle>
                <CardDescription>Important rules and guidelines for all participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leagueData.rules.map((rule, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <div className="text-sm">{rule}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Fair Play Policy:</strong> All participants are expected to maintain the highest standards
                      of sportsmanship. Any form of cheating, harassment, or unsportsmanlike conduct will result in
                      immediate disqualification and potential account suspension.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Registration Modal */}
      <LeagueRegistrationModal
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        league={leagueData}
      />
    </div>
  )
}
