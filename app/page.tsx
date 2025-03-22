import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Portfolio-Risk-Calculator/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Portfolio-Risk-Calculator/components/ui/tabs"
import { PortfolioValue } from "@/Portfolio-Risk-Calculator/components/dashboard/portfolio-value"
import { PortfolioMetrics } from "@/Portfolio-Risk-Calculator/components/dashboard/portfolio-metrics"
import { AssetAllocation } from "@/Portfolio-Risk-Calculator/components/dashboard/asset-allocation"
import { PerformanceChart } from "@/Portfolio-Risk-Calculator/components/dashboard/performance-chart"
import { RiskIndicator } from "@/Portfolio-Risk-Calculator/components/dashboard/risk-indicator"
import { SectorDistribution } from "@/Portfolio-Risk-Calculator/components/dashboard/sector-distribution"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
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
            <CardTitle>Sector Distribution</CardTitle>
            <CardDescription>Exposure across market sectors</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <SectorDistribution />
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
            <CardDescription>Portfolio performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="1m" className="space-y-4">
              <TabsList>
                <TabsTrigger value="1w">1w</TabsTrigger>
                <TabsTrigger value="1m">1m</TabsTrigger>
                <TabsTrigger value="3m">3m</TabsTrigger>
                <TabsTrigger value="1y">1y</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              <TabsContent value="1w" className="space-y-4">
                <PerformanceChart days={7} />
              </TabsContent>
              <TabsContent value="1m" className="space-y-4">
                <PerformanceChart days={30} />
              </TabsContent>
              <TabsContent value="3m" className="space-y-4">
                <PerformanceChart days={90} />
              </TabsContent>
              <TabsContent value="1y" className="space-y-4">
                <PerformanceChart days={365} />
              </TabsContent>
              <TabsContent value="all" className="space-y-4">
                <PerformanceChart days={730} />
              </TabsContent>
            </Tabs>
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

