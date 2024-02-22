'use client'

import { MoveRight } from "lucide-react";

function Introduction() {

    async function getStarted() {

    }
    return (

        <div className="flex flex-col container mx-auto bg-onboarding-intro-bg lg:bg-[length:300px_450px]  bg-left bg-no-repeat bg-contain min-h-screen">
            <div className="text-center">
                <h1>Build Your App</h1>
                <h3 className="font-light">Artificial Intelligence For Your Business Needs</h3>
            </div>

            <form action={getStarted} className="flex flex-col justify-start items-center gap-3 lg:px-20 px-10">
                <div className="w-full"><input className="w-full" placeholder="How many people in your company" /></div>
                <div className="w-full"><input className="w-full" placeholder="Annual Revenue" /></div>
                <div className="w-full"><input className="w-full" placeholder="Primary Use Case" /></div>
                <div className="w-full"><textarea className="rounded-md w-full" rows={5} placeholder="Share your thoughts about this product here" /></div>

                <div className="flex justify-center"><button className="bg-sky-600 p-4 flex gap-1 text-white">Let&apos;s get Started <MoveRight /></button></div>
            </form>



        </div>



    );
}

export default Introduction;