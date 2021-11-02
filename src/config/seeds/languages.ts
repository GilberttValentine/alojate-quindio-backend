import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("languages").del();

    // Inserts seed entries
    await knex("languages").insert([
        { id: 1, language_name: "spanish" },
        { id: 2, language_name: "english" },
        { id: 3, language_name: "french" }
    ]);
}
