import { Router } from "express";
import { stringStripHtml } from "../middlewares/stringStripHtmlValidation.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { flightsSchema } from "../schemas/flights.schemas.js";
import { flightsController } from "../controllers/flights.controllers.js";


const flightsRouter = Router();

flightsRouter.post('/flights', stringStripHtml, schemaValidation(flightsSchema),
    flightsController.postFlight);

export default flightsRouter