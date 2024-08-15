"use client";
import useSwipe from "@/lib/hooks/use-swipe-gesture";
import useWindowSize from "@/lib/hooks/use-window-size";
import { extractUUID, getRandomIntWithSeed, wrappedSlice } from "@/lib/utils";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Delete,
  MoveRight,
  Plus,
  ShoppingCart,
  Trash,
  X,
} from "lucide-react";
import Image from "next/image";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Modal from "../shared/modal";
import { Image as CaseImage, SubService } from "@prisma/client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  CreateServiceCartItemDTO,
  DisplayServiceCartDTO,
  DisplayServiceCartItemDTO,
  DisplaySubServiceDTO,
  UpdateServiceCartItemDTO,
} from "@/crud/DTOs";
import { Session } from "next-auth";
import Loading from "../Loading";
import Link from "next/link";
import CaseStudyCard from "./CaseStudyCard";
import { LoadingDots } from "../shared/icons";

export type SubServiceProps = {
  title: string;
  content: string;
  image: string;
};

const imageArray = [
  "/images/subservice-1.svg",
  "/images/subservice-2.svg",
  "/images/subservice-3.svg",
];
function SubServiceCarousel({
  subServices,
  session,
}: {
  subServices: DisplaySubServiceDTO[];
  session?: Session | null;
}) {
  const params = useParams();
  const search = useSearchParams();
  const router = useRouter();
  const seoTitle = params.id as string;
  const serviceId = extractUUID(seoTitle);
  const [currentDisplay, setCurrentDisplay] =
    useState<DisplaySubServiceDTO | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentItems, setCurrentItems] = useState<DisplaySubServiceDTO[]>([]);
  const [existing, setExisting] = useState(false);
  const [cartItemId, setCartItemId] = useState("");

  const [highlightedElementId, setHighlightedElementId] = useState<
    string | null
  >(null);
  const highlightedElementRef = useRef<HTMLDivElement>(null);
  const SubServicesContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const nextSlide = (containerRef: MutableRefObject<HTMLDivElement | null>) => {
    //scrollToElement(forwardTargetRef)
    if (containerRef.current) {
      // console.log("scrolling right", containerRef.current?.scrollLeft , containerRef.current?.clientWidth / 3,);

      containerRef.current.scrollTo({
        left:
          containerRef.current.scrollLeft +
          containerRef.current.clientWidth / 3,
        behavior: "smooth",
        
      });
    }
  };

  const prevSlide = (containerRef: MutableRefObject<HTMLDivElement | null>) => {
    //scrollToElement(backwardTargetRef)

    if (containerRef.current) {
      containerRef.current.scrollTo({
        left:
          containerRef.current.scrollLeft -
          containerRef.current.clientWidth / 3,
        behavior: "smooth",
      });
    }
  };

  const { isMobile, isDesktop } = useWindowSize();

  useEffect(() => {
    // Check if the ref has been assigned to an element
    if (highlightedElementRef.current) {
      // Scroll the window to the highlighted element
      console.log("scrolling");
      highlightedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block:  isMobile ? "center" : "start",
      });
    }
  }, [highlightedElementId, isMobile]); // Run the effect whenever the ID changes

  useEffect(() => {
    const id = search.get("id") as string;
    // console.log(id);
    if (id) setHighlightedElementId(decodeURIComponent(id).toLowerCase());
  }, [subServices, search]);

  async function addToCart(subService: DisplaySubServiceDTO) {
    if (session && session.user) {
      let current = [];
      if (!checkSubserviceAdded(subService)) {
        current = [...currentItems, subService];
      } else {
        current = currentItems.filter((item) => item.id !== subService.id);
      }
      setCurrentItems(current);

      if (existing) {
        updateCart(current);
      } else {
        addItemtoCart(current);
      }
    } else {
      const searchParams = new URLSearchParams();
      if (typeof window !== "undefined")
        searchParams.set("callbackUrl", window.location.href + "/");
      // console.log(searchParams.toString());
      router.push(`/api/auth/signin?${searchParams.toString()}`);
    }
  }

  async function updateCart(items: SubService[]) {
    setLoading(true);
    const body: UpdateServiceCartItemDTO = {
      userId: (session?.user as { id: string })?.id,
      description: `adding Service with addons ${""}`,
      addons: items.map((item) => ({ id: item.id })),
      cartItemId: cartItemId,
    };
    const res = await fetch(
      `/api/cart/services/${(session?.user as { id: string })?.id}`,
      { method: "PUT", body: JSON.stringify(body) },
    );
    setLoading(false);
  }

  async function addItemtoCart(items: SubService[]) {
    setLoading(true);

    const body = {
      serviceId,
      userId: (session?.user as { id: string })?.id,
      description: `adding Service with addons ${""}`,
      addons: items.map((item) => ({ id: item.id })),
    } as CreateServiceCartItemDTO;
    const res = await fetch(
      `/api/cart/services/${(session?.user as { id: string })?.id}`,
      { method: "POST", body: JSON.stringify(body) },
    );
    if (res.status === 200) {
      const { data } = await res.json();
      const cartItem = data as DisplayServiceCartItemDTO;
      setCartItemId(cartItem.id);
      setExisting(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `/api/cart/services/${(session?.user as { id: string })?.id}`,
      );
      const { data } = (await res.json()) as { data: DisplayServiceCartDTO };
      const { items } = data;
      if (items.length == 0) setExisting(false);
      for (let item of items) {
        if (item.serviceId === serviceId) {
          // console.log(item.addons);
          setExisting(true);
          setCartItemId(item.id);
          setCurrentItems(item.addons);
          break;
        }
      }

      setLoading(false);
    }

    if (session) {
      setLoading(true);
      fetchData();
    }
  }, [serviceId, session, session?.user]);

  function checkSubserviceAdded(subservice: SubService) {
    return currentItems.some((item) => item.id === subservice.id);
  }

  return (
    <>
      <div className="relative w-full  lg:p-5">
        <div className="my-10 w-full text-center text-4xl font-bold">
          Service Add-ons
        </div>

        <div className="flex flex-row flex-wrap lg:flex-nowrap lg:gap-3 gap-5 items-center justify-center">

          <div
            ref={SubServicesContainer}
            className="relative lg:order-2 mx-auto flex lg:flex-grow lg:w-auto w-full max-w-full snap-x overflow-x-auto scroll-smooth bg-purple-200 pb-10 scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-gray-400  scrollbar-thumb-rounded-md dark:bg-purple-600 dark:scrollbar-track-slate-600 "
          >
            <div className="relative flex w-fit flex-row justify-start gap-10 p-5 lg:px-10">
              {subServices.map((subService, index) => (
                <div
                  data-id={subService.id}
                  ref={
                    subService.title.trim().toLowerCase() === highlightedElementId
                      ? highlightedElementRef
                      : undefined
                  }
                  id={subService.title.trim().toLowerCase()}
                  key={index}
                  className={`relative flex w-[80vw] flex-col lg:w-[30vw] ${subService.title.trim().toLowerCase() === highlightedElementId
                    ? "bg-purple-500 dark:bg-purple-800"
                    : ""
                    } scoll-ml-3 snap-start gap-3 rounded-xl p-2 lg:p-8 ${checkSubserviceAdded(subService)
                      ? "bg-green-300"
                      : "bg-gray-100 dark:bg-gray-800"
                    }  mt-10 justify-center  border-4 border-[#AAC3F5] pb-10 text-center focus:bg-purple-500 lg:px-10`}
                >
                  <div className=" h-fit w-full  text-center lg:text-left">
                    <h3 className="text-lg font-semibold">{subService.title}</h3>
                  </div>
                  <div className=" line-clamp-5  text-center lg:text-left">
                    {subService.description}
                  </div>
                  {checkSubserviceAdded(subService) ? (
                    <div className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white">
                      <Check />
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(subService)}
                      className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full text-emerald-500 hover:text-emerald-600 hover:shadow-md"
                    >
                      <Plus />
                    </button>
                  )}
                  <Image
                    src={imageArray[getRandomIntWithSeed(index.toString(), 0, 2)]} // Replace with the actual profile image URL
                    alt={`${subService.title}-image`}
                    className=" col-span-2 w-full object-cover lg:col-span-1"
                    height={300}
                    width={300}
                  />
                  <div className="flex items-center justify-around gap-4 text-center align-middle">
                    <button
                      onClick={() => {
                        // console.log(subService);
                        setCurrentDisplay(subService);
                        setShowModal(true);
                      }}
                      type="button"
                      className={`mb-5 flex gap-x-3 ${subService.title.toLowerCase() === highlightedElementId
                        ? "text-blue-800"
                        : "text-blue-500 "
                        } `}
                    >
                      Learn more <MoveRight />
                    </button>
                    <button
                      onClick={() => addToCart(subService)}
                      className={`${checkSubserviceAdded(subService)
                        ? "hover:bg-red-400"
                        : "hover:bg-green-400"
                        } rounded-md p-3 hover:text-white hover:shadow`}
                      aria-label="add-to-cart"
                    >
                      {checkSubserviceAdded(subService) ? (
                        <Trash />
                      ) : (
                        <ShoppingCart />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="w-4 cursor-pointer text-gray-400  order-1 "
            onClick={() => prevSlide(SubServicesContainer)}
          >
            <ChevronLeft className="text-guru-blue" />
          </button>
          <button
            type="button"
            className="w-4 cursor-pointer text-gray-400 order-3 "
            onClick={() => nextSlide(SubServicesContainer)}
          >
            <ChevronRight className="text-guru-blue" />
          </button>
        </div>
        <div className="my-5 flex items-center justify-center">
          {currentItems.length > 0 && (
            <Link
              href={"/cart/services"}
              className="flex w-fit items-center justify-center gap-3 rounded-full bg-[#33D460] p-3 text-center text-white shadow-[0_10px_25px_0_#33D3D454]"
            >
              Buy now
            </Link>
          )}
        </div>


        {
          <Modal setShowModal={setShowModal} showModal={showModal}>
            <div className="container relative mx-auto flex flex-col items-center justify-center rounded-xl bg-gray-50 p-10 text-black shadow-lg dark:bg-gray-800 dark:text-gray-50 lg:w-[30vw]">
              <button
                className="absolute right-2 top-1 text-red-500"
                onClick={() => setShowModal(false)}
              >
                <X />
              </button>
              <div>Usage Score: {currentDisplay?.serviceUsageScore}/100</div>
              <div>
                Esitmated time for completion:{" "}
                {currentDisplay?.estimated_hours_times_one_hundred_percent} hrs
              </div>
              <div>Task Complexity: {currentDisplay?.complexity}/10</div>
              {currentDisplay && currentDisplay.CaseStudies?.length > 0 && (
                <>
                  <div>Case studies: </div>
                  <div className="flex flex-wrap gap-2">
                    {currentDisplay?.CaseStudies.map((caseStudy) => (
                      <CaseStudyCard
                        key={caseStudy.id}
                        id={caseStudy.id as  string}
                        title={caseStudy.title}
                        images={caseStudy.images as unknown as CaseImage[]}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </Modal>
        }

        {loading && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-100/20 backdrop-blur-md dark:bg-slate-600/20">
            <LoadingDots />
          </div>
        )}
      </div>
    </>
  );
}

export default SubServiceCarousel;
