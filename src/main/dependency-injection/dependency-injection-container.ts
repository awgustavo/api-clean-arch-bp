import { Container } from "inversify";
import { ResendProvider } from "../../external/providers/mail-sender/resend.provider";
import { AwsS3FileStorage } from "../../external/providers/storage/aws-s3.provider";
import { FileStorage } from "../../use-cases/ports/file-storage";
import { MailSender } from "../../use-cases/ports/mail-sender.ts";
import { DependencyInjectionTypes } from "../../shared/dependency-injection/dependency-injection-types";
import { BasePrismaRepository } from "../../external/repositories/base-prisma.repository";
import { UserRepository } from "../../external/repositories/user.repository";
import { UserData } from "../../entities/user/user.data";
import { Authenticator } from "../../use-cases/ports/authentication";
import { SupabaseAuthProvider } from "../../external/providers/authentication/supabase";

import { BaseUseCase } from "../../shared/interfaces/base-use-case";
import { BaseController } from "../../shared/interfaces/base-controller";
import { CreateUserUseCase } from "../../use-cases/user/create-user.use-case";
import { FindByFilterUseCase } from "../../use-cases/user/find-by-filter.use-case";
import { UserController } from "../../adapters/controllers/user.controller";
//import { Auth0Provider } from "../../external/providers/authentication/auth0";
import { PrismaClient } from "@prisma/client";

const container = new Container();

container.bind<PrismaClient>(DependencyInjectionTypes.PrismaClient).toConstantValue(new PrismaClient());
// Providers
container.bind<FileStorage>(DependencyInjectionTypes.FileStorage).to(AwsS3FileStorage).inSingletonScope();
container.bind<MailSender>(DependencyInjectionTypes.MailSender).to(ResendProvider).inSingletonScope();
container.bind<Authenticator>(DependencyInjectionTypes.Authenticator).to(SupabaseAuthProvider).inSingletonScope();

// Repositories
container.bind<BasePrismaRepository<UserData, UserData>>(DependencyInjectionTypes.UserRepository).to(UserRepository).inSingletonScope();

//Use Cases
container.bind<BaseUseCase<UserData, Promise<UserData>>>(DependencyInjectionTypes.CreateUserUseCase).to(CreateUserUseCase).inSingletonScope();
container.bind<BaseUseCase<UserData, Promise<UserData[]>>>(DependencyInjectionTypes.FindByFilterUseCase).to(FindByFilterUseCase).inSingletonScope();

// Controllers
container.bind<BaseController>(DependencyInjectionTypes.UserController).to(UserController);

export { container };
