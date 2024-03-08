import { PrismaClient } from "@prisma/client";
import { connectOrCreateObject as connectTags } from "./tags";
import { connectOrCreateObject as connectImages } from "./images";
import { cleanHtmlString, getRandomFromArray } from "@/lib/utils";
import { CommentDTO, CreateBlogDTO } from "./DTOs";
import { getUserByEmail } from "./user";

async function create(blog: CreateBlogDTO, prismaClient: PrismaClient) {
    const blogs = prismaClient.blog;
    let createdblog = await blogs.create({
        data: {
            ...blog,
            images: await connectImages(blog.images, []),
            tags: { connectOrCreate: connectTags(blog.tags) },
            author: { connect: { email: blog.author.email } }
        }
    });
    return createdblog


}


async function update(blogId: string, blog: CreateBlogDTO, prismaClient: PrismaClient) {
    const blogs = prismaClient.blog;
    const oldBlog = await blogs.findUnique({ where: { id: blogId }, include: { images: true, tags: true } })
    const updatedBlog = await blogs.update({
        where: { id: blogId },
        data: {
            ...blog,
            images: await connectImages(blog.images, oldBlog!.images),
            tags: { connectOrCreate: connectTags(blog.tags) },
            author: { connect: { email: blog.author.email } }
        }
    })
    return updatedBlog

}


async function remove(blogId: string, prismaClient: PrismaClient) {
    const blogs = prismaClient.blog;
    const existingblog = await blogs.findUnique({ where: { id: blogId } })
    if (existingblog) {
        await blogs.delete({ where: { id: blogId } })
    }
}
async function read(blogId: string, prismaClient: PrismaClient) {
    const blogs = prismaClient.blog;
    const existingblog = await blogs.findUnique({
        where: {
            id: blogId,

            publishDate: {
                lte: new Date()
            }
        },
        select: {
            userId: false,
            content: true,
            date: true,
            description: true,
            featured: true,
            id: true,
            title: true,
            subTitle: true,
            publishDate: true,
            author: {
                select: {
                    id: true,
                    email: true
                }
            },
            tags: true,
            images: true,
            Comments: true
        }
    })
    if (existingblog) return existingblog;

}

async function getAll(page: number, pageSize: number, prismaClient: PrismaClient) {
    const blogs = prismaClient.blog;

    if (pageSize !== 10 && pageSize != 30 && pageSize !== 50 && pageSize !== 0) throw new Error('page size must be 10, 30 or 50')

    let allBlogs = await blogs.findMany({
        skip: page === 0 ? 0 : (page - 1) * pageSize, take: page === 0 ? 9999 : pageSize,
        where: {
            publishDate: {
                lte: new Date()
            }
        },
        include: {
            // reviews: true,
            tags: true,
            author: true
        }
    })

    const totalCount = await blogs.count();
    const totalPages = Math.ceil(totalCount / pageSize);

    return { records: allBlogs, currentPage: page, totalPages, pageSize }

}

export async function getFeatured(prisma: PrismaClient) {
    const featured = await prisma.blog.findMany({
        take: 10,
        where: {
            featured: true,
            publishDate: {
                lte: new Date()
            }
        },
        orderBy: {
            publishDate: 'desc'
        },
        include: {
            tags: true,
            author: {
                include: {
                    image: true,
                }
            },
            images: true
        }
    });
    return getRandomFromArray(featured);

}
export async function addView({ id, userEmail }: { id: string, userEmail?: string }, prisma: PrismaClient) {
    const blogs = prisma.blog;
    try {
        const update = await blogs.update({
            where: {
                id,
                publishDate: {
                    lte: new Date()
                }
            },
            data: {
                Views: { increment: 1 }
            },
            include: {
                tags: true,
                author: {
                    include: {
                        image: true,
                    }
                },
                images: true,
                Likes: userEmail ? {
                    where: {
                        user: {
                            email: userEmail
                        }
                    }
                } : false,
                _count: {
                    select: {
                        Likes: true
                    }
                },
                Comments: {
                    include: {
                        User: true
                    }
                },
            }
        })
    
        return update
    } catch (error) {
        console.log(error);
        return 
        
    }
}
export function getRecent(prisma: PrismaClient) {
    const recentDate = new Date(Date.now() - 90 * (24 * 60 * 60 * 1000)) // 90 days
    const recent = prisma.blog.findMany({
        where: {
            AND: [
                {
                    publishDate: {
                        lte: new Date()
                    }
                },
                {
                    publishDate: {
                        gte: recentDate
                    }
                },
            ]

        },
        include: {
            tags: true,
            author: {

                include: {
                    image: true,
                }
            }, images: true
        },
        orderBy: {
            date: 'desc'
        }
    });
    return recent;
}

