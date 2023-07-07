import { Router } from "express";
import categoriesControllers from "../controllers/categories.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { categoryCreate } from "../schemas/categories.schema";
import verifyAdmin from "../middlewares/verifyAdmin.middleware";
import verifyToken from "../middlewares/verifyToken.middleware";
import verifyCategoryExists from "../middlewares/verifyCategoryExists.middleware";

const categoriesRouter: Router = Router();

categoriesRouter.post("", validateBody(categoryCreate), verifyToken, verifyAdmin, verifyCategoryExists, categoriesControllers.createCategory);

categoriesRouter.get("", categoriesControllers.getCategory);

categoriesRouter.get("/:id/realEstate", categoriesControllers.getRealEstate);

export default categoriesRouter;