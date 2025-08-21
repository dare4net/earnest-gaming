"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Smartphone, DollarSign, AlertTriangle, Clock } from "lucide-react"

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [amount, setAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("bank")

  const availableBalance = 1247.5 // Mock balance

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement withdrawal logic
    console.log("Withdraw:", { amount, withdrawMethod })
    onClose()
  }

  const quickAmounts = [50, 100, 250, 500, 1000]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-red-600" />
            Withdraw Funds
          </DialogTitle>
          <DialogDescription>Transfer money from your gaming wallet</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleWithdraw} className="space-y-6">
          {/* Available Balance */}
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-sm text-muted-foreground">Available Balance</div>
            <div className="text-2xl font-bold text-foreground">${availableBalance.toFixed(2)}</div>
          </div>

          {/* Amount Selection */}
          <div className="space-y-4">
            <Label htmlFor="withdraw-amount">Withdrawal Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="0.00"
                className="pl-10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="10"
                max={availableBalance}
                step="0.01"
                required
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="flex gap-2 flex-wrap">
              {quickAmounts
                .filter((amt) => amt <= availableBalance)
                .map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                  >
                    ${quickAmount}
                  </Button>
                ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setAmount(availableBalance.toString())}>
                Max
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              Minimum: $10 • Maximum: ${availableBalance.toFixed(2)} (available balance)
            </div>
          </div>

          {/* Withdrawal Methods */}
          <Tabs value={withdrawMethod} onValueChange={setWithdrawMethod}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
              <TabsTrigger value="mobile">Mobile Wallet</TabsTrigger>
            </TabsList>

            <TabsContent value="bank">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Bank Transfer
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Direct transfer to your bank account (1-3 business days)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="bank-name" className="text-xs">
                      Bank Name
                    </Label>
                    <Input id="bank-name" placeholder="Enter bank name" className="text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="account-number" className="text-xs">
                        Account Number
                      </Label>
                      <Input id="account-number" placeholder="Account number" className="text-sm" />
                    </div>
                    <div>
                      <Label htmlFor="routing-number" className="text-xs">
                        Routing Number
                      </Label>
                      <Input id="routing-number" placeholder="Routing number" className="text-sm" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="account-holder" className="text-xs">
                      Account Holder Name
                    </Label>
                    <Input id="account-holder" placeholder="Full name on account" className="text-sm" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mobile">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Mobile Wallet
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Transfer to PayPal, Venmo, or Cash App (instant)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="wallet-type" className="text-xs">
                      Wallet Type
                    </Label>
                    <select className="w-full p-2 border rounded text-sm">
                      <option value="paypal">PayPal</option>
                      <option value="venmo">Venmo</option>
                      <option value="cashapp">Cash App</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="wallet-email" className="text-xs">
                      Email/Username
                    </Label>
                    <Input id="wallet-email" placeholder="Enter email or username" className="text-sm" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Processing Time Notice */}
          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-orange-800 dark:text-orange-200">
                <strong>Processing Time:</strong> Bank transfers take 1-3 business days. Mobile wallet transfers are
                usually instant but may take up to 24 hours.
              </div>
            </div>
          </div>

          {/* Warning for Large Amounts */}
          {Number.parseFloat(amount) > 500 && (
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-yellow-800 dark:text-yellow-200">
                  <strong>Large Withdrawal:</strong> Withdrawals over $500 may require additional verification and could
                  take longer to process.
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!amount || Number.parseFloat(amount) < 10 || Number.parseFloat(amount) > availableBalance}
              className="flex-1"
            >
              Withdraw ${amount || "0.00"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
