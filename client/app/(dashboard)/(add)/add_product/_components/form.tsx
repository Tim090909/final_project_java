"use client"

import Link from "next/link";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import withAuth from "@/components/providers/withAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    groupId: z.coerce.number(),
    description: z.string().min(2, {
        message: "Description is required"
    }),
    manufacturer: z.string().min(2, {
        message: "Manufacturer is required"
    }),
    amount: z.coerce.number(),
    price: z.coerce.number(),

})

interface Category {
    id: number;
    title: string;
}

interface AddFormProps {
    categories: Category[];
}

const AddProductForm = ({categories} : AddFormProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: ""
        },
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.put(`${API_URL}/api/products`, values);
            router.push(`/products`);
            toast.success("Product adeded");
        } catch{
            toast.error("Something went wrong");
        }
    }
  return (
    <div className=" max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 mt-16">
      <div>
        <h1 className="text-3xl font-semibold">
            Add new product
        </h1>
        <p className="text-sm text-slate-400">Add title, amount, set status and set the price of new product!</p>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
            >
                <FormField 
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                           <FormLabel>
                                Product title 
                            </FormLabel> 
                            <FormControl>
                                <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'Eggs'"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="groupId"
                    render={({field}) => (
                        <FormItem className="flex flex-col gap-3">
                           <FormLabel>
                                Category
                            </FormLabel> 
                            <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-[200px] justify-between ",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value
                                ? categories.find(
                                    (category) => category.id === field.value
                                )?.title
                                : "Select category"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                        <Command className="bg-white">
                            <CommandInput placeholder="Search category..." />
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                value={category.title}
                                key={category.id}
                                onSelect={() => {
                                    form.setValue("groupId", category.id)
                                }}
                                >
                                <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    category.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                />
                                {"(" + category.id + ") " + category.title}
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </Command>
                        </PopoverContent>
                    </Popover>
                           
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField 
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                           <FormLabel>
                                Product description
                            </FormLabel> 
                            <FormControl>
                                <Input
                                    disabled={isSubmitting}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="manufacturer"
                    render={({field}) => (
                        <FormItem>
                           <FormLabel>
                                Product manufacturer
                            </FormLabel> 
                            <FormControl>
                                <Input
                                    disabled={isSubmitting}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="amount"
                    render={({field}) => (
                        <FormItem>
                           <FormLabel>
                                Product amount
                            </FormLabel> 
                            <FormControl>
                                <Input
                                type="number"
                                    disabled={isSubmitting}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="price"
                    render={({field}) => (
                        <FormItem>
                           <FormLabel>
                                Product price
                            </FormLabel> 
                            <FormControl>
                                <Input
                                type="number"
                                    disabled={isSubmitting}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-x-2">
                    <Link href="/products">
                        <Button
                            type="button"
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </Form>
      </div>
    </div>
  )
}

export default withAuth(AddProductForm);