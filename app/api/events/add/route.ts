import { create } from "@/crud/event";
import { CreateEventDTO } from "@/crud/DTOs";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {


    if (req.method === "POST") {
        const event = await req.json() as CreateEventDTO;
        const newEvent = await create(event, prisma);
        return NextResponse.json({ message: "Add success", data: newEvent });
    }


}


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateEventDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateImageDTO'
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateTagDTO'
 *         eventLink:
 *           type: string
 *         status:
 *           type: string
 *           enum:
 *             - UPCOMING
 *             - CANCELLED
 *             - COMPLETED
 *         isVirtual:
 *           type: boolean
 *
 * /api/events/add:
 *   post:
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventDTO'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEventDTO'
 */
