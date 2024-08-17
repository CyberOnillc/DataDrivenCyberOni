import { seoUrl } from "@/lib/utils";
import { Image as ServiceImage } from "@prisma/client";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ServiceCardProps = {
    id: string;
    title: string;
    previewContent: string;
    image: ServiceImage;
};

function ServiceCard({ id, image, previewContent, title }: ServiceCardProps) {
    return (
        <>
            <div className="flex flex-col justify-around rounded-xl shadow-lg hover:shadow-lg dark:shadow-[2px_3px_10px_0_#09090b] dark:hover:shadow-[2px_3px_40px_0_#09090b] dark:bg-zinc-900 p-5 h-full">
                {/* <Image
                    className="rounded-full h-10 w-10 mb-5"
                    src={image ? image.src : "https://picsum.photos/200?random=1"}
                    alt={title}
                    height={30}
                    width={30}
                /> */}
                <div className="border-l-4 border-service-green px-3 mb-5 font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                    {title}
                </div>
                <div className="mb-5 line-clamp-3">{previewContent}</div>
                <Link
                    href={`/services/${seoUrl(title, id)}#description`}
                    className="flex gap-x-3 mb-5 text-blue-500"
                >
                    Learn more <MoveRight />
                </Link>
            </div>
        </>
    );
}

export default ServiceCard;
