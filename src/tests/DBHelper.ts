import config from "../config/knextfiletest";
import knex from 'knex';

export const db = knex(config.test);

export const clearAll = async () => {
    await db("hosts_languages").del();
    await db("users").del();
}