import { UserData } from "../../entities/user.data";

export interface CreateUser {
  createUser: (data: UserData) => Promise<UserData>

  findByFilter: (data: UserData) => Promise<UserData[]>
}
