import { createBlogZod, updateBlogZod } from "@ajithteja/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { z } from "zod";

export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRETE: string
    },
    Variables: {
        userId: string;
    }
}>()

type JwtPayload = {
    id: string;
};

blogRoute.use("/*", async (c, next) => {
    const authorization = c.req.header("authorization") || ""

    const user = await verify(authorization, c.env.JWT_SECRETE) as JwtPayload
    console.log("user", user)
    if (user) {
        c.set("userId", user.id)
        await next()
    } else {
        return c.json({
            message: "invalid credentials"
        })    
    }
})

blogRoute.post('/', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
    
        const body = await c.req.json()
        const userId = c.get("userId")

        const zodResult = createBlogZod.safeParse(body)
        if (!zodResult.success) {
            return c.json({
                message: "invalid inputs",
                error: zodResult.error.errors
            })
        }

        const postsData = await prisma.posts.create({
            data: {
                title: body.title,
                content: body.content,
                published: body.published,
                authorId: parseInt(userId)
            }
        })
    
        return c.json(postsData)    
    } catch (error) {
        console.log(error)
        return c.json({
            message: "invalid"
        })
    }
})

blogRoute.put('/', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
    
        const body = await c.req.json()

        const zodResult = updateBlogZod.safeParse(body)
        if (!zodResult.success) {
            return c.json({
                message: "invalid inputs",
                error: zodResult.error.errors
            })
        }
    
        const userExist = await prisma.user.findFirst({
            where: {
                id: body.authorId
            }
        })
    
        if (!userExist) {
            return c.json({
                message: "author not found"
            })
        }
    
        const postsData = await prisma.posts.update(
            {
                data: {
                    title: body.title,
                    content: body.content,
                    published: body.published,
                    authorId: body.authorId
                },
                where: {
                    id:  body.id
                }
            },
            
        )
    
        return c.json(postsData)    
    } catch (error) {
        console.log(error)
        return c.json({
            message: "invalid"
        })
    }
})

blogRoute.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
            
        const postsData = await prisma.posts.findMany({
            select: {
                content: true,
                title:true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        return c.json(postsData)    
    } catch (error) {
        console.log(error)
        return c.json({
            message: "invalid"
        })
    }
})

blogRoute.get('/:id', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
    
        const { id } = c.req.param()

        const postsData = await prisma.posts.findFirst({
            where: {
                id: parseInt(id)
            },
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                    
                }
            }
        })
    
        return c.json(postsData)    
    } catch (error) {
        console.log(error)
        return c.json({
            message: "invalid"
        })
    }
})
