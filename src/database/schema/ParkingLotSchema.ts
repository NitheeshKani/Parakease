import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { SlotSchema } from "./SlotSchema"

export const ParkingLotSchema = sqliteTable('ParkingLot', {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    parkingLotType: text("parkingLotType").notNull().$type<'public' | 'private'>(),
    floors: integer("floors").notNull(),
    isValet: integer("isValet", { mode: "boolean" }).notNull(),

    slot: integer("slot").references(() => SlotSchema.id).notNull(),
})