import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("rol").del();

    // Inserts seed entries
    await knex("rol").insert([
        { name: "administrator" },
        { name: "host" },
        { name: "guest" }
    ]);
}
