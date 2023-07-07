import { Router } from "express";
import realestateControllers from "../controllers/realestate.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { realEstateCreate } from "../schemas/realestate.schema";
import verifyToken from "../middlewares/verifyToken.middleware";
import verifyAdmin from "../middlewares/verifyAdmin.middleware";
import verifyAddressExists from "../middlewares/verifyAddressExists.middleware";

const realEstateRouter: Router = Router();

realEstateRouter.post("", validateBody(realEstateCreate), verifyToken, verifyAdmin, verifyAddressExists, realestateControllers.createRealEstate);

realEstateRouter.get("", realestateControllers.getRealEstate);

export default realEstateRouter;