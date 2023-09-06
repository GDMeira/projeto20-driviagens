import db from "../database/database.connection.js";


function createFlight(origin, destination, date) {
    return db.query(`/* SQL */
        INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3);
    `, [origin, destination, date]);
}

function readFlightById(id) {
    return db.query(`/* SQL */
        SELECT * FROM flights WHERE id = $1;
    `, [id]);
}

function createTravel(passengerId, flightId) {
    return db.query(`/* SQL */
        INSERT INTO travels (passenger_id, flight_id) VALUES ($1, $2);
    `, [passengerId, flightId]);

}

export const flightsRepositoriy = {
    createFlight,
    readFlightById,
    createTravel,
    
}