import { fetchHuggingfacePrices } from "@/lib/externalRequests/huggingface";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {

       const prices = await fetchHuggingfacePrices();
        return NextResponse.json({ prices })


    } catch (error) {

        return NextResponse.json({ error }, { status: 500 })

    }
}

