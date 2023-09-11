import { error } from "../errors/error.js";
import { passengerRepository } from "../repositories/passengers.repositories.js"


async function savePassenger(passenger) {
    const result = await passengerRepository.createPassenger(passenger);

    return result;
}

async function readTravelsPassengers(queryParams) {
    
    let { name, page } = queryParams;
    name = name || '';
    if (page && (!Number(page) || page < 0)) throw error.badRequest('A página deve ser um número maior ou igual a 0.')
    page = page || 0;

    const passengers = await passengerRepository.readTravelsPassengers(name, page);

    if (passengers.rowCount > 10) throw error.internalError('Too many results.');

    return passengers.rows;
}

export const passengerServices = {
    savePassenger,
    readTravelsPassengers,

}