"use client";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { ActivitySquare, AppWindow, BarChart, Book, BookCheck, Briefcase, CheckCircle, Cog, Cpu, FileStack, Fullscreen, Group, HeartHandshake, HelpCircle, Layers3, LifeBuoy, Lightbulb, Lock, MapPin, Megaphone, MoveRight, Newspaper, Phone, PieChart, PlusCircle, Repeat2, TerminalSquare, ThumbsUp, Users } from "lucide-react";
import { MegaMenuProps } from "../MegaMenu";
import { Blog, CaseStudy, Service } from "@prisma/client";
import { seoUrl } from "@/lib/utils";
import { LoadingDots } from "../shared/icons";



const UseMegaMenuData = ({ services, casestudies }: { services?: Blog[], casestudies?: CaseStudy[] }): Record<string, MegaMenuProps> => {
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    const [recentCaseStudies, setRecentCaseStudies] = useState<CaseStudy[]>([]);
    useEffect(() => {
        async function fetchCaseStudies() {
            const res = await fetch('/api/casestudies/recent')
            // console.log(res.status);
            if(res.status !== 200) return [];
            const { data } = await res.json()
            return (data as CaseStudy[]).slice(0, 3)

        }

        async function fetchBlogs() {
            const res = await fetch('/api/blogs/home')
            // console.log(res.status);
            if(res.status !== 200) return [];
            const { data } = await res.json()
            return (data.recent as Blog[]).slice(0, 3)

        }


        async function fetchData() {
            setRecentBlogs(await fetchBlogs());
            setRecentCaseStudies(await fetchCaseStudies());

        }

        fetchData();
    }, []);
    const aboutMenu: MegaMenuProps = [
        {
            type: "Links" as "Links",
            title: 'About us',

            links: [
                { href: '/casestudies', icon: <ThumbsUp className="text-gray-100 fill-blue-500" />, name: 'Customer Stories', subTitle: "Our customers have to say" },
                { href: '/hire-a-dev', icon: <HeartHandshake className="text-gray-100 fill-blue-500" />, name: 'Partners', subTitle: "Become a our partners" },
                { href: '/apply/full-stack', icon: <Briefcase className="text-gray-100 fill-blue-500" />, name: 'Careers', subTitle: "We’re always hiring!" },
                { href: '/blogs', icon: <Newspaper className="text-gray-100 fill-blue-500" />, name: 'Press and media', subTitle: "News and updates" },

                { href: '/contact', icon: <Phone className="text-gray-100 fill-blue-500" />, name: 'Contact Us', subTitle: "Get in touch with sales" },
            ]
        },
        {
            type: 'Node',
            node:
                <div>
                    <div className="text-gray-500 dark:gray-200">Our offices</div>
                    <div className="flex gap-5 py-2">
                        <div>
                            <Image src={'/images/about-1.png'} alt="location" height={300} width={400} className="rounded-3xl" />
                        </div>
                        <div className="flex justify-center flex-col">
                            <div className="font-bold">Serving customers across the globe</div>
                            <div className="flex gap-2"><MapPin className="fill-blue-700 text-white dark:text-slate-900" />Denver,Co</div>
                        </div>
                    </div>
                </div> as ReactNode
        }
    ];
    const enterpriseMenu: MegaMenuProps = [
        {
            type: "Links",
            title: "Resources",
            links: [
                {
                    href: "/blogs",
                    name: "Our Blogs",
                    subTitle: "Learn how to integrate",
                    icon: <Book className=" text-blue-700" />,
                },

                {
                    href: "/github",
                    name: "Developer Docs",
                    subTitle: "Learn how to integrate",
                    icon: <TerminalSquare className=" text-blue-700" />,
                },
                {
                    href: "/github",
                    name: "Help Center ",
                    subTitle: "All about how to use ",
                    icon: <LifeBuoy className="fill-blue-700 text-gray-50" />,
                },
                {
                    href: "/github",
                    name: "Product Updates",
                    subTitle: "Newest feature releases",
                    icon: <Megaphone className="fill-blue-700 text-gray-50" />,
                },
            ],
        },
        {
            type: "Links",
            title: "Best Practices",
            links: [
                {
                    href: "/github",
                    name: "FAQs",
                    subTitle: "Learn how to integrate",
                    icon: <HelpCircle className="fill-blue-700 text-gray-50" />,
                },
                {
                    href: "/casestudies",
                    name: "Case Studies",
                    subTitle: "All about how to use ",
                    icon: <BookCheck className="fill-blue-700 text-gray-50" />,
                },
                {
                    href: "/blogs",
                    name: "Engineering Blog ",
                    subTitle: "All about how to use ",
                    icon: <Cog className="fill-blue-700 text-gray-50" />,
                },

                {
                    href: "#",
                    name: "Webinars",
                    subTitle: "All about how to use ",
                    icon: <Book className="fill-blue-700 text-gray-50" />,
                },
            ],
        },
        {
            type: "Node",
            node: (
                <>
                    <div>
                        <div>
                            <div className="dark:gray-200 text-gray-500 my-2">Our Latest Blogs</div>
                            <Image
                                src={"/images/dash.png"}
                                alt="dash"
                                width={200}
                                height={200} />
                            <div className="flex flex-col gap-5 py-2">
                                {recentBlogs.length < 1 &&
                                    <div className="w-full flex justify-center items-center mt-5">
                                        <LoadingDots />
                                    </div>}
                                {recentBlogs.map((service) => (
                                    <AdditionalLink key={service.id} text={service.title} url={`/blogs/post/${seoUrl(service.title, service.id)} `} />))}
                            </div>
                            <Link className="flex  gap-4" href={"/blogs/bew"}>
                                See all <MoveRight />
                            </Link>
                        </div>
                    </div>
                </>
            ),
        },
    ];
    const solutionMenu: MegaMenuProps = [
        {
            type: "Links",
            title: "Business Solutions",
            links: [
                {
                    href: "/services/Digital-Marketing-7f580f52-b972-46ad-b5f8-35c209044ac1?id=Convert",
                    name: "Convert",
                    subTitle: "Analyze conversation",
                    icon: <Repeat2 className=" text-blue-700" />,
                },
                {
                    href: "/services/Digital-Marketing-7f580f52-b972-46ad-b5f8-35c209044ac1?id=Engage",
                    name: "Enage",
                    subTitle: "Measure active usage",
                    icon: <PlusCircle className="text-blue-700" />,
                },
                {
                    href: "/services/Digital-Marketing-7f580f52-b972-46ad-b5f8-35c209044ac1?id=Retain",
                    name: "Retain",
                    subTitle: "Find retentation drivers",
                    icon: <Fullscreen className="text-blue-700" />,
                },
                {
                    href: "/services/Digital-Marketing-7f580f52-b972-46ad-b5f8-35c209044ac1?id=Product Adoption",
                    name: "Product Adoption",
                    subTitle: "Maximize all customers",
                    icon: <Users className="text-blue-700" />,
                },
            ],
        },
        {
            type: "Node",
            node: (
                <>
                    <div>
                        <div className="dark:gray-200 text-gray-500">Recent Case Studies</div>
                        <div className="flex flex-col gap-5 py-2">
                            {recentCaseStudies.length < 1 &&
                                <div className="w-full flex justify-center items-center  mt-5">
                                    <LoadingDots />
                                </div>}
 
                           {recentCaseStudies.map((caseStudy) => (
                                <AdditionalLink key={caseStudy.id} text={caseStudy.title} url={`/casestudies/${seoUrl(caseStudy.title, caseStudy.id)} `} />))}
                        </div>
                        <Link className="flex  gap-4" href={"/casestudies"}>
                            See all <MoveRight />
                        </Link>
                    </div>
                </>
            ),
        },
    ];
    const productMenu: MegaMenuProps = [
        {
            type: "Links",
            title: "Powerful and Simple Analytics",
            links: [
                {
                    href: "/services/Web-devlopment-06cafb96-2fb8-41fb-b34c-137a154f5126?id=Interactive%20Reports",
                    name: "Interactive Reports",
                    subTitle: "Learn about your users",
                    icon: <BarChart className=" text-blue-700" />,
                },
                {
                    href: "/services/Web-devlopment-06cafb96-2fb8-41fb-b34c-137a154f5126?id=Team%20Dashboard",
                    name: "Team Dashboard & Alerts",
                    subTitle: "Monitor your metricse",
                    icon: <AppWindow className="text-blue-700" />,
                },
                {
                    href: "/services/Web-devlopment-06cafb96-2fb8-41fb-b34c-137a154f5126?id=Behavioral%20Analytics",
                    name: "Behavioral Analytics",
                    subTitle: "Real-time analytics user trends",
                    icon: <ActivitySquare className="text-blue-700" />,
                },
                {
                    href: "/services/Web-devlopment-06cafb96-2fb8-41fb-b34c-137a154f5126?id=Audience%20Segmentation",
                    name: "Audience Segmentation",
                    subTitle: "Segments with perfect target",
                    icon: <PieChart className="text-blue-700" />,
                },

                {
                    href: "/services/Web-devlopment-06cafb96-2fb8-41fb-b34c-137a154f5126?id=Group%20Analytics",
                    name: "Group Analytics",
                    subTitle: "Measure B2B account health",
                    icon: <Group className="text-blue-700" />,
                },
                {
                    href: "/services/Web-devlopment-06cafb96-2fb8-41fb-b34c-137a154f5126?id=Limitless%20Segmentation",
                    name: "Limitless Segmentation",
                    subTitle: "Surface hidden trends",
                    icon: <Layers3 className="text-blue-700" />,
                },
            ],
        },
        {
            type: "Links",
            title: "Tools for Trusted Data",
            links: [
                {
                    href: "/services/Web-devlopment-06cafb96-2fb8-41fb-b34c-137a154f5126?id=Data%20Integrations",
                    name: "Data Integrations",
                    subTitle: "Connect to your warehouse",
                    icon: <Cpu className=" text-blue-700" />,
                },
                {
                    href: "/services/Web-devlopment-06cafb96-2fb8-41fb-b34c-137a154f5126?id=Data%20Management",
                    name: "Data Management",
                    subTitle: "Keep data clean & usable",
                    icon: <FileStack className="text-blue-700" />,
                },
                {
                    href: "/services/Web-devlopment-06cafb96-2fb8-41fb-b34c-137a154f5126?id=Security%20%26%20Privacy",
                    name: "Security & Privacy",
                    subTitle: "Protect customer data",
                    icon: <Lock className="text-blue-700" />,
                },
            ],
        },
        
    ];


    return { aboutMenu, enterpriseMenu, solutionMenu, productMenu }

}




const AdditionalLink = ({ url, text }: { url: string, text: string }) => {

    return (
        <Link href={url}>
            <div className="flex gap-3">
                <Lightbulb className="text-blue-700" />
                {text}
            </div>
        </Link>

    )

}

export default UseMegaMenuData