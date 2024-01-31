import { type UserData } from "../../entities/user/user.data";

export interface UserRepository {
  findByFilter: (filter: UserData) => Promise<UserData[]>
  save: (data: UserData) => Promise<UserData>
}
