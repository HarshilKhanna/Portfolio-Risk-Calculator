import { ArrowUp, DollarSign, LineChart, PieChart, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Portfolio-Risk-Calculator/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Portfolio-Risk-Calculator/components/ui/tabs"
import { PortfolioValueChart } from "@/Portfolio-Risk-Calculator/components/dashboard/portfolio-value-chart"
import { AssetAllocationChart } from "@/Portfolio-Risk-Calculator/components/dashboard/asset-allocation-chart"
import { RecentTransactions } from "@/Portfolio-Risk-Calculator/components/dashboard/recent-transactions"
import { RiskMetricCard } from "@/Portfolio-Risk-Calculator/components/dashboard/risk-metric-card"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your investment portfolio and key metrics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <RiskMetricCard
          title="Portfolio Value"
          value="$245,678.90"
          change="+2.5%"
          trend="up"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <RiskMetricCard
          title="Expected Return"
          value="12.4%"
          change="+1.2%"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <RiskMetricCard
          title="Sharpe Ratio"
          value="1.82"
          change="-0.08"
          trend="down"
          icon={<LineChart className="h-4 w-4" />}
        />
        <RiskMetricCard
          title="Risk Level"
          value="Medium"
          change=""
          trend="neutral"
          icon={<PieChart className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="glass-card col-span-4">
              <CardHeader>
                <CardTitle>Portfolio Value</CardTitle>
                <CardDescription>Historical performance over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <PortfolioValueChart />
              </CardContent>
            </Card>
            <Card className="glass-card col-span-3">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Distribution by asset class</CardDescription>
              </CardHeader>
              <CardContent>
                <AssetAllocationChart />
              </CardContent>
            </Card>
          </div>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest portfolio changes</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>Detailed performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Performance analysis content will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="risk" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Risk Overview</CardTitle>
              <CardDescription>Summary of portfolio risk factors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Risk overview content will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center md:justify-end">
        <Button asChild size="lg" className="gap-2">
          <Link href="/portfolio">
            Manage Portfolio
            <ArrowUp className="h-4 w-4 rotate-45" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

