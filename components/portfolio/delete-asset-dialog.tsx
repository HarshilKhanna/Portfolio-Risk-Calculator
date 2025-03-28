"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Update the Asset type to match your PortfolioContext
interface Asset {
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

type DeleteAssetDialogProps = {
  asset: Asset
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: () => void
}

export function DeleteAssetDialog({ asset, open, onOpenChange, onDelete }: DeleteAssetDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {asset.symbol} ({asset.longName}) from your portfolio. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-red-500 hover:bg-red-600">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

