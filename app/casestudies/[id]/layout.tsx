import { getAll } from "@/crud/casestudy";
import prisma from "@/lib/prisma";
import { seoUrl } from "@/lib/utils";
import { ReactNode } from "react";
export async function generateStaticParams() {
    const cases = await getAll(0, 0, prisma)
    return cases.records.map((caseStudy) => ({
        id: seoUrl(caseStudy.title, caseStudy.id)
    }))
}

export default async function CaseStudyPageLayout({ children }: { children: ReactNode }) {
    return <>
        {children}
    </>
}