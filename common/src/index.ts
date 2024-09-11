import { z } from "zod";

export const signUpInputZod = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }),
})

export const signinInputZod = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }),
})

export const createBlogZod = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
    // authorId: z.number()
})

export const updateBlogZod = z.object({
    id: z.number(),
    title: z.string().optional(),
    content: z.string().optional(),
    // published: z.boolean(),
})

export type SignUpInputType = z.infer<typeof signUpInputZod>
export type SignInInputType = z.infer<typeof signinInputZod>
export type CreateBlogType = z.infer<typeof createBlogZod>
export type UpdateBlogType = z.infer<typeof updateBlogZod>

