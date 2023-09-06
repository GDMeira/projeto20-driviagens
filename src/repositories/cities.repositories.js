import db from "../database/database.connection.js";


function createCity(city) {
    return db.query(`/* SQL */
        INSERT INTO cities (name) VALUES ($1);
    `, [city]);
}

function readCityByName(city) {
    return db.query(`/* SQL */
        SELECT * FROM cities WHERE name = $1;
    `, [city]);
}

export const citiesRepository = {
    createCity,
    readCityByName,

}