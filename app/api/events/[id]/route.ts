import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { read, remove as removeEvent, update } from "@/crud/event";
import { CreateEventDTO } from "@/crud/DTOs";
import { NextRequest, NextResponse } from 'next/server'
import apiHandler from "@/errorHandler";

export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ GET: get, PUT: put, DELETE: remove });

async function put(req: NextRequest, { params }: { params: { id: string } }) {

    const eventId = params.id as string;
    const event = await req.json() as CreateEventDTO;
    const updatedUser = await update(eventId, event, prisma);
    return NextResponse.json({ message: "update success", data: updatedUser });
}
async function remove(req: NextRequest, { params }: { params: { id: string } }) {
    const eventId = params.id as string;
    const deleted = await removeEvent(eventId, prisma);
    return NextResponse.json({ message: "delete success" });
}


async function get(req: NextRequest, { params }: { params: { id: string } }) {
    const eventId = params.id as string;
    const event = await read(eventId, prisma)
    return NextResponse.json({ data: event })


}


/**
 * @swagger
 *
 * /api/events/{id}:
 *   get:
 *     summary: Retrieve an event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEventDTO'
 *
 *   put:
 *     summary: Update an event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *
 *   delete:
 *     summary: Delete an event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: delete success
 */
