import { useState } from "react"
import { Target, AlertTriangle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { MatchBase } from "./match-base"
import { WagerControls } from "./wager-controls"

interface CodmMatchProps {
  onClose?: () => void
}

export function CodmMatch({ onClose }: CodmMatchProps) {
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
      // Handle match found
    }, 3000)
  }

  const canSearch = gameMode && ammoType && hasAmmoConfirmed

  const matchInfo = (
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
  )

  return (
    <MatchBase
      title="Find CODM Opponent"
      icon={<Target className="h-5 w-5" />}
      description="Select game mode, ammunition type, and wager for Call of Duty Mobile matches"
      onlineCount={4.1}
    >
      {/* Game Mode Selection */}
      <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
        <Label className="text-lg font-bold text-white block mb-4">Game Mode</Label>
        <Select value={gameMode} onValueChange={setGameMode}>
          <SelectTrigger className="h-12 bg-[#1C1E24] border-[#2A2D36] text-white">
            <SelectValue placeholder="Select CODM game mode" />
          </SelectTrigger>
          <SelectContent className="bg-[#1C1E24] border-[#2A2D36]">
            <SelectItem value="multiplayer" className="text-white hover:bg-[#2A2D36]">Multiplayer</SelectItem>
            <SelectItem value="battle-royale" className="text-white hover:bg-[#2A2D36]">Battle Royale</SelectItem>
            <SelectItem value="ranked-mp" className="text-white hover:bg-[#2A2D36]">Ranked Multiplayer</SelectItem>
            <SelectItem value="ranked-br" className="text-white hover:bg-[#2A2D36]">Ranked Battle Royale</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ammunition Type */}
      <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
        <div className="flex items-center gap-2 mb-4">
          <Label className="text-lg font-bold text-white">Ammunition Type</Label>
          <div className="px-2 py-1 rounded-full bg-[#1C1E24] border border-[#2A2D36] text-xs font-medium text-emerald-500">
            Required
          </div>
        </div>
        <Select value={ammoType} onValueChange={setAmmoType}>
          <SelectTrigger className="h-12 bg-[#1C1E24] border-[#2A2D36] text-white">
            <SelectValue placeholder="Select your ammunition type" />
          </SelectTrigger>
          <SelectContent className="bg-[#1C1E24] border-[#2A2D36]">
            <SelectItem value="assault-rifle" className="text-white hover:bg-[#2A2D36]">Assault Rifle Ammo</SelectItem>
            <SelectItem value="sniper" className="text-white hover:bg-[#2A2D36]">Sniper Ammo</SelectItem>
            <SelectItem value="smg" className="text-white hover:bg-[#2A2D36]">SMG Ammo</SelectItem>
            <SelectItem value="lmg" className="text-white hover:bg-[#2A2D36]">LMG Ammo</SelectItem>
            <SelectItem value="shotgun" className="text-white hover:bg-[#2A2D36]">Shotgun Ammo</SelectItem>
            <SelectItem value="pistol" className="text-white hover:bg-[#2A2D36]">Pistol Ammo</SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-4 bg-[#231F0E] border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-100/90">
              <span className="font-semibold text-yellow-500">Important:</span> Both players must have the same ammunition type in their CODM profile before
              the match begins. Mismatched ammo types will result in match cancellation.
            </div>
          </div>
        </div>
      </div>

      {/* Ammunition Confirmation */}
      <div className="bg-[#15171B] rounded-xl border border-[#2A2D36] p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            id="ammo-confirm" 
            checked={hasAmmoConfirmed} 
            onCheckedChange={setHasAmmoConfirmed}
            className="mt-1 bg-[#1C1E24] border-[#2A2D36] data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
          />
          <Label htmlFor="ammo-confirm" className="text-sm text-gray-400">
            I confirm that I have the selected ammunition type in my CODM profile and understand that mismatched ammo
            will cancel the match.
          </Label>
        </div>
      </div>

      {/* Match Info */}
      {matchInfo}

      <WagerControls
        wagerAmount={wagerAmount}
        setWagerAmount={setWagerAmount}
        quickSelectAmounts={[20, 40, 100, 200, 400]}
        minAmount={10}
        maxAmount={500}
        game="codm"
        gameMode={gameMode}
        ammoType={ammoType}
        disabled={!canSearch}
        onClose={onClose}
      />

      {!canSearch && (
        <div className="text-center text-sm text-muted-foreground">
          Please complete all fields above to find a match
        </div>
      )}
    </MatchBase>
  )
}
