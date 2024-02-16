import { User } from "../../entities/user/user";
import { type UserData } from "../../entities/user/user.data";
import { UserError } from "../../entities/user/user.error";
import { BaseUseCase } from "../../shared/interfaces/base-use-case";
import { ErrorMessages } from "../../shared/messages/error-messages";
import { BaseOrmRepository } from "../ports/base-orm.repository";
import { type FileStorage } from "../ports/file-storage";

export class CreateUserUseCase implements BaseUseCase<UserData, Promise<UserData>>  {

  constructor (private readonly userRepository: BaseOrmRepository<UserData, UserData>,
               private readonly fileStorage: FileStorage) {
  }

  async execute (user: UserData): Promise<UserData> {
    if (new User(user).isValid()) throw new UserError(ErrorMessages.USER_CREATION_ERROR);
    const createdUser = await this.userRepository.save(user);
    await this.fileStorage.createFolder(user.email);
    return createdUser;
  }
}
