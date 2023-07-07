import { AppDataSource } from "../data-source";
import { RealEstate, Schedule } from "../entities";
import { AppError } from "../errors/App.error";
import { ScheduleData } from "../interfaces/schedules.interface";

const createScheduleService = async (realEstateId: number, userId: number, payload: ScheduleData): Promise<any> => {
    const date: Date = new Date(payload.date);
    const daySchedule: number = date.getDay();
    const repoSchedule = AppDataSource.getRepository(Schedule);
    const repoRealEstate = AppDataSource.getRepository(RealEstate);

    if (daySchedule === 0 || daySchedule === 6) {
        throw new AppError("Invalid date, work days are monday to friday", 400);
    }

    const hourSchedule: number = Number(payload.hour.substring(0, 2));

    if (hourSchedule < 8 || hourSchedule > 18) {
        throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
    }

    const realEstate: RealEstate | null = await repoRealEstate.findOneBy({ id: realEstateId });

    if (!realEstate) {
        throw new AppError("RealEstate not found", 404);
    }

    const schedule: Schedule = repoSchedule.create({
        realEstate: realEstate,
        user: { id: userId },
        date: payload.date,
        hour: payload.hour,
    });

    await repoSchedule.save(schedule);

    return { message: "Schedule created" }

}

const getScheduleService = async (realEstateId: number): Promise<RealEstate> => {
    const repo = AppDataSource.getRepository(RealEstate);

    const realEstate: RealEstate | null = await repo.findOneBy({ id: realEstateId });

    if (!realEstate) throw new AppError("RealEstate not found", 404);

    const schedules: RealEstate | null = await repo.findOne({
        where: { id: realEstateId },
        relations: {
            schedules: {
                user: true,
            },
            address: true,
            category: true,
        },
    });

    return schedules!;
};
export default { createScheduleService, getScheduleService }
