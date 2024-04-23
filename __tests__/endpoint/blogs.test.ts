/**
 * @jest-environment node
 * 
 */

import {GET as getBlog, DELETE as deleteBlog, PUT as updateBlog} from '@/app/api/blogs/[id]/route'
import {POST as addblogHandler} from '@/app/api/blogs/add/route'
import { createMocks } from 'node-mocks-http'
import { describe, expect, test, it, beforeAll } from '@jest/globals';
import { CreateTagDTO } from "@/crud/DTOs";
import { Blog } from "@prisma/client";
import { CreateImageDTO, CreateBlogDTO } from "@/crud/DTOs";
import { NextRequest } from "next/server";


describe('Testing blogs Api', () => {
    const mockblog: CreateBlogDTO = {
        title: 'TEst Tilte',
        content: 'testcontent',
        description: 'test  description',
        date: new Date(),
        featured: false,
        subTitle: 'preview',
        
        author: {
            email: 'nehal.sk.99@gmail.com'

        },
        publishDate: new Date(),
        tags: [
            { name: 'Tech' },
            { name: 'Mobile' },
        ] as CreateTagDTO[],
        images: [
            { name: 'Image 1', src: 'https://picsum.photos/200' } as CreateImageDTO,
            { name: 'Image 2', src: 'https://picsum.photos/200' } as CreateImageDTO,
        ],
    };

    let createdblog: Blog;


    it('Adds a blog to the test database', async () => {
        const req  = new NextRequest('http://localhost:3000/api/bogs/add', {
            method: 'POST',
            body: JSON.stringify(mockblog)
        })
        const response = await addblogHandler(req);

        expect(response?.status).toEqual(200);
        createdblog = (await response?.json()).data;
    },10000);
    it('delete blog', async () => {
        const req  = new NextRequest('http://localhost:3000/api/blogs/', {
            method: 'DELETE',
        })
        const response = await deleteBlog(req, { params: { id: createdblog.id } });
        expect(response.status).toBe(200)
    },10000)

});
