import React from 'react'
import BlogListLoader from "../loading"
import { getEssential, getFeatured, getPopular, getRecent, getSimilar } from "@/crud/blog";
import { get } from "http";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { seoUrl } from "@/lib/utils";
import { DisplayBlogDTO } from "@/crud/DTOs";
import GridBlogCard from "@/components/blogs/GridBlogCard";
import { IdealBankElement } from "@stripe/react-stripe-js";

async function BlogList({ params , searchParams}: { params: { list: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
    let {id} = searchParams
    const data = await getData(params.list, id as string);

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
            <div className="w-full ">
                <div className="container mx-auto ">
                    <div className="conatiner mx-10 my-10 flex flex-wrap">
                        {data.list.map((blog, index) => {
                            return (
                                <div key={index} className={`w-full lg:w-1/2 p-5  lg:h-[25em] h-fit`}>
                                    <GridBlogCard blog={blog} />
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

async function getData(list: string, id?:string) {
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

    if (list === 'similar') {
        if(!id) redirect('/404')
        const list = await getSimilar( id!, prisma)
        return { list: list as DisplayBlogDTO[] }
    }

    else redirect('/blogs')



}

const listData: { [key: string]: string } = {
    new: 'Our latest web design tips, tricks, insights, and resources, hot off the presses.',
    essential: 'essential description',
    popular: 'Popular description',
    similar : 'Blogs you might like'
}


export default BlogList