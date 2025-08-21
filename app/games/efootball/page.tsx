"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Gamepad2, ArrowLeft, Users, DollarSign, Search, Zap } from "lucide-react"
import Link from "next/link"

export default function EFootballMatchPage() {
  const [wagerAmount, setWagerAmount] = useState([25])
  const [isSearching, setIsSearching] = useState(false)

  const handleFindMatch = () => {
    setIsSearching(true)
    // TODO: Implement matchmaking logic
    setTimeout(() => {
      setIsSearching(false)
      // Redirect to match found page
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/games">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-sm">
                ⚽
              </div>
              <h1 className="text-xl font-bold text-foreground">eFootball Match</h1>
            </div>
          </div>
          <Badge variant="secondary">
            <Users className="h-3 w-3 mr-1" />
            2.3k online
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              Find eFootball Opponent
            </CardTitle>
            <CardDescription>Set your wager amount and find a competitive opponent for eFootball</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wager Amount */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Wager Amount</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={wagerAmount}
                    onValueChange={setWagerAmount}
                    max={500}
                    min={5}
                    step={5}
                    className="flex-1"
                  />
                  <div className="w-16 text-right font-medium">${wagerAmount[0]}</div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$5 min</span>
                  <span>$500 max</span>
                </div>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="space-y-2">
              <Label className="text-sm">Quick Select</Label>
              <div className="flex gap-2 flex-wrap">
                {[10, 25, 50, 100, 200].map((amount) => (
                  <Button
                    key={amount}
                    variant={wagerAmount[0] === amount ? "default" : "outline"}
                    size="sm"
                    onClick={() => setWagerAmount([amount])}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Match Info */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium">Match Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Game:</span>
                  <span className="ml-2">eFootball</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Format:</span>
                  <span className="ml-2">1v1</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Platform:</span>
                  <span className="ml-2">Mobile</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="ml-2">~15 min</span>
                </div>
              </div>
            </div>

            {/* Find Match Button */}
            <Button onClick={handleFindMatch} disabled={isSearching} className="w-full h-12 text-lg">
              {isSearching ? (
                <>
                  <Search className="h-5 w-5 mr-2 animate-spin" />
                  Finding Opponent...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Find Match (${wagerAmount[0]})
                </>
              )}
            </Button>

            {isSearching && (
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">Searching for players with similar skill level...</div>
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
