"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "@/components/ui/chart"

type SectorData = {
  name: string
  value: number
  color: string
}

export function SectorDistribution() {
  const [data, setData] = useState<SectorData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData([
        { name: "Technology", value: 28, color: "#1E3A8A" },
        { name: "Financial", value: 22, color: "#3B82F6" },
        { name: "Healthcare", value: 15, color: "#60A5FA" },
        { name: "Consumer", value: 12, color: "#93C5FD" },
        { name: "Energy", value: 10, color: "#BFDBFE" },
        { name: "Industrial", value: 8, color: "#2563EB" },
        { name: "Utilities", value: 5, color: "#1D4ED8" },
      ])
      setIsLoading(false)
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

  if (isLoading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 w-full">
          <div className="w-full h-40 bg-muted animate-pulse rounded"></div>
          <p className="text-muted-foreground">Loading sector data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={true} vertical={false} />
          <XAxis type="number" domain={[0, "dataMax"]} tickFormatter={(value) => `${value}%`} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={70} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

