import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date


export const flightsSchema = Joi.object({
    origin: Joi.number().integer().min(1).required(),
    destination: Joi.number().integer().min(1).required(),
    date: Joi.date().format("DD-MM-YYYY").required()
})

export const travelSchema = Joi.object({
    passengerId: Joi.number().integer().min(1).required(),
    flightId: Joi.number().integer().min(1).required()
})

export const dateSchema = Joi.date().format("DD-MM-YYYY");
