import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { VehicleSchema } from "./VehicleSchema"
import { UserSchema } from "./UserSchema"
import { ParkingLotSchema } from "./ParkingLotSchema"

export const BillSchema = sqliteTable('Bill', {
    id: integer("id").primaryKey(),
    duration: integer("duration").notNull(),
    amount: integer("amount").notNull(),

    vehicleId: integer("vehicleId").references(() => VehicleSchema.id, { onDelete: "cascade" }).notNull(),
    userId: integer("userId").references(() => UserSchema.id, { onDelete: "cascade" }).notNull(),
    parkingLotId: integer("parkingLotId").references(() => ParkingLotSchema.id, { onDelete: "cascade" }).notNull(),
    slotId: integer("slotId").references(() => ParkingLotSchema.id, { onDelete: "cascade" }).notNull()
})