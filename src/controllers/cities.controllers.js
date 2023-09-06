import httpStatus from "http-status";
import { citiesService } from "../services/cities.services.js";


async function postCity(req, res) {
    try {
        await citiesService.createCity(req.body.name);

        res.sendStatus(httpStatus.OK);
    } catch (error) {
        if (error.type === "conflict") return res.status(httpStatus.CONFLICT).send(error.message);

        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}


export const citiesController = {
    postCity,

}