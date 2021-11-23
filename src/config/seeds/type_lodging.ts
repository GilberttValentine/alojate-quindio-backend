import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("types_lodging").del();

  // Inserts seed entries
  await knex("types_lodging").insert([
    { id: 1, name: "Granja", url_picture: "" },
    { id: 2, name: "Piscina", url_picture: "" },
    { id: 3, name: "Cabaña", url_picture: "" },
    { id: 4, name: "Minicasa", url_picture: "" },
    { id: 5, name: "Cúpula", url_picture: "" },
    { id: 6, name: "Isla", url_picture: "" },
    { id: 7, name: "Casa alpina", url_picture: "" },
    { id: 8, name: "Casa subterranea", url_picture: "" },
    { id: 9, name: "Casa cicládica", url_picture: "" },
    { id: 10, name: "Yurta", url_picture: "" },
    { id: 11, name: "Kezhan", url_picture: "" },
    { id: 12, name: "Castillo", url_picture: "" },
    { id: 13, name: "Contenedor", url_picture: "" },
    { id: 14, name: "Casa del árbol", url_picture: "" },
    { id: 15, name: "Casa flotante", url_picture: "" },
    { id: 16, name: "Trullo", url_picture: "" },
    { id: 17, name: "Barco", url_picture: "" },
    { id: 18, name: "Granero", url_picture: "" },
    { id: 19, name: "Ryokane", url_picture: "" },
    { id: 20, name: "Casa rodante", url_picture: "" },
  ]);
}
