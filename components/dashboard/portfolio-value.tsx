"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function PortfolioValue() {
  const [value, setValue] = useState(0)
  const [change, setChange] = useState(0)
  const [changePercent, setChangePercent] = useState(0)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setValue(1258750)
      setChange(12500)
      setChangePercent(1.2)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-baseline">
        <h2 className="text-4xl font-bold tracking-tight">
          {value === 0 ? <div className="h-10 w-40 bg-muted animate-pulse rounded"></div> : formatCurrency(value)}
        </h2>
        {change !== 0 && (
          <div
            className={cn("ml-4 flex items-center text-sm font-medium", change > 0 ? "text-green-500" : "text-red-500")}
          >
            {change > 0 ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
            {formatCurrency(Math.abs(change))} ({changePercent.toFixed(2)}%)
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground">Total portfolio value as of today</p>
    </div>
  )
}

