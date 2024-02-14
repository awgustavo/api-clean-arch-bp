import { UserController } from "../../adapters/controllers/user.controller";
import { AwsS3FileStorage } from "../../external/providers/storage/aws-s3.provider";
import { PrismaUserRepository } from "../../external/repositories/prisma.user.repository";
import { UserRoutes } from "../../external/routes/express/user.routes";
import { UserGraphQLRoutes } from "../../external/routes/graphql/user.routes";
import { CreateUserUseCase } from "../../use-cases/create-user/create-user.use-case";

export class UserFactory {
  public httpRoutes;
  public graphQLRoute;
  public repository;

  constructor () {
    this.repository = new PrismaUserRepository();
    const fileStorage = new AwsS3FileStorage();
    const createUserUseCase = new CreateUserUseCase(this.repository, fileStorage);
    const userController = new UserController(createUserUseCase);
    this.httpRoutes = new UserRoutes(userController).registerRoutes();
    this.graphQLRoute = new UserGraphQLRoutes(userController);
  }
}
