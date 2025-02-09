import { Router } from "express"
import db from "../database/db"

const BillRouter = Router()

BillRouter.get("/", async (req, res) => {
    try {
        const bill = await db.query.BillSchema.findMany()
        res.status(200).json(bill)
    } catch (error) {
        res.status(400).json(error)
    }
})


export default BillRouter