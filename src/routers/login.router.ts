import { Router } from "express";
import loginControllers from "../controllers/login.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { loginSchema } from "../schemas/login.schema";

const loginRouter: Router = Router();

loginRouter.post("",validateBody(loginSchema), loginControllers.login);

export default loginRouter;