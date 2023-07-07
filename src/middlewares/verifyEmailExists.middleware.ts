import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserRepo } from "../interfaces/users.interface";
import { User } from "../entities";
import { AppError } from "../errors/App.error";

const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const repo: UserRepo = AppDataSource.getRepository(User);
    const email: string = req.body.email;

    if (!email) return next();
    const emailExists: boolean = await repo.exist({ where: { email } });

    if (emailExists) throw new AppError("Email already exists", 409);

    return next();
};

export default verifyEmail;
