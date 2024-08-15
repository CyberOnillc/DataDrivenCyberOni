import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server'
import apiHandler from "@/errorHandler";
import { getAll } from "@/crud/casestudy";
import { Owner } from "@/data/ownerData";

export const revalidate = 3600;
const get = async (req: NextRequest) => {
    const services = await getAll(1, 10, { orgId: Owner.orgId }, {order: 'desc' , orderby: 'createdAt'} )  // skipping 10 record for every new page
    return NextResponse.json({ message: "found", data: services.records })

}
export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ GET: get });
