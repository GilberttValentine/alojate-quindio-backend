import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    
    // Deletes ALL existing entries
    await knex("civil_status").del();

    // Inserts seed entries
    await knex("civil_status").insert([
        {id:1, name: "single" },
        {id:2, name: "married" },
        {id:3, name: "none" }
    ]);
}
