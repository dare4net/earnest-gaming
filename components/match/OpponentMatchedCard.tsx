import React from 'react'

interface OpponentMatchedCardProps {
  avatar?: string
  username?: string
  rating?: number
}

export function OpponentMatchedCard({ avatar, username, rating }: OpponentMatchedCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 w-full overflow-hidden">
      <img
        src={avatar || '/placeholder-user.jpg'}
        alt={username || 'Opponent'}
        className="w-16 h-16 rounded-xl border-2 border-blue-500 flex-shrink-0"
      />
      <div className="flex-1 min-w-0 w-full">
        <div className="font-bold text-base sm:text-lg text-white truncate max-w-full">{username || 'Opponent'}</div>
        <div className="flex flex-col items-center sm:items-start gap-1 mt-2 w-full">
          <div className="bg-[#1C1E24] px-2 py-0.5 rounded text-xs sm:text-sm text-gray-400 truncate max-w-full">
            Rating: {rating || 0}
          </div>
          <div className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-[10px] sm:text-xs">
            Opponent
          </div>
        </div>
      </div>
    </div>
  )
}


