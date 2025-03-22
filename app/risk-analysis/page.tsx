import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Portfolio-Risk-Calculator/components/ui/card"
import { RiskMetrics } from "@/Portfolio-Risk-Calculator/components/risk-analysis/risk-metrics"
import { RiskScatterPlot } from "@/Portfolio-Risk-Calculator/components/risk-analysis/risk-scatter-plot"
import { RiskHeatmap } from "@/Portfolio-Risk-Calculator/components/risk-analysis/risk-heatmap"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import { RefreshCcw } from "lucide-react"

export default function RiskAnalysisPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Risk Analysis</h1>
        <p className="text-muted-foreground">Detailed analysis of your portfolio risk metrics and exposure.</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Risk Metrics</CardTitle>
            <CardDescription>Key risk indicators for your portfolio</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Recalculate
          </Button>
        </CardHeader>
        <CardContent>
          <RiskMetrics />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Risk vs. Return</CardTitle>
            <CardDescription>Asset performance relative to risk</CardDescription>
          </CardHeader>
          <CardContent>
            <RiskScatterPlot />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Risk Exposure Heatmap</CardTitle>
            <CardDescription>Visualize risk concentration</CardDescription>
          </CardHeader>
          <CardContent>
            <RiskHeatmap />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

