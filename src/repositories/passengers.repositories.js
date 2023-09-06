import db from "../database/database.connection.js";


function createPassenger(passenger) {
    return db.query(`/* SQL */
        INSERT INTO passengers (first_name, last_name) VALUES ($1, $2);
    `, [passenger.firstName, passenger.lastName]);
}

function readPassengerById(passengerId) {
    return db.query(`/* SQL */
        SELECT * FROM passengers WHERE id = $1;
    `, [passengerId]);
}

export const passengerRepository = {
    createPassenger,
    readPassengerById,
    
}