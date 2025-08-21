"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, CheckCircle, AlertTriangle, Trophy, DollarSign, Users } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface Notification {
  id: string
  type: "match" | "wallet" | "system" | "achievement" | "league"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
  leagueId?: string
  tournamentRound?: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  // Mock real-time notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "match",
        title: "Match Found!",
        message: "Your eFootball opponent is ready. Match starts in 30 seconds.",
        timestamp: new Date(),
        read: false,
        priority: "high",
      },
      {
        id: "2",
        type: "league",
        title: "Tournament Match Ready!",
        message: "Your Winter Championship Quarter Final match is ready to start.",
        timestamp: new Date(Date.now() - 120000),
        read: false,
        priority: "high",
        leagueId: "league-001",
        tournamentRound: "Quarter Finals",
      },
      {
        id: "3",
        type: "league",
        title: "Tournament Registration Open",
        message: "Spring Championship 2024 registration is now open! Entry fee: $25",
        timestamp: new Date(Date.now() - 180000),
        read: false,
        priority: "medium",
        leagueId: "league-002",
      },
      {
        id: "4",
        type: "wallet",
        title: "Payment Received",
        message: "You won $50 from your FIFA match!",
        timestamp: new Date(Date.now() - 300000),
        read: false,
        priority: "medium",
      },
      {
        id: "5",
        type: "achievement",
        title: "Achievement Unlocked!",
        message: "You've won 10 matches in a row. Streak Master!",
        timestamp: new Date(Date.now() - 600000),
        read: true,
        priority: "low",
      },
    ]

    setNotifications(mockNotifications)

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const notificationTypes = ["match", "wallet", "league"]
      const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]

      const leagueNotifications = [
        { title: "Tournament Bracket Updated", message: "New matches have been scheduled in Winter Championship" },
        { title: "League Registration Closing", message: "Only 2 hours left to register for Spring Championship!" },
        { title: "Tournament Starting Soon", message: "Your tournament begins in 15 minutes. Get ready!" },
      ]

      const regularNotifications = [
        { title: "New Match Available", message: "A new opponent is looking for a match" },
        { title: "Wallet Update", message: "Your balance has been updated" },
      ]

      let notificationData
      if (randomType === "league") {
        const leagueNotif = leagueNotifications[Math.floor(Math.random() * leagueNotifications.length)]
        notificationData = {
          ...leagueNotif,
          leagueId: "league-001",
          tournamentRound: Math.random() > 0.5 ? "Group Stage" : "Quarter Finals",
        }
      } else {
        const regularNotif = regularNotifications[Math.floor(Math.random() * regularNotifications.length)]
        notificationData = regularNotif
      }

      const newNotification: Notification = {
        id: Date.now().toString(),
        type: randomType as any,
        title: notificationData.title,
        message: notificationData.message,
        timestamp: new Date(),
        read: false,
        priority: "medium",
        leagueId: notificationData.leagueId,
        tournamentRound: notificationData.tournamentRound,
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 notifications
    }, 30000) // New notification every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "match":
        return <Users className="h-4 w-4 text-blue-600" />
      case "wallet":
        return <DollarSign className="h-4 w-4 text-green-600" />
      case "achievement":
        return <Trophy className="h-4 w-4 text-yellow-600" />
      case "system":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "league":
        return <Trophy className="h-4 w-4 text-purple-600" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-blue-500"
      default:
        return "border-l-gray-500"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setShowNotifications(!showNotifications)} className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-12 w-80 z-50"
          >
            <Card className="shadow-lg border">
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                            !notification.read ? "bg-muted/50" : ""
                          } hover:bg-muted/30 transition-colors cursor-pointer`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm">{notification.title}</div>
                                <div className="text-xs text-muted-foreground mt-1">{notification.message}</div>
                                <div className="text-xs text-muted-foreground mt-2">
                                  {formatTime(notification.timestamp)}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark all as read
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
