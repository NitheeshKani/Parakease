import { Router } from "express"
import db from "../database/db"
import { ParkingLotSchema } from "../database/schema/ParkingLotSchema"
import { eq } from "drizzle-orm"

const ParkingLotRouter = Router()

ParkingLotRouter.get("/city", async (req, res) => {
    try {
        const parkingLots = await db.query.ParkingLotSchema.findMany({
            columns: {
                city: true
            }
        })
        if (parkingLots.length === 0) {
            res.status(200).json({ message: "Parking lot not found" })

        } else {
            res.status(200).json(parkingLots)
        }
    } catch (error) {
        res.status(400).json(error)
    }

})

ParkingLotRouter.get("/city/:name", async (req, res) => {
    try {
        const cityName = req.params.name
        const parkingLots = await db.query.ParkingLotSchema.findMany({
            where: (ParkingLotSchema, { eq }) => eq(ParkingLotSchema.city, cityName),
            with: {
                user: true,
                slots: true
            }
        })
        if (!parkingLots) {
            res.status(200).json({ message: "Parking lot not found" })
            return
        } else {
            res.status(200).json(parkingLots)
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

ParkingLotRouter.get("/", async (req, res) => {
    try {
        const userId = Number(req.headers["user-id"])
        const parkingLots = await db.query.ParkingLotSchema.findMany({
            where: (ParkingLotSchema, { eq }) => eq(ParkingLotSchema.userId, userId),
            with: {
                slots: true
            }
        })

        if (parkingLots.length === 0) {
            res.status(200).json({ message: "Parking lot not found" })
        } else {
            res.status(200).json(parkingLots)
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

ParkingLotRouter.post("/", async (req, res) => {
    try {
        const body = req.body
        const userId = Number(req.headers["user-id"])
        const data = { ...body, userId }
        const parkingLot = await db.insert(ParkingLotSchema).values(data).returning()

        res.status(200).json(parkingLot)
    } catch (error) {
        res.status(400).json(error)
    }
})

ParkingLotRouter.put("/:id", async (req, res) => {
    try {
        const parkingLotId = Number(req.params.id)
        const body = req.body
        const userId = Number(req.headers["user-id"])
        const data = { ...body, userId }
        const parkingLot = await db.update(ParkingLotSchema).set(data).where(eq(ParkingLotSchema.id, parkingLotId)).returning()

        res.status(200).json(parkingLot)
    } catch (error) {
        res.status(400).json(error)
    }
})

ParkingLotRouter.delete("/:id", async (req, res) => {
    try {
        const parkingLotId = Number(req.params.id)
        const userId = Number(req.headers["user-id"])
        const parkingLot = await db.query.ParkingLotSchema.findFirst({
            where: (ParkingLotSchema, { eq }) => eq(ParkingLotSchema.id, parkingLotId),
            columns: {
                userId: true
            }
        })
        if (!parkingLot) {
            res.status(200).json({ message: "Parking lot not found" })

        } else if (parkingLot.userId !== userId) {
            res.status(403).json({ message: "Unauthorized" })

        } else {
            const deletedparkingLot = await db.delete(ParkingLotSchema).where(eq(ParkingLotSchema.id, parkingLotId)).returning()
            res.status(200).json({ deletedparkingLot, message: "deleted" })
        }

    } catch (error) {
        res.status(400).json(error)
    }
})
export default ParkingLotRouter