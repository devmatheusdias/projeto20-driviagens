import httpStatus from "http-status";
import {passengerService} from "../services/passengerService.js"

async function createPassenger(req, res){
    const { firstName, lastName } = req.body

    const result = await passengerService.createPassenger(firstName, lastName)
    res.status(httpStatus.CREATED).send(result)
}

async function findTravels(req, res) {
    const { name } = req.query

    const travels = await passengerService.findTravels(name)
    
    const formattedTravels = travels.map(travel => {
        return {...travel, travels: parseInt(travel.travels)}
    })

    res.send(formattedTravels)
}

export const passengerController = { createPassenger, findTravels}
