import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('lodgings', table => {
        table.increments('id').unique().notNullable();
        table.integer('user_id').references('id').inTable('users');
        table.integer('persons_amount');
        table.string('accesibility').notNullable();
        table.string('direction').notNullable();
        table.integer('room_quantity');
        table.integer('bed_quantity');
        table.integer('bathroom_quantity');
        table.string('description');
        table.boolean('actual_state');
        table.float('night_value').notNullable();
        table.timestamps(true, true);
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists lodgings cascade')
}

