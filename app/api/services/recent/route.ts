
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server'
import apiHandler from "@/errorHandler";
import { getRecent } from "@/crud/service";

const get = async (req: NextRequest) => {
    const services = await getRecent( prisma)  // skipping 10 record for every new page
    return NextResponse.json({ message: "found", data: services })

}
export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ GET: get });
