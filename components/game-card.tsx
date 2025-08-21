import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Link from "next/link"

interface GameCardProps {
  game: {
    id: string
    name: string
    description: string
    icon: string
    color: string
    players: string
    special?: string
  }
}

export function GameCard({ game }: GameCardProps) {
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {game.players}
        </div>

        {game.special && (
          <Badge variant="secondary" className="text-xs">
            {game.special}
          </Badge>
        )}

        <Link href="/games">
          <Button className="w-full bg-transparent" variant="outline">
            Find Match
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
