import { NextFunction, Request, Response } from "express";
import { Schedule } from "../entities";
import { AppError } from "../errors/App.error";
import { AppDataSource } from "../data-source";

const verifyUserSchedule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id: number = res.locals.decoded.sub;
  const date: Date | string = req.body.date;
  const hour: Date | string = req.body.hour;
  const repo = AppDataSource.getRepository(Schedule);

  const userSchedules: Schedule | null = await repo
    .createQueryBuilder("schedules")
    .where("schedules.userId = :userId", { userId: id })
    .andWhere("schedules.date = :date", { date: date })
    .andWhere("schedules.hour = :hour", { hour: hour })
    .getOne();

  if (userSchedules) throw new AppError("User schedule to this real estate at this date and time already exists", 409);

  return next();
}

export default verifyUserSchedule;