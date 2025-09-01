"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Trophy, Users, Zap, Shield, Timer, Bell, Wallet } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"
import { AuthModal } from "@/components/auth-modal"
import { GameCard } from "@/components/game-card"
import { NotificationSystem } from "@/components/notification-system"
import { LiveStats } from "@/components/live-stats"
import { LiveLeaderboard } from "@/components/live-leaderboard"
import { GAMES, Game } from '@/lib/game-constants'

export default function HomePage() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  const games = Object.values(GAMES) as Game[]

  // Listen for auth events from mobile nav
  useEffect(() => {
    const handleAuthToggle = (e: CustomEvent<{ mode: "login" | "signup" }>) => {
      handleAuthClick(e.detail.mode)
    }

    window.addEventListener('toggleAuth', handleAuthToggle as EventListener)
    return () => window.removeEventListener('toggleAuth', handleAuthToggle as EventListener)
  }, [])

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Smart Matching",
      description: "Advanced algorithm finds players at your skill level",
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Competitive Wagering",
      description: "Secure wallet system for match betting",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Fair Verification",
      description: "Screenshot-based match result verification",
    },
    {
      icon: <Timer className="h-6 w-6" />,
      title: "Real-time Tracking",
      description: "10-minute verification windows with live updates",
    },
  ]

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowAuth(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-lg sm:text-2xl font-bold text-foreground">EarnestGame</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] rounded-full flex items-center justify-center text-primary-foreground">3</span>
            </Button>
            <Link href="/leagues">
              <Button variant="ghost">
                <Trophy className="h-4 w-4 mr-2" />
                Leagues
              </Button>
            </Link>
            {user ? (
              <>
                <Link href="/wallet">
                  <Button variant="ghost">
                    <Wallet className="h-4 w-4 mr-2" />
                    ${user.earnings?.toFixed(2)}
                  </Button>
                </Link>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => handleAuthClick("login")}>
                  Login
                </Button>
                <Button onClick={() => handleAuthClick("signup")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] rounded-full flex items-center justify-center text-primary-foreground">3</span>
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="py-10 sm:py-20 px-4 relative"
        style={{
          backgroundImage: 'url(/earnest.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="mb-6 sm:mb-8">
            <Badge variant="secondary" className="mb-4 text-xs sm:text-sm">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              Find Your Perfect Gaming Match
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Compete. Wager. <span className="text-primary">Win.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground mb-6 sm:mb-8 leading-relaxed px-2">
              Connect with skilled players, place competitive wagers, and prove your gaming prowess in eFootball, FIFA,
              and Call of Duty Mobile.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Button size="lg" className="text-base sm:text-lg px-4 sm:px-8 w-full sm:w-auto" onClick={() => handleAuthClick("signup")}>
              Start Gaming Now
            </Button>
            <Button size="lg" className="text-base sm:text-lg px-4 sm:px-8 text-black bg-secondary w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>

          <div className="mt-8 sm:mt-16">
            <LiveStats />
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-12 sm:py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Choose Your Game</h3>
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              Select from our supported games and find your perfect opponent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Tournament Leagues Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Tournament Leagues</h3>
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              Join competitive tournaments with group stages, knockouts, and massive prize pools
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Registration Open
                  </Badge>
                  <div className="w-8 h-8 relative">
                    <Image
                      src={GAMES.efootball.iconPath}
                      alt="eFootball"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <CardTitle className="text-lg">Winter Championship</CardTitle>
                <CardDescription>32-player knockout tournament</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entry Fee:</span>
                    <span className="font-medium">$25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prize Pool:</span>
                    <span className="font-medium text-green-600">$5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Participants:</span>
                    <span className="font-medium">24/32</span>
                  </div>
                </div>
                <Link href="/leagues">
                  <Button className="w-full mt-4">View Details</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">Upcoming</Badge>
                  <div className="w-8 h-8 relative">
                    <Image
                      src={GAMES.fifa.iconPath}
                      alt="FIFA"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <CardTitle className="text-lg">FIFA Masters League</CardTitle>
                <CardDescription>16-player group stage + knockout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entry Fee:</span>
                    <span className="font-medium">$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prize Pool:</span>
                    <span className="font-medium text-green-600">$8,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Starts:</span>
                    <span className="font-medium">Feb 2nd</span>
                  </div>
                </div>
                <Link href="/leagues">
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    Register Soon
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Registration Open
                  </Badge>
                  <div className="w-8 h-8 relative">
                    <Image
                      src={GAMES.codm.iconPath}
                      alt="CODM"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <CardTitle className="text-lg">CODM Championship</CardTitle>
                <CardDescription>64-player battle royale tournament</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entry Fee:</span>
                    <span className="font-medium">$15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prize Pool:</span>
                    <span className="font-medium text-green-600">$7,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Participants:</span>
                    <span className="font-medium">45/64</span>
                  </div>
                </div>
                <Link href="/leagues">
                  <Button className="w-full mt-4">Join Tournament</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/leagues">
              <Button size="lg" variant="outline" className="bg-transparent">
                <Trophy className="h-5 w-5 mr-2" />
                View All Tournaments
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Why Choose GameMatch?</h3>
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              Built for competitive gamers who demand fairness and excitement
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Players Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Top Players</h3>
            <p className="text-base sm:text-lg text-muted-foreground px-2">See who's dominating the leaderboards right now</p>
          </div>
          <LiveLeaderboard />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center max-w-4xl px-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Ready to Start Your Gaming Journey?</h3>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
            Join thousands of competitive gamers and start earning from your skills today.
          </p>
          <Button size="lg" className="text-base sm:text-lg px-4 sm:px-8 w-full sm:w-auto" onClick={() => handleAuthClick("signup")}>
            Create Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-base sm:text-lg font-semibold">GameMatch</span>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground px-2">© 2024 GameMatch. All rights reserved. Game responsibly.</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} mode={authMode} onModeChange={setAuthMode} />
    </div>
  )
}
