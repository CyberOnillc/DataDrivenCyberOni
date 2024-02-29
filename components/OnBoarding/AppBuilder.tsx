'use client'
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function AppBuilder() {
    const steps = ['navbar', 'hero', 'about-us', 'services']
    function buildNavbar() {

    }
    return (
        <div className="flex flex-col container mx-auto  h-full px-5">
            <div className="text-left">
                <h1>App Builder</h1>
                <h3 className="font-light text-gray-600">Transform Your Ideas into React Components Instantly</h3>
                <p className="font-semibold">Just describe what you need, and watch as we convert your words into ready-to-use App components.</p>
            </div>

            <div>
                <NavBarForm />
            </div>
        </div>);
}

function NavBarForm() {
    const [color, setColor] = useState("#000000");
    function buildNavbar() {

    }

    return (
        <form action="" className="w-full flex-col gap-3">
            <div className="w-full flex justify-end">
                <label className="flex gap-4 rounded-md shadow-md w-fit my-5 p-4 items-center justify-center bg-gray-100 dark:bg-slate-700">
                    <span className="w-10 h-10 rounded-full" style={{ background: color }} />
                    <span>{color}</span>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value.toUpperCase())}
                        className="hidden"
                    />
                    <ChevronDown className="text-blue-500" />
                </label>
            </div>
            <textarea rows={10} className="w-full" placeholder="What should the nav bar look like" />
            <div className="flex justify-center"><button type="submit" className="bg-sky-600 p-4 flex gap-1 text-white">Build Component</button></div>
        </form>

    )
}

function HeroForm() {
    function buildHero() {

    }
    return (
        <form action=""></form>

    )
}
function AboutUsForm() {
    function buildAboutUs() {

    }
    return (
        <form action=""></form>

    )
}
function ServicesForm() {
    function buildServices() {

    }
    return (
        <form action=""></form>

    )
}
export default AppBuilder;