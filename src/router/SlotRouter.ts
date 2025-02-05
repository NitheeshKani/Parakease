import { Router } from "express"
import db from "../database/db"
import { SlotSchema } from "../database/schema/SlotSchema"
import { eq } from "drizzle-orm"

const SlotRouter = Router()

SlotRouter.get("/", async (req, res) => {
    try {
        const slot = await db.query.SlotSchema.findMany()
        res.status(200).json(slot)
    } catch (error) {
        res.json(error)
    }
})

SlotRouter.post("/", async (req, res) => {
    try {
        const data = req.body
        const slot = await db.insert(SlotSchema).values(data).returning()

        res.status(200).json({
            message: "success",
            data: slot
        })
    } catch (error) {
        res.json(error)
    }
})

// update slots isbooked
SlotRouter.put("/:id", async (req, res) => {
    try {
        const slotid = Number(req.params.id)
        const isBooked = true
        const slot = await db.update(SlotSchema).set({ isBooked }).where(eq(SlotSchema.id, slotid)).returning()

        res.status(200).json(slot)
    } catch (error) {
        res.json(error)
    }

})

export default SlotRouter