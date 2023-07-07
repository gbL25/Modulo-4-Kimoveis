import { Request, Response } from "express";
import realestateServices from "../services/realestate.services";

const createRealEstate = async (req: Request, res: Response) => {
    const payload = req.body;
    const savedRealEstate = await realestateServices.createRealEstateService(payload);
    return res.status(201).json(savedRealEstate);
};

const getRealEstate = async (req: Request, res: Response): Promise<Response> => {
    const realEstate = await realestateServices.getRealEstateService();
    return res.status(200).json(realEstate);
};

export default { createRealEstate, getRealEstate };
