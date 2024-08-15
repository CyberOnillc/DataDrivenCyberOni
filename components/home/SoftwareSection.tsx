import SoftwareCarousel from "../SoftwareProducts/SoftwareCarousel";
import { getAll, getSoftwaresFByCategory } from "@/crud/softwareProduct";
import prisma from "@/lib/prisma";

import { getCategories } from "@/crud/categories";
import { DisplaySoftwareProductDTO } from "@/crud/DTOs";
import SoftwareCategories from "../SoftwareProducts/SoftwareCategories";

async function SoftwareSection({ categoryId }: { categoryId?: string | string[] }) {

    let softwares = [] as DisplaySoftwareProductDTO[]
    if (categoryId) {
        softwares = ((await getSoftwaresFByCategory(categoryId as string, prisma)) as DisplaySoftwareProductDTO[]);

    } else {
        softwares = ((await getAll(1, 10, prisma)).records);

    }
    return (
        <>
            {/* <SoftwareCategories /> */}
            <SoftwareCarousel
                softwareProducts={softwares.map((item) => ({
                    image: item.images[0] ? item.images[0].src : "https://placehold.co/600x400",
                    subTitle: item.subTitle,
                    title: item.title,
                    pageLink: item.link,
                    codeLink: item.githubLink
                }))}
            />
        </>
    );
}

export default SoftwareSection;