import { DisplayUserDTO } from "@/crud/DTOs";
import { Role } from "@prisma/client";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function verifyAccess(
    user: DisplayUserDTO,
    path: string,
    method: HttpMethod,
): Promise<boolean> {
    if (!user) {
        if (path.match(/^\/api\/services\/recent$/)) {
            return true;
        }
        if (path.match(/^\/api\/casestudies\/recent$/)) {
            return true;
        }
        if (path.match(/^\/api\/blogs\/home$/)) {
          return true;
        }
    }
    if (user.role === Role.SUPERUSER) return true;
    if (user.role === Role.ADMIN) return true;

    if (user.role === Role.USER) {
        if (
            path.match(
                /^\/api\/products\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            ) &&
            method === "GET"
        ) {
            return true;
        }

        if (path.match(/^\/api\/products\/all/)) {
            return true;
        }
        if (path.match(/^\/api\/users\/all/)) {
            return false;
        }

        if (path.match(/^\/api\/users\/[a-z0-9]{25,}$/) && method === "GET") {
            const userId = path.split("/")[3];
            if (userId === user.id) return true;
        }
        if (path.match(/^\/api\/users\/[a-z0-9]{25,}$/) && method === "PUT") {
            const userId = path.split("/")[3];
            if (userId === user.id) return true;
        }
        if (
            path.match(
                /^\/api\/services\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            ) &&
            method === "GET"
        ) {
            return true;
        }
        if (path.match(/^\/api\/services\/all/)) {
            return true;
        }
        if (
            path.match(
                /^\/api\/prompts\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            ) &&
            method === "GET"
        ) {
            return true;
        }
        if (path.match(/^\/api\/prompts\/all/) && method === "GET") {
            return true;
        }
        if (path.match(/^\/api\/prompts\/add/)) {
            return true;
        }
        if (path.match(/^\/api\/apicredentials\/create$/)) {
            return true;
        }

        if (path.match(/^\/api\/cart\/services\/[a-z0-9]{25,}$/)) {
          const userId = path.split("/")[4];
          return userId === user.id;
      }

        if (path.match(/^\/api\/cart\/services\/discount\/[a-z0-9]{25,}$/)) {
            const userId = path.split("/")[5];
            return userId === user.id;
        }

        if (
            path.match(
                /^\/api\/blogs\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            )
        ) {
            if (method === "GET") return true;

          if (method === "PUT" || method === "DELETE") {
              const blogId = path.split("/")[3];
              const res = await fetch(
                  `${process.env.AUTH0_BASE_URL}/api/blogs/${blogId}`,
              );
              const blogData = await res.json();
              if (blogData.data?.author.email === user.email) return true;
              else return false;
          }

            if (method === "POST") return false;
        }
        if (path.match(/^\/api\/blogs\/all/)) {
            return true;
        }
        if (path.match(/^\/api\/services\/recent$/)) {
            return true;
        }
        if (path.match(/^\/api\/casestudies\/recent$/)) {
            return true;
        }
        if (path.match(/^\/api\/blogs\/home$/)) {
          return true;
      }

        if (path.match(/^\/api\/services\/recent$/)) {
            return true;
        }
        if (path.match(/^\/api\/casestudies\/recent$/)) {
            return true;
        }
        if (path.match(/^\/api\/blogs\/home$/)) {
            return true;
        }
        if (path.match(/^\/api\/discounts/)) {
            return true;
        }

        return false;
    }

    return false;
}
