"use client"

import { useTheme } from "next-themes"
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"

const stocksData = [
  { name: "AAPL", risk: 18, return: 15, size: 25 },
  { name: "MSFT", risk: 16, return: 14, size: 15 },
  { name: "TSLA", risk: 30, return: 25, size: 8 },
  { name: "AMZN", risk: 22, return: 18, size: 12 },
  { name: "GOOGL", risk: 20, return: 16, size: 10 },
]

const etfsData = [
  { name: "VOO", risk: 14, return: 12, size: 10 },
  { name: "VTI", risk: 13, return: 11, size: 8 },
  { name: "QQQ", risk: 17, return: 14, size: 5 },
]

const bondsData = [
  { name: "AGG", risk: 5, return: 4, size: 30 },
  { name: "BND", risk: 4, return: 3.5, size: 15 },
]

const otherData = [{ name: "BTC", risk: 40, return: 30, size: 5 }]

export function RiskReturnScatterPlot() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "hsl(var(--border))" : "hsl(var(--border))"} />
          <XAxis
            type="number"
            dataKey="risk"
            name="Risk"
            unit="%"
            domain={[0, 45]}
            label={{ value: "Risk (Standard Deviation)", position: "bottom", offset: 0 }}
            tick={{ fill: isDark ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: isDark ? "hsl(var(--border))" : "hsl(var(--border))" }}
            tickLine={{ stroke: isDark ? "hsl(var(--border))" : "hsl(var(--border))" }}
          />
          <YAxis
            type="number"
            dataKey="return"
            name="Return"
            unit="%"
            domain={[0, 35]}
            label={{ value: "Expected Return", angle: -90, position: "left" }}
            tick={{ fill: isDark ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: isDark ? "hsl(var(--border))" : "hsl(var(--border))" }}
            tickLine={{ stroke: isDark ? "hsl(var(--border))" : "hsl(var(--border))" }}
          />
          <ZAxis type="number" dataKey="size" range={[50, 400]} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: isDark ? "hsl(var(--card))" : "hsl(var(--card))",
              borderColor: isDark ? "hsl(var(--border))" : "hsl(var(--border))",
              color: isDark ? "hsl(var(--card-foreground))" : "hsl(var(--card-foreground))",
            }}
            formatter={(value: number, name: string) => {
              if (name === "Risk") return [`${value}%`, name]
              if (name === "Return") return [`${value}%`, name]
              return [value, name]
            }}
          />
          <Legend />
          <Scatter name="Stocks" data={stocksData} fill="hsl(var(--primary))" />
          <Scatter name="ETFs" data={etfsData} fill="hsl(var(--success))" />
          <Scatter name="Bonds" data={bondsData} fill="hsl(var(--warning))" />
          <Scatter name="Other" data={otherData} fill="hsl(var(--destructive))" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

