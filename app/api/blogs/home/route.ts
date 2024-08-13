import { getEssential, getFeatured, getPopular, getRecent } from "@/crud/blog";
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server'
import apiHandler from "@/errorHandler";
export const revalidate = 3600;

const get = async () => {
    const featured = await getFeatured(prisma);
    const {recent} = await getRecent(1, prisma);
    const {popular} = await getPopular(1, prisma);
    const {essential} = await getEssential(1, prisma);
    return NextResponse.json({ message: "found", data: { featured, recent, popular, essential } })

}

export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ GET: get });