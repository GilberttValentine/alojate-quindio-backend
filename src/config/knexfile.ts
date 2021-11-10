/* eslint-disable @typescript-eslint/no-var-requires */
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection'

require('dotenv').config()

const { PG_DB_URI, PG_DB_URI_TEST, NODE_ENV } = process.env
interface IKnexConfig {
    [key: string]: Knex.Config;
}

const databaseToUse = NODE_ENV === 'test' ? PG_DB_URI_TEST : PG_DB_URI

const config: IKnexConfig = databaseToUse ? {
    development: {
        client: 'pg',
        connection: `postgres://postgres:postgres@localhost:5432/${databaseToUse}`,
        pool: { min: 1, max: 2 },
        migrations: {
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./seeds"
        },
        ...knexSnakeCaseMappers
    }
} : {
    development: {
        client: 'pg',
        connection: `postgres://postgres:postgres@localhost:5432/alojatequindio`,
        pool: { min: 1, max: 2 },
        migrations: {
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./seeds"
        },
        ...knexSnakeCaseMappers
    }
}

export default config;