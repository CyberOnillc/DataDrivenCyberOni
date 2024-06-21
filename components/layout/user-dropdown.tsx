"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
<<<<<<< HEAD
import { LayoutDashboard, LogOut, ShoppingCart } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { Session } from "next-auth";
import { DisplayUserDTO } from "@/crud/DTOs";
import Link from "next/link";

export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user as unknown as DisplayUserDTO || {};
=======
import { LayoutDashboard, LogOut } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { Session } from "next-auth";

export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user || {};
>>>>>>> upstream/main
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
<<<<<<< HEAD
          <div className="w-full rounded-md bg-white dark:bg-slate-800 p-2 sm:w-56">
            {/* <Link
              className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href="/dashboard"
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </Link> */}
=======
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <div className="p-2">
              {session?.user?.name && (
                <p className="truncate text-sm font-medium text-gray-900">
                  {session?.user?.name}
                </p>
              )}
              <p className="truncate text-sm text-gray-500">
                {session?.user?.email}
              </p>
            </div>
>>>>>>> upstream/main
            <button
              className="relative flex w-full cursor-not-allowed items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              disabled
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </button>
<<<<<<< HEAD
            <div className="relative flex w-full items-center justify-start space-x-2 gap-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 dark:hover:bg-gray-700  ">

              <Link href={'/cart/services'} className="flex gap-2 justify-center items-center">
                <ShoppingCart className="h-4 w-4" />
                <p className="text-sm">Services Cart</p>
              </Link>
            </div>


=======
>>>>>>> upstream/main
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
<<<<<<< HEAD
            alt={`avatar-${email}`}
            src={image ? image.src : `https://api.dicebear.com/7.x/initials/svg?seed=${email}`}
=======
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
>>>>>>> upstream/main
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}
