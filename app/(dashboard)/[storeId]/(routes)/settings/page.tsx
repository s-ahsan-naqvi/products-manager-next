import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingspageProps {
    params: {
        storeId: string
    }
}

const SettingsPage: React.FC<SettingspageProps> = async ({ params }) => {
    
    const { userId } = auth()

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId?.toString()
        }
    })

    if (!store) {
        redirect("/")
    }
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm data={store} />
            </div>
        </div>
     );
}
 
export default SettingsPage;