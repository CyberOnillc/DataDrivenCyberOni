"use client";
import useWindowSize from "@/lib/hooks/use-window-size";
import { useAnimate, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useMemo } from "react";
export type SectionProps = {
  title: string;
  subTitle: string;
  content: ReactNode;
  linkTo: string;
  image: string;
  imageFirst?: boolean;
};

const Section = ({
  title,
  subTitle,
  content,
  image,
  linkTo,
  imageFirst = false,
}: SectionProps) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const { isDesktop } = useWindowSize()

  useEffect(() => {
    if (isInView) {
      // Animate in Y axis
      animate(
        scope.current,
        { y: ["-20px", "20px"] },
        {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        },
      );

      // Animate in X axis
      animate(
        scope.current,
        { x: ["-10px", "10px"] },
        {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        },
      );
    }
  }, [animate, isInView, scope]);

  // Determine the order of text and image based on the imageFirst prop

  const { orderClass, buttonAlignmentClass, textAlignmentClass } =
    useMemo(() => {
      const orderClass = imageFirst ? "lg:order-first " : "lg:order-";
      const buttonAlignmentClass = imageFirst ? "text-right" : "text-left";
      const textAlignmentClass = imageFirst
        ? "text-center lg:text-right"
        : "text-center lg:text-left";

      return {
        orderClass,
        buttonAlignmentClass,
        textAlignmentClass,
      };
    }, [imageFirst]);
  return (
    <section className={`my-5 lg:my-10  lg:py-2`}>
      <div
        className={`container mx-auto grid auto-rows-min grid-cols-1 grid-rows-[min-content_1fr_min-content] lg:grid-cols-2 lg:grid-rows-[min-content_1fr] `}
      >
        <div
          className={`h-fit bg-gradient-purple bg-clip-text p-3 text-4xl font-bold text-transparent lg:col-span-1 lg:px-7 ${textAlignmentClass}`}
        >
          {title}
        </div>
        {/* Image */}
        <div
          className={`container mx-auto flex flex-col items-center justify-center ${orderClass} lg:row-span-2 lg:flex lg:w-1/2 lg:items-center lg:justify-center`}
          //ref={scope} // Apply the ref here
        >
          <Image src={image} alt={image} height={500} width={500} />
        </div>
        {/* Text */}
        <div className={`px-7  ${textAlignmentClass}`}>
          <div className="pb-2 text-lg font-bold">{subTitle}</div>
          <div className="pb-2">{content}</div>
          <div className="h-[1px] bg-gradient-purple"></div>
          <div className="flex justify-center lg:justify-start">
            <div
              className={`m-3 rounded-full bg-gradient-purple bg-clip-padding px-[0.1rem] py-[0.1rem] hover:shadow-md dark:hover:shadow-[0_4px_10px_1px_#000000] ${buttonAlignmentClass}`}
            >
              <Link
                href={linkTo}
                className={`flex ${imageFirst ? "lg:flex-row-reverse" : "lg:flex-row"
                  } px-5 items-center justify-end rounded-full  bg-white p-[0.6rem] dark:bg-gray-900`}
              >
                Learn More{" "}
                <span className="m-0 mx-3 w-fit bg-gradient-purple bg-clip-text text-center align-middle text-xl text-transparent">
                  {!isDesktop ? <>&rarr;</> : imageFirst ? <>&larr;</> : <>&rarr;</>}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
