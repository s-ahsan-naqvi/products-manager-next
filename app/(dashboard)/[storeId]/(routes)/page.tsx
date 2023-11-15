interface DashboardPageProps {
    params: { storeId: string }
}

import prismadb from "@/lib/prismadb";

const DashboardPage: React.FC<DashboardPageProps> = async ( { params } ) => {

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })
    return (
        <div>
            this is dashboard || active store: {params.storeId}
            <p>
                store name: {store?.name}
            </p>
        </div>
     );
}
 
export default DashboardPage;