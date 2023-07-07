import { z } from "zod";
import { category } from "./categories.schema";

const realestate = z.object({
    id: z.number().positive(),
    value: z.string().or(z.number()).default(0),
    size: z.number().int().positive(),
    address: z.object({
        id: z.number(),
        street: z.string().max(45),
        zipCode: z.string().max(8),
        number: z.string().max(7).nullish(),
        city: z.string().max(20),
        state: z.string().max(2),
    }),
    category: category,
    sold: z.boolean().default(() => false),
    createdAt: z.string(),
    updatedAt: z.string(),
})

const realEstateCreate = z.object({
    value: z.string().or(z.number()).default(0),
    size: z.number().int().positive(),
    address: z.object({
        street: z.string().max(45),
        zipCode: z.string().max(8),
        number: z.string().max(7).nullish(),
        city: z.string().max(20),
        state: z.string().max(2),
    }),
    categoryId: z.number().int()
})

const realEstateRead = realestate.array();

export { realestate, realEstateCreate, realEstateRead };
