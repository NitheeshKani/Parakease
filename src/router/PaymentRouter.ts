import { Router } from "express"
import db from "../database/db"
import { PaymentSchema } from "../database/schema/PaymentSchema"
import { eq } from "drizzle-orm"

const PaymentRouter = Router()

PaymentRouter.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)
        const payment = await db.query.PaymentSchema.findFirst({
            where: eq(PaymentSchema.id, id)
        })
        res.status(200).json(payment)
    } catch (error) {
        res.status(400).json(error)
    }
})

PaymentRouter.post("/", async (req, res) => {
    try {
        const body = req.body
        const payment = await db.insert(PaymentSchema).values(body).returning()
        res.status(200).json(payment)
    } catch (error) {
        res.status(400).json(error)
    }
})





export default PaymentRouter