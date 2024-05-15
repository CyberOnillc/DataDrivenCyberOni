import SoftwareCarousel from "../SoftwareProducts/SoftwareCarousel";
import { getAll } from "@/crud/softwareProduct";
import { softwareCategories } from "@/data/homeData";
import prisma from "@/lib/prisma";
import CategoryChip from "../SoftwareProducts/CategroryChip";
import { sleep } from "@/lib/utils";

async function SoftwareSection() {
    const softwares = await getAll(1, 10, prisma)
    return (
        <SoftwareCarousel
            categories={softwareCategories}
            softwareProducts={softwares.records.map((item) => ({
                image: item.images[0] ? item.images[0].src : "https://placehold.co/600x400",
                subTitle: item.subTitle,
                title: item.title,
                pageLink: item.link,
                codeLink: item.githubLink
            }))}
        />
    );
}

export default SoftwareSection;