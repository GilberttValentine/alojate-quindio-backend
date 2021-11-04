import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("types_lodging").del();

  // Inserts seed entries
  await knex("types_lodging").insert([
    { id: 1, name: "granja", url_picture: "" },
    { id: 2, name: "piscina", url_picture: "" },
    { id: 3, name: "cabaña", url_picture: "" },
    { id: 4, name: "minicasa", url_picture: "" },
    { id: 5, name: "cúpula", url_picture: "" },
    { id: 6, name: "isla", url_picture: "" },
    { id: 7, name: "casa alpina", url_picture: "" },
    { id: 8, name: "casa subterranea", url_picture: "" },
    { id: 9, name: "casa cicládica", url_picture: "" },
    { id: 10, name: "yurta", url_picture: "" },
    { id: 11, name: "kezhan", url_picture: "" },
    { id: 12, name: "castillo", url_picture: "" },
    { id: 13, name: "contenedore", url_picture: "" },
    { id: 14, name: "casa del árbol", url_picture: "" },
    { id: 15, name: "casa flotante", url_picture: "" },
    { id: 16, name: "trullo", url_picture: "" },
    { id: 17, name: "barco", url_picture: "" },
    { id: 18, name: "granero", url_picture: "" },
    { id: 19, name: "ryokane", url_picture: "" },
    { id: 20, name: "casa rodante", url_picture: "" },
  ]);
}
