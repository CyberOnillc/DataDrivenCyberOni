
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { applyServiceDiscount } from "@/crud/cart";
import apiHandler from "@/errorHandler";

export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ POST: post });

async function post(req: Request, { params }: { params: { userId: string } }) {
    const { discounts } = await req.json() as { discounts: string[] };
    const cart = await applyServiceDiscount(params.userId, discounts, prisma);
    return NextResponse.json({ message: 'success', data: cart })



}

