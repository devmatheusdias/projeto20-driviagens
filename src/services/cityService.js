import { errors } from "../errors/errors.js"
import { cityRepository } from "../repositories/cityRepository.js"

async function createCity(name) {
    const city = await cityRepository.findCityByName(name)
    if (city) throw errors.conflict("city")

    const result = await cityRepository.createCity(name);
    return result;
}

export const cityService = { createCity }