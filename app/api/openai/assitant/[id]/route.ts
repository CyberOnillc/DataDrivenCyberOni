import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, params: {id:string}) {


    try {

    } catch (error) {

        return NextResponse.json({ message: error }, { status: 500 })

    }
}