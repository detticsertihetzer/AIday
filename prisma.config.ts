import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    // Local SQLite file, relative to the project root. Zero setup, fully offline.
    url: "file:./prisma/dev.db",
  },
});
