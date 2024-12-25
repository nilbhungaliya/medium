import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostSchema, updatePostSchema } from "unique-package-name";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    };
}>()

blogRouter.use("/*", async (c, next) => {
    try {
        // Extract the Authorization header
        const authHeader = c.req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return c.json({ error: "Unauthorized: Missing or malformed token" }, 401);
        }

        // Extract the token from the header
        const token = authHeader.split(" ")[1];

        // Verify the token
        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload || typeof payload.id !== "string") {
            return c.json({ error: "Unauthorized: Invalid token" }, 401);
        }

        // Attach the userId to the context for downstream handlers
        c.set("userId", payload.id);

        // Call the next middleware or route handler
        await next();
    } catch (error: any) {
        console.error("JWT verification error:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});

blogRouter.post('/post', async (c) => {
    const userId = c.get('userId'); // Assuming userId is set in the context
    if (!userId) {
        return c.json({ error: 'User ID is required' }, 400);
    }

    const body = await c.req.json();
    const { title, content } = body;

    if (!title || !content) {
        return c.json({ error: 'Title and content are required' }, 400);
    }

    const { success } = createPostSchema.safeParse(body);
    if (!success) {
        return c.json({ message: "something went wrong..." });
    }

    // Create a new PrismaClient instance for every request
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: userId,
                // authorId: "1",
            },
        });

        return c.json({
            id: post.id,
            message: 'Post created successfully',
        });
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Internal Server Error' }, 500);
    } finally {
        // Ensure Prisma client is disconnected after each request to avoid connection issues
        await prisma.$disconnect();
    }
});

blogRouter.put('/put', async (c) => {
    const userId = c.get('userId'); // Assuming userId is set in the context
    if (!userId) {
        return c.json({ error: 'User ID is required' }, 400);
    }

    const body = await c.req.json();

    const { success } = updatePostSchema.safeParse(body);
    if (!success) {
        return c.json({ message: "something went wrong..." });
    }

    // Create a new PrismaClient instance for every request
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });

        return c.json({
            post,
        });

    } catch (error) {
        console.error(error);
        return c.json({ error: 'Internal Server Error' }, 500);
    } finally {
        // Ensure Prisma client is disconnected after each request to avoid connection issues
        await prisma.$disconnect();
    }
});

blogRouter.get('/get/id/:id', async (c) => {
    const userId = c.get('userId'); // Assuming userId is set in the context
    if (!userId) {
        return c.json({ error: 'User ID is required' }, 400);
    }

    // const body = await c.req.json();
    const id = c.req.param("id");

    // Create a new PrismaClient instance for every request
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findUnique({
            where: {
                // id:body.id
                id: id
            }
        });

        return c.json({
            post,
        });

    } catch (error) {
        console.error(error);
        return c.json({ error: 'Internal Server Error' }, 500);
    } finally {
        // Ensure Prisma client is disconnected after each request to avoid connection issues
        await prisma.$disconnect();
    }
});

blogRouter.get('/bulk', async (c) => {
    // Create a new Prisma client instance
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        // Fetch all blog posts
        const posts = await prisma.post.findMany();

        return c.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return c.json({ error: 'Failed to fetch posts' }, 500);
    } finally {
        // Disconnect Prisma client to avoid connection leaks
        await prisma.$disconnect();
    }
});