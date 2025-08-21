"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Calendar, Play, Eye } from "lucide-react"

interface Participant {
  id: string
  username: string
  avatar?: string
  seed: number
  status: "active" | "eliminated"
}

interface BracketMatch {
  id: string
  roundName: string
  roundNumber: number
  matchNumber: number
  participant1?: Participant
  participant2?: Participant
  winner?: Participant
  status: "pending" | "scheduled" | "in_progress" | "completed" | "bye"
  scheduledDate?: string
  score?: string
}

interface TournamentBracketProps {
  leagueId: string
  format: "knockout" | "group_stage" | "round_robin"
  participants: Participant[]
  matches: BracketMatch[]
}

export function TournamentBracket({ leagueId, format, participants, matches }: TournamentBracketProps) {
  const [selectedMatch, setSelectedMatch] = useState<BracketMatch | null>(null)

  // Group matches by round for knockout display
  const matchesByRound = matches.reduce(
    (acc, match) => {
      if (!acc[match.roundNumber]) {
        acc[match.roundNumber] = []
      }
      acc[match.roundNumber].push(match)
      return acc
    },
    {} as Record<number, BracketMatch[]>,
  )

  const getRoundName = (roundNumber: number, totalRounds: number) => {
    if (roundNumber === totalRounds) return "Final"
    if (roundNumber === totalRounds - 1) return "Semi Finals"
    if (roundNumber === totalRounds - 2) return "Quarter Finals"
    if (roundNumber === totalRounds - 3) return "Round of 16"
    if (roundNumber === totalRounds - 4) return "Round of 32"
    return `Round ${roundNumber}`
  }

  const getMatchStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>
      case "in_progress":
        return <Badge variant="default">Live</Badge>
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "bye":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
            Bye
          </Badge>
        )
      default:
        return null
    }
  }

  const MatchCard = ({ match }: { match: BracketMatch }) => (
    <Card
      className={`w-64 cursor-pointer transition-all hover:shadow-md ${
        selectedMatch?.id === match.id ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => setSelectedMatch(match)}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Match Header */}
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Match {match.matchNumber}</div>
            {getMatchStatusBadge(match.status)}
          </div>

          {/* Participants */}
          <div className="space-y-2">
            {match.participant1 ? (
              <div
                className={`flex items-center gap-2 p-2 rounded ${
                  match.winner?.id === match.participant1.id ? "bg-green-50 border border-green-200" : "bg-gray-50"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {match.participant1.seed}
                </div>
                <span className="text-sm font-medium">{match.participant1.username}</span>
                {match.winner?.id === match.participant1.id && <Trophy className="h-4 w-4 text-yellow-600 ml-auto" />}
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2 rounded bg-gray-100">
                <div className="w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
                  ?
                </div>
                <span className="text-sm text-gray-500">TBD</span>
              </div>
            )}

            <div className="text-center text-xs text-gray-500 font-bold">VS</div>

            {match.participant2 ? (
              <div
                className={`flex items-center gap-2 p-2 rounded ${
                  match.winner?.id === match.participant2.id ? "bg-green-50 border border-green-200" : "bg-gray-50"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {match.participant2.seed}
                </div>
                <span className="text-sm font-medium">{match.participant2.username}</span>
                {match.winner?.id === match.participant2.id && <Trophy className="h-4 w-4 text-yellow-600 ml-auto" />}
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2 rounded bg-gray-100">
                <div className="w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center">
                  ?
                </div>
                <span className="text-sm text-gray-500">TBD</span>
              </div>
            )}
          </div>

          {/* Match Info */}
          {match.scheduledDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              {new Date(match.scheduledDate).toLocaleDateString()}
            </div>
          )}

          {match.score && <div className="text-center text-sm font-bold text-green-600">{match.score}</div>}
        </div>
      </CardContent>
    </Card>
  )

  if (format === "knockout") {
    const totalRounds = Object.keys(matchesByRound).length

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Tournament Bracket</h3>
            <p className="text-sm text-muted-foreground">{participants.length} participants • Knockout format</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Full Screen
            </Button>
          </div>
        </div>

        {/* Bracket Visualization */}
        <div className="overflow-x-auto">
          <div className="flex gap-8 min-w-max p-4">
            {Object.entries(matchesByRound)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([roundNum, roundMatches]) => (
                <div key={roundNum} className="flex flex-col items-center gap-4">
                  <h4 className="font-semibold text-center sticky top-0 bg-background py-2">
                    {getRoundName(Number(roundNum), totalRounds)}
                  </h4>
                  <div className="flex flex-col gap-6">
                    {roundMatches.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Match Details Sidebar */}
        {selectedMatch && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Match Details</CardTitle>
              <CardDescription>
                {selectedMatch.roundName} - Match {selectedMatch.matchNumber}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Participant 1</h5>
                  {selectedMatch.participant1 ? (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">
                        {selectedMatch.participant1.seed}
                      </div>
                      <span>{selectedMatch.participant1.username}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">To be determined</span>
                  )}
                </div>
                <div>
                  <h5 className="font-medium mb-2">Participant 2</h5>
                  {selectedMatch.participant2 ? (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">
                        {selectedMatch.participant2.seed}
                      </div>
                      <span>{selectedMatch.participant2.username}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">To be determined</span>
                  )}
                </div>
              </div>

              {selectedMatch.scheduledDate && (
                <div>
                  <h5 className="font-medium mb-1">Scheduled Date</h5>
                  <p className="text-sm text-gray-600">{new Date(selectedMatch.scheduledDate).toLocaleString()}</p>
                </div>
              )}

              {selectedMatch.status === "scheduled" && (
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Start Match
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="text-center py-8 text-muted-foreground">
      <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
      <p>Group stage and round robin brackets coming soon</p>
    </div>
  )
}
