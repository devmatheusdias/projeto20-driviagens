import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.js"
import { flightSchema } from "../schemas/flightSchema.js"
import { flightController } from "../controllers/flightController.js"

const flightRouter = Router()

flightRouter.post("/flights", validateSchema(flightSchema), flightController.createFlight)
flightRouter.get("/flights", flightController.findAllFlights)

export default flightRouter