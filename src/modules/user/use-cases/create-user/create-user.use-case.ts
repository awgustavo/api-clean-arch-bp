import { FileStorage } from "../../../../use-cases/ports/file-storage";
import { type UserRepository } from "../../../../use-cases/ports/user.repository";
import { User } from "../../entities/user";
import { UserData } from "../../entities/user.data";
import { UserError } from "../../entities/user.error";
import { type CreateUser } from "./create-user";

export class CreateUserUseCase implements CreateUser {
  constructor (private readonly userRepository: UserRepository, private readonly fileStorage: FileStorage) {

  }

  async findByFilter (user: UserData): Promise<UserData[]> {
    const users = await this.userRepository.findByFilter(user);
    return users;
  }

  async createUser (user: UserData): Promise<UserData> {
    if (new User(user).isValid()) throw new UserError("User not valid");
    const createdUser = await this.userRepository.save(user);
    await this.fileStorage.createFolder(user.email);
    return createdUser;
  }
}
