/* eslint-disable @next/next/no-img-element */
import { read } from "@/crud/blog";
import prisma from "@/lib/prisma";
import { extractUUID } from "@/lib/utils";
import { ImageResponse } from "next/og";
async function getData(id: string) {
    const blog = await read(id, prisma)

    return blog
}


export const size ={

    height: 630,
    width: 1200,

}

export default async function BlogTwitterOG({ params }: { params: { id: string } }) {
    const seoTitle = params.id;
    const id = extractUUID(seoTitle);
    let blog = await getData(id);

    return new ImageResponse(
        (
            <>{(blog && blog.images && blog.images.length > 0) ?

                <img src={blog?.images[0].src} alt="" style={{ height: "630", width: "1200" }} />

                :
                <img
                    style={{ height: "600px", width: "1200px", objectFit: 'cover' }}
                    src={`${process.env.HOST}/images/monster_5.jpg`}
                    alt="CyberOni Logo"
                    className="mb-4 h-20 w-20 opacity-95"
                />
            }  </>
        ), {

        height: 630,
        width: 1200,

    }
    )


}