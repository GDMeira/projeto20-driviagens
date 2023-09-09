import { error } from "../errors/error.js";
import { citiesRepository } from "../repositories/cities.repositories.js";

async function validateUniqueCityName(cityName) {
    const search = await citiesRepository.readCityByName(cityName);
    if (search.rowCount > 0) throw error.conflict('Esta cidade já existe.');
}


async function createCity(city) {
    await validateUniqueCityName(city);
    const result = await citiesRepository.createCity(city);

    return result;
}

export const citiesService = {
    createCity,

}