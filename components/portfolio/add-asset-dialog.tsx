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
} from "@/Portfolio-Risk-Calculator/components/ui/dialog"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import { Input } from "@/Portfolio-Risk-Calculator/components/ui/input"
import { Label } from "@/Portfolio-Risk-Calculator/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Portfolio-Risk-Calculator/components/ui/select"

type AddAssetDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddAssetDialog({ open, onOpenChange }: AddAssetDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would add the asset to the database
    console.log("Adding asset:", formData)

    // Reset form and close dialog
    setFormData({
      name: "",
      type: "",
      quantity: "",
      purchasePrice: "",
      purchaseDate: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
          <DialogDescription>Enter the details of the asset you want to add to your portfolio.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Asset Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., HDFC Bank, Gold ETF"
              required
            />
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
            <Button type="submit">Add Asset</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

