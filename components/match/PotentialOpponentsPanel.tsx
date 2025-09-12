import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react'

interface UserLite {
  _id: string
  username: string
  avatar?: string
  rank?: number
  winRate?: number
}

interface PotentialOpponentsPanelProps {
  loading: boolean
  error: string
  users: UserLite[]
  currentIdx: number
  setCurrentIdx: (n: number) => void
  onReload: () => Promise<void> | void
  onRequestMatch: (userId: string) => Promise<void>
  matchingWithId: string | null
}

export function PotentialOpponentsPanel({ loading, error, users, currentIdx, setCurrentIdx, onReload, onRequestMatch, matchingWithId }: PotentialOpponentsPanelProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold text-white responsive-text">Potential Opponents</div>
        <Button variant="ghost" className="h-8" onClick={onReload} disabled={loading}>
          {loading ? 'Loading...' : 'Reload'}
        </Button>
      </div>
      {error && (
        <div className="text-sm text-red-400 mb-2">{error}</div>
      )}

      {/* Mobile carousel */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-xs text-gray-400">{users.length ? currentIdx + 1 : 0}/{users.length}</div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentIdx(Math.min(users.length - 1, currentIdx + 1))} disabled={currentIdx >= users.length - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="bg-[#1C1E24] rounded-xl p-3 border border-[#2A2D36]">
          {users.length > 0 ? (
            (() => {
              const u = users[currentIdx]
              return (
                <div className="flex flex-col items-center text-center gap-3">
                  <img src={u?.avatar || '/placeholder-user.jpg'} alt={u?.username} className="w-16 h-16 rounded-xl border-2 border-blue-500" />
                  <div>
                    <div className="font-bold text-white text-base truncate max-w-[160px]">{u?.username}</div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="bg-[#1C1E24] px-2 py-0.5 rounded text-xs text-gray-400">Rank {u?.rank || 0}</div>
                      <div className="bg-[#1C1E24] px-2 py-0.5 rounded text-xs text-gray-400">WinRate {(u?.winRate || 0)}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" className="h-10 w-10" disabled={matchingWithId === u._id} onClick={() => onRequestMatch(u._id)}>
                      {matchingWithId === u._id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-500 border-t-transparent" />
                      ) : (
                        <Zap className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              )
            })()
          ) : (
            <div className="text-sm text-gray-400 text-center">{loading ? 'Fetching online players...' : 'No online players found. Try reload.'}</div>
          )}
        </div>
      </div>

      {/* Desktop list */}
      <div className="hidden sm:block">
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {loading && users.length === 0 && (
            <div className="text-sm text-gray-400">Fetching online players...</div>
          )}
          {users.map((u) => (
            <div key={u._id} className="flex items-center justify-between bg-[#1C1E24] rounded-lg p-2 border border-[#2A2D36]">
              <div className="flex items-center gap-3">
                <img src={u.avatar || '/placeholder-user.jpg'} alt={u.username} className="w-8 h-8 rounded" />
                <div>
                  <div className="text-white text-sm font-medium">{u.username}</div>
                  <div className="text-[11px] text-gray-400">Rank {u.rank || 0} • WinRate {(u.winRate || 0)}%</div>
                </div>
              </div>
              <Button
                size="sm"
                className="h-8"
                disabled={matchingWithId === u._id}
                onClick={() => onRequestMatch(u._id)}
              >
                {matchingWithId === u._id ? 'Matching…' : 'Request match'}
              </Button>
            </div>
          ))}
          {!loading && users.length === 0 && (
            <div className="text-sm text-gray-400">No online players found. Try reload.</div>
          )}
        </div>
      </div>
    </>
  )
}


