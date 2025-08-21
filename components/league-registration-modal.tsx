"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trophy, Users, Calendar, DollarSign, Shield, AlertTriangle, CheckCircle, Wallet, Clock } from "lucide-react"

interface League {
  id: string
  name: string
  gameType: string
  gameIcon: string
  status: string
  participants: number
  maxParticipants: number
  entryFee: number
  prizePool: number
  registrationEnd: string
  tournamentStart: string
  format: string
  description: string
  requirements: string[]
}

interface LeagueRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  league: League | null
}

export function LeagueRegistrationModal({ isOpen, onClose, league }: LeagueRegistrationModalProps) {
  const [step, setStep] = useState<"details" | "requirements" | "payment" | "confirmation">("details")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedRequirements, setAcceptedRequirements] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">("wallet")

  // Mock user wallet balance
  const walletBalance = 127.5

  const handleRegistration = () => {
    // TODO: Implement actual registration logic
    console.log("Registering for league:", league?.id)
    setStep("confirmation")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const resetModal = () => {
    setStep("details")
    setAcceptedTerms(false)
    setAcceptedRequirements(false)
    setPaymentMethod("wallet")
    onClose()
  }

  if (!league) return null

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="text-2xl">{league.gameIcon}</div>
            Register for {league.name}
          </DialogTitle>
          <DialogDescription>Complete your tournament registration</DialogDescription>
        </DialogHeader>

        {step === "details" && (
          <div className="space-y-6">
            {/* Tournament Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tournament Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">
                      {league.participants}/{league.maxParticipants} participants
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm capitalize">{league.format} format</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{formatDate(league.tournamentStart)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Reg. ends {formatDate(league.registrationEnd)}</span>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{formatCurrency(league.prizePool)}</div>
                    <div className="text-sm text-green-700 dark:text-green-400">Total Prize Pool</div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{league.description}</p>
              </CardContent>
            </Card>

            {/* Entry Fee */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Entry Fee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">Tournament Entry</span>
                  <span className="text-2xl font-bold">{formatCurrency(league.entryFee)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={() => setStep(league.requirements.length > 0 ? "requirements" : "payment")}
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === "requirements" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Tournament Requirements
                </CardTitle>
                <CardDescription>Please review and accept the following requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {league.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">{requirement}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        This requirement must be met during all tournament matches
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id="requirements"
                    checked={acceptedRequirements}
                    onCheckedChange={(checked) => setAcceptedRequirements(checked as boolean)}
                  />
                  <label
                    htmlFor="requirements"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I understand and agree to meet all tournament requirements
                  </label>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("details")} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep("payment")} disabled={!acceptedRequirements} className="flex-1">
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Wallet Payment */}
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setPaymentMethod("wallet")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">Gaming Wallet</div>
                        <div className="text-sm text-muted-foreground">Balance: {formatCurrency(walletBalance)}</div>
                      </div>
                    </div>
                    {walletBalance >= league.entryFee ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>

                {/* Insufficient Balance Warning */}
                {walletBalance < league.entryFee && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Insufficient wallet balance. You need {formatCurrency(league.entryFee - walletBalance)} more to
                      register. Please add funds to your wallet first.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the tournament terms and conditions
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Registration Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Registration Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tournament:</span>
                    <span className="font-medium">{league.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entry Fee:</span>
                    <span className="font-medium">{formatCurrency(league.entryFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-medium">Gaming Wallet</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(league.entryFee)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("requirements")} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleRegistration}
                disabled={!acceptedTerms || walletBalance < league.entryFee}
                className="flex-1"
              >
                Complete Registration
              </Button>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Registration Successful!</h3>
              <p className="text-muted-foreground">
                You have successfully registered for {league.name}. Good luck in the tournament!
              </p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tournament:</span>
                    <span className="font-medium">{league.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tournament Starts:</span>
                    <span className="font-medium">{formatDate(league.tournamentStart)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entry Fee Paid:</span>
                    <span className="font-medium text-green-600">{formatCurrency(league.entryFee)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button onClick={resetModal} className="w-full">
                Close
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                View Tournament Details
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
