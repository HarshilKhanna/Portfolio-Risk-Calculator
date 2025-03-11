"use client"

import { BarChart3, CreditCard, HelpCircle, Home, LineChart, PieChart, Settings, Wallet } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/Portfolio-Risk-Calculator/components/ui/sidebar"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="text-lg">RiskManager</span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/portfolio"}>
              <Link href="/portfolio">
                <PieChart className="h-4 w-4" />
                <span>Portfolio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/risk-analysis"}>
              <Link href="/risk-analysis">
                <BarChart3 className="h-4 w-4" />
                <span>Risk Analysis</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/simulation"}>
              <Link href="/simulation">
                <LineChart className="h-4 w-4" />
                <span>Simulation</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="my-4" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/help">
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">Subscription</div>
            <div className="text-xs font-medium">Premium</div>
          </div>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Manage Plan</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

