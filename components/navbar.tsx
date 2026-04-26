import { Plus } from "lucide-react"
import Link from "next/link"

export default function Navbar(){
    return(
        <nav className={"fixed bottom-0 w-[390px] bg-maroon flex items-center pb-3 pt-3"}>

            <Link href="/feed" className="flex flex-col items-center gap-1 flex-1">
                <div className={"text-2xl"}>🏠</div>
                <span className="text-beige text-xs">feed</span>
            </Link>
            <Link href="/post" className="flex flex-col items-center gap-1 flex-1 pt-4">
                <div className="w-12 h-12 rounded-full bg-cherry flex items-center justify-center -mt-6">
                    <Plus color="white" size={24} />
                </div>
            </Link>
            <Link href="/saved" className="flex flex-col items-center gap-1 flex-1">
                <div className={"text-2xl"}>🔖</div>
                <span className="text-beige text-xs">saved</span>
            </Link>
        </nav>
    )

}