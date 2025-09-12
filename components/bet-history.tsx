"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, Target } from "lucide-react"

interface BetHistoryProps {
  leagueId: string
}

export function BetHistory({ leagueId }: BetHistoryProps) {
  // Mock bet history data
  const bets = [
    {
      id: "bet-001",
      type: "tournament_winner",
      selection: "ProGamer123",
      description: "Tournament Winner",
      stake: 25.0,
      odds: 2.5,
      potentialPayout: 62.5,
      status: "pending",
      placedAt: "2024-01-20T14:30:00Z",
      settledAt: null,
    },
    {
      id: "bet-002",
      type: "match_winner",
      selection: "SkillMaster99",
      description: "Quarter Final 1",
      stake: 15.0,
      odds: 1.8,
      potentialPayout: 27.0,
      status: "won",
      placedAt: "2024-01-19T16:45:00Z",
      settledAt: "2024-01-19T18:30:00Z",
    },
    {
      id: "bet-003",
      type: "match_winner",
      selection: "ChampionPlayer",
      description: "Round of 16 - Match 3",
      stake: 50.0,
      odds: 2.1,
      potentialPayout: 105.0,
      status: "lost",
      placedAt: "2024-01-18T12:15:00Z",
      settledAt: "2024-01-18T14:45:00Z",
    },
    {
      id: "bet-004",
      type: "special",
      selection: "Over 3.5 Goals",
      description: "Semi Final Total Goals",
      stake: 10.0,
      odds: 3.2,
      potentialPayout: 32.0,
      status: "pending",
      placedAt: "2024-01-20T10:20:00Z",
      settledAt: null,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "won":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Won
          </Badge>
        )
      case "lost":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Lost
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

  const calculateStats = () => {
    const totalBets = bets.length
    const settledBets = bets.filter((bet) => bet.status !== "pending")
    const wonBets = bets.filter((bet) => bet.status === "won")
    const totalStaked = bets.reduce((sum, bet) => sum + bet.stake, 0)
    const totalWon = wonBets.reduce((sum, bet) => sum + bet.potentialPayout, 0)
    const profit = totalWon - totalStaked

    return {
      totalBets,
      settledBets: settledBets.length,
      wonBets: wonBets.length,
      winRate: settledBets.length > 0 ? (wonBets.length / settledBets.length) * 100 : 0,
      totalStaked,
      totalWon,
      profit,
    }
  }

  const stats = calculateStats()

  return (
    <div className="space-y-6">
      {/* Betting Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="responsive-text text-muted-foreground">Total Bets</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">{stats.totalBets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="responsive-text text-muted-foreground">Win Rate</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">{stats.winRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="responsive-text text-muted-foreground">Total Staked</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">{formatCurrency(stats.totalStaked)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {stats.profit >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className="responsive-text text-muted-foreground">Profit/Loss</span>
            </div>
            <div className={`text-xl sm:text-2xl font-bold ${stats.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {stats.profit >= 0 ? "+" : ""}
              {formatCurrency(stats.profit)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bet History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 responsive-text-lg">
            <Target className="h-5 w-5" />
            Betting History
          </CardTitle>
          <CardDescription className="responsive-text">Your betting activity for this tournament</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Bets</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="settled">Settled</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Selection</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Stake</TableHead>
                      <TableHead>Odds</TableHead>
                      <TableHead>Potential Payout</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bets.map((bet) => (
                      <TableRow key={bet.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium responsive-text">{bet.selection}</div>
                            <div className="responsive-text text-muted-foreground">{bet.description}</div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{bet.type.replace("_", " ")}</TableCell>
                        <TableCell>{formatCurrency(bet.stake)}</TableCell>
                        <TableCell className="font-medium">{bet.odds.toFixed(2)}</TableCell>
                        <TableCell className="font-medium text-green-600">
                          {formatCurrency(bet.potentialPayout)}
                        </TableCell>
                        <TableCell>{getStatusBadge(bet.status)}</TableCell>
                        <TableCell className="text-sm">{formatDate(bet.placedAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Selection</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Stake</TableHead>
                      <TableHead>Odds</TableHead>
                      <TableHead>Potential Payout</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bets
                      .filter((bet) => bet.status === "pending")
                      .map((bet) => (
                        <TableRow key={bet.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{bet.selection}</div>
                              <div className="text-sm text-muted-foreground">{bet.description}</div>
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">{bet.type.replace("_", " ")}</TableCell>
                          <TableCell>{formatCurrency(bet.stake)}</TableCell>
                          <TableCell className="font-medium">{bet.odds.toFixed(2)}</TableCell>
                          <TableCell className="font-medium text-green-600">
                            {formatCurrency(bet.potentialPayout)}
                          </TableCell>
                          <TableCell className="responsive-text">{formatDate(bet.placedAt)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="settled" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Selection</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Stake</TableHead>
                      <TableHead>Odds</TableHead>
                      <TableHead>Payout</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Settled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bets
                      .filter((bet) => bet.status !== "pending")
                      .map((bet) => (
                        <TableRow key={bet.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{bet.selection}</div>
                              <div className="text-sm text-muted-foreground">{bet.description}</div>
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">{bet.type.replace("_", " ")}</TableCell>
                          <TableCell>{formatCurrency(bet.stake)}</TableCell>
                          <TableCell className="font-medium">{bet.odds.toFixed(2)}</TableCell>
                          <TableCell
                            className={`font-medium ${bet.status === "won" ? "text-green-600" : "text-red-600"}`}
                          >
                            {bet.status === "won" ? formatCurrency(bet.potentialPayout) : "$0.00"}
                          </TableCell>
                          <TableCell>{getStatusBadge(bet.status)}</TableCell>
                          <TableCell className="responsive-text">{bet.settledAt ? formatDate(bet.settledAt) : "-"}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
