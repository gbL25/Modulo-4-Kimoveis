import { Request, Response } from "express";
import usersServices from "../services/users.services";
import { UserGetAll, UserReturn, UserUpdate } from "../interfaces/users.interface";
import { User } from "../entities";

const createUser = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await usersServices.createUserService(req.body);
    return res.status(201).json(user);
}

const getUser = async (req: Request, res: Response): Promise<Response> => {
    const admin: boolean = res.locals.decoded.admin;
    const users: UserGetAll = await usersServices.getUserService(admin);
    return res.status(200).json(users);
}

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const payload: UserUpdate = req.body;

    const foundUser: User = res.locals.user;

    const user = await usersServices.updateUserService(foundUser, payload);
    return res.status(200).json(user);
}

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    await usersServices.deleteUserService(res.locals.user);
    return res.status(204).json();
}

export default { createUser, getUser, updateUser, deleteUser };