import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('study_level', table => {
        table.increments('id').unique().notNullable();
        table.string('name');
        table.timestamps(true, true);
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists study_level cascade')
}

