"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from 'axios'
import toast from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(1),
})

const StoreModal = () => {

  const storeModal = useStoreModal()
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        setLoading(true);

        const res = await axios.post("api/stores", values) 
        console.log(res.data)

        toast.success("Store created successfully")

        window.location.assign(`/${res.data.id}`)

    } catch (err) {
        toast.error("Error creating store")
    } finally {
        setLoading(false)
    }
  }

  return (
    <Modal 
        title="Create Store"
        description="Create a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        <div>
            <div className="space-y-4 py-4">
                <Form {...form}>
                    <form onSubmit={ form.handleSubmit(onSubmit) }>
                        <FormField
                            control={form.control}
                            name="name"
                             render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Store Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="E-commerce" {...field} />
                                    </FormControl>
                                    <FormMessage>Required</FormMessage>
                                </FormItem>
                             )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                            <Button disabled={loading} type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
  )
}

export default StoreModal