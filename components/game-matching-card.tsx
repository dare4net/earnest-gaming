import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Trophy, Clock } from "lucide-react"
import Link from "next/link"

interface GameMatchingCardProps {
  game: {
    id: string
    name: string
    description: string
    icon: string
    color: string
    players: string
    avgWager: string
    avgMatchTime: string
    special?: string
  }
}

export function GameMatchingCard({ game }: GameMatchingCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader>
        <div
          className={`w-16 h-16 rounded-lg bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
        >
          {game.icon}
        </div>
        <CardTitle className="text-xl">{game.name}</CardTitle>
        <CardDescription>{game.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            {game.players}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="h-4 w-4" />
            {game.avgWager}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <Clock className="h-4 w-4" />
            Avg match: {game.avgMatchTime}
          </div>
        </div>

        {game.special && (
          <Badge variant="secondary" className="text-xs">
            {game.special}
          </Badge>
        )}

        <Link href={`/games/${game.id}`}>
          <Button className="w-full">Find Match</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
