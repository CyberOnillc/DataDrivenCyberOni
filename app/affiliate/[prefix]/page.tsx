import { prisma } from "@/prisma/prismaClient";
import { addClick, update } from "@/crud/referral";
import { ReferralType } from "@prisma/client";
import { redirect } from "next/navigation";



export default async function Referral({ params }: { params: { prefix: string } }) {
    const updated = await addClick(params.prefix, ReferralType.AFFILIATE, prisma)

    return redirect(`${updated.link}?${new URLSearchParams(updated.utmProps as Record<string, string>).toString()}`)


}