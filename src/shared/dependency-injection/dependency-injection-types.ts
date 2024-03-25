export const DependencyInjectionTypes = {
  PrismaClient  : Symbol.for("PrismaClient"),
  MailSender: Symbol.for("MailSender"),
  FileStorage: Symbol.for("FileStorage"),
  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
  FindByFilterUseCase: Symbol.for("FindByFilterUseCase"),
  UserRepository: Symbol.for("PrismaUserRepository"),
  Authenticator: Symbol.for("Authenticator"),
  UserController: Symbol.for("UserController"),
};
