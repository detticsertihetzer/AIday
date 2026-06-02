import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/lib/prisma/generated/client";

const prismaClientSingleton = () => {
  // libsql is SQLite-compatible and pure-JS, so it loads under Bun (unlike the
  // native better-sqlite3 driver). Points at the local file the CLI pushes to.
  const adapter = new PrismaLibSql({ url: "file:./prisma/dev.db" });
  return new PrismaClient({ adapter });
};

// biome-ignore lint/suspicious/noShadowRestrictedNames: This is recommended by Prisma
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
