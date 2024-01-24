import UserPersonaCard from "@/components/casestudies/UserPersonaCard";
import { read } from "@/crud/casestudy";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { Image as UserImage } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";
import { extractUUID, stripFileExtension } from "@/lib/utils";


type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  
  
  
  
  export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const seoTitle = params.id
    const id = extractUUID(seoTitle)
    const caseStudy = await read(id, prisma)
  
    // optionally access and extend (rather than replace) parent metadata
    let metadata: Metadata = {};
    metadata.title = caseStudy?.title as string
    metadata.description = caseStudy?.preview
    metadata.openGraph = {
      type: 'article',
      title: caseStudy?.title,
      description: caseStudy?.preview,
      images: [caseStudy?.images ? caseStudy.images[0].src : ""]
    }
    metadata.twitter = {
      title: caseStudy?.title,
      images: [caseStudy?.images ? caseStudy.images[0].src : ""],
      description: caseStudy?.preview,
  
    }
    metadata.keywords = caseStudy?.title.split('')
    return metadata
  }
async function CaseStudy({ params }: { params: { id: string } }) {
    const seoTitle = params.id
    const id = extractUUID(seoTitle)
    const caseStudy = await read(id, prisma)

    return (

        <>
            <div className="relative container mx-auto mt-8 px-5 xl:px-16">
                <Image className="absolute right-0 top-0" src={'/images/case-study-icon-2.svg'} alt="icon-2" height={130} width={75} />

                {/* Section 1: Title */}
                <div className=" relative dark:bg-zinc-800 rounded-2xl shadow-lg p-5 mb-8 z-10">
                    <section className=" mb-8 ">
                        <h1 className="text-4xl font-bold text-[#7850CD]">{caseStudy.title}</h1>
                        <div>{caseStudy.preview}</div>
                    </section>
                    {/* Section 2: Description */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#7850CD]">Problem statement</h2>
                        <p className="mt-4">{caseStudy.problemStatement}</p>
                    </section>
                    <Image className="absolute -z-10 -translate-x-full  bottom-0 translate-y-10" src={'/images/case-study-icon-1.png'} alt="icon-1" height={130} width={75} />

                </div>
                <div className="flex justify-center items-center my-5 rounded-lg overflow-hidden">
                    {caseStudy.images[0] ? <Image className=" rounded-lg object-contain" src={caseStudy.images[0].src} alt={'casestudy-preview'} height={500} width={500} /> :
                        <Image className="rounded-lg object-contain" src={'/images/casestudy-1.png'} alt={'casestudy-1'} height={500} width={500} />
                    }
                </div>

                {/* Section 3: Project Goals */}
                <section className="relative dark:bg-zinc-800 rounded-2xl shadow-lg p-5 mb-8 z-50">
                    <h2 className="text-2xl font-bold text-center text-[#7850CD]">Project Goals</h2>
                    <ul className="flex gap-5 justify-center items-center mt-4">
                        {caseStudy.goals.map((goal, index) => <li key={index}>{goal}</li>)}
                    </ul>
                </section>

                {/* Section 4: User Problems */}
                <div className="relative">
                    <section className="relative dark:bg-zinc-800 rounded-2xl shadow-lg p-5 mb-8 z-50">
                        <h2 className="text-2xl font-bold text-[#7850CD]">Section 4: User Problems</h2>
                        <ul className="list-disc mt-4 p-5">
                            <li>Problem 1</li>
                            <li>Problem 2</li>
                            <li>Problem 3</li>
                        </ul>
                    </section>
                    <Image className="absolute z-0 translate-x-1/2 right-0 bottom-0 translate-y-10" src={'/images/case-study-icon-4.png'} alt="icon-4" height={130} width={75} />
                </div>


                {/* Section 5: Possible Solutions */}
                <section>
                    <h2 className="text-2xl font-bold text-[#7850CD] mb-10">Possible Solutions</h2>
                    <p>Based on the all the information collected through research and findings, I figured that an application will require following functionality to promote a healthy lifestyle </p>
                    <ul className="mt-4 flex gap-4 flex-col p-5">
                        {caseStudy.possibleSolutions.map((solution, index) => {
                            return <li key={index} className="shadow-inner dark:bg-gray-800 p-4 rounded-lg odd:self-start even:self-end max-w-[66%]">{solution}</li>

                        })}

                    </ul>
                </section>


                <section className="relative mb-8">
                    <div className="relative dark:bg-zinc-800 rounded-2xl shadow-lg p-5 mb-8 z-50">
                        <h2 className="text-2xl font-bold text-[#7850CD] mb-10">Understanding the Problem</h2>
                        <p>{caseStudy.userResearch}</p>
                    </div>
                    <Image className="absolute z-0 translate-x-1/2 right-0 bottom-0 translate-y-10" src={'/images/case-study-icon-4.png'} alt="icon-4" height={130} width={75} />

                </section>


                <div className=" relative dark:bg-zinc-800 rounded-2xl shadow-lg p-5 mb-8 z-10">
                    <section className=" mb-8 ">
                        <h1 className="text-4xl font-bold text-[#7850CD]">Primary Research</h1>
                        <div>{caseStudy.preview}</div>
                    </section>
                    {/* Section 2: Description */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-[#7850CD]">Customer</h2>
                        <p className="mt-4">In order to come up with solutions / features that will be helpful for users. I wanted to understand the psychology of the how someone forms a habit & effectively manage to work from home After gathering insights from interviews and discussion from people. I identified  the essentials of building a habit : </p>


                    </section>
                    <Image className="absolute -z-10 -translate-x-full  bottom-0 translate-y-10" src={'/images/case-study-icon-1.png'} alt="icon-1" height={130} width={75} />

                </div>

                <div className="flex justify-center items-center my-5 rounded-lg overflow-hidden">
                    {caseStudy.images[1] ? <Image className=" rounded-lg object-contain" src={caseStudy.images[0].src} alt={'casestudy-image-2'} height={500} width={500} /> :
                        <Image className="l rounded-lg object-contain" src={'/images/casestudy-2.png'} alt={'casestudy-2'} height={500} width={500} />
                    }
                </div>

                <section className="my-10">
                    <h1 className="text-4xl font-bold text-[#7850CD]">User Personas</h1>
                    {caseStudy.userPersonas.map((persona, index) => {

                        return <div key={index}>
                            <UserPersonaCard
                                {...persona}
                                image={persona.image as UserImage}

                            />
                        </div>
                    })}
                </section>
                <section className="mb-8 ">
                    <h2 className="text-[#7850CD]">User Research</h2>
                    <p>{caseStudy.userResearch}</p>
                </section>
                <section className="mb-8 ">
                    <h2 className="text-[#7850CD]">Competetive Analysis </h2>
                </section>
                <section className="mb-8 ">
                    <h2 className="text-[#7850CD]">Unique features</h2>
                    <p>{caseStudy.uniqueFeatures}</p>
                </section>

                <section className="mb-8 ">
                    {caseStudy.wireFrames && <>
                        <h2 className="text-[#7850CD]">Wireframes</h2>
                        <div className="flex gap-2 flex-wrap max-w-full">
                            {caseStudy.wireFrames.map((wireframe, index) => <Image key={index} src={wireframe.src} alt={`wireframe-${index}`} height={500} width={500} />)}</div>

                    </>}
                </section>
                <section className="mb-8 ">
                    {caseStudy.architecture && caseStudy.architecture?.length > 0 &&

                        <><div className="rounded-lg shadow-lg p-10 text-center ">
                            <h2 className="text-[#7850CD]">Information Architecture </h2>
                            <p className="text-left font-semibold">To get innovative solutions into the hands of your users, I needed to concentrate on idea generation.  Based on my understanding of the problem, I brainstormed the Information architecture and user flow to ensure smooth experience for the users. </p>
                        </div>
                            <Image src={caseStudy.architecture[0].src} alt={"architecture"} height={500} width={500} />

                        </>}
                </section>
                <section className="mb-8 ">
                    {caseStudy.hifiDesign && <>
                        <h2 className="text-[#7850CD]">Hi-Fi Designs</h2>

                        <div className="flex gap-2 flex-wrap max-w-full">
                            {caseStudy.hifiDesign.map((image, index) => <div key={index} className="flex flex-col justify-center items-center" >
                                <Image src={image.src} alt={stripFileExtension(image.name || `hifi-design-${index}`) as string} height={500} width={500} />
                                <div className="font-bold"># {stripFileExtension(image.name as string)}</div>
                            </div>)}
                        </div>
                    </>}
                </section>

                <section className="relative mb-8 bg-[radial-gradient(closest-side_at_0_0,#744ACC_90%,#744ACCE5_100%)] flex flex-col justify-center items-center overflow-hidden">
                    <Image className="object-contain" src={'/images/casestudy-3.png'} alt="casestudy-3" height={300} width={300} />
                    <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-2/3 aspect-square h-full rounded-full  bg-gradient-to-b from-[#7850cd00] to-[#9D6FFF] z-0"></div>
                    <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-2/3 aspect-square h-full rounded-full  bg-gradient-to-t from-[#7850cd0b] to-[#9D6FFF] z-0"></div>
                    <div className="text-white p-10 z-10">
                        <h2 className="text-3xl">Key Learnings</h2>
                        <p className="text-lg">{caseStudy.keyLearning}</p>
                    </div>
                </section>
            </div>



        </>
    );
}

export default CaseStudy;