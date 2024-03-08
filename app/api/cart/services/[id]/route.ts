import { CreateBlogDTO, CreateServiceCartItemDTO, RemoveServiceCartItem, UpdateServiceCartItemDTO } from "@/crud/DTOs";
import { create } from "@/crud/blog";
import { addServiceCartItem, getServiceCart, removeServiceCartItem, updateServiceCartItem } from "@/crud/cart";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function POST(req: Request, { params }: { params: { id: string } }) {
    const item = await req.json() as CreateServiceCartItemDTO;
    const cart = await addServiceCartItem(item, prisma);
    return NextResponse.json({ message: 'success', data: cart })

}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const item = await req.json() as UpdateServiceCartItemDTO;
    const cart = await updateServiceCartItem(item, prisma);
    return NextResponse.json({ message: 'success', cartItem: cart })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const input = await req.json() as RemoveServiceCartItem;
    const cart = await removeServiceCartItem(input, prisma);
    return NextResponse.json({ message: 'success', cart })
}


export async function GET(req: Request, { params }: { params: { id: string } }) {

    const cart = await getServiceCart(params.id, prisma);

    return NextResponse.json({ data: cart })

}