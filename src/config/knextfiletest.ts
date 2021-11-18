import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection'
import dotenv from 'dotenv'

dotenv.config()

interface IKnexConfig {
    [key: string]: Knex.Config;
}

const testConfig: IKnexConfig = {
    test: {
        client: 'pg',
        connection: `postgres://postgres:postgres@localhost:5432/${process.env.PG_DB_URI_TEST}`,
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

export default testConfig