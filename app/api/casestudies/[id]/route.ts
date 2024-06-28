import { NextApiRequest, NextApiResponse } from "next";
import  prisma from "@/lib/prisma";
import { read, remove as removeCaseStudy, update } from "@/crud/casestudy";
import { CreateCaseStudyDTO } from "@/crud/DTOs";
import { NextRequest, NextResponse } from "next/server";
import apiHandler from "@/errorHandler";
import { revalidatePath } from "next/cache";

export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({
  GET: get,
  PUT: put,
  DELETE: remove,
});

async function put(req: NextRequest, { params }: { params: { id: string } }) {
  const caseStudyId = params.id as string;
  const caseStudy = (await req.json()) as CreateCaseStudyDTO;
  const updatedUser = await update(caseStudyId, caseStudy, prisma);
  return NextResponse.json({ message: "update success", data: updatedUser });
}
async function remove(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const casestudyID = params.id as string;
  const deleted = await removeCaseStudy(casestudyID, prisma);
  return NextResponse.json({ message: "delete success" });
}

async function get(req: NextRequest, { params }: { params: { id: string } }) {
  const casestudyID = params.id as string;
  const casestudy = await read(casestudyID, prisma);
  return NextResponse.json({ data: casestudy });
}


/**
 * @swagger
 *
 * components:
 *   schemas:
 *     CreateCaseStudyDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         serviceId:
 *           type: string
 *         subServices:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *         preview:
 *           type: string
 *         problemStatement:
 *           type: string
 *         userProblems:
 *           type: array
 *           items:
 *             type: string
 *         possibleSolutions:
 *           type: array
 *           items:
 *             type: string
 *         goals:
 *           type: array
 *           items:
 *             type: string
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateImageDTO'
 *         uniqueFeatures:
 *           type: string
 *         userResearch:
 *           type: string
 *         keyLearning:
 *           type: string
 *         userPersonas:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserPersona'
 *         competitiveAnalysis:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateImageDTO'
 *         wireFrames:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateImageDTO'
 *         hifiDesign:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateImageDTO'
 *         userFlow:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateImageDTO'
 *         architecture:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateImageDTO'
 *     UserPersona:
 *       type: object
 *       properties:
 *         bio:
 *           type: string
 *         name:
 *           type: string
 *         gender:
 *           type: string
 *         age:
 *           type: number
 *         goals:
 *           type: array
 *           items:
 *             type: string
 *         painPoints:
 *           type: array
 *           items:
 *             type: string
 *         image:
 *           $ref: '#/components/schemas/CreateImageDTO'
 *
 * /api/casestudies/{id}:
 *   get:
 *     summary: Retrieve a case study by ID
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
 *               $ref: '#/components/schemas/CreateCaseStudyDTO'
 *
 *   put:
 *     summary: Update a case study by ID
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
 *             $ref: '#/components/schemas/CreateCaseStudyDTO'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCaseStudyDTO'
 *
 *   delete:
 *     summary: Delete a case study by ID
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
