import { NextApiRequest, NextApiResponse } from "next";
import prisma  from "@/lib/prisma";
import { read, remove as removeEvent, update } from "@/crud/referral";
import { CreateReferralDTO } from "@/crud/DTOs";
import { NextRequest, NextResponse } from "next/server";
import apiHandler from "@/errorHandler";
import { HttpError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({
  GET: get,
  PUT: put,
  DELETE: remove,
});

async function put(req: NextRequest, { params }: { params: { id: string } }) {
  const referralId = params.id as string;
  const referral = (await req.json()) as CreateReferralDTO;
  await fetch(referral.link).catch(() => { throw HttpError(406, "Link in unreachable"); });
  const updatedUser = await update(referralId, referral, prisma);
  revalidatePath(`/dashboard/referrals/view/${referralId}`);
  return NextResponse.json({ message: "update success", data: updatedUser });
}
async function remove(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const referralId = params.id as string;
  const deleted = await removeEvent(referralId, prisma);
  return NextResponse.json({ message: "delete success" });
}

async function get(req: NextRequest, { params }: { params: { id: string } }) {
  const referralId = params.id as string;
  const referral = await read(referralId, prisma);
  return NextResponse.json({ data: referral });
}


/**
 * @swagger
 *
 * components:
 *   schemas:
 *     CreateReferralDTO:
 *       type: object
 *       properties:
 *         prefix:
 *           type: string
 *           nullable: true
 *         type:
 *           $ref: '#/components/schemas/ReferralType'
 *         campaignId:
 *           type: string
 *         expires:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         description:
 *           type: string
 *         priority:
 *           $ref: '#/components/schemas/ReferralPriority'
 *         link:
 *           type: string
 *         fallback:
 *           type: string
 *         redirect:
 *           type: string
 *         click:
 *           type: number
 *         utmProps:
 *           type: object
 *           properties:
 *             utm_medium:
 *               type: string
 *             utm_campaign:
 *               type: string
 *             utm_source:
 *               type: string
 *             utm_segment:
 *               type: string
 *             utm_product_category:
 *               type: string
 *             utm_communication_theme:
 *               type: string
 *             utm_ad_type:
 *               type: string
 *             utm_funnel_location:
 *               type: string
 *             utm_earned_or_paid:
 *               type: string
 *               enum:
 *                 - earned
 *                 - paid
 *
 * /api/referrals/{id}:
 *   get:
 *     summary: Retrieve a referral by ID
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
 *               $ref: '#/components/schemas/CreateReferralDTO'
 *
 *   put:
 *     summary: Update a referral by ID
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
 *             $ref: '#/components/schemas/CreateReferralDTO'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReferralDTO'
 *
 *   delete:
 *     summary: Delete a referral by ID
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
