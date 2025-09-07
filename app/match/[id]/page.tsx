"use client"

import { useState, useEffect, use, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { 
  Gamepad2, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Trophy, 
  DollarSign,
  MessageSquare 
} from "lucide-react"
import Link from "next/link"
import { ScreenshotUpload } from "@/components/screenshot-upload"
import { MatchTimer } from "@/components/match-timer"
import { MatchChat } from "@/components/match-chat"

interface MatchPageProps {
  params: Promise<{
    id: string
  }>
}

function MatchPageContent({ params }: MatchPageProps) {
  const resolvedParams = use(params);
  
  // Early return for loading state
  if (!resolvedParams) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
    </div>;
  }
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

  const matchData = {
    id: resolvedParams.id,
    game: "eFootball",
    gameIcon: "⚽",
    wagerAmount: 50,
    leagueId: resolvedParams.id.startsWith("league-") ? "league-001" : null,
    tournamentRound: resolvedParams.id.startsWith("league-") ? "Group Stage" : null,
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

  const handleStartGame = () => {
    setMatchStatus("playing");
    const gameDuration = matchData.game === "CODM" ? 600 : 720; // 10 mins for CODM, 12 mins for football games
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
      <header className="border-b border-[#2A2D36] bg-[#141519]/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-base sm:text-xl shadow-lg shadow-emerald-500/20">
              {matchData.gameIcon}
            </div>
            <div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                  {isLeagueMatch ? leagueData?.name : `Match #${matchData.id}`}
                </h1>
                <div className="flex items-center gap-1.5 bg-[#1C1E24] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs sm:text-sm text-emerald-500 font-medium">Live</span>
                </div>
              </div>
              {isLeagueMatch && (
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  {`${leagueData?.round} - ${leagueData?.group}`}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {isLeagueMatch && (
              <div className="hidden md:flex items-center gap-2 bg-[#231F0E] text-yellow-500 px-3 py-1.5 rounded-lg border border-yellow-500/20">
                <Trophy className="h-4 w-4" />
                <span className="font-medium">Tournament</span>
              </div>
            )}
            <div className={`
              px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg font-medium flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm
              ${matchStatus === "matching" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                matchStatus === "playing" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                matchStatus === "verification" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                "bg-gray-500/10 text-gray-400 border border-gray-500/20"}
            `}>
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                matchStatus === "matching" ? "bg-blue-400 animate-pulse" :
                matchStatus === "playing" ? "bg-emerald-400" :
                matchStatus === "verification" ? "bg-yellow-400" :
                "bg-gray-400"
              }`}></div>
              <span className="truncate">
                {matchStatus === "matching" && searchingText}
                {matchStatus === "playing" && "Live"}
                {matchStatus === "verification" && "Verify"}
                {matchStatus === "finished" && "Complete"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Main Content - 8 columns */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Game in Progress Phase */}
            {matchStatus === "playing" && (
              <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Gamepad2 className="h-5 w-5 text-emerald-500" />
                        Match in Progress
                      </h2>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <p className="text-emerald-400 font-medium">
                          {`${Math.floor(gameTimer / 60)}:${(gameTimer % 60).toString().padStart(2, '0')} Remaining`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Live Match</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#15171B] rounded-xl p-6 border border-[#2A2D36]">
                    <div className="grid grid-cols-1 sm:grid-cols-11 gap-6 sm:gap-4">
                      {/* Player */}
                      <div className="sm:col-span-5">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
                          <img
                            src="/placeholder-user.jpg"
                            alt={matchData.player.username}
                            className="w-16 h-16 rounded-xl border-2 border-emerald-500 flex-shrink-0"
                          />
                          <div>
                            <div className="font-bold text-lg text-white truncate">{matchData.player.username}</div>
                            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                              <div className="bg-[#1C1E24] px-2 py-0.5 rounded text-sm text-gray-400 truncate">
                                Rating: {matchData.player.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* VS */}
                      <div className="sm:col-span-1 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-emerald-500">VS</div>
                      </div>

                      {/* Opponent */}
                      <div className="sm:col-span-5">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
                          <img
                            src={matchData.opponent.avatar}
                            alt={matchData.opponent.username}
                            className="w-16 h-16 rounded-xl border-2 border-blue-500 flex-shrink-0"
                          />
                          <div>
                            <div className="font-bold text-lg text-white truncate">{matchData.opponent.username}</div>
                            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                              <div className="bg-[#1C1E24] px-2 py-0.5 rounded text-sm text-gray-400 truncate">
                                Rating: {matchData.opponent.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-red-400">Important: Match Verification Required</div>
                        <p className="text-gray-400 text-sm mt-1">
                          After the match, both players must submit screenshots of the final score for verification.
                          {isLeagueMatch && " Tournament progress will be updated after verification."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <Button
                      onClick={handleEndGame}
                      className="h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      End Match
                    </Button>
                    <Button
                      className="h-12 bg-[#2A2D36] hover:bg-[#353841] text-white rounded-lg font-medium"
                      onClick={() => setIsChatOpen(true)}
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Match Chat
                    </Button>
                  </div>
                </div>
              </div>
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
            {matchStatus === "matching" && (
              <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
                <div className="border-b border-[#2A2D36] p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Gamepad2 className="h-5 w-5 text-emerald-500" />
                        Match Setup
                      </h2>
                      <p className="text-gray-400">
                        {hasFoundMatch 
                          ? "Opponent found! Prepare for the match."
                          : "Finding a suitable opponent..."}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">${matchData.wagerAmount} Wager</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-11 sm:grid-cols-7 items-center gap-2 sm:gap-4">
                    {/* Player Card */}
                    <div className="col-span-5 sm:col-span-3 bg-[#15171B] rounded-xl p-3 sm:p-6 border border-[#2A2D36]">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                        <img
                          src="/placeholder-user.jpg"
                          alt={matchData.player.username}
                          className="w-16 h-16 rounded-xl border-2 border-emerald-500 shadow-lg flex-shrink-0"
                        />
                        <div className="flex flex-col items-center sm:items-start">
                          <div className="font-bold text-base sm:text-lg text-white truncate max-w-[120px] sm:max-w-full">{matchData.player.username}</div>
                          <div className="flex flex-col items-center sm:items-start gap-2 mt-2">
                            <div className="bg-[#1C1E24] px-2 py-0.5 rounded text-xs sm:text-sm text-gray-400 truncate max-w-[120px]">
                              Rating: {matchData.player.rating}
                            </div>
                            <div className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-xs sm:text-sm">
                              You
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* VS Section */}
                    <div className="col-span-1 flex flex-col items-center justify-center">
                      <div className="text-xl sm:text-2xl font-bold text-emerald-500">VS</div>
                      <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">#{matchData.id}</div>
                    </div>

                    {/* Opponent Card */}
                    <div className="col-span-5 sm:col-span-3 bg-[#15171B] rounded-xl p-3 sm:p-6 border border-[#2A2D36]">
                      {hasFoundMatch ? (
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                          <img
                            src={matchData.opponent.avatar}
                            alt={matchData.opponent.username}
                            className="w-16 h-16 rounded-xl border-2 border-blue-500 shadow-lg flex-shrink-0"
                          />
                          <div className="flex flex-col items-center sm:items-start">
                            <div className="font-bold text-base sm:text-lg text-white truncate max-w-[120px] sm:max-w-full">{matchData.opponent.username}</div>
                            <div className="flex flex-col items-center sm:items-start gap-2 mt-2">
                              <div className="bg-[#1C1E24] px-2 py-0.5 rounded text-xs sm:text-sm text-gray-400 truncate max-w-[120px]">
                                Rating: {matchData.opponent.rating}
                              </div>
                              <div className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-xs sm:text-sm">
                                Opponent
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 sm:gap-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#2A2D36] animate-pulse"></div>
                          <div className="space-y-2 flex-1">
                            <div className="h-5 sm:h-6 w-24 sm:w-32 bg-[#2A2D36] rounded animate-pulse"></div>
                            <div className="h-4 w-20 sm:w-24 bg-[#2A2D36] rounded animate-pulse"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-[#15171B] rounded-lg p-4 border border-[#2A2D36]">
                      <div className="text-gray-400 text-sm">Game Type</div>
                      <div className="font-medium text-white mt-1">1v1 Competitive</div>
                    </div>
                    <div className="bg-[#15171B] rounded-lg p-4 border border-[#2A2D36]">
                      <div className="text-gray-400 text-sm">Match Duration</div>
                      <div className="font-medium text-white mt-1">12 Minutes</div>
                    </div>
                  </div>

                  {/* Connection Check */}
                  <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-red-400">Connection Check Required</div>
                        <p className="text-gray-400 text-sm mt-1">
                          Ensure stable internet connection before proceeding. Minimum requirements:
                          <span className="block mt-1 font-medium text-white">• 5 Mbps Download Speed</span>
                          <span className="block font-medium text-white">• 2 Mbps Upload Speed</span>
                        </p>
                        <a
                          href="https://www.speedtest.net"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                        >
                          Test Your Connection
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 border-t border-[#2A2D36] pt-6">
                  {hasFoundMatch ? (
                    <Button
                      onClick={handleStartGame}
                      className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium"
                    >
                      <Gamepad2 className="h-5 w-5 mr-2" />
                      Start Match
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center py-4">
                      <div className="flex items-center gap-3 text-gray-400">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-500 border-t-transparent"></div>
                        {searchingText}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Stats Sidebar - 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
              <div className="p-6">
                <h3 className="font-bold text-lg text-white mb-4">Match Statistics</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Win Rate</span>
                      <span className="text-emerald-400">76%</span>
                    </div>
                    <div className="h-2 bg-[#15171B] rounded-full overflow-hidden">
                      <div className="h-full w-[76%] bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Recent Form</span>
                      <span className="text-white">W W L W W</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#15171B] rounded-lg p-3">
                      <div className="text-2xl font-bold text-white">147</div>
                      <div className="text-xs text-gray-400 mt-1">Total Matches</div>
                    </div>
                    <div className="bg-[#15171B] rounded-lg p-3">
                      <div className="text-2xl font-bold text-emerald-400">$2.4K</div>
                      <div className="text-xs text-gray-400 mt-1">Total Earnings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
              <div className="p-6">
                <h3 className="font-bold text-lg text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1,2,3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[#15171B] rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Won vs PlayerXYZ</div>
                        <div className="text-xs text-gray-400 mt-0.5">2 hours ago • $50 Prize</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

            {matchStatus === "verification" && (
              <>
                <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="space-y-1">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                          <Clock className="h-5 w-5 text-yellow-500" />
                          Match Verification
                        </h2>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                          <p className="text-yellow-400 font-medium">
                            {`${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')} Remaining`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-3 py-1.5 rounded-lg">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">Verification Required</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Your Screenshot */}
                      <div className="bg-[#15171B] rounded-xl p-6 border border-[#2A2D36]">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-white">Your Screenshot</h3>
                            <p className="text-sm text-gray-400 mt-1">Upload your match result</p>
                          </div>
                          {playerScreenshot && (
                            <div className="flex items-center gap-2 text-emerald-400">
                              <CheckCircle className="h-5 w-5" />
                              <span className="text-sm font-medium">Uploaded</span>
                            </div>
                          )}
                        </div>
                        <ScreenshotUpload
                          onUpload={handleScreenshotUpload}
                          uploaded={!!playerScreenshot}
                          playerName="You"
                        />
                      </div>

                      {/* Opponent Screenshot */}
                      <div className="bg-[#15171B] rounded-xl p-6 border border-[#2A2D36]">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-white">Opponent's Screenshot</h3>
                            <p className="text-sm text-gray-400 mt-1">{matchData.opponent.username}'s submission</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center h-[200px]">
                          {opponentScreenshot ? (
                            <div className="text-center">
                              <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                              <div className="font-medium text-emerald-400">Screenshot Submitted</div>
                              <div className="text-sm text-gray-400 mt-1">Waiting for verification</div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                              <div className="font-medium text-yellow-400">Awaiting Submission</div>
                              <div className="text-sm text-gray-400 mt-1">Opponent hasn't uploaded yet</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-[#15171B] rounded-xl p-6 border border-[#2A2D36]">
                      <h3 className="font-bold text-lg text-white mb-4">Verification Requirements</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#2A2D36] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                              1
                            </div>
                            <div className="text-sm text-gray-400">
                              Take a clear screenshot of the final match result screen
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#2A2D36] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                              2
                            </div>
                            <div className="text-sm text-gray-400">
                              Ensure both player names are visible in the screenshot
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#2A2D36] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                              3
                            </div>
                            <div className="text-sm text-gray-400">
                              Submit before the verification timer expires
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#2A2D36] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                              4
                            </div>
                            <div className="text-sm text-gray-400">
                              Wait for automatic verification and result confirmation
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
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

        {/* Chat Modal */}
        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
          <DialogContent className="sm:max-w-[425px] h-[600px] flex flex-col p-0">
            <DialogHeader className="px-4 py-2 border-b">
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Match Chat
              </DialogTitle>
              <DialogDescription>
                Chat with your opponent during the match
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-hidden">
              <MatchChat
                matchId={matchData.id}
                currentUser={matchData.player.username}
                opponent={matchData.opponent.username}
              />
            </div>
          </DialogContent>
        </Dialog>
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
