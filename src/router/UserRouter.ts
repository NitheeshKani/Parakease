import { Router } from "express"
import db from "../database/db"
import { UserSchema } from "../database/schema/UserSchema"
import { eq } from "drizzle-orm"

const UserRouter = Router()

UserRouter.get('/:id', async (req, res) => {
    try {
        const userId = Number(req.params.id)
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

UserRouter.put('/:id', async (req, res) => {
    try {
        const userId = Number(req.params.id)
        const body = req.body

        const user = await db.update(UserSchema).set(body).where(eq(UserSchema.id, userId)).returning()
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json(error)
    }
})

UserRouter.delete('/:id', async (req, res) => {
    try {
        const userId = Number(req.params.id)
        const user = await db.delete(UserSchema).where(eq(UserSchema.id, userId)).returning()
        res.status(200).json({ message: "user successfully deleted", user })
    } catch (error) {
        res.status(400).json(error)
    }
})

export default UserRouter