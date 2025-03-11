"use client"

import { useTheme } from "next-themes"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Stocks", value: 45 },
  { name: "Bonds", value: 25 },
  { name: "ETFs", value: 15 },
  { name: "Cash", value: 10 },
  { name: "Crypto", value: 5 },
]

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--success))",
  "hsl(var(--warning))",
  "hsl(var(--destructive))",
  "hsl(var(--muted-foreground))",
]

export function AssetAllocationChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "hsl(var(--card))" : "hsl(var(--card))",
              borderColor: isDark ? "hsl(var(--border))" : "hsl(var(--border))",
              color: isDark ? "hsl(var(--card-foreground))" : "hsl(var(--card-foreground))",
            }}
            formatter={(value: number) => [`${value}%`, "Allocation"]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

