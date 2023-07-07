import { AppDataSource } from "../data-source"
import { User } from "../entities";
import { UserCreate, UserGetAll, UserRepo, UserReturn, UserUpdate } from "../interfaces/users.interface";
import { userGetAll, userReturn } from "../schemas/users.schema";

const createUserService = async (payload: UserCreate): Promise<UserReturn> => {
    const repo: UserRepo = AppDataSource.getRepository(User);
    const user: User = repo.create(payload);
    await repo.save(user)
    return userReturn.parse(user);
}

const getUserService = async (admin: boolean): Promise<UserGetAll> => {
    if (admin) {
        const repo: UserRepo = AppDataSource.getRepository(User);
        const users: Array<User> = await repo.find({ withDeleted: true });
        return userGetAll.parse(users);
    }
    const repo: UserRepo = AppDataSource.getRepository(User);
    return userGetAll.parse(await repo.find());
}

const updateUserService = async (user: User, payload: UserUpdate): Promise<UserReturn> => {
    const repo: UserRepo = AppDataSource.getRepository(User);
    const userUpdateService = await repo.save({ ...user, ...payload });

    return userReturn.parse(userUpdateService);
}

const deleteUserService = async (user: User): Promise<void> => {
    const repo: UserRepo = AppDataSource.getRepository(User);
    await repo.softRemove(user);
}

export default { createUserService, getUserService, updateUserService, deleteUserService }