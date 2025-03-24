"use client"

import React from "react"
import { useEffect, useState } from "react"
import { usePortfolio } from "@/src/context/PortfolioContext"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

type DistributionData = {
  range: string
  frequency: number
  assets: Array<{
    name: string
    sharpeRatio: number
    type: string
    allocation: number
  }>
}

export function RiskHeatmap() {
  const { assets } = usePortfolio()
  const [data, setData] = useState<DistributionData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!assets.length) {
      setIsLoading(false)
      return
    }

    const riskFreeRate = 0
    const totalValue = assets.reduce((acc, asset) => 
      acc + (asset.quantity * asset.currentPrice * 86), 0
    )

    // Calculate Sharpe Ratios
    const sharpeRatios = assets.map(asset => {
      const returnPerc = ((asset.currentPrice * 86) - asset.purchasePrice) / asset.purchasePrice * 100
      const volatility = Math.abs(asset.regularMarketChangePercent)
      const sharpeRatio = volatility !== 0 ? (returnPerc - riskFreeRate) / volatility : 0
      const allocation = (asset.quantity * asset.currentPrice * 86) / totalValue * 100

      return {
        name: asset.symbol,
        sharpeRatio: Number(sharpeRatio.toFixed(2)),
        type: asset.type,
        allocation
      }
    })

    // Create distribution ranges
    const minSharpe = Math.floor(Math.min(...sharpeRatios.map(r => r.sharpeRatio)))
    const maxSharpe = Math.ceil(Math.max(...sharpeRatios.map(r => r.sharpeRatio)))
    const binSize = (maxSharpe - minSharpe) / 10 // Create 10 bins

    // Initialize bins
    const bins: DistributionData[] = []
    for (let i = minSharpe; i < maxSharpe; i += binSize) {
      bins.push({
        range: `${i.toFixed(1)}-${(i + binSize).toFixed(1)}`,
        frequency: 0,
        assets: []
      })
    }

    // Fill bins
    sharpeRatios.forEach(asset => {
      const binIndex = Math.min(
        Math.floor((asset.sharpeRatio - minSharpe) / binSize),
        bins.length - 1
      )
      if (binIndex >= 0) {
        bins[binIndex].frequency++
        bins[binIndex].assets.push(asset)
      }
    })

    setData(bins)
    setIsLoading(false)
  }, [assets])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const binData = payload[0].payload
      return (
        <div className="bg-background p-3 border rounded-md shadow-sm">
          <p className="font-medium">Sharpe Ratio Range: {binData.range}</p>
          <p className="text-sm">Number of Assets: {binData.frequency}</p>
          <div className="mt-2">
            <p className="text-sm font-medium">Assets in this range:</p>
            {binData.assets.map((asset: any) => (
              <div key={asset.name} className="text-xs mt-1">
                {asset.name} (SR: {asset.sharpeRatio})
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-40 w-40 rounded-lg bg-muted animate-pulse"></div>
          <p className="text-muted-foreground">Loading Sharpe ratio distribution...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 50,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="range"
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
            label={{
              value: "Sharpe Ratio Range",
              position: "bottom",
              offset: 40
            }}
          />
          <YAxis
            label={{
              value: "Number of Assets",
              angle: -90,
              position: "left",
              offset: 10
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            x={data.findIndex(d => d.range.includes("0"))}
            stroke="#666"
            strokeDasharray="3 3"
            label={{
              value: "Zero Sharpe Ratio",
              position: "top",
              fill: "#666"
            }}
          />
          <Area
            type="monotone"
            dataKey="frequency"
            stroke="#1E3A8A"
            fill="#1E3A8A"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

