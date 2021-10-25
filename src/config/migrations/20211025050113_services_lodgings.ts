import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('services_lodgings', table => {
        table.increments('id').unique().notNullable();
        table.integer('service_id').references('id').inTable('services');
        table.integer('lodging_id').references('id').inTable('lodgings')
        table.string('description');
        table.timestamps(true, true);
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists services_lodgings cascade')
}

