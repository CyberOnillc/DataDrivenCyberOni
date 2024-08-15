'use client'
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import React, { useState } from 'react'
import ClientInput from "../layout/ClientInput"
import { addToSendGrid } from "@/lib/externalRequests/sendgrid"
import { LoadingCircle } from "../shared/icons"

function EmailLetter() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    async function submit(formData: FormData) {
        setLoading(true);
        const email = formData.get('email');
        const res = await addToSendGrid({ email: email as string });
        if (res == 202) setSuccess(true);
        setLoading(false)

    }
    return (
        <div className="rounded-lg flex flex-col justify-center lg:justify-normal lg:flex-row gap-5 bg-gradient-purple h-full lg:min-h-fit my-32  lg:my-10 px-10">
            <div className="animate-float relative flex-1 h-60 lg:h-full lg:w-1/2 lg:flex lg:justify-center lg:items-center -top-20 lg:top-0 lg:translate-y-0 overflow-hidden">
                <Image className=" object-contain" src={'/images/cta.png'} alt="cta-image" height={500} width={500}></Image>
            </div>
            <div className="relative lg:flex lg:flex-col lg:justify-center mx-10 -top-20 lg:top-auto">
                <div className="font-abel text-3xl p-2 text-center lg:text-left">Get Industry Insights Straight To Your Inbox</div>
                <form action={submit} className="p-1">
                    <div className="flex flex-col gap-5 lg:flex-row justify-center items-center">
                        <ClientInput
                            type="email"
                            name="email"
                            placeholder="email address"
                            className="flex-1 rounded-full bg-white/30 text-white p-3 placeholder-white"
                            color="white"
                        ></ClientInput>
                        <button disabled={loading || success} className="flex-1 disabled:cursor-not-allowed  lg:flex-initial bg-black text-white rounded-full w-fit flex justify-between items-center p-3 gap-2" type="submit">
                            {success ? <>
                                <span>Added to email list</span>
                                <CheckCircle className="text-green-500" />
                            </> :

                                loading ? <>
                                    <span>Adding to Mailing List... </span>
                                    <LoadingCircle /></>
                                    :
                                    <><span>Get In Touch</span>
                                        <ArrowRight></ArrowRight></>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default EmailLetter