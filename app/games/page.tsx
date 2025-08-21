"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, ArrowLeft, Users } from "lucide-react"
import Link from "next/link"
import { GameMatchingCard } from "@/components/game-matching-card"

const games = [
  {
    id: "efootball",
    name: "eFootball",
    description: "Find opponents for competitive eFootball matches",
    icon: "⚽",
    color: "from-blue-600 to-blue-800",
    players: "2.3k online",
    avgWager: "$25",
    avgMatchTime: "15 min",
  },
  {
    id: "fifa",
    name: "FIFA",
    description: "Challenge players in FIFA tournaments",
    icon: "🏆",
    color: "from-green-600 to-green-800",
    players: "1.8k online",
    avgWager: "$30",
    avgMatchTime: "12 min",
  },
  {
    id: "codm",
    name: "Call of Duty Mobile",
    description: "Battle with matched ammunition types",
    icon: "🎯",
    color: "from-red-600 to-red-800",
    players: "4.1k online",
    avgWager: "$40",
    avgMatchTime: "8 min",
    special: "Ammo matching required",
  },
]

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Choose Your Game</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              <Users className="h-3 w-3 mr-1" />
              8.2k online
            </Badge>
          </div>
        </div>
      </header>

      {/* Games Selection */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Select Your Game</h2>
            <p className="text-lg text-muted-foreground">
              Choose your preferred game and start finding competitive matches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameMatchingCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
