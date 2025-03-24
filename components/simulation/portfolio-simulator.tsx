"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PlayCircle, Save } from "lucide-react"
import { usePortfolio } from "@/src/context/PortfolioContext"

type AssetAllocation = {
  name: string
  allocation: number
  color: string
}

export function PortfolioSimulator() {
  const { assets } = usePortfolio()
  const [allocations, setAllocations] = useState<AssetAllocation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalAllocation, setTotalAllocation] = useState(100)

  useEffect(() => {
    if (!assets.length) {
      setIsLoading(false)
      return
    }

    // Calculate current allocations from portfolio
    const totalValue = assets.reduce((acc, asset) => 
      acc + (asset.quantity * asset.currentPrice * 86), 0
    )

    // Group assets by type and calculate allocations
    const groupedAllocations = assets.reduce((acc: { [key: string]: number }, asset) => {
      const value = (asset.quantity * asset.currentPrice * 86)
      const type = asset.type || 'Other'
      acc[type] = (acc[type] || 0) + (value / totalValue * 100)
      return acc
    }, {})

    // Convert to AssetAllocation array with colors
    const typeColors: { [key: string]: string } = {
      'Equity': '#1E3A8A',
      'Bond': '#10B981',
      'Real Estate': '#EF4444',
      'Commodity': '#F59E0B',
      'Cash': '#6B7280',
      'Other': '#6B7280'
    }

    const newAllocations = Object.entries(groupedAllocations).map(([type, allocation]) => ({
      name: type,
      allocation: Number(allocation.toFixed(1)),
      color: typeColors[type] || typeColors.Other
    }))

    setAllocations(newAllocations)
    setIsLoading(false)
  }, [assets])

  useEffect(() => {
    // Calculate total allocation
    const total = allocations.reduce((sum, asset) => sum + asset.allocation, 0)
    setTotalAllocation(total)
  }, [allocations])

  const handleAllocationChange = (index: number, value: number[]) => {
    const newAllocations = [...allocations]
    newAllocations[index].allocation = value[0]
    setAllocations(newAllocations)
  }

  const runSimulation = () => {
    // In a real app, this would trigger a simulation calculation
    console.log("Running simulation with allocations:", allocations)

    // Dispatch an event that the simulation chart component can listen to
    const event = new CustomEvent("runSimulation", { detail: { allocations } })
    window.dispatchEvent(event)
  }

  const saveSimulation = () => {
    // In a real app, this would save the simulation
    console.log("Saving simulation with allocations:", allocations)
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
        {allocations.map((asset, index) => (
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

