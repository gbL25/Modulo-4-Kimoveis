import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";

type Login = z.infer<typeof loginSchema>;

type LoginReturn = { token: string };

export { Login, LoginReturn };