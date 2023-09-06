import { Router } from "express";
import { stringStripHtml } from "../middlewares/stringStripHtmlValidation.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { citiesSchema } from "../schemas/cities.schemas.js";
import { citiesController } from "../controllers/cities.controllers.js";


const citiesRouter = Router();

citiesRouter.post('/cities', stringStripHtml, schemaValidation(citiesSchema),
    citiesController.postCity);

export default citiesRouter