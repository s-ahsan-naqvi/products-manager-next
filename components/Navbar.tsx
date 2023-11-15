import { UserButton, auth } from "@clerk/nextjs"

import MainNav  from "./main-nav"
import StoreSwitcher from "./store-switcher"
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

const Navbar = async () => {

  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in")
  }

  const userStores = await prismadb.store.findMany({
    where: {
        userId: userId
    }
  })

  return (
    <div className="border-b">
        <div className="flex h-16 px-4 items-center">
            <StoreSwitcher items={userStores} />
            <MainNav className="mx-6"/>
            <div className="ml-auto flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" />
            </div>

        </div>
    </div>
  )
}

export default Navbar