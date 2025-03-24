"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { usePortfolio } from "@/src/context/PortfolioContext"

export function PortfolioMetrics() {
  const { assets } = usePortfolio()
  const [metrics, setMetrics] = useState({
    sharpeRatio: 0,
    standardDeviation: 0,
    expectedReturn: 0,
  })

  useEffect(() => {
    if (!assets.length) return

    const calculateMetrics = () => {
      // 1. Individual asset returns
      const assetReturns = assets.map(asset => {
        const currentPriceINR = asset.currentPrice * 86
        const return_val = ((currentPriceINR - asset.purchasePrice) / asset.purchasePrice) * 100
        console.log(`${asset.symbol} Return Calculation:`, {
          currentPriceINR,
          purchasePrice: asset.purchasePrice,
          calculation: `((${currentPriceINR} - ${asset.purchasePrice}) / ${asset.purchasePrice}) * 100 = ${return_val}%`
        })
        return {
          symbol: asset.symbol,
          return: return_val
        }
      })

      // 2. Total portfolio value
      const totalValue = assets.reduce((acc, asset) => {
        const value = asset.quantity * asset.currentPrice * 86
        console.log(`${asset.symbol} Portfolio Value:`, {
          quantity: asset.quantity,
          priceINR: asset.currentPrice * 86,
          value: value
        })
        return acc + value
      }, 0)
      console.log('Total Portfolio Value:', totalValue)

      // 3. Asset weights
      const assetWeights = assets.map(asset => {
        const weight = (asset.quantity * asset.currentPrice * 86) / totalValue
        console.log(`${asset.symbol} Weight:`, {
          value: asset.quantity * asset.currentPrice * 86,
          totalValue,
          weight: weight,
          percentage: `${(weight * 100).toFixed(2)}%`
        })
        return {
          symbol: asset.symbol,
          weight: weight
        }
      })

      // 4. Portfolio return
      const portfolioReturn = assetReturns.reduce((acc, asset, index) => {
        const weightedReturn = asset.return * assetWeights[index].weight
        console.log(`${asset.symbol} Weighted Return:`, {
          return: asset.return,
          weight: assetWeights[index].weight,
          weightedReturn: weightedReturn
        })
        return acc + weightedReturn
      }, 0)
      console.log('Portfolio Return:', `${portfolioReturn.toFixed(4)}%`)

      // 5. Standard deviation
      const meanReturn = assetReturns.reduce((acc, asset) => acc + asset.return, 0) / assets.length
      console.log('Mean Return:', meanReturn)

      const portfolioStdDev = Math.sqrt(
        assetReturns.reduce((acc, asset, index) => {
          const deviation = Math.pow(asset.return - meanReturn, 2) * assetWeights[index].weight
          console.log(`${asset.symbol} Std Dev Calculation:`, {
            return: asset.return,
            meanReturn: meanReturn,
            deviation: `(${asset.return} - ${meanReturn})² * ${assetWeights[index].weight} = ${deviation}`
          })
          return acc + deviation
        }, 0)
      )
      console.log('Portfolio Standard Deviation:', portfolioStdDev)

      // 6. Sharpe ratio
      const sharpeRatio = portfolioStdDev === 0 ? 0 : portfolioReturn / portfolioStdDev
      console.log('Sharpe Ratio:', {
        portfolioReturn,
        portfolioStdDev,
        sharpeRatio: sharpeRatio
      })

      return {
        sharpeRatio,
        standardDeviation: portfolioStdDev,
        expectedReturn: portfolioReturn
      }
    }

    setMetrics(calculateMetrics())
  }, [assets])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
        <CardDescription>Performance and risk indicators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Sharpe Ratio</p>
            {metrics.sharpeRatio === 0 ? (
              <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl font-bold">{metrics.sharpeRatio.toFixed(4)}</p>
            )}
            <p className="text-xs text-muted-foreground">Risk-adjusted return</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Std Deviation</p>
            {metrics.standardDeviation === 0 ? (
              <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl font-bold">{metrics.standardDeviation.toFixed(2)}</p>
            )}
            <p className="text-xs text-muted-foreground">Volatility measure</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Portfolio Return</p>
            {metrics.expectedReturn === 0 ? (
              <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl font-bold">{`${metrics.expectedReturn.toFixed(4)}%`}</p>
            )}
            <p className="text-xs text-muted-foreground">Total weighted return</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

