"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

export function PortfolioMetrics() {
  const [metrics, setMetrics] = useState({
    sharpeRatio: 0,
    standardDeviation: 0,
    expectedReturn: 0,
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setMetrics({
        sharpeRatio: 1.8,
        standardDeviation: 12.5,
        expectedReturn: 14.2,
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [])

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
              <p className="text-2xl font-bold">{metrics.sharpeRatio.toFixed(2)}</p>
            )}
            <p className="text-xs text-muted-foreground">Risk-adjusted return</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Std Deviation</p>
            {metrics.standardDeviation === 0 ? (
              <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl font-bold">{`${metrics.standardDeviation.toFixed(1)}%`}</p>
            )}
            <p className="text-xs text-muted-foreground">Volatility measure</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Expected Return</p>
            {metrics.expectedReturn === 0 ? (
              <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl font-bold">{`${metrics.expectedReturn.toFixed(1)}%`}</p>
            )}
            <p className="text-xs text-muted-foreground">Annual projection</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

