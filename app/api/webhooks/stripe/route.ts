import { processStripeEvent, verifyWebhook } from "@/lib/externalRequests/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const signature = req.headers.get('stripe-signature');
        const body = await req.text();
        const event = await verifyWebhook(signature as string, body)
        await processStripeEvent(event);
        //console.log(event);
        return NextResponse.json({})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

