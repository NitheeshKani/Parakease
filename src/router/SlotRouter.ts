import e, { Router } from "express"
import db from "../database/db"
import { SlotSchema } from "../database/schema/SlotSchema"
import { eq } from "drizzle-orm"
import { ParkingLotSchema } from "../database/schema/ParkingLotSchema"

const SlotRouter = Router()

SlotRouter.get("/:lotId", async (req, res) => {
    try {
        const prakingLotId = Number(req.params.lotId)
        const slots = await db.query.SlotSchema.findMany({
            where: eq(SlotSchema.parkingLotId, prakingLotId)
        })

        if (slots.length === 0) {
            res.status(404).json({ message: "parkinglot not found" })
        } else {
            res.status(200).json(slots)
        }

    } catch (error) {
        res.json(error)
    }
})

SlotRouter.post("/:lotId", async (req, res) => {
    try {
        let data = req.body
        const userId = Number(req.headers["user-id"])
        const parkingLotId = Number(req.params.lotId)

        const parkinglot = await db.query.ParkingLotSchema.findFirst({
            where: eq(ParkingLotSchema.id, parkingLotId),
            columns: {
                userId: true
            }
        })

        if (!parkinglot) {
            res.status(200).json({ message: "parkinglot not found" })
        } else if (parkinglot.userId !== userId) {
            res.status(403).json({ message: "Unauthorized" })
        } else {
            data = { ...data, parkingLotId }
            const slot = await db.insert(SlotSchema).values(data).returning()

            res.status(200).json(slot)
        }

    } catch (error) {
        res.status(400).json(error)
    }
})

// To Book a slot
SlotRouter.put("/:id/book", async (req, res) => {
    try {
        const slotId = Number(req.params.id)
        const isBooked = true

        const slot = await db.update(SlotSchema).set({ isBooked }).where(eq(SlotSchema.id, slotId)).returning()

        res.status(200).json(slot)
    } catch (error) {
        res.status(400).json(error)
    }


})

// To check out a slot
SlotRouter.put("/:id/checkout", async (req, res) => {
    try {
        const slotId = Number(req.params.id)
        const isBooked = false

        const slot = await db.update(SlotSchema).set({ isBooked }).where(eq(SlotSchema.id, slotId)).returning()

        res.status(200).json(slot)
    } catch (error) {
        res.status(400).json(error)
    }


})

SlotRouter.delete("/:id", async (req, res) => {
    try {
        const slotId = Number(req.params.id)
        const userId = Number(req.headers["user-id"])

        const slot = await db.query.SlotSchema.findFirst({
            where: eq(SlotSchema.id, slotId),
            with: {
                prakingLot: {
                    columns: {
                        userId: true
                    }
                }
            }
        })

        if (!slot) {
            res.status(200).json({ message: "slot not found" })
        } else if (slot.prakingLot.userId !== userId) {
            res.status(403).json({ message: "Unauthorized" })
        } else {
            const deletedSlot = await db.delete(SlotSchema).where(eq(SlotSchema.id, slotId)).returning()
            res.status(200).json(deletedSlot)
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

export default SlotRouter