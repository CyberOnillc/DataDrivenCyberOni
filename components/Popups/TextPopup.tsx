'use client'
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import React, { useState } from "react";

interface TermsModalProps {
  image?: string;
  text: string | React.ReactNode;
  title: string;
  triggerTitle: string;
  isButton: boolean;
  className?: string;
}

const TermsModal: React.FC<TermsModalProps> = ({
  image,
  text,
  title,
  triggerTitle,
  isButton,
  className,
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
    setTimeout(() => {
      // console.log(open);
    }, 300);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {isButton ? (
          <button className={className} onClick={handleToggle}>
            {triggerTitle}
          </button>
        ) : (
          <span
            className={className +" "+ "cursor-pointer "}
            onClick={handleToggle}
            role="button"
          >
            {triggerTitle}
          </span>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="DialogContent fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform rounded-md border border-gray-200 bg-white p-8 shadow-lg">
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            {image && <Image src={image} alt="Terms and Conditions Image" />}
            <div className="scrollable-content">
              <div className="text">{text}</div>
            </div>
          </Dialog.Description>
          <Dialog.Close asChild>
            <button
              className="Button absolute right-2 top-6 w-20 text-red-500"
              onClick={handleToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M3.854 2.146a.5.5 0 0 1 0 .708L7.293 8l-3.44 3.44a.5.5 0 1 1-.708-.708L6.293 8 2.146 3.854a.5.5 0 0 1 .708-.708L8 6.293l3.44-3.44a.5.5 0 0 1 .708.708L9.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 9.707l-3.44 3.44a.5.5 0 0 1-.708-.708L6.293 8 2.146 3.854a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TermsModal;

