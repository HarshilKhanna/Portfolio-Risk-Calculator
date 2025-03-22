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
} from "@/Portfolio-Risk-Calculator/components/ui/dialog"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import { Input } from "@/Portfolio-Risk-Calculator/components/ui/input"
import { Label } from "@/Portfolio-Risk-Calculator/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Portfolio-Risk-Calculator/components/ui/select"
import type { Asset } from "./portfolio-table"

type EditAssetDialogProps = {
  asset: Asset
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (asset: Asset) => void
}

export function EditAssetDialog({ asset, open, onOpenChange, onSave }: EditAssetDialogProps) {
  const [formData, setFormData] = useState<Asset>({ ...asset })

  useEffect(() => {
    setFormData({ ...asset })
  }, [asset])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "purchasePrice" || name === "currentPrice" ? Number.parseFloat(value) : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Asset</DialogTitle>
          <DialogDescription>Update the details of your asset.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Asset Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Asset Type</Label>
            <Select value={formData.type} onValueChange={handleSelectChange} required>
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
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              step="0.01"
              value={formData.quantity}
              onChange={handleChange}
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
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="currentPrice">Current Price (₹)</Label>
            <Input
              id="currentPrice"
              name="currentPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.currentPrice}
              onChange={handleChange}
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
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

