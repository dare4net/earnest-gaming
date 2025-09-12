import { Info, AlertTriangle, Wallet, Medal, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface MatchConfirmationProps {
  game: string
  amount: number
  gameMode?: string
  ammoType?: string
  onConfirm: () => void
  isSearching: boolean
}

export function MatchConfirmation({ game, amount, gameMode, ammoType, onConfirm, isSearching }: MatchConfirmationProps) {
  // Game-specific icons and colors
  const gameConfig: Record<string, { icon: string; color: string; title: string }> = {
    fifa: {
      icon: "fifa.jpeg",
      color: "from-blue-500 to-blue-600",
      title: "FIFA Match"
    },
    efootball: {
      icon: "efootball.png",
      color: "from-emerald-500 to-blue-600",
      title: "eFootball Match"
    },
    codm: {
      icon: "codm.png",
      color: "from-orange-500 to-red-600",
      title: "CODM Match"
    }
  }

  const config = game ? gameConfig[game] : gameConfig.fifa

  return (
    <>
      <style jsx global>{`
        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #15171B;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #2A2D36;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #353841;
        }
      `}</style>
      <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden h-[calc(100vh-8rem)] flex flex-col">
        <div className="p-6 border-b border-[#2A2D36] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Info className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="responsive-text-xl font-bold text-white">Match Details Confirmation</h2>
            <p className="text-gray-400 responsive-text mt-1">Please review your match details before proceeding</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2A2D36] scrollbar-track-[#15171B] p-6 space-y-6">
        {/* Match Details Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
            <span className="responsive-text text-gray-400 block mb-1">Game</span>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center relative overflow-hidden`}>
                <Image
                  src={`/${config.icon}`}
                  alt={game || ""}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-white font-medium responsive-text">{game?.toUpperCase()}</span>
            </div>
          </div>
          <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
            <span className="responsive-text text-gray-400 block mb-1">Game Mode</span>
            <span className="text-white font-medium responsive-text">{gameMode?.replace("-", " ") || "Standard"}</span>
          </div>
          {ammoType && (
            <div className="col-span-2 bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
              <span className="responsive-text text-gray-400 block mb-1">Ammunition Type</span>
              <span className="text-white font-medium responsive-text">{ammoType.replace("-", " ")}</span>
            </div>
          )}
          <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
            <span className="responsive-text text-gray-400 block mb-1">Format</span>
            <span className="text-white font-medium responsive-text">1v1</span>
          </div>
          <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
            <span className="responsive-text text-gray-400 block mb-1">Match Duration</span>
            <span className="text-white font-medium responsive-text">~{game === "codm" ? "8" : game === "fifa" ? "12" : "15"} min</span>
          </div>
        </div>

        {/* Wager Amount */}
        <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="responsive-text text-gray-400 block mb-1">Wager Amount</span>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
                ₦{amount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[#1C1E24] px-3 py-1.5 rounded-lg border border-[#2A2D36]">
              <Wallet className="h-4 w-4 text-emerald-500" />
              <span className="responsive-text text-gray-400">Balance: ₦150,000</span>
            </div>
          </div>
        </div>

        {/* Match Rules */}
        <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
          <h4 className="font-medium mb-3 flex items-center gap-2 text-white responsive-text">
            <Medal className="h-4 w-4 text-emerald-500" />
            Match Rules
          </h4>
          <ul className="space-y-2 responsive-text text-gray-400">
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
              Screenshots required for match verification
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
              Fair play rules apply - no cheating or exploitation
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
              Match result must be reported within 5 minutes
            </li>
            {game === "codm" && (
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                Selected ammunition type must match both players
              </li>
            )}
          </ul>
        </div>

        {/* Warning */}
        <div className="bg-[#231F0E] border border-yellow-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="responsive-text text-yellow-100/90">
              Once you proceed, the wager amount will be held from your balance until the match is completed.
              Make sure you have reviewed all details carefully.
            </div>
          </div>
        </div>

        {/* Find Match Button */}
        <Button
          onClick={onConfirm}
          disabled={isSearching}
          className={`w-full h-12 responsive-text-lg font-medium rounded-xl ${
            isSearching
              ? 'bg-[#2A2D36] text-gray-400'
              : 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-600 hover:to-blue-700'
          }`}
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
          <div className="text-center space-y-3">
            <div className="responsive-text text-gray-400">
              Searching for players with similar skill level...
            </div>
            <div className="flex justify-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
