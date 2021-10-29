import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("municipalities").del();

    // Inserts seed entries
    await knex("municipalities").insert([
        { name: "Armenia", url_picture: "" },
        { name: "Circasia", url_picture: "" },
        { name: "Calarcá", url_picture: "" },
        { name: "Filandia", url_picture: "" },
        { name: "Salento", url_picture: "" },
        { name: "Génova", url_picture: "" },
        { name: "La Tebaida", url_picture: "" },
        { name: "Pijao", url_picture: "" },
        { name: "Montenegro", url_picture: "" },
        { name: "Buenavista", url_picture: "" },
        { name: "Quimbaya", url_picture: "" },
        { name: "Córdoba", url_picture: "" }
    ]);
}
