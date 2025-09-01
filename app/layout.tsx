import type React from "react"
import type { Metadata } from "next"
import { Teko } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

const teko = Teko({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-teko'
})

export const metadata: Metadata = {
  title: "GameMatch - Competitive Gaming Platform",
  description: "Find opponents, wager on matches, and compete in eFootball, FIFA, and CODM",
  generator: "v0.app",
  themeColor: "#1E3A8A",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={teko.variable}>
      <body className="font-teko">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
