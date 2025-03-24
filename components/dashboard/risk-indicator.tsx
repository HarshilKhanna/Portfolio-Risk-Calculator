"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle, Shield } from "lucide-react"
import { usePortfolio } from "@/src/context/PortfolioContext"

type RiskLevel = "low" | "medium" | "high"

export function RiskIndicator() {
  const { assets } = usePortfolio()
  const [riskLevel, setRiskLevel] = useState<RiskLevel | null>(null)
  const [riskScore, setRiskScore] = useState(0)

  useEffect(() => {
    if (!assets.length) return

    // Calculate risk score based on portfolio volatility and asset types
    const calculateRiskScore = () => {
      const totalValue = assets.reduce((acc, asset) => 
        acc + (asset.quantity * asset.currentPrice * 86), 0
      )

      // Calculate weighted volatility
      const portfolioVolatility = assets.reduce((acc, asset) => {
        const weight = (asset.quantity * asset.currentPrice * 86) / totalValue
        return acc + (Math.abs(asset.regularMarketChangePercent) * weight)
      }, 0)

      // Convert volatility to 0-100 score
      const score = Math.min(Math.max(portfolioVolatility * 5, 0), 100)

      // Determine risk level
      let level: RiskLevel = "medium"
      if (score < 40) level = "low"
      if (score > 70) level = "high"

      return { score, level }
    }

    const { score, level } = calculateRiskScore()
    setRiskScore(score)
    setRiskLevel(level)
  }, [assets])

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

