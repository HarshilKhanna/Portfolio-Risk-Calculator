"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "@/Portfolio-Risk-Calculator/components/ui/chart"

type PerformanceData = {
  date: string
  value: number
}

export function PerformanceChart({ days = 30 }: { days?: number }) {
  const [data, setData] = useState<PerformanceData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    // Generate mock data based on days
    const generateData = () => {
      const data: PerformanceData[] = []
      const today = new Date()
      let baseValue = 1000000

      for (let i = days; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Add some randomness to the value
        const change = Math.random() * 0.04 - 0.02 // -2% to +2%
        baseValue = baseValue * (1 + change)

        data.push({
          date: date.toISOString().split("T")[0],
          value: Math.round(baseValue),
        })
      }

      return data
    }

    const timer = setTimeout(() => {
      setData(generateData())
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [days])

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
          <p className="font-medium">{label}</p>
          <p className="text-primary">{formatCurrency(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <div className="w-full max-w-md space-y-4">
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded"></div>
          <p className="text-center text-muted-foreground mt-4">Loading performance data...</p>
        </div>
      </div>
    )
  }

  const startValue = data[0]?.value || 0
  const endValue = data[data.length - 1]?.value || 0
  const isPositive = endValue >= startValue

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const d = new Date(date)
              return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
            }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(value) => {
              return new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(value)
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={startValue} stroke="#9CA3AF" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "#10B981" : "#EF4444"}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

