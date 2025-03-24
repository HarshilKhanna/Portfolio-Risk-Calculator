"use client"

import { useEffect, useState } from "react"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Legend,
} from "@/components/ui/chart"
import { usePortfolio } from "@/src/context/PortfolioContext"

type AssetRisk = {
  name: string
  risk: number
  return: number
  allocation: number
  type: string
}

export function RiskScatterPlot() {
  const { assets } = usePortfolio()
  const [data, setData] = useState<AssetRisk[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!assets.length) {
      setIsLoading(false)
      return
    }

    const totalValue = assets.reduce((acc, asset) => 
      acc + (asset.quantity * asset.currentPrice * 86), 0
    )

    const riskReturnData: AssetRisk[] = assets.map(asset => {
      const risk = Math.abs(asset.regularMarketChangePercent)
      const return_ = ((asset.currentPrice * 86) - asset.purchasePrice) / asset.purchasePrice * 100
      const allocation = (asset.quantity * asset.currentPrice * 86) / totalValue * 100

      return {
        name: asset.symbol,
        risk,
        return: return_,
        allocation,
        type: asset.type
      }
    })

    setData(riskReturnData)
    setIsLoading(false)
  }, [assets])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Equity":
        return "#1E3A8A"
      case "Bond":
        return "#10B981"
      case "Commodity":
        return "#F59E0B"
      case "Real Estate":
        return "#EF4444"
      default:
        return "#6B7280"
    }
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background p-3 border rounded-md shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">Risk: {data.risk}%</p>
          <p className="text-sm">Return: {data.return}%</p>
          <p className="text-sm">Allocation: {data.allocation}%</p>
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
          <p className="text-muted-foreground">Loading risk analysis...</p>
        </div>
      </div>
    )
  }

  // Group data by type for the scatter series
  const groupedData = data.reduce(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = []
      }
      acc[item.type].push(item)
      return acc
    },
    {} as Record<string, AssetRisk[]>,
  )

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart 
          margin={{ 
            top: 20, 
            right: 30, 
            bottom: 60,
            left: 80
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            type="number"
            dataKey="risk"
            name="Risk"
            unit="%"
            domain={[0, "dataMax"]}
            label={{ 
              value: "Risk (%)", 
              position: "bottom", 
              offset: 10
            }}
          />
          <YAxis
            type="number"
            dataKey="return"
            name="Return"
            unit="%"
            domain={[0, "dataMax"]}
            tickFormatter={(value) => value.toFixed(2)}
            label={{ 
              value: "Return (%)", 
              angle: -90, 
              position: "insideLeft",
              offset: -35,
              dy: 50
            }}
            tickMargin={10}
          />
          <ZAxis 
            type="number" 
            dataKey="allocation" 
            range={[50, 400]} 
            name="Allocation" 
            unit="%" 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            align="center"
            layout="horizontal"
            wrapperStyle={{
              paddingTop: "20px",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)"
            }}
          />

          {Object.entries(groupedData).map(([type, assets]) => (
            <Scatter key={type} name={type} data={assets} fill={getTypeColor(type)} />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

