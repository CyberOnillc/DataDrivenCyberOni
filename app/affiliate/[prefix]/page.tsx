import prisma from "@/lib/prisma";
import { addClick, update } from "@/crud/referral";
import { ReferralType } from "@prisma/client";
import { redirect } from "next/navigation";
import { sleep } from "@/lib/utils";



export default async function Referral({ params }: { params: { prefix: string } }) {
    const updated = await addClick(params.prefix, ReferralType.AFFILIATE, prisma)
    try {
        await sleep(2000)
        const res = await fetch(updated.link);
        if (res.status >= 400) redirect(updated.fallback);
    } catch (error) {
        console.log("redirect error: ", error);
        redirect(updated.fallback);
    }

    redirect(`${updated.link}?${new URLSearchParams(updated.utmProps as Record<string, string>).toString()}`)
}