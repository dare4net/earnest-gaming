"use client"

import { useState, useEffect, use, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
// removed Dialog to keep MatchChat independent
import { Gamepad2, Clock, CheckCircle, AlertTriangle, Trophy, DollarSign, MessageSquare, ChevronLeft, ChevronRight, Zap, X } from "lucide-react"
import Link from "next/link"
import { ScreenshotUpload } from "@/components/screenshot-upload"
import { MatchTimer } from "@/components/match-timer"
import { MatchChat } from "@/components/match-chat"
import { api } from "@/lib/api"
import { OpponentMatchedCard } from "@/components/match/OpponentMatchedCard"
import { PotentialOpponentsPanel } from "@/components/match/PotentialOpponentsPanel"
import { VerificationSection } from "@/components/match/VerificationSection"
import { MatchHeader } from "@/components/match/MatchHeader"
import { MatchInProgressSection } from "@/components/match/MatchInProgressSection"
import { StatsSidebar } from "@/components/match/StatsSidebar"
import { MatchSetupSection } from "@/components/match/MatchSetupSection"

interface MatchPageProps {
  params: Promise<{
    id: string
  }>
}

function MatchPageContent({ params }: MatchPageProps) {
  const resolvedParams = use(params);
  
  // Note: Suspense will handle params resolution
  const [matchStatus, setMatchStatus] = useState<"matching" | "playing" | "verification" | "finished">("matching")
  const [gameTimer, setGameTimer] = useState<number>(0) // Game duration in seconds
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes for verification
  const [playerScreenshot, setPlayerScreenshot] = useState<File | null>(null)
  const [opponentScreenshot, setOpponentScreenshot] = useState<File | null>(null)
  const [matchResult, setMatchResult] = useState<"pending" | "won" | "lost" | "disputed">("pending")
  const [isLeagueMatch, setIsLeagueMatch] = useState(false)
  const [leagueData, setLeagueData] = useState<any>(null)
  const [hasFoundMatch, setHasFoundMatch] = useState(false)
  const [searchingAnimation, setSearchingAnimation] = useState(true)
  const [searchingText, setSearchingText] = useState("Searching")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [matchData, setMatchData] = useState<any | null>(null)
  const [potentialOpponents, setPotentialOpponents] = useState<any[]>([])
  const [loadingOpponents, setLoadingOpponents] = useState<boolean>(false)
  const [opponentsError, setOpponentsError] = useState<string>("")
  const [specificPlayerId, setSpecificPlayerId] = useState<string>("")
  const [currentOpponentIdx, setCurrentOpponentIdx] = useState<number>(0)
  const [matchingWithId, setMatchingWithId] = useState<string | null>(null)

  const reloadOpponents = async () => {
    try {
      setOpponentsError("")
      setLoadingOpponents(true)
      const res = await api.searchOpponent(resolvedParams.id)
      setPotentialOpponents(res?.potentialOpponents || [])
    } catch (e: any) {
      setOpponentsError(e?.message || 'Failed to load opponents')
    } finally {
      setLoadingOpponents(false)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getMatch(resolvedParams.id)
        setMatchData(data)
        if (data?.players?.length >= 2 || data?.matchmakingStatus === 'matched') {
          setHasFoundMatch(true)
        }
      } catch (e) {
        console.error(e)
      }
      await reloadOpponents()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.id])

  // moved loading guard below all hooks to keep hook order stable

  useEffect(() => {
    if (matchData?.league) {
      setIsLeagueMatch(true)
      setLeagueData({
        name: matchData?.league?.name || 'League',
        round: "Group Stage - Match",
        group: "Group A",
        nextRound: "Quarter Finals",
        prizePool: matchData?.prizePool || 0,
      })
    }
  }, [matchData?.league])

  const startSearchingAnimation = () => {
    const dots = ["Searching", "Searching.", "Searching..", "Searching..."];
    let i = 0;
    const intervalId = setInterval(() => {
      setSearchingText(dots[i % dots.length]);
      i++;
    }, 500);
    return () => clearInterval(intervalId);
  };

  // Simulate finding a match after a random time between 5-15 seconds
  useEffect(() => {
    if (matchStatus === "matching" && !hasFoundMatch) {
      const timeout = setTimeout(() => {
        setHasFoundMatch(true);
        setSearchingAnimation(false);
      }, Math.random() * 10000 + 5000);
      return () => clearTimeout(timeout);
    }
  }, [matchStatus, hasFoundMatch]);

  // Show loading until match data is available (after all hooks above have been declared)
  if (!matchData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  const handleStartGame = () => {
    setMatchStatus("playing");
    // Persist to backend
    api.updateMatchStatus(resolvedParams.id, 'playing').catch(console.error)
    const gameDuration = matchData?.game === "CODM" ? 600 : 720; // 10 mins for CODM, 12 mins for football games
    setGameTimer(gameDuration);
    // Start the game timer
    const timer = setInterval(() => {
      setGameTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleEndGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleEndGame = () => {
    setMatchStatus("verification");
    // Persist to backend
    api.updateMatchStatus(resolvedParams.id, 'verification').catch(console.error)
    setTimeRemaining(600); // Reset to 10 minutes for verification
    if (isLeagueMatch) {
      console.log("[v0] League match completed, updating tournament bracket");
    }
  };

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
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <MatchHeader
        isLeagueMatch={!!isLeagueMatch}
        leagueData={leagueData}
        matchId={matchData?._id || (resolvedParams as any).id}
        game={matchData?.game}
        matchStatus={matchStatus}
        searchingText={searchingText}
      />

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Main Content - 8 columns */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Game in Progress Phase */}
            {matchStatus === "playing" && (
              <MatchInProgressSection
                gameTimer={gameTimer}
                playerUsername={matchData?.players?.[0]?.user?.username}
                playerRating={matchData?.players?.[0]?.user?.rating}
                opponentUsername={matchData?.players?.[1]?.user?.username}
                opponentAvatar={matchData?.players?.[1]?.user?.avatar}
                opponentRating={matchData?.players?.[1]?.user?.rating}
                onEndGame={handleEndGame}
                onOpenChat={() => setIsChatOpen(true)}
              />
            )}

            {isLeagueMatch && (
              <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-transparent p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-yellow-500">
                        <Trophy className="h-5 w-5" />
                        <h3 className="font-bold text-lg">Tournament Match</h3>
                      </div>
                      <p className="text-gray-400">
                        Part of {leagueData?.name} - Round of 16
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-2xl font-bold text-white">
                        ${leagueData?.prizePool.toLocaleString()}
                      </div>
                      <div className="text-emerald-500 text-sm font-medium">Prize Pool</div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="text-gray-400 text-sm">Current Round</div>
                      <div className="font-medium text-white mt-1">{leagueData?.round}</div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="text-gray-400 text-sm">Prize Distribution</div>
                      <div className="font-medium text-white mt-1">Winner Takes All</div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="text-gray-400 text-sm">Next Stage</div>
                      <div className="font-medium text-white mt-1">{leagueData?.nextRound}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Match Finding Phase */}
            {(matchStatus === "matching" || matchData?.matchmakingStatus === 'matched') && (
              <MatchSetupSection
                matchId={matchData?._id || (resolvedParams as any).id}
                entryFee={matchData?.entryFee}
                playerUsername={matchData?.players?.[0]?.user?.username}
                playerRating={matchData?.players?.[0]?.user?.rating}
                opponent={matchData?.players?.[1]?.user ? {
                  username: matchData?.players?.[1]?.user?.username,
                  avatar: matchData?.players?.[1]?.user?.avatar,
                  rating: matchData?.players?.[1]?.user?.rating,
                } : null}
                hasFoundMatch={hasFoundMatch}
                searchingText={searchingText}
                loadingOpponents={loadingOpponents}
                opponentsError={opponentsError}
                potentialOpponents={potentialOpponents}
                currentOpponentIdx={currentOpponentIdx}
                setCurrentOpponentIdx={(n) => setCurrentOpponentIdx(n)}
                matchingWithId={matchingWithId}
                onReloadOpponents={reloadOpponents}
                onRequestMatch={async (userId) => {
                  try {
                    setMatchingWithId(userId)
                    const resp = await api.matchWithPlayer((resolvedParams as any).id, userId)
                    console.log('[UI] matchWithPlayer response', resp)
                    if (resp?.action === 'matched_with_player' && resp?.match?._id) {
                      setHasFoundMatch(true)
                      setMatchData(resp.match)
                      setPotentialOpponents([])
                    } else {
                      const data = await api.getMatch((resolvedParams as any).id)
                      setMatchData(data)
                      setPotentialOpponents([])
                    }
                  } catch (e) {
                    console.error(e)
                    alert('Failed to match with player')
                  } finally {
                    setMatchingWithId(null)
                  }
                }}
                specificPlayerId={specificPlayerId}
                setSpecificPlayerId={setSpecificPlayerId}
                onSpecificMatch={async () => {
                  if (!specificPlayerId) return
                  try {
                    setMatchingWithId(specificPlayerId)
                    const resp = await api.matchWithPlayer((resolvedParams as any).id, specificPlayerId)
                    console.log('[UI] matchWithPlayer response', resp)
                    if (resp?.action === 'matched_with_player' && resp?.match?._id) {
                      setHasFoundMatch(true)
                      setMatchData(resp.match)
                      setPotentialOpponents([])
                    } else {
                      const data = await api.getMatch((resolvedParams as any).id)
                      setMatchData(data)
                      setPotentialOpponents([])
                    }
                  } catch (e) {
                    console.error(e)
                    alert('Failed to match with specified player')
                  } finally {
                    setMatchingWithId(null)
                  }
                }}
                onStartMatch={handleStartGame}
              />
            )}
          </div>

          {/* Stats Sidebar - 4 columns */}
          <StatsSidebar />

            {matchStatus === "verification" && (
              <VerificationSection
                timeRemaining={timeRemaining}
                playerScreenshot={playerScreenshot}
                opponentUsername={matchData?.players?.[1]?.user?.username}
                          onUpload={handleScreenshotUpload}
              />
            )}

            {matchStatus === "finished" && (
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
        </div>

        {/* Chat FAB */}
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-emerald-500 hover:bg-emerald-600 transition-colors"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>

        {/* Chat Modal (custom, Dialog-free to avoid styling bleed) */}
        {isChatOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/60" onClick={() => setIsChatOpen(false)} />
            <div className="fixed bottom-6 right-6 w-[90vw] max-w-[425px] h-[600px] rounded-xl overflow-hidden">
              <button
                aria-label="Close"
                onClick={() => setIsChatOpen(false)}
                className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-[#2A2D36]"
              >
                <X className="h-4 w-4" />
              </button>
              <MatchChat
                matchId={matchData?._id || resolvedParams.id}
                currentUser={matchData?.players?.[0]?.user?.username || 'You'}
                opponent={matchData?.players?.[1]?.user?.username || 'Opponent'}
              />
            </div>
          </div>
        )}
      </div>
    
  )
}

export default function MatchPage(props: MatchPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    }>
      <MatchPageContent {...props} />
    </Suspense>
  );
}
