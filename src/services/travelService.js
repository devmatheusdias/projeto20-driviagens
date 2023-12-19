import { errors } from "../errors/errors.js"
import { flightRepository } from "../repositories/flightRepository.js"
import { passengerRepository } from "../repositories/passengerRepository.js"
import { travelRepository } from "../repositories/travelRepository.js"

async function createTravel(passengerId, flightId) {
    const passenger = await passengerRepository.findPassengerById(passengerId)
    if (!passenger) throw errors.notFound("Passenger")

    const flight = await flightRepository.findFlightById(flightId)
    if (!flight) throw errors.notFound("Flight")

    const result = await travelRepository.createTravel(passengerId, flightId)
    return result;
}

export const travelService = { createTravel }