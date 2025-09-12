import React from 'react'
import { Trophy } from 'lucide-react'

export function StatsSidebar() {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
        <div className="p-6">
          <h3 className="font-bold text-base sm:text-lg text-white mb-4">Match Statistics</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">Win Rate</span>
                <span className="text-emerald-400">76%</span>
              </div>
              <div className="h-2 bg-[#15171B] rounded-full overflow-hidden">
                <div className="h-full w-[76%] bg-emerald-500 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">Recent Form</span>
                <span className="text-white">W W L W W</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#15171B] rounded-lg p-3">
                <div className="text-xl sm:text-2xl font-bold text-white">147</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1">Total Matches</div>
              </div>
              <div className="bg-[#15171B] rounded-lg p-3">
                <div className="text-xl sm:text-2xl font-bold text-emerald-400">$2.4K</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1">Total Earnings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
        <div className="p-6">
          <h3 className="font-bold text-base sm:text-lg text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1,2,3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#15171B] rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Won vs PlayerXYZ</div>
                  <div className="text-[11px] sm:text-xs text-gray-400 mt-0.5">2 hours ago • $50 Prize</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


