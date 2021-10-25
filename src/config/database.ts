import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection'
interface IKnexConfig {
    [key: string]: Knex.Config;
}

const db: IKnexConfig = {
    development: {
        client: 'pg',
        connection: 'postgres://postgres:postgres@localhost:5432/quindio',
        pool: { min: 1, max: 2 },
        migrations: {
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./seeds"
        },
        ...knexSnakeCaseMappers
    }
};
export default db;