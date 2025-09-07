"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, DollarSign, TrendingUp, TrendingDown, AlertTriangle, Filter, CheckCircle } from "lucide-react"

export function FinancialManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock financial data
  const transactions = [
    {
      id: "txn-001",
      type: "deposit",
      user: "ProGamer123",
      amount: 100.0,
      method: "Credit Card",
      status: "completed",
      timestamp: "2024-01-20T10:30:00Z",
    },
    {
      id: "txn-002",
      type: "withdrawal",
      user: "ChampionPlayer",
      amount: -250.0,
      method: "Bank Transfer",
      status: "pending",
      timestamp: "2024-01-20T10:15:00Z",
    },
    {
      id: "txn-003",
      type: "wager",
      user: "SkillMaster99",
      amount: -50.0,
      method: "Wallet",
      status: "completed",
      timestamp: "2024-01-20T09:45:00Z",
    },
    {
      id: "txn-004",
      type: "win",
      user: "SniperElite",
      amount: 200.0,
      method: "Match Win",
      status: "completed",
      timestamp: "2024-01-20T09:30:00Z",
    },
    {
      id: "txn-005",
      type: "withdrawal",
      user: "FootballPro",
      amount: -500.0,
      method: "PayPal",
      status: "flagged",
      timestamp: "2024-01-20T09:00:00Z",
    },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "withdrawal":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "wager":
        return <DollarSign className="h-4 w-4 text-blue-600" />
      case "win":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Pending
          </Badge>
        )
      case "flagged":
        return (
          <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
            Flagged
          </Badge>
        )
      default:
        return null
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount))
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white">$125,430</p>
              <p className="text-xs text-emerald-500">+12.5% this month</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Deposits</p>
              <p className="text-2xl font-bold text-white">$89,250</p>
              <p className="text-xs text-blue-500">234 transactions</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg shadow-red-500/20">
              <TrendingDown className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Withdrawals</p>
              <p className="text-2xl font-bold text-white">$67,890</p>
              <p className="text-xs text-red-500">156 transactions</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending Review</p>
              <p className="text-2xl font-bold text-white">$12,450</p>
              <p className="text-xs text-yellow-500">8 transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Management */}
      <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Financial Transactions</h2>
              <p className="text-sm text-gray-400">Monitor and manage all financial transactions</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions by ID, user, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0A0B0F] border-[#2A2D36] text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>
            <Button variant="outline" className="bg-[#0A0B0F] border-[#2A2D36] text-white hover:bg-[#2A2D36] hover:text-purple-400">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Transactions Table */}
          <div className="rounded-xl border border-[#2A2D36] bg-[#0A0B0F] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#2A2D36] bg-[#1C1E24]">
                  <TableHead className="text-gray-400">Transaction ID</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">User</TableHead>
                  <TableHead className="text-gray-400">Amount</TableHead>
                  <TableHead className="text-gray-400">Method</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-b border-[#2A2D36] bg-[#0A0B0F] hover:bg-[#1C1E24] transition-colors">
                    <TableCell className="font-medium text-gray-300">{transaction.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#1C1E24] flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <span className="capitalize text-gray-300">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{transaction.user}</TableCell>
                    <TableCell>
                      <span className={transaction.amount > 0 ? "text-emerald-400" : "text-red-400 font-medium"}>
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-300">{transaction.method}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="text-gray-300">{formatTime(transaction.timestamp)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-[#1C1E24] border-[#2A2D36] text-gray-300 hover:bg-[#2A2D36] hover:text-purple-400">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {transaction.status === "flagged" && (
                          <Button size="sm" variant="outline">
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
