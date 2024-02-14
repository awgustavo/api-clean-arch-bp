import * as dotenv from "dotenv";

import { listenExpress, startExpress } from "../external/routes/express";
import { listenGraphQL } from "../external/routes/graphql";
import { AuthFactory } from "./factories/auth.factory";
import { UserFactory } from "./factories/user.factory";

dotenv.config();

const app = startExpress();

const userFactory = new UserFactory();
app.use("/user", userFactory.httpRoutes);
const authFactory = new AuthFactory();
app.use("/auth", authFactory.httpRoutes);
listenExpress(app, 80);

listenGraphQL(
  [
    userFactory.graphQLRoute.getResolvers(),
    authFactory.graphQLRoute.getResolvers(),
  ],
  [
    userFactory.graphQLRoute.getTypeDefs(),
    authFactory.graphQLRoute.getTypeDefs(),
  ],
  4000);
