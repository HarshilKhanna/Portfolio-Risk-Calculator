"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { EditAssetDialog } from "./edit-asset-dialog"
import { DeleteAssetDialog } from "./delete-asset-dialog"

export type Asset = {
  id: string
  name: string
  type: string
  quantity: number
  purchasePrice: number
  currentPrice: number
  purchaseDate: string
}

export function PortfolioTable() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [deletingAsset, setDeletingAsset] = useState<Asset | null>(null)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setAssets([
        {
          id: "1",
          name: "HDFC Bank",
          type: "Equity",
          quantity: 50,
          purchasePrice: 1450,
          currentPrice: 1580,
          purchaseDate: "2023-01-15",
        },
        {
          id: "2",
          name: "Reliance Industries",
          type: "Equity",
          quantity: 30,
          purchasePrice: 2200,
          currentPrice: 2150,
          purchaseDate: "2023-02-20",
        },
        {
          id: "3",
          name: "Government Bond 2030",
          type: "Bond",
          quantity: 10,
          purchasePrice: 10000,
          currentPrice: 10200,
          purchaseDate: "2023-03-10",
        },
        {
          id: "4",
          name: "Gold ETF",
          type: "Commodity",
          quantity: 20,
          purchasePrice: 4500,
          currentPrice: 4800,
          purchaseDate: "2023-04-05",
        },
        {
          id: "5",
          name: "Real Estate Fund",
          type: "Real Estate",
          quantity: 5,
          purchasePrice: 20000,
          currentPrice: 21500,
          purchaseDate: "2023-05-12",
        },
      ])
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculateProfitLoss = (asset: Asset) => {
    const invested = asset.quantity * asset.purchasePrice
    const current = asset.quantity * asset.currentPrice
    return current - invested
  }

  const calculateProfitLossPercentage = (asset: Asset) => {
    const invested = asset.quantity * asset.purchasePrice
    const current = asset.quantity * asset.currentPrice
    return ((current - invested) / invested) * 100
  }

  const handleSaveAsset = (updatedAsset: Asset) => {
    setAssets(assets.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset)))
    setEditingAsset(null)
  }

  const handleDeleteAsset = (assetId: string) => {
    setAssets(assets.filter((asset) => asset.id !== assetId))
    setDeletingAsset(null)
  }

  if (isLoading) {
    return (
      <div className="w-full py-8">
        <div className="space-y-4">
          <div className="h-8 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-12 w-full bg-muted/50 animate-pulse rounded"></div>
          <div className="h-12 w-full bg-muted/50 animate-pulse rounded"></div>
          <div className="h-12 w-full bg-muted/50 animate-pulse rounded"></div>
          <div className="h-12 w-full bg-muted/50 animate-pulse rounded"></div>
        </div>
        <p className="text-center text-muted-foreground mt-6">Loading assets...</p>
      </div>
    )
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Purchase Price</TableHead>
            <TableHead className="text-right">Current Price</TableHead>
            <TableHead className="text-right">Total Value</TableHead>
            <TableHead className="text-right">Profit/Loss</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => {
            const profitLoss = calculateProfitLoss(asset)
            const profitLossPercentage = calculateProfitLossPercentage(asset)
            const isProfit = profitLoss >= 0

            return (
              <TableRow key={asset.id}>
                <TableCell className="font-medium">{asset.name}</TableCell>
                <TableCell>{asset.type}</TableCell>
                <TableCell className="text-right">{asset.quantity}</TableCell>
                <TableCell className="text-right">{formatCurrency(asset.purchasePrice)}</TableCell>
                <TableCell className="text-right">{formatCurrency(asset.currentPrice)}</TableCell>
                <TableCell className="text-right">{formatCurrency(asset.quantity * asset.currentPrice)}</TableCell>
                <TableCell className="text-right">
                  <div className={`flex items-center justify-end ${isProfit ? "text-green-500" : "text-red-500"}`}>
                    {isProfit ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {formatCurrency(Math.abs(profitLoss))}
                    <span className="ml-1">({profitLossPercentage.toFixed(2)}%)</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => setEditingAsset(asset)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => setDeletingAsset(asset)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {editingAsset && (
        <EditAssetDialog
          asset={editingAsset}
          open={!!editingAsset}
          onOpenChange={(open) => !open && setEditingAsset(null)}
          onSave={handleSaveAsset}
        />
      )}

      {deletingAsset && (
        <DeleteAssetDialog
          asset={deletingAsset}
          open={!!deletingAsset}
          onOpenChange={(open) => !open && setDeletingAsset(null)}
          onDelete={() => handleDeleteAsset(deletingAsset.id)}
        />
      )}
    </div>
  )
}

