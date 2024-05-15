"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CategoryChip from "./CategroryChip";
import SoftwareCard from "./SoftwareCard";

function SoftwareCarousel({
  categories,
  softwareProducts,
}: {
  categories: { name: string }[];
  softwareProducts: {
    image: string;
    title: string;
    subTitle: string;
    pageLink?: string | null;
    codeLink?: string| null;
  }[];
}) {
  return (
      

      <div className="flex w-full px-10 ">
        <Carousel className="w-full ">
          {softwareProducts.length > 0?  <CarouselContent>
            {softwareProducts.map((product, index) => (
              <CarouselItem key={index} className="basis-auto">
                <SoftwareCard
                  image={product.image}
                  title={product.title}
                  subTitle={product.subTitle}
                  pageLink={product.pageLink}
                  codeLink={product.codeLink}
                />
              </CarouselItem>
            ))} 


          </CarouselContent>
            : <div className="text-gray-400 w-full text-center">No products Available</div>
          
          }

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
  );
}

export default SoftwareCarousel;
