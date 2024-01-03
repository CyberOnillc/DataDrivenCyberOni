
import { DisplayUserDTO } from "@/crud/DTOs";
import { Role } from "@prisma/client";
import { NextRequest } from "next/server";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function verifyAccess(user: DisplayUserDTO, req: NextRequest): Promise<boolean> {
    const path = req.nextUrl.pathname;
    const method = req.method;
    const token = req.headers.get("Authorization")?.split(' ')[1];
    if (token) {
        try {
            const verifyRes = await fetch(`${req.nextUrl.origin}/api/auth/verifytoken`, {
                method: 'POST',
                body: JSON.stringify({ token })
            })
            const { role } = await verifyRes.json();
            user.role = role;
        } catch (error) {
            console.log("token parse error:", error);
        }

    }

    if (user.role === Role.SUPERUSER) return true;
    if (user.role === Role.ADMIN) return true;

    if (user.role === Role.USER) {


        if (path.match(/^\/api\/products\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) && method === 'GET') {
            return true;
        }

        if (path.match(/^\/api\/products\/all/)) {
            return true;
        }
        if (path.match(/^\/api\/users\/all/)) {
            return false;
        }

        if (path.match(/^\/api\/users\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) && method === 'GET') {
            const userId = path.split('/')[3];
            if (userId === user.id) return true

        }
        if (path.match(/^\/api\/users\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) && method === 'PUT') {
            const userId = path.split('/')[3];
            if (userId === user.id) return true

        }
        if (path.match(/^\/api\/services\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) && method === 'GET') {
            return true;
        }
        if (path.match(/^\/api\/services\/all/)) {
            return true;
        }
        if (path.match(/^\/api\/prompts\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) && method === 'GET') {
            return true;
        }
        if (path.match(/^\/api\/prompts\/all/) && method === 'GET') {
            return true;
        }
        if (path.match(/^\/api\/prompts\/add/)) {
            return true;
        }
        if (path.match(/^\/api\/apicredentials\/create$/)) {
            return true;
        }

        if (path.match(/^\/api\/blogs\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
            if (method === 'GET') return true;

            if (method === 'PUT' || method === 'DELETE') {
                const blogId = path.split('/')[3];
                const res = await fetch(`${process.env.AUTH0_BASE_URL}/api/blogs/${blogId}`);
                const blogData = await res.json();
                if (blogData.data?.author.email === user.email) return true;
                else return false;
            }

            if (method === 'POST') return false;

        }
        if (path.match(/^\/api\/blogs\/all/)) {
            return true;
        }

        return false;
    }

    return false
}
