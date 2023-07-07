import { DeepPartial, Repository } from "typeorm";
import { userCreate, userReturn, userGetAll } from "../schemas/users.schema";
import { z } from "zod";
import { User } from "../entities";

type UserCreate = z.infer<typeof userCreate>;

type UserUpdate = DeepPartial<User>;

type UserReturn = z.infer<typeof userReturn>;

type UserGetAll = z.infer<typeof userGetAll>;

type UserRepo = Repository<User>;

export { UserCreate, UserUpdate, UserReturn, UserGetAll, UserRepo };