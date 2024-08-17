'use client';

import Image from "next/image";
import Link from "next/link";
import React, {
    MutableRefObject,
    useMemo,
    useRef,
    useState,
} from "react";
import { Image as CaseImage, CaseStudy } from "@prisma/client";
import { DisplayServiceDTO } from "@/crud/service";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { seoUrl } from "@/lib/utils";
import ImageWithTextOverlay from "../shared/ImageWithTextOverlay";

function PortfolioCarousel({ services }: { services: DisplayServiceDTO[] }) {
    const gridContainer = useRef<HTMLDivElement | null>(null);
    const serviceContainer = useRef<HTMLDivElement | null>(null);
    const servicesWithCaseStudies = useMemo(() => {
        return services.filter(
            (service) => service.CaseStudies && service.CaseStudies.length > 0,
        );
    }, [services]);

    const [currentGrid, setCurrentGrid] = useState(
        servicesWithCaseStudies[0]
            ? servicesWithCaseStudies[0].CaseStudies ?? []
            : []
    );
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = (containerRef: MutableRefObject<HTMLDivElement | null>) => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left:
                    containerRef.current.scrollLeft +
                    containerRef.current.clientWidth / 3,
                behavior: "smooth",
            });
        }
    };

    const prevSlide = (containerRef: MutableRefObject<HTMLDivElement | null>) => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left:
                    containerRef.current.scrollLeft -
                    containerRef.current.clientWidth / 3,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="container mx-auto my-10 flex flex-col justify-center px-5 lg:my-20 lg:flex-row lg:justify-start">
            <div className="relative w-full my-4 flex gap-3 lg:my-0 lg:w-1/3">
                {servicesWithCaseStudies.length > 0 && (
                    <button
                        type="button"
                        className="w-4 cursor-pointer text-gray-400 lg:hidden"
                        onClick={() => prevSlide(serviceContainer)}
                    >
                        <ChevronLeft className="text-guru-blue" />
                    </button>
                )}
                <div
                    ref={serviceContainer}
                    className="flex max-w-full justify-start gap-5 overflow-auto text-right scrollbar-none lg:flex-col lg:gap-10 lg:overflow-hidden lg:px-10 lg:text-4xl"
                >
                    {servicesWithCaseStudies.length > 0 ? (
                        servicesWithCaseStudies.map((service, index) => (
                            <div
                                key={index}
                                className="flex cursor-pointer items-center justify-center gap-2 hover:underline focus:text-[#5380EA]"
                            >
                                <button
                                    onClick={() => {
                                        setCurrentGrid(service.CaseStudies || []);
                                        setCurrentIndex(index);
                                    }}
                                    className="peer/item peer focus:text-[#5380EA]"
                                >
                                    {service.title}
                                </button>
                                <MoveRight
                                    className={`h-full w-10 ${currentIndex === index
                                        ? "hidden lg:block lg:text-[#5380EA]"
                                        : "hidden"
                                        }`}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-full text-lg font-semibold">
                            Case Studies Coming Soon
                        </div>
                    )}
                </div>
                {servicesWithCaseStudies.length > 0 && (
                    <button
                        type="button"
                        className="w-4 cursor-pointer text-gray-400 lg:hidden"
                        onClick={() => nextSlide(serviceContainer)}
                    >
                        <ChevronRight className="text-guru-blue" />
                    </button>
                )}
            </div>

            <div className={`relative my-4 flex gap-3 lg:my-0 lg:w-2/3`}>
                {currentGrid.length > 0 ? (
                    <>
                        <button
                            type="button"
                            className="w-4 cursor-pointer text-gray-400 lg:hidden"
                            onClick={() => prevSlide(gridContainer)}
                        >
                            <ChevronLeft className="text-guru-blue" />
                        </button>

                        <div
                            ref={gridContainer}
                            className="flex w-full max-w-full items-center justify-start gap-2 overflow-x-auto scrollbar-none lg:grid lg:grid-cols-4 lg:grid-rows-[25rem_1fr_1fr_1fr]"
                        >
                            {currentGrid.map((caseStudy: CaseStudy & { images: CaseImage[] }, index) => (
                                <div
                                    key={index}
                                    className="h-60 w-1/2 flex-shrink-0 overflow-hidden rounded-lg lg:aspect-auto lg:h-full lg:w-full"
                                >
                                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                                        <ImageWithTextOverlay
                                            modal={
                                                <ReadMoreModal
                                                    link={`/casestudies/${seoUrl(caseStudy.title, caseStudy.id as string)}`}
                                                    heading={caseStudy.title}
                                                    points={[
                                                        (caseStudy.userProblems as { problems: string; })?.problems ?? "",
                                                    ]}
                                                />
                                            }
                                            title={caseStudy.title}
                                            image={caseStudy.images[0]?.src || `https://picsum.photos/200?random=1`}
                                            width={400}
                                            height={400}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="w-4 cursor-pointer text-gray-400 lg:hidden"
                            onClick={() => nextSlide(gridContainer)}
                        >
                            <ChevronRight className="text-guru-blue" />
                        </button>
                    </>
                ) : (
                    <div className="text-center w-full">No Case Studies Added</div>
                )}
            </div>
        </div>
    );
}

const ReadMoreModal = ({
    points,
    heading,
    link,
}: {
    points: string[];
    heading: string;
    link: string;
}) => {
    return (
        <div>
            <h2>{heading}</h2>
            <ul className="list-disc p-5">
                {points.map((text, index) => (
                    <li key={index}>{text}</li>
                ))}
            </ul>
            <div className="text-right">
                <Link
                    className="flex gap-5 text-center hover:text-blue-400"
                    href={link}
                >
                    View Details
                    <MoveRight />
                </Link>
            </div>
        </div>
    );
};

export default PortfolioCarousel;
