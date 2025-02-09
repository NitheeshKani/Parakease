import { relations } from "drizzle-orm"
import { ParkingLotSchema } from "./ParkingLotSchema"
import { SlotSchema } from "./SlotSchema"
import { VehicleSchema } from "./VehicleSchema"
import { UserSchema } from "./UserSchema"
import { BillSchema } from "./BillSchema"
import { PaymentSchema } from "./PaymentSchema"


export const UserRealtions = relations(UserSchema, ({ one, many }) => {
    return {
        vehicles: many(VehicleSchema),
        parkingLots: many(ParkingLotSchema),
        bill: many(BillSchema)
    }
})

export const ParkingLotRealtions = relations(ParkingLotSchema, ({ one, many }) => {
    return {
        slots: many(SlotSchema),
        user: one(UserSchema, {
            fields: [ParkingLotSchema.userId],
            references: [UserSchema.id]
        }),
        bill: one(BillSchema)
    }
})

export const VehicleRealtions = relations(VehicleSchema, ({ one, many }) => {
    return {
        User: one(UserSchema, {
            fields: [VehicleSchema.userId],
            references: [UserSchema.id]
        }),
        bill: one(BillSchema)
    }
})

export const SlotRealtions = relations(SlotSchema, ({ one, many }) => {
    return {
        prakingLot: one(ParkingLotSchema, {
            fields: [SlotSchema.parkingLotId],
            references: [ParkingLotSchema.id]
        }),
        bill: one(BillSchema)
    }
})

export const BillRealtions = relations(BillSchema, ({ one, many }) => {
    return {
        user: one(UserSchema, {
            fields: [BillSchema.userId],
            references: [UserSchema.id]
        }),
        vehicle: one(VehicleSchema, {
            fields: [BillSchema.vehicleId],
            references: [VehicleSchema.id]
        }),
        parkingLot: one(ParkingLotSchema, {
            fields: [BillSchema.parkingLotId],
            references: [ParkingLotSchema.id]
        }),
        slot: one(SlotSchema, {
            fields: [BillSchema.slotId],
            references: [SlotSchema.id]
        }),
        payment: one(PaymentSchema)
    }
})

export const PaymentRealtions = relations(PaymentSchema, ({ one, many }) => {
    return {
        bill: one(BillSchema, {
            fields: [PaymentSchema.billId],
            references: [BillSchema.id]
        })
    }
})