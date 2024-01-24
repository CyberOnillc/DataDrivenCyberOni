"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { ReactNode, useEffect, useState } from "react";
import { ActivitySquare, AppWindow, BarChart, Book, BookCheck, Briefcase, CheckCircle, ChevronDown, Cog, Cpu, FileStack, Fullscreen, Group, HeartHandshake, HelpCircle, Info, Layers3, LifeBuoy, Lightbulb, LineChart, Lock, MailQuestion, MapPin, Megaphone, Menu, Moon, MoveRight, Newspaper, Phone, PieChart, PlusCircle, Repeat2, Search, Sun, Terminal, TerminalSquare, ThumbsUp, Users } from "lucide-react";
import { setCookie } from 'cookies-next';
import MegaMenu, { MegamenuProps } from "../MegaMenu";

export default function NavBar({ session, darkMode }: { session: Session | null, darkMode: boolean }) {
  const scrolled = useScroll(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProductsDropdown = () => {
    setProductsDropdownOpen(!productsDropdownOpen);
  };

  const toggleExploreDropdown = () => {
    setExploreDropdownOpen(!exploreDropdownOpen);
  };


  return (
    <>
      <div
        className={`fixed top-0 w-screen flex justify-center ${scrolled
          ? "border-b border-gray-200 bg-white/10 backdrop-blur-xl"
          : "bg-white/0"
          } z-[100] transition-all xl:h-24 h-16`}
      >
        <div className=" flex items-center justify-between w-full text-black dark:text-white mx-5">

          <div className="relative">
            <Link href="/" className="flex items-center font-display text-2xl w-fit peer/logo">
              <Image
                src="/images/logo.png"
                alt="Precedent logo"
                width="30"
                height="30"
                className="rounded-sm"
              ></Image>
              <div>CyberOni</div>
            </Link>

          </div>


          <div className={` ${!mobileMenuOpen ? 'hidden' : 'flex absolute right-0 top-full h-screen w-screen max-h-screen overflow-y-auto pt-10 animate-slide-left-fade text-center z-[100] bg-white dark:bg-black py-10'}   gap-10   h-screen w-full flex-col items-center justify-start xl:pt-0 xl:static xl:flex xl:flex-row xl:gap-5 xl:justify-center xl:h-full xl:bg-inherit xl:w-fit group`}>

            <div className="relative xl:flex  justify-center items-center xl:h-full">
              <label htmlFor="product" className=" h-full flex flex-col justify-center items-center">
                <input
                  id="product"
                  type="checkbox"
                  className="peer/product  hidden absolute h-full"
                  disabled={!mobileMenuOpen}
                >
                </input>
                <div className=" hover:text-blue-500 hover:cursor-pointer">
                  Products
                  <ChevronDown className="text-blue-400 inline-block"></ChevronDown>
                </div>
                <div className="xl:absolute xl:left-auto xl:translate-x-48 z-50  transition-all duration-700   w-screen xl:top-20 xl:w-[700px] hidden peer-default/product :hidden peer-checked/product:block xl:peer-checked/product focus-visible:block xl:peer-focus/product:block xl:peer-hover/product:block  xl:hover:block">
                  <MegaMenu groups={productMenu} />
                </div>
              </label>
            </div>
            <div className="relative xl:flex justify-center items-center xl:h-full">
              <label htmlFor="solution" className="h-full flex flex-col justify-center items-center">
                <input
                  id="solution"
                  type="checkbox"
                  className=" peer/solution hidden absolute h-full"
                  disabled={!mobileMenuOpen}
                />
                <div className=" hover:text-blue-500 hover:cursor-pointer">
                  Solutions
                  <ChevronDown className="text-blue-400 inline-block"></ChevronDown>
                </div>
                <div className="xl:absolute xl:left-auto xl:translate-x-48 z-50 transition-all duration-700 w-screen xl:top-20 xl:w-[600px] hidden peer-default/solution:hidden peer-checked/solution:block xl:peer-checked/solution xl:peer-focus/solution:block xl:peer-hover/solution:block hover:block">
                  <MegaMenu groups={solutionMenu} />
                </div>
              </label>
            </div>
            <div className="relative xl:flex justify-center items-center xl:h-full">
              <label htmlFor="enterprise" className="h-full flex flex-col justify-center items-center">
                <input
                  id="enterprise"
                  type="checkbox"
                  className="md:focus:outline-none peer/enterprise hidden absolute h-full"
                  disabled={!mobileMenuOpen}

                />
                <div className="hover:text-blue-500 hover:cursor-pointer ">
                  Enterprise
                  <ChevronDown className="text-blue-400 inline-block"></ChevronDown>
                </div>
                <div className="xl:absolute xl:left-auto xl:translate-x-48 z-50 transition-all duration-700 w-screen xl:top-20 xl:w-[600px] hidden peer-default/enterprise:hidden peer-checked/enterprise:block xl:peer-checked/enterprise xl:peer-focus/enterprise:block xl:peer-hover/enterprise:block hover:block">
                  <MegaMenu groups={enterpriseMenu} />
                </div>
              </label>
            </div>

            <div className="relative xl:h-full">
              <button
                className=" peer/explore md:focus:outline-none hover:text-blue-500 xl:h-full "
              >
                Explore
                <ChevronDown className="text-blue-400 inline-block"></ChevronDown>
              </button>

            </div>
            <div className="relative xl:flex justify-center items-center xl:h-full">
              <div className="xl:h-full flex flex-col justify-center items-center">
                <Link href={'/market'} className="hover:text-blue-500 peer/market">
                  <div>
                    Marketplace
                    <ChevronDown className="text-blue-400 inline-block invisible w-0"></ChevronDown>

                  </div>
                </Link>
              </div>

            </div>
            <div className="relative xl:flex justify-center items-center xl:h-full">
              <div className=" xl:h-full flex flex-col justify-center items-center">
                <Link href={'/pricing'} className="hover:text-blue-500 peer/pricing">
                  <div>
                    Pricing
                    <ChevronDown className="text-blue-400 inline-block invisible w-0"></ChevronDown>
                  </div>
                </Link>
              </div>

            </div>
            <div className="relative xl:flex justify-center items-center xl:h-full">
              <label htmlFor="about" className="h-full flex flex-col justify-center items-center cursor-pointer">
                <input
                  id="about"
                  type="checkbox"
                  className="peer/about md:focus:outline-none hidden absolute h-full cursor-pointer"
                  disabled={!mobileMenuOpen}

                />
                <div className=" hover:text-blue-500 hover:cursor-pointer">
                  About
                  <ChevronDown className="text-blue-400 inline-block"></ChevronDown>
                </div>
                <div className="xl:absolute xl:-translate-x-48 transition-all duration-300 xl:top-20 xl:w-[600px] hidden peer-default/about:hidden peer-checked/about:block xl:peer-checked/about focus-visible:block xl:peer-focus/about:block xl:peer-hover/about:block hover:block">
                  <MegaMenu groups={aboutMenu} />
                </div>
              </label>
            </div>

            <Link href={'/api/auth/signin'} className="ring-[#9E9C9C] ring-2 dark:text-white px-4 py-2 rounded-lg hover:shadow-md flex  xl:hidden">Sign In</Link>
            <Link href={'/auth/signup'} className="ring-[#9E9C9C] ring-2 dark:text-white px-4 py-2 rounded-lg hover:shadow-md flex xl:hidden">Sign Up</Link>
            <ToggleDarkMode enabled={darkMode} className={'flex xl:hidden justify-center items-center'} />

          </div>
          <div className=" items-center justify-center flex gap-3 p-3">
            <div className="relative block">
              <form action="/search" method="GET">
                <input
                  type="number"
                  name='page'
                  defaultValue={1}
                  hidden
                  className="dark:bg-[#272F43] text-white rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 xl:w-38"
                />
                <input
                  type="text"
                  name='q'
                  placeholder="Search"
                  className="dark:bg-[#272F43] text-gray-950 dark:text-white rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 xl:w-38"
                />
                <button aria-label="search button"  type="submit" role="search" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Search />
                </button>
              </form>
            </div>
            {session ? <><UserDropdown session={session} /></> :
              <><Link href={'/api/auth/signin'} className="ring-[#9E9C9C] ring-2 hover:ring-blue-400 hover:text-blue-500 dark:text-white px-4 py-1 rounded-lg hover:shadow-md hidden xl:flex  min-w-fit">Sign In</Link>
                <Link href={'/auth/signup'} className="ring-[#9E9C9C] ring-2 hover:ring-blue-400 hover:text-blue-500 dark:text-white px-4 py-1 rounded-lg hover:shadow-md hidden xl:flex min-w-fit">Sign Up</Link></>}
            <ToggleDarkMode enabled={darkMode} className={'hidden xl:flex'} />
          </div>

          <div className="block xl:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Navigation Options"
              className="peer/nav z-50"
            >
              <Menu></Menu>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}


function ToggleDarkMode({ enabled, className }: { enabled: boolean, className?: string }) {
  const [isToggled, setIsToggled] = useState(enabled);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {

      const root = document.getElementsByTagName('body')[0];
      if (isToggled) {

        setCookie('theme', 'dark');
        root.classList.add('dark');
        window.dispatchEvent(new CustomEvent("theme", { detail: { 'theme': 'dark' } }));
      }
      else {
        // cookies().set('theme', 'light');
        setCookie('theme', 'light')
        window.dispatchEvent(new CustomEvent("theme", { detail: { 'theme': 'light' } }));
        root.classList.remove('dark');
      }

    }


  }, [isToggled]);

  return (
    <div className={"container flex justify-center items-center  xl:mx-auto xl:w-12 " + className}>
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="hidden"
            checked={isToggled}
            onChange={handleToggle}
          />
          <div className=" w-12 h-6 bg-gray-400 rounded-full shadow-inner"></div>
          <div
            className={`absolute w-6 h-6  flex justify-center items-center rounded-full shadow inset-y-0 left-0 transition-transform duration-100 ease-in  ${isToggled ? 'transform translate-x-full bg-blue-500 ' : 'bg-white   '}`}
          >
            {isToggled ? <Moon className='p-1' /> : <Sun className='p-1 text-yellow-400' />}

          </div>
        </div>
      </label>
    </div>
  );
}


