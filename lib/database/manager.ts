import { PrismaClient } from "@prisma/client";
import * as prismaa from './prisma.mjs'

export let Prisma: PrismaClient;

function getPrisma() {
    Prisma ||= new PrismaClient();
    return Prisma;
}

export let prisma: PrismaClient = prismaa.default ? prismaa.default : getPrisma();