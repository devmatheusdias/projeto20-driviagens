import { Router } from "express";
import {validateSchema} from "../middlewares/validateSchema.js";
import {citySchema} from "../schemas/citySchema.js";
import { cityController } from "../controllers/cityController.js";

const cityRouter = Router()

cityRouter.post("/cities", validateSchema(citySchema), cityController.createCity)

export default cityRouter