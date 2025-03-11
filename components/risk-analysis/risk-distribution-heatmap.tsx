"use client"

import { useTheme } from "next-themes"
import { Tooltip, Treemap, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Stocks",
    children: [
      { name: "AAPL", size: 25, risk: 75 },
      { name: "MSFT", size: 15, risk: 65 },
      { name: "TSLA", size: 8, risk: 90 },
      { name: "AMZN", size: 12, risk: 80 },
      { name: "GOOGL", size: 10, risk: 70 },
    ],
  },
  {
    name: "ETFs",
    children: [
      { name: "VOO", size: 10, risk: 50 },
      { name: "VTI", size: 8, risk: 45 },
      { name: "QQQ", size: 5, risk: 60 },
    ],
  },
  {
    name: "Bonds",
    children: [
      { name: "AGG", size: 30, risk: 20 },
      { name: "BND", size: 15, risk: 15 },
    ],
  },
  {
    name: "Other",
    children: [{ name: "BTC", size: 5, risk: 95 }],
  },
]

const COLORS = [
  "#4f46e5", // primary
  "#10b981", // success
  "#f59e0b", // warning
  "#ef4444", // destructive
]

// Function to get color based on risk level
const getRiskColor = (risk: number) => {
  if (risk < 30) return "rgba(16, 185, 129, 0.7)" // Low risk - green
  if (risk < 70) return "rgba(245, 158, 11, 0.7)" // Medium risk - yellow/orange
  return "rgba(239, 68, 68, 0.7)" // High risk - red
}

export function RiskDistributionHeatmap() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const CustomizedContent = (props: any) => {
    const { root, depth, x, y, width, height, index, name, risk, size } = props

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth === 1 ? getRiskColor(risk) : COLORS[Math.floor(index / 5) % COLORS.length],
            stroke: isDark ? "#222" : "#fff",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 && width > 50 && height > 25 ? (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isDark ? "#fff" : "#000"}
            fontSize={12}
            fontWeight="bold"
          >
            {name}
          </text>
        ) : null}
      </g>
    )
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke={isDark ? "#222" : "#fff"}
          content={<CustomizedContent />}
        >
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "hsl(var(--card))" : "hsl(var(--card))",
              borderColor: isDark ? "hsl(var(--border))" : "hsl(var(--border))",
              color: isDark ? "hsl(var(--card-foreground))" : "hsl(var(--card-foreground))",
            }}
            formatter={(value: any, name: string, props: any) => {
              const { payload } = props
              if (payload.risk) {
                return [`Risk Level: ${payload.risk}%`, name]
              }
              return [value, name]
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  )
}

