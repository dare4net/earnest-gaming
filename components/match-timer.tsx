import { Progress } from "@/components/ui/progress"
import { Clock, AlertTriangle } from "lucide-react"

interface MatchTimerProps {
  timeRemaining: number
}

export function MatchTimer({ timeRemaining }: MatchTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressPercentage = () => {
    return ((600 - timeRemaining) / 600) * 100
  }

  const isUrgent = timeRemaining <= 120 // Last 2 minutes

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className={`h-5 w-5 ${isUrgent ? "text-red-500" : "text-blue-500"}`} />
          <span className="font-medium">Time Remaining</span>
        </div>
        <div className={`text-2xl font-bold ${isUrgent ? "text-red-500" : "text-blue-500"}`}>
          {formatTime(timeRemaining)}
        </div>
      </div>

      <Progress value={getProgressPercentage()} className="h-3" />

      {isUrgent && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>Hurry! Upload your screenshot before time runs out</span>
        </div>
      )}

      <div className="text-xs text-muted-foreground text-center">
        Both players must upload screenshots within this window
      </div>
    </div>
  )
}
