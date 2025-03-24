"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { usePortfolio } from "@/src/context/PortfolioContext"

type RiskMetric = {
  name: string
  value: number
  description: string
  format: (value: number) => string
  progressValue?: number
  progressColor?: string
}

export function RiskMetrics() {
  const { assets } = usePortfolio()
  const [metrics, setMetrics] = useState<RiskMetric[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!assets.length) {
      setIsLoading(false)
      return
    }

    // Calculate metrics using the exact formulas provided
    const calculateMetrics = () => {
      // Calculate individual asset returns and values
      const assetMetrics = assets.map(asset => {
        const currentPriceINR = asset.currentPrice * 86
        const assetReturn = ((currentPriceINR - asset.purchasePrice) / asset.purchasePrice) * 100
        const assetValue = currentPriceINR * asset.quantity
        const profitLoss = (currentPriceINR - asset.purchasePrice) * asset.quantity

        return {
          symbol: asset.symbol,
          return: assetReturn,
          value: assetValue,
          profitLoss
        }
      })

      // Calculate total portfolio values
      const totalCurrentValue = assetMetrics.reduce((sum, asset) => sum + asset.value, 0)
      const totalPurchaseValue = assets.reduce((sum, asset) => 
        sum + (asset.purchasePrice * asset.quantity), 0
      )
      const totalProfitLoss = assetMetrics.reduce((sum, asset) => sum + asset.profitLoss, 0)

      // Calculate portfolio return
      const portfolioReturn = ((totalCurrentValue - totalPurchaseValue) / totalPurchaseValue) * 100

      // Calculate asset weights
      const assetWeights = assetMetrics.map(asset => ({
        symbol: asset.symbol,
        weight: (asset.value / totalCurrentValue) * 100
      }))

      return [
        {
          name: "Portfolio Value",
          value: Number(totalCurrentValue),
          description: "Total current value of all holdings",
          format: (value: number) => formatCurrency(value),
          progressValue: 100,
          progressColor: "bg-blue-500"
        },
        {
          name: "Portfolio Return",
          value: Number(portfolioReturn),
          description: "Overall portfolio performance",
          format: (value: number) => `${value.toFixed(2)}%`,
          progressValue: Math.abs(portfolioReturn),
          progressColor: portfolioReturn >= 0 ? "bg-green-500" : "bg-red-500"
        },
        {
          name: "Total P/L",
          value: Number(totalProfitLoss),
          description: "Total profit or loss",
          format: (value: number) => formatCurrency(value),
          progressValue: Math.min(Math.abs(totalProfitLoss / totalPurchaseValue) * 100, 100),
          progressColor: totalProfitLoss >= 0 ? "bg-green-500" : "bg-red-500"
        },
        ...assetWeights.map(asset => ({
          name: `${asset.symbol} Weight`,
          value: Number(asset.weight),
          description: `Portfolio allocation in ${asset.symbol}`,
          format: (value: number) => `${value.toFixed(2)}%`,
          progressValue: asset.weight,
          progressColor: "bg-purple-500"
        })),
        ...assetMetrics.map(asset => ({
          name: `${asset.symbol} Return`,
          value: Number(asset.return),
          description: `Individual return for ${asset.symbol}`,
          format: (value: number) => `${value.toFixed(2)}%`,
          progressValue: Math.abs(asset.return),
          progressColor: asset.return >= 0 ? "bg-green-500" : "bg-red-500"
        }))
      ]
    }

    setMetrics(calculateMetrics())
    setIsLoading(false)
  }, [assets])

  if (isLoading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading metrics...</p>
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
                <span className="text-2xl font-bold">
                  {typeof metric.value === 'number' 
                    ? metric.format(metric.value)
                    : metric.value}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{metric.description}</p>
              {metric.progressValue !== undefined && (
                <Progress 
                  value={metric.progressValue} 
                  className={`h-2 ${metric.progressColor}`} 
                />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const formatCurrency = (value: number) => {
  const absValue = Math.abs(value);
  if (absValue >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (absValue >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  } else if (absValue >= 1000) {
    return `₹${(value / 1000).toFixed(2)}K`;
  }
  return `₹${value.toFixed(2)}`;
};

