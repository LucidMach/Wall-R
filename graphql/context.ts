import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";

export type Context = {
  prisma: PrismaClient;
};

// setup to use prisma in graphql context
export async function createContext({ req, res }): Promise<Context> {
  return {
    prisma,
  };
}
