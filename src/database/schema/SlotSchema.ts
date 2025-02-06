import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { ParkingLotSchema } from "./ParkingLotSchema"

export const SlotSchema = sqliteTable('Slot', {
    id: integer("id").primaryKey(),
    slotName: text("slotName").notNull(),
    isBooked: integer("isBooked", { mode: "boolean" }).notNull(),
    floorNum: integer("floorNum").notNull(),

    parkingLotId: integer("parkingLotId").references(() => ParkingLotSchema.id).notNull()
})