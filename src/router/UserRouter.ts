import { Router } from "express"
import db from "../database/db"
import { UserSchema } from "../database/schema/UserSchema"
import { eq } from "drizzle-orm"
import { VehicleSchema } from "../database/schema/VehicleSchema"
import { ParkingLotSchema } from "../database/schema/ParkingLotSchema"

const UserRouter = Router()

UserRouter.get('/', async (req, res) => {
    try {
        const userId = Number(req.headers["user-id"])
        const user = await db.query.UserSchema.findFirst({
            where: (UserSchema, { eq }) => eq(UserSchema.id, userId),
            columns: {

                password: false
            },
            with: {
                vehicles: true,
                parkingLots: true
            }
        })

        if (!user) {
            res.status(200).json({ message: "User not found" })
        } else {
            res.status(200).json(user)
        }

    } catch (error) {
        res.status(400).json(error)
    }
})

UserRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        const user = await db.insert(UserSchema).values(body).returning()

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)

    }
})

UserRouter.put('/', async (req, res) => {
    try {
        const userId = Number(req.headers["user-id"])
        const body = req.body

        const user = await db.update(UserSchema).set(body).where(eq(UserSchema.id, userId)).returning()
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json(error)
    }
})

UserRouter.delete('/', async (req, res) => {
    try {
        const userId = Number(req.headers["user-id"])

        const deleteduser = await db.delete(UserSchema).where(eq(UserSchema.id, userId)).returning()
        res.status(200).json({ message: "user successfully deleted", deleteduser })

    } catch (error) {
        res.status(400).json(error)
    }
})

export default UserRouter