"use client"

import { useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/Portfolio-Risk-Calculator/components/ui/button"
import { Calendar } from "@/Portfolio-Risk-Calculator/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Portfolio-Risk-Calculator/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Portfolio-Risk-Calculator/components/ui/form"
import { Input } from "@/Portfolio-Risk-Calculator/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/Portfolio-Risk-Calculator/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Portfolio-Risk-Calculator/components/ui/select"
import { cn } from "@/Portfolio-Risk-Calculator/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  id: z.string(),
  symbol: z.string().min(1, "Symbol is required"),
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Asset type is required"),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  purchasePrice: z.coerce.number().positive("Purchase price must be positive"),
  currentPrice: z.coerce.number().positive("Current price must be positive"),
  purchaseDate: z.date(),
})

type FormValues = z.infer<typeof formSchema>

interface EditAssetDialogProps {
  asset: {
    id: string
    name: string
    symbol: string
    type: string
    quantity: number
    purchasePrice: number
    currentPrice: number
    purchaseDate: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (asset: FormValues) => void
}

export function EditAssetDialog({ asset, open, onOpenChange, onSave }: EditAssetDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: asset.id,
      symbol: asset.symbol,
      name: asset.name,
      type: asset.type,
      quantity: asset.quantity,
      purchasePrice: asset.purchasePrice,
      currentPrice: asset.currentPrice,
      purchaseDate: new Date(asset.purchaseDate),
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        id: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        type: asset.type,
        quantity: asset.quantity,
        purchasePrice: asset.purchasePrice,
        currentPrice: asset.currentPrice,
        purchaseDate: new Date(asset.purchaseDate),
      })
    }
  }, [asset, form, open])

  const onSubmit = (values: FormValues) => {
    onSave(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Asset</DialogTitle>
          <DialogDescription>Update the details of your investment asset</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="AAPL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Apple Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="stocks">Stocks</SelectItem>
                        <SelectItem value="etfs">ETFs</SelectItem>
                        <SelectItem value="bonds">Bonds</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="purchasePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                        <Input type="number" step="0.01" className="pl-7" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                        <Input type="number" step="0.01" className="pl-7" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="purchaseDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Purchase Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

