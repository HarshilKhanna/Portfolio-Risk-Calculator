import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PortfolioSimulator } from "@/components/simulation/portfolio-simulator"
import { SimulationChart } from "@/components/simulation/simulation-chart"
import { SimulationSummary } from "@/components/simulation/simulation-summary"

export default function SimulationPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Simulation</h1>
        <p className="text-muted-foreground">
          Simulate different portfolio allocations and analyze potential outcomes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 shadow-sm">
          <CardHeader>
            <CardTitle>Allocation Simulator</CardTitle>
            <CardDescription>Adjust asset allocations to simulate different scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioSimulator />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Projected Growth</CardTitle>
            <CardDescription>Simulated portfolio performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <SimulationChart />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Simulation Summary</CardTitle>
          <CardDescription>Comparison between current and simulated portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <SimulationSummary />
        </CardContent>
      </Card>
    </div>
  )
}

