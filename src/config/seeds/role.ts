import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("roles").del();

    // Inserts seed entries
    await knex("roles").insert([
        {id:1, name: "administrator" },
        {id:2, name: "host" },
        {id:3, name: "guest" },
        {id:4, name: "host-guest" },
        {id:5, name: "user" },
    ]);
}
