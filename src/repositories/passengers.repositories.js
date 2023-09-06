import db from "../database/database.connection.js";


function createPassenger(passenger) {
    return db.query(`/* SQL */
        INSERT INTO passengers (first_name, last_name) VALUES ($1, $2);
    `, [passenger.firstName, passenger.lastName]);
}

export const passengerRepository = {
    createPassenger,

}