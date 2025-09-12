import { useState } from "react"
import { Trophy, ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MatchBase } from "./match-base"
import { WagerControls } from "./wager-controls"
import { MatchConfirmation } from "./match-confirmation"
import { api } from "@/lib/api"

interface FifaMatchProps {
  onClose?: () => void
}

export function FifaMatch({ onClose }: FifaMatchProps) {
  const [wagerAmount, setWagerAmount] = useState([30])
  const [gameMode, setGameMode] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleProceed = () => {
    if (!gameMode) return;
    setShowConfirmation(true);
  }

  const handleConfirm = () => {
    setIsSearching(true);
    (async () => {
      try {
        const create = await api.createMatch({
          game: 'FIFA',
          entryFee: Number(wagerAmount[0]),
          format: '1v1',
          rules: ['Best of 3'],
          matchType: 'regular'
        })
        const matchId = create?.match?._id || create?._id
        if (!matchId) throw new Error('Failed to create match')
        await api.searchOpponent(matchId)
        window.location.href = `/match/${matchId}`
      } catch (e) {
        console.error(e)
        alert((e as Error).message || 'Failed to create match')
        setIsSearching(false)
      }
    })()
  }

  const handleBack = () => {
    setShowConfirmation(false);
  }

  if (showConfirmation) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setShowConfirmation(false)}
            className="text-gray-400 hover:text-white responsive-text"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Match Options
          </Button>
        </div>
        <MatchConfirmation
          game="fifa"
          amount={wagerAmount[0]}
          gameMode={gameMode}
          onConfirm={handleConfirm}
          isSearching={isSearching}
        />
      </div>
    )
  }

  const matchInfo = (
    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
      <h4 className="font-medium responsive-text-lg">Match Details</h4>
      <div className="grid grid-cols-2 gap-4 responsive-text">
        <div>
          <span className="text-muted-foreground">Game:</span>
          <span className="ml-2">FIFA</span>
        </div>
        <div>
          <span className="text-muted-foreground">Format:</span>
          <span className="ml-2">1v1</span>
        </div>
        <div>
          <span className="text-muted-foreground">Platform:</span>
          <span className="ml-2">Console/PC</span>
        </div>
        <div>
          <span className="text-muted-foreground">Duration:</span>
          <span className="ml-2">~12 min</span>
        </div>
      </div>
    </div>
  )

  return (
    <MatchBase
      title="Find FIFA Opponent"
      icon={<Trophy className="h-5 w-5" />}
      description="Choose your game mode, set your wager, and find a competitive FIFA opponent"
      onlineCount={1.8}
    >
      {/* Game Mode Selection */}
      <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
        <Label className="responsive-text-lg font-bold text-white block mb-4">Game Mode</Label>
        <Select value={gameMode} onValueChange={setGameMode}>
          <SelectTrigger className="h-12 bg-[#1C1E24] border-[#2A2D36] text-white responsive-text">
            <SelectValue placeholder="Select FIFA game mode" />
          </SelectTrigger>
          <SelectContent className="bg-[#1C1E24] border-[#2A2D36]">
            <SelectItem value="ultimate-team" className="text-white hover:bg-[#2A2D36] responsive-text">FIFA Ultimate Team</SelectItem>
            <SelectItem value="seasons" className="text-white hover:bg-[#2A2D36] responsive-text">Online Seasons</SelectItem>
            <SelectItem value="fut-champions" className="text-white hover:bg-[#2A2D36] responsive-text">FUT Champions</SelectItem>
            <SelectItem value="pro-clubs" className="text-white hover:bg-[#2A2D36] responsive-text">Pro Clubs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Match Info */}
      {matchInfo}

      <WagerControls
        wagerAmount={wagerAmount}
        setWagerAmount={setWagerAmount}
        quickSelectAmounts={[15, 30, 75, 150, 300]}
        minAmount={5}
        maxAmount={500}
        game="fifa"
        gameMode={gameMode}
        disabled={!gameMode}
        onClose={() => handleProceed()}
      />
    </MatchBase>
  )
}
