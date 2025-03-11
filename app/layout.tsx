import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/Portfolio-Risk-Calculator/components/theme-provider"
import { AppSidebar } from "@/Portfolio-Risk-Calculator/components/app-sidebar"
import { SidebarProvider } from "@/Portfolio-Risk-Calculator/components/ui/sidebar"
import { Header } from "@/Portfolio-Risk-Calculator/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio Risk Manager",
  description: "Manage your investment portfolio and analyze financial risk",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex h-screen">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'