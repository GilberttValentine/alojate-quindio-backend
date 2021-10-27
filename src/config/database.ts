import knex from 'knex';
import config from './knexfile';
import { Model } from 'objection';

export function database() {
    const db = knex(config.development);
    Model.knex(db);
}
