import { PrismaClient } from "@prisma/client";
import { type UserData } from "../../entities/user/user.data";
import { BaseOrmRepository } from "../../use-cases/ports/base-orm.repository";

export class PrismaUserRepository implements BaseOrmRepository<UserData, UserData> {
  private readonly prisma: PrismaClient;
  constructor () {
    this.prisma = new PrismaClient();
  }

  async findOne(id: string | number): Promise<UserData> {
    return await this.prisma.user.findUnique({ where: {id : id as number} });
  }

  async update(id: string | number, data: UserData): Promise<UserData> {
    return await this.prisma.user.update({
      where: { id: id as number },
      data: data
    });
  }

  async delete (id: number): Promise<UserData> {
    return await this.prisma.user.delete({
      where: { id: id as number }
    });
  }

  async findByFilter (filter: UserData): Promise<UserData[]> {
    return await this.prisma.user.findMany({ where: filter });
  }

  async save (user: UserData): Promise<UserData> {
    return await this.prisma.user.create({
      data: user
    });
  }
}
