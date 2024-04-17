import { runAssistant } from "@/lib/externalRequests/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, {id, threadId}: {id:string, threadId:string}) {


    try {
        const run = await runAssistant({assistantId:id, threadId})
        return run

    } catch (error) {

        return NextResponse.json({ message: error }, { status: 500 })

    }
}
export async function GET(req: NextRequest, params: {id:string}) {


    try {

    } catch (error) {

        return NextResponse.json({ message: error }, { status: 500 })

    }
}
export async function PUT(req: NextRequest, params: {id:string}) {


    try {

    } catch (error) {

        return NextResponse.json({ message: error }, { status: 500 })

    }
}