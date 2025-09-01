import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Link from "next/link"
import { Game } from "@/lib/game-constants"

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader>
        <div
          className="w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative"
        >
          <Image
            src={game.iconPath}
            alt={`${game.name} icon`}
            fill
            className="object-contain"
          />
        </div>
        <CardTitle className="text-xl">{game.name}</CardTitle>
        <CardDescription>{game.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {game.players && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {game.players}
          </div>
        )}

        {game.special && (
          <Badge variant="secondary" className="text-xs">
            {game.special}
          </Badge>
        )}

        <Link href={`/games/${game.id}`}>
          <Button className="w-full bg-transparent" variant="outline">
            Find Match
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
