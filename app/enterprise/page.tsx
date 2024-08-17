import CalendlyPopup from "@/components/Calendly";
import ReviewCarousel from "@/components/ReviewCarousel";
import PortfolioCarousel from "@/components/enterprise/PortfolioCarousel";
import EmailLetter from "@/components/home/EmailLetter";
import { DisplayServiceDTO } from "@/crud/service";
import { testimonials } from "@/data/testimonials";
import prisma from "@/lib/prisma";
import {
  Activity,
  LayoutGrid,
  Monitor,
  Redo,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getFeatured } from "../../crud/service";
import ServiceCard from "@/components/enterprise/ServiceCard";
import FeatureCard from "@/components/enterprise/FeatureCard";
import { HowItWorksSteps, featureCards } from "@/data/enterpriseData";
import HowItWorks from "@/components/enterprise/HowItWorks";
import DevelopmentPathItem from "@/components/enterprise/DevelopmentPathItem";
async function Enterprise() {
  const services = await getFeatured(prisma);

  return (
    <div className="w-full">
      <section className="w-full ">
        <div className="relative bg-enterprise-bg bg-[length:100vw_50vw] bg-no-repeat lg:h-[50vh] dark:bg-[#061122]">
          <div className="container mx-auto flex h-full flex-col items-center justify-center ">
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div> {/* Overlay */}
            <Image
              className="absolute z-0 w-full object-cover h-full"
              src={"/images/enterprise-hero.png"}
              alt="enterprise-hero"
              layout="fill"
            />
            <div className="relative z-20 flex flex-col items-center justify-center text-center p-6">
              <p className="text-6xl font-bold leading-relaxed text-white drop-shadow-md"> {/* Add text shadow */}
                Welcome to
                <span className="text-[#5380EA]"> CyberOni</span>
                <br />
                Technologies
              </p>
              <p className="mt-4 text-lg text-white drop-shadow-md"> {/* Add text shadow */}
                Are you facing difficulties with your Software? Do you have a website but lack traffic? No need to worry.
              </p>
              <div id="__next" className="mt-6">
                <CalendlyPopup
                  className="rounded-lg bg-[#0F172A] p-3 text-white dark:bg-blue-600 hover:bg-[#1c2a3a]"
                  CTAText="Schedule A Consultation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto my-5 lg:h-1/2">
          <div className="flex max-h-full items-center justify-around gap-10 p-3 text-center">
            <div>
              <Image
                src={"/images/project.png"}
                alt="project"
                height={100}
                width={100}
              ></Image>
              <div>Projects</div>
              <div>65+</div>
            </div>
            <div>
              <Image
                src={"/images/client.png"}
                alt="client"
                height={100}
                width={100}
              ></Image>
              <div>Clients</div>
              <div>65+</div>
            </div>
            <div>
              <Image
                src={"/images/experience.png"}
                alt="exp"
                height={100}
                width={100}
              ></Image>
              <div>Experience</div>
              <div>65+</div>
            </div>
            <div>
              <Image
                src={"/images/companies.png"}
                alt="conmpany"
                height={100}
                width={100}
              ></Image>
              <div>Companies</div>
              <div>65+</div>
            </div>
          </div>

          <div className="my-5  flex items-center justify-center">
            <div className="w-80 text-center text-3xl text-[#5380EA]">
              Thank you for your interest in us!
            </div>
          </div>
          <div className="sm:text-3l my-5 flex flex-col items-center justify-center font-nunito text-5xl font-bold">
            <p>Founded over 7 years ago, CyberOni</p>
            <p>
              Technologies is now the main{" "}
              <span className="text-rose-600">Data Science</span>
            </p>
            <p>
              and<span className="text-rose-600"> web development</span> agency
              in Colorado.
            </p>
          </div>
          <div className="px-5 font-nunito text-lg font-semibold text-[#475569]">
            At Cyberoni, we blend advanced technology with strategic business
            insights to foster growth and prosperity for your brand. Our mission
            is to engineer bespoke digital solutions that aren&apos;t just
            effective but also resonate with your unique business identity. We
            are dedicated to nurturing your online presence so that it not only
            takes root but thrives and blossoms in the digital marketplace. Each
            solution is intricately designed with your business goals in mind,
            ensuring a personalized experience that promotes your site&apos;s
            growth and success.
          </div>

          <div className="my-5 flex flex-col items-center justify-center gap-5">
            <div className="text-center font-nunito text-4xl font-semibold">
              Cyberoni&apos;s Strategic Development Path
            </div>
            <div className="mx-5 w-1/3 text-center">
              A four-part sequence, each representing a pivotal stage or element
              in the business strategy.
            </div>
          </div>

          <div className="flex flex-col w-full gap-3 text-center lg:flex-row">
            <DevelopmentPathItem
              image="/images/step-1.png"
              name="Initial Consultation"
              content="Understand client needs and challenges." />
            <DevelopmentPathItem
              image="/images/step-2.png"
              name="Solution Design"
              content="Cyberoni experts design a custom solution blueprint, focusing on scalability and integration with current systems." />

            <DevelopmentPathItem
              image="/images/step-3.png"
              name="Proof of Concept"
              content="Implement a pilot project using a subset of the client's data to demonstrate the effectiveness of the solution." />

            <DevelopmentPathItem
              image="/images/step-4.png"
              name="System Integration"
              content="Use APIs, middleware, or custom development to connect Cyberoni's software with existing databases, CRM, ERP, or other software systems." />

          </div>
        </div>
      </section>

      <section className="bg-[#EBF0FF] py-10 dark:bg-[#121212]">
        <div className="container mx-auto  flex flex-col gap-5 p-5 lg:flex-row">
          <div className="text-center lg:w-1/2 lg:text-left">
            <div className="text-2xl font-bold text-[#2478FE]">
              Service we Offer
            </div>
            <div className="font-nunito text-4xl font-extrabold">
              Cyberoni is committed to forging genuine partnerships, delivering
              exceptional value in every investment. Our expertise spans
              multiple domains, including but not limited to:
            </div>
          </div>
          <div className="container overflow-x-auto lg:w-1/2 ">
            <div className="grid  w-fit gap-5  lg:grid-cols-2 lg:grid-rows-2">
              <ServiceCard title={'Web Design & Web Development'} icon={<Monitor />} link={"/services"} />
              <ServiceCard title={'Customized application development'} icon={<LayoutGrid />} link={"/services"} />
              <ServiceCard title={'E-commerce Solutions'} icon={<ShoppingCart />} link={"/services"} />
              <ServiceCard title={'Search Engine Optimization & Digital Marketing'} icon={<Activity />} link={"/services"} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-enterprise-bg-2 bg-cover bg-no-repeat py-10  backdrop-blur-lg dark:bg-[#061122]">
        <div className="container mx-auto px-4 ">
          <div className="text-center">
            <div className="font-bold text-[#5380EA]">Why choose us</div>
            <div className="text-4xl font-bold">
              Why Select Cyberoni for Your Development Projects?
            </div>
            <div className="">
              Unlock the full potential of your online presence with Cyberoni.
              We&apos;re committed to excellence, continuously enhancing our
              methods and tools to ensure your web development experience is
              second to none.
            </div>
          </div>

          <div className="container mt-20 flex flex-wrap justify-center  ">
            {featureCards.map((featureCard, index) => (
              <div key={index} className="p-3 lg:w-1/4">
                <FeatureCard
                  description={featureCard.description}
                  image={featureCard.image}
                  title={featureCard.title}
                />
              </div>))}
          </div>
        </div>
      </section>

      <section className="">

        <HowItWorks steps={HowItWorksSteps} />
      </section>
      <section className="py-10 max-w-full">
        <div className="mx-auto flex w-fit flex-1 flex-col items-center justify-center text-center">
          <div className="font-nunito text-4xl font-bold">Our Portfolio</div>
          <Image
            className="w-full flex-1 object-cover"
            src={"/images/portfolio-underline.png"}
            alt="underline"
            height={50}
            width={200}
          ></Image>
        </div>
        <PortfolioCarousel services={services as DisplayServiceDTO[]} />
      </section>

      <section className="bg-enterprise-bg-3 bg-cover bg-no-repeat py-10 lg:bg-[length:100vw_60vw] dark:bg-[#061122]">
        <div className="text-center text-4xl font-bold">Testimonial</div>
        <ReviewCarousel reviews={testimonials} />
      </section>

      <section className="container mx-auto my-10">
        <EmailLetter></EmailLetter>
      </section>
    </div>
  );
}

export default Enterprise;
