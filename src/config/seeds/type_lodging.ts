import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("types_lodging").del();

  // Inserts seed entries
  await knex("types_lodging").insert([
    { name: "granjas", url_picture: "" },
    { name: "piscinas", url_picture: "" },
    { name: "cabañas", url_picture: "" },
    { name: "minicasas", url_picture: "" },
    { name: "cúpula", url_picture: "" },
    { name: "islas", url_picture: "" },
    { name: "casas alpinas", url_picture: "" },
    { name: "casas subterraneas", url_picture: "" },
    { name: "casas cicládicas", url_picture: "" },
    { name: "yurtas", url_picture: "" },
    { name: "kezhan", url_picture: "" },
    { name: "castillos", url_picture: "" },
    { name: "contenedores", url_picture: "" },
    { name: "casas del árbol", url_picture: "" },
    { name: "casas flotantes", url_picture: "" },
    { name: "trullos", url_picture: "" },
    { name: "barcos", url_picture: "" },
    { name: "graneros", url_picture: "" },
    { name: "ryokanes", url_picture: "" },
    { name: "casas rodantes", url_picture: "" },
  ]);
}
