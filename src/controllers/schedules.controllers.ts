import { Request, Response } from "express";
import schedulesServices from "../services/schedules.services";

const createSchedule = async (req: Request, res: Response) => {
    const { realEstateId, ...payload } = req.body;
    const userId = res.locals.decoded.sub;
    const savedRealEstate = await schedulesServices.createScheduleService(realEstateId, userId, payload);

    return res.status(201).json(savedRealEstate);
};

const getSchedule = async (req: Request, res: Response): Promise<Response> => {
    const realEstateId: number = Number(req.params.id);
    const schedule = await schedulesServices.getScheduleService(realEstateId);
    return res.status(200).json(schedule);
};

export default { createSchedule, getSchedule };