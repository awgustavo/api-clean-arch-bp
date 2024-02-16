import { UserController } from "../../adapters/controllers/user.controller";
//import { AwsS3FileStorage } from "../../external/providers/storage/aws-s3.provider";
import { AzureStorageFileStorage } from "../../external/providers/storage/azure-storage.provider";
import { PrismaUserRepository } from "../../external/repositories/prisma.user.repository";
import { UserRoutes } from "../../external/routes/express/user.routes";
import { UserGraphQLRoutes } from "../../external/routes/graphql/user.routes";
import { CreateUserUseCase } from "../../use-cases/user/create-user.use-case";
import { FindByFilterUseCase } from "../../use-cases/user/find-by-filter.use-case";

export class UserFactory {
  public httpRoutes;
  public graphQLRoute;
  public repository;

  constructor () {
    this.repository = new PrismaUserRepository();
    const fileStorage = new AzureStorageFileStorage();
    const createUserUseCase = new CreateUserUseCase(this.repository, fileStorage);
    const findByFilterUserUseCase = new FindByFilterUseCase(this.repository);
    const userController = new UserController(createUserUseCase, findByFilterUserUseCase);
    this.httpRoutes = new UserRoutes(userController).registerRoutes();
    this.graphQLRoute = new UserGraphQLRoutes(userController);
  }
}
