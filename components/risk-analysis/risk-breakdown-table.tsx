import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Portfolio-Risk-Calculator/components/ui/table"
import { Badge } from "@/Portfolio-Risk-Calculator/components/ui/badge"

const riskData = [
  {
    id: "1",
    asset: "Apple Inc.",
    symbol: "AAPL",
    type: "stocks",
    weight: "15.2%",
    volatility: "18.5%",
    beta: "1.2",
    sharpe: "1.8",
    riskContribution: "High",
  },
  {
    id: "2",
    asset: "Microsoft Corp.",
    symbol: "MSFT",
    type: "stocks",
    weight: "12.8%",
    volatility: "16.2%",
    beta: "1.1",
    sharpe: "1.9",
    riskContribution: "Medium",
  },
  {
    id: "3",
    asset: "Vanguard S&P 500 ETF",
    symbol: "VOO",
    type: "etfs",
    weight: "10.5%",
    volatility: "14.0%",
    beta: "1.0",
    sharpe: "1.7",
    riskContribution: "Medium",
  },
  {
    id: "4",
    asset: "iShares Core U.S. Aggregate Bond ETF",
    symbol: "AGG",
    type: "bonds",
    weight: "8.2%",
    volatility: "5.2%",
    beta: "0.2",
    sharpe: "0.9",
    riskContribution: "Low",
  },
  {
    id: "5",
    asset: "Tesla Inc.",
    symbol: "TSLA",
    type: "stocks",
    weight: "7.5%",
    volatility: "30.1%",
    beta: "1.8",
    sharpe: "1.5",
    riskContribution: "High",
  },
  {
    id: "6",
    asset: "Bitcoin",
    symbol: "BTC",
    type: "other",
    weight: "5.0%",
    volatility: "40.5%",
    beta: "2.2",
    sharpe: "1.2",
    riskContribution: "Very High",
  },
]

export function RiskBreakdownTable() {
  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Very High":
        return "destructive"
      case "High":
        return "outline"
      case "Medium":
        return "secondary"
      case "Low":
        return "default"
      default:
        return "outline"
    }
  }

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case "Very High":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "High":
        return "bg-warning/10 text-warning-foreground border-warning/20"
      case "Medium":
        return "bg-primary/10 text-primary border-primary/20"
      case "Low":
        return "bg-success/10 text-success border-success/20"
      default:
        return ""
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Volatility</TableHead>
            <TableHead>Beta</TableHead>
            <TableHead>Sharpe</TableHead>
            <TableHead>Risk Contribution</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {riskData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <div>{item.asset}</div>
                <div className="text-xs text-muted-foreground">{item.symbol}</div>
              </TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.volatility}</TableCell>
              <TableCell>{item.beta}</TableCell>
              <TableCell>{item.sharpe}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getRiskBadgeClass(item.riskContribution)}>
                  {item.riskContribution}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

