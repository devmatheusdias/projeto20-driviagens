import { db } from "../configs/dbConnection.js";

async function createTravel(passengerId, flightId) {
    await db.query(
        `INSERT INTO travels ("passengerId", "flightId") VALUES ($1, $2);`,
        [passengerId, flightId]
    )
    const result = await db.query(`SELECT * FROM travels ORDER BY id DESC LIMIT 1`);
    return result.rows[0];
}

export const travelRepository = { createTravel }