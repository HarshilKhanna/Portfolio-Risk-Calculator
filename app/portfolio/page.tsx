import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Portfolio-Risk-Calculator/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Portfolio-Risk-Calculator/components/ui/tabs"
import { PortfolioTable } from "@/Portfolio-Risk-Calculator/components/portfolio/portfolio-table"
import { PortfolioSummary } from "@/Portfolio-Risk-Calculator/components/portfolio/portfolio-summary"
import { PortfolioDistribution } from "@/Portfolio-Risk-Calculator/components/portfolio/portfolio-distribution"
import { AddAssetButton } from "@/Portfolio-Risk-Calculator/components/portfolio/add-asset-button"

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Management</h1>
          <AddAssetButton />
        </div>
        <p className="text-muted-foreground">Manage your investment portfolio and track performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Summary</CardTitle>
            <CardDescription>Overview of your current holdings</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioSummary />
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Asset Distribution</CardTitle>
            <CardDescription>Allocation by asset type</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioDistribution />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Assets</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="etfs">ETFs</TabsTrigger>
            <TabsTrigger value="bonds">Bonds</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>All Assets</CardTitle>
              <CardDescription>Manage all your investment assets</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stocks">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Stocks</CardTitle>
              <CardDescription>Manage your stock investments</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioTable assetType="stocks" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="etfs">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>ETFs</CardTitle>
              <CardDescription>Manage your ETF investments</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioTable assetType="etfs" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bonds">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Bonds</CardTitle>
              <CardDescription>Manage your bond investments</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioTable assetType="bonds" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="other">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Other Assets</CardTitle>
              <CardDescription>Manage your other investments</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioTable assetType="other" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

