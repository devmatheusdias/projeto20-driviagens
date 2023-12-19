import {db} from "../configs/dbConnection.js"


async function findCityByName(name) {
    const city = await db.query(`SELECT * FROM cities WHERE name=$1;`, [name])
    return city.rows[0]
}

async function findCityById(id) {
    const city = await db.query(`SELECT * FROM cities WHERE id=$1;`, [id])
    return city.rows[0]
}

async function createCity(name) {
    await db.query(`INSERT INTO cities (name) VALUES ($1);`, [name])
    const result = await db.query(`SELECT * FROM cities ORDER BY id DESC LIMIT 1`);
    return result.rows[0];
}

export const cityRepository = { findCityByName, findCityById, createCity }