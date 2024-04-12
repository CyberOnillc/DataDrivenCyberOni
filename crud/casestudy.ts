import { Image, PrismaClient } from "@prisma/client";
import { CreateImageDTO } from "./DTOs";
import { CreateCaseStudy } from "./DTOs";
export type UserPersona = {
    bio: string;
    name: string;
    gender: string;
    age: number;
    goals: string[];
    painPoints: string[];
    image?: CreateImageDTO;
}
export async function create(caseStudy: CreateCaseStudy, prisma: PrismaClient) {
    const cases = prisma.caseStudy;
    const newCase = await cases.create({
        data: {
            title: caseStudy.title,
            goals: caseStudy.goals,
            preview: caseStudy.preview,
            userResearch: caseStudy.userResearch,
            keyLearning: caseStudy.keyLearning,
            possibleSolutions: caseStudy.possibleSolutions,
            competetiveAnalysis: caseStudy.competetiveAnalysis,
            problemStatement: caseStudy.problemStatement,
            uniqueFeatures: caseStudy.uniqueFeatures,
            userPersonas: caseStudy.userPersonas,
            userProblems: caseStudy.userProblems,
            architecture: caseStudy.architecture,
            hifiDesign: caseStudy.hifiDesign,
            images: caseStudy.images,
            userFlow: caseStudy.userFlow,
            wireFrames: caseStudy.wireFrames,
            type: caseStudy.serviceId ? { connect: { id: caseStudy.serviceId } } : {},
        }
    })

}

export async function read(caseStudyId: string, prisma: PrismaClient) {
    const cases = prisma.caseStudy;
    const caseStudy = await cases.findUnique({ where: { id: caseStudyId }, include: { subServices: { select: { id: true, title: true } } } })
    if (caseStudy) return caseStudy


}

export async function update(caseStudyId: string, caseStudy: CreateCaseStudy, prisma: PrismaClient) {
    const cases = prisma.caseStudy;
    const updatedCaseStudy = await cases.update({
        where: { id: caseStudyId }, data: {
            title: caseStudy.title,
            goals: caseStudy.goals,
            preview: caseStudy.preview,
            userResearch: caseStudy.userResearch,
            keyLearning: caseStudy.keyLearning,
            possibleSolutions: caseStudy.possibleSolutions,
            competetiveAnalysis: caseStudy.competetiveAnalysis,
            problemStatement: caseStudy.problemStatement,
            uniqueFeatures: caseStudy.uniqueFeatures,
            userPersonas: caseStudy.userPersonas,
            userProblems: caseStudy.userProblems,
            architecture: caseStudy.architecture,
            hifiDesign: caseStudy.hifiDesign,
            images: caseStudy.images,
            userFlow: caseStudy.userFlow,
            wireFrames: caseStudy.wireFrames,
            type: caseStudy.serviceId ? { connect: { id: caseStudy.serviceId } } : {},

        }
    })
    return updatedCaseStudy

}

export async function remove(caseStudyId: string, prisma: PrismaClient) {
    const cases = prisma.caseStudy;
    const updatedCaseStudy = await cases.delete({ where: { id: caseStudyId } })
    return updatedCaseStudy

}

export async function getAll(page: number, pageSize: number, prismaClient: PrismaClient) {
    const caseStudys = prismaClient.caseStudy;
    if (pageSize !== 10 && pageSize != 30 && pageSize !== 50 && pageSize !== 0) throw new Error('page size must be 10, 30 or 50')

    let allrecords = await caseStudys.findMany({
        skip: page === 0 ? 0 : (page - 1) * pageSize, take: page === 0 ? 9999 : pageSize,
        where: {
        },
    })

    const totalCount = await caseStudys.count();
    const totalPages = Math.ceil(totalCount / pageSize);

    return { records: allrecords, currentPage: page, totalPages, pageSize }

}

export async function getRecent(prisma: PrismaClient) {
    const caseStudies = prisma.caseStudy;
    let allRecords = await caseStudies.findMany({
        take: 10,
        where: {
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return allRecords

}
export async function getBySearchTerm(search: string, page: number, prisma: PrismaClient) {
    const caseStudies = prisma.caseStudy;


    const records = await caseStudies.findMany({
        skip: page === 0 ? 0 : (page - 1) * 5,
        take: page === 0 ? 9999 : 5,
        where: {
            OR: [
                {
                    title: {
                        contains: search
                    }
                },

                {
                    goals: {
                        string_contains: search
                    }
                },

                {
                    problemStatement: {
                        contains: search
                    }
                },
                {
                    preview: {
                        contains: search
                    }
                }, {

                    userResearch: {
                        contains: search
                    }
                },
                {
                    keyLearning: {
                        contains: search
                    },
                    
                }, {
                    uniqueFeatures: {
                        contains: search
                    }
                }
            ]
        }
    })

    return records;
}

export async function getGroup(group: string, prismaClient: PrismaClient) {
    const caseStudys = prismaClient.caseStudy;

    let allrecords = await caseStudys.findMany({
        take: 16,
        where: {
            type: {
                id: group
            }
        },

    })



    return allrecords
}
