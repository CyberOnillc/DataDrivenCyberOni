import ReviewCarousel from "@/components/ReviewCarousel";
import EmailLetter from "@/components/home/EmailLetter";
import { getGroup } from "@/crud/casestudy";
import { testimonials } from "@/data/testimonials";
import { Activity, Monitor, Redo, ShoppingCart, BlocksIcon, Blocks, LayoutGrid, Search, ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
async function Enterprise() {
    const ecommCases = await getGroup('ECOMMERCE', prisma) ;
    const landing= await getGroup('LANDING', prisma) ;
    const software = await getGroup('SOFTWARE', prisma) ;
    const graphics = await getGroup('GRAPHICS', prisma) ;
    return (

        <div className="w-full">
            <section className="w-full ">
                <div className="relative lg:h-[50vh] bg-enterprise-bg bg-no-repeat bg-[length:100vw_50vw] dark:bg-[#061122]">
                    <div className="flex flex-col justify-center items-center container mx-auto h-full ">
                        <div className=" relative text-6xl text-center leading-relaxed overflow-visible line-clamp-3 font-nunito font-bold w-screen lg:w-[800px]">
                            <Image className="absolute -z-10 w-full " src={'/enterprise-hero.png'} alt="enterprise-hero" height={300} width={900} />

                            <div className="z-20">
                                <p>Welcome to </p>
                                <span className="text-[#5380EA]">CyberOni</span>
                                <p>Technologies</p>
                            </div>
                        </div>

                        <div className="text-black dark:text-gray-100">
                            Are you facing difficulties with your Software?
                            Do you have a website but lack traffic?
                            No need to worry.
                        </div>

                        <div className="w-full flex justify-center items-center my-5">
                            <Link href={'#'} className="bg-[#0F172A] dark:bg-blue-600 text-white p-3 rounded-lg">Schedule a Demo</Link>
                        </div>

                    </div>
                </div>

                <div className="lg:h-1/2 container mx-auto my-5">
                    <div className="flex max-h-full p-3 gap-10 justify-around items-center text-center">
                        <div>
                            <Image src={'/project.png'} alt="icon" height={100} width={100}></Image>
                            <div>Projects</div>
                            <div>65+</div>
                        </div>
                        <div>
                            <Image src={'/client.png'} alt="icon" height={100} width={100}></Image>
                            <div>Clients</div>
                            <div>65+</div>
                        </div>
                        <div>
                            <Image src={'/experience.png'} alt="icon" height={100} width={100}></Image>
                            <div>Experience</div>
                            <div>65+</div>
                        </div>
                        <div>
                            <Image src={'/companies.png'} alt="icon" height={100} width={100}></Image>
                            <div>Companies</div>
                            <div>65+</div>
                        </div>

                    </div>

                    <div className="flex  items-center justify-center my-5">
                        <div className="text-center text-[#5380EA] text-3xl w-80">Thank you for your interest in us!</div>
                    </div>
                    <div className="flex flex-col font-bold font-nunito items-center justify-center my-5 text-5xl">
                        <p>Founded over 7 years ago, CyberOni</p>
                        <p>Technologies is now the main <span className="text-rose-600">Data Science</span></p>
                        <p>and<span className="text-rose-600"> web development</span> agency in Colorado.</p>
                    </div>
                    <div className="text-lg font-nunito font-semibold text-[#475569] px-5">
                        At Cyberoni, we blend advanced technology with strategic business insights to foster growth and prosperity for your brand. Our mission is to engineer bespoke digital solutions that aren&apos;t just effective but also resonate with your unique business identity. We are dedicated to nurturing your online presence so that it not only takes root but thrives and blossoms in the digital marketplace. Each solution is intricately designed with your business goals in mind, ensuring a personalized experience that promotes your site&apos;s growth and success.
                    </div>

                    <div className="flex flex-col items-center justify-center my-5 gap-5">
                        <div className="text-4xl font-nunito font-semibold">Cyberoni&apos;s Strategic Development Path</div>
                        <div className="mx-5 w-1/3 text-center">A four-part sequence, each representing a pivotal stage or element in the business strategy.</div>
                    </div>

                    <div className="w-full grid grid-cols-1 grid-rows-4 lg:grid-cols-4 lg:grid-rows-1 gap-3 text-center">
                        <div className="flex-1">
                            <Image src={'/step-1.png'} alt="border" className="object-contain w-full" height={300} width={300} />
                            <div className="flex flex-col gap-3">
                                <div className="text-[#E4A321] text-3xl">Initial Consultation</div>
                                <div className="w-2/3 mx-auto">Understand client needs and challenges.</div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <Image src={'/step-2.png'} alt="border" className=" object-contain w-full" height={300} width={300} />
                            <div className="flex flex-col gap-3">
                                <div className="text-[#E4A321] text-3xl">Solution Design</div>
                                <div className="w-2/3 mx-auto"> Cyberoni experts design a custom solution blueprint, focusing on scalability and integration with current systems.</div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <Image src={'/step-3.png'} alt="border" className="object-contain w-full" height={300} width={300} />
                            <div className="flex flex-col gap-3">
                                <div className="text-[#E4A321] text-3xl">Proof of Concept</div>
                                <div className="w-2/3 mx-auto"> Implement a pilot project using a subset of the client&apos;s data to demonstrate the effectiveness of the solution.</div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <Image src={'/step-4.png'} alt="border" className="object-contain w-full" height={300} width={300} />
                            <div className="flex flex-col gap-3">
                                <div className="text-[#E4A321] text-3xl">System Integration</div>
                                <div className="w-2/3 mx-auto">Use APIs, middleware, or custom development to connect Cyberoni&apos;s software with existing databases, CRM, ERP, or other software systems.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-[#EBF0FF] dark:bg-[#121212] py-10">
                <div className="container mx-auto flex flex-col lg:flex-row gap-5 p-5">
                    <div className="lg:w-1/2">
                        <div className="font-bold text-[#2478FE] text-2xl">Service we Offer</div>
                        <div className="text-4xl font-extrabold font-nunito">Cyberoni is committed to forging genuine partnerships, delivering exceptional value in every investment. Our expertise spans multiple domains, including but not limited to:</div>
                    </div>
                    <div className="lg:w-1/2 container overflow-x-auto ">
                        <div className="grid  lg:grid-cols-2 lg:grid-rows-2  gap-5 w-fit">
                            <div className="relative p-5 overflow-hidden h-fit lg:h-52  rounded-xl hover:bg-[#0F172A] bg-gray-100 text-black hover:text-white">
                                <div className="absolute top-0 right-0 w-full h-3 bg-blue-400"></div>
                                <div className="w-full flex justify-start">
                                    <Monitor />
                                </div>
                                <div className="font-bold text-2xl">Web Design & Web Development</div>
                                <div className="flex justify-end w-full">
                                    <Link className=" bg-blue-400 rounded-sm shadow-md p-3" href={'/services/web-development'}>
                                        <Redo />
                                    </Link>
                                </div>
                            </div>
                            <div className="relative p-5 overflow-hidden h-fit lg:h-52  rounded-xl hover:bg-[#0F172A] bg-gray-100 text-black hover:text-white">
                                <div className="absolute top-0 right-0 w-full h-3 bg-blue-400"></div>
                                <div className="w-full flex justify-start">
                                    <ShoppingCart />
                                </div>
                                <div className="font-bold text-2xl">E-commerce Solutions</div>
                                <div className="flex justify-end w-full">
                                    <Link className=" bg-blue-400 rounded-sm shadow-md p-3" href={'/services/web-development'}>
                                        <Redo />
                                    </Link>
                                </div>
                            </div>
                            <div className="relative p-5 overflow-hidden h-fit lg:h-52  rounded-xl hover:bg-[#0F172A] bg-gray-100 text-black hover:text-white">
                                <div className="absolute top-0 right-0 w-full h-3 bg-blue-400"></div>
                                <div className="w-full flex justify-start">
                                    <LayoutGrid />
                                </div>
                                <div className="font-bold text-2xl">Customized application development</div>
                                <div className="flex justify-end w-full">
                                    <Link className=" bg-blue-400 rounded-sm shadow-md p-3" href={'/services/web-development'}>
                                        <Redo />
                                    </Link>
                                </div>
                            </div>
                            <div className="relative p-5 overflow-hidden h-fit lg:h-52  rounded-xl hover:bg-[#0F172A] bg-gray-100 text-black hover:text-white">
                                <div className="absolute top-0 right-0 w-full h-3 bg-blue-400"></div>
                                <div className=" relative w-full flex justify-start">
                                    <Activity className="" />
                                </div>
                                <div className="font-bold text-2xl">Search Engine Optimization & Digital Marketing</div>
                                <div className="flex justify-end w-full">
                                    <Link className=" bg-blue-400 rounded-sm shadow-md p-3" href={'/services/web-development'}>
                                        <Redo />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section className="bg-enterprise-bg-2 bg-no-repeat bg-cover dark:bg-[#061122]  backdrop-blur-lg lg:min-h-screen py-10">
                <div className="container mx-auto">
                    <div className="text-center">
                        <div className="font-bold text-[#5380EA]">Why choose us</div>
                        <div className="font-bold text-4xl">Why Select Cyberoni for Your Development Projects?</div>
                        <div className="">Unlock the full potential of your online presence with Cyberoni. We&apos;re committed to excellence, continuously enhancing our methods and tools to ensure your web development experience is second to none.</div>
                    </div>

                    <div className="flex flex-wrap mt-20 gap-5 justify-center container">

                        <div className="flex justify-center items-center p-3 flex-col gap-2 bg-gray-200 rounded-lg text-black lg:w-1/4 shadow-md">
                            <Image src={'/team.png'} alt="brain" height={50} width={50}   ></Image>
                            <div className="font-bold text-2xl">Experience</div>
                            <div className="text-zinc-800 text-base">With Cyberoni, you gain access to a wealth of professional web development experience. We stay at the forefront of technology and trends to ensure that your project not only meets but exceeds industry standards. Our goal is to transform your vision into a digital reality, delivering a project that is not just complete but ahead of its time. Our team’s dedication to growth ensures your website will always be on the cutting edge.</div>
                        </div>
                        <div className=" flex justify-center items-center p-3 flex-col gap-2 bg-gray-200 rounded-lg text-black lg:w-1/4 shadow-md">
                            <Image src={'/brain.png'} alt="brain" height={50} width={50}   ></Image>
                            <div className="font-bold text-2xl">Committed Team</div>
                            <div className="text-zinc-800 text-base">Our team is the heart of Cyberoni. We are a group of driven, tech-savvy professionals, dedicated to delivering only the best. We understand that our success is measured by the success of your website. That’s why we immerse ourselves in every project, applying meticulous attention to detail to create websites that are not just functional but also thrive in today’s digital landscape.</div>
                        </div>
                        <div className=" flex justify-center items-center p-3 flex-col gap-2 bg-gray-200 rounded-lg text-black lg:w-1/4 shadow-md">
                            <Image src={'/stopwatch.png'} alt="brain" height={50} width={50}   ></Image>
                            <div className="font-bold text-2xl">Efficient Delivery</div>
                            <div className="text-zinc-800 text-base">At Cyberoni, we value your time. That&apos;s why we are committed to delivering high-quality, fully-tested websites promptly. We understand the pace of business and strive to provide you with fast turnaround times without compromising on quality. From initial concept to final launch, we streamline our development process to get your project live, allowing you to start meeting your business objectives faster.</div>

                        </div>
                        <div className=" flex justify-center items-center p-3 flex-col gap-2 bg-gray-200 rounded-lg text-black lg:w-1/4 shadow-md">

                            <Image src={'/price-tag.png'} alt="brain" height={50} width={50}   ></Image>
                            <div className="font-bold text-2xl">Fair Pricing</div>
                            <div className="text-zinc-800 text-base">We believe in offering outstanding value without hidden costs. Cyberoni provides competitive pricing structures that cater to businesses of all sizes. While maintaining high-quality standards, we ensure that your investment in your website is transparent and yields tangible results. Partner with us for cost-effective solutions that don&apos;t sacrifice quality.</div>


                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10">
                <div className="text-center flex justify-center items-center flex-col flex-1 w-fit mx-auto">
                    <div className="text-4xl font-nunito font-bold">Our Portfolio</div>
                    <Image className="object-cover flex-1 w-full" src={'/portfolio-underline.png'} alt="underline" height={50} width={200}></Image>
                </div>

                <div className="flex flex-col lg:flex-row lg:justify-start  justify-center lg:my-20 my-10">
                    <div className="flex justify-center lg:gap-10 lg:justify-start lg:flex-col lg:w-1/3 text-right lg:text-4xl lg:px-10">
                        <div className="foc:text-[#5380EA] cursor-pointer hover:underline  flex justify-center items-center gap-2"><button className="peer focus:text-[#5380EA]">Ecommere Website</button> <MoveRight className="h-full w-10 hidden lg:peer-focus:block peer-focus:text-[#5380EA]" /></div>
                        <div className="focus:text-[#5380EA] cursor-pointer hover:underline  flex justify-center items-center gap-2"><button className="peer focus:text-[#5380EA]">Landing Pages</button> <MoveRight className="h-full w-10 hidden lg:peer-focus:block peer-focus:text-[#5380EA] " /></div>
                        <div className="focus:text-[#5380EA] cursor-pointer hover:underline  flex justify-center items-center gap-2"><button className="peer focus:text-[#5380EA]">Software Architecture</button> <MoveRight className="h-full w-10 hidden lg:peer-focus:block peer-focus:text-[#5380EA] " /></div>
                        <div className="focus:text-[#5380EA] cursor-pointer hover:underline  flex justify-center items-center gap-2"><button className="peer focus:text-[#5380EA]">Graphic design</button> <MoveRight className="h-full w-10 hidden lg:peer-focus:block  peer-focus:text-[#5380EA]" /></div>
                    </div>
                    <div className="flex flex-wrap w-full ">
                        {(new Array(16).fill(1)).map((value, index) => {
                            return <div key={index} className={`rounded-2xl aspect-square  w-1/2 p-3 overflow-hidden lg:w-1/4`}>
                                <Link className="w-full h-full " href={'/casestudy/100'}>
                                    <Image className="rounded-lg" src={`https://picsum.photos/200?random=${index}`} alt="" height={400} width={400} />
                                </Link>
                            </div>
                        })}
                    </div>

                </div>
            </section>

            <section className="py-10 bg-enterprise-bg-3 bg-no-repeat bg-cover lg:bg-[length:100vw_60vw] dark:bg-[#061122]">
                <div className="font-bold text-4xl text-center">Testimonial</div>
                <ReviewCarousel reviews={testimonials} />
            </section>

            <section className="container mx-auto my-10">
                <EmailLetter></EmailLetter>
            </section>


        </div>);
}

export default Enterprise;