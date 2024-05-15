import ReviewCarousel from "@/components/ReviewCarousel";
import ServiceCard from "@/components/services/ServiceCard";
import { DisplayServiceDTO, getAll, read } from "@/crud/service";
import prisma from "@/lib/prisma";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import FloatingImageSection from "@/components/shared/floating-long";
import Faqs from "@/components/Faqs";
import PayLater from "@/components/shared/Paylater";
import { Image as CaseImage, Image as ServiceImage, SubService } from "@prisma/client";
import Link from "next/link";
import EmailLetter from "@/components/home/EmailLetter";
import SubServiceCarousel from "@/components/services/SubServiceCarousel";
import { LandPlot, Medal, Route, ScanText, Target, TestTubes } from "lucide-react";
import AccordionItem from "@/components/services/AccordianItem";
import ServiceFeatures from "@/components/services/ServiceFeatures";
import { redirect } from "next/navigation";
import { extractUUID, seoUrl } from "@/lib/utils";
import { Service, WithContext } from "schema-dts";
import { serviceReviews } from "@/data/testimonials";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuthAdapter";
import CaseStudyCard from "@/components/services/CaseStudyCard";
import { DisplaySubServiceDTO } from "@/crud/DTOs";
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}




export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const seoTitle = params.id
  const id = extractUUID(seoTitle)
  const service = await read(id, prisma);

  // optionally access and extend (rather than replace) parent metadata
  let metadata: Metadata = {};
  if (service) {
    metadata.title = service?.title as string
    metadata.description = service?.previewContent
    metadata.openGraph = {
      type: 'article',
      title: service?.title,
      description: service?.previewContent,
      images: [service.image?.src as string]

    }
    metadata.twitter = {
      title: service?.title,
      images: [service.image?.src as string],
      description: service?.previewContent,

    }
    metadata.category = service?.tags.join(" ")
    metadata.keywords = service?.tags?.map(tag => tag.name)
  }
  return metadata
}
async function Services({ params }: { params: { id: string } }) {
  const seoTitle = params.id
  const id = extractUUID(seoTitle)
  const service = await read(id, prisma) as DisplayServiceDTO
  const services = await getAll(1, 10, prisma);

  if (!service) redirect('/404');

  const jsonLd: WithContext<Service> = {
    "@context": 'https://schema.org',
    "@type": 'Service',
    "@id": id,
    description: service.previewContent,
    name: service.title,
    image: {
      "@type": 'ImageObject',
      url: service.image?.src

    }
  }

  const session = await getServerSession(authOptions)

  return (
    <div className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-wrap">
        {services.records.slice(0, 4).map((service, index) => (
          <div key={index} className="p-5 lg:w-1/4 flex-1">
            <ServiceCard
              id={service.id}
              image={service.image as ServiceImage}
              previewContent={service.previewContent}
              title={service.title}
            />
          </div>
        ))}
      </div>

      <section id="description" className="py-5  font-nunito container mx-auto lg:px-5">
        <div className="text-center text-6xl font-bold">{service.title}</div>
        {service.ServiceDescription?.map((section, index) => (
          <FloatingImageSection key={index} section={section} />
        ))}
      </section>

      <section className="my-5 font-nunito"></section>

      <section className="my-5 font-nunito">
        <div className="text-center font-nunito text-4xl font-semibold">
          Feedback from our clients
        </div>
        <div className="text-center text-lg font-light">
          Our WORK speaks louder than our WORD. Find out how we helped clients
          overcome challenges and succeed.
        </div>
        <ReviewCarousel
          reviews={serviceReviews}
        />
      </section>

      {service.SubServices && service.SubServices.length > 0 && (
        <section className="my-5 font-nunito">
          <SubServiceCarousel
            subServices={service.SubServices as DisplaySubServiceDTO[]}
            session={session}
          />
        </section>
      )}
      {service.CaseStudies && service.CaseStudies.length > 0 ? (
        <section className="my-5 font-nunito">
          <div className="text-center text-4xl font-bold">Portfolio</div>

          <div className="container mx-auto my-5 flex flex-wrap gap-2 lg:gap-5 px-5"
          >            {service.CaseStudies?.map((caseStudy, index) => (
            <CaseStudyCard key={index}
              images={caseStudy.images  as unknown as CaseImage[]}
              id={caseStudy.id}
              title={caseStudy.title} />
          ))}
          </div>
        </section>
      ) : (
        <></>
      )}
      <section className="my-5 font-nunito">
        <div className="text-center text-4xl font-bold">
          Frequently Asked Questions
        </div>

        <Faqs faqs={faqs} />
      </section>
      <section className="container mx-auto my-10 px-10">
        <EmailLetter></EmailLetter>
      </section>
      <section className="flex items-center justify-center">
        <PayLater type="service" value={service.valueBrought as string[]} />
      </section>
    </div>
  );
}

const faqs = [
  {
    question: 'What is React ?',
    answer: 'React is a JavaScript library for building user interfaces.',
  },
  {
    question: 'How to install React ?',
    answer: 'You can install React using npm or yarn.',
  },
  // Add more FAQs as needed
];

const serviceFeatures = [
  {
    title: "Attention to Details",
    content: "Lorem ipsum",
    icon: <Route />
  },
  {
    title: "A Plan for Success",
    content: "You want results. We have found that the best way to get them is with up front research – of your company, competitors, target market and customer psychographics. Only after we fully understand you and your customers, do we recommend a plan of attack.",
    icon: <LandPlot />
  },
  {
    title: "Experts Only",
    content: "Lorem ipsum",
    icon: <TestTubes />
  },
  {
    title: "Meeting Deadlines",
    content: "Lorem ipsum",
    icon: <Target />
  },
  {
    title: "Award-Winning",
    content: "Lorem ipsum",
    icon: <Medal />
  },

]
export default Services;