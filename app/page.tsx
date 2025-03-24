import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioValue } from "@/components/dashboard/portfolio-value"
import { PortfolioMetrics } from "@/components/dashboard/portfolio-metrics"
import { AssetAllocation } from "@/components/dashboard/asset-allocation"
import { TradingDaysAnalysis } from "@/components/dashboard/performance-chart"
import { RiskIndicator } from "@/components/dashboard/risk-indicator"
import { SectorDistribution } from "@/components/dashboard/sector-distribution"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your portfolio performance and risk metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full md:col-span-2 lg:col-span-3 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Portfolio Value</CardTitle>
            <Link href="/portfolio">
              <Button>Manage Portfolio</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <PortfolioValue />
          </CardContent>
        </Card>

        <PortfolioMetrics />

        <Card className="col-span-1 shadow-sm">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Current distribution of your investments</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <AssetAllocation />
          </CardContent>
        </Card>

        <Card className="col-span-1 shadow-sm">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Your Portfolio at a glance</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <SectorDistribution />
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Asset Performance</CardTitle>
            <CardDescription>Portfolio performance</CardDescription>
          </CardHeader>
          <CardContent>
            <TradingDaysAnalysis />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Current portfolio risk level</CardDescription>
          </CardHeader>
          <CardContent>
            <RiskIndicator />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

