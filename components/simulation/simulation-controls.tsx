"use client"

import { useState } from "react"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import { Label } from "@/Portfolio-Risk-Calculator/components/ui/label"
import { Slider } from "@/Portfolio-Risk-Calculator/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Portfolio-Risk-Calculator/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Portfolio-Risk-Calculator/components/ui/select"

export function SimulationControls() {
  const [stocksAllocation, setStocksAllocation] = useState(65)
  const [etfsAllocation, setEtfsAllocation] = useState(20)
  const [bondsAllocation, setBondsAllocation] = useState(10)
  const [otherAllocation, setOtherAllocation] = useState(5)
  const [timeHorizon, setTimeHorizon] = useState("5")
  const [marketCondition, setMarketCondition] = useState("normal")

  const handleStocksChange = (value: number[]) => {
    const newValue = value[0]
    const diff = newValue - stocksAllocation

    // Adjust other allocations proportionally
    const total = etfsAllocation + bondsAllocation + otherAllocation
    if (total === 0) return

    const newEtfsAllocation = Math.max(0, Math.round(etfsAllocation - (diff * etfsAllocation) / total))
    const newBondsAllocation = Math.max(0, Math.round(bondsAllocation - (diff * bondsAllocation) / total))
    const newOtherAllocation = 100 - newValue - newEtfsAllocation - newBondsAllocation

    setStocksAllocation(newValue)
    setEtfsAllocation(newEtfsAllocation)
    setBondsAllocation(newBondsAllocation)
    setOtherAllocation(newOtherAllocation)
  }

  const handleEtfsChange = (value: number[]) => {
    const newValue = value[0]
    const diff = newValue - etfsAllocation

    // Adjust other allocations proportionally
    const total = stocksAllocation + bondsAllocation + otherAllocation
    if (total === 0) return

    const newStocksAllocation = Math.max(0, Math.round(stocksAllocation - (diff * stocksAllocation) / total))
    const newBondsAllocation = Math.max(0, Math.round(bondsAllocation - (diff * bondsAllocation) / total))
    const newOtherAllocation = 100 - newStocksAllocation - newValue - newBondsAllocation

    setStocksAllocation(newStocksAllocation)
    setEtfsAllocation(newValue)
    setBondsAllocation(newBondsAllocation)
    setOtherAllocation(newOtherAllocation)
  }

  const handleBondsChange = (value: number[]) => {
    const newValue = value[0]
    const diff = newValue - bondsAllocation

    // Adjust other allocations proportionally
    const total = stocksAllocation + etfsAllocation + otherAllocation
    if (total === 0) return

    const newStocksAllocation = Math.max(0, Math.round(stocksAllocation - (diff * stocksAllocation) / total))
    const newEtfsAllocation = Math.max(0, Math.round(etfsAllocation - (diff * etfsAllocation) / total))
    const newOtherAllocation = 100 - newStocksAllocation - newEtfsAllocation - newValue

    setStocksAllocation(newStocksAllocation)
    setEtfsAllocation(newEtfsAllocation)
    setBondsAllocation(newValue)
    setOtherAllocation(newOtherAllocation)
  }

  const handleOtherChange = (value: number[]) => {
    const newValue = value[0]
    const diff = newValue - otherAllocation

    // Adjust other allocations proportionally
    const total = stocksAllocation + etfsAllocation + bondsAllocation
    if (total === 0) return

    const newStocksAllocation = Math.max(0, Math.round(stocksAllocation - (diff * stocksAllocation) / total))
    const newEtfsAllocation = Math.max(0, Math.round(etfsAllocation - (diff * etfsAllocation) / total))
    const newBondsAllocation = 100 - newStocksAllocation - newEtfsAllocation - newValue

    setStocksAllocation(newStocksAllocation)
    setEtfsAllocation(newEtfsAllocation)
    setBondsAllocation(newBondsAllocation)
    setOtherAllocation(newValue)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="allocation">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
          <TabsTrigger value="parameters">Simulation Parameters</TabsTrigger>
        </TabsList>
        <TabsContent value="allocation" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="stocks-allocation">Stocks Allocation</Label>
                <span className="text-sm font-medium">{stocksAllocation}%</span>
              </div>
              <Slider
                id="stocks-allocation"
                min={0}
                max={100}
                step={1}
                value={[stocksAllocation]}
                onValueChange={handleStocksChange}
                className="[&>span:first-child]:bg-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="etfs-allocation">ETFs Allocation</Label>
                <span className="text-sm font-medium">{etfsAllocation}%</span>
              </div>
              <Slider
                id="etfs-allocation"
                min={0}
                max={100}
                step={1}
                value={[etfsAllocation]}
                onValueChange={handleEtfsChange}
                className="[&>span:first-child]:bg-success"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="bonds-allocation">Bonds Allocation</Label>
                <span className="text-sm font-medium">{bondsAllocation}%</span>
              </div>
              <Slider
                id="bonds-allocation"
                min={0}
                max={100}
                step={1}
                value={[bondsAllocation]}
                onValueChange={handleBondsChange}
                className="[&>span:first-child]:bg-warning"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="other-allocation">Other Allocation</Label>
                <span className="text-sm font-medium">{otherAllocation}%</span>
              </div>
              <Slider
                id="other-allocation"
                min={0}
                max={100}
                step={1}
                value={[otherAllocation]}
                onValueChange={handleOtherChange}
                className="[&>span:first-child]:bg-destructive"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline">Reset to Current</Button>
            <Button>Apply Changes</Button>
          </div>
        </TabsContent>
        <TabsContent value="parameters" className="space-y-6 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="time-horizon">Time Horizon</Label>
              <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                <SelectTrigger id="time-horizon">
                  <SelectValue placeholder="Select time horizon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                  <SelectItem value="20">20 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="market-condition">Market Condition</Label>
              <Select value={marketCondition} onValueChange={setMarketCondition}>
                <SelectTrigger id="market-condition">
                  <SelectValue placeholder="Select market condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bull">Bull Market</SelectItem>
                  <SelectItem value="normal">Normal Market</SelectItem>
                  <SelectItem value="bear">Bear Market</SelectItem>
                  <SelectItem value="volatile">Highly Volatile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inflation-rate">Inflation Rate</Label>
              <Select defaultValue="2.5">
                <SelectTrigger id="inflation-rate">
                  <SelectValue placeholder="Select inflation rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.5">1.5%</SelectItem>
                  <SelectItem value="2.0">2.0%</SelectItem>
                  <SelectItem value="2.5">2.5%</SelectItem>
                  <SelectItem value="3.0">3.0%</SelectItem>
                  <SelectItem value="4.0">4.0%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rebalancing">Rebalancing Strategy</Label>
              <Select defaultValue="annual">
                <SelectTrigger id="rebalancing">
                  <SelectValue placeholder="Select rebalancing strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Rebalancing</SelectItem>
                  <SelectItem value="annual">Annual Rebalancing</SelectItem>
                  <SelectItem value="quarterly">Quarterly Rebalancing</SelectItem>
                  <SelectItem value="threshold">Threshold-based (5%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline">Reset to Default</Button>
            <Button>Run Simulation</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

