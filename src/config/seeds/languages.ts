import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("languages").del();

    // Inserts seed entries
    await knex("languages").insert([
        { id: 1, language_name: "Innglés" },
        { id: 2, language_name: "Mandarín" },
        { id: 3, language_name: "Hindi" },
        { id: 4, language_name: "Español" },
        { id: 5, language_name: "Francés" },
        { id: 6, language_name: "Árabe" },
        { id: 7, language_name: "Bengalí" },
        { id: 8, language_name: "Ruso" },
        { id: 9, language_name: "Portugués" },
        { id: 10, language_name: "Indonesio" },
        { id: 11, language_name: "Chino" },
        { id: 12, language_name: "Alemán" },
        { id: 13, language_name: "Indostaní" }
    ]);
}
