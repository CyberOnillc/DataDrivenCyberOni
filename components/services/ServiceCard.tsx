import { seoUrl } from "@/lib/utils";
import { Image as ServiceImage } from "@prisma/client"; // Ensure this matches your Prisma schema
import { MoveRight } from "lucide-react";
import Link from "next/link";

export type ServiceCardProps = {
    id: string;
    title: string;
    previewContent: string;
    image?: ServiceImage; // Make sure this aligns with the actual Prisma model
};

function ServiceCard({ id, image, previewContent, title }: ServiceCardProps) {
    return (
        <div className="flex flex-col justify-between rounded-xl shadow-lg hover:shadow-lg dark:shadow-[2px_3px_10px_0_#09090b] dark:hover:shadow-[2px_3px_40px_0_#09090b] dark:bg-zinc-900 p-5 h-full">

            <div className="border-l-4 border-service-green px-3 mb-5 font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
            </div>
            <div className="mb-5 text-sm line-clamp-3">
                {previewContent}
            </div>
            <Link
                href={`/services/${seoUrl(title, id)}#description`}
                className="flex gap-x-2 text-blue-500 items-center text-sm"
            >
                Learn more <MoveRight size={16} />
            </Link>
        </div>
    );
}

export default ServiceCard;
