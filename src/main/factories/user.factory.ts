import { UserController } from "../../adapters/controllers/user.controller";
import { UserRoutes } from "../../external/routes/express/user.routes";
import { UserGraphQLRoutes } from "../../external/routes/graphql/user.routes";
import { container } from "../dependency-injection/dependency-injection-container";
import { DependencyInjectionTypes } from "../../shared/dependency-injection/dependency-injection-types";

export class UserFactory {
  public httpRoutes;
  public graphQLRoute;
  public repository;

  constructor () {
    const userController = container.get<UserController>(DependencyInjectionTypes.UserController);
    this.httpRoutes = new UserRoutes(userController).registerRoutes();
    this.graphQLRoute = new UserGraphQLRoutes(userController);
  }
}
