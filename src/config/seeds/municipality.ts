import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("municipalities").del();

    // Inserts seed entries
    await knex("municipalities").insert([
        { id: 1, name: "Armenia", url_picture: "armenia" },
        { id: 2, name: "Circasia", url_picture: "circasia" },
        { id: 3, name: "Calarcá", url_picture: "calarca" },
        { id: 4, name: "Filandia", url_picture: "filandia" },
        { id: 5, name: "Salento", url_picture: "salento" },
        { id: 6, name: "Génova", url_picture: "genova" },
        { id: 7, name: "La Tebaida", url_picture: "la-tebaida" },
        { id: 8, name: "Pijao", url_picture: "pijao" },
        { id: 9, name: "Montenegro", url_picture: "montenegro" },
        { id: 10, name: "Buenavista", url_picture: "buenavista" },
        { id: 11, name: "Quimbaya", url_picture: "quimbaya" },
        { id: 12, name: "Córdoba", url_picture: "cordoba" }
    ]);
}
