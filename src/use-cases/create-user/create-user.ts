import { UserData } from "../../entities/user/user.data";

export interface CreateUser {
    createUser(data: UserData): Promise<UserData>;

    findByFilter(data: UserData): Promise<UserData[]>;
}
