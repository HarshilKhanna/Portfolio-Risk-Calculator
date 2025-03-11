import { ArrowUp } from "lucide-react"
import { Progress } from "@/Portfolio-Risk-Calculator/components/ui/progress"

export function SimulationSummary() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-medium text-muted-foreground">Current Portfolio Value</div>
        <div className="text-2xl font-bold">$245,678.90</div>
      </div>

      <div>
        <div className="text-sm font-medium text-muted-foreground">Projected Value (5 Years)</div>
        <div className="text-2xl font-bold">$361,147.52</div>
        <div className="mt-1 flex items-center gap-1 text-success text-sm">
          <ArrowUp className="h-4 w-4" />
          <span>+47.0% growth</span>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-muted-foreground">Expected Annual Return</div>
        <div className="text-2xl font-bold">8.0%</div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">Probability of Meeting Goal</div>
          <div className="text-sm font-medium">72%</div>
        </div>
        <Progress value={72} className="mt-2 h-2" />
      </div>

      <div className="pt-4 border-t">
        <div className="text-sm font-medium">Simulation Parameters</div>
        <div className="mt-2 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time Horizon:</span>
            <span>5 Years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Market Condition:</span>
            <span>Normal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Inflation Rate:</span>
            <span>2.5%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rebalancing:</span>
            <span>Annual</span>
          </div>
        </div>
      </div>
    </div>
  )
}

