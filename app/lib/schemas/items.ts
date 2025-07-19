import { z } from "zod";

export const createItemSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(100, { message: "Name must be at most 100 characters" }),
    description: z
        .string()
        .min(1, { message: "Description is required" })
        .max(1000, { message: "Description must be at most 1000 characters" }),
});

// Type for the schema output
export type CreateItemSchema = z.infer<typeof createItemSchema>;

// Type for items from the database
export type Item = {
    id: number;
    created_at: string;
    name: string;
    description: string;
    user_id?: string;
};
