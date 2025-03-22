"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/Portfolio-Risk-Calculator/components/ui/card"
import { Progress } from "@/Portfolio-Risk-Calculator/components/ui/progress"

type RiskMetric = {
  name: string
  value: number
  description: string
  format: (value: number) => string
  threshold: {
    low: number
    medium: number
    high: number
  }
}

export function RiskMetrics() {
  const [metrics, setMetrics] = useState<RiskMetric[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setMetrics([
        {
          name: "Sharpe Ratio",
          value: 1.8,
          description: "Risk-adjusted return (higher is better)",
          format: (value) => value.toFixed(2),
          threshold: {
            low: 1,
            medium: 2,
            high: 3,
          },
        },
        {
          name: "Volatility",
          value: 12.5,
          description: "Standard deviation of returns (%)",
          format: (value) => `${value.toFixed(1)}%`,
          threshold: {
            low: 10,
            medium: 20,
            high: 30,
          },
        },
        {
          name: "Value at Risk (95%)",
          value: 8.2,
          description: "Maximum expected loss (%)",
          format: (value) => `${value.toFixed(1)}%`,
          threshold: {
            low: 5,
            medium: 10,
            high: 15,
          },
        },
        {
          name: "Beta",
          value: 1.2,
          description: "Market sensitivity (1.0 = market)",
          format: (value) => value.toFixed(2),
          threshold: {
            low: 0.8,
            medium: 1.2,
            high: 1.5,
          },
        },
        {
          name: "Drawdown",
          value: 15.3,
          description: "Maximum historical decline (%)",
          format: (value) => `${value.toFixed(1)}%`,
          threshold: {
            low: 10,
            medium: 20,
            high: 30,
          },
        },
        {
          name: "Downside Deviation",
          value: 7.8,
          description: "Volatility of negative returns (%)",
          format: (value) => `${value.toFixed(1)}%`,
          threshold: {
            low: 5,
            medium: 10,
            high: 15,
          },
        },
        {
          name: "Sortino Ratio",
          value: 2.1,
          description: "Return per unit of downside risk",
          format: (value) => value.toFixed(2),
          threshold: {
            low: 1,
            medium: 2,
            high: 3,
          },
        },
      ])
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const getProgressColor = (metric: RiskMetric) => {
    // For metrics where higher is better (like Sharpe Ratio, Sortino Ratio)
    if (metric.name === "Sharpe Ratio" || metric.name === "Sortino Ratio") {
      if (metric.value < metric.threshold.low) return "bg-red-500"
      if (metric.value < metric.threshold.medium) return "bg-amber-500"
      return "bg-green-500"
    }

    // For metrics where lower is better (like Volatility, VaR, etc.)
    if (metric.value < metric.threshold.low) return "bg-green-500"
    if (metric.value < metric.threshold.medium) return "bg-amber-500"
    return "bg-red-500"
  }

  const getProgressPercentage = (metric: RiskMetric) => {
    // For metrics where higher is better (like Sharpe Ratio, Sortino Ratio)
    if (metric.name === "Sharpe Ratio" || metric.name === "Sortino Ratio") {
      return Math.min((metric.value / metric.threshold.high) * 100, 100)
    }

    // For metrics where lower is better (like Volatility, VaR, etc.)
    return Math.min((metric.value / metric.threshold.high) * 100, 100)
  }

  if (isLoading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading risk metrics...</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.name} className="overflow-hidden shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{metric.name}</h3>
                <span className="text-2xl font-bold">{metric.format(metric.value)}</span>
              </div>
              <p className="text-sm text-muted-foreground">{metric.description}</p>
              <Progress value={getProgressPercentage(metric)} className={`h-2 ${getProgressColor(metric)}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

