import { Image as CaseImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

function CaseStudyCard(caseStudy: { id: string, images?: CaseImage[], title: string }) {
    return (

            <Link
                href={`/casestudies/${caseStudy.id}`}
                className="relative w-1/2 flex-col items-center justify-center overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl lg:w-[170px]"
            >
                <Image
                    className="aspect-square object-fill"
                    height={170}
                    width={170}
                    alt="case image"
                    src={
                        caseStudy.images && caseStudy.images?.length>0
                            ? (caseStudy.images as CaseImage[])[0].src
                            : "https://picsum.photos/200"
                    }
                />
                <div className="absolute bottom-0 line-clamp-1 w-full bg-gradient-to-t from-black to-black/0 py-5  text-center text-white">
                    {caseStudy.title}
                </div>
            </Link>

    );
}

export default CaseStudyCard;