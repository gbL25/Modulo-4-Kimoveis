import { z } from "zod";

const schedules = z.object({
    id: z.number().positive(),
    date: z.string().max(45),
    hour: z.string(),
    realEstateId: z.number(),
    userId: z.number(),
});

const schedulesData = schedules.omit({ id: true, realEstateId: true, userId: true });

const schedulesCreate = schedules.omit({ id: true, userId: true });

const schedulesRead = schedules.array();

export { schedules, schedulesCreate, schedulesRead, schedulesData };