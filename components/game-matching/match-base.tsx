import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

interface MatchBaseProps {
  title: string
  icon: React.ReactNode
  description: string
  onlineCount: number
  children: React.ReactNode
}

export function MatchBase({ title, icon, description, onlineCount, children }: MatchBaseProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
        <div className="p-6 border-b border-[#2A2D36]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                {icon}
              </div>
              <h2 className="responsive-text-xl font-bold text-white">{title}</h2>
            </div>
            <Badge variant="outline" className="bg-[#15171B] border-[#2A2D36] hover:bg-[#15171B] hover:border-emerald-500/50">
              <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-500 mr-1" />
              <span className="text-caption sm:text-body-sm text-emerald-500">{onlineCount}k</span>
            </Badge>
          </div>
        </div>
        <div className="p-6 space-y-6 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#2A2D36] scrollbar-track-[#15171B]">
          {children}
        </div>
      </div>
      </div>
  )
}
