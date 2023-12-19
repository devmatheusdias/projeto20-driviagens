import { Router } from "express"
import cityRouter from "./cityRoutes.js"
import passengerRouter from "./passengerRoutes.js"
import flightRouter from "./flightRoutes.js";
import travelRouter from "./travelRoutes.js";

const router = Router()
router.use(cityRouter)
router.use(passengerRouter)
router.use(flightRouter)
router.use(travelRouter)

export default router
