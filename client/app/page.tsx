"use client"

import { Button } from "@/components/ui/button";
import { BookUser, CircleUserRound, Layers3, LogOut, ReceiptText, ShoppingCart, Store, User, Users } from "lucide-react";
import Link from "next/link";
import Logout from "./logout";
import withAuth from "@/components/providers/withAuth";

const Home = () => {

  return (
    <div className="bg-zinc-950">
      <header className="flex justify-end items-center py-4 px-4 gap-8">
        <Logout />
      </header>
      <main className="flex flex-col items-center h-screen">
        <div className="h-72 flex justify-center items-center">
          <h1 className="text-slate-200 text-9xl">WAREHOUSE</h1>
        </div>
        <div className="flex flex-wrap max-w-[800px] gap-16">
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <ShoppingCart className="w-20 h-20 text-slate-300"/>
            <Link href="products"><Button variant="outline" className="text-slate-200">Products</Button></Link>
          </div>
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <Layers3 className="w-20 h-20 text-slate-300"/>
            <Link href="category"><Button variant="outline" className="text-slate-200">Categories</Button></Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Home);
