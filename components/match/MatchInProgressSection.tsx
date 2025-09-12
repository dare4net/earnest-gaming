import React from 'react'
import { Gamepad2, AlertTriangle, CheckCircle, MessageSquare, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MatchInProgressSectionProps {
  gameTimer: number
  playerUsername?: string
  playerRating?: number
  opponentUsername?: string
  opponentAvatar?: string
  opponentRating?: number
  onEndGame: () => void
  onOpenChat: () => void
}

export function MatchInProgressSection({ gameTimer, playerUsername, playerRating, opponentUsername, opponentAvatar, opponentRating, onEndGame, onOpenChat }: MatchInProgressSectionProps) {
  return (
    <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="responsive-text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-emerald-500" />
              Match in Progress
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-emerald-400 font-medium responsive-text">
                {`${Math.floor(gameTimer / 60)}:${(gameTimer % 60).toString().padStart(2, '0')} Remaining`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg">
              <Clock className="h-4 w-4" />
              <span className="font-medium responsive-text">Live Match</span>
            </div>
          </div>
        </div>

        <div className="bg-[#15171B] rounded-xl p-6 border border-[#2A2D36]">
          <div className="grid grid-cols-1 sm:grid-cols-11 gap-6 sm:gap-4">
            <div className="sm:col-span-5">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
                <img src="/placeholder-user.jpg" alt={playerUsername || 'You'} className="w-16 h-16 rounded-xl border-2 border-emerald-500 flex-shrink-0" />
                <div>
                  <div className="font-bold text-base sm:text-lg text-white truncate">{playerUsername || 'You'}</div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <div className="bg-[#1C1E24] px-2 py-0.5 rounded text-xs sm:text-sm text-gray-400 truncate">Rating: {playerRating || 0}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:col-span-1 flex flex-col items-center justify-center">
              <div className="text-xl sm:text-2xl font-bold text-emerald-500">VS</div>
            </div>
            <div className="sm:col-span-5">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
                <img src={opponentAvatar || '/placeholder-user.jpg'} alt={opponentUsername || 'Opponent'} className="w-16 h-16 rounded-xl border-2 border-blue-500 flex-shrink-0" />
                <div>
                  <div className="font-bold text-base sm:text-lg text-white truncate">{opponentUsername || 'Waiting...'}</div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <div className="bg-[#1C1E24] px-2 py-0.5 rounded text-xs sm:text-sm text-gray-400 truncate">Rating: {opponentRating || 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <div className="font-medium text-red-400 responsive-text">Important: Match Verification Required</div>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                After the match, both players must submit screenshots of the final score for verification.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button onClick={onEndGame} className="h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium">
            <CheckCircle className="h-5 w-5 mr-2" />
            End Match
          </Button>
          <Button className="h-12 bg-[#2A2D36] hover:bg-[#353841] text-white rounded-lg font-medium" onClick={onOpenChat}>
            <MessageSquare className="h-5 w-5 mr-2" />
            Match Chat
          </Button>
        </div>
      </div>
    </div>
  )
}


