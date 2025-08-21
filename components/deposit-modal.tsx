"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Smartphone, Building, DollarSign, Shield } from "lucide-react"

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement deposit logic
    console.log("Deposit:", { amount, paymentMethod })
    onClose()
  }

  const quickAmounts = [25, 50, 100, 250, 500]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Deposit Funds
          </DialogTitle>
          <DialogDescription>Add money to your gaming wallet securely</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleDeposit} className="space-y-6">
          {/* Amount Selection */}
          <div className="space-y-4">
            <Label htmlFor="amount">Deposit Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="pl-10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="5"
                max="2000"
                step="0.01"
                required
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((quickAmount) => (
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
            </div>

            <div className="text-xs text-muted-foreground">Minimum: $5 • Maximum: $2,000 per transaction</div>
          </div>

          {/* Payment Methods */}
          <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="bank">Bank</TabsTrigger>
            </TabsList>

            <TabsContent value="card">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Credit/Debit Card
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Instant deposit with Visa, Mastercard, or American Express
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="card-number" className="text-xs">
                        Card Number
                      </Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" className="text-sm" />
                    </div>
                    <div>
                      <Label htmlFor="expiry" className="text-xs">
                        Expiry
                      </Label>
                      <Input id="expiry" placeholder="MM/YY" className="text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="cvv" className="text-xs">
                        CVV
                      </Label>
                      <Input id="cvv" placeholder="123" className="text-sm" />
                    </div>
                    <div>
                      <Label htmlFor="name" className="text-xs">
                        Cardholder Name
                      </Label>
                      <Input id="name" placeholder="John Doe" className="text-sm" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mobile">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Mobile Payment
                  </CardTitle>
                  <CardDescription className="text-xs">Pay with Apple Pay, Google Pay, or Samsung Pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      Apple Pay
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      Google Pay
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      Samsung Pay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bank">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Bank Transfer
                  </CardTitle>
                  <CardDescription className="text-xs">Direct bank transfer (1-3 business days)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="bank-account" className="text-xs">
                      Bank Account Number
                    </Label>
                    <Input id="bank-account" placeholder="Enter account number" className="text-sm" />
                  </div>
                  <div>
                    <Label htmlFor="routing" className="text-xs">
                      Routing Number
                    </Label>
                    <Input id="routing" placeholder="Enter routing number" className="text-sm" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Security Notice */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800 dark:text-blue-200">
                <strong>Secure Transaction:</strong> All payments are encrypted and processed through our secure payment
                partners. Your financial information is never stored on our servers.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={!amount || Number.parseFloat(amount) < 5} className="flex-1">
              Deposit ${amount || "0.00"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
