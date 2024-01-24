import React from 'react'
import BlogListLoader from "./loading"
import { getEssential, getFeatured, getPopular, getRecent } from "@/crud/blog";
import { get } from "http";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { seoUrl } from "@/lib/utils";
import { DisplayBlogDTO } from "@/crud/DTOs";

async function BlogList({ params }: { params: { list: string } }) {
    const data = await getData(params.list);

    return (
        <div className="px-5 lg:px-16">
            <div className="container mx-auto ">
                <div className="mx-10 text-3xl my-5 capitalize">
                    {params.list}
                </div>
                <div className="mx-10 w-1/2">
                    {listData[params.list]}
                </div>
            </div>
            <div className="w-full bg-gray-50 dark:bg-zinc-900">
                <div className="container mx-auto ">
                    <div className="conatiner mx-10 my-10 flex flex-wrap">
                        {data.list.map((blog, index) => {
                            return (
                                <div key={index} className={`w-full lg:w-1/2 p-5  lg:h-96 h-fit`}>
                                    <Link href={`/blogs/post/${blog.id}/${seoUrl(blog.title)}`}>
                                        <div className="overflow-hidden h-full shadow-lg   dark:bg-gray-700 rounded-lg">
                                            <div className=" bg-gray-400 h-2/3">
                                                <Image
                                                    className="w-full h-full object-cover"
                                                    src={blog.images[0] ? blog.images[0].src : 'https://placehold.co/600x400'}
                                                    alt={blog.title}
                                                    height={450}
                                                    width={500} />
                                            </div>
                                            <div className="px-6 py-1">
                                                <div className="mb-2">by {blog.author.firstName} </div>
                                                <div className="mb-2 font-bold text-base">{blog.title}</div>
                                                <div className="text-sm line-clamp-2 lg:line-clamp-4">{blog.subTitle}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

async function getData(list: string) {
    if (list == 'new') {
        const list = await getRecent(prisma)
        return { list: list as DisplayBlogDTO[] }
    }

    if (list === 'popular') {
        const list = await getPopular(prisma)
        return { list: list as DisplayBlogDTO[] }

    }

    if (list === 'essential') {
        const list = await getEssential(prisma)
        return { list: list as DisplayBlogDTO[] }
    }


    else redirect('/blogs')



}

const listData: { [key: string]: string } = {
    new: 'Our latest web design tips, tricks, insights, and resources, hot off the presses.',
    essential: 'essential desription',
    popular: 'Popular description',
}


export default BlogList