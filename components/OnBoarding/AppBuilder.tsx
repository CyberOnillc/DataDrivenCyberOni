"use client";
import React, { useState } from "react";

import AppBuilderColorPicker from "./AppBuilderColorPicker";
import FilePicker from "./FilePicker";

interface ComponentFormProps {
    name: "Navbar" | "Hero" | "About" | "Services";
    title: string;
    build: (prompt: string, colors: string[], files: any[]) => Promise<void>;
}
function AppBuilder() {
    const steps = ["Navbar", "Hero", "About us", "Services"];
    const [currentStep, setCurrentStep] = useState(0);
    const isFinalStep = (index: number) => index === steps.length - 1;


    const Forms = [
        <NavBarForm key={1} />,
        <HeroForm key={2} />,
        <AboutUsForm key={3} />,
        <ServicesForm key={4} />,
    ];
    function buildNavbar() { }
    return (
        <div className="container mx-auto flex h-full  flex-col px-5">
            <div className="text-left">
                <h1>App Builder</h1>
                <h3 className="font-light text-gray-600">
                    Transform Your Ideas into React Components Instantly
                </h3>
                <p className="font-semibold">
                    Just describe what you need, and watch as we convert your words into
                    ready-to-use App components.
                </p>
            </div>
            <div className="flex items-center justify-center  my-10">
                {steps.map((step, index, steps) => (
                    <React.Fragment key={index} >
                        <button className="relative z-10 overflow-visible" onClick={() => setCurrentStep(index)}>
                            <div
                                className={` rounded-full ${currentStep >= index ? 'bg-blue-500' : 'bg-blue-100'} ${currentStep === index ? "h-7 w-7 " : "h-5 w-5"} `}
                            ></div>
                            <div
                                className={`absolute -left-1/2 -top-14 z-10 mx-2  ${currentStep >= index ? "text-blue-500 font-bold" : "text-gray-700 dark:text-gray-100"
                                    }`}
                            >
                                {step}
                            </div>
                        </button>
                        {isFinalStep(index) ? null : (
                            <div
                                className={`h-[1px] w-20    ${currentStep > index ? "bg-blue-500" : "bg-blue-50"
                                    }`}
                            ></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="flex justify-center my-5"><button type="submit" className="bg-blue-700 p-4 flex gap-1 text-white rounded-md">Save & go next</button></div>


            <div>{Forms[currentStep]}</div>

        </div>
    );
}

function ComponentForm({ build, name, title }: ComponentFormProps) {
    const [colors, setColors] = useState(["#000000"]);
    const [files, setFiles] = useState([]);
    const [prompt, setPrompt] = useState("");
    async function submit() {
        const resp = await build(prompt, colors, files);
    }

    return (
        <form action={submit} className="w-full flex-col gap-3">
            <h3>{title}</h3>
            <div className="flex justify-between">
                <div className="h-fit">
                    <FilePicker type="image" />
                </div>
                <AppBuilderColorPicker
                    colors={colors}
                    onChange={(colors) => setColors(colors)}
                />
            </div>
            <textarea
                rows={10}
                className="w-full"
                placeholder={`What should the ${name} look like`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex justify-center">
                <button type="submit" className="flex gap-1 bg-blue-600 p-4 text-white rounded-md">
                    Build Component
                </button>
            </div>
        </form>
    );
}

function NavBarForm() {
    async function buildNavbar() { }

    return (
        <ComponentForm
            build={buildNavbar}
            name="Navbar"
            title="Build a Navbar component"
        />
    );
}

function HeroForm() {
    async function buildHero() { }
    return (
        <ComponentForm
            build={buildHero}
            name="Hero"
            title="Build a Hero  component"
        />
    );
}
function AboutUsForm() {
    async function buildAboutUs() { }
    return (
        <ComponentForm
            build={buildAboutUs}
            name="About"
            title="Build a About us  component"
        />
    );
}
function ServicesForm() {
    async function buildServices() { }
    return (
        <ComponentForm
            build={buildServices}
            name="Services"
            title="Build a Service Section"
        />
    );
}
export default AppBuilder;
