import config from "../config/knexfile";
import knex from 'knex';

export const db = knex(config.development);

export const clearAll = async () => {
    await db("hosts_languages").del();
    await db("users").del();
}