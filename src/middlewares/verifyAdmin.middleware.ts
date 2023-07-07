import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/App.error";

const verifyAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const admin: boolean = res.locals.decoded.admin;
  const id = req.params.id;
  const sub = res.locals.decoded.sub;

  if (admin) {
    return next();
  }

  if (id !== sub) throw new AppError("Insufficient permission", 403);

  return next();
};

export default verifyAdmin;