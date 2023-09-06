import httpStatus from "http-status";
import { passengerServices } from "../services/passengers.services.js";


async function postPassenger(req, res) {
    try {
        await passengerServices.savePassenger(req.body);

        res.sendStatus(httpStatus.OK);
    } catch (error) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}


export const passengersController = {
    postPassenger,

}