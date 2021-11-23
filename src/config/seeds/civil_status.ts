import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Deletes ALL existing entries
    await knex("civil_status").del();

    // Inserts seed entries
    await knex("civil_status").insert([
        {id:1, name: "Soltero" },
        {id:2, name: "Casado" },
        {id:3, name: "none" },
        {id:4, name: "Viudo" },
        {id:5, name: "Divorciado" },
        {id:6, name: "Unión libre" },
    ]);
}
