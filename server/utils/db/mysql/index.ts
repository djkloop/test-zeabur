import prisma, { PrismaClient } from '@prisma/client'

export const prismaORM = new PrismaClient()

export { prisma }
