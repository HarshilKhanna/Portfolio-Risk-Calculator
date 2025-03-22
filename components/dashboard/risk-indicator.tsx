"use client"

import { useEffect, useState } from "react"
import { cn } from "@/Portfolio-Risk-Calculator/lib/utils"
import { AlertTriangle, CheckCircle, Shield } from "lucide-react"

type RiskLevel = "low" | "medium" | "high"

export function RiskIndicator() {
  const [riskLevel, setRiskLevel] = useState<RiskLevel | null>(null)
  const [riskScore, setRiskScore] = useState(0)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setRiskScore(65)
      setRiskLevel("medium")
    }, 700)

    return () => clearTimeout(timer)
  }, [])

  const getRiskColor = (level: RiskLevel | null) => {
    switch (level) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-amber-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-300"
    }
  }

  const getRiskIcon = (level: RiskLevel | null) => {
    switch (level) {
      case "low":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "medium":
        return <Shield className="h-6 w-6 text-amber-500" />
      case "high":
        return <AlertTriangle className="h-6 w-6 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        {getRiskIcon(riskLevel)}
        <div>
          <h3 className="font-medium">
            {riskLevel ? `${riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk` : "Calculating..."}
          </h3>
          <p className="text-sm text-muted-foreground">
            {riskLevel === "low" && "Conservative portfolio with stable returns"}
            {riskLevel === "medium" && "Balanced portfolio with moderate volatility"}
            {riskLevel === "high" && "Aggressive portfolio with high volatility"}
            {!riskLevel && "Analyzing your portfolio risk..."}
          </p>
        </div>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-1000 ease-out", getRiskColor(riskLevel))}
          style={{ width: `${riskScore}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Low Risk</span>
        <span>Medium Risk</span>
        <span>High Risk</span>
      </div>
    </div>
  )
}

