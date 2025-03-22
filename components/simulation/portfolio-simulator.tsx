"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/Portfolio-Risk-Calculator/components/ui/slider"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import { Label } from "@/Portfolio-Risk-Calculator/components/ui/label"
import { PlayCircle, Save } from "lucide-react"

type AssetAllocation = {
  name: string
  allocation: number
  color: string
}

export function PortfolioSimulator() {
  const [assets, setAssets] = useState<AssetAllocation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalAllocation, setTotalAllocation] = useState(100)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setAssets([
        { name: "Equities", allocation: 45, color: "#1E3A8A" },
        { name: "Bonds", allocation: 25, color: "#10B981" },
        { name: "Real Estate", allocation: 15, color: "#EF4444" },
        { name: "Commodities", allocation: 10, color: "#F59E0B" },
        { name: "Cash", allocation: 5, color: "#6B7280" },
      ])
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Calculate total allocation
    const total = assets.reduce((sum, asset) => sum + asset.allocation, 0)
    setTotalAllocation(total)
  }, [assets])

  const handleAllocationChange = (index: number, value: number[]) => {
    const newAssets = [...assets]
    newAssets[index].allocation = value[0]
    setAssets(newAssets)
  }

  const runSimulation = () => {
    // In a real app, this would trigger a simulation calculation
    console.log("Running simulation with allocations:", assets)

    // Dispatch an event that the simulation chart component can listen to
    const event = new CustomEvent("runSimulation", { detail: { assets } })
    window.dispatchEvent(event)
  }

  const saveSimulation = () => {
    // In a real app, this would save the simulation
    console.log("Saving simulation with allocations:", assets)
  }

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <div className="w-full space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-1/3 bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-full bg-muted animate-pulse rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-1/3 bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-full bg-muted animate-pulse rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-1/3 bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-full bg-muted animate-pulse rounded"></div>
          </div>
          <p className="text-center text-muted-foreground mt-4">Loading simulator...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {assets.map((asset, index) => (
          <div key={asset.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="font-medium">{asset.name}</Label>
              <span className="text-sm font-medium">{asset.allocation}%</span>
            </div>
            <Slider
              value={[asset.allocation]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => handleAllocationChange(index, value)}
              className="[&>.slider-thumb]:bg-primary"
            />
          </div>
        ))}
      </div>

      <div className="pt-2 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Total Allocation</span>
          <span className={`font-bold ${totalAllocation === 100 ? "text-green-500" : "text-red-500"}`}>
            {totalAllocation}%
          </span>
        </div>

        <div className="flex flex-col space-y-2">
          <Button onClick={runSimulation} disabled={totalAllocation !== 100}>
            <PlayCircle className="h-4 w-4 mr-2" />
            Run Simulation
          </Button>

          <Button variant="outline" onClick={saveSimulation} disabled={totalAllocation !== 100}>
            <Save className="h-4 w-4 mr-2" />
            Save Simulation
          </Button>
        </div>
      </div>
    </div>
  )
}

