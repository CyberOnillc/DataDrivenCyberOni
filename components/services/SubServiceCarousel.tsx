'use client'
import useSwipe from "@/lib/hooks/use-swipe-gesture";
import useWindowSize from "@/lib/hooks/use-window-size";
import { getRandomIntWithSeed, wrappedSlice } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoveRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Modal from "../shared/modal";
import { SubService } from "@prisma/client";

export type SubServiceProps = {
    title: string;
    content: string;
    image: string;
}

const imageArray = ['/images/subservice-1.svg', '/images/subservice-2.svg', '/images/subservice-3.svg']
function SubServiceCarousel({ subservices }: { subservices: SubService[] }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentDisplay, setCurrentDisplay] = useState<SubService| null>(null);
    const [showModal, setShowModal] = useState(false);
    const nextSlide = () => {
        
    };

    const { isMobile, isDesktop } = useWindowSize()
    const prevSlide = () => {
        
    };

    const swipehandlers = useSwipe({ onSwipedLeft: prevSlide, onSwipedRight: nextSlide })

    return (<>
        <div className='relative lg:p-5  w-full' {...swipehandlers}>
            <div className="font-bold text-4xl text-center my-10 w-full">Service Add-ons</div>
            <div className="bg-purple-200 dark:bg-purple-900 pb-10 w-full max-w-full mx-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400  scrollbar-track-gray-50 scrollbar-thumb-rounded-md dark:scrollbar-track-slate-600 ">
                <div className="relative flex flex-row gap-10 p-5 lg:px-10 justify-start w-fit">
                    {subservices.map((subservice, index) =>
                        <div id={subservice.title} key={index} className="flex flex-col w-[80vw] lg:w-[30vw] p-2 lg:p-8 gap-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-4 border-[#AAC3F5]  text-center justify-center mt-10 lg:px-10 pb-10 ">
                            <div className=" w-full text-center  lg:text-left h-fit">
                                <h3 className="text-lg font-semibold">{subservice.title}</h3>
                            </div>
                            <div className="z-20 text-center  lg:text-left">
                                {subservice.description}
                            </div>
                            <Image
                                src={imageArray[getRandomIntWithSeed(index.toString(), 0, 2)]} // Replace with the actual profile image URL
                                alt={`${subservice.title}-image`}
                                className=" object-cover lg:col-span-1 col-span-2 w-full"
                                height={300}
                                width={300}
                            />
                            < button onClick={()=> {
                                console.log(subservice);
                                setCurrentDisplay(subservice)
                                setShowModal(true)
                            }} type="button" className="flex gap-x-3 mb-5 text-blue-500">Learn more  <MoveRight /></button>
                        </div>
                    )
                    }

                </div>

            
            </div>



            {
                <Modal setShowModal={setShowModal} showModal={showModal} >
                    <div className="rounded-xl w-fit     p-10 relative container mx-auto text bg-gray-50 shadow-lg dark:bg-gray-800 text-black dark:text-gray-50 flex flex-col items-center justify-center">
                        <button className="absolute right-2 top-1 text-red-500" onClick={()=>setShowModal(false)}><X/></button>
                        <div>Usage Score: {currentDisplay?.serviceUsageScore}/100</div>
                        <div>Esitmated time for completion: {currentDisplay?.estimated_hours_times_one_hundred_percent} hrs</div>
                        <div>Overhead Cost: {currentDisplay?.overheadCost} $</div>
                        <div></div>
                    </div>
                </Modal>
            }
        </div>


    </>);
}

export default SubServiceCarousel;