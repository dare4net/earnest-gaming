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

  type TransactionType = "win" | "wager" | "deposit" | "withdraw";
  type TransactionStatus = "completed" | "pending" | "failed";

  interface WalletData {
    balance: number;
    pendingWins: number;
    totalDeposited: number;
    totalWithdrawn: number;
    totalWagered: number;
    totalWon: number;
  }

  interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    description: string;
    timestamp: string;
    status: TransactionStatus;
  }

  // Mock wallet data
  const walletData: WalletData = {
    balance: 1247.5,
    pendingWins: 125.0,
    totalDeposited: 2500.0,
    totalWithdrawn: 1500.0,
    totalWagered: 8750.0,
    totalWon: 4250.0,
  }

  const recentTransactions: Transaction[] = [
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
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <header className="border-b border-[#2A2D36] bg-[#141519]/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-[#1C1E24]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">My Wallet</h1>
            </div>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Verified Account
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-20 pb-8 max-w-6xl">
        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2 bg-[#1C1E24] border-[#2A2D36]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Available Balance</div>
                  <p className="text-sm text-gray-400 mt-1">Your current gaming wallet balance</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent mb-6">
                ${walletData.balance.toFixed(2)}
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowDeposit(true)} 
                  className="flex-1 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Deposit
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowWithdraw(true)} 
                  className="flex-1 h-12 bg-[#2A2D36] hover:bg-[#353841] text-white rounded-lg font-medium border-0"
                >
                  <Minus className="h-5 w-5 mr-2" />
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1E24] border-[#2A2D36]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Pending Wins</div>
                  <p className="text-sm text-gray-400 mt-1">Awaiting verification</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">+${walletData.pendingWins.toFixed(2)}</div>
              <div className="text-sm text-gray-400 mt-2">2 matches pending</div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#1C1E24] border-[#2A2D36]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Deposited</p>
                  <p className="text-xl font-bold text-white mt-1">${walletData.totalDeposited.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1E24] border-[#2A2D36]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <TrendingDown className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Withdrawn</p>
                  <p className="text-xl font-bold text-white mt-1">${walletData.totalWithdrawn.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1E24] border-[#2A2D36]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Wagered</p>
                  <p className="text-xl font-bold text-white mt-1">${walletData.totalWagered.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1E24] border-[#2A2D36]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Won</p>
                  <p className="text-xl font-bold text-emerald-500 mt-1">${walletData.totalWon.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="bg-[#1C1E24] border-[#2A2D36]">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <History className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">Transaction History</div>
                <p className="text-sm text-gray-400 mt-1">Your recent wallet activity</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-[#0A0B0F] border border-[#2A2D36] p-1">
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:bg-[#2A2D36] data-[state=active]:text-white text-gray-400 hover:text-gray-300"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="deposits"
                  className="data-[state=active]:bg-[#2A2D36] data-[state=active]:text-white text-gray-400 hover:text-gray-300"
                >
                  Deposits
                </TabsTrigger>
                <TabsTrigger 
                  value="withdrawals"
                  className="data-[state=active]:bg-[#2A2D36] data-[state=active]:text-white text-gray-400 hover:text-gray-300"
                >
                  Withdrawals
                </TabsTrigger>
                <TabsTrigger 
                  value="wagers"
                  className="data-[state=active]:bg-[#2A2D36] data-[state=active]:text-white text-gray-400 hover:text-gray-300"
                >
                  Wagers
                </TabsTrigger>
                <TabsTrigger 
                  value="wins"
                  className="data-[state=active]:bg-[#2A2D36] data-[state=active]:text-white text-gray-400 hover:text-gray-300"
                >
                  Wins
                </TabsTrigger>
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
