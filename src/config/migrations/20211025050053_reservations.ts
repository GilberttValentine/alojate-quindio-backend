import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reservations', table => {
        table.increments('id').unique().notNullable();
        table.integer('user_id').references('id').inTable('users');
        table.integer('lodging_id').references('id').inTable('lodgings')
        table.timestamp('start_date').notNullable();
        table.timestamp('end_date').notNullable();
        table.float('night_value').notNullable();
        table.integer('actual_state').references('id').inTable('reservation_states');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists reservations cascade');
}

