import { CategoryCreate, CategoryRead, CategoryRepo } from "../interfaces/categories.interface";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { categoryRead } from "../schemas/categories.schema";
import { AppError } from "../errors/App.error";

const createCategoryService = async (payload: CategoryCreate): Promise<Category> => {
    const repo: CategoryRepo = AppDataSource.getRepository(Category);
    const category: Category = repo.create(payload);
    await repo.save(category);

    return category;
};

const getCategoryService = async (): Promise<CategoryRead> => {
    const repo: CategoryRepo = AppDataSource.getRepository(Category);
    const categories: Array<Category> = await repo.find();

    return categoryRead.parse(categories);
};

const getCategoryRealEstate = async (categoryId: number): Promise<any> => {
    const repo = AppDataSource.getRepository(Category);
    const category = await repo.findOne({
        where: { id: categoryId },
        relations: {
            realEstate: true,
        },
    });

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    return category;
};

export default { createCategoryService, getCategoryService, getCategoryRealEstate };
