import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

// let prisma = PrismaClient | undefined;

// const client = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

// export default client;
