import React from 'react'
import { Clock, CheckCircle } from 'lucide-react'
import { ScreenshotUpload } from '@/components/screenshot-upload'

interface VerificationSectionProps {
  timeRemaining: number
  playerScreenshot: File | null
  opponentUsername?: string
  onUpload: (file: File) => void
}

export function VerificationSection({ timeRemaining, playerScreenshot, opponentUsername, onUpload }: VerificationSectionProps) {
  return (
    <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="responsive-text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              Match Verification
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
              <p className="text-yellow-400 font-medium responsive-text">
                {`${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')} Remaining`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-3 py-1.5 rounded-lg">
              <Clock className="h-4 w-4" />
              <span className="font-medium responsive-text">Verification Required</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Your Screenshot */}
          <div className="bg-[#15171B] rounded-xl p-6 border border-[#2A2D36]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white responsive-text">Your Screenshot</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Upload your match result</p>
              </div>
              {playerScreenshot && (
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Uploaded</span>
                </div>
              )}
            </div>
            <ScreenshotUpload onUpload={onUpload} uploaded={!!playerScreenshot} playerName="You" />
          </div>

          {/* Opponent Screenshot */}
          <div className="bg-[#15171B] rounded-xl p-6 border border-[#2A2D36]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white responsive-text">Opponent's Screenshot</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">{opponentUsername || 'Opponent'}'s submission</p>
              </div>
            </div>
            <div className="flex items-center justify-center h-[200px]">
              <div className="text-center">
                <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                <div className="font-medium text-yellow-400 responsive-text">Awaiting Submission</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Opponent hasn't uploaded yet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


