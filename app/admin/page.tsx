"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsIndicator } from "@/components/ui/tabs"
import {
  Shield,
  Users,
  Gamepad2,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Settings,
  Eye,
  RefreshCw,
  Trophy,
} from "lucide-react"
import { AdminStats } from "@/components/admin-stats"
import { PlayerManagement } from "@/components/player-management"
import { MatchManagement } from "@/components/match-management"
import { FinancialManagement } from "@/components/financial-management"
import { LeagueManagement } from "@/components/league-management"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock admin data
  const dashboardStats = {
    totalUsers: 8247,
    activeMatches: 156,
    pendingVerifications: 23,
    totalRevenue: 125430.5,
    dailySignups: 47,
    matchesCompleted: 1834,
    disputedMatches: 8,
    systemHealth: "healthy",
  }

  const recentAlerts = [
    {
      id: "1",
      type: "dispute",
      message: "Match #12345 flagged for review - conflicting screenshots",
      timestamp: "2024-01-20T10:30:00Z",
      severity: "high",
    },
    {
      id: "2",
      type: "system",
      message: "High server load detected - monitoring performance",
      timestamp: "2024-01-20T10:15:00Z",
      severity: "medium",
    },
    {
      id: "3",
      type: "financial",
      message: "Large withdrawal request pending approval - $2,500",
      timestamp: "2024-01-20T09:45:00Z",
      severity: "medium",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Medium
          </Badge>
        )
      case "low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return null
    }
  }

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "players", label: "Players" },
    { value: "matches", label: "Matches" },
    { value: "leagues", label: "Leagues" },
    { value: "financial", label: "Financial" },
    { value: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header */}
      <header className="border-b border-[#2A2D36] bg-[#141519]/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-500" />
            <h1 className="text-2xl font-bold text-white responsive-text-xl">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20 responsive-text">
              <CheckCircle className="h-4 w-4" />
              <span>System Healthy</span>
            </div>
            <Button size="sm" className="bg-[#2A2D36] hover:bg-[#353841] text-white rounded-lg responsive-text">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="leagues">Leagues</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Users</p>
                      <p className="text-2xl font-bold text-white">{dashboardStats.totalUsers.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Gamepad2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Active Matches</p>
                      <p className="text-2xl font-bold text-white">{dashboardStats.activeMatches}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Revenue</p>
                      <p className="text-2xl font-bold text-white">₦{dashboardStats.totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Pending Verifications</p>
                      <p className="text-2xl font-bold text-white">{dashboardStats.pendingVerifications}</p>
                    </div>
                  </div>
                </div>
              </div>

              <AdminStats stats={dashboardStats} />
              {/* Recent Alerts */}
              <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 responsive-text-lg text-white mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    Recent Alerts
                  </div>
                  <p className="text-gray-400 responsive-text">System notifications requiring attention</p>
                </div>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 bg-[#15171B] rounded-xl border border-[#2A2D36]">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <div>
                            <div className="font-medium text-sm text-white responsive-text">{alert.message}</div>
                            <div className="text-xs text-gray-400 responsive-text">
                              {new Date(alert.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-1 rounded-lg text-xs ${
                            alert.severity === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            alert.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                          </div>
                          <Button size="sm" className="bg-[#2A2D36] hover:bg-[#353841] text-white responsive-text">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Settings className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Quick Actions</h3>
                      <p className="text-sm text-gray-400">Common administrative tasks</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="flex flex-col items-center gap-3 p-4 bg-[#15171B] rounded-xl border border-[#2A2D36] hover:bg-[#1C1E24] transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-[#1C1E24] flex items-center justify-center">
                        <Users className="h-6 w-6 text-emerald-500" />
                      </div>
                      <span className="text-sm text-white">Manage Users</span>
                    </button>
                    <button className="flex flex-col items-center gap-3 p-4 bg-[#15171B] rounded-xl border border-[#2A2D36] hover:bg-[#1C1E24] transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-[#1C1E24] flex items-center justify-center">
                        <Gamepad2 className="h-6 w-6 text-blue-500" />
                      </div>
                      <span className="text-sm text-white">View Matches</span>
                    </button>
                    <button className="flex flex-col items-center gap-3 p-4 bg-[#15171B] rounded-xl border border-[#2A2D36] hover:bg-[#1C1E24] transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-[#1C1E24] flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-yellow-500" />
                      </div>
                      <span className="text-sm text-white">Financial Reports</span>
                    </button>
                    <button className="flex flex-col items-center gap-3 p-4 bg-[#15171B] rounded-xl border border-[#2A2D36] hover:bg-[#1C1E24] transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-[#1C1E24] flex items-center justify-center">
                        <Settings className="h-6 w-6 text-purple-500" />
                      </div>
                      <span className="text-sm text-white">System Settings</span>
                    </button>
                    <button className="flex flex-col items-center gap-3 p-4 bg-[#15171B] rounded-xl border border-[#2A2D36] hover:bg-[#1C1E24] transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-[#1C1E24] flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-orange-500" />
                      </div>
                      <span className="text-sm text-white">Manage Leagues</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="players" className="mt-6">
            <PlayerManagement />
          </TabsContent>

          <TabsContent value="matches" className="mt-6">
            <MatchManagement />
          </TabsContent>

          <TabsContent value="leagues" className="mt-6">
            <LeagueManagement />
          </TabsContent>

          <TabsContent value="financial" className="mt-6">
            <FinancialManagement />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Settings className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">System Settings</h3>
                    <p className="text-sm text-gray-400">Configure platform settings and parameters</p>
                  </div>
                </div>
                <div className="text-center py-12 bg-[#15171B] rounded-xl border border-[#2A2D36]">
                  <Settings className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">System settings panel coming soon</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
