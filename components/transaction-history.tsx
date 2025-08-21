import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Trophy, Clock, CheckCircle, XCircle } from "lucide-react"

interface Transaction {
  id: string
  type: "win" | "wager" | "deposit" | "withdraw"
  amount: number
  description: string
  timestamp: string
  status: "completed" | "pending" | "failed"
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "win":
        return <Trophy className="h-4 w-4 text-green-600" />
      case "wager":
        return <DollarSign className="h-4 w-4 text-blue-600" />
      case "deposit":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "withdraw":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "pending":
        return <Clock className="h-3 w-3 text-yellow-600" />
      case "failed":
        return <XCircle className="h-3 w-3 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  const formatAmount = (amount: number) => {
    const isPositive = amount > 0
    return (
      <span className={isPositive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
        {isPositive ? "+" : ""}${Math.abs(amount).toFixed(2)}
      </span>
    )
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No transactions found</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">{getTransactionIcon(transaction.type)}</div>
                <div>
                  <div className="font-medium text-sm">{transaction.description}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    {getStatusIcon(transaction.status)}
                    {formatDate(transaction.timestamp)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{formatAmount(transaction.amount)}</div>
                <div className="mt-1">{getStatusBadge(transaction.status)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
