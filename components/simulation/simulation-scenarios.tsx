import { Clock, Copy, Eye, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Portfolio-Risk-Calculator/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Portfolio-Risk-Calculator/components/ui/table"

const scenarios = [
  {
    id: "1",
    name: "Conservative Approach",
    description: "Low-risk allocation with focus on bonds",
    created: "2023-03-10",
    projectedReturn: "5.2%",
    stocksAllocation: "30%",
    bondsAllocation: "60%",
    otherAllocation: "10%",
  },
  {
    id: "2",
    name: "Balanced Growth",
    description: "Moderate risk with diversified allocation",
    created: "2023-03-08",
    projectedReturn: "8.0%",
    stocksAllocation: "50%",
    bondsAllocation: "40%",
    otherAllocation: "10%",
  },
  {
    id: "3",
    name: "Aggressive Growth",
    description: "High-risk allocation focused on stocks",
    created: "2023-03-05",
    projectedReturn: "12.5%",
    stocksAllocation: "80%",
    bondsAllocation: "10%",
    otherAllocation: "10%",
  },
]

export function SimulationScenarios() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Scenario</TableHead>
            <TableHead>Allocation</TableHead>
            <TableHead>Projected Return</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scenarios.map((scenario) => (
            <TableRow key={scenario.id}>
              <TableCell>
                <div className="font-medium">{scenario.name}</div>
                <div className="text-xs text-muted-foreground">{scenario.description}</div>
              </TableCell>
              <TableCell>
                <div className="text-xs space-y-1">
                  <div>Stocks: {scenario.stocksAllocation}</div>
                  <div>Bonds: {scenario.bondsAllocation}</div>
                  <div>Other: {scenario.otherAllocation}</div>
                </div>
              </TableCell>
              <TableCell>{scenario.projectedReturn}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(scenario.created).toLocaleDateString()}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

