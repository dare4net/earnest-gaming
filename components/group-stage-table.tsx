"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp } from "lucide-react"

interface GroupStanding {
  id: string
  participantId: string
  username: string
  avatar?: string
  groupName: string
  matchesPlayed: number
  wins: number
  losses: number
  draws: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  position: number
  status: "qualified" | "eliminated" | "pending"
}

interface GroupStageTableProps {
  leagueId: string
  groups: Record<string, GroupStanding[]>
  gameType: "efootball" | "fifa" | "codm"
}

export function GroupStageTable({ leagueId, groups, gameType }: GroupStageTableProps) {
  const getPositionBadge = (position: number, status: string) => {
    if (status === "qualified") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Q
        </Badge>
      )
    }
    if (status === "eliminated") {
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          E
        </Badge>
      )
    }
    return <Badge variant="outline">{position}</Badge>
  }

  const getStatsHeaders = () => {
    if (gameType === "codm") {
      return (
        <>
          <TableHead className="text-center">K</TableHead>
          <TableHead className="text-center">D</TableHead>
          <TableHead className="text-center">K/D</TableHead>
        </>
      )
    }
    return (
      <>
        <TableHead className="text-center">GF</TableHead>
        <TableHead className="text-center">GA</TableHead>
        <TableHead className="text-center">GD</TableHead>
      </>
    )
  }

  const getStatsData = (standing: GroupStanding) => {
    if (gameType === "codm") {
      const kd =
        standing.goalsAgainst > 0
          ? (standing.goalsFor / standing.goalsAgainst).toFixed(2)
          : standing.goalsFor.toString()
      return (
        <>
          <TableCell className="text-center">{standing.goalsFor}</TableCell>
          <TableCell className="text-center">{standing.goalsAgainst}</TableCell>
          <TableCell className="text-center font-medium">{kd}</TableCell>
        </>
      )
    }
    return (
      <>
        <TableCell className="text-center">{standing.goalsFor}</TableCell>
        <TableCell className="text-center">{standing.goalsAgainst}</TableCell>
        <TableCell
          className={`text-center font-medium ${
            standing.goalDifference > 0 ? "text-green-600" : standing.goalDifference < 0 ? "text-red-600" : ""
          }`}
        >
          {standing.goalDifference > 0 ? "+" : ""}
          {standing.goalDifference}
        </TableCell>
      </>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Group Stage Standings</h3>
          <p className="text-sm text-muted-foreground">Top 2 from each group advance to knockout stage</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(groups).map(([groupName, standings]) => (
          <Card key={groupName}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {groupName}
                </div>
                Group {groupName}
              </CardTitle>
              <CardDescription>{standings.length} participants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead className="text-center">MP</TableHead>
                      <TableHead className="text-center">W</TableHead>
                      <TableHead className="text-center">D</TableHead>
                      <TableHead className="text-center">L</TableHead>
                      {getStatsHeaders()}
                      <TableHead className="text-center font-medium">Pts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {standings
                      .sort((a, b) => {
                        // Sort by points, then goal difference, then goals for
                        if (a.points !== b.points) return b.points - a.points
                        if (a.goalDifference !== b.goalDifference) return b.goalDifference - a.goalDifference
                        return b.goalsFor - a.goalsFor
                      })
                      .map((standing, index) => (
                        <TableRow
                          key={standing.id}
                          className={
                            index < 2
                              ? "bg-green-50 hover:bg-green-100"
                              : index >= standings.length - 1
                                ? "bg-red-50 hover:bg-red-100"
                                : ""
                          }
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getPositionBadge(index + 1, standing.status)}
                              {index < 2 && <TrendingUp className="h-3 w-3 text-green-600" />}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                                {standing.username.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium">{standing.username}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{standing.matchesPlayed}</TableCell>
                          <TableCell className="text-center text-green-600">{standing.wins}</TableCell>
                          <TableCell className="text-center text-gray-600">{standing.draws}</TableCell>
                          <TableCell className="text-center text-red-600">{standing.losses}</TableCell>
                          {getStatsData(standing)}
                          <TableCell className="text-center font-bold">{standing.points}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

              {/* Group Stage Legend */}
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-100 rounded"></div>
                  <span>Qualified</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-100 rounded"></div>
                  <span>Eliminated</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
