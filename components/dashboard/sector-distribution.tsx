"use client"

import { usePortfolio } from "@/src/context/PortfolioContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SectorDistribution() {
  const { assets } = usePortfolio()

  const formatValue = (value: number): string => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`
    if (value >= 1000) return `₹${(value / 1000).toFixed(2)} K`
    return `₹${value.toFixed(2)}`
  }

  if (!assets.length) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">No shares available</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Share</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => {
            const totalValue = asset.quantity * asset.currentPrice * 86
            return (
              <TableRow key={asset.symbol}>
                <TableCell className="font-medium">{asset.symbol}</TableCell>
                <TableCell>{asset.quantity}</TableCell>
                <TableCell className="text-right">₹{(asset.currentPrice * 86).toFixed(2)}</TableCell>
                <TableCell className="text-right">{formatValue(totalValue)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

