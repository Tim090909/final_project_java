"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Pen, ReceiptText, Trash } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  fetchProducts: () => void;
}

export function DataTableRowActions<TData>({row, fetchProducts}: DataTableRowActionsProps<TData>) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [action, setAction] = useState<string>('');
    const [amount, setAmount] = useState<number | string>('');
    const product = row.original as { id: string; title: string };

    const handleDeleteProduct = async (id: string) => {
        try{
            const response = await axios.delete(`${API_URL}/api/products/${id}`);
            toast.success("Product deleted");
            fetchProducts();
        } catch{
            toast.error("Something went wrong!");
        }
    }

    const handleActionChange = (value: string) => {
      setAction(value);
    };
  
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!action || !amount) {
        toast.error("Please fill in all fields");
        return;
      }
      setIsOpen(false);
  
      try {
        await axios.post(`${API_URL}/api/products/${product.id}/update-amount`, { action, amount: Number(amount) });
        toast.success("Product amount updated");
        fetchProducts();
      } catch (error) {
        toast.error("Something went wrong!");
      }

      
    };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[350px] bg-slate-100">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Change product amount</DialogTitle>
            <DialogDescription>
              Add or Sell some amount of {product.title}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="action" className="text-right">Action</Label>
              <Select onValueChange={handleActionChange}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Select an Action" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Actions</SelectLabel>
                    <SelectItem value="add">Add</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount</Label>
              <Input id="amount" type="number" className="w-32" value={amount} onChange={handleAmountChange} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => (setIsOpen(false))}>Close</Button>
            <Button type="submit" className="bg-slate-600 text-slate-100">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <Ellipsis className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36 bg-white">
          <DropdownMenuItem >
              <DialogTrigger onClick={() => (setIsOpen(true))} className="p-4 pb-2 flex flex-row items-center font-medium"><ReceiptText className="h-3 w-3 text-slate-600 mr-2" />Add/Sell</DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="ghost">
              <Link href={`/products/${product.id}`} className="flex flex-row items-center">
                <Pen className="h-3 w-3 text-slate-600 mr-2" /> Edit
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="ghost" onClick={() => handleDeleteProduct(product.id)}>
              <Trash className="h-3 w-3 text-slate-600 mr-2" /> Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}