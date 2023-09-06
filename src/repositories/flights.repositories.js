import db from "../database/database.connection.js";


function createFlight(origin, destination, date) {
    return db.query(`/* SQL */
        INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3);
    `, [origin, destination, date]);
}

export const flightsRepositoriy = {
    createFlight,

}