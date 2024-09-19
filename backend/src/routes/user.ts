import { signinInputZod, signUpInputZod } from "@ajithteja/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRoute =  new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRETE: string
    }
}>()




userRoute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json()

    const zodResult = signUpInputZod.safeParse(body)
    if (!zodResult.success) {
      c.status(411)
      return c.json({
        message: "Validation failed",
        errors: zodResult.error.errors // Zod provides detailed errors
      });
    }
    // }


    try {
      const userData = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password
        }
      })
  
      const token = await sign({ id: userData.id }, c.env.JWT_SECRETE)
  
      return c.json({id: userData.id, token})
    } catch (error) {
      console.log(error)
      c.status(400)
      return c.text('Invalid')
    }
})
  


userRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())


    const body = await c.req.json()

    const zodResult = signinInputZod.safeParse(body)

    if (!zodResult.success) {
      return c.json({
        message: "Incorrect inputs",
        error: zodResult.error.errors
      })
    }


    const userData = await prisma.user.findFirst({
        where: {
        email: body.email,
        password: body.password
        }
    })

    if (userData) {
      try {
        const token = await sign({ id: userData.id }, c.env.JWT_SECRETE)
        return c.json({ id: userData.id, token })
      } catch (error) {
        console.log(error)
      }
        
    } else{
        c.status(400)
        return c.text('Invalid')
    }
})