export function getPopular(prisma: PrismaClient) {
    const popular = prisma.blog.findMany({
        skip: 0, take: 10,
        where: {
            publishDate: {
                lte: new Date()
            }
        },
        include: {
            // reviews: true,
            tags: true,
            author: {

                include: {
                    image: true,
                }
            }, images: true


        },
        orderBy: {
            Likes: {
                _count: 'asc'
            },
        }
    })
    return popular
}

export function getEssential(prisma: PrismaClient) {

    const essential = prisma.blog.findMany({
        skip: 0, take: 10,
        where: {
            publishDate: {
                lte: new Date()
            }
        },
        include: {
            // reviews: true,
            tags: true,
            author: {
                include: {
                    image: true
                }
            },
            images: true



        }
    })
    return essential
}

async function getAuthor(id: string, page: number, prisma: PrismaClient) {
    const users = prisma.user;

    const author = await users.findUnique({
        where: { id }, include: {

            image: true,
            blogs: {
                take: 10,
                skip: (page - 1) * 10,
                include: {
                    images: true
                }
            }
        }
    })

    return author

}


async function addComment(comment: CommentDTO, prisma: PrismaClient) {
    const comments = prisma.blogComment;
    // console.log(comment);
    const newComment = await comments.create({
        data: {
            comment: comment.comment,
            User: {
                connect: {
                    email: comment.email
                }
            },
            Blog: { connect: { id: comment.blogId } },
        },
        include: {
            User: true
        }
    })

    return newComment
}

async function getComments(id: string, page: number, prisma: PrismaClient) {
    const comments = prisma.blogComment;

    const readComments = await comments.findMany({
        skip: (page - 1) * 5, take: 5,
        where: {
            blogId: id,
        }
    })

    return readComments
}

export async function getBySearchTerm(search: string, page: number, prisma: PrismaClient) {
    const blogs = prisma.blog;
    const records = await blogs.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: search,
                    },

                },
                {
                    description: {
                        contains: search,
                    }
                },
                {
                    subTitle: {
                        contains: search
                    }
                },
                {
                    content: {
                        contains: cleanHtmlString(search),
                    }
                }
            ],
            AND: [{
                publishDate: {
                    lte: new Date()
                }
            }]
        }
    })
    return records

}

export async function addLike(blogId: string, userEmail: string, prisma: PrismaClient) {
    const BlogLike = prisma.blogLike;
    const Like = await BlogLike.create({
        data: {
            blog: {
                connect: { id: blogId }
            },
            user: {
                connect: { email: userEmail }
            }
        }
    })

    const newLikes = await BlogLike.count({
        where: {
            blog: {
                id: blogId
            }
        }
    })
    return { liked: true, likes: newLikes }


}

export async function removeLike(blogId: string, userEmail: string, prisma: PrismaClient) {
    const BlogLike = prisma.blogLike;
    const user = await getUserByEmail(userEmail, prisma);
    if (!user) return false
    const Like = await BlogLike.delete({
        where: {
            userId_blogId: {
                blogId,
                userId: user.id
            },


        }
    })

    const newLikes = await BlogLike.count({
        where: {
            blog: {
                id: blogId
            }
        }
    })

    return { liked: false, likes: newLikes }

}

export { create, update, remove, read, getAll, getAuthor, addComment, getComments }