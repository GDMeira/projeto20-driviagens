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

function readTravelsPassengers(name, page) {
    const offset = 10 * page;

    return db.query(`/* SQL */
        SELECT first_name || ' ' || last_name AS passenger, COUNT(travels.id) AS travels
        FROM passengers
        LEFT JOIN travels ON travels.passenger_id =  passengers.id
        WHERE first_name ILIKE '%' || $1 || '%' OR last_name ILIKE '%' || $1 || '%'
        GROUP BY passenger
        ORDER BY travels DESC
        OFFSET $2
        LIMIT 10
    `, [name, offset]);
}

export const passengerRepository = {
    createPassenger,
    readPassengerById,
    readTravelsPassengers,
    
}