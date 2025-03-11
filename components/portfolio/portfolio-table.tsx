"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Edit, MoreHorizontal, Trash } from "lucide-react"
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
import { EditAssetDialog } from "@/Portfolio-Risk-Calculator/components/portfolio/edit-asset-dialog"

interface Asset {
  id: string
  name: string
  symbol: string
  type: string
  quantity: number
  purchasePrice: number
  currentPrice: number
  purchaseDate: string
}

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Apple Inc.",
    symbol: "AAPL",
    type: "stocks",
    quantity: 25,
    purchasePrice: 150.25,
    currentPrice: 175.5,
    purchaseDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Microsoft Corp.",
    symbol: "MSFT",
    type: "stocks",
    quantity: 15,
    purchasePrice: 280.1,
    currentPrice: 310.75,
    purchaseDate: "2023-02-10",
  },
  {
    id: "3",
    name: "Vanguard S&P 500 ETF",
    symbol: "VOO",
    type: "etfs",
    quantity: 10,
    purchasePrice: 380.5,
    currentPrice: 410.25,
    purchaseDate: "2023-01-05",
  },
  {
    id: "4",
    name: "iShares Core U.S. Aggregate Bond ETF",
    symbol: "AGG",
    type: "bonds",
    quantity: 30,
    purchasePrice: 105.75,
    currentPrice: 102.5,
    purchaseDate: "2023-03-20",
  },
  {
    id: "5",
    name: "Tesla Inc.",
    symbol: "TSLA",
    type: "stocks",
    quantity: 8,
    purchasePrice: 220.3,
    currentPrice: 245.8,
    purchaseDate: "2023-02-25",
  },
  {
    id: "6",
    name: "Bitcoin",
    symbol: "BTC",
    type: "other",
    quantity: 0.5,
    purchasePrice: 35000,
    currentPrice: 42000,
    purchaseDate: "2023-01-30",
  },
]

interface PortfolioTableProps {
  assetType?: string
}

export function PortfolioTable({ assetType }: PortfolioTableProps) {
  const [assets, setAssets] = useState<Asset[]>(mockAssets)
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredAssets = assetType ? assets.filter((asset) => asset.type === assetType) : assets

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter((asset) => asset.id !== id))
  }

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset)
    setIsEditDialogOpen(true)
  }

  const handleSaveAsset = (updatedAsset: Asset) => {
    setAssets(assets.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset)))
    setIsEditDialogOpen(false)
    setEditingAsset(null)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Purchase Price</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Profit/Loss</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => {
              const profitLoss = (asset.currentPrice - asset.purchasePrice) * asset.quantity
              const profitLossPercentage = ((asset.currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100

              return (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">
                    <div>{asset.name}</div>
                    <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                  </TableCell>
                  <TableCell>{asset.quantity.toLocaleString()}</TableCell>
                  <TableCell>
                    $
                    {asset.purchasePrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>
                    $
                    {asset.currentPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>
                    <div className={profitLoss >= 0 ? "text-success" : "text-destructive"}>
                      <div className="flex items-center gap-1">
                        {profitLoss >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}$
                        {Math.abs(profitLoss).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div className="text-xs">
                        {profitLossPercentage >= 0 ? "+" : ""}
                        {profitLossPercentage.toFixed(2)}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(asset.purchaseDate).toLocaleDateString()}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditAsset(asset)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteAsset(asset.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
            {filteredAssets.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No assets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {editingAsset && (
        <EditAssetDialog
          asset={editingAsset}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleSaveAsset}
        />
      )}
    </>
  )
}

