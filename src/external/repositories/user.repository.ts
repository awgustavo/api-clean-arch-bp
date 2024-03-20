import { type UserData } from "../../entities/user/user.data";
import { CustomInjectable } from "../../shared/dependency-injection/dependency-injection";
import { BasePrismaRepository } from "./base-prisma.repository";

@CustomInjectable()
export class UserRepository extends BasePrismaRepository<UserData, UserData>{
  constructor (entityName: string = "user") {
    super(entityName);
  }
}
