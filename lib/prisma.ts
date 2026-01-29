import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var __prisma: PrismaClient | undefined;
}

export function getPrisma(): PrismaClient {
  if (global.__prisma) return global.__prisma;
  const client = new PrismaClient();
  if (process.env.NODE_ENV !== "production") global.__prisma = client;
  return client;
}

// Backwards compatibility: default export name `prisma` still available via getter
// Create a proxy so existing code can call `prisma.model.method()` without
// initializing the client at module import time.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prismaProxy = new Proxy({}, {
  get(_target, prop: string | symbol) {
    // Lazily create the client when any property is accessed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const client: any = getPrisma();
    return client[prop as any];
  },
});

export const prisma: any = prismaProxy;
