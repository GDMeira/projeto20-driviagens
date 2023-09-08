import { error } from "../errors/error.js";
import { passengerRepository } from "../repositories/passengers.repositories.js"


async function savePassenger(passenger) {
    const result = await passengerRepository.createPassenger(passenger);

    return result;
}

async function readTravelsPassengers(queryParams) {
    
    let { name } = queryParams;
    name = name || '';
    const passengers = await passengerRepository.readTravelsPassengers(name);

    if (passengers.rowCount > 10) throw error.internalError('Too many results.');

    return passengers.rows;
}

export const passengerServices = {
    savePassenger,
    readTravelsPassengers,

}