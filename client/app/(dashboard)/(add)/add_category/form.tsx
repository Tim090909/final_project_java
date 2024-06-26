"use client"

import Link from "next/link";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import withAuth from "@/components/providers/withAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string().min(1, {
        message: "Description is required"
    })
})

const AddCategoryForm = () => {
   
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
            const response = await axios.put(`${API_URL}/api/groups`, values);
            router.push(`/category`);
            toast.success("Category adeded");
        } catch{
            toast.error("Something went wrong");
        }
    }
  return (
    <div className=" max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 mt-16">
      <div>
        <h1 className="text-3xl font-semibold">
            Add new category
        </h1>
        <p className="text-sm text-slate-400">Add name of new category!</p>
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
                                Category title 
                            </FormLabel> 
                            <FormControl>
                                <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'Fruits'"
                                    {...field}
                                />
                            </FormControl>
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
                                Category description 
                            </FormLabel> 
                            <FormControl>
                                <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'Fruits'"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-x-2">
                    <Link href="/category">
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

export default withAuth(AddCategoryForm)