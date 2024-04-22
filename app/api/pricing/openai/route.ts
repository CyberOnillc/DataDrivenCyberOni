import { fetchHuggingfacePrices } from "@/lib/externalRequests/huggingface";
import { fetchOpenAIPrices } from "@/lib/externalRequests/openai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {

       const prices = await fetchOpenAIPrices();
        return NextResponse.json({ prices })


    } catch (error) {

        console.log(error);
        return NextResponse.json({ error }, { status: 500 })

    }
}

