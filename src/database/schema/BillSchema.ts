import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { VehicleSchema } from "./VehicleSchema"
import { UserSchema } from "./UserSchema"
import { ParkingLotSchema } from "./ParkingLotSchema"

export const BilSchema = sqliteTable('Bill', {
    id: integer("id").primaryKey(),
    duration: integer("duration").notNull(),
    amount: integer("amount").notNull(),

    vehicleId: integer("vehicleId").references(() => VehicleSchema.id).notNull(),
    userId: integer("userId").references(() => UserSchema.id).notNull(),
    ParkingLotId: integer("parkingLotId").references(() => ParkingLotSchema.id).notNull(),
    slotId: integer("slotId").references(() => ParkingLotSchema.id).notNull()
})