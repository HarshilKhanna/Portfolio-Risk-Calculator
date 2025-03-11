"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Progress } from "@/Portfolio-Risk-Calculator/components/ui/progress"

const summaryData = {
  totalValue: 245678.9,
  totalCost: 220000,
  profitLoss: 25678.9,
  profitLossPercentage: 11.67,
  expectedAnnualReturn: 12.4,
  expectedAnnualDividend: 3.2,
  riskLevel: 65,
}

export function PortfolioSummary() {
  const {
    totalValue,
    totalCost,
    profitLoss,
    profitLossPercentage,
    expectedAnnualReturn,
    expectedAnnualDividend,
    riskLevel,
  } = summaryData

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const getRiskLevelText = (level: number) => {
    if (level < 30) return "Low"
    if (level < 70) return "Medium"
    return "High"
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Total Value</div>
          <div className="text-3xl font-bold">{formatCurrency(totalValue)}</div>
          <div className="mt-1 flex items-center gap-1">
            <div className={profitLoss >= 0 ? "text-success" : "text-destructive"}>
              {profitLoss >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            </div>
            <div className={`text-sm font-medium ${profitLoss >= 0 ? "text-success" : "text-destructive"}`}>
              {formatCurrency(Math.abs(profitLoss))} ({profitLossPercentage.toFixed(2)}%)
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Total Cost</div>
          <div className="text-3xl font-bold">{formatCurrency(totalCost)}</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Expected Annual Return</div>
          <div className="text-2xl font-bold">{expectedAnnualReturn}%</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Expected Annual Dividend</div>
          <div className="text-2xl font-bold">{expectedAnnualDividend}%</div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">Risk Level</div>
          <div className="text-sm font-medium">{getRiskLevelText(riskLevel)}</div>
        </div>
        <Progress value={riskLevel} className="mt-2 h-2" />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <div>Low</div>
          <div>Medium</div>
          <div>High</div>
        </div>
      </div>
    </div>
  )
}

