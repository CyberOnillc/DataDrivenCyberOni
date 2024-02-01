'use client'
import useSwipe from "@/lib/hooks/use-swipe-gesture";
import useWindowSize from "@/lib/hooks/use-window-size";
import { extractUUID, getRandomIntWithSeed, wrappedSlice } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, Delete, MoveRight, ShoppingCart, Trash, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "../shared/modal";
import { SubService } from "@prisma/client";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { CreateServiceCartItemDTO, DisplayServiceCartDTO, DisplayServiceCartItemDTO, UpdateServiceCartItemDTO } from "@/crud/DTOs";
import { Session } from "next-auth";
import Loading from "../Loading";

export type SubServiceProps = {
    title: string;
    content: string;
    image: string;
}

const imageArray = ['/images/subservice-1.svg', '/images/subservice-2.svg', '/images/subservice-3.svg']
function SubServiceCarousel({ subservices, session }: { subservices: SubService[], session?: Session | null }) {
    const params = useParams();
    const router = useRouter();
    const search = useSearchParams()
    const seoTitle = params.id as string
    const serviceId = extractUUID(seoTitle)
    const [currentDisplay, setCurrentDisplay] = useState<SubService | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [currentItems, setCurrentItems] = useState<SubService[]>([]);
    const [existing, setExisting] = useState(false);
    const [cartItemId, setCartItemId] = useState("");

    const [loading, setLoading] = useState(true);
    const nextSlide = () => {

    };

    const { isMobile, isDesktop } = useWindowSize()
    const prevSlide = () => {

    };

    const swipehandlers = useSwipe({ onSwipedLeft: prevSlide, onSwipedRight: nextSlide })


    async function addToCart(subService: SubService) {

        if (session && session.user) {
            let current = []
            if (!checkSubserviceAdded(subService)) {
                current = [...currentItems, subService]
            } else {
                current = currentItems.filter(item => item.id !== subService.id)


            }
            setCurrentItems(current)

            if (existing) {
                updateCart(current)

            } else {
                addItemtoCart(current)

            }


        } else {
            const searchParams = new URLSearchParams();
            if (typeof window !== 'undefined') searchParams.set('callbackUrl', window.location.href + '/')
            console.log(searchParams.toString());
            router.push(`/api/auth/signin?${searchParams.toString()}`)

        }


    }


    async function updateCart(items: SubService[]) {
        setLoading(true);
        const body: UpdateServiceCartItemDTO = {
            userId: (session?.user as { id: string })?.id,
            description: `adding Service with addons ${''}`,
            addons: items.map(item => ({ id: item.id })),
            cartItemId: cartItemId
        }
        const res = await fetch(`/api/cart/services/${(session?.user as { id: string })?.id}`, { method: 'PUT', body: JSON.stringify(body) })
        setLoading(false);

    }

    async function addItemtoCart(items: SubService[]) {
        setLoading(true);

        const body = {
            serviceId,
            userId: (session?.user as { id: string })?.id,
            description: `adding Service with addons ${''}`,
            addons: items.map(item => ({ id: item.id }))
        } as CreateServiceCartItemDTO
        const res = await fetch(`/api/cart/services/${(session?.user as { id: string })?.id}`, { method: 'POST', body: JSON.stringify(body) })
        if (res.status === 200) {
            const {data} = await res.json();
            const cartItem =  data as DisplayServiceCartItemDTO   
            setCartItemId(cartItem.id)
            setExisting(true);
        
        }
        setLoading(false);

    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/cart/services/${(session?.user as { id: string })?.id}`)
            const { data } = await res.json() as { data: DisplayServiceCartDTO };
            const { items } = data
            if (items.length == 0) setExisting(false);
            for (let item of items) {
                if (item.serviceId === serviceId) {
                    console.log(item.addons);
                    setExisting(true);
                    setCartItemId(item.id)
                    setCurrentItems(item.addons)
                    break
                }
            }

            setLoading(false);
        }

        if(session) fetchData()
    }, [serviceId, session, session?.user]);


    function checkSubserviceAdded(subservice: SubService) {

        return currentItems.some(item => item.id === subservice.id);

    }

    return (<>
        <div className='relative lg:p-5  w-full' {...swipehandlers}>
            <div className="font-bold text-4xl text-center my-10 w-full">Service Add-ons</div>
            <div className="bg-purple-200 dark:bg-purple-900 pb-10 w-full max-w-full mx-auto overflow-x-auto scroll-smooth snap-x scrollbar-thin scrollbar-thumb-gray-400  scrollbar-track-gray-50 scrollbar-thumb-rounded-md dark:scrollbar-track-slate-600 ">
                <div className="relative flex flex-row gap-10 p-5 lg:px-10 justify-start w-fit">
                    {subservices.map((subService, index) =>
                        <div data-id={subService.id} id={subService.title} key={index} className={`relative flex flex-col w-[80vw] lg:w-[30vw] snap-start scoll-ml-3 p-2 lg:p-8 gap-3 rounded-xl ${checkSubserviceAdded(subService) ? 'bg-green-300' : 'bg-gray-100 dark:bg-gray-800'}  border-4 border-[#AAC3F5]  text-center justify-center mt-10 lg:px-10 pb-10 `}>
                            <div className=" w-full text-center  lg:text-left h-fit">
                                <h3 className="text-lg font-semibold">{subService.title}</h3>
                            </div>
                            <div className=" text-center  lg:text-left line-clamp-5">
                                {subService.description}
                            </div>
                            {checkSubserviceAdded(subService) ?

                                <div className="absolute top-2 right-2 flex justify-center items-center rounded-full w-10 h-10 bg-green-700 text-white">
                                    <Check />
                                </div> :


                                <></>}
                            <Image
                                src={imageArray[getRandomIntWithSeed(index.toString(), 0, 2)]} // Replace with the actual profile image URL
                                alt={`${subService.title}-image`}
                                className=" object-cover lg:col-span-1 col-span-2 w-full"
                                height={300}
                                width={300}
                            />
                            <div className="flex gap-4 justify-around text-center items-center align-middle">
                                < button onClick={() => {
                                    console.log(subService);
                                    setCurrentDisplay(subService)
                                    setShowModal(true)
                                }} type="button" className="flex gap-x-3 mb-5 text-blue-500">Learn more  <MoveRight /></button>

                                <button onClick={() => addToCart(subService)} className="hover:bg-red-400 hover:shadow hover:text-white p-3 rounded-md" aria-label="add-to-cart">
                                    {checkSubserviceAdded(subService) ? <Trash /> : <ShoppingCart />}

                                </button>
                            </div>
                        </div>
                    )
                    }


                </div>



            </div>
            <div className="flex justify-center items-center my-10">
                {currentItems.length > 0 &&
                    <div className="rounded-full flex gap-3 bg-[#33D460] shadow-[0_10px_25px_0_#33D3D454] p-3 w-fit text-white text-center justify-center items-center">Buy now</div>}

            </div>



            {
                <Modal setShowModal={setShowModal} showModal={showModal} >
                    <div className="rounded-xl w-fit     p-10 relative container mx-auto text bg-gray-50 shadow-lg dark:bg-gray-800 text-black dark:text-gray-50 flex flex-col items-center justify-center">
                        <button className="absolute right-2 top-1 text-red-500" onClick={() => setShowModal(false)}><X /></button>
                        <div>Usage Score: {currentDisplay?.serviceUsageScore}/100</div>
                        <div>Esitmated time for completion: {currentDisplay?.estimated_hours_times_one_hundred_percent} hrs</div>
                        <div>Overhead Cost: {currentDisplay?.overheadCost} $</div>
                        <div></div>
                    </div>
                </Modal>
            }

            {loading &&
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-md bg-gray-100/20 dark:bg-slate-600/20">
                    <Loading />
                </div>
            }
        </div>


    </>);
}

export default SubServiceCarousel;