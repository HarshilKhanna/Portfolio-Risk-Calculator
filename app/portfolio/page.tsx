import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PortfolioTable } from "@/components/portfolio/portfolio-table"
import { AddAssetButton } from "@/components/portfolio/add-asset-button"

export default function PortfolioPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Management</h1>
        <p className="text-muted-foreground">Add, edit, and remove assets in your investment portfolio.</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Your Assets</CardTitle>
            <CardDescription>Manage your portfolio holdings</CardDescription>
          </div>
          <AddAssetButton />
        </CardHeader>
        <CardContent>
          <PortfolioTable />
        </CardContent>
      </Card>
    </div>
  )
}

