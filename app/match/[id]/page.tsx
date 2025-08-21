"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Gamepad2, ArrowLeft, Clock, CheckCircle, AlertTriangle, Trophy, DollarSign } from "lucide-react"
import Link from "next/link"
import { ScreenshotUpload } from "@/components/screenshot-upload"
import { MatchTimer } from "@/components/match-timer"
import { MatchChat } from "@/components/match-chat"

interface MatchPageProps {
  params: {
    id: string
  }
}

export default function MatchPage({ params }: MatchPageProps) {
  const [matchStatus, setMatchStatus] = useState<"waiting" | "active" | "verification" | "completed">("active")
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes in seconds
  const [playerScreenshot, setPlayerScreenshot] = useState<File | null>(null)
  const [opponentScreenshot, setOpponentScreenshot] = useState<File | null>(null)
  const [matchResult, setMatchResult] = useState<"pending" | "won" | "lost" | "disputed">("pending")
  const [isLeagueMatch, setIsLeagueMatch] = useState(false)
  const [leagueData, setLeagueData] = useState<any>(null)

  const matchData = {
    id: params.id,
    game: "eFootball",
    gameIcon: "⚽",
    wagerAmount: 50,
    leagueId: params.id.startsWith("league-") ? "league-001" : null,
    tournamentRound: params.id.startsWith("league-") ? "Group Stage" : null,
    opponent: {
      username: "ProGamer123",
      avatar: "/diverse-gaming-avatars.png",
      rating: 1850,
    },
    player: {
      username: "You",
      rating: 1720,
    },
    startTime: new Date(Date.now() - 300000), // Started 5 minutes ago
  }

  useEffect(() => {
    if (matchData.leagueId) {
      setIsLeagueMatch(true)
      setLeagueData({
        name: "Winter Championship 2024",
        round: "Group Stage - Match 2",
        group: "Group A",
        nextRound: "Quarter Finals",
        prizePool: 5000,
      })
    }
  }, [matchData.leagueId])

  const handleMatchComplete = () => {
    setMatchStatus("verification")
    setTimeRemaining(600) // Reset to 10 minutes for verification

    if (isLeagueMatch) {
      console.log("[v0] League match completed, updating tournament bracket")
    }
  }

  const handleScreenshotUpload = (file: File) => {
    setPlayerScreenshot(file)
    if (isLeagueMatch) {
      console.log("[v0] League match screenshot uploaded")
    }
    // TODO: Upload to server
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressPercentage = () => {
    return ((600 - timeRemaining) / 600) * 100
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={isLeagueMatch ? `/leagues/${matchData.leagueId}` : "/games"}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {isLeagueMatch ? "Back to Tournament" : "Back to Games"}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-sm">
                {matchData.gameIcon}
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {isLeagueMatch ? `${leagueData?.name} - ${leagueData?.round}` : `Match #${matchData.id}`}
                </h1>
                {isLeagueMatch && <p className="text-sm text-muted-foreground">{leagueData?.group}</p>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isLeagueMatch && (
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20"
              >
                <Trophy className="h-3 w-3 mr-1" />
                Tournament
              </Badge>
            )}
            <Badge
              variant={matchStatus === "active" ? "default" : matchStatus === "verification" ? "secondary" : "outline"}
            >
              {matchStatus === "active" && "In Progress"}
              {matchStatus === "verification" && "Verification"}
              {matchStatus === "completed" && "Completed"}
              {matchStatus === "waiting" && "Waiting"}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {isLeagueMatch && (
              <Card className="bg-gradient-to-r from-yellow-500/5 to-orange-500/5 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Tournament Match
                  </CardTitle>
                  <CardDescription>
                    This match is part of {leagueData?.name} - results will update the tournament bracket
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Current Round</div>
                      <div>{leagueData?.round}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Prize Pool</div>
                      <div className="flex items-center gap-1 text-green-600 font-medium">
                        <DollarSign className="h-3 w-3" />${leagueData?.prizePool}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {matchStatus === "active" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5" />
                    Match in Progress
                  </CardTitle>
                  <CardDescription>
                    {isLeagueMatch
                      ? `Play your ${matchData.game} tournament match and return here when finished`
                      : `Play your ${matchData.game} match and return here when finished`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="font-medium">{matchData.player.username}</div>
                        <div className="text-sm text-muted-foreground">Rating: {matchData.player.rating}</div>
                      </div>
                      <div className="text-2xl font-bold text-muted-foreground">VS</div>
                      <div className="text-center">
                        <div className="font-medium">{matchData.opponent.username}</div>
                        <div className="text-sm text-muted-foreground">Rating: {matchData.opponent.rating}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-600 font-medium">
                        <DollarSign className="h-4 w-4" />${isLeagueMatch ? "Tournament Prize" : matchData.wagerAmount}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {isLeagueMatch ? "Advancement at Stake" : "Prize Pool"}
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {isLeagueMatch
                        ? 'Once you finish your tournament match, click "Match Completed" to start verification. Results will update the tournament bracket.'
                        : 'Once you finish your match, click "Match Completed" to start the 10-minute verification window.'}
                    </AlertDescription>
                  </Alert>

                  <Button onClick={handleMatchComplete} className="w-full" size="lg">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Match Completed - Start Verification
                  </Button>
                </CardContent>
              </Card>
            )}

            {matchStatus === "verification" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Verification Window
                    </CardTitle>
                    <CardDescription>
                      Both players must upload match result screenshots within the time limit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MatchTimer timeRemaining={timeRemaining} />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Your Screenshot</CardTitle>
                      <CardDescription>Upload your match result screenshot</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScreenshotUpload
                        onUpload={handleScreenshotUpload}
                        uploaded={!!playerScreenshot}
                        playerName="You"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Opponent Screenshot</CardTitle>
                      <CardDescription>{matchData.opponent.username}'s submission</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        {opponentScreenshot ? (
                          <div className="space-y-2">
                            <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                            <div className="font-medium text-green-600">Screenshot Submitted</div>
                            <div className="text-sm text-muted-foreground">Waiting for verification</div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Clock className="h-12 w-12 text-yellow-600 mx-auto" />
                            <div className="font-medium text-yellow-600">Waiting for Upload</div>
                            <div className="text-sm text-muted-foreground">Opponent hasn't submitted yet</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Verification Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div>Take a clear screenshot of the final match result screen showing the score</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div>Ensure both player names and the final score are clearly visible</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div>Upload the screenshot before the timer expires</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          4
                        </div>
                        <div>Our system will verify the results and credit the winner automatically</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {matchStatus === "completed" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Match Results
                  </CardTitle>
                  <CardDescription>
                    {isLeagueMatch ? "Tournament match verification complete" : "Verification window has ended"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {matchResult === "won" && (
                    <div className="text-center py-8">
                      <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {isLeagueMatch ? "Tournament Match Won!" : "Congratulations! You Won!"}
                      </div>
                      <div className="text-lg text-muted-foreground mb-4">
                        {isLeagueMatch
                          ? `You've advanced in ${leagueData?.name}! Check the tournament bracket for your next match.`
                          : `$${matchData.wagerAmount} has been credited to your wallet`}
                      </div>
                      <div className="flex gap-2 justify-center">
                        {isLeagueMatch ? (
                          <Link href={`/leagues/${matchData.leagueId}/bracket`}>
                            <Button>View Tournament Bracket</Button>
                          </Link>
                        ) : (
                          <Link href="/wallet">
                            <Button>View Wallet</Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}

                  {matchResult === "lost" && (
                    <div className="text-center py-8">
                      <div className="text-2xl font-bold text-red-600 mb-2">
                        {isLeagueMatch ? "Tournament Match Lost" : "Match Lost"}
                      </div>
                      <div className="text-lg text-muted-foreground mb-4">
                        {isLeagueMatch
                          ? "You've been eliminated from this tournament. Better luck in the next one!"
                          : "Better luck next time!"}
                      </div>
                      <Link href={isLeagueMatch ? "/leagues" : "/games"}>
                        <Button>{isLeagueMatch ? "View Other Tournaments" : "Find Another Match"}</Button>
                      </Link>
                    </div>
                  )}

                  {matchResult === "disputed" && (
                    <div className="text-center py-8">
                      <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                      <div className="text-2xl font-bold text-yellow-600 mb-2">Match Under Review</div>
                      <div className="text-lg text-muted-foreground mb-4">
                        Screenshots are being reviewed by our admin team
                      </div>
                      <div className="text-sm text-muted-foreground">
                        You'll be notified once the review is complete
                      </div>
                    </div>
                  )}

                  {matchResult === "pending" && (
                    <div className="text-center py-8">
                      <Clock className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                      <div className="text-2xl font-bold text-blue-600 mb-2">Processing Results</div>
                      <div className="text-lg text-muted-foreground">Verifying match screenshots...</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <MatchChat
              matchId={matchData.id}
              currentUser={matchData.player.username}
              opponent={matchData.opponent.username}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
