import { compare } from "bcryptjs";
import { User } from "../entities";
import { AppError } from "../errors/App.error";
import { sign } from "jsonwebtoken";
import { Login, LoginReturn } from "../interfaces/login.interface";
import { UserRepo } from "../interfaces/users.interface";
import { AppDataSource } from "../data-source";

const loginService = async ({ email, password }: Login): Promise<LoginReturn> => {
    const repo: UserRepo = AppDataSource.getRepository(User);
    const foundUser: User | null = await repo.findOneBy({ email });
    if (!foundUser) {
        throw new AppError("Invalid credentials", 401);
    }

    const samePwd: boolean = await compare(password, foundUser.password);

    if (!samePwd) {
        throw new AppError("Invalid credentials", 401);
    }

    const token: string = sign(
        { admin: foundUser.admin },
        process.env.SECRET_KEY!,
        { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! }
    );

    return { token };
};

export default { loginService };