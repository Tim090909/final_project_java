"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CircleDollarSign, Ellipsis, Pen, PenTool, Trash } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
import { useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  fetchData: () => void;
}

export function DataTableRowActions<TData>({row, fetchData}: DataTableRowActionsProps<TData>) {
    const router = useRouter();
    const category = row.original as { id: string, title: string };
    const [totalValue, setTotalValue] = useState(0);
    const handleDeleteCategory = async (id: string) => {
        try{
            const response = await axios.delete(`${API_URL}/api/groups/${id}`);
            toast.success("Category deleted");
            fetchData();
        } catch{
            toast.error("Something went wrong!");
        }
    }

    const getTotalValueByGroup = async (categoryId: string) => {
      try {
        const response = await axios.get(`${API_URL}/api/groups/total-value?groupId=${categoryId}`);
        setTotalValue(response.data);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }

  return (
    <Dialog>
    <DialogContent className='bg-slate-100'>
      <DialogHeader>
        <DialogTitle className="leading-normal">Total value of products from category "{category.title}" in warehouse: ${totalValue.toFixed(2)}</DialogTitle>
      </DialogHeader>
      <DialogClose className='bg-slate-600 p-2 w-24 rounded-lg text-slate-200'>Close</DialogClose>
    </DialogContent>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-white">
        <DropdownMenuItem>
        <DialogTrigger className="p-4 pb-2 flex flex-row items-center font-medium" onClick={() => getTotalValueByGroup(category.id)}><CircleDollarSign className="h-3 w-3 text-slate-600 mr-2"/>Total value</DialogTrigger>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="ghost"><Link href={`/category/${category.id}`} className="flex flex-row items-center"><Pen className="h-3 w-3 text-slate-600 mr-2"/>Edit  </Link>
          </Button>
          </DropdownMenuItem>
        <DropdownMenuItem>
            <Button variant="ghost" onClick={() => handleDeleteCategory(category.id)}>
                <Trash className="h-3 w-3 text-slate-600 mr-2"/> Delete 
            </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </Dialog>
  )
}