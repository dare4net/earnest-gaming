import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { DollarSign, Zap } from "lucide-react"
import { MatchConfirmation } from "./match-confirmation"

interface WagerControlsProps {
  wagerAmount: number[]
  setWagerAmount: (value: number[]) => void
  quickSelectAmounts: number[]
  minAmount: number
  maxAmount: number
  step?: number
  disabled?: boolean
  game: string
  gameMode?: string
  ammoType?: string
  onClose?: () => void
}

export function WagerControls({
  wagerAmount,
  setWagerAmount,
  quickSelectAmounts,
  minAmount,
  maxAmount,
  step = 5,
  disabled = false,
  game,
  gameMode,
  ammoType,
  onClose
}: WagerControlsProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleProceed = () => {
    if (onClose) {
      onClose();
    }
  }
  return (
    <>
      <div className="space-y-6">
        {/* Wager Amount */}
        <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
          <Label className="responsive-text-lg font-bold text-white mb-4 block">Wager Amount</Label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-emerald-500" />
              </div>
              <Slider
                value={wagerAmount}
                onValueChange={setWagerAmount}
                max={maxAmount}
                min={minAmount}
                step={step}
                className="flex-1"
              />
              <div className="w-20 text-right font-bold responsive-text-lg bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
                ₦{wagerAmount[0]}
              </div>
            </div>
            <div className="flex justify-between responsive-text text-gray-400">
              <span>₦{minAmount} min</span>
              <span>₦{maxAmount} max</span>
            </div>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
          <Label className="text-white font-medium mb-3 block responsive-text">Quick Select</Label>
          <div className="flex gap-2 flex-wrap">
            {quickSelectAmounts.map((amount) => (
              <Button
                key={amount}
                variant={wagerAmount[0] === amount ? "default" : "outline"}
                size="sm"
                onClick={() => setWagerAmount([amount])}
                className={wagerAmount[0] === amount ? 
                  "bg-emerald-500 hover:bg-emerald-600 text-white border-none" : 
                  "border-[#2A2D36] bg-[#1C1E24] hover:bg-[#2A2D36] text-white"}
              >
                ₦{amount}
              </Button>
            ))}
          </div>
        </div>

        {/* Proceed Button */}
        <Button 
          onClick={handleProceed} 
          disabled={disabled} 
          className={`w-full h-12 responsive-text-lg font-medium rounded-xl
            ${disabled ? 
              'bg-[#2A2D36] text-gray-500 cursor-not-allowed' : 
              'bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-600 hover:to-blue-700'
            }`}
        >
          <Zap className="h-5 w-5 mr-2" />
          Proceed with ₦{wagerAmount[0]} Wager
        </Button>
      </div>
    </>
  )
}
