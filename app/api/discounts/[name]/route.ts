
import { NextRequest, NextResponse } from 'next/server'
import apiHandler from "@/errorHandler";
import { read } from "@/crud/discount";
import prisma from "@/lib/prisma";
export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ GET: get });

async function get(req: NextRequest, { params }: { params: { name: string } }) {


    const discount = await read(params.name, prisma)
    if (discount) return NextResponse.json({ message: "success", data: discount });
    else return NextResponse.json({ message: "not found" }, { status: 404 });

}