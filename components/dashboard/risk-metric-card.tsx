import type React from "react"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { Card, CardContent } from "@/Portfolio-Risk-Calculator/components/ui/card"

interface RiskMetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}

export function RiskMetricCard({ title, value, change, trend, icon }: RiskMetricCardProps) {
  return (
    <Card className="glass-card overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="rounded-full bg-primary/10 p-1 text-primary">{icon}</div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold">{value}</div>
          <div className="mt-1 flex items-center gap-1">
            {trend === "up" && (
              <>
                <ArrowUp className="h-4 w-4 text-success" />
                <span className="text-xs font-medium text-success">{change}</span>
              </>
            )}
            {trend === "down" && (
              <>
                <ArrowDown className="h-4 w-4 text-destructive" />
                <span className="text-xs font-medium text-destructive">{change}</span>
              </>
            )}
            {trend === "neutral" && (
              <>
                <Minus className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">{change || "No change"}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

