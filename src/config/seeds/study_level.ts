import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("study_levels").del();

    // Inserts seed entries
    await knex("study_levels").insert([
        {id:1, name: "high school" },
        {id:2, name: "bachelor degree" },
        {id:3, name: "superior degree" },
        {id:4, name: "none" }
    ]);
}
