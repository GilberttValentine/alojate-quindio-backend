import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('types_lodging', table => {
        table.increments('id').unique().notNullable();
        table.string('name').notNullable();
        table.string('url_picture').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists types_lodging cascade');
}

