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

function makeDynamicQuery(queryParams) {
    const { origin, destination, biggerDate, smallerDate } = queryParams;
    let query = '';
    const values = [];
    let pos = 2;

    if (origin) {
        query += ` AND origin = ANY(SELECT id FROM cities WHERE name ILIKE '%' || $${pos} || '%')`;
        console.log(query);
        values.push(origin);
        pos++;
    }

    if (destination) {
        query += ` AND destination = ANY(SELECT id FROM cities WHERE name ILIKE '%' || $${pos} || '%')`;
        values.push(destination);
        pos++;
    }

    if (biggerDate) {
        query += ` AND date < $${pos}`;
        values.push(biggerDate);
        pos++;
    }

    if (smallerDate) {
        query += ` AND date > $${pos}`;
        values.push(smallerDate);
        pos++;
    }

    return {query, values}
}

function readFlights(today, queryParams) {
    const { query, values } = makeDynamicQuery(queryParams);

    return db.query(`/* SQL */
        SELECT 
            id, 
            (
                SELECT name FROM cities WHERE id = flights.origin
            ) AS origin, 
            (
                SELECT name FROM cities WHERE id = flights.destination 
            ) AS destination,
            TO_CHAR(date, 'DD-MM-YYYY') AS date
        FROM flights
        WHERE date > $1 ${query}
        ORDER BY date;
    `, [today, ...values]);
}

export const flightsRepositoriy = {
    createFlight,
    readFlightById,
    createTravel,
    readFlights,

}