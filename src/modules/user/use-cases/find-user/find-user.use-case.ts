

import { UserRepository } from "../../../../use-cases/ports/user.repository";
import { UserData } from "../../entities/user.data";
import { FindUser } from "./find-user";

export class FindUserUseCase implements FindUser {
  constructor (private readonly userRepository: UserRepository) {

  }

  async findByFilter (user: UserData): Promise<UserData[]> {
    const users = await this.userRepository.findByFilter(user);
    return users;
  }
}
