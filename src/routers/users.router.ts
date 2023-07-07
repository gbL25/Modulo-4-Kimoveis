import { Router } from "express";
import usersControllers from "../controllers/users.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import verifyEmail from "../middlewares/verifyEmailExists.middleware";
import { userCreate, userUpdate } from "../schemas/users.schema";
import verifyToken from "../middlewares/verifyToken.middleware";
import verifyAdmin from "../middlewares/verifyAdmin.middleware";
import verifyIdExists from "../middlewares/verifyIdExists.middleware";

const userRouter: Router = Router();

userRouter.post("", validateBody(userCreate), verifyEmail, usersControllers.createUser);

userRouter.get("", verifyToken, verifyAdmin, usersControllers.getUser);

userRouter.patch("/:id", validateBody(userUpdate), verifyToken, verifyIdExists, verifyAdmin, usersControllers.updateUser);

userRouter.delete("/:id", verifyIdExists, verifyToken, verifyAdmin, usersControllers.deleteUser);

export default userRouter;