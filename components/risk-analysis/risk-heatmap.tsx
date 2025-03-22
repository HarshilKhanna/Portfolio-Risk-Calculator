"use client"

import React from "react"

import { useEffect, useState } from "react"

type HeatmapData = {
  sector: string
  geography: string
  value: number
}

export function RiskHeatmap() {
  const [data, setData] = useState<HeatmapData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const sectors = ["Financial", "Technology", "Healthcare", "Energy", "Consumer"]
      const geographies = ["India", "US", "Europe", "Asia", "Emerging"]

      const generatedData: HeatmapData[] = []

      sectors.forEach((sector) => {
        geographies.forEach((geography) => {
          generatedData.push({
            sector,
            geography,
            value: Math.floor(Math.random() * 100),
          })
        })
      })

      setData(generatedData)
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const getColorIntensity = (value: number) => {
    // Color scale from light to dark
    if (value < 20) return "bg-blue-100 dark:bg-blue-900"
    if (value < 40) return "bg-blue-200 dark:bg-blue-800"
    if (value < 60) return "bg-blue-300 dark:bg-blue-700"
    if (value < 80) return "bg-blue-400 dark:bg-blue-600"
    return "bg-blue-500 dark:bg-blue-500"
  }

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading risk heatmap...</p>
      </div>
    )
  }

  // Get unique sectors and geographies
  const sectors = Array.from(new Set(data.map((item) => item.sector)))
  const geographies = Array.from(new Set(data.map((item) => item.geography)))

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-[auto_repeat(5,1fr)]">
          {/* Header row */}
          <div className="p-2 font-medium"></div>
          {geographies.map((geo) => (
            <div key={geo} className="p-2 font-medium text-center">
              {geo}
            </div>
          ))}

          {/* Data rows */}
          {sectors.map((sector) => (
            <React.Fragment key={sector}>
              <div className="p-2 font-medium">{sector}</div>
              {geographies.map((geo) => {
                const cellData = data.find((d) => d.sector === sector && d.geography === geo)
                const value = cellData ? cellData.value : 0

                return (
                  <div key={`${sector}-${geo}`} className={`p-2 text-center ${getColorIntensity(value)}`}>
                    {value}%
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-end space-x-2">
          <span className="text-sm text-muted-foreground">Risk Exposure:</span>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900"></div>
            <span className="text-xs ml-1">Low</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-300 dark:bg-blue-700"></div>
            <span className="text-xs ml-1">Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 dark:bg-blue-500"></div>
            <span className="text-xs ml-1">High</span>
          </div>
        </div>
      </div>
    </div>
  )
}

