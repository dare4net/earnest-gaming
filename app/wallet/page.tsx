"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  ArrowLeft,
  Plus,
  Minus,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  DollarSign,
  History,
} from "lucide-react"
import Link from "next/link"
import { DepositModal } from "@/components/deposit-modal"
import { WithdrawModal } from "@/components/withdraw-modal"
import { TransactionHistory } from "@/components/transaction-history"

export default function WalletPage() {
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)

  // Mock wallet data
  const walletData = {
    balance: 1247.5,
    pendingWins: 125.0,
    totalDeposited: 2500.0,
    totalWithdrawn: 1500.0,
    totalWagered: 8750.0,
    totalWon: 4250.0,
  }

  const recentTransactions = [
    {
      id: "1",
      type: "win",
      amount: 50.0,
      description: "FIFA match victory vs Player123",
      timestamp: "2024-01-20T10:30:00Z",
      status: "completed",
    },
    {
      id: "2",
      type: "wager",
      amount: -25.0,
      description: "eFootball match wager",
      timestamp: "2024-01-20T09:15:00Z",
      status: "completed",
    },
    {
      id: "3",
      type: "deposit",
      amount: 100.0,
      description: "Credit card deposit",
      timestamp: "2024-01-19T16:45:00Z",
      status: "completed",
    },
    {
      id: "4",
      type: "withdraw",
      amount: -75.0,
      description: "Bank transfer withdrawal",
      timestamp: "2024-01-19T14:20:00Z",
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">My Wallet</h1>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Verified Account
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Available Balance
              </CardTitle>
              <CardDescription>Your current gaming wallet balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground mb-4">${walletData.balance.toFixed(2)}</div>
              <div className="flex gap-3">
                <Button onClick={() => setShowDeposit(true)} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Deposit
                </Button>
                <Button variant="outline" onClick={() => setShowWithdraw(true)} className="flex-1">
                  <Minus className="h-4 w-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Wins</CardTitle>
              <CardDescription>Awaiting verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+${walletData.pendingWins.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground mt-2">2 matches pending</div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Total Deposited</span>
              </div>
              <div className="text-xl font-bold">${walletData.totalDeposited.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="text-sm text-muted-foreground">Total Withdrawn</span>
              </div>
              <div className="text-xl font-bold">${walletData.totalWithdrawn.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">Total Wagered</span>
              </div>
              <div className="text-xl font-bold">${walletData.totalWagered.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Total Won</span>
              </div>
              <div className="text-xl font-bold text-green-600">${walletData.totalWon.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Transaction History
            </CardTitle>
            <CardDescription>Your recent wallet activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                <TabsTrigger value="wagers">Wagers</TabsTrigger>
                <TabsTrigger value="wins">Wins</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <TransactionHistory transactions={recentTransactions} />
              </TabsContent>

              <TabsContent value="deposits" className="mt-6">
                <TransactionHistory transactions={recentTransactions.filter((t) => t.type === "deposit")} />
              </TabsContent>

              <TabsContent value="withdrawals" className="mt-6">
                <TransactionHistory transactions={recentTransactions.filter((t) => t.type === "withdraw")} />
              </TabsContent>

              <TabsContent value="wagers" className="mt-6">
                <TransactionHistory transactions={recentTransactions.filter((t) => t.type === "wager")} />
              </TabsContent>

              <TabsContent value="wins" className="mt-6">
                <TransactionHistory transactions={recentTransactions.filter((t) => t.type === "win")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <DepositModal isOpen={showDeposit} onClose={() => setShowDeposit(false)} />
      <WithdrawModal isOpen={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>
  )
}