const aboutMenu: MegamenuProps =
  [

    {
      type: "Links" as "Links",
      title: 'About us',

      links: [
        { href: '/casestudies', icon: <ThumbsUp className="text-gray-100 fill-blue-500" />, name: 'Customer Stories', subTitle: "Our customers have to say" },
        { href: '/partner', icon: <HeartHandshake className="text-gray-100 fill-blue-500" />, name: 'Partners', subTitle: "Become a our partners" },
        { href: '/careers', icon: <Briefcase className="text-gray-100 fill-blue-500" />, name: 'Careers', subTitle: "We’re always hiring!" },
        { href: '/media', icon: <Newspaper className="text-gray-100 fill-blue-500" />, name: 'Press and media', subTitle: "News and updates" },

        { href: '/contact', icon: <Phone className="text-gray-100 fill-blue-500" />, name: 'Contact Us', subTitle: "Get in touch with our sales" },



      ]


    },
    {
      type: 'Node',
      node: <div>
        <div className="text-gray-500 dark:gray-200">Our offices</div>
        <div className="flex gap-5 py-2">
          <div>
            <Image src={'/images/about-1.png'} alt="location" height={300} width={400} className="rounded-3xl" />
          </div>
          <div className="flex justify-center flex-col">
            <div className="font-bold">Serving customers from across the globe</div>
            <div className="flex gap-2"><MapPin className="fill-blue-700 text-white dark:text-slate-900" />San Francisco, California</div>
            <div className="flex gap-2"><MapPin className="fill-blue-700 text-white dark:text-slate-900" />Seattle, Washington</div>
          </div>
        </div>
      </div> as ReactNode
    }
  ]

