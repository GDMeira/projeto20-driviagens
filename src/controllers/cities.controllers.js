import httpStatus from "http-status";
import { citiesService } from "../services/cities.services.js";


async function postCity(req, res) {
    await citiesService.createCity(req.body.name);

    res.sendStatus(httpStatus.OK);
}


export const citiesController = {
    postCity,

}