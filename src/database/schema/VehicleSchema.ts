import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { UserSchema } from "./UserSchema"

export const VehicleSchema = sqliteTable('Vehicle', {
    id: integer("id").primaryKey(),
    vehicleName: text("vehicleName").notNull(),
    vehicleType: text("vehicleType").notNull().$type<'Car' | 'Bike'>(),
    colour: text("colour").notNull(),
    numberPlate: text("numberPlate").notNull(),

    UserId: integer("UserId").references(() => UserSchema.id).notNull()
})