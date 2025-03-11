"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import { AddAssetDialog } from "@/Portfolio-Risk-Calculator/components/portfolio/add-asset-dialog"

export function AddAssetButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Asset
      </Button>
      <AddAssetDialog open={open} onOpenChange={setOpen} />
    </>
  )
}

