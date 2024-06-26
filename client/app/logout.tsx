'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return <Button className="bg-slate-400" size="sm" onClick={handleLogout}> Log out 
          <LogOut className='pl-2'/>
    </Button>
};

export default Logout;
