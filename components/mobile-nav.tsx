import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export function MobileNav() {
  const { user, logout } = useAuth()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <Link href="/leagues" className="block">
            <Button variant="ghost" className="w-full justify-start">
              Leagues
            </Button>
          </Link>
          {user ? (
            <>
              <Link href="/wallet" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Wallet (${user.earnings?.toFixed(2)})
                </Button>
              </Link>
              <Button variant="ghost" className="justify-start" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Button 
                className="w-full" 
                variant="default" 
                onClick={() => {
                  const event = new CustomEvent('toggleAuth', { detail: { mode: 'signup' } })
                  window.dispatchEvent(event)
                }}
              >
                Sign Up
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => {
                  const event = new CustomEvent('toggleAuth', { detail: { mode: 'login' } })
                  window.dispatchEvent(event)
                }}
              >
                Login
              </Button>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
