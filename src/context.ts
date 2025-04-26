import { PrismaClient } from '@prisma/client';
import { pubSub } from './pubSub.js';

const prisma = new PrismaClient();

export interface GraphQLContext {
    prisma: PrismaClient;
    pubSub: typeof pubSub;
}

export function createContext(): GraphQLContext {
    return {
        prisma,
        pubSub,
    };
}