import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id').unique().notNullable();
        table.string('first_name').notNullable();
        table.string('second_name').notNullable();
        table.string('first_lastname').notNullable();
        table.string('second_lastname').notNullable();
        table.string('direction').notNullable();
        table.string('email', 255).unique().notNullable();
        table.string('password', 255).notNullable();
        table.string('url_picture');
        table.boolean('actual_state');
        table.integer('stratum');
        table.integer('civil_status_id').references('id').inTable('civil_status');
        table.integer('study_level_id').references('id').inTable('study_levels');
        table.integer('role_id').references('id').inTable('roles');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists users cascade');
}

