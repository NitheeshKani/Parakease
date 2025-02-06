import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { UserSchema } from "./schema/UserSchema"
import { SlotSchema } from "./schema/SlotSchema"
import { ParkingLotSchema } from "./schema/ParkingLotSchema"
import { SlotRealtions, ParkingLotRealtions, VehicleRealtions, BillRealtions, PaymentRealtions, UserRealtions } from "./schema/Relations"
import { VehicleSchema } from "./schema/VehicleSchema"
import { BillSchema } from "./schema/BillSchema"
import { PaymentSchema } from "./schema/PaymentSchema"

const sqlite = new Database('Database.db')
const db = drizzle(sqlite, { schema: { UserSchema, SlotSchema, VehicleSchema, ParkingLotSchema, BillSchema, PaymentSchema, SlotRealtions, ParkingLotRealtions, VehicleRealtions, BillRealtions, PaymentRealtions, UserRealtions }, logger: true })

export default db