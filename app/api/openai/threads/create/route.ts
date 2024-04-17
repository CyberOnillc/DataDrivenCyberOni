import { createFile, createThread } from "@/lib/externalRequests/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


    try {

        const { file, message } = await req.json();
        const uploadedFile = await createFile(file, 'assistants');
        const newThread = await createThread({
            starter: message,
            files: [uploadedFile]

        })
        return NextResponse.json({data:newThread})

    } catch (error) {

        return NextResponse.json({ message: error }, { status: 500 })

    }
}