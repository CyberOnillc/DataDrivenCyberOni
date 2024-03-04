"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ColorPicker from "react-pick-color";
import ColorPickerModal from "../shared/ColorPickerModal";
import AppBuilderColorPicker from "./AppBuilderColorPicker";

function AppBuilder() {
    const steps = ["navbar", "hero", "about-us", "services"];
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
            <div>
                
            </div>

            <div>
                <NavBarForm />
            </div>
        </div>
    );
}

function NavBarForm() {
    const [colors, setColors] = useState(["#000000"]);

    function buildNavbar() { }

    return (
        <form action="" className="w-full flex-col gap-3">
            <h3>Build a Nav Bar</h3>
            <div className="flex justify-end">
                <AppBuilderColorPicker
                    colors={colors}
                    onChange={(colors) => setColors(colors)}
                />
            </div>
            <textarea
                rows={10}
                className="w-full"
                placeholder="What should the nav bar look like"
            />
            <div className="flex justify-center">
                <button type="submit" className="flex gap-1 bg-sky-600 p-4 text-white">
                    Build Component
                </button>
            </div>
        </form>
    );
}

function HeroForm() {
    function buildHero() { }
    return <form action=""></form>;
}
function AboutUsForm() {
    function buildAboutUs() { }
    return <form action=""></form>;
}
function ServicesForm() {
    function buildServices() { }
    return <form action=""></form>;
}
export default AppBuilder;
