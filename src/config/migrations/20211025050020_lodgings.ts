import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('lodgings', table => {
        table.increments('id').unique().notNullable();
        table.string('name').notNullable();
        table.integer('user_id').references('id').inTable('users');
        table.integer('municipality_id').references('id').inTable('municipalities');
        table.integer('type_id').references('id').inTable('types_lodging');
        table.integer('persons_amount').notNullable();
        table.string('accesibility', 5000).notNullable();
        table.string('direction').notNullable();
        table.integer('room_quantity').notNullable();
        table.integer('bed_quantity').notNullable();
        table.integer('bathroom_quantity').notNullable();
        table.string('description', 5000).notNullable();
        table.boolean('actual_state').notNullable();
        table.float('night_value').notNullable();
        table.float('qualification').notNullable();
        table.string('url_pictures').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists lodgings cascade');
}

