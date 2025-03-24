"use client"

import type React from "react"
import { useState } from "react"
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
import { usePortfolio } from "@/src/context/PortfolioContext"
import { financeAPI } from "@/src/services/financeAPI"
import { AlertCircle } from "lucide-react"

type AddAssetDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddAssetDialog({ open, onOpenChange }: AddAssetDialogProps) {
  const { addAsset } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
  })

  const handleSearch = async (query: string) => {
    const searchTerm = query.trim();
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await financeAPI.searchStocks(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!selectedStock && !formData.name) {
        throw new Error('Please select a stock or enter an asset name');
      }

      const quantity = Number(formData.quantity);
      const purchasePrice = Number(formData.purchasePrice);

      if (isNaN(quantity) || quantity <= 0) {
        throw new Error('Please enter a valid quantity');
      }

      if (isNaN(purchasePrice) || purchasePrice <= 0) {
        throw new Error('Please enter a valid purchase price');
      }

      await addAsset(
        selectedStock?.symbol || formData.name,
        quantity,
        purchasePrice
      );

      // Reset form and close dialog
      setFormData({
        name: "",
        quantity: "",
        purchasePrice: "",
        purchaseDate: "",
      });
      setSelectedStock(null);
      setSearchQuery("");
      onOpenChange(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add asset');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="absolute inset-0 m-auto w-[95%] sm:max-w-[425px] h-fit max-h-[90vh] overflow-y-auto">
        <div className="overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>Enter the details of the asset you want to add to your portfolio.</DialogDescription>
          </DialogHeader>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-100 p-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Asset Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={searchQuery || formData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                    handleSearch(value);
                    handleChange(e);
                  }}
                  placeholder="Search or enter asset name"
                  required
                />
                {isSearching && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-gray-900" />
                  </div>
                )}
                {searchResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 max-h-[200px] overflow-y-auto border rounded-md bg-background shadow-lg">
                    {searchResults.map((result) => (
                      <div
                        key={result.symbol}
                        className="p-2 hover:bg-muted cursor-pointer"
                        onClick={() => {
                          setSelectedStock(result);
                          setSearchQuery(`${result.name} (${result.symbol})`);
                          setSearchResults([]);
                        }}
                      >
                        {result.name} ({result.symbol})
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                placeholder="Number of units"
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
                placeholder="Price per unit in ₹"
                required
              />
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Asset"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

