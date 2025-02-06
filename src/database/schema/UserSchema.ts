import { integer, SQLiteBoolean, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const UserSchema = sqliteTable("User", {
    id: integer("id").primaryKey(),
    userName: text("userName").notNull(),
    email: text("email").unique().notNull(),
    phoneNumber: text("phoneNumber").unique().notNull(),
    password: text("password").notNull(),
    role: text("role").notNull().$type<'user' | 'admin'>(),
})

