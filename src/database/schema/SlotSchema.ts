import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const SlotSchema = sqliteTable('Slot', {
    id: integer("id").primaryKey(),
    slotName: text("slotName").notNull(),
    isBooked: integer("isBooked", { mode: "boolean" }).notNull(),
    floorNum: integer("floorNum").notNull(),
})