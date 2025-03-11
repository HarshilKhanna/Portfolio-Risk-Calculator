import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Portfolio-Risk-Calculator/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Portfolio-Risk-Calculator/components/ui/tabs"
import { RiskMetricsDisplay } from "@/Portfolio-Risk-Calculator/components/risk-analysis/risk-metrics-display"
import { RiskDistributionHeatmap } from "@/Portfolio-Risk-Calculator/components/risk-analysis/risk-distribution-heatmap"
import { RiskReturnScatterPlot } from "@/Portfolio-Risk-Calculator/components/risk-analysis/risk-return-scatter-plot"
import { RiskBreakdownTable } from "@/Portfolio-Risk-Calculator/components/risk-analysis/risk-breakdown-table"
import { RecalculateRiskButton } from "@/Portfolio-Risk-Calculator/components/risk-analysis/recalculate-risk-button"

export default function RiskAnalysisPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Risk Analysis</h1>
          <RecalculateRiskButton />
        </div>
        <p className="text-muted-foreground">Analyze and understand the risk profile of your investment portfolio</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <RiskMetricsDisplay />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="distribution">Risk Distribution</TabsTrigger>
          <TabsTrigger value="comparison">Risk-Return Comparison</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Risk Breakdown</CardTitle>
              <CardDescription>Detailed risk metrics by asset</CardDescription>
            </CardHeader>
            <CardContent>
              <RiskBreakdownTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="distribution" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Risk Distribution Heatmap</CardTitle>
              <CardDescription>Visual representation of risk across your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <RiskDistributionHeatmap />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comparison" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Risk-Return Scatter Plot</CardTitle>
              <CardDescription>Compare risk vs. return for each asset</CardDescription>
            </CardHeader>
            <CardContent>
              <RiskReturnScatterPlot />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

