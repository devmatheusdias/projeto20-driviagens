import httpStatus from "http-status"
import { travelService } from "../services/travelService.js"

async function createTravel(req, res) {
    const { passengerId, flightId } = req.body

    const result = await travelService.createTravel(passengerId, flightId)
    res.status(httpStatus.CREATED).send(result)
}

export const travelController = { createTravel }