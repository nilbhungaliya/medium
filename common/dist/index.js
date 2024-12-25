"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema = exports.createPostSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// Signup validation schema with enhanced password validation and trimmed email
exports.signupSchema = zod_1.default.object({
    email: zod_1.default.string().email("Invalid email address").trim(),
    password: zod_1.default.string().min(6, "Password must be at least 6 characters").max(50, "Password is too long"),
    name: zod_1.default.string().optional(), // Optional name with trimming
});
// Signin validation schema
exports.signinSchema = zod_1.default.object({
    email: zod_1.default.string().email("Invalid email address").trim(),
    password: zod_1.default.string().min(6, "Password must be at least 6 characters").max(50, "Password is too long"),
});
// Create post validation schema
exports.createPostSchema = zod_1.default.object({
    title: zod_1.default.string().min(1, "Title cannot be empty"),
    content: zod_1.default.string().min(1, "Content cannot be empty"),
});
// Update post validation schema (optional fields)
exports.updatePostSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
    id: zod_1.default.string()
});
