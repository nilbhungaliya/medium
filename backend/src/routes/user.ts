import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import {signinSchema, signupSchema} from "unique-package-name";
import { cors } from "hono/cors";

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();

userRouter.use("/*", cors());

userRouter.post("/signup", async (c) => {
  // Initialize Prisma client with the accelerate extension
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    // Validate request body
    if (!body.email || !body.password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const {success} = signupSchema.safeParse(body);
    if (!success) {
      return c.json({ message: "Invalid email or password" });
    }

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password, // Store hashed password
      },
    });

    // Generate a JWT token
    const token = await sign({id : user.id }, c.env.JWT_SECRET);
    return c.json({token});
  } catch (error: any) {

    // Handle unique constraint violation (e.g., duplicate email)
    if (error.code === "P2002") {
      return c.json({ error: "Email is already in use" }, 409);
    }

    return c.json({ message: "Internal server error", error}, 500);
  } finally {
    // Ensure Prisma client is properly disconnected
    await prisma.$disconnect();
  }
});

userRouter.post("/signin", async (c) => {
  // Initialize Prisma client with the accelerate extension
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    // Validate request body
    if (!body.email || !body.password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const {success} = signinSchema.safeParse(body);
    if (!success) {
      return c.json({ message: "Invalid email or password" });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    // Check if user exists
    if (!user) {
      return c.json({ error: "Invalid email or password" }, 403);
    }

    // Generate JWT token
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  } finally {
    // Ensure Prisma client is properly disconnected
    await prisma.$disconnect();
  }
});