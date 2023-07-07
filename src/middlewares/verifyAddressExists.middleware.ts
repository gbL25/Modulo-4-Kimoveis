import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Address } from "../entities";
import { AppError } from "../errors/App.error";

const verifyAddressExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const requestAddress = req.body.address;
    const repo = AppDataSource.getRepository(Address);

    if (requestAddress.number) {
        const findAddress = await repo.findOne({
            where: {
                street: requestAddress.street,
                zipCode: requestAddress.zipCode,
                city: requestAddress.city,
                state: requestAddress.state,
                number: requestAddress.number,
            },
        });

        if (findAddress) {
            throw new AppError("Address already exists", 409);
        }
    } else {
        const findAddress = await repo.findOne({
            where: {
                street: requestAddress.street,
                zipCode: requestAddress.zipCode,
                city: requestAddress.city,
                state: requestAddress.state,
            },
        });
    }

    return next();
};

export default verifyAddressExists;