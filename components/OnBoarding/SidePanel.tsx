"use client";
import { steps } from "@/data/onboardingData";
import { Dot } from "lucide-react";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
const SidePanel = ({ currentStep }: { currentStep: string }) => {
  const currentIndex = steps.findIndex((step) => step.path === currentStep) - 1;
  const activeColor = (index: number) =>
    currentIndex >= index
      ? "bg-gray-50 text-gray-50"
      : "bg-gray-500 text-gray-500";
  const numberOfSteps = steps.length - 1;
  const isFinalStep = (index: number) => index === numberOfSteps - 1;
  return (
    <div className="relative flex flex-col items-center bg-blue-800  lg:h-full lg:rounded-sm lg:py-24">
      <h1 className="ml-5 text-center text-3xl text-white lg:self-start lg:text-left">
        Quick & Easy Setup
      </h1>
      <div className="relative my-10 flex max-w-full flex-col-reverse gap-4  overflow-visible text-white lg:flex-row  lg:overflow-hidden">
        <div className="relative my-5 flex w-full items-center justify-center overflow-visible align-middle lg:my-auto lg:w-auto lg:flex-col  lg:justify-start">
          {steps.slice(1).map((step, index, steps) => (
            <React.Fragment key={index}>
              <div className="relative z-10 overflow-visible">
                <div
                  className={` h-5 w-5 rounded-full ${activeColor(index)} ${
                    currentStep === step.path ? "h-7 w-7 " : ""
                  } `}
                ></div>
                <div
                  className={`absolute -left-1/2 -top-14 z-10 mx-2 lg:hidden ${
                    currentIndex >= index ? "text-gray-50" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </div>
              </div>
              {isFinalStep(index) ? null : (
                <div
                  className={`h-1 w-20  lg:h-12 lg:w-[0.15rem]  ${
                    currentIndex > index ? "bg-gray-50" : "bg-gray-500"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="hidden w-full justify-between gap-2 lg:flex lg:w-auto lg:flex-col">
          {steps.slice(1).map((step, index) => (
            <Link
              href={`${step.path}`}
              key={index}
              className={`relative flex flex-col  bg-transparent ${
                currentIndex >= index ? "text-gray-50" : "text-gray-500"
              }`}
            >
              <span className="text-[0.5rem] font-bold lg:mx-4 lg:text-xl">
                {step.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
