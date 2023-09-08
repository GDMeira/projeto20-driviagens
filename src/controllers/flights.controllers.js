import httpStatus from "http-status";
import { flightsService } from "../services/flights.services.js";


async function postFlight(req, res) {
    await flightsService.createFlight(req.body);

    res.sendStatus(httpStatus.CREATED);
}

async function postTravel(req, res) {
    await flightsService.createTravel(req.body);

    res.sendStatus(httpStatus.CREATED);
}

async function getFlights(req, res) {
    const flights = await flightsService.readFlights(req.query);

    res.send(flights);
}

export const flightsController = {
    postFlight,
    postTravel,
    getFlights,

}