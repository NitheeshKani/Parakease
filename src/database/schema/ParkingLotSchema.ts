import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { UserSchema } from "./UserSchema"

export const ParkingLotSchema = sqliteTable('ParkingLot', {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    parkingLotType: text("parkingLotType").notNull().$type<'public' | 'private'>(),
    floors: integer("floors").notNull(),
    isValet: integer("isValet", { mode: "boolean" }).notNull(),

    UserId: integer("UserId").references(() => UserSchema.id).notNull()
})