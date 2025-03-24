"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { usePortfolio } from "@/src/context/PortfolioContext"

interface PortfolioAsset {
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  regularMarketChangePercent: number;
  value: number;
  type: string;
  purchaseDate: string;
}

type EditAssetDialogProps = {
  asset: PortfolioAsset;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (symbol: string, updates: Partial<PortfolioAsset>) => void;
}

export function EditAssetDialog({ asset, open, onOpenChange, onSave }: EditAssetDialogProps) {
  const { editAsset } = usePortfolio();
  const [formData, setFormData] = useState({
    quantity: asset.quantity.toString(),
    purchasePrice: asset.purchasePrice.toString(),
    purchaseDate: asset.purchaseDate,
    type: asset.type
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when asset changes
  useEffect(() => {
    setFormData({
      quantity: asset.quantity.toString(),
      purchasePrice: asset.purchasePrice.toString(),
      purchaseDate: asset.purchaseDate,
      type: asset.type
    });
  }, [asset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const quantity = Number(formData.quantity);
      const purchasePrice = Number(formData.purchasePrice);

      // Validation
      if (isNaN(quantity) || quantity <= 0) {
        throw new Error("Please enter a valid quantity");
      }

      if (isNaN(purchasePrice) || purchasePrice <= 0) {
        throw new Error("Please enter a valid purchase price");
      }

      // Call onSave with symbol and updates
      onSave(asset.symbol, {
        quantity,
        purchasePrice,
        type: formData.type,
        purchaseDate: formData.purchaseDate
      });

      onOpenChange(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update asset');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="absolute inset-0 m-auto w-[95%] sm:max-w-[425px] h-fit max-h-[90vh] overflow-y-auto">
        <div className="overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Asset</DialogTitle>
            <DialogDescription>Update your asset details.</DialogDescription>
          </DialogHeader>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-100 p-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                value={asset.symbol}
                disabled
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                step="0.01"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="purchasePrice">Purchase Price (₹)</Label>
              <Input
                id="purchasePrice"
                name="purchasePrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.purchasePrice}
                onChange={handleChange}
                placeholder="Enter purchase price"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Asset Type</Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Equity">Equity</SelectItem>
                  <SelectItem value="Bond">Bond</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="Commodity">Commodity</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input
                id="purchaseDate"
                name="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={handleChange}
                required
              />
            </div>

            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

