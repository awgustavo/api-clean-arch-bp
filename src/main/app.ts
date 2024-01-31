import * as dotenv from "dotenv";

import { listenExpress, startExpress } from "../external/routes/express";
import { UserFactory } from "./factories/user.factory";

dotenv.config();

const app = startExpress();

const userFactory = new UserFactory();
app.use("/user", userFactory.routes);

listenExpress(app, 80);
