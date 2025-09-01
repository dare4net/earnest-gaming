export interface Game {
  id: string;
  name: string;
  description: string;
  iconPath: string;
  color: string;
  players?: string;
  special?: string;
}

export const GAMES: Record<string, Game> = {
  efootball: {
    id: "efootball",
    name: "eFootball",
    description: "Find opponents for competitive eFootball matches",
    iconPath: "efootball.png",
    color: "from-blue-600 to-blue-800",
    players: "2.3k online",
  },
  fifa: {
    id: "fifa",
    name: "FIFA",
    description: "Challenge players in FIFA tournaments",
    iconPath: "fifa.jpeg",
    color: "from-green-600 to-green-800",
    players: "1.8k online",
  },
  codm: {
    id: "codm",
    name: "Call of Duty Mobile",
    description: "Battle with matched ammunition types",
    iconPath: "codm.png",
    color: "from-red-600 to-red-800",
    players: "4.1k online",
    special: "Ammo matching required",
  }
} as const;

export type GameId = keyof typeof GAMES;
