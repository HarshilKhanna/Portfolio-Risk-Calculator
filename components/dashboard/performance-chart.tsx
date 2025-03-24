"use client"

import { usePortfolio } from "@/src/context/PortfolioContext"
import { format } from "date-fns"

export function TradingDaysAnalysis() {
  const { assets } = usePortfolio()

  // Separate formatters for share price and total value
  const formatSharePrice = (amount: number) => {
    return `₹${amount.toFixed(2)}`
  }

  const formatTotalValue = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(2)} K`
    return `₹${amount.toFixed(2)}`
  }

  if (!assets.length) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">No portfolio data available</p>
      </div>
    )
  }

  const assetPerformance = assets.map(asset => {
    const currentPriceINR = asset.currentPrice * 86
    const returnPercentage = (
      ((currentPriceINR - asset.purchasePrice) / asset.purchasePrice) * 100
    ).toFixed(2)

    return {
      symbol: asset.symbol,
      value: currentPriceINR * asset.quantity,
      change: parseFloat(returnPercentage)
    }
  })

  // Sort by absolute value of change to group similar performing assets
  const sortedByPerformance = [...assetPerformance].sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
  const bestPerformers = sortedByPerformance.filter(asset => asset.change > 0)
  const worstPerformers = sortedByPerformance.filter(asset => asset.change <= 0)

  const totalValue = assetPerformance.reduce((sum, asset) => sum + asset.value, 0)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Best Performing Assets</h3>
          <div className="space-y-3">
            {bestPerformers.map(asset => (
              <div key={asset.symbol} className="bg-muted/50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{asset.symbol}</p>
                  <span className="text-green-500 font-semibold">
                    +{Math.abs(asset.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Worst Performing Assets</h3>
          <div className="space-y-3">
            {worstPerformers.map(asset => (
              <div key={asset.symbol} className="bg-muted/50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{asset.symbol}</p>
                  <span className="text-red-500 font-semibold">
                    -{Math.abs(asset.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Portfolio Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-xl font-semibold">
              ₹{totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Best Return</p>
            <p className="text-xl font-semibold text-green-500">
              +{Math.abs(bestPerformers[0]?.change || 0)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Worst Return</p>
            <p className="text-xl font-semibold text-red-500">
              -{Math.abs(worstPerformers[0]?.change || 0)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Assets</p>
            <p className="text-xl font-semibold">
              {assets.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

