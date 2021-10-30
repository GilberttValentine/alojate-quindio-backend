import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reservation_states', table => {
        table.increments('id').unique().notNullable();
        table.string('state_name');
        table.timestamps(true, true);
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists reservation_states cascade')
}

