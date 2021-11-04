import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("municipalities").del();

    // Inserts seed entries
    await knex("municipalities").insert([
        { id: 1, name: "Armenia", url_picture: "" },
        { id: 2, name: "Circasia", url_picture: "" },
        { id: 3, name: "Calarcá", url_picture: "" },
        { id: 4, name: "Filandia", url_picture: "" },
        { id: 5, name: "Salento", url_picture: "" },
        { id: 6, name: "Génova", url_picture: "" },
        { id: 7, name: "La Tebaida", url_picture: "" },
        { id: 8, name: "Pijao", url_picture: "" },
        { id: 9, name: "Montenegro", url_picture: "" },
        { id: 10, name: "Buenavista", url_picture: "" },
        { id: 11, name: "Quimbaya", url_picture: "" },
        { id: 12, name: "Córdoba", url_picture: "" }
    ]);
}
