"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2, Mail, Lock, User, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "login" | "signup" | "game-selection"
  onModeChange: (mode: "login" | "signup" | "game-selection") => void
}

export function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const { login, register, error, clearError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    selectedGames: [] as string[],
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    clearError();

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else if (mode === "game-selection") {
        if (formData.selectedGames.length === 0) {
          setValidationError("Please select at least one game");
          return;
        }
        await register(formData.username, formData.email, formData.password, formData.selectedGames);
      }
      onClose();
    } catch (err) {
      // Error is handled by auth context
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationError(null);
    clearError();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 justify-center mb-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <DialogTitle className="text-2xl">GameMatch</DialogTitle>
          </div>
          <DialogDescription className="text-center">
            {mode === "login" ? "Welcome back, gamer!" : "Join the competitive gaming community"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={mode} onValueChange={(value) => onModeChange(value as "login" | "signup" | "game-selection")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" disabled={mode === "game-selection"}>Login</TabsTrigger>
            <TabsTrigger value="signup" disabled={mode === "game-selection"}>Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to Your Account</CardTitle>
                <CardDescription>Enter your credentials to access your gaming profile</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Login to GameMatch
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Your Account</CardTitle>
                <CardDescription>Start your competitive gaming journey today</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="GamerTag123"
                        className="pl-10"
                        value={formData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="button" 
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      if (formData.password !== formData.confirmPassword) {
                        setValidationError("Passwords do not match");
                        return;
                      }
                      onModeChange("game-selection");
                    }}
                  >
                    Proceed to Game Selection
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="game-selection">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Games</CardTitle>
                <CardDescription className="text-base">
                  Choose the games you want to play and be matched with.
                  <div className="mt-2 p-2 bg-muted/50 rounded-md text-sm">
                    Note: You can always change your game preferences later in your profile settings.
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div 
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${formData.selectedGames.includes('fifa') 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-primary/50'}`}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        selectedGames: prev.selectedGames.includes('fifa')
                          ? prev.selectedGames.filter(g => g !== 'fifa')
                          : [...prev.selectedGames, 'fifa']
                      }))
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 relative">
                        <img
                          src="fifa.jpeg"
                          alt="FIFA"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">FIFA</h3>
                        <p className="text-sm text-muted-foreground">
                          Competitive soccer gaming with real-time matches and rankings
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${formData.selectedGames.includes('efootball') 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-primary/50'}`}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        selectedGames: prev.selectedGames.includes('efootball')
                          ? prev.selectedGames.filter(g => g !== 'efootball')
                          : [...prev.selectedGames, 'efootball']
                      }))
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 relative">
                        <img
                          src="efootball.png"
                          alt="eFootball"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">eFootball</h3>
                        <p className="text-sm text-muted-foreground">
                          Strategic football matches with deep gameplay mechanics
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${formData.selectedGames.includes('codm') 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-primary/50'}`}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        selectedGames: prev.selectedGames.includes('codm')
                          ? prev.selectedGames.filter(g => g !== 'codm')
                          : [...prev.selectedGames, 'codm']
                      }))
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 relative">
                        <img
                          src="codm.png"
                          alt="CODM"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Call of Duty Mobile</h3>
                        <p className="text-sm text-muted-foreground">
                          Fast-paced action with multiple game modes and tournaments
                        </p>
                      </div>
                    </div>
                  </div>

                  {validationError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{validationError}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full mt-4"
                    disabled={formData.selectedGames.length === 0 || loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Creating Account..." : "Complete Registration"}
                  </Button>

                  {formData.selectedGames.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center">
                      Please select at least one game to continue
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
