import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user.data";
import { UserError } from "../../entities/user/user.error";
import { FileStorage } from "../ports/file-storage";
import { UserRepository } from "../ports/user.repository";
import { CreateUser } from "./create-user";

export class CreateUserUseCase implements CreateUser {
    constructor(private userRepository: UserRepository, private fileStorage: FileStorage) {

    }
    async findByFilter(user: UserData): Promise<UserData[]> {
        const users = await this.userRepository.findByFilter(user);
        return users;
    }
    async createUser(user: UserData): Promise<UserData> {
        if(new User(user).isValid()) throw new UserError("User not valid");
        const createdUser = await this.userRepository.save(user);
        await this.fileStorage.createFolder(user.email);
        return createdUser;
    }
}
