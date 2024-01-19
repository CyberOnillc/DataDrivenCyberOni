
import Image from "next/image";
import Section, { SectionProps } from "@/components/home/HomeSection";
import CompanyCarousel, { Company } from "@/components/home/CompanyCarousel";
import SlideShow from "@/components/home/SlideShow";
import Slide from "@/components/home/Slide";
import ContactForm from "@/components/ContactForm";
import EmailLetter from "@/components/home/EmailLetter";
import CalendlyPopup from "@/components/Calendly";
import { companies, homeSections, sildes } from "@/data/homeData";
import Link from "next/link";
import VideoModal from "@/components/home/VideoModal";
export default async function Home() {
  return (
    <>
      <div className="z-30 w-full dark:text-white lg:px-10">
        <section className="container mx-auto flex flex-col text-center lg:text-left">
          <div className="flex flex-col-reverse items-center justify-center lg:flex-row">
            <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start ">
              <div className="sm:text-3l m-3 w-fit bg-gradient-to-r from-[#00F0FF] via-[#5200FF]  to-[#FF2DF7] bg-clip-text text-5xl font-bold text-transparent">
                With Ai
              </div>
              <div className="m-3 text-4xl font-bold">
                Revolutionize Your Business with Data-Driven Mastery: Transform,
                Automate, Personalize{" "}
              </div>
              <div className="m-3">
                Embark on an Data-Infused Journey to Redefine Your Businesses
                Success
              </div>
              <div className="mx-3 h-[1px] bg-gradient-purple w-full" />
              <div className="flex justify-center lg:justify-start">
                <div id="__next" className="m-3 flex justify-center items-center bg-gradient-purple w-fit rounded-full py-[0.1rem] px-[0.1rem]">
                  <CalendlyPopup CTAText="Schedule a consultation" className="bg-white dark:bg-gray-900 p-[0.6rem] rounded-full" />
                </div>
                <div
                  className={`m-3 w-fit rounded-full bg-gradient-purple px-[0.1rem] py-[0.1rem] hover:shadow-md dark:hover:shadow-[0_4px_10px_1px_#000000]`}
                >
                  <div
                    className="rounded-full bg-white p-[0.6rem] dark:bg-gray-900 "
                  >
                    <VideoModal text="Learn More" videoUrl="https://www.youtube.com/embed/oAUjdNnp0i8?si=AAE73oyrOXc7Ci_1" ></VideoModal>
                  </div>
                </div>
              </div>
            </div>
            <Image
              src={"/images/hero-1.png"}
              alt={"hero-1"}
              height={500}
              width={500}
            ></Image>
          </div>

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

        <section className="container mx-auto text-center">
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
              href="/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
              aria-label="View our business"
            >
              View our Business
            </Link>
            &nbsp;|&nbsp;
            <Link
              href="/google-business"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800"
              aria-label="View our business"
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

        <section className="conatiner flex flex-col-reverse lg:flex-row lg:px-10 justify-center items-center">
          <div className="lg:w-1/2">
            <ContactForm></ContactForm>
          </div>
          <div className="lg:w-1/2 h-[35rem] flex justify-center items-center">
            <Image
              className="flex-1 w-full h-full object-scale-down"
              src={"/images/contact-form.png"}
              alt="contact"
              height={1280}
              width={1200}
            ></Image>
          </div>
        </section>
      </div>
    </>
  );
}



