'use client';

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import { useState } from "react";
import { Menu, ChevronDown, User, Settings, LogOut } from "lucide-react";
import UseMegaMenuData from "@/components/layout/NavbarMenuData";
import NavbarItem from "./NavbarItem";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function NavBar({ session, darkMode }: { session: Session | null, darkMode: boolean }) {
  const scrolled = useScroll(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuData = UseMegaMenuData({});
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
        <div className="flex items-center justify-between w-full text-black dark:text-white mx-5 lg:mx-10">

          <div className="relative">
            <Link onClick={() => setMobileMenuOpen(false)} href="/" className="flex items-center font-display text-2xl lg:text-3xl w-fit">
              <Image
                src="/images/logo.png"
                alt="CyberOni logo"
                width="40"
                height="40"
                className="rounded-sm"
              />
              <span className="ml-2">CyberOni</span>
            </Link>
          </div>

          <div className={`${!mobileMenuOpen ? 'hidden' : 'flex absolute right-0 top-full h-screen w-screen max-h-screen overflow-y-auto pt-10 animate-slide-left-fade text-center z-[100] bg-white dark:bg-black py-10'} flex-col items-center gap-6 xl:gap-4 xl:pt-0 xl:static xl:flex xl:flex-row xl:justify-center xl:h-full xl:bg-inherit xl:w-fit`}>
            <NavbarItem setMenuOpen={setMobileMenuOpen} menuOpen={!mobileMenuOpen} itemName="About" menuOptions={menuData.aboutMenu} />
            <NavbarItem setMenuOpen={setMobileMenuOpen} menuOpen={!mobileMenuOpen} itemName="Solutions" menuOptions={menuData.solutionMenu} />
            <NavbarItem setMenuOpen={setMobileMenuOpen} menuOpen={!mobileMenuOpen} itemName="Products" menuOptions={menuData.productMenu} />
            <NavbarItem setMenuOpen={setMobileMenuOpen} menuOpen={!mobileMenuOpen} itemName="Resources" menuOptions={menuData.enterpriseMenu} />
            <Link href={'/api/auth/signin'} className="ring-[#9E9C9C] ring-2 dark:text-white px-5 py-3 rounded-lg hover:shadow-md xl:hidden">Sign In</Link>
            <Link href={'/auth/signup'} className="ring-[#9E9C9C] ring-2 dark:text-white px-5 py-3 rounded-lg hover:shadow-md xl:hidden">Sign Up</Link>
            <ThemeToggle enabled={darkMode} className="xl:hidden justify-center items-center" />
          </div>

          <div className="hidden xl:flex items-center justify-center gap-5 p-3">
            <SearchBar />
            {session ? (
              <div className="flex items-center gap-3">
                <Link href="/profile" className="flex items-center gap-1 hover:text-blue-500">
                  <User size={20} />
                  <span>Profile</span>
                </Link>
                <Link href="/settings" className="flex items-center gap-1 hover:text-blue-500">
                  <Settings size={20} />
                  <span>Settings</span>
                </Link>
                <Link href="/api/auth/signout" className="flex items-center gap-1 hover:text-blue-500">
                  <LogOut size={20} />
                  <span>Logout</span>
                </Link>
              </div>
            ) : (
              <>
                <Link href={'/api/auth/signin'} className="ring-[#9E9C9C] ring-2 hover:ring-blue-400 hover:text-blue-500 dark:text-white px-4 py-2 rounded-lg hover:shadow-md text-base lg:text-lg">Sign In</Link>
                <Link href={'/auth/signup'} className="ring-[#9E9C9C] ring-2 hover:ring-blue-400 hover:text-blue-500 dark:text-white px-4 py-2 rounded-lg hover:shadow-md text-base lg:text-lg">Sign Up</Link>
              </>
            )}
            <ThemeToggle enabled={darkMode} className="hidden xl:flex" />
          </div>

          <div className="block xl:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Navigation Options"
              className="z-50"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
