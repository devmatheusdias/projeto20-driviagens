import httpStatus from "http-status";
import { cityService } from "../services/cityService.js";

async function createCity(req, res){
    const { name } = req.body

    const result = await cityService.createCity(name)
    res.status(httpStatus.CREATED).send(result);
}

export const cityController = {createCity}
