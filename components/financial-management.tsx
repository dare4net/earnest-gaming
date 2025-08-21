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
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "flagged":
        return <Badge variant="destructive">Flagged</Badge>
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
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">Total Revenue</span>
            </div>
            <div className="text-2xl font-bold">$125,430</div>
            <div className="text-xs text-green-600">+12.5% this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-muted-foreground">Total Deposits</span>
            </div>
            <div className="text-2xl font-bold">$89,250</div>
            <div className="text-xs text-blue-600">234 transactions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="text-sm text-muted-foreground">Total Withdrawals</span>
            </div>
            <div className="text-2xl font-bold">$67,890</div>
            <div className="text-xs text-red-600">156 transactions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-muted-foreground">Pending Review</span>
            </div>
            <div className="text-2xl font-bold">$12,450</div>
            <div className="text-xs text-yellow-600">8 transactions</div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Financial Transactions
          </CardTitle>
          <CardDescription>Monitor and manage all financial transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions by ID, user, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Transactions Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>
                      <span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.method}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>{formatTime(transaction.timestamp)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
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
        </CardContent>
      </Card>
    </div>
  )
}
