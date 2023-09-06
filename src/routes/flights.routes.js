import { Router } from "express";
import { stringStripHtml } from "../middlewares/stringStripHtmlValidation.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { flightsSchema, travelSchema } from "../schemas/flights.schemas.js";
import { flightsController } from "../controllers/flights.controllers.js";


const flightsRouter = Router();

flightsRouter.post('/flights', stringStripHtml, schemaValidation(flightsSchema),
    flightsController.postFlight);

flightsRouter.post('/travels', stringStripHtml, schemaValidation(travelSchema),
    flightsController.postTravel);

export default flightsRouter