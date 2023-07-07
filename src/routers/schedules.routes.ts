import { Router } from "express";
import validateBody from "../middlewares/validateBody.middleware";
import verifyToken from "../middlewares/verifyToken.middleware";
import { schedulesCreate } from "../schemas/schedules.schema";
import schedulesControllers from "../controllers/schedules.controllers";
import verifyUserSchedule from "../middlewares/verifyUserSchedules.middleware";
import verifySchedule from "../middlewares/verifySchedules.middleware";
import verifyAdmin from "../middlewares/verifyAdmin.middleware";
import verifyAdminToken from "../middlewares/verifyAdminToken.middleware";

const scheduleRouter: Router = Router();

scheduleRouter.post("", verifyToken, validateBody(schedulesCreate), verifySchedule, verifyUserSchedule, schedulesControllers.createSchedule);

scheduleRouter.get("/realEstate/:id", verifyToken, verifyAdminToken, verifyAdmin, schedulesControllers.getSchedule);

export default scheduleRouter;

