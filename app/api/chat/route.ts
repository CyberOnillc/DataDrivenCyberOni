import { NextRequest, NextResponse, } from "next/server";
import { getResponse } from "@/lib/externalRequests/openai";


export async function POST(req: NextRequest) {

    try {

        const { messages } = await req.json();
        return getResponse(messages)

    } catch (error) {
        console.log(error);
        NextResponse.json({ message: error }, { status: 500 })
    }

}
