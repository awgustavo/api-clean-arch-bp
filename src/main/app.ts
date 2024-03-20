import "reflect-metadata";
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
listenExpress(app, parseInt(process.env.API_PORT) || 80);

listenGraphQL(
  [
    userFactory.graphQLRoute.getResolvers(),
    authFactory.graphQLRoute.getResolvers(),
  ],
  [
    userFactory.graphQLRoute.getTypeDefs(),
    authFactory.graphQLRoute.getTypeDefs(),
  ],
  parseInt(process.env.GRAPHQL_PORT) || 4000
);
