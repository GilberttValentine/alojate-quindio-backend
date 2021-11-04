import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('hosts_languages', table => {
        table.increments('id').unique().notNullable();
        table.integer('user_id').references('id').inTable('users');
        table.integer('language_id').references('id').inTable('languages');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists hosts_languages cascade');
}

