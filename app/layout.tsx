import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar"
import { PortfolioProvider } from '@/src/context/PortfolioContext';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio Risk Manager",
  description: "A modern portfolio risk management application",
  generator: 'Harshil Khanna'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange={false}>
          <PortfolioProvider>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main>{children}</main>
            </div>
          </PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}