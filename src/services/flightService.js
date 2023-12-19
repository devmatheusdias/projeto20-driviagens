import { errors } from "../errors/errors.js"
import { cityRepository } from "../repositories/cityRepository.js"
import { flightRepository } from "../repositories/flightRepository.js"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat)

async function createFlight(origin, destination, date) {
    const todaysDate = dayjs()
    const flightDate = dayjs(date, "DD-MM-YYYY")

    if (flightDate < todaysDate) throw errors.invalidFlightDate()

    if (origin === destination) throw errors.equalCities()

    const cityOrigin = await cityRepository.findCityById(origin)
    const cityDestination = await cityRepository.findCityById(destination)
    if (!cityOrigin || !cityDestination) throw errors.notFound("City")

    const result = await flightRepository.createFlight(origin, destination, date)
    return result;
}

async function findAllFlights(origin, destination, smallerDate, biggerDate) {
    if (biggerDate && !smallerDate || smallerDate && !biggerDate) {
        throw errors.invalidTravelDateAmount()
    }

    const smallerDateFormatted = dayjs(smallerDate, "DD-MM-YYYY").format("YYYY-MM-DD")
    const biggerDateFormatted = dayjs(biggerDate, "DD-MM-YYYY").format("YYYY-MM-DD")
    if (biggerDate && smallerDate && smallerDateFormatted >= biggerDateFormatted) {
        throw errors.invalidTravelDate()
    }

    const flights = await flightRepository.findAllFlights(origin, destination, smallerDateFormatted, biggerDateFormatted)
    return flights
}



export const flightService = { createFlight, findAllFlights }