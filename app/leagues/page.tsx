"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, ArrowLeft, Search, Filter, Calendar, Users, DollarSign, Clock, Star } from "lucide-react"
import Link from "next/link"
import { LeagueRegistrationModal } from "@/components/league-registration-modal"

export default function LeaguesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null)
  const [showRegistration, setShowRegistration] = useState(false)

  // Mock leagues data
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
      description:
        "The ultimate eFootball tournament featuring the best players from around the world. Compete for glory and a massive prize pool!",
      requirements: [],
      featured: true,
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
      description:
        "Professional FIFA tournament with group stages followed by knockout rounds. Show your skills and tactical prowess!",
      requirements: [],
      featured: true,
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
      description:
        "Call of Duty Mobile tournament featuring intense battle royale matches. Ammunition restrictions apply - Assault Rifles only!",
      requirements: ["Assault Rifle ammunition only", "Battle Royale mode"],
      featured: false,
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
      description:
        "Seasonal eFootball tournament with exciting matches and great prizes. Perfect for intermediate players!",
      requirements: [],
      featured: false,
    },
  ]

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
    return new Date(dateString).toLocaleDateString()
  }

  const handleRegister = (leagueId: string) => {
    setSelectedLeague(leagueId)
    setShowRegistration(true)
  }

  const filteredLeagues = leagues.filter(
    (league) =>
      league.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      league.gameType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const LeagueCard = ({ league }: { league: (typeof leagues)[0] }) => (
    <Card className="hover:shadow-lg transition-all duration-300 relative">
      {league.featured && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          {getStatusBadge(league.status)}
          <div className="text-3xl">{league.gameIcon}</div>
        </div>
        <CardTitle className="text-xl">{league.name}</CardTitle>
        <CardDescription className="line-clamp-2">{league.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tournament Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span>
              {league.participants}/{league.maxParticipants}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-600" />
            <span className="capitalize">{league.format}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span>{formatCurrency(league.entryFee)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-600" />
            <span>{formatDate(league.tournamentStart)}</span>
          </div>
        </div>

        {/* Prize Pool */}
        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(league.prizePool)}</div>
            <div className="text-sm text-green-700 dark:text-green-400">Total Prize Pool</div>
          </div>
        </div>

        {/* Special Requirements */}
        {league.requirements.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Requirements:</div>
            {league.requirements.map((req, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
          </div>
        )}

        {/* Registration Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Registration Progress</span>
            <span>
              {league.participants}/{league.maxParticipants}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(league.participants / league.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Registration Deadline */}
        {league.status === "registration_open" && (
          <div className="flex items-center gap-2 text-sm text-orange-600">
            <Clock className="h-4 w-4" />
            <span>Registration ends {formatDate(league.registrationEnd)}</span>
          </div>
        )}

        {/* Action Button */}
        {league.status === "registration_open" && (
          <Button className="w-full" onClick={() => handleRegister(league.id)}>
            Register Now - {formatCurrency(league.entryFee)}
          </Button>
        )}
        {league.status === "upcoming" && (
          <Button className="w-full bg-transparent" variant="outline" disabled>
            Registration Opens Soon
          </Button>
        )}
        {league.status === "in_progress" && (
          <Link href={`/leagues/${league.id}/bracket`}>
            <Button className="w-full bg-transparent" variant="outline">
              <Trophy className="h-4 w-4 mr-2" />
              View Tournament
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Tournament Leagues</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Join Competitive Tournaments</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compete in structured tournaments with group stages, knockout rounds, and massive prize pools. Register now
            and prove your gaming skills!
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tournaments by name or game..."
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

        {/* Tournament Tabs */}
        <Tabs defaultValue="open" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="open">Open Registration</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="active">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeagues
                .filter((league) => league.status === "registration_open")
                .map((league) => (
                  <LeagueCard key={league.id} league={league} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeagues
                .filter((league) => league.status === "upcoming")
                .map((league) => (
                  <LeagueCard key={league.id} league={league} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeagues
                .filter((league) => league.status === "in_progress")
                .map((league) => (
                  <LeagueCard key={league.id} league={league} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-8">
            <div className="text-center py-12 text-muted-foreground">
              <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No Completed Tournaments Yet</h3>
              <p>Completed tournaments will appear here once they finish.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Registration Modal */}
      <LeagueRegistrationModal
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        league={leagues.find((l) => l.id === selectedLeague) || null}
      />
    </div>
  )
}
