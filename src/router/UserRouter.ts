import { Router } from "express"
import db from "../database/db"
import { UserSchema } from "../database/schema/UserSchema"

const UserRouter = Router()

UserRouter.get('/:id', async (req, res) => {
    try {
        const user = await db.query.UserSchema.findMany({
            columns: {
                password: false
            },
            with: {
                vehicles: true,
                parkingLots: true
            }
        })

        res.status(200).json(user)
    } catch (error) {
        res.json(error)
    }
})

UserRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        const user = await db.insert(UserSchema).values(body).returning()

        res.status(200).json(user)
    } catch (error) {
        res.json(error)
    }
})

export default UserRouter