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

type AssetRisk = {
  name: string
  risk: number
  return: number
  allocation: number
  type: string
}

export function RiskScatterPlot() {
  const [data, setData] = useState<AssetRisk[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData([
        { name: "HDFC Bank", risk: 15, return: 18, allocation: 15, type: "Equity" },
        { name: "Reliance Industries", risk: 18, return: 14, allocation: 12, type: "Equity" },
        { name: "TCS", risk: 12, return: 16, allocation: 10, type: "Equity" },
        { name: "Infosys", risk: 14, return: 15, allocation: 8, type: "Equity" },
        { name: "Govt Bond 2030", risk: 3, return: 7, allocation: 15, type: "Bond" },
        { name: "Corp Bond AAA", risk: 5, return: 8, allocation: 10, type: "Bond" },
        { name: "Gold ETF", risk: 10, return: 9, allocation: 10, type: "Commodity" },
        { name: "Silver ETF", risk: 12, return: 8, allocation: 5, type: "Commodity" },
        { name: "Real Estate Fund", risk: 8, return: 12, allocation: 15, type: "Real Estate" },
      ])
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

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
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            type="number"
            dataKey="risk"
            name="Risk"
            unit="%"
            domain={[0, "dataMax"]}
            label={{ value: "Risk (%)", position: "bottom", offset: 0 }}
          />
          <YAxis
            type="number"
            dataKey="return"
            name="Return"
            unit="%"
            domain={[0, "dataMax"]}
            label={{ value: "Return (%)", angle: -90, position: "left" }}
          />
          <ZAxis type="number" dataKey="allocation" range={[50, 400]} name="Allocation" unit="%" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {Object.entries(groupedData).map(([type, assets]) => (
            <Scatter key={type} name={type} data={assets} fill={getTypeColor(type)} />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

