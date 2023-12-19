import { db } from "../configs/dbConnection.js";
import dayjs from "dayjs";

async function createFlight(origin, destination, date) {
    await db.query(
        `INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3);`,
        [origin, destination, date]
    )

    const result = await db.query(`SELECT * FROM flights ORDER BY id DESC LIMIT 1`);
    return result.rows[0];
}

async function findFlightById(id) {
    const flight = await db.query(`SELECT * FROM flights WHERE id=$1;`, [id])
    return flight.rows[0]
}

async function findAllFlights(origin, destination, smallerDate, biggerDate) {
    const array = []
    let query = `
        SELECT f.id, c1.name AS origin, c2.name AS destination, f.date
	        FROM flights f
	        JOIN cities c1 ON f.origin = c1.id
	        JOIN cities c2 ON f.destination = c2.id
	        WHERE 1=1
    `

    if (origin) {
        array.push(origin)
        query += `AND c1.name=$${array.length} `
    }

    if (destination) {
        array.push(destination)
        query += `AND c2.name=$${array.length} `
    }

    if (dayjs(smallerDate).isValid() && dayjs(biggerDate).isValid()) {
        array.push(smallerDate)
        query += `AND f.date >= $${array.length} `

        array.push(biggerDate)
        query += `AND f.date <= $${array.length} `
    }

    query += "ORDER BY f.date;"

    const result = await db.query(query, array)
    return result.rows
}

export const flightRepository = { createFlight, findFlightById, findAllFlights }