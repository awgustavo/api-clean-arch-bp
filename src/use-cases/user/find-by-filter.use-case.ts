import { type UserData } from "../../entities/user/user.data";
import { CustomInject, CustomInjectable } from "../../shared/dependency-injection/dependency-injection";
import { DependencyInjectionTypes } from "../../shared/dependency-injection/dependency-injection-types";
import { BaseUseCase } from "../../shared/interfaces/base-use-case";
import { BaseOrmRepository } from "../ports/base-orm.repository";

@CustomInjectable()
export class FindByFilterUseCase implements BaseUseCase<UserData,Promise<UserData[]>> {
  constructor (
    @CustomInject(DependencyInjectionTypes.UserRepository)
    private readonly userRepository: BaseOrmRepository<UserData, UserData>) {
  }

  async execute (user: UserData): Promise<UserData[]> {
    const users = await this.userRepository.findByFilter(user);
    return users;
  }
}
