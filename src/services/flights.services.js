import { error } from "../errors/error.js";
import { citiesRepository } from "../repositories/cities.repositories.js";
import { flightsRepositoriy } from "../repositories/flights.repositories.js";
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import dayjs from "dayjs"
import { passengerRepository } from "../repositories/passengers.repositories.js";

dayjs.extend(customParseFormat)

async function validateOriginAndDestination(origin, destination) {
    const [searchOrigin, searchDestination] = await Promise.all([
        citiesRepository.readCityById(origin),
        citiesRepository.readCityById(destination)
    ]);
    
    if (searchOrigin.rowCount === 0 || searchDestination.rowCount === 0) {
        throw error.notFound('cidade');
    }
}

async function validateDate(date) {
    const today = dayjs();
    const djsDate = dayjs(date, "DD-MM-YYYY");

    if (today.isAfter(djsDate)) throw error.unprocessableEntity('data')
}

async function createFlight({ origin, destination, date }) {
    if (origin === destination) throw error.conflict('origem e destino');

    await Promise.all([
        validateOriginAndDestination(origin, destination),
        validateDate(date)
    ])

    const result = await flightsRepositoriy.createFlight(origin, destination, date);

    return result;
}

async function validateFlight(flightId) {
    const search = await flightsRepositoriy.readFlightById(flightId);

    if (search.rowCount === 0) throw error.notFound('voo')
}

async function validatePassenger(passengerId) {
    const search = await passengerRepository.readPassengerById(passengerId);

    if (search.rowCount === 0) throw error.notFound('passageiro')
}

async function createTravel({ passengerId, flightId }) {
    await Promise.all([
        validateFlight(flightId),
        validatePassenger(passengerId)
    ])

    const result = await flightsRepositoriy.createTravel(passengerId, flightId);

    return result;
}

export const flightsService = {
    createFlight,
    createTravel,

}