import { PrismaClient, type Prisma } from "./generated/prisma/client";

type PrismaAdapter = Prisma.PrismaClientOptionsWithAdapter["adapter"];

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export function getPrismaClient(adapter: PrismaAdapter): PrismaClient {
  return (globalForPrisma.prisma ??= new PrismaClient({ adapter }));
}
