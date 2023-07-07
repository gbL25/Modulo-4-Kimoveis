import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/App.error";
import { UserRepo } from "../interfaces/users.interface";
import { User } from "../entities";

const verifyIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId: number = Number(req.params.id);
    const repo: UserRepo = AppDataSource.getRepository(User);
    const user: User | null = await repo.findOneBy({ id: userId });

    if (!user) throw new AppError("User not found", 404);

    res.locals = {...res.locals, user }

    return next();
}

export default verifyIdExists;