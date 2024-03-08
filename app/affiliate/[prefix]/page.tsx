import prisma from "@/lib/prisma";
import { addClick, update } from "@/crud/referral";
import { ReferralType } from "@prisma/client";
import { redirect } from "next/navigation";
import { sleep } from "@/lib/utils";



export default async function Referral({ params }: { params: { prefix: string } }) {
    const updated = await addClick(params.prefix, ReferralType.AFFILIATE, prisma)
    await sleep(300)
    return redirect(`${updated.link}?${new URLSearchParams(updated.utmProps as Record<string, string>).toString()}`)


}