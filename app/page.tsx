import Image from "next/image";
import Section, { SectionProps } from "@/components/home/HomeSection";
import CompanyCarousel, { Company } from "@/components/home/CompanyCarousel";
import SlideShow from "@/components/home/SlideShow";
import Slide from "@/components/home/Slide";
import ContactForm from "@/components/ContactForm";
import EmailLetter from "@/components/home/EmailLetter";
import CalendlyPopup from "@/components/Calendly";
import {
  companies,
  homeSections,
  mainHero,
  sildes,
} from "@/data/homeData";
import Link from "next/link";
import HeroAnimation from "@/components/home/HeroAnimation";
import { Suspense } from "react";

import SoftwareSection from "@/components/home/SoftwareSection";
import LoadingCarousel from "@/components/SoftwareProducts/LoadingCarousel";

export default function Home({ searchParams }: { searchParams?: { softwareCategoryId?: string | string[] } }) {

  return (
    <>
      <div className="z-30 w-full dark:text-white lg:px-10">
        <section className="container relative mx-auto flex flex-col text-center lg:text-left">
          <div className="flex flex-col-reverse items-center justify-center lg:flex-row">
            <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start ">
              <div className="sm:text-3l m-3 w-fit bg-gradient-to-r from-[#00F0FF] via-[#5200FF]  to-[#FF2DF7] bg-clip-text text-5xl font-bold text-transparent ">
                {mainHero.title}
              </div>
              <div className="m-3 text-4xl font-bold">{mainHero.subTitle}</div>
              <div className="m-3 ">{mainHero.content}</div>
              <div className="mx-3 h-[1px] w-full bg-gradient-purple" />
              <div className="flex justify-center lg:justify-start">
                <div className="m-3 w-fit rounded-full bg-gradient-purple px-[0.1rem] py-[0.1rem]"
                >
                  <CalendlyPopup
                    CTAText="Schedule a consultation"
                    className="rounded-full bg-white p-[0.4rem] dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>

            <HeroAnimation />
          </div>
          <section className=" lg:grid grid-cols-2 grid-rows-2">
            <div className="my-10 flex flex-col items-center justify-center gap-5 lg:flex-row lg:col-span-1">
              <h2 className="font-kyiv text-3xl font-bold lg:w-[14em] lg:text-5xl">
                Choose one of our cutting—edge products
              </h2>

            </div>

            <Suspense fallback={<LoadingCarousel />}>
              <SoftwareSection categoryId={searchParams?.softwareCategoryId} />
            </Suspense>
          </section>
          <div className="container my-4">
            <CompanyCarousel cards={companies}></CompanyCarousel>
          </div>
        </section>

        {homeSections.slice(0, 2).map((item, index) => {
          return (
            <div key={index}>
              <Section
                title={item.title}
                subTitle={item.subTitle}
                content={item.content}
                image={item.image}
                imageFirst={item.imageFirst}
                key={index}
                linkTo={item.linkTo}
              ></Section>
            </div>
          );
        })}

        <section className="container mx-auto text-center text-white">
          <h2 className="  m-3 w-fit bg-gradient-purple bg-clip-text text-3xl font-bold text-transparent">
            Customer Reviews and Feedback
          </h2>
          <SlideShow
            slides={sildes.map((card, index) => {
              return (
                <div key={index}>
                  <Slide
                    image={card.image}
                    name={card.name}
                    content={card.content}
                    designation={card.designation}
                    key={index}
                  ></Slide>
                </div>
              );
            })}
          ></SlideShow>
          <div className="mt-8 flex justify-center">
            <Link
              href="/leaveAReview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
              aria-label="View our business"
            >
              View our Business
            </Link>
            &nbsp;|&nbsp;
            <Link
              href="/leaveAReview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
              aria-label="Write a Review"
            >
              Write a Review
            </Link>
          </div>
        </section>

        {homeSections.slice(2, 5).map((item, index) => {
          return (
            <div key={index}>
              <Section
                title={item.title}
                subTitle={item.subTitle}
                content={item.content}
                image={item.image}
                imageFirst={item.imageFirst}
                key={index}
                linkTo={item.linkTo}
              ></Section>
            </div>
          );
        })}

        <section className="container mx-auto my-10">
          <EmailLetter></EmailLetter>
        </section>

        <section className="conatiner flex flex-col-reverse items-center justify-center xl:flex-row xl:px-10">
          <div className="container w-full  xl:h-[35em] xl:w-1/2">
            <ContactForm></ContactForm>
          </div>
          <Image
            className="container flex  h-[20em] w-full items-center justify-center rounded-t-lg  object-cover md:h-[25em] xl:h-[32em] xl:w-1/2 xl:rounded-r-lg"
            src={"/images/contact-forms/contact-image-1.png"}
            alt="contact"
            height={650}
            width={450}
          ></Image>
        </section>
      </div>
    </>
  );
}
