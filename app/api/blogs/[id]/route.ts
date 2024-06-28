import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import {  read, remove as removeBlog, update } from "@/crud/blog";
import { NextRequest, NextResponse } from 'next/server'
import apiHandler from "@/errorHandler";
import { CreateBlogDTO } from "@/crud/DTOs";


export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ GET: get, PUT: put, DELETE: remove });

async function put(req: NextRequest, { params }: { params: { id: string } }) {

    const blogID = params.id as string;
    const blog = await req.json() as CreateBlogDTO;
    const updatedUser = await update(blogID, blog, prisma);
    return NextResponse.json({ message: "update success", data: updatedUser });
}
async function remove(req: NextRequest, { params }: { params: { id: string } }) {
    const blogID = params.id as string;
    const deleted = await removeBlog(blogID, prisma);
    return NextResponse.json({ message: "delete success" });
}


async function get(req: NextRequest, { params }: { params: { id: string } }) {
    const blogID = params.id as string;
    const blog = await read(blogID, prisma)
    return NextResponse.json({ data: blog })


}


/**
 * @swagger
 *
 * /api/blogs/{id}:
 *   get:
 *     summary: Retrieve a blog by ID
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
 *               $ref: '#/components/schemas/CreateBlogDTO'
 *
 *   put:
 *     summary: Update a blog by ID
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
 *             $ref: '#/components/schemas/CreateBlogDTO'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBlogDTO'
 *
 *   delete:
 *     summary: Delete a blog by ID
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
