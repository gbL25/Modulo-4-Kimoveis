import { NextFunction, Request, Response } from "express";
import { Category } from "../entities";
import { AppError } from "../errors/App.error";
import { CategoryRepo } from "../interfaces/categories.interface";
import { AppDataSource } from "../data-source";

const verifyCategoryExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const name: string = req.body.name;
    if (!name) return next();

    const repo: CategoryRepo = AppDataSource.getRepository(Category);
    const foundCategory: Category | null = await repo.findOneBy({ name });
    if (foundCategory) throw new AppError("Category already exists", 409);

    return next();
};

export default verifyCategoryExists;