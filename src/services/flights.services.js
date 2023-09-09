import { error } from "../errors/error.js";
import { citiesRepository } from "../repositories/cities.repositories.js";
import { flightsRepositoriy } from "../repositories/flights.repositories.js";
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import dayjs from "dayjs";
import { passengerRepository } from "../repositories/passengers.repositories.js";
import { dateSchema } from "../schemas/flights.schemas.js";

dayjs.extend(customParseFormat)

async function validateOriginAndDestination(origin, destination) {
    const [searchOrigin, searchDestination] = await Promise.all([
        citiesRepository.readCityById(origin),
        citiesRepository.readCityById(destination)
    ]);
    
    if (searchOrigin.rowCount === 0 || searchDestination.rowCount === 0) {
        throw error.notFound('Cidade não encontrada.');
    }
}

async function validateDate(date) {
    const today = dayjs();
    const djsDate = dayjs(date, "DD-MM-YYYY");

    if (today.isAfter(djsDate)) throw error.unprocessableEntity('A data deve fornecida tem que ser maior que o dia de hoje.')
}

async function createFlight({ origin, destination, date }) {
    if (origin === destination) throw error.conflict('origem e destino');

    await Promise.all([
        validateOriginAndDestination(origin, destination),
        validateDate(date)
    ])

    const result = await flightsRepositoriy.createFlight(origin, destination, dayjs(date, "DD-MM-YYYY").format("YYYY-MM-DD"));

    return result;
}

async function validateFlight(flightId) {
    const search = await flightsRepositoriy.readFlightById(flightId);

    if (search.rowCount === 0) throw error.notFound('Voo não encontrado.')
}

async function validatePassenger(passengerId) {
    const search = await passengerRepository.readPassengerById(passengerId);

    if (search.rowCount === 0) throw error.notFound('Passageiro não encontrado.')
}

async function createTravel({ passengerId, flightId }) {
    await Promise.all([
        validateFlight(flightId),
        validatePassenger(passengerId)
    ])

    const result = await flightsRepositoriy.createTravel(passengerId, flightId);

    return result;
}

function validateParams(queryParams) {
    const { origin, destination, 'bigger-date': biggerDate, 'smaller-date': smallerDate } = queryParams;
    const params = {origin, destination, biggerDate, smallerDate}

    if ( (biggerDate && !smallerDate) || (smallerDate && !biggerDate) ) throw error.unprocessableEntity('Os parâmetros data inicial e final devem ser fornecidos em conjunto.')

    const validationSmallerDate = dateSchema.validate(smallerDate);
    const validationBigerDate = dateSchema.validate(biggerDate);

    if (validationSmallerDate.error || validationBigerDate.error) throw error.unprocessableEntity('As datas devem estar no formato DD-MM-AAAA!')

    const djsSmall = dayjs(smallerDate, "DD-MM-YYYY");
    const djsBig = dayjs(biggerDate, "DD-MM-YYYY");

    if (djsSmall.isAfter(djsBig)) throw error.badRequest('A data inicial deve ser menor que a final.')

    return params
}

async function readFlights(queryParams) {
    const params = validateParams(queryParams);
    const today = dayjs().format('YYYY-MM-DD');

    const flights = await flightsRepositoriy.readFlights(today, params);

    return flights.rows;
}

export const flightsService = {
    createFlight,
    createTravel,
    readFlights,
    
}