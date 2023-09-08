import { Router } from "express";
import { stringStripHtml } from "../middlewares/stringStripHtmlValidation.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { passengerSchema } from "../schemas/passengers.schemas.js";
import { passengersController } from "../controllers/passengers.controllers.js";


const passengersRouter = Router();

passengersRouter.post('/passengers', stringStripHtml, schemaValidation(passengerSchema),
    passengersController.postPassenger);

passengersRouter.get('/passengers/travels', passengersController.getPassengersTravels);

export default passengersRouter