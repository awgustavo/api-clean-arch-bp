import { PrismaClient } from "@prisma/client";
import { UserData } from "../../entities/user/user.data";
import { UserRepository } from "../../use-cases/ports/user.repository";


export class PrismaUserRepository implements UserRepository {

    private prisma: PrismaClient; 
    constructor(){
        this.prisma = new PrismaClient();
    }

    async findByFilter(filter: UserData): Promise<UserData[]> {
        const users = await this.prisma.user.findMany({where: filter})
        return users;
    }

    async save(user: UserData): Promise<UserData> {
        const userCreated = await this.prisma.user.create({
            data: user,
        });
        return userCreated;
    }
}
