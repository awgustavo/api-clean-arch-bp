import { type UserData } from "../../entities/user/user.data";
import { BaseUseCase } from "../../shared/interfaces/base-use-case";
import { BaseOrmRepository } from "../ports/base-orm.repository";

export class FindByFilterUseCase implements BaseUseCase<UserData,Promise<UserData[]>> {
  constructor (private readonly userRepository: BaseOrmRepository<UserData, UserData>) {
  }

  async execute (user: UserData): Promise<UserData[]> {
    const users = await this.userRepository.findByFilter(user);
    return users;
  }
}
