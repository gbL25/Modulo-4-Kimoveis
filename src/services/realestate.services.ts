import { AppDataSource } from "../data-source";
import { Address, Category, RealEstate } from "../entities";
import { AppError } from "../errors/App.error";
import { RealEstateCreate, RealEstateReturn } from "../interfaces/realestate.interface";

const createRealEstateService = async (payload: RealEstateCreate): Promise<RealEstateReturn> => {
  const { address, categoryId, ...realEstateBody } = payload;
  const repoCategory = AppDataSource.getRepository(Category);
  const repoRealEstate = AppDataSource.getRepository(RealEstate);
  const repoAddress = AppDataSource.getRepository(Address);

  const createAddress = repoAddress.create(address);
  await repoAddress.save(createAddress);

  const foundCategoryId = await repoCategory.findOne({ where: { id: Number(categoryId) } });

  if (!foundCategoryId) {
    throw new AppError("Category not found", 404);
  }

  const createRealEstate = repoRealEstate.create({ ...realEstateBody, address: createAddress, category: foundCategoryId });

  await repoRealEstate.save(createRealEstate);

  return createRealEstate;
};

const getRealEstateService = async (): Promise<RealEstate[]> => {
  const repo = AppDataSource.getRepository(RealEstate);
  const realEstate: RealEstate[] = await repo.find({
    relations: {
      address: true,
    },
  });
  return realEstate;
};

export default { createRealEstateService, getRealEstateService }
