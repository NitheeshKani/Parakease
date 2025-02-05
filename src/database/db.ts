import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { UserSchema } from "./schema/UserSchema"
import { SlotSchema } from "./schema/SlotSchema"

const sqlite = new Database('Database.db')
const db = drizzle(sqlite, { schema: { UserSchema , SlotSchema }, logger: true })

export default db