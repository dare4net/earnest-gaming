"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Users, DollarSign, Search, Zap, Target, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function CodmMatchPage() {
  const [wagerAmount, setWagerAmount] = useState([40])
  const [gameMode, setGameMode] = useState("")
  const [ammoType, setAmmoType] = useState("")
  const [hasAmmoConfirmed, setHasAmmoConfirmed] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleFindMatch = () => {
    if (!gameMode || !ammoType || !hasAmmoConfirmed) return
    setIsSearching(true)
    // TODO: Implement matchmaking logic
    setTimeout(() => {
      setIsSearching(false)
      // Redirect to match found page
    }, 3000)
  }

  const canSearch = gameMode && ammoType && hasAmmoConfirmed

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
              <div className="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-sm">
                🎯
              </div>
              <h1 className="text-xl font-bold text-foreground">CODM Match</h1>
            </div>
          </div>
          <Badge variant="secondary">
            <Users className="h-3 w-3 mr-1" />
            4.1k online
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Find CODM Opponent
            </CardTitle>
            <CardDescription>
              Select game mode, ammunition type, and wager for Call of Duty Mobile matches
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Game Mode Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Game Mode</Label>
              <Select value={gameMode} onValueChange={setGameMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select CODM game mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiplayer">Multiplayer</SelectItem>
                  <SelectItem value="battle-royale">Battle Royale</SelectItem>
                  <SelectItem value="ranked-mp">Ranked Multiplayer</SelectItem>
                  <SelectItem value="ranked-br">Ranked Battle Royale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ammunition Type - Special for CODM */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                Ammunition Type
                <Badge variant="secondary" className="text-xs">
                  Required for CODM
                </Badge>
              </Label>
              <Select value={ammoType} onValueChange={setAmmoType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your ammunition type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assault-rifle">Assault Rifle Ammo</SelectItem>
                  <SelectItem value="sniper">Sniper Ammo</SelectItem>
                  <SelectItem value="smg">SMG Ammo</SelectItem>
                  <SelectItem value="lmg">LMG Ammo</SelectItem>
                  <SelectItem value="shotgun">Shotgun Ammo</SelectItem>
                  <SelectItem value="pistol">Pistol Ammo</SelectItem>
                </SelectContent>
              </Select>
              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-orange-800 dark:text-orange-200">
                    <strong>Important:</strong> Both players must have the same ammunition type in their CODM profile
                    before the match begins. Mismatched ammo types will result in match cancellation.
                  </div>
                </div>
              </div>
            </div>

            {/* Ammunition Confirmation */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="ammo-confirm" checked={hasAmmoConfirmed} onCheckedChange={setHasAmmoConfirmed} />
                <Label htmlFor="ammo-confirm" className="text-sm">
                  I confirm that I have the selected ammunition type in my CODM profile and understand that mismatched
                  ammo will cancel the match.
                </Label>
              </div>
            </div>

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
                    min={10}
                    step={5}
                    className="flex-1"
                  />
                  <div className="w-16 text-right font-medium">${wagerAmount[0]}</div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$10 min</span>
                  <span>$500 max</span>
                </div>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="space-y-2">
              <Label className="text-sm">Quick Select</Label>
              <div className="flex gap-2 flex-wrap">
                {[20, 40, 100, 200, 400].map((amount) => (
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
                  <span className="ml-2">Call of Duty Mobile</span>
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
                  <span className="ml-2">~8 min</span>
                </div>
              </div>
            </div>

            {/* Find Match Button */}
            <Button onClick={handleFindMatch} disabled={isSearching || !canSearch} className="w-full h-12 text-lg">
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
                <div className="text-sm text-muted-foreground">
                  Searching for {gameMode.replace("-", " ")} players with {ammoType.replace("-", " ")} ammo...
                </div>
                <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            )}

            {!canSearch && (
              <div className="text-center text-sm text-muted-foreground">
                Please complete all fields above to find a match
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
