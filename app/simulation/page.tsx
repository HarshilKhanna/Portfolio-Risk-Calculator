import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Portfolio-Risk-Calculator/components/ui/card"
import { SimulationControls } from "@/Portfolio-Risk-Calculator/components/simulation/simulation-controls"
import { SimulationChart } from "@/Portfolio-Risk-Calculator/components/simulation/simulation-chart"
import { SimulationSummary } from "@/Portfolio-Risk-Calculator/components/simulation/simulation-summary"
import { SimulationScenarios } from "@/Portfolio-Risk-Calculator/components/simulation/simulation-scenarios"
import { SaveSimulationButton } from "@/Portfolio-Risk-Calculator/components/simulation/save-simulation-button"

export default function SimulationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Simulation</h1>
          <SaveSimulationButton />
        </div>
        <p className="text-muted-foreground">Simulate future portfolio performance based on different scenarios</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle>Future Performance Projection</CardTitle>
            <CardDescription>Simulated portfolio growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <SimulationChart />
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Simulation Summary</CardTitle>
            <CardDescription>Key metrics for the current simulation</CardDescription>
          </CardHeader>
          <CardContent>
            <SimulationSummary />
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Simulation Controls</CardTitle>
          <CardDescription>Adjust parameters to see different outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <SimulationControls />
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Saved Scenarios</CardTitle>
          <CardDescription>Your previously saved simulation scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <SimulationScenarios />
        </CardContent>
      </Card>
    </div>
  )
}

