import { errors } from "../errors/errors.js"
import {passengerRepository} from "../repositories/passengerRepository.js"

async function createPassenger(firstName, lastName) {
    const result = await passengerRepository.createPassenger(firstName, lastName)
    return result;
}

async function findTravels(name) {
    const travels = await passengerRepository.findTravels(name)

    if (travels.length > 10) throw errors.tooManyResults()
 
    return travels
}


export const passengerService = { createPassenger, findTravels}
