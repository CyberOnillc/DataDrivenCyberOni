import { CreateBlogDTO } from "@/crud/DTOs";
import { create } from "@/crud/blog";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {


    if (req.method === "POST") {
        const blog = await req.json() as CreateBlogDTO;
        const newUser = await create(blog, prisma);
        return NextResponse.json({ message: "Add success", data: newUser });
    }


}


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateBlogDTO:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         subTitle:
 *           type: string
 *         description:
 *           type: string
 *         featured:
 *           type: boolean
 *         date:
 *           type: string
 *           format: date-time
 *         publishDate:
 *           type: string
 *           format: date-time
 *         content:
 *           type: string
 *         templateId:
 *           type: string
 *           nullable: true
 *         author:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateImageDTO'
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateTagDTO'
 *         category:
 *           $ref: '#/components/schemas/BlogCategory'
 * 

 *     BlogCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *
 * /api/blogs/add:
 *   post:
 *     description: Adds a new blog entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBlogDTO'
 *     responses:
 *       200:
 *         description: Blog added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Add success
 *                 data:
 *                   $ref: '#/components/schemas/CreateBlogDTO'
 */