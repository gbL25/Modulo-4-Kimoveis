import { user } from "./users.schema";

const loginSchema = user.pick({ email: true, password: true });

export { loginSchema };