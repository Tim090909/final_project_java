"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from './_components/data-table'
import { columns } from "./_components/columns";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { fetchProductGroups } from '@/actions/get_categories';
import withAuth from '@/components/providers/withAuth';
import decryptData from '@/lib/decrypt';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Page = () => { 
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchProductGroups();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      //console.log(response);
      //const encryptedData = response.data;
      //const decryptedData = decryptData(encryptedData);
      //console.log(decryptData);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterProducts = async (categoryId: number) => {
    try {
      const response = await axios.get(`${API_URL}/api/products/category?groupId=${categoryId}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  }

  const fetchTotalValue = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products/total-value`);
      //const encryptedData = response.data;
      //const decryptedData = decryptData(encryptedData);
      setTotalValue(response.data);
    } catch (error) {
      console.error('Error fetching total value of products:', error);
    }
  }

  return (
    <div className='p-6 w-full xl:w-[1280px] mx-auto'>
      <div className='w-full my-4 flex justify-between'>
        <Dialog>
          <DialogTrigger className='bg-slate-400 px-8 rounded-lg' onClick={fetchTotalValue}>Get total value of products</DialogTrigger>
          <DialogContent className='bg-slate-100'>
            <DialogHeader>
              <DialogTitle>Total value of products in warehouse: ${totalValue.toFixed(2)}</DialogTitle>
            </DialogHeader>
            <DialogClose className='bg-slate-600 p-2 w-24 rounded-lg text-slate-200'>Close</DialogClose>
          </DialogContent>
        </Dialog>
        <Button className='bg-slate-700 text-slate-200'><Link href="/">Back</Link></Button>
      </div>
      <DataTable columns={columns} data={products} categories={categories} filterProducts={filterProducts} fetchProducts={fetchProducts}/>
    </div>
  )
}

export default withAuth(Page);