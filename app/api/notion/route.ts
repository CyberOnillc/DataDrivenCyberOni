import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        return NextResponse.json({ error: "Not programmed" }, { status: 500 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 })

    }
}



