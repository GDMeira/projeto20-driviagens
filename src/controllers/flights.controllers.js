import httpStatus from "http-status";
import { flightsService } from "../services/flights.services.js";


async function postFlight(req, res) {
    try {
        await flightsService.createFlight(req.body);

        res.sendStatus(httpStatus.OK);
    } catch (error) {
        if (error.type === "conflict") return res.status(httpStatus.CONFLICT).send(error.message);
        if (error.type === "notFound") return res.status(httpStatus.NOT_FOUND).send(error.message);
        if (error.type === "unprocessableEntity") return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);

        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function postTravel(req, res) {
    try {
        await flightsService.createTravel(req.body);

        res.sendStatus(httpStatus.OK);
    } catch (error) {
        if (error.type === "conflict") return res.status(httpStatus.CONFLICT).send(error.message);
        if (error.type === "notFound") return res.status(httpStatus.NOT_FOUND).send(error.message);
        if (error.type === "unprocessableEntity") return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);

        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}


export const flightsController = {
    postFlight,
    postTravel,

}