import express from "express"
import cors from 'cors'
import './src/database/db'
import UserRouter from "./src/router/UserRouter"
import SlotRouter from "./src/router/SlotRouter"
import ParkingLotRouter from "./src/router/ParkingLotRouter"
import VehicleRouter from "./src/router/VehicleRouter"

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/user', UserRouter)
app.use('/api/slot', SlotRouter)
app.use('/api/parking_lot', ParkingLotRouter)
app.use('/api/vehicle',VehicleRouter)

app.listen(8080, () => {
    console.log(`server starts at http://localhost:8080/`)
})