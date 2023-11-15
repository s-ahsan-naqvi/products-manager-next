"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"


const BillboardClient = () => {

  const router = useRouter()
  const params = useParams()
  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title="Billboards (0)" description="Manage Billboards for your store" />
            <Button onClick={() => router.push(`/${params.storeId}/billBoards/new`)}>
                <Plus className="mr-2 h-4 w-4"/>
                Add New
            </Button>
            
        </div>
        <Separator />
    </>
  )
}

export default BillboardClient