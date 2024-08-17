'use client';

import { ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import ClientInput from '../layout/ClientInput';
import { addToSendGrid } from '@/lib/externalRequests/sendgrid';
import { LoadingCircle } from '../shared/icons';

function EmailLetter() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function submit(formData: FormData) {
        setLoading(true);
        const email = formData.get('email');
        const res = await addToSendGrid({ email: email as string });
        if (res === 202) setSuccess(true);
        setLoading(false);
    }

    return (
        <div className="rounded-lg flex flex-col justify-center lg:flex-row gap-5 bg-gradient-purple h-full px-5 lg:px-10 py-10">
            <div className="animate-float relative flex-1 h-60 lg:h-full lg:w-1/2 flex justify-center items-center overflow-hidden">
                <Image
                    className="object-contain"
                    src={'/images/cta.png'}
                    alt="cta-image"
                    height={500}
                    width={500}
                />
            </div>
            <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left mx-2 lg:mx-10">
                <div className="font-abel text-2xl lg:text-4xl p-2">
                    Get Industry Insights Straight To Your Inbox
                </div>
                <form action={submit} className="w-full mt-5">
                    <div className="flex flex-col lg:flex-row gap-3 justify-center items-center">
                        <ClientInput
                            type="email"
                            name="email"
                            placeholder="email address"
                            className="w-full lg:flex-1 rounded-full bg-white/30 text-white p-3 placeholder-white"
                            color="white"
                        />
                        <button
                            disabled={loading || success}
                            className="w-full lg:w-auto flex justify-between items-center bg-black text-white rounded-full px-5 py-3 mt-3 lg:mt-0 lg:ml-3"
                            type="submit"
                        >
                            {success ? (
                                <>
                                    <span>Added to email list</span>
                                    <CheckCircle className="text-green-500" />
                                </>
                            ) : loading ? (
                                <>
                                    <span>Adding to Mailing List... </span>
                                    <LoadingCircle />
                                </>
                            ) : (
                                <>
                                    <span>Get In Touch</span>
                                    <ArrowRight />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmailLetter;
