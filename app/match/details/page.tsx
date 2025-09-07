"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Zap, Search, Info, AlertTriangle, Wallet, Medal, Timer } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function MatchDetailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSearching, setIsSearching] = useState(false)

  // Get match details from URL params
  const game = searchParams.get("game")
  const amount = Number(searchParams.get("amount") || 0)
  const gameMode = searchParams.get("gameMode")
  const ammoType = searchParams.get("ammoType") // Only for CODM

  const handleFindMatch = () => {
    setIsSearching(true)
    // TODO: Implement matchmaking logic
    setTimeout(() => {
      setIsSearching(false)
      // Redirect to match found page or handle match found state
      router.push(`/match/${Date.now()}`) // Temporary ID generation
    }, 3000)
  }

  // Game-specific icons and colors
  const gameConfig: Record<string, { icon: string; color: string; title: string }> = {
    fifa: {
      icon: "fifa.jpeg",
      color: "from-blue-600 to-blue-800",
      title: "FIFA Match"
    },
    efootball: {
      icon: "efootball.png",
      color: "from-green-600 to-green-800",
      title: "eFootball Match"
    },
    codm: {
      icon: "codm.png",
      color: "from-red-600 to-red-800",
      title: "CODM Match"
    }
  }

  const config = game ? gameConfig[game] : gameConfig.fifa

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded bg-gradient-to-br ${config.color} flex items-center justify-center text-sm relative overflow-hidden`}>
                <Image
                  src={`/${config.icon}`}
                  alt={game || ""}
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="text-xl font-bold text-foreground">{config.title}</h1>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Timer className="h-3.5 w-3.5" />
            Confirming Match
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Match Details Confirmation
            </CardTitle>
            <CardDescription>
              Please review your match details before proceeding to find an opponent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Match Details Summary */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Game</p>
                  <p className="font-medium">{game?.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Game Mode</p>
                  <p className="font-medium">{gameMode?.replace("-", " ") || "Standard"}</p>
                </div>
                {ammoType && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Ammunition Type</p>
                    <p className="font-medium">{ammoType.replace("-", " ")}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Format</p>
                  <p className="font-medium">1v1</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Match Duration</p>
                  <p className="font-medium">~{game === "codm" ? "8" : game === "fifa" ? "12" : "15"} min</p>
                </div>
              </div>

              {/* Wager Amount */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Wager Amount</p>
                    <p className="text-xl font-bold">₦{amount.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Balance: ₦150,000</span>
                  </div>
                </div>
              </div>

              {/* Match Rules */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Medal className="h-4 w-4" />
                  Match Rules
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Screenshots required for match verification</li>
                  <li>• Fair play rules apply - no cheating or exploitation</li>
                  <li>• Match result must be reported within 5 minutes</li>
                  {game === "codm" && (
                    <li>• Selected ammunition type must match both players</li>
                  )}
                </ul>
              </div>

              {/* Warning */}
              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-orange-800 dark:text-orange-200">
                    Once you proceed, the wager amount will be held from your balance until the match is completed.
                    Make sure you have reviewed all details carefully.
                  </div>
                </div>
              </div>
            </div>

            {/* Find Match Button */}
            <Button
              onClick={handleFindMatch}
              disabled={isSearching}
              className="w-full h-12 text-lg"
            >
              {isSearching ? (
                <>
                  <Search className="h-5 w-5 mr-2 animate-spin" />
                  Finding Opponent...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Confirm & Find Match
                </>
              )}
            </Button>

            {/* Search Animation */}
            {isSearching && (
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">
                  Searching for players with similar skill level...
                </div>
                <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
