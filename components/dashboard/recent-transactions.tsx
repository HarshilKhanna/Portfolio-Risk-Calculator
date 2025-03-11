import { ArrowDown, ArrowUp } from "lucide-react"
import { Badge } from "@/Portfolio-Risk-Calculator/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Portfolio-Risk-Calculator/components/ui/table"

const transactions = [
  {
    id: "1",
    asset: "Apple Inc.",
    symbol: "AAPL",
    type: "buy",
    amount: "$5,240.00",
    quantity: "25",
    date: "2023-03-10",
  },
  {
    id: "2",
    asset: "Microsoft Corp.",
    symbol: "MSFT",
    type: "sell",
    amount: "$3,120.00",
    quantity: "10",
    date: "2023-03-08",
  },
  {
    id: "3",
    asset: "Vanguard S&P 500 ETF",
    symbol: "VOO",
    type: "buy",
    amount: "$2,180.00",
    quantity: "5",
    date: "2023-03-05",
  },
  {
    id: "4",
    asset: "Tesla Inc.",
    symbol: "TSLA",
    type: "buy",
    amount: "$1,840.00",
    quantity: "8",
    date: "2023-03-01",
  },
  {
    id: "5",
    asset: "Amazon.com Inc.",
    symbol: "AMZN",
    type: "sell",
    amount: "$2,950.00",
    quantity: "15",
    date: "2023-02-28",
  },
]

export function RecentTransactions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">
              <div>{transaction.asset}</div>
              <div className="text-xs text-muted-foreground">{transaction.symbol}</div>
            </TableCell>
            <TableCell>
              {transaction.type === "buy" ? (
                <Badge
                  variant="outline"
                  className="bg-success/10 text-success border-success/20 flex gap-1 items-center"
                >
                  <ArrowDown className="h-3 w-3" /> Buy
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-destructive/10 text-destructive border-destructive/20 flex gap-1 items-center"
                >
                  <ArrowUp className="h-3 w-3" /> Sell
                </Badge>
              )}
            </TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.quantity}</TableCell>
            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

