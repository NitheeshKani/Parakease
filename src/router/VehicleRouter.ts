import { Router } from "express"
import db from "../database/db"
import { VehicleSchema } from "../database/schema/VehicleSchema"
import { eq } from "drizzle-orm"

const VehicleRouter = Router()

VehicleRouter.get("/", async (req, res) => {

    try {
        const userId = Number(req.headers["user-id"])
        const vehicle = await db.query.VehicleSchema.findMany({
            where: (VehicleSchema, { eq }) => eq(VehicleSchema.userId, userId),
            with: {
                User: true,
                bill: true
            }
        })

        if (vehicle.length === 0) {
            res.status(200).json({ message: "Vehicle not found" })

        } else {
            res.status(200).json(vehicle)

        }
    } catch (error) {
        res.status(400).json(error)
    }
})

VehicleRouter.post("/", async (req, res) => {
    try {
        const body = req.body
        const userId = Number(req.headers["user-id"])
        const data = { ...body, userId }
        const vehicle = await db.insert(VehicleSchema).values(data).returning()
        res.status(200).json(vehicle)
    } catch (error) {
        res.status(400).json(error)
    }
})

VehicleRouter.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)
        const body = req.body
        const userId = Number(req.headers["user-id"])
        const data = { ...body, userId }
        const vehicle = await db.query.VehicleSchema.findFirst({
            where: (VehicleSchema, { eq }) => eq(VehicleSchema.id, id),
            columns: {
                userId: true
            }
        })

        if (!vehicle) {
            res.status(200).json({ message: "Vehicle not found" })
        } else if (vehicle.userId !== userId) {
            res.status(403).json({ message: "Unauthorized" })
        } else {
            const updatedVehicle = await db.update(VehicleSchema).set(data).where(eq(VehicleSchema.id, id)).returning()

            res.status(200).json(updatedVehicle)
        }

    } catch (error) {
        res.status(400).json(error)
    }
})

VehicleRouter.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)
        const userId = Number(req.headers["user-id"])
        const vehicle = await db.query.VehicleSchema.findFirst({
            where: (VehicleSchema, { eq }) => eq(VehicleSchema.id, id),
            columns: {
                userId: true
            }
        })

        if (!vehicle) {
            res.status(200).json({ message: "Vehicle not found" })
        } else if (vehicle.userId !== userId) {
            res.status(403).json({ message: "Unauthorized" })
        } else {
            const deletedVehicle = await db.delete(VehicleSchema).where(eq(VehicleSchema.id, id)).returning()
            res.status(200).json(deletedVehicle)
        }

    } catch (error) {
        res.status(400).json(error)
    }
})


export default VehicleRouter