import { UserController } from "../../adapters/controllers/user.controller";
import { ResendProvider } from "../../external/providers/mail-sender/resend.provider";
import { AwsS3FileStorage } from "../../external/providers/storage/aws-s3.provider";
import { PrismaUserRepository } from "../../external/repositories/prisma.user.repository";
import { UserRoutes } from "../../external/routes/express/user.routes";
import { AuthGraphQLRoutes } from "../../external/routes/graphql/auth.routes";
import { CreateUserUseCase } from "../../use-cases/user/create-user.use-case";
import { FindByFilterUseCase } from "../../use-cases/user/find-by-filter.use-case";

export class AuthFactory {
  public httpRoutes;
  public graphQLRoute;
  public repository;

  constructor () {
    this.repository = new PrismaUserRepository();
    const fileStorage = new AwsS3FileStorage();

    const mailSenderResend = new ResendProvider();
    const createUserUseCase = new CreateUserUseCase(this.repository, fileStorage, mailSenderResend);
    const findByFilterUserUseCase = new FindByFilterUseCase(this.repository);
    const userController = new UserController(createUserUseCase, findByFilterUserUseCase);
    this.httpRoutes = new UserRoutes(userController).registerRoutes();
    this.graphQLRoute = new AuthGraphQLRoutes(userController);
  }
}
