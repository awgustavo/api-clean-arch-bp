import { PrismaClient } from "@prisma/client";
import { BaseOrmRepository } from "../../use-cases/ports/base-orm.repository";
import { CustomInjectable, CustomUnmanaged } from "../../shared/dependency-injection/dependency-injection";
import { PrismaClientConnection } from "./prisma.client";

@CustomInjectable()
export abstract class BasePrismaRepository<Entity, Filter> implements BaseOrmRepository<Entity, Filter> {
  private readonly prisma: PrismaClient;
  private entity;
  constructor (@CustomUnmanaged() entityName: string) {
    this.prisma = PrismaClientConnection.getInstance();
    this.entity = this.prisma[entityName];
  }

  async findOne(id: string | number): Promise<Entity> {
    return await this.entity.findUnique({ where: {id : id as number} }) as Entity;
  }

  async update(id: string | number, data: Entity): Promise<Entity> {
    return await this.entity.update({
      where: { id: id as number },
      data: data
    }) as Entity;
  }

  async delete (id: number): Promise<Entity> {
    return await this.entity.delete({
      where: { id: id as number }
    }) as Entity;
  }

  async findByFilter (filter: Filter): Promise<Entity[]> {
    return await this.entity.findMany({ where: filter }) as Entity[];
  }

  async save (user: Entity): Promise<Entity> {
    return await this.entity.create({
      data: user
    }) as Entity;
  }
}
