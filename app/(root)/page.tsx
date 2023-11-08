// import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div className="relative bg-slate-400 min-h-screen w-full bg-opacity-80">
        <div className="static top-0 w-full h-24 blur">

        </div>
        <div className="fixed top-0 z-20 flex flex-row justify-between h-24 w-full p-12 items-center bg-gray-200 bg-opacity-80 bg-clip-padding backdrop-blur">
            <Button className=" max-w-[200px] font-bold z-50 text-xl" variant="ghost">Dashboard</Button>
            <UserButton afterSignOutUrl="/" />
        </div>
        <div className="flex flex-col ">
            <div className="w-full h-screen bg-blue-500">
                <h1>section</h1>
            </div>
            <div className="w-full h-screen bg-green-400">

            </div>
            <div className="w-full h-screen bg-gray-800">

            </div>
        </div>
    </div>
  )
}
