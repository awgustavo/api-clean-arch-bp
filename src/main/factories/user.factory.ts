import { Router } from "express";
import { UserController } from "../../adapters/controllers/user.controller";
import { AwsS3FileStorage } from "../../external/providers/storage/aws-s3.provider";
import { PrismaUserRepository } from "../../external/repositories/prisma.user.repository";
import { UserRoutes } from "../../external/routes/express/user.routes";
import { CreateUserUseCase } from "../../use-cases/create-user/create-user.use-case";


export class UserFactory {
    constructor(private router: Router) {
        const userRepository = new PrismaUserRepository();
        const fileStorage = new AwsS3FileStorage();
        const createUserUseCase = new CreateUserUseCase(userRepository, fileStorage);
        const userController = new UserController(createUserUseCase);
        new UserRoutes(userController, this.router).registerRoutes();
    }
}

