import React from 'react'
import { Trophy } from 'lucide-react'

interface MatchHeaderProps {
  isLeagueMatch: boolean
  leagueData?: { name?: string; round?: string; group?: string }
  matchId?: string
  game?: 'CODM' | 'FIFA' | 'eFootball' | string
  matchStatus: 'matching' | 'playing' | 'verification' | 'finished'
  searchingText: string
}

export function MatchHeader({ isLeagueMatch, leagueData, matchId, game, matchStatus, searchingText }: MatchHeaderProps) {
  return (
    <header className="border-b border-[#2A2D36] bg-[#141519]/95 backdrop-blur-lg sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-base sm:text-xl shadow-lg shadow-emerald-500/20">
            {game === 'CODM' ? '🔫' : game === 'FIFA' ? '⚽' : '🎮'}
          </div>
          <div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h1 className="responsive-text-lg md:text-2xl font-bold text-white tracking-tight">
                {isLeagueMatch ? (leagueData?.name || 'League') : `Match #${matchId}`}
              </h1>
              <div className="flex items-center gap-1.5 bg-[#1C1E24] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs sm:text-sm text-emerald-500 font-medium">Live</span>
              </div>
            </div>
            {isLeagueMatch && (
              <p className="responsive-text text-gray-400 mt-0.5">
                {`${leagueData?.round || ''} - ${leagueData?.group || ''}`}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {isLeagueMatch && (
            <div className="hidden md:flex items-center gap-2 bg-[#231F0E] text-yellow-500 px-3 py-1.5 rounded-lg border border-yellow-500/20">
              <Trophy className="h-4 w-4" />
              <span className="font-medium">Tournament</span>
            </div>
          )}
          <div className={`
            px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg font-medium flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm
            ${matchStatus === 'matching' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
              matchStatus === 'playing' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
              matchStatus === 'verification' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
              'bg-gray-500/10 text-gray-400 border border-gray-500/20'}
          `}>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              matchStatus === 'matching' ? 'bg-blue-400 animate-pulse' :
              matchStatus === 'playing' ? 'bg-emerald-400' :
              matchStatus === 'verification' ? 'bg-yellow-400' : 'bg-gray-400'
            }`}></div>
            <span className="truncate responsive-text">
              {matchStatus === 'matching' && searchingText}
              {matchStatus === 'playing' && 'Live'}
              {matchStatus === 'verification' && 'Verify'}
              {matchStatus === 'finished' && 'Complete'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}


