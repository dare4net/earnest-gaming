import React from 'react'
import { Gamepad2, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OpponentMatchedCard } from '@/components/match/OpponentMatchedCard'
import { PotentialOpponentsPanel } from '@/components/match/PotentialOpponentsPanel'

interface MatchSetupSectionProps {
  matchId?: string
  entryFee?: number
  playerUsername?: string
  playerRating?: number
  opponent?: { username?: string; avatar?: string; rating?: number } | null
  hasFoundMatch: boolean
  searchingText: string
  // Opponents list props
  loadingOpponents: boolean
  opponentsError: string
  potentialOpponents: any[]
  currentOpponentIdx: number
  setCurrentOpponentIdx: (n: number) => void
  matchingWithId: string | null
  onReloadOpponents: () => Promise<void> | void
  onRequestMatch: (userId: string) => Promise<void>
  // Match-by-ID form
  specificPlayerId: string
  setSpecificPlayerId: (v: string) => void
  onSpecificMatch: () => Promise<void>
  // Start match
  onStartMatch: () => void
}

export function MatchSetupSection({
  matchId,
  entryFee,
  playerUsername,
  playerRating,
  opponent,
  hasFoundMatch,
  searchingText,
  loadingOpponents,
  opponentsError,
  potentialOpponents,
  currentOpponentIdx,
  setCurrentOpponentIdx,
  matchingWithId,
  onReloadOpponents,
  onRequestMatch,
  specificPlayerId,
  setSpecificPlayerId,
  onSpecificMatch,
  onStartMatch,
}: MatchSetupSectionProps) {
  return (
    <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
      <div className="border-b border-[#2A2D36] p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="responsive-text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-emerald-500" />
              Match Setup
            </h2>
            <p className="text-gray-400 responsive-text">
              {hasFoundMatch ? 'Opponent found! Prepare for the match.' : 'Finding a suitable opponent...'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium responsive-text">₦{(entryFee || 0).toLocaleString()} Wager</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-11 sm:grid-cols-7 items-center gap-2 sm:gap-4">
          {/* Player Card */}
          <div className="col-span-5 sm:col-span-3 bg-[#15171B] rounded-xl p-3 sm:p-6 border border-[#2A2D36]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
              <img src="/placeholder-user.jpg" alt={playerUsername || 'You'} className="w-16 h-16 rounded-xl border-2 border-emerald-500 shadow-lg flex-shrink-0" />
              <div className="flex flex-col items-center sm:items-start">
                <div className="font-bold text-base sm:text-lg text-white truncate max-w-[120px] sm:max-w-full">{playerUsername || 'You'}</div>
                <div className="flex flex-col items-center sm:items-start gap-2 mt-2">
                  <div className="bg-[#1C1E24] px-2 py-0.5 rounded text-xs sm:text-sm text-gray-400 truncate max-w-[120px]">Rating: {playerRating || 0}</div>
                  <div className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] sm:text-xs">You</div>
                </div>
              </div>
            </div>
          </div>

          {/* VS Section */}
          <div className="col-span-1 flex flex-col items-center justify-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-500">VS</div>
            <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">#{matchId}</div>
          </div>

          {/* Opponent Column */}
          <div className="col-span-5 sm:col-span-3 bg-[#15171B] rounded-xl p-3 sm:p-6 border border-[#2A2D36]">
            {opponent?.username ? (
              <OpponentMatchedCard avatar={opponent?.avatar} username={opponent?.username} rating={opponent?.rating} />
            ) : (
              <>
                <PotentialOpponentsPanel
                  loading={loadingOpponents}
                  error={opponentsError}
                  users={potentialOpponents as any}
                  currentIdx={currentOpponentIdx}
                  setCurrentIdx={setCurrentOpponentIdx}
                  onReload={onReloadOpponents}
                  matchingWithId={matchingWithId}
                  onRequestMatch={onRequestMatch}
                />
                <div className="mt-4 pt-3 border-t border-[#2A2D36]">
                  <div className="text-sm text-gray-300 mb-2">Match with specific player (ID)</div>
                  <div className="flex items-center gap-2">
                    <input
                      value={specificPlayerId}
                      onChange={(e) => setSpecificPlayerId(e.target.value)}
                      placeholder="Enter player ID"
                      className="flex-1 h-10 px-3 rounded bg-[#1C1E24] border border-[#2A2D36] text-sm text-white"
                    />
                    <Button className="h-10" disabled={!specificPlayerId || matchingWithId === specificPlayerId} onClick={onSpecificMatch}>
                      {matchingWithId === specificPlayerId ? 'Matching…' : 'Match'}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 border-t border-[#2A2D36] pt-6">
          <Button onClick={onStartMatch} className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium">
            Start Match
          </Button>
        </div>
      </div>
    </div>
  )
}



