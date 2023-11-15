// import Image from 'next/image'
"use client"

import { useEffect } from "react";

import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
  

export default function Home() {

  const isOpen = useStoreModal((state) => state.isOpen)
  const onOpen = useStoreModal((state) => state.onOpen)

  useEffect(() => {
    if(!isOpen) {
        onOpen();
    }
  },[isOpen, onOpen])
  
  return (
    <div className=" min-h-screen w-full bg-opacity-80 p-12">
        <div className=" flex flex-row justify-between h-24 w-full items-center bg-opacity-80 bg-clip-padding backdrop-blur">
            <Button className=" max-w-[200px] font-bold text-xl" variant="ghost">Dashboard</Button>
            <UserButton afterSignOutUrl="/" />
        </div>
    </div>
  )
}
