import { UserData } from "../../entities/user.data";

export interface FindUser {
  findByFilter: (data: UserData) => Promise<UserData[]>
}