const enterpriseMenu: MegamenuProps = [
  {
    type: 'Links',
    title: "Resources",
    links: [
      { href: '/docs', name: 'Developer Docs', subTitle: 'Learn how to integrate', icon: <TerminalSquare className=" text-blue-700" /> },
      { href: '/docs', name: 'Help Center ', subTitle: 'All about how to use ', icon: <LifeBuoy className="fill-blue-700 text-gray-50" /> },
      { href: '/docs', name: 'Product Updates', subTitle: 'Newest feature releases', icon: <Megaphone className="fill-blue-700 text-gray-50" /> },


    ]
  },
  {
    type: 'Links',
    title: "Best Practices",
    links: [
      { href: '/docs', name: 'FAQs', subTitle: 'Learn how to integrate', icon: <HelpCircle className="fill-blue-700 text-gray-50" /> },
      { href: '/casestudy', name: 'Case Studies', subTitle: 'All about how to use ', icon: <BookCheck className="fill-blue-700 text-gray-50" /> },
      { href: '/blogs', name: 'Engineering Blog ', subTitle: 'All about how to use ', icon: <Cog className="fill-blue-700 text-gray-50" /> },

      { href: '/books', name: 'Books & Webinars', subTitle: 'All about how to use ', icon: <Book className="fill-blue-700 text-gray-50" /> },

    ]
  }
]

