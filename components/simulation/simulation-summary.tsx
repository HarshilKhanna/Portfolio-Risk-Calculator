"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { usePortfolio } from "@/src/context/PortfolioContext"

type SimulationSummaryData = {
  metric: string
  current: number
  simulated: number
  unit: string
  isPercentage: boolean
  isHigherBetter: boolean
}

export function SimulationSummary() {
  const { assets } = usePortfolio()
  const [data, setData] = useState<SimulationSummaryData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!assets.length) {
      setIsLoading(false)
      return
    }

    const totalValue = assets.reduce((acc, asset) => 
      acc + (asset.quantity * asset.currentPrice * 86), 0
    )

    // Calculate actual portfolio metrics
    const calculatePortfolioMetrics = () => {
      const riskFreeRate = 0.07 // 7% annual
      
      // Calculate portfolio return
      const portfolioReturn = assets.reduce((acc, asset) => {
        const weight = (asset.quantity * asset.currentPrice * 86) / totalValue
        const assetReturn = ((asset.currentPrice * 86) - asset.purchasePrice) / asset.purchasePrice * 100
        return acc + (assetReturn * weight)
      }, 0)

      // Calculate portfolio volatility
      const volatility = Math.sqrt(assets.reduce((acc, asset) => {
        return acc + Math.pow(asset.regularMarketChangePercent, 2)
      }, 0) / assets.length)

      // Calculate Sharpe ratio
      const sharpeRatio = (portfolioReturn - riskFreeRate) / volatility

      return {
        return: portfolioReturn,
        volatility,
        sharpeRatio,
        value: totalValue
      }
    }

    const metrics = calculatePortfolioMetrics()

    setData([
      {
        metric: "Expected Annual Return",
        current: Number(metrics.return.toFixed(1)),
        simulated: Number((metrics.return * 1.2).toFixed(1)), // 20% improvement
        unit: "%",
        isPercentage: true,
        isHigherBetter: true,
      },
      {
        metric: "Risk (Volatility)",
        current: Number(metrics.volatility.toFixed(1)),
        simulated: Number((metrics.volatility * 0.9).toFixed(1)), // 10% reduction
        unit: "%",
        isPercentage: true,
        isHigherBetter: false,
      },
      {
        metric: "Sharpe Ratio",
        current: Number(metrics.sharpeRatio.toFixed(2)),
        simulated: Number((metrics.sharpeRatio * 1.15).toFixed(2)), // 15% improvement
        unit: "",
        isPercentage: false,
        isHigherBetter: true,
      },
      {
        metric: "5-Year Projected Value",
        current: metrics.value,
        simulated: metrics.value * 1.25, // 25% growth
        unit: "₹",
        isPercentage: false,
        isHigherBetter: true,
      },
      {
        metric: "Maximum Drawdown",
        current: 15.3,
        simulated: 13.8,
        unit: "%",
        isPercentage: true,
        isHigherBetter: false,
      },
    ])
    setIsLoading(false)
  }, [assets])

  // Listen for simulation events to update the summary
  useEffect(() => {
    const handleSimulation = () => {
      setIsLoading(true)

      // Simulate loading updated data
      setTimeout(() => {
        setData((prevData) =>
          prevData.map((item) => {
            // Add some randomness to the simulated values
            const randomFactor = Math.random() * 0.2 + 0.9 // 0.9 to 1.1
            let newSimulated = item.simulated * randomFactor

            // Ensure the change makes sense (higher is better for some metrics)
            if (item.isHigherBetter) {
              newSimulated = Math.max(item.current * 1.05, newSimulated)
            } else {
              newSimulated = Math.min(item.current * 1.15, newSimulated)
            }

            return {
              ...item,
              simulated: Number(newSimulated.toFixed(item.isPercentage ? 1 : 0)),
            }
          }),
        )
        setIsLoading(false)
      }, 800)
    }

    window.addEventListener("runSimulation", handleSimulation)

    return () => {
      window.removeEventListener("runSimulation", handleSimulation)
    }
  }, [])

  const formatValue = (value: number, unit: string, isPercentage: boolean) => {
    if (isPercentage) {
      return `${value}${unit}`
    }

    if (unit === "₹") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value)
    }

    return `${value}${unit}`
  }

  const getDifferenceColor = (current: number, simulated: number, isHigherBetter: boolean) => {
    const isImproved = isHigherBetter ? simulated > current : simulated < current

    return isImproved ? "text-green-500" : "text-red-500"
  }

  if (isLoading) {
    return (
      <div className="h-[200px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading simulation summary...</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <Card key={item.metric}>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">{item.metric}</h3>

            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Current</p>
                <p className="text-xl font-bold">{formatValue(item.current, item.unit, item.isPercentage)}</p>
              </div>

              <ArrowRight className="h-5 w-5 text-muted-foreground mx-2" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Simulated</p>
                <p
                  className={`text-xl font-bold ${getDifferenceColor(item.current, item.simulated, item.isHigherBetter)}`}
                >
                  {formatValue(item.simulated, item.unit, item.isPercentage)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

