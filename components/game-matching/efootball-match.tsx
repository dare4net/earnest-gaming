import { useState } from "react"
import { Gamepad2 } from "lucide-react"
import { MatchBase } from "./match-base"
import { WagerControls } from "./wager-controls"

interface EFootballMatchProps {
  onClose?: () => void
}

export function EFootballMatch({ onClose }: EFootballMatchProps) {
  const [wagerAmount, setWagerAmount] = useState([25])
  const [isSearching, setIsSearching] = useState(false)

  const handleFindMatch = () => {
    setIsSearching(true)
    // TODO: Implement matchmaking logic
    setTimeout(() => {
      setIsSearching(false)
      // Handle match found
    }, 3000)
  }

  const matchInfo = (
    <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
      <h4 className="font-bold text-white mb-4">Match Details</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1C1E24] rounded-lg p-3 border border-[#2A2D36]">
          <span className="text-sm text-gray-400 block mb-1">Game</span>
          <span className="text-white font-medium">eFootball</span>
        </div>
        <div className="bg-[#1C1E24] rounded-lg p-3 border border-[#2A2D36]">
          <span className="text-sm text-gray-400 block mb-1">Format</span>
          <span className="text-white font-medium">1v1</span>
        </div>
        <div className="bg-[#1C1E24] rounded-lg p-3 border border-[#2A2D36]">
          <span className="text-sm text-gray-400 block mb-1">Platform</span>
          <span className="text-white font-medium">Mobile</span>
        </div>
        <div className="bg-[#1C1E24] rounded-lg p-3 border border-[#2A2D36]">
          <span className="text-sm text-gray-400 block mb-1">Duration</span>
          <span className="text-white font-medium">~15 min</span>
        </div>
      </div>
    </div>
  )

  return (
    <MatchBase
      title="Find eFootball Opponent"
      icon={<Gamepad2 className="h-5 w-5" />}
      description="Set your wager amount and find a competitive opponent for eFootball"
      onlineCount={2.3}
    >
      {/* Match Info */}
      {matchInfo}

      <WagerControls
        wagerAmount={wagerAmount}
        setWagerAmount={setWagerAmount}
        quickSelectAmounts={[10, 25, 50, 100, 200]}
        minAmount={5}
        maxAmount={500}
        game="efootball"
        onClose={onClose}
      />
    </MatchBase>
  )
}
