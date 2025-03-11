"use client"

import { useTheme } from "next-themes"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Jan", value: 180000 },
  { date: "Feb", value: 190000 },
  { date: "Mar", value: 185000 },
  { date: "Apr", value: 195000 },
  { date: "May", value: 210000 },
  { date: "Jun", value: 205000 },
  { date: "Jul", value: 220000 },
  { date: "Aug", value: 230000 },
  { date: "Sep", value: 225000 },
  { date: "Oct", value: 235000 },
  { date: "Nov", value: 240000 },
  { date: "Dec", value: 245678.9 },
]

export function PortfolioValueChart() {
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
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
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
            formatter={(value: number) => [formatCurrency(value), "Portfolio Value"]}
          />
          <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

