import apiHandler from "@/errorHandler";
import { addClick, update } from "@/crud/referral";
import { ReferralType } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma/prismaClient";


export default async function Referral({ params }: { params: { prefix: string } }) {
    const updated = await addClick(params.prefix , ReferralType.REDIRECT, prisma)
    
    return redirect(`${updated.link}?${new URLSearchParams(updated.utmProps as Record<string, string>).toString()}`)


}