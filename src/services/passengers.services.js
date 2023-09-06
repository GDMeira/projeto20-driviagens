import { passengerRepositories } from "../repositories/passengers.repositories.js"


async function savePassenger(passenger) {
    const result = await passengerRepositories.createPassenger(passenger);

    return result;
}

export const passengerServices = {
    savePassenger,

}