import { Request, Response } from "express";
import { Category } from "../entities";
import categoriesServices from "../services/categories.services";

const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const category: Category = await categoriesServices.createCategoryService(req.body);
  return res.status(201).json(category);
};

const getCategory = async (req: Request, res: Response): Promise<Response> => {
  const category = await categoriesServices.getCategoryService();
  return res.status(200).json(category);
};

const getRealEstate = async (req: Request, res: Response): Promise<Response> => {
  const categoryId: number = Number(req.params.id);
  const category = await categoriesServices.getCategoryRealEstate(categoryId);
  return res.status(200).json(category);
};

export default { createCategory, getCategory, getRealEstate };

