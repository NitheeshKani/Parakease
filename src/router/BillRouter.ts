import { Router } from "express"
import db from "../database/db"
import { eq } from "drizzle-orm"
import { ParkingLotSchema } from "../database/schema/ParkingLotSchema"
import { BillSchema } from "../database/schema/BillSchema"

const BillRouter = Router()
const currentTimeWithDate = () => {
    const date = new Date()
    const time = date.toLocaleTimeString()
    const day = date.toLocaleDateString()
    return `${day} ${time}`
}

BillRouter.get("/", async (req, res) => {
    try {
        const userId = Number(req.headers["user-id"])
        const bill = await db.query.BillSchema.findMany({
            where: (BillSchema, { eq }) => eq(BillSchema.userId, userId),
            columns: {
                amount: true,
                bookingTime: true,
                date: true,
                duration: true,
                time: true,
            },
            with: {
                vehicle: {
                    columns: {
                        userId: false,
                        id: false
                    }
                },
                user: {
                    columns: {
                        userName: true,
                        phoneNumber: true
                    }
                },
                slot: {
                    columns: {
                        slotName: true
                    }
                },
                parkingLot: {
                    columns: {
                        name: true
                    }
                },
                payment: {
                    columns: {
                        id: true,
                        amount: true,
                        paymentType: true
                    }
                }
            }
        })
        res.status(200).json(bill)
    } catch (error) {
        res.status(400).json(error)
    }
})

BillRouter.post("/", async (req, res) => {
    const userId = Number(req.headers["user-id"])
    const body = req.body

    try {

        const parkingLot = await db.query.ParkingLotSchema.findFirst({
            where: eq(ParkingLotSchema.id, body.parkingLotId),
            columns: {
                price: true
            },
            with: {
                slots: {
                    columns: {
                        id: true
                    }
                }
            }
        })


        if (parkingLot) {
            const data = {
                bookingTime: currentTimeWithDate(),
                amount: parkingLot.price * body.duration,

                ...body,
                // date: body.date,
                // time: body.time,
                // duration: body.duration,
                // vehicleId: body.vehicleId,
                // slotId: body.slotId,
                // parkingLotId: body.parkingLotId,
                userId
            }

            const bill = await db.insert(BillSchema).values(data).returning()
            res.status(200).json(bill)
        } else {
            res.status(400).json({ message: "Parking lot not found" })
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

BillRouter.put("/:id", async (req, res) => {
    const userId = Number(req.headers["user-id"])
    const id = Number(req.params.id)
    const body = req.body

    const bill = await db.query.BillSchema.findFirst({
        where: eq(BillSchema.id, id),
        columns: {
            userId: true
        }
    })

    if (!bill) {
        res.status(400).json({ message: "Bill not found" })
    } else if (bill.userId !== userId) {
        res.status(403).json({ message: "Unauthorized" })
    } else {
        const data = { date: body.date, time: body.time, duration: body.duration }
        const updatedBill = await db.update(BillSchema).set(data).where(eq(BillSchema.id, id)).returning()
        res.status(200).json(updatedBill)
    }

})

BillRouter.delete("/:id", async (req, res) => {
    try {
        const userId = Number(req.headers["user-id"])
        const id = Number(req.params.id)

        if (userId !== 98421) {
            res.status(403).json({ message: "Unauthorized use the specific master user ID" })
        } else {
            const deletedBill = await db.delete(BillSchema).where(eq(BillSchema.id, id)).returning()
            res.status(200).json(deletedBill)
        }
    } catch (error) {
        res.status(400).json(error)
    }
})



export default BillRouter