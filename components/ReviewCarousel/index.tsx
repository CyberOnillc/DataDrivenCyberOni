'use client';

import useSwipe from "@/lib/hooks/use-swipe-gesture";
import { wrappedSlice } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type ReviewProps = {
    name: string;
    content: string;
    image: string;
    position: string;
};

function ReviewCarousel({ reviews }: { reviews: ReviewProps[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % reviews.length);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length);
    };

    const toggleExpand = (index: number) => {
        if (expandedIndexes.includes(index)) {
            setExpandedIndexes(expandedIndexes.filter(i => i !== index));
        } else {
            setExpandedIndexes([...expandedIndexes, index]);
        }
    };

    const swipehandlers = useSwipe({
        onSwipedLeft: prevSlide,
        onSwipedRight: nextSlide
    });

    return (
        <div className="relative p-5" {...swipehandlers}>
            <div className="flex flex-col gap-6 p-5 px-5 lg:px-10">
                {wrappedSlice(reviews, currentIndex, currentIndex + 1).map((review, index) => (
                    <div
                        key={index}
                        className="flex-1 p-6 rounded-lg bg-[#ffffff0e] border-4 border-[#AAC3F5] relative text-center justify-center mt-10 lg:px-8 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:text-left text-center"
                    >
                        <div className="flex justify-center lg:justify-start lg:col-span-1 items-center">
                            <Image
                                src={review.image}
                                alt={`${review.name}'s Profile`}
                                className="w-20 h-20 rounded-full object-cover"
                                height={80}
                                width={80}
                            />
                        </div>
                        <div className="mt-4 lg:mt-0 lg:col-span-2">
                            <h3 className="text-lg font-semibold">{review.name}</h3>
                            <h3 className="text-guru-blue text-base">{review.position}</h3>
                        </div>
                        <div className="col-span-1 lg:col-span-3 text-base lg:text-lg leading-relaxed">
                            <p className={`${expandedIndexes.includes(index) ? '' : 'line-clamp-3'}`}>
                                {review.content}
                            </p>
                            <button
                                className="text-blue-500 text-sm mt-2"
                                onClick={() => toggleExpand(index)}
                            >
                                {expandedIndexes.includes(index) ? 'Hide' : 'Show more'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400 p-2 cursor-pointer"
                onClick={prevSlide}
            >
                <ChevronLeft className="text-guru-blue" />
            </div>
            <div
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 p-2 cursor-pointer"
                onClick={nextSlide}
            >
                <ChevronRight className="text-guru-blue" />
            </div>
        </div>
    );
}

export default ReviewCarousel;
