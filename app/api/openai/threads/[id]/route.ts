import { addUserMessageToThread, createFile, retrieveThread } from "@/lib/externalRequests/openai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: { id: string }) {
    try {

        const thread = await retrieveThread(params.id)
        return NextResponse.json({ data: thread })

    } catch (error) {

        return NextResponse.json({ message: error }, { status: 500 })

    }
}


export async function PUT(req: NextRequest, params: { id: string }) {
    try {
        const { message, file } = await req.json();
        const uploadedFile = await createFile(file, 'assistants');
        const thread = await addUserMessageToThread(params.id, { message, fileIds: [uploadedFile.id] })
        return NextResponse.json({ data: thread })

    } catch (error) {

        return NextResponse.json({ message: error }, { status: 500 })

    }
}