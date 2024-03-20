import { User } from "../../entities/user/user";
import { type UserData } from "../../entities/user/user.data";
import { UserError } from "../../entities/user/user.error";
import { DependencyInjectionTypes } from "../../shared/dependency-injection/dependency-injection-types";
import { CustomInject, CustomInjectable } from "../../shared/dependency-injection/dependency-injection";
import { BaseUseCase } from "../../shared/interfaces/base-use-case";
import { EmailMessages } from "../../shared/messages/email.messages";
import { ErrorMessages } from "../../shared/messages/error-messages";
import { BaseOrmRepository } from "../ports/base-orm.repository";
import { type FileStorage } from "../ports/file-storage";
import { MailSender } from "../ports/mail-sender.ts";
import { Authenticator } from "../ports/authentication";

@CustomInjectable()
export class CreateUserUseCase implements BaseUseCase<UserData, Promise<UserData>>  {
  public get userRepository(): BaseOrmRepository<UserData, UserData> {
    return this._userRepository;
  }

  constructor(
    @CustomInject(DependencyInjectionTypes.UserRepository)
    private readonly _userRepository: BaseOrmRepository<UserData, UserData>,
    @CustomInject(DependencyInjectionTypes.FileStorage)
    private readonly fileStorage: FileStorage,
    @CustomInject(DependencyInjectionTypes.MailSender)
    private readonly mailSender: MailSender,
    @CustomInject(DependencyInjectionTypes.Authenticator)
    private readonly authentication: Authenticator) {
  }

  async execute(user: UserData): Promise<UserData> {
    if (new User(user).isValid()) throw new UserError(ErrorMessages.USER_CREATION_ERROR);
    this.authentication.signUp(user.email, user.name, user.name);
    const createdUser = await this.userRepository.save(user);
    await this.mailSender.sendEmail([user.email], process.env.MAIL_SENDER_ACCOUNT, EmailMessages.SUBJECT_CONFIRMATION, EmailMessages.CONFIRMATION_CONTENT, null);
    await this.fileStorage.createFolder(user.email);
    return createdUser;
  }
}
