import { NextApiRequest, NextApiResponse } from "next";
import prisma  from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
import apiHandler from "@/errorHandler";
import { CreateSoftwareProductDTO } from "@/crud/DTOs";
import { update, remove as removeSoftware, read } from "@/crud/softwareProduct";
import { revalidatePath } from "next/cache";

export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({
  GET: get,
  PUT: put,
  DELETE: remove,
});

async function put(req: NextRequest, { params }: { params: { id: string } }) {
  const productId = params.id as string;

  const product = (await req.json()) as CreateSoftwareProductDTO;
  const updatedProduct = await update(productId, product, prisma);
  revalidatePath(`/dashboard/softwares/view/${productId}`);
  return NextResponse.json({ message: "update success", data: updatedProduct });
}
async function remove(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const productId = params.id as string;
  const deleted = await removeSoftware(productId, prisma);
  return NextResponse.json({ message: "delete success" });
}

async function get(req: NextRequest, { params }: { params: { id: string } }) {
  const productId = params.id as string;
  const product = await read(productId, prisma);
  return NextResponse.json({ data: product });
}



/**
 * @swagger
 *
 * components:
 *   schemas:
 *     CreateSoftwareProductDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         subTitle:
 *           type: string
 *         description:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateImageDTO'
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateTagDTO'
 *         pricing:
 *           type: string
 *           enum: [Free, Freemium, Paid, Subscription]
 *         link:
 *           type: string
 *         githubLink:
 *           type: string
 *         blog:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             title:
 *               type: string
 *         status:
 *           $ref: '#/components/schemas/SoftwareProductStatus'
 *         category:
 *           $ref: '#/components/schemas/SoftwareProductCategory'
 *         subscriptionModel:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SubscriptionModel'
 *
 *     SoftwareProductStatus:
 *       type: string
 *       enum: [Released, Beta, Alpha, ComingSoon, Planned]
 *
 *     SoftwareProductCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *
 *     SubscriptionModel:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         features:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             subTitle:
 *               type: string
 *         status:
 *           $ref: '#/components/schemas/SubscriptionStatus'
 *         type:
 *           $ref: '#/components/schemas/SubscriptionPeriod'
 *         credits:
 *           type: number
 *         profit:
 *           type: number
 *
 *     SubscriptionStatus:
 *       type: string
 *
 *     SubscriptionPeriod:
 *       type: string
 *
 * /api/softwares/{id}:
 *   get:
 *     summary: Retrieve a software product by ID
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
 *               $ref: '#/components/schemas/CreateSoftwareProductDTO'
 *
 *   put:
 *     summary: Update a software product by ID
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
 *             $ref: '#/components/schemas/CreateSoftwareProductDTO'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateSoftwareProductDTO'
 *
 *   delete:
 *     summary: Delete a software product by ID
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
