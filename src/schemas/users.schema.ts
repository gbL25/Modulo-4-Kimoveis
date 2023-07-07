import { z } from "zod";

const user = z.object({
    id: z.number().positive(),
    name: z.string().max(45),
    email: z.string().max(45).email(),
    password: z.string().max(120),
    admin: z.boolean().default(() => false),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullish(),
});

const userCreate = user.omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true });

const userUpdate = userCreate.partial().omit({ id: true, admin: true });

const userReturn = user.omit({ password: true });

const userGetAll = userReturn.array();

export { user, userCreate, userUpdate, userReturn, userGetAll };