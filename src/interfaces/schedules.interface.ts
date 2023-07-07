import { z } from "zod";
import { Repository } from "typeorm";
import { Schedule } from "../entities";
import { schedulesCreate, schedulesData, schedulesRead } from "../schemas/schedules.schema";

type ScheduleCreate = z.infer<typeof schedulesCreate>;

type ScheduleRead = z.infer<typeof schedulesRead>;

type ScheduleData = z.infer<typeof schedulesData>;

type ScheduleRepo = Repository<Schedule>;

export { ScheduleCreate, ScheduleRead, ScheduleRepo, ScheduleData };