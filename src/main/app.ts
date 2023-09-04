import { Router } from "express";
import { listenExpress, startExpress } from "../external/routes/express";
import { UserFactory } from "./factories/user.factory";

const app = startExpress();

const router = Router();
new UserFactory(router);
app.use("/user", router);


listenExpress(app, 3000);