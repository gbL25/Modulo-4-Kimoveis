import "express-async-errors";
import "reflect-metadata";
import express, { Application, json } from "express";
import handleError from "./middlewares/handleError.middleware";
import userRouter from "./routers/users.router";
import loginRouter from "./routers/login.router";
import categoriesRouter from "./routers/categories.routes";
import realEstateRouter from "./routers/realestate.route";
import scheduleRouter from "./routers/schedules.routes";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);

app.use("/login", loginRouter);

app.use("/categories", categoriesRouter);

app.use("/realEstate", realEstateRouter);

app.use("/schedules", scheduleRouter);

app.use(handleError);

export default app;
