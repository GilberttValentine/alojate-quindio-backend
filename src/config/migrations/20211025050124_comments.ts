import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('comments', table => {
        table.increments('id').unique().notNullable();
        table.integer('user_id').references('id').inTable('users');
        table.integer('lodging_id').references('id').inTable('lodgings')
        table.float('quality').notNullable();
        table.float('veracity').notNullable();
        table.float('cleaning').notNullable();
        table.string('direction').notNullable();
        table.string('description');
        table.timestamps(true, true);
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists comments cascade')
}

