"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/Portfolio-Risk-Calculator/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { BarChart3, Home, LineChart, PieChart } from "lucide-react"

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: PieChart,
  },
  {
    name: "Risk Analysis",
    href: "/risk-analysis",
    icon: BarChart3,
  },
  {
    name: "Simulation",
    href: "/simulation",
    icon: LineChart,
  },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-8">
        <div className="mr-8 flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-2 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">PR</span>
            </div>
            <span className="hidden font-bold text-xl md:inline-block">Portfolio Risk</span>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center space-x-1 md:space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-9 items-center rounded-md px-2 text-sm font-medium transition-colors hover:bg-accent",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden md:inline-block">{item.name}</span>
                </Link>
              )
            })}
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

