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
      <div className="flex flex-col justify-between rounded-xl shadow-lg hover:shadow-lg dark:shadow-[2px_3px_10px_0_#09090b] dark:hover:shadow-[2px_3px_40px_0_#09090b] dark:bg-zinc-900 p-5 h-full space-y-5">
        <div className="flex items-center space-x-4">
          <Image
            className="rounded-full h-10 w-10"
            src={image ? image.src : "https://picsum.photos/200?random=1"}
            alt={title}
            height={40}
            width={40}
          />
          <div className="border-l-4 border-service-green px-3 font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </div>
        </div>
        <div className="text-base text-gray-600 dark:text-gray-400 mb-5 line-clamp-3">
          {previewContent}
        </div>
        <Link
          href={`/services/${seoUrl(title, id)}#description`}
          className="flex items-center gap-x-2 text-blue-500 font-semibold"
        >
          Learn more <MoveRight />
        </Link>
      </div>
    </>
  );
}

export default ServiceCard;
