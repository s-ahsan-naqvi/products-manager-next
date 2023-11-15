import prismadb from "@/lib/prismadb";
import { BillBoardsForm } from "./components/billboard-form";

const BillboardsIdPage = async ({ params }: { params: { billBoardId: string } }) => {

    const billBoard = await prismadb.billBoard.findUnique({
        where: {
            id: params.billBoardId
        }
    })


    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">   
            <BillBoardsForm data={billBoard} />
            </div>
        </div>

     );
}
 
export default BillboardsIdPage;