import apiHandler from "@/errorHandler";
import { addClick, update } from "@/crud/referral";
import { ReferralType } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { sleep } from "@/lib/utils";


export default async function Referral({ params }: { params: { prefix: string } }) {
    try {
        const updated = await addClick(params.prefix , ReferralType.REDIRECT, prisma)
        await  sleep(2000)    
        return redirect(`${updated.link}?${new URLSearchParams(updated.utmProps as Record<string, string>).toString()}`)

    } catch (error) {
        console.log(error);
         redirect('/')
    }


}