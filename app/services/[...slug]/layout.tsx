import { getAll } from "@/crud/service";
import prisma from "@/lib/prisma";
import { seoUrl } from "@/lib/utils";
import { ReactNode } from "react";
export async function generateStaticParams() {
    const services = await getAll(0, 0, prisma)
    return services.records.map((service) => ({
        slug: [service.id, seoUrl(service.title)]

    }))
}

export default async function ServicePageLayout({ children }: { children: ReactNode }) {
    return <>
        {children}
    </>
}