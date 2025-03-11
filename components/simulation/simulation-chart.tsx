"use client"

import { useTheme } from "next-themes"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate simulation data
const generateSimulationData = () => {
  const baseValue = 245678.9
  const years = 10
  const data = []

  // Optimistic scenario: ~12% annual growth
  const optimisticData = []
  // Moderate scenario: ~8% annual growth
  const moderateData = []
  // Conservative scenario: ~5% annual growth
  const conservativeData = []

  for (let i = 0; i <= years; i++) {
    const optimisticValue = baseValue * Math.pow(1.12, i)
    const moderateValue = baseValue * Math.pow(1.08, i)
    const conservativeValue = baseValue * Math.pow(1.05, i)

    data.push({
      year: `Year ${i}`,
      optimistic: Math.round(optimisticValue),
      moderate: Math.round(moderateValue),
      conservative: Math.round(conservativeValue),
    })
  }

  return data
}

const simulationData = generateSimulationData()

export function SimulationChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={simulationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorModerate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="year"
            tick={{ fill: isDark ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: isDark ? "hsl(var(--border))" : "hsl(var(--border))" }}
            tickLine={{ stroke: isDark ? "hsl(var(--border))" : "hsl(var(--border))" }}
          />
          <YAxis
            tickFormatter={formatCurrency}
            tick={{ fill: isDark ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: isDark ? "hsl(var(--border))" : "hsl(var(--border))" }}
            tickLine={{ stroke: isDark ? "hsl(var(--border))" : "hsl(var(--border))" }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "hsl(var(--border))" : "hsl(var(--border))"} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "hsl(var(--card))" : "hsl(var(--card))",
              borderColor: isDark ? "hsl(var(--border))" : "hsl(var(--border))",
              color: isDark ? "hsl(var(--card-foreground))" : "hsl(var(--card-foreground))",
            }}
            formatter={(value: number) => [formatCurrency(value), ""]}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="optimistic"
            name="Optimistic"
            stroke="hsl(var(--success))"
            fillOpacity={1}
            fill="url(#colorOptimistic)"
          />
          <Area
            type="monotone"
            dataKey="moderate"
            name="Moderate"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorModerate)"
          />
          <Area
            type="monotone"
            dataKey="conservative"
            name="Conservative"
            stroke="hsl(var(--warning))"
            fillOpacity={1}
            fill="url(#colorConservative)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

