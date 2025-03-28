"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "@/components/ui/chart"
import { usePortfolio } from "@/src/context/PortfolioContext"

type SimulationData = {
  month: number
  current: number
  simulated: number
}

export function SimulationChart() {
  const { assets } = usePortfolio()
  const [data, setData] = useState<SimulationData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Generate initial simulation data
    generateSimulationData()

    // Listen for simulation events
    const handleSimulation = () => {
      generateSimulationData(true)
    }

    window.addEventListener("runSimulation", handleSimulation)

    return () => {
      window.removeEventListener("runSimulation", handleSimulation)
    }
  }, [])

  const generateSimulationData = (isNewSimulation = false) => {
    setIsLoading(true)

    // Calculate current portfolio value
    const currentPortfolioValue = assets.reduce((acc, asset) => 
      acc + (asset.quantity * asset.currentPrice * 86), 0
    )

    // Calculate current portfolio return
    const currentReturn = assets.reduce((acc, asset) => {
      const weight = (asset.quantity * asset.currentPrice * 86) / currentPortfolioValue
      const assetReturn = ((asset.currentPrice * 86) - asset.purchasePrice) / asset.purchasePrice
      return acc + (assetReturn * weight)
    }, 0)

    // Use actual portfolio metrics for simulation
    const currentMonthlyReturn = currentReturn / 12
    const simulatedMonthlyReturn = isNewSimulation ? 
      currentMonthlyReturn * 1.2 : // 20% improvement
      currentMonthlyReturn * 1.1   // 10% improvement

    const newData: SimulationData[] = []
    const months = 60
    let currentValue = currentPortfolioValue
    let simulatedValue = currentPortfolioValue

    // Standard deviation for randomness
    const stdDev = 0.015

    for (let i = 0; i <= months; i++) {
      // Add some randomness to the returns
      const currentRandomFactor = 1 + (currentMonthlyReturn + (Math.random() * stdDev * 2 - stdDev))
      const simulatedRandomFactor = 1 + (simulatedMonthlyReturn + (Math.random() * stdDev * 2 - stdDev))

      currentValue = currentValue * currentRandomFactor
      simulatedValue = simulatedValue * simulatedRandomFactor

      newData.push({
        month: i,
        current: Math.round(currentValue),
        simulated: Math.round(simulatedValue),
      })
    }

    setData(newData)
    setIsLoading(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded-md shadow-sm">
          <p className="font-medium">Month {label}</p>
          <p className="text-sm text-blue-600">Current: {formatCurrency(payload[0].value)}</p>
          <p className="text-sm text-green-600">Simulated: {formatCurrency(payload[1].value)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Difference: {formatCurrency(payload[1].value - payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <div className="w-full max-w-lg space-y-4">
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-4/5 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
          <p className="text-center text-muted-foreground mt-4">Loading simulation data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="month" label={{ value: "Months", position: "insideBottomRight", offset: -10 }} />
          <YAxis
            tickFormatter={(value) => {
              return new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(value)
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine y={data[0]?.current} stroke="#9CA3AF" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="current"
            name="Current Portfolio"
            stroke="#1E3A8A"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="simulated"
            name="Simulated Portfolio"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

