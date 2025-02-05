import { integer, SQLiteBoolean, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { VehicleSchema } from "./VehicleSchema"
import { ParkingLotSchema } from "./ParkingLotSchema"

export const UserSchema = sqliteTable("User", {
    id: integer("id").primaryKey(),
    userName: text("userName").notNull(),
    email: text("email").unique().notNull(),
    phoneNumber: text("phoneNumber").unique().notNull(),
    password: text("password").notNull(),
    role: text("role").notNull().$type<'user' | 'admin'>(),

    parkingLotId: integer("parkingLotId").references(() => ParkingLotSchema.id),  //only used by admin (parking lot owner)
    vehicleId: integer("vehicleId").references(() => VehicleSchema.id),  //only used by user (consumer with a car)
})

