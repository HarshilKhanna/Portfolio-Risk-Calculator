"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { usePortfolio } from "@/src/context/PortfolioContext"

type ShareData = {
  name: string
  value: number
  color: string
  symbol: string  // Adding symbol for identification
}

export function AssetAllocation() {
  const { assets } = usePortfolio()
  const [data, setData] = useState<ShareData[]>([])

  useEffect(() => {
    if (!assets.length) return

    const totalValue = assets.reduce((acc, asset) => 
      acc + (asset.quantity * asset.currentPrice * 86), 0
    )

    // Calculate percentage for each share
    const shareData = assets.map((asset, index) => {
      const value = (asset.quantity * asset.currentPrice * 86)
      const percentage = (value / totalValue) * 100

      // Generate a unique color for each share using HSL
      const hue = (index * 137.5) % 360
      const color = `hsl(${hue}, 70%, 45%)`

      return {
        name: asset.symbol, // Using symbol instead of name
        symbol: asset.symbol,
        value: Number(percentage.toFixed(1)),
        color: color
      }
    })

    // Sort by value descending
    shareData.sort((a, b) => b.value - a.value)

    setData(shareData)
  }, [assets])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const share = payload[0].payload
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm">
          <p className="font-medium">{share.symbol}</p>
          <p className="text-sm text-muted-foreground">{`${share.value}% of portfolio`}</p>
        </div>
      )
    }
    return null
  }

  if (data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-32 w-32 rounded-full bg-muted animate-pulse"></div>
          <p className="text-muted-foreground">Loading portfolio allocation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ value, name }) => value > 5 ? `${name} ${value}%` : ''}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <p className="text-muted-foreground">Loading portfolio allocation...</p>
        </div>
      )}
    </div>
  )
}

