"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Target, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface Bet {
  id: string
  type: string
  participant?: string
  participant1?: string
  participant2?: string
  odds: number
  description?: string
  matchName?: string
}

interface LeagueBettingModalProps {
  isOpen: boolean
  onClose: () => void
  bet: Bet | null
  leagueName: string
}

export function LeagueBettingModal({ isOpen, onClose, bet, leagueName }: LeagueBettingModalProps) {
  const [betAmount, setBetAmount] = useState("")
  const [isPlacing, setIsPlacing] = useState(false)

  // Mock user wallet balance
  const walletBalance = 127.5

  const handlePlaceBet = async () => {
    if (!bet || !betAmount) return

    setIsPlacing(true)
    // TODO: Implement actual bet placement logic
    console.log("Placing bet:", {
      betId: bet.id,
      amount: Number.parseFloat(betAmount),
      odds: bet.odds,
      participant: bet.participant,
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsPlacing(false)
    setBetAmount("")
    onClose()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const calculatePayout = () => {
    if (!betAmount || !bet) return 0
    return Number.parseFloat(betAmount) * bet.odds
  }

  const calculateProfit = () => {
    if (!betAmount || !bet) return 0
    return Number.parseFloat(betAmount) * bet.odds - Number.parseFloat(betAmount)
  }

  const quickAmounts = [5, 10, 25, 50, 100]

  const resetModal = () => {
    setBetAmount("")
    setIsPlacing(false)
    onClose()
  }

  if (!bet) return null

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Place Bet
          </DialogTitle>
          <DialogDescription>Place your bet on {leagueName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bet Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Bet Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Selection:</span>
                <span className="font-medium">{bet.participant || bet.description}</span>
              </div>
              {bet.matchName && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Match:</span>
                  <span className="font-medium">{bet.matchName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Odds:</span>
                <span className="font-bold text-green-600">{bet.odds.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bet Type:</span>
                <span className="font-medium capitalize">{bet.type.replace("_", " ")}</span>
              </div>
            </CardContent>
          </Card>

          {/* Bet Amount */}
          <div className="space-y-4">
            <Label htmlFor="betAmount">Bet Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="betAmount"
                type="number"
                placeholder="0.00"
                className="pl-10"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                min="1"
                max={walletBalance}
                step="0.01"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setBetAmount(amount.toString())}
                  disabled={amount > walletBalance}
                >
                  ${amount}
                </Button>
              ))}
            </div>

            <div className="text-xs text-muted-foreground">Available balance: {formatCurrency(walletBalance)}</div>
          </div>

          {/* Bet Summary */}
          {betAmount && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Stake:</span>
                    <span className="font-medium">{formatCurrency(Number.parseFloat(betAmount))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Odds:</span>
                    <span className="font-medium">{bet.odds.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Potential Payout:</span>
                    <span className="font-bold text-green-600">{formatCurrency(calculatePayout())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Potential Profit:</span>
                    <span className="font-bold text-green-600">{formatCurrency(calculateProfit())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Validation Alerts */}
          {betAmount && Number.parseFloat(betAmount) > walletBalance && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Insufficient balance. You need {formatCurrency(Number.parseFloat(betAmount) - walletBalance)} more to
                place this bet.
              </AlertDescription>
            </Alert>
          )}

          {betAmount && Number.parseFloat(betAmount) < 1 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>Minimum bet amount is $1.00</AlertDescription>
            </Alert>
          )}

          {/* Responsible Gambling Notice */}
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Bet Responsibly:</strong> Only bet what you can afford to lose. Gambling should be fun and
              entertaining.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={resetModal} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handlePlaceBet}
              disabled={
                !betAmount ||
                Number.parseFloat(betAmount) < 1 ||
                Number.parseFloat(betAmount) > walletBalance ||
                isPlacing
              }
              className="flex-1"
            >
              {isPlacing ? (
                "Placing Bet..."
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Place Bet
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
