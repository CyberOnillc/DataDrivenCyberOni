'use client'
import Link from "next/link";
import TermsModal from "../Popups/TextPopup";
import DialogDemo from "../Popups/DialogDemo";
import { useState } from "react";
import { Site } from "@/data/ownerData";
import TermsAndConditions from "../LongFormText/terms";
import PrivacyPolicy from "../LongFormText/privacy";
export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let testModal = () => {
    setIsModalOpen(true);
    alert('pressed')
  }
  return (
    <div className="text container relative  z-10 mx-auto h-fit w-full py-5  text-center dark:text-white">
      <div className="h-[1px]  bg-gradient-purple"></div>
      <div className="grid grid-cols-1 grid-rows-[1fr_1] gap-3 p-4  lg:grid-cols-2 lg:grid-rows-1">
        <div className="flex flex-col justify-center items-center ">
          <div className="text-lg font-bold">Quick Links</div>
          <Link className="hover:underline h-12 lg:h-auto" href={"/home"}>
            Home
          </Link>
          <Link className="hover:underline h-12 lg:h-auto" href={"/services"}>
            Services
          </Link>
          <Link className="hover:underline h-12 lg:h-auto" href={"/blogs"}>
            Blogs
          </Link>
          <Link className="hover:underline h-12 lg:h-auto" href={"/enterprise"}>
            Enterprise
          </Link>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline h-12 lg:h-auto"
            href="https://www.projectskip.me"
          >
            Our Non Profit
          </a>
        </div>
        <div className="flex flex-col h-fit">
          <div className="font-bold">Get In Touch</div>
          <Link className="hover:underline h-12 lg:h-auto" href={"/contact"}>
            Contact
          </Link>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline h-12 lg:h-auto"
            href="https://form.jotform.com/233444925421050"
          >
            Get Support
          </a>
          <div>support@cybershoptech.com</div>
          <div>Denver, Co </div>
        </div>
      </div>
      <div className="flex flex-col justify-center lg:justify-between ">

        <TermsModal
          text={<TermsAndConditions />}
          title="Terms & Conditions"
          triggerTitle="Terms & Conditions"
          isButton={false}
          className="hover:underline h-12 lg:h-auto"
        />
        <TermsModal
          text={<PrivacyPolicy />}
          title="Privacy Policy"
          triggerTitle="Privacy Policy"
          isButton={false}
          className="hover:underline h-12 lg:h-auto"
        />
        <div className="m-2">
          Copyright © 2023 CyberOni. All rights reserved.
        </div>
      </div>
    </div>
  );
}
