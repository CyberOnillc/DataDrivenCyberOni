'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Define the structure of the section prop
interface SectionProps {
  imageOnLeft: boolean;
  image: {
    src: string;
  };
  title: string;
  content: string;
  index?: number; // Include this if index is a property of section
}

interface FloatingImageSectionProps {
  section: SectionProps;
}

const FloatingImageSection: React.FC<FloatingImageSectionProps> = ({
  section,
}) => {


  return (
    <div
      className={`my-4 flex w-full flex-col gap-5 p-2 ${
        section.imageOnLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <div className="flex flex-1 items-center justify-center lg:w-1/3 gap-3">
        <div className="animate-float">
          <Image
          className="rounded-lg"
            src={section.image.src}
            alt={`${section.index}-section`}
            height={500}
            width={500}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center lg:w-2/3">
        <div className="text-3xl font-bold">{section.title}</div>
        <div>{section.content}</div>
      </div>
    </div>
  );
};

export default FloatingImageSection;
