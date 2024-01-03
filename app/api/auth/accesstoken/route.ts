import { CreateBlogDTO, createCredentialsDTO } from "@/crud/DTOs";
import { create } from "@/crud/credentials";
import { HttpError } from "@/lib/utils";
import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const credentials = await req.json() as createCredentialsDTO;
        const apiCredentials = await create(credentials, prisma);
        return NextResponse.json({ message: "Add success", data: apiCredentials });

    } catch (error) {
        console.log(error);
        let err = error as HttpError
        return NextResponse.json((err.message), {status: err.status || 500})
    }
}