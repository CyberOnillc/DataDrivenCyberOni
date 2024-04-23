import { createPaymentIntent, updatePaymentIntent } from "@/lib/externalRequests/stripe";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const cookieStore = cookies();

        const { price, description, metadata } = await req.json()
        const intent = await createPaymentIntent({ price, description, metadata })
        cookieStore.set('intentId', intent.id as string);
        return NextResponse.json(intent);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 })
    }
}


export async function PUT(req: NextRequest) {
    try {
        const cookieStore = cookies();
        const { price, description, metadata, intentId } = await req.json()
        const intent = await updatePaymentIntent({ intentId, price, metadata })
        cookieStore.set('intentId', intent.id as string);
        return NextResponse.json(intent);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 })
    }
}


