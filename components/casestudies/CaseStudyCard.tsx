import { seoUrl } from "@/lib/utils";
import { Image as CasestudyImage } from "@prisma/client";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type CasestudyCardProps = {
    id: string;
    title: string;
    previewContent: string;
    image: CasestudyImage | null;

}


function CaseStudyCard({ id, image, previewContent, title }: CasestudyCardProps) {
    return (<>
        <div className="relative flex flex-col justify-around rounded-xl shadow-lg hover:shadow-lg dark:shadow-[2px_3px_10px_0_#09090b] darkh:hover:shadow-[2px_3px_40px_0_#09090b] dark:bg-zinc-900 h-full overflow-hidden">
            <Image className="absolute h-full w-full top-0 z-0 object-cover" src={image ? image.src : "https://picsum.photos/200?random=1"} alt={title} height={300} width={400} />
            <div className="p-5 z-10 bg-gray-950/20 text-white h-full flex flex-col justify-center">
                <div className="border-l-4 border-service-green px-3 mb-5 font-bold text-xl">{title}</div>
                <div className="mb-5 line-clamp-3">{previewContent}</div>
                < Link href={`/casestudy/${id}/${seoUrl(title)}`} className="flex gap-x-3 mb-5 text-blue-500">Learn more  <MoveRight /></Link>
            </div>
        </div>

    </>)


        ;
}

export default CaseStudyCard; { }
