"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

type SimulationSummaryData = {
  metric: string
  current: number
  simulated: number
  unit: string
  isPercentage: boolean
  isHigherBetter: boolean
}

export function SimulationSummary() {
  const [data, setData] = useState<SimulationSummaryData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData([
        {
          metric: "Expected Annual Return",
          current: 6.2,
          simulated: 7.8,
          unit: "%",
          isPercentage: true,
          isHigherBetter: true,
        },
        {
          metric: "Risk (Volatility)",
          current: 12.5,
          simulated: 14.2,
          unit: "%",
          isPercentage: true,
          isHigherBetter: false,
        },
        {
          metric: "Sharpe Ratio",
          current: 1.8,
          simulated: 2.1,
          unit: "",
          isPercentage: false,
          isHigherBetter: true,
        },
        {
          metric: "5-Year Projected Value",
          current: 1345000,
          simulated: 1460000,
          unit: "₹",
          isPercentage: false,
          isHigherBetter: true,
        },
        {
          metric: "Maximum Drawdown",
          current: 15.3,
          simulated: 17.8,
          unit: "%",
          isPercentage: true,
          isHigherBetter: false,
        },
      ])
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Listen for simulation events to update the summary
  useEffect(() => {
    const handleSimulation = () => {
      setIsLoading(true)

      // Simulate loading updated data
      setTimeout(() => {
        setData((prevData) =>
          prevData.map((item) => {
            // Add some randomness to the simulated values
            const randomFactor = Math.random() * 0.2 + 0.9 // 0.9 to 1.1
            let newSimulated = item.simulated * randomFactor

            // Ensure the change makes sense (higher is better for some metrics)
            if (item.isHigherBetter) {
              newSimulated = Math.max(item.current * 1.05, newSimulated)
            } else {
              newSimulated = Math.min(item.current * 1.15, newSimulated)
            }

            return {
              ...item,
              simulated: Number(newSimulated.toFixed(item.isPercentage ? 1 : 0)),
            }
          }),
        )
        setIsLoading(false)
      }, 800)
    }

    window.addEventListener("runSimulation", handleSimulation)

    return () => {
      window.removeEventListener("runSimulation", handleSimulation)
    }
  }, [])

  const formatValue = (value: number, unit: string, isPercentage: boolean) => {
    if (isPercentage) {
      return `${value}${unit}`
    }

    if (unit === "₹") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value)
    }

    return `${value}${unit}`
  }

  const getDifferenceColor = (current: number, simulated: number, isHigherBetter: boolean) => {
    const isImproved = isHigherBetter ? simulated > current : simulated < current

    return isImproved ? "text-green-500" : "text-red-500"
  }

  if (isLoading) {
    return (
      <div className="h-[200px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading simulation summary...</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <Card key={item.metric}>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">{item.metric}</h3>

            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Current</p>
                <p className="text-xl font-bold">{formatValue(item.current, item.unit, item.isPercentage)}</p>
              </div>

              <ArrowRight className="h-5 w-5 text-muted-foreground mx-2" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Simulated</p>
                <p
                  className={`text-xl font-bold ${getDifferenceColor(item.current, item.simulated, item.isHigherBetter)}`}
                >
                  {formatValue(item.simulated, item.unit, item.isPercentage)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

