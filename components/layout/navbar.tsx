"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { ChevronDown, Info, LineChart, MailQuestion, Menu, Moon, Search, Sun, Terminal } from "lucide-react";
import { setCookie } from 'cookies-next';
import MegaMenu, { MegaMenuProps } from "../MegaMenu";
import NavbarItem from "./NavbarItem";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import UseMegaMenuData from "@/components/layout/NavbarMenuData";

export default function NavBar({ session, darkMode }: { session: Session | null, darkMode: boolean }) {
  const scrolled = useScroll(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuData = UseMegaMenuData({})
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
            <Link onClick={() => setMobileMenuOpen(false)} href="/" className="flex items-center font-display text-2xl w-fit peer/logo">
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


          <div className={` ${!mobileMenuOpen ? 'hidden' : 'flex absolute right-0 top-full h-screen w-screen max-h-screen overflow-y-auto pt-10 animate-slide-left-fade text-center z-[100] bg-white dark:bg-black py-10'}   gap-3   h-screen w-full flex-col items-center justify-start xl:pt-0 xl:static xl:flex xl:flex-row xl:gap-5 xl:justify-center xl:h-full xl:bg-inherit xl:w-fit group`}>
            <NavbarItem setMenuOpen={setMobileMenuOpen} menuOpen={!mobileMenuOpen} itemName="About" menuOptions={menuData.aboutMenu} />

            <NavbarItem setMenuOpen={setMobileMenuOpen} menuOpen={!mobileMenuOpen} itemName="Solutions" menuOptions={menuData.solutionMenu} />
            <NavbarItem setMenuOpen={setMobileMenuOpen} menuOpen={!mobileMenuOpen} itemName="Products" menuOptions={menuData.productMenu} />
            <NavbarItem setMenuOpen={setMobileMenuOpen} menuOpen={!mobileMenuOpen} itemName="Resources" menuOptions={menuData.enterpriseMenu} />


            <Link href={'/api/auth/signin'} className="ring-[#9E9C9C] ring-2 dark:text-white px-4 py-2 rounded-lg hover:shadow-md flex  xl:hidden">Sign In</Link>
            <Link href={'/auth/signup'} className="ring-[#9E9C9C] ring-2 dark:text-white px-4 py-2 rounded-lg hover:shadow-md flex xl:hidden">Sign Up</Link>
            <ThemeToggle enabled={darkMode} className={'flex xl:hidden justify-center items-center'} />

          </div>
          <div className=" items-center justify-center flex gap-3 p-3">
            <SearchBar />
            {session ? <><UserDropdown session={session} /></> :
              <><Link href={'/api/auth/signin'} className="ring-[#9E9C9C] ring-2 hover:ring-blue-400 hover:text-blue-500 dark:text-white px-4 py-1 rounded-lg hover:shadow-md hidden xl:flex  min-w-fit">Sign In</Link>
                <Link href={'/auth/signup'} className="ring-[#9E9C9C] ring-2 hover:ring-blue-400 hover:text-blue-500 dark:text-white px-4 py-1 rounded-lg hover:shadow-md hidden xl:flex min-w-fit">Sign Up</Link></>}
            <ThemeToggle enabled={darkMode} className={'hidden xl:flex'} />
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




