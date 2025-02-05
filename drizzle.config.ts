import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/database/schema",
    out: "./src/database/migration",
    dbCredentials: {
        url: "./database.db",
    },
    strict: true,
    verbose: true,
})