const solutionMenu: MegamenuProps = [
  {
    type: "Links",
    title: "Business Solutions",
    links: [
      {
        href: "/docs",
        name: "Convert",
        subTitle: "Analyze conversation",
        icon: <Repeat2 className=" text-blue-700" />,
      },
      {
        href: "/docs",
        name: "Enage",
        subTitle: "Measure active usage",
        icon: <PlusCircle className="text-blue-700" />,
      },
      {
        href: "/docs",
        name: "Retain",
        subTitle: "Find retentation drivers",
        icon: <Fullscreen className="text-blue-700" />,
      },
      {
        href: "/docs",
        name: "Product Adoption",
        subTitle: "Maximize all customers",
        icon: <Users className="text-blue-700" />,
      },
    ],
  },
  {
    type: "Links",
    title: "Industry Solutions",
    links: [
      { href: "/docs", name: "eCommerce", subTitle: "", icon: <></> },
      { href: "/casestudy", name: "SaaS", subTitle: "", icon: <></> },
      { href: "/blogs", name: "Financial Services", subTitle: "", icon: <></> },
    ],
  },

  {
    type: "Node",
    node: (
      <>
        <div>
          <div className="dark:gray-200 text-gray-500">Insight</div>
          <div className="flex flex-col gap-5 py-2">
            <div className="flex gap-3">
              <Lightbulb className="text-blue-700" />
              Debugging with product analytics
            </div>
            <div className="flex gap-3">
              <Lightbulb className="text-blue-700" />
              Why it’s never too early to add product ana...
            </div>
            <div className="flex gap-3">
              <Lightbulb className="text-blue-700" />
              Data implementation, starting with the ‘why’
            </div>
          </div>
          <Link className="flex  gap-4" href={"#"}>
            See all <MoveRight />
          </Link>
        </div>
      </>
    ),
  },
];

const productMenu: MegamenuProps = [

  {
    type: 'Links',
    title: "Powerful and Simple Analytics",
    links: [
      { href: '/docs', name: 'Interactive Reports', subTitle: 'Learn about your users', icon: <BarChart className=" text-blue-700" /> },
      { href: '/docs', name: 'Team Dashboard & Alerts', subTitle: 'Monitor your metricse', icon: <AppWindow className="text-blue-700" /> },
      { href: '/docs', name: 'Behavioral Analytics', subTitle: 'Real-time analytics user trends', icon: <ActivitySquare className="text-blue-700" /> },
      { href: '/docs', name: 'Audience Segmentation', subTitle: 'Segments with perfect target', icon: <PieChart className="text-blue-700" /> },

      { href: '/docs', name: 'Group Analytics', subTitle: 'Measure B2B account health', icon: <Group className="text-blue-700" /> },
      { href: '/docs', name: 'Limitless Segmentation', subTitle: 'Surface hidden trends', icon: <Layers3 className="text-blue-700" /> },


    ]
  }, {
    type: 'Links',
    title: "Tools for Trusted Data",
    links: [
      { href: '/docs', name: 'Data Integrations', subTitle: 'Connect to your warehouse', icon: <Cpu className=" text-blue-700" /> },
      { href: '/docs', name: 'Data Management', subTitle: 'Keep data clean & usable', icon: <FileStack className="text-blue-700" /> },
      { href: '/docs', name: 'Security & Privacy', subTitle: 'Protect customer data', icon: <Lock className="text-blue-700" /> },


    ]

  }, {
    type: 'Node',
    node: <>
      <div>
        <div>
          <div className="text-gray-500 dark:gray-200">Always Improving</div>
          <Image src={'/images/dash.png'} alt="dash" width={200} height={200} />
          <div className="flex flex-col gap-5 py-2">
            <div className="flex gap-3"><CheckCircle className="text-blue-700" />Debugging with product analytics</div>
            <div className="flex gap-3"><CheckCircle className="text-blue-700" />Why it’s never too early to add product ana...</div>
          </div>
          <Link className="flex  gap-4" href={'#'}>See all <MoveRight /></Link>
        </div>
      </div>
    </>
  }
] 