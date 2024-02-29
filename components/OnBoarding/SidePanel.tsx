"use client";
import { steps } from "@/data/onboardingData";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
const SidePanel = ({ currentStep }: { currentStep: string }) => {
    return (
        <div className="relative flex lg:h-full flex-col  items-center bg-blue-800 lg:py-24">
            <h1 className="ml-5 lg:self-start text-3xl text-white text-center lg:text-left">
                Quick & Easy Setup
            </h1>
            <div className="relative my-10 flex  lg:flex-col text-white">
                {steps.slice(1).map((step, index) => (
                    <Link
                        href={`${step.path}`}
                        key={index}
                        className={`relative  flex items-center ${currentStep === step.path ? "text-white" : "text-gray-400"
                            }`}
                    >
                        <span
                            className={`absolute w-[2px] bg-white ${index == 0 ? "lg:left-0 lg:translate-y-1/2 lg:h-1/2" : index === (steps.length - 2) ? 'lg:left-0 lg:-translate-y-1/2 lg:h-1/2' : "left-0 lg:h-full"}`}
                        ></span>
                        <span
                            className={`absolute translate-y-12 translate-x-5 lg:translate-y-0 lg:-translate-x-1/2 h-4 w-4  ${currentStep === step.path ? "bg-gray-100" : "bg-gray-400"
                                }  rounded-full`}
                        ></span>
                        <h3 className="mx-4">{step.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SidePanel;
