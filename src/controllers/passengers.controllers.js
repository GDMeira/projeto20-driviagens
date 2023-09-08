import httpStatus from "http-status";
import { passengerServices } from "../services/passengers.services.js";


async function postPassenger(req, res) {
    await passengerServices.savePassenger(req.body);

    res.sendStatus(httpStatus.CREATED);
}

async function getPassengersTravels(req, res) {
    const passengers = await passengerServices.readTravelsPassengers(req.query);

    res.send(passengers);
}

export const passengersController = {
    postPassenger,
    getPassengersTravels,

}