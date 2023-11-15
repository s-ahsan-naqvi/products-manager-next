"use client"

import { Store } from "@prisma/client"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import * as z from 'zod'
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { AlertModal } from "@/components/modals/alert-modals"
import { ApiAlert } from "@/components/ui/api-alert"
import { useOrigin } from "@/hooks/use-origin"

interface SettingsFormProps {
    data: Store
}

const formSchema = z.object({
    name: z.string()
})

type SettingsFormValues = z.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ data }) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: data.name.toString()
        } 
    })

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data)
            router.refresh()
            toast.success("Store updated.")
        } catch (err) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push("/")
            toast.success("Store deleted.") 

        } catch (err) {
            toast.error("Make sure you deleted all products and categories inside.")
        } finally {
            setLoading(false)
        }
    }

    return ( 
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}

            />
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage store preferances" />
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                    disabled={loading}
                >
                    <Trash />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            name="name"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel> 
                                        <FormControl>
                                            <Input type="text" placeholder="Store Name ..." disabled={loading} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                    </div>
                    <Button
                        disabled={loading} 
                        type="submit"
                        className="ml-auto"
                    >
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public"/>
        </>
     )
}