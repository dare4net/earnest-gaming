"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Shield } from "lucide-react"

interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: Date
  isSystem?: boolean
  isCurrentUser?: boolean
}

interface MatchChatProps {
  matchId: string
  currentUser: string
  opponent: string
}

export function MatchChat({ matchId, currentUser, opponent }: MatchChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isConnected, setIsConnected] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock initial messages
  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: "1",
        username: "System",
        message: "Match started! Good luck to both players.",
        timestamp: new Date(Date.now() - 600000),
        isSystem: true,
      },
      {
        id: "2",
        username: opponent,
        message: "Good luck! May the best player win 🎮",
        timestamp: new Date(Date.now() - 300000),
        isCurrentUser: false,
      },
      {
        id: "3",
        username: currentUser,
        message: "Thanks! Let's have a great match!",
        timestamp: new Date(Date.now() - 240000),
        isCurrentUser: true,
      },
    ]

    setMessages(initialMessages)
  }, [currentUser, opponent])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate receiving messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const opponentMessages = [
          "Nice move!",
          "That was close!",
          "Good game so far",
          "You're playing well",
          "This is intense!",
        ]

        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          username: opponent,
          message: opponentMessages[Math.floor(Math.random() * opponentMessages.length)],
          timestamp: new Date(),
          isCurrentUser: false,
        }

        setMessages((prev) => [...prev, newMsg])
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [opponent])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      username: currentUser,
      message: newMessage.trim(),
      timestamp: new Date(),
      isCurrentUser: true,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="h-full flex flex-col bg-[#1C1E24] border border-[#2A2D36] overflow-hidden">
      {/* Header */}
      <CardHeader className="pb-3 border-b border-[#2A2D36]">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-emerald-500" />
            Match Chat
          </div>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Badge variant="outline" className="bg-[#1C1E24] border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-[#1C1E24] border-red-500/30 text-red-400">
                Disconnected
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      {/* Body */}
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 pr-3 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isSystem ? "justify-center" : message.isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-lg text-sm whitespace-pre-wrap break-words break-all max-w-full sm:max-w-md border
                  ${message.isSystem
                    ? "bg-[#15171B] border-[#2A2D36] text-gray-400 text-center"
                    : message.isCurrentUser
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                      : "bg-[#15171B] border-[#2A2D36] text-gray-200"}
                `}
              >
                {!message.isSystem && (
                  <div className="font-medium text-xs mb-1 text-gray-400">{message.username}</div>
                )}
                <div>{message.message}</div>
                <div className="text-xs text-gray-400 mt-1">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#2A2D36]">
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isConnected}
              maxLength={200}
              className="flex-1 bg-[#1C1E24] border-[#2A2D36] text-white placeholder:text-gray-500"
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim() || !isConnected}
              size="sm"
              className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Keep it respectful
            </div>
            <div>{newMessage.length}/200</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
