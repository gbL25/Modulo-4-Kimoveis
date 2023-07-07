import { z } from "zod";
import { Repository } from "typeorm";
import { realEstateCreate, realEstateRead, realestate } from "../schemas/realestate.schema";
import { RealEstate } from "../entities";

type RealEstateCreate = z.infer<typeof realEstateCreate>;

type RealEstateReturn = z.infer<typeof realestate>;

type RealEstateRead = z.infer<typeof realEstateRead>;

type RealEstateRepo = Repository<RealEstate>;

export { RealEstateCreate, RealEstateRead, RealEstateRepo, RealEstateReturn };