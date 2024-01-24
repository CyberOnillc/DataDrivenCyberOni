import { addView, getAll, read } from "@/crud/blog";
import React, { ReactEventHandler, Suspense, useRef } from 'react'
import parse from 'html-react-parser';
import Image from "next/image";
import prisma from "@/lib/prisma";
import Link from "next/link";
import CommentForm from "@/components/blogs/CommentForm";
import BlogContainer from "@/components/blogs/BlogContainer";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import BlogContent from "@/components/blogs/BlogContent";
import { cookies } from "next/headers";
import { extractUUID, seoUrl, stripFileExtension } from "@/lib/utils";
import { DisplayBlogDTO } from "@/crud/DTOs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuthAdapter";

export const dynamic = 'force-dynamic';

interface BlogPostProps {
    params: { slug: string[] }
    searchParams: { [key: string]: string | string[] | undefined }
}



export async function generateMetadata({ params, searchParams }: BlogPostProps, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const [id, seoTitle] = params.slug
    const blog = await read(id, prisma) as DisplayBlogDTO;

    // optionally access and extend (rather than replace) parent metadata
    let metadata: Metadata = {};
    metadata.title = blog.title as string
    metadata.description = blog.description
    metadata.openGraph = {
        type: 'article',
        title: blog.title,
        description: blog.description,
        images: [blog.images.length > 0 ? blog.images[0].src : ""]
    }
    metadata.twitter = {
        title: blog.title,
        images: [blog.images.length > 0 ? blog.images[0].src : ""],
        description: blog.description,

    }
    metadata.category = blog.tags.join(" ")
    metadata.keywords = blog.tags?.map(tag => tag.name)
    if (params.slug[1]) {
        metadata.alternates = {
            canonical: `${process.env.HOST}/blogs/post/${blog.id}`
        }
    }

    return metadata
}


async function BlogPost({ params }: BlogPostProps) {
    const session = await getServerSession(authOptions);

    const [id, seoTitle] = params.slug
    const blog = await getData(id, session?.user?.email ?? "");

    // console.log("Currect url", seoTitle, encodeURIComponent(seoUrl(blog.title, blog.id)));
    if (!blog) redirect('/404');

    //if (seoTitle !== seoUrl(blog.title, blog.id)) redirect('/404'); //redirec if link in not matching


    const cookieStore = cookies();
    const theme = cookieStore.get("theme")?.value as string === 'dark' ? 'dark' : "light";
    // console.log("user like ",session?.user);
    return (
        <div className="realtive w-full dark:text-white h-full pb-10">
            <div className="w-full ">
                <div className="w-full bg-white dark:bg-gray-900 py-5">
                    <div className="container mx-auto whitespace-pre-line break-words">
                        <div className="m-4  text-xl lg:text-2xl font-bold">{blog.title}</div>
                        <div className="flex flex-wrap container gap-1 m-4">
                            {blog.tags.map((tag, index) => (<span key={index} className="p-1 px-2">#{tag.name}</span>))}
                        </div>
                        <div className="m-4 font-semibold text-sm">{blog.description}</div>
                        <div className="m-4">by. {blog.author.firstName} {blog.author.lastName} </div>
                    </div>
                </div>
                <div className="relative mx-auto flex flex-col  items-center my-10 xl:py-10  xl:px-10 px-1 py-5 min-h-screen container">
                    <div className="max-w-full flex justify-center items-center">{blog.images[0] ? <Image priority={true} className="object-contain m-2 w-full h-[40vh] rounded-lg" src={blog.images[0].src} alt={stripFileExtension(blog.images[0].name || 'blog_image')} width={500} height={300}></Image> : <></>}</div>
                    {<BlogContent href={`${process.env.NEXTAUTH_URL}/blogs/post/${seoTitle}`} content={blog.content} theme={theme} />}
                    <BlogContainer href={`${process.env.NEXTAUTH_URL}/blogs/post/${seoTitle}`} liked={blog.Likes ? blog.Likes.length > 0 : false} blog={blog} session={session} />

                </div>


                <div className="w-full flex flex-col items-center justify-center gap-5">
                    <Link href={`/blogs/author/${blog.author.id}?page=1`} className="flex justify-center items-center" >
                        <div className="w-20 h-20 rounded-full overflow-hidden">
                            {blog.author.image ? <Image src={blog.author.image.src} alt="Author Dp" height={50} width={50} className="object-fill h-full w-full" />
                                :
                                <div className="w-full h-full bg-orange-500 flex items-center justify-center text-center text-xl">{blog.author.firstName ? blog.author.firstName[0] : 'A'}</div>
                            }
                        </div>
                    </Link>
                    <div className="text-xl">
                        {blog.author.firstName || blog.author.email}
                    </div>
                </div>
                <CommentForm email={session?.user?.email as string} href={`${process.env.NEXTAUTH_URL}/blogs/post/${seoTitle}`} id={id} comments={blog.Comments} />
            </div>
        </div>

    )
}


async function getData(id: string, userEmail?: string) {
    const blog = await addView({ id, userEmail }, prisma)
    // console.log(blog.title, userEmail);
    if (blog) return blog as DisplayBlogDTO
    else redirect('/404')

}

export default BlogPost