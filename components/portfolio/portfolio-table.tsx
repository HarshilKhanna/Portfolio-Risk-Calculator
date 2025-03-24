"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { EditAssetDialog } from "./edit-asset-dialog"
import { DeleteAssetDialog } from "./delete-asset-dialog"
import { usePortfolio } from "@/src/context/PortfolioContext"

// Current USD to INR conversion rate (you might want to fetch this from an API)
const USD_TO_INR = 86;

interface PortfolioAsset {
  symbol: string;
  longName: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  regularMarketChangePercent: number;
  value: number;
  costBasis: number;
  type: string;
  purchaseDate: string;
}

export function PortfolioTable() {
  const { assets, removeAsset, editAsset, isLoading, clearPortfolio } = usePortfolio();
  const [editingAsset, setEditingAsset] = useState<PortfolioAsset | null>(null);
  const [deletingAsset, setDeletingAsset] = useState<PortfolioAsset | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatAPIPrice = (amount: number) => {
    const inrAmount = amount * USD_TO_INR;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(inrAmount)
  }

  const calculateProfitLoss = (asset: PortfolioAsset) => {
    const invested = asset.quantity * asset.purchasePrice;
    const currentInINR = asset.quantity * (asset.currentPrice * USD_TO_INR);
    return currentInINR - invested;
  }

  const calculateProfitLossPercentage = (asset: PortfolioAsset) => {
    const invested = asset.quantity * asset.purchasePrice;
    const currentInINR = asset.quantity * (asset.currentPrice * USD_TO_INR);
    return ((currentInINR - invested) / invested) * 100;
  }

  const handleSaveAsset = (symbol: string, updates: Partial<PortfolioAsset>) => {
    try {
      editAsset(symbol, updates);
      setEditingAsset(null);
    } catch (error) {
      console.error('Error saving asset:', error);
    }
  };

  const handleDeleteAsset = (symbol: string) => {
    removeAsset(symbol);
    setDeletingAsset(null)
  }

  const handleClearPortfolio = () => {
    clearPortfolio();
    localStorage.removeItem('portfolio');
  };

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
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Portfolio</h2>
        <Button
          onClick={handleClearPortfolio}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear Portfolio
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Purchase Price (₹)</TableHead>
            <TableHead className="text-right">Current Price (₹)</TableHead>
            <TableHead className="text-right">Total Value (₹)</TableHead>
            <TableHead className="text-right">Profit/Loss (₹)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(assets) && assets.map((asset: PortfolioAsset) => {
            const profitLoss = calculateProfitLoss(asset)
            const profitLossPercentage = calculateProfitLossPercentage(asset)
            const isProfit = profitLoss >= 0

            return (
              <TableRow key={asset.symbol}>
                <TableCell className="font-medium">{asset.symbol}</TableCell>
                <TableCell>{asset.type}</TableCell>
                <TableCell className="text-right">{asset.quantity}</TableCell>
                <TableCell className="text-right">{formatCurrency(asset.purchasePrice)}</TableCell>
                <TableCell className="text-right">{formatCurrency(asset.currentPrice * USD_TO_INR)}</TableCell>
                <TableCell className="text-right">{formatCurrency(asset.quantity * asset.currentPrice * USD_TO_INR)}</TableCell>
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
          onDelete={() => handleDeleteAsset(deletingAsset.symbol)}
        />
      )}
    </div>
  )
}