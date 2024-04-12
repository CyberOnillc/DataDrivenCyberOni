import { Redo } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type ServiceCardProps = {
    icon: string | ReactNode,
    title: string,
    link: string
}
function ServiceCard({icon, title, link}: ServiceCardProps) {
    return (

        <div className="relative h-fit overflow-hidden rounded-xl bg-gray-100  p-5 text-black hover:bg-[#0F172A] hover:text-white lg:h-52">
            <div className="absolute right-0 top-0 h-3 w-full bg-blue-400"></div>
            <div className=" relative flex w-full justify-start">
                {icon}
            </div>
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div className="flex w-full justify-end">
                <Link
                    className=" rounded-sm bg-blue-400 p-3 shadow-md"
                    href={link}
                >
                <Redo />
                </Link>
            </div>
        </div>);
}

export default ServiceCard;