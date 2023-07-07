import { z } from "zod";
import { Repository } from "typeorm";
import { Category } from "../entities";
import { categoryCreate, categoryRead } from "../schemas/categories.schema";

type CategoryCreate = z.infer<typeof categoryCreate>;

type CategoryRead = z.infer<typeof categoryRead>;

type CategoryRepo = Repository<Category>;

export { CategoryRepo, CategoryCreate, CategoryRead };