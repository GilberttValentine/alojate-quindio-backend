import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("languages").del();

    // Inserts seed entries
    await knex("languages").insert([
        { language_name: "spanish" },
        { language_name: "english" },
        { language_name: "french" }
    ]);
}
