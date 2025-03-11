import { BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/Portfolio-Risk-Calculator/components/ui/card"

const riskMetrics = [
  {
    title: "Sharpe Ratio",
    value: "1.82",
    description: "Risk-adjusted return",
    icon: <LineChart className="h-4 w-4" />,
  },
  {
    title: "Standard Deviation",
    value: "14.5%",
    description: "Portfolio volatility",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    title: "Expected Return",
    value: "12.4%",
    description: "Annual expected return",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    title: "Beta",
    value: "0.85",
    description: "Market sensitivity",
    icon: <PieChart className="h-4 w-4" />,
  },
]

export function RiskMetricsDisplay() {
  return (
    <>
      {riskMetrics.map((metric) => (
        <Card key={metric.title} className="glass-card overflow-hidden transition-all duration-200 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
              <div className="rounded-full bg-primary/10 p-1 text-primary">{metric.icon}</div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{metric.description}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

