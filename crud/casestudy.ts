import "server-only";
import { Image, PrismaClient, Role } from "@prisma/client";
import { CreateImageDTO } from "./DTOs";
import { connectOrCreateObject, createObject as createImage } from "./images";
import { CreateCaseStudyDTO } from "./DTOs";
import { User } from "next-auth";
import prisma from "@/lib/prisma";
import { orgQuery } from "./permissions";
import { HttpError } from "@/lib/utils";
export type CaseStudyType = "ECOMMERCE" | "LANDING" | "SOFTWARE" | "GRAPHICS";

export async function create(caseStudy: CreateCaseStudyDTO, user: User) {
  const cases = prisma.caseStudy;
  let images = await connectOrCreateObject(caseStudy.images, []);
  let resultImage = await createImage(caseStudy.results.image);
  let keyLearningsImage = await createImage(caseStudy.keyLearning.image);

  let updatedUserPersonas = await Promise.all(
    caseStudy.userPersonas.map(async (userPersona) => {
      return {
        ...userPersona,
        image: await createImage(userPersona.image),
      };
    }),
  );

  const newCase = await cases.create({
    data: {
      title: caseStudy.title,
      goals: caseStudy.goals,
      preview: caseStudy.preview,
      userResearch: JSON.stringify(caseStudy.userResearch),
      keyLearning: JSON.stringify({
        ...caseStudy.keyLearning,
        image: keyLearningsImage,
      }),
      possibleSolutions: caseStudy.possibleSolutions,
      problemStatement: JSON.stringify(caseStudy.problemStatement),
      uniqueFeatures: JSON.stringify(caseStudy.uniqueFeatures),
      userPersonas: updatedUserPersonas,
      userProblems: caseStudy.userProblems,
      results: { ...caseStudy.results, image: resultImage },
      images: images,
      competitiveAnalysis: caseStudy.competitorAnalysis,
      type: caseStudy.serviceId ? { connect: { id: caseStudy.serviceId } } : {},
      createdBy: { connect: { id: user.id } },
      Organization: {
        connect: { id: user.orgId },
      },
      subServices: caseStudy.subServices
        ? { connect: caseStudy.subServices }
        : {},
    },
  });

  return newCase;
}

export async function read(caseStudyId: string, user: User) {
  const cases = prisma.caseStudy;
  const caseStudy = await cases.findUnique({
    where: { id: caseStudyId, AND: orgQuery(user) },
    include: { subServices: { select: { id: true } }, images: true },
  });
  return {
    ...caseStudy,
  } as unknown as CreateCaseStudyDTO;
}

export async function update(
  caseStudyId: string,
  caseStudy: CreateCaseStudyDTO,
  user: User,
) {
  const cases = prisma.caseStudy;
  const oldCase = await cases.findUnique({
    where: { id: caseStudyId, AND: orgQuery(user) },
    include: { images: true },
  });
  if (!oldCase) {
    throw HttpError(404, "Case study not found");
  }
  let images = await connectOrCreateObject(
    caseStudy.images,
    oldCase?.images as unknown as Image[],
  );

  let resultImage = await createImage(caseStudy.results.image);
  let keyLearningsImage = await createImage(caseStudy.keyLearning.image);

  const updatedCaseStudy = await cases.update({
    where: { id: caseStudyId },
    data: {
      title: caseStudy.title,
      goals: caseStudy.goals,
      preview: caseStudy.preview,
      userResearch: JSON.stringify(caseStudy.userResearch),
      possibleSolutions: caseStudy.possibleSolutions,
      competitiveAnalysis: caseStudy.competitorAnalysis,
      problemStatement: JSON.stringify(caseStudy.problemStatement),
      uniqueFeatures: JSON.stringify(caseStudy.uniqueFeatures),
      userPersonas: caseStudy.userPersonas,
      userProblems: caseStudy.userProblems,
      images: images,
      results: { ...caseStudy.results, image: resultImage },
      keyLearning: JSON.stringify({
        ...caseStudy.keyLearning,
        image: keyLearningsImage,
      }),
      type: caseStudy.serviceId ? { connect: { id: caseStudy.serviceId } } : {},
      subServices: caseStudy.subServices ? { set: caseStudy.subServices } : {},
    },
  });
  return updatedCaseStudy;
}

export async function remove(caseStudyId: string, user: User) {
  const cases = prisma.caseStudy;
  const updatedCaseStudy = await cases.delete({
    where: { id: caseStudyId, AND: orgQuery(user) },
  });
  return updatedCaseStudy;
}

export async function getAll(
  page: number,
  pageSize: number,
  user: User,
  options?: {
    order: "asc" | "desc";
    orderby: "updatedAt" | "createdAt" | "title";
    userId?: string;
  },
) {
  const caseStudys = prisma.caseStudy;

  let query = { AND: orgQuery(user) };
  let allrecords = await caseStudys.findMany({
    skip: page === 0 ? 0 : (page - 1) * pageSize,
    take: page === 0 ? 9999 : pageSize,
    where: query,
    include: {
      subServices: true,
      type: true,
    },
    orderBy: options?.orderby
      ? { [options.orderby ?? "createdAt"]: options.order }
      : { createdAt: "desc" },
  });

  const totalCount = await caseStudys.count({ where: query });
  const totalPages = Math.ceil(totalCount / pageSize);

  return { records: allrecords, currentPage: page, totalPages, pageSize };
}

export async function getGroup(group: string, prismaClient: PrismaClient) {
  const caseStudys = prismaClient.caseStudy;

  let allrecords = await caseStudys.findMany({
    take: 16,
    where: {
      type: {
        id: group,
      },
    },
  });

  return allrecords;
}
