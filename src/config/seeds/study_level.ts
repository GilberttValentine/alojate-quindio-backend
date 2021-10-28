import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("study_level").del();

    // Inserts seed entries
    await knex("study_level").insert([
        { name: "high school" },
        { name: "bachelor degree" },
        { name: "superior degree" }
    ]);
}
