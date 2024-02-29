import {  getEssential, getFeatured, getPopular, getRecent } from "@/crud/blog";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import apiHandler from "@/errorHandler";

const get = async () => {
    const featured = await getFeatured(prisma);
    const recent = await getRecent(prisma);
    const popular = await getPopular(prisma);
    const essential = await getEssential(prisma);
    return NextResponse.json({ message: "found", data: { featured, recent, popular, essential } })

}

export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ GET: get });