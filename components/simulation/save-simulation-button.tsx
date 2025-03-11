"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Portfolio-Risk-Calculator/components/ui/dialog"
import { Input } from "@/Portfolio-Risk-Calculator/components/ui/input"
import { Label } from "@/Portfolio-Risk-Calculator/components/ui/label"
import { Textarea } from "@/Portfolio-Risk-Calculator/components/ui/textarea"
import { useToast } from "@/Portfolio-Risk-Calculator/hooks/use-toast"

export function SaveSimulationButton() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSave = () => {
    if (!name) return

    // Simulate saving
    toast({
      title: "Simulation saved",
      description: `"${name}" has been saved to your scenarios.`,
    })

    setOpen(false)
    setName("")
    setDescription("")
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Save className="h-4 w-4" />
        Save Simulation
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Simulation</DialogTitle>
            <DialogDescription>
              Save your current simulation settings as a scenario for future reference.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Scenario Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Conservative Approach"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this scenario"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!name}>
              Save Scenario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

