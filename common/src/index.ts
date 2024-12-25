import z from "zod";

// Signup validation schema with enhanced password validation and trimmed email
export const signupSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password is too long"),
  name: z.string().optional(), // Optional name with trimming
});

export type SignupType = z.infer<typeof signupSchema>;

// Signin validation schema
export const signinSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password is too long"),
});

export type SigninType = z.infer<typeof signinSchema>;

// Create post validation schema
export const createPostSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  content: z.string().min(1, "Content cannot be empty"),
});

export type CreatePostType = z.infer<typeof createPostSchema>;

// Update post validation schema (optional fields)
export const updatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.string()
});

export type UpdatePostType = z.infer<typeof updatePostSchema>;
