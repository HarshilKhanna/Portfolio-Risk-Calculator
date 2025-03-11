"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import { useToast } from "@/Portfolio-Risk-Calculator/hooks/use-toast"

export function RecalculateRiskButton() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleRecalculate = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Risk metrics updated",
        description: "Portfolio risk metrics have been recalculated successfully.",
      })
    }, 1500)
  }

  return (
    <Button onClick={handleRecalculate} disabled={isLoading} className="gap-2">
      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
      {isLoading ? "Recalculating..." : "Recalculate Risk"}
    </Button>
  )
}

