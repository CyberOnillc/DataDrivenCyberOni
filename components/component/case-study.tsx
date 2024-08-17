/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/tSwGE6ZDj9u
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Work_Sans } from 'next/font/google'
import { Arimo } from 'next/font/google'

work_sans({
  subsets: ['latin'],
  display: 'swap',
})

arimo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SVGProps } from "react";
import Image from "next/image";
import {
  CreateCaseStudyDTO,
  CreateImageDTO,
  DisplayCaseStudy,
  UserPersona,
} from "@/crud/DTOs";
import ProgressBar from "../blogs/BlogReadProgess";
import UserPersonaCard from "../casestudies/UserPersonaCard";
import { Image as DBImage } from "@prisma/client";

export function CaseStudy({ caseStudy }: { caseStudy: CreateCaseStudyDTO }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {caseStudy.title}
                </h1>
                <p className="text-muted-foreground max-w-[600px] md:text-xl">
                  {caseStudy.preview}
                </p>
                <Link
                  href="#start"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Read Case Study
                </Link>
              </div>
            </div>
            <Image
              src={
                caseStudy.images && caseStudy.images.length > 1
                  ? caseStudy.images[0].src
                  : "/placeholder.svg"
              }
              width={550}
              height={550}
              alt="Hero"
              placeholder="blur"
              blurDataURL="/placeholder.svg"
              className="mx-auto rounded-xl object-cover sm:w-full lg:order-last"
            />

          </div>
        </div>
      </section>
      <section id="start" className="bg-muted w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                The Problem
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {caseStudy.problemStatement?.title ?? "Problem Statement"}
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {caseStudy.problemStatement?.statement ?? "Problem Statement"}
              </p>
            </div>
            <div>
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                The Solution
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {caseStudy.possibleSolutions?.title ??
                  "Cyber Shop Product to the Rescue"}
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {caseStudy.possibleSolutions?.solution ?? "Solution Statement"}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {caseStudy.uniqueFeatures?.title ??
                  "Transforming Business Processes"}
              </h2>
              <ul className="grid gap-2 py-4">
                {caseStudy.uniqueFeatures?.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckIcon className="text-primary h-4 w-4" />
                    {feature}
                  </li>
                )) ?? "No Key Features"}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              User Stories
            </h2>
            {caseStudy.userPersonas &&
              (caseStudy.userPersonas as unknown as UserPersona[]).length >
              0 && (
                <div className="container mx-auto px-4 md:px-6">
                  {(caseStudy.userPersonas as unknown as UserPersona[]).map(
                    (user, index) => (
                      <UserPersonaCard
                        key={index}
                        image={user.image as DBImage}
                        {...(user as UserPersona)}
                      />
                    ),
                  )}
                </div>
              )}
          </div>
        </div>
      </section>
      <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                Results
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {caseStudy.results?.title ?? "Measurable Impact"}
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {caseStudy.results?.description ?? ""}
              </p>
              <div className="grid grid-cols-2 gap-4 py-6">
                {caseStudy.results?.result?.map((result, index) => (
                  <Card key={index} className="bg-background p-4 shadow-sm">
                    <CardHeader>
                      <CardTitle>{result.improvement}</CardTitle>
                      <CardDescription>{result.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )) ?? null}
              </div>
            </div>
            <div className="flex items-center justify-center rounded-md shadow-sm">
              <Image
                className="rounded-md shadow-sm"
                src={caseStudy.results?.image?.src ?? "/images/casestudy-2.png"}
                placeholder="blur"
                blurDataURL="/placeholder.svg"
                alt="result-image"
                width={720}
                height={900}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                Competitor Analysis
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {caseStudy.competitorAnalysis?.title ??
                  "Analyzing the Competition"}
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {caseStudy.competitorAnalysis?.analysis ??
                  "Analyzing the Competition"}
              </p>
            </div>
            <div>
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                Goals
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {caseStudy.goals?.title ?? "Defining the Objectives"}
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {caseStudy.goals?.goals ?? "Defining the Objectives"}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                Primary Research
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {caseStudy.primaryResearch?.title ??
                  "Understanding the User Needs"}
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {caseStudy.primaryResearch?.research ??
                  "Understanding the User Needs"}
              </p>
            </div>
            <div>
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                User Research
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {caseStudy.userResearch?.title ?? " user Research"}
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {caseStudy.userResearch?.research ?? "User Research"}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                Key Learnings
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {caseStudy.keyLearning?.title ?? "Insights and Takeaways"}
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {caseStudy.keyLearning?.learning ?? "Key Learnings"}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Image
                className="rounded-md shadow-sm"
                src={caseStudy.keyLearning?.image?.src ?? "/images/casestudy-3.png"}
                placeholder="blur"
                blurDataURL="/placeholder.svg"
                alt="Key Learnings"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full border-t py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-4">
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                Ready to Transform?
              </div>
              <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Experience the Power of Cybershoptech Products
              </h2>
              <Link
                href="#"
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Get a Demo
              </Link>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                Contact Us
              </div>
              <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed">
                Our team is ready to help you transform your business with
                Cybershoptech Product. Get in touch to learn more.
              </p>
              <Link
                href="/contact"
                className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
