import dayjs from "dayjs"
import httpStatus from "http-status"
import { flightService } from "../services/flightService.js"

async function createFlight(req, res) {
    const { origin, destination, date } = req.body

    const result = await flightService.createFlight(origin, destination, date)
    res.status(httpStatus.CREATED).send(result)
}

async function findAllFlights(req, res) {
    const { origin, destination, ['smaller-date']: smallerDate, ['bigger-date']: biggerDate } = req.query

    const allFlights = await flightService.findAllFlights(origin, destination, smallerDate, biggerDate)

    const formattedFlights = allFlights.map(flight => {
        const date = dayjs(flight.date).format("DD-MM-YYYY")
        return { ...flight, date }
    })
    
    res.send(formattedFlights)
}


export const flightController = { createFlight, findAllFlights }
