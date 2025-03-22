"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "@/Portfolio-Risk-Calculator/components/ui/chart"

type AssetData = {
  name: string
  value: number
  color: string
}

export function AssetAllocation() {
  const [data, setData] = useState<AssetData[]>([])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData([
        { name: "Equities", value: 45, color: "#1E3A8A" },
        { name: "Bonds", value: 25, color: "#3B82F6" },
        { name: "Real Estate", value: 15, color: "#60A5FA" },
        { name: "Commodities", value: 10, color: "#93C5FD" },
        { name: "Cash", value: 5, color: "#BFDBFE" },
      ])
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
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
          <p className="text-muted-foreground">Loading asset allocation...</p>
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
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <p className="text-muted-foreground">Loading asset allocation...</p>
        </div>
      )}
    </div>
  )
}

