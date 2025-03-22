"use client"

import { useState } from "react"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import { Plus } from "lucide-react"
import { AddAssetDialog } from "./add-asset-dialog"

export function AddAssetButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add Asset
      </Button>

      <AddAssetDialog open={open} onOpenChange={setOpen} />
    </>
  )
}

