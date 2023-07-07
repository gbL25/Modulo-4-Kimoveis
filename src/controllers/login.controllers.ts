import { Request, Response } from "express";
import { LoginReturn } from "../interfaces/login.interface";
import loginServices from "../services/login.services";

const login = async (req: Request, res: Response): Promise<Response> => {
  const token: LoginReturn = await loginServices.loginService(req.body);
  return res.status(200).json(token);
};

export default { login };