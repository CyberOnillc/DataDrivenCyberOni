import { CreateBlogDTO, createCredentialsDTO } from "@/crud/DTOs";
import { create } from "@/crud/credentials";
import { prisma } from "@/prisma/prismaClient";
import { Role } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { token } = await req.json() as { token: string };
        const { id, email, role } = verify(token, process.env.NEXTAUTH_SECRET as string) as { id: string, email: string, role: Role };
        return NextResponse.json({ message: "verify success", role });

    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}