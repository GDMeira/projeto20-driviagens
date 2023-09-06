import { passengerRepository } from "../repositories/passengers.repositories.js"


async function savePassenger(passenger) {
    const result = await passengerRepository.createPassenger(passenger);

    return result;
}

export const passengerServices = {
    savePassenger,

}