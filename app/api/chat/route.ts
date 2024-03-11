import { NextRequest, NextResponse, } from "next/server";
import { getOpenAiResponse } from "@/lib/externalRequests/openai";


export async function POST(req: NextRequest) {

    try {

        const { messages } = await req.json();
        return getOpenAiResponse(messages)

    } catch (error) {
        console.log("Error in /api/chat POST",error);
        NextResponse.json({ message: error }, { status: 500 })
    }

}
