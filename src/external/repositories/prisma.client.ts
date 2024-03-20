import { PrismaClient } from "@prisma/client";

export class PrismaClientConnection {
  private static prisma;
  private constructor() {}

  public static getInstance(): PrismaClient {
    if(!PrismaClientConnection.prisma)
      PrismaClientConnection.prisma = new PrismaClient();
    return PrismaClientConnection.prisma;
  }
}
