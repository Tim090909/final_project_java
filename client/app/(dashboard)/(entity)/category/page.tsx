"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from './_components/data-table'
import { columns } from "./_components/columns";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { fetchProductGroups } from '@/actions/get_categories';
import withAuth from '@/components/providers/withAuth';

const Page = () => { 
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchProductGroups();
    setCategories(data);
  };
  
  return (
    <div className='p-6 w-full lg:w-[1024px] mx-auto'>
      <div className='w-full my-4 flex justify-end print:hidden'>
        <Button className='bg-slate-700 text-slate-200'><Link href="/">Back</Link></Button>
      </div>
      <DataTable columns={columns} data={categories}  fetchData={fetchData}/>
    </div>
  )
}

export default withAuth(Page);