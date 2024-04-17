import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server'
import apiHandler from "@/errorHandler";
import { getBySearchTerm as searchBlogs } from "@/crud/blog"
import { getBySearchTerm as searchServices } from "@/crud/service";
import { getBySearchTerm as searchProducts } from "@/crud/service";
import { getBySearchTerm as searchCases } from "@/crud/casestudy";
const get = async (req: NextRequest,) => {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('q')!
    const page = Number(searchParams.get('page')) ?? 1
    let blogs = await searchBlogs(query, page, prisma)
    let services = await searchServices(query, page, prisma)
    let products = await searchProducts(query, page, prisma)
    let caseStudies = await searchCases(query, page, prisma)

    const records = {
        blogs,
        services,
        products,
        caseStudies
    }

    return NextResponse.json({ message: "found", data: records })

}
export const { POST, DELETE, GET, PATCH, PUT } = apiHandler({ GET: get });